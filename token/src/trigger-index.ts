// Trigger DexScreener indexing of the MEEKO/SOL Raydium pool.
//
// DexScreener auto-indexes a pair after its FIRST on-chain trade. Our pool
// (created at launch) has never traded, so it's invisible there and Jupiter
// won't route it. This script executes one dust-sized SOL→MEEKO swap
// (default 0.002 SOL) against the CPMM pool to generate that first trade,
// then polls the DexScreener API until the pair appears.
//
// Requirements: NETWORK=mainnet, deployer keypair at ~/.config/solana/id.json
// funded with at least ~0.01 SOL (swap + fees + temporary wSOL rent).
//
//   NETWORK=mainnet npm run token:trigger-index

import { readFileSync } from "fs";
import { Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { NATIVE_MINT } from "@solana/spl-token";
import { Raydium, CurveCalculator } from "@raydium-io/raydium-sdk-v2";
import BN from "bn.js";
import { getRpcUrl, KEYPAIR_PATH, NETWORK } from "./config.js";
import { confirm } from "./confirm.js";

const MEEKO_MINT = "9AqPGi9n7unEA8C6T6ujHxXsg1ywb1Ro6fitw9daMGNa";
const POOL_ID = "F1WJyyEz8JTAANi6B467KTEhfaLEYqj6NkfrcWhbZQXB"; // MEEKO/SOL Raydium CPMM
const SWAP_LAMPORTS = new BN(2_000_000); // 0.002 SOL — dust, just enough to print a trade
const MIN_BALANCE_LAMPORTS = 10_000_000; // 0.01 SOL covers swap + fees + wSOL rent

async function main() {
  if (NETWORK !== "mainnet") {
    throw new Error("The MEEKO pool lives on mainnet — run with NETWORK=mainnet");
  }

  const connection = new Connection(getRpcUrl(), "confirmed");
  const owner = Keypair.fromSecretKey(
    Uint8Array.from(JSON.parse(readFileSync(KEYPAIR_PATH, "utf-8")))
  );
  console.log(`Wallet: ${owner.publicKey.toBase58()}`);

  const raydium = await Raydium.load({
    connection,
    owner,
    cluster: "mainnet",
    disableFeatureCheck: true,
    blockhashCommitment: "confirmed",
  });

  console.log("Fetching pool state from chain...");
  const { poolInfo, poolKeys, rpcData } = await raydium.cpmm.getPoolInfoFromRpc(POOL_ID);

  const inputMint = NATIVE_MINT.toBase58();
  const baseIn = inputMint === poolInfo.mintA.address;
  const outMint = baseIn ? poolInfo.mintB.address : poolInfo.mintA.address;
  if (outMint !== MEEKO_MINT) {
    throw new Error(`Pool output mint ${outMint} is not MEEKO — wrong pool?`);
  }

  const cfg = rpcData.configInfo!;
  const swapResult = CurveCalculator.swapBaseInput(
    SWAP_LAMPORTS,
    baseIn ? rpcData.baseReserve : rpcData.quoteReserve,
    baseIn ? rpcData.quoteReserve : rpcData.baseReserve,
    cfg.tradeFeeRate,
    cfg.creatorFeeRate,
    cfg.protocolFeeRate,
    cfg.fundFeeRate,
    false
  );
  const meekoOut = Number(swapResult.outputAmount.toString()) / 1e9;
  console.log(
    `Swap: ${SWAP_LAMPORTS.toNumber() / LAMPORTS_PER_SOL} SOL → ~${meekoOut.toLocaleString()} MEEKO`
  );

  const balance = await connection.getBalance(owner.publicKey);
  console.log(`Wallet balance: ${balance / LAMPORTS_PER_SOL} SOL`);
  if (balance < MIN_BALANCE_LAMPORTS) {
    console.error(
      `\nNot enough SOL. Fund ${owner.publicKey.toBase58()} with at least 0.01 SOL and re-run.`
    );
    process.exit(1);
  }

  const ok = await confirm(
    `\nThis spends real SOL on mainnet (0.002 SOL swap + fees). Type "yes" to continue: `
  );
  if (!ok) {
    console.log("Aborted.");
    process.exit(0);
  }

  const { execute } = await raydium.cpmm.swap({
    poolInfo,
    poolKeys,
    inputAmount: SWAP_LAMPORTS,
    swapResult,
    slippage: 0.05,
    baseIn,
  });
  const { txId } = await execute({ sendAndConfirm: true });
  console.log(`\nSwap confirmed: https://solscan.io/tx/${txId}`);

  console.log("\nPolling DexScreener for the pair (up to 10 minutes)...");
  for (let i = 0; i < 20; i++) {
    await new Promise((r) => setTimeout(r, 30_000));
    const res = await fetch(
      `https://api.dexscreener.com/latest/dex/tokens/${MEEKO_MINT}`
    );
    const data = (await res.json()) as { pairs?: Array<{ url?: string }> | null };
    if (data.pairs?.length) {
      console.log(`\n✓ MEEKO is live on DexScreener: ${data.pairs[0].url}`);
      console.log("The site's Live Chart section will now embed automatically.");
      return;
    }
    console.log(`  not indexed yet (check ${i + 1}/20)...`);
  }
  console.log(
    "\nStill not indexed after 10 minutes. The trade is on-chain, so give it a few " +
      "hours — if it still doesn't appear, the pool's ~$38 liquidity is below " +
      "DexScreener's spam threshold and the pool needs a real liquidity deposit."
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
