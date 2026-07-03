/**
 * MeekoCoin Mint Script
 *
 * Mints the full supply of MEEKO tokens to the deployer wallet.
 *
 * Usage:
 *   NETWORK=devnet npx tsx src/mint-tokens.ts
 *   NETWORK=mainnet npx tsx src/mint-tokens.ts
 */

import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { mintV1, mplTokenMetadata, TokenStandard } from "@metaplex-foundation/mpl-token-metadata";
import { fetchMint } from "@metaplex-foundation/mpl-toolbox";
import {
  createSignerFromKeypair,
  keypairIdentity,
  publicKey,
} from "@metaplex-foundation/umi";
import { readFileSync, existsSync } from "fs";
import {
  TOKEN_CONFIG,
  KEYPAIR_PATH,
  MINT_ADDRESS_PATH,
  getRpcUrl,
  NETWORK,
} from "./config.js";

async function main() {
  console.log("\n========================================");
  console.log("  MeekoCoin Token Minting");
  console.log("========================================\n");
  console.log(`Network: ${NETWORK}`);

  // Get mint address
  if (!existsSync(MINT_ADDRESS_PATH)) {
    console.error("Mint address not found. Run create-token.ts first.");
    process.exit(1);
  }
  const mintAddress = readFileSync(MINT_ADDRESS_PATH, "utf-8").trim();
  console.log(`Mint Address: ${mintAddress}`);

  // Load keypair
  if (!existsSync(KEYPAIR_PATH)) {
    console.error(`Keypair not found at: ${KEYPAIR_PATH}`);
    process.exit(1);
  }
  const keypairData = JSON.parse(readFileSync(KEYPAIR_PATH, "utf-8"));

  // Initialize Umi
  const umi = createUmi(getRpcUrl()).use(mplTokenMetadata());

  const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(keypairData));
  const signer = createSignerFromKeypair(umi, keypair);
  umi.use(keypairIdentity(signer));

  console.log(`Deployer: ${signer.publicKey}`);

  // Refuse to mint twice — the full supply is minted in one shot
  const mintAccount = await fetchMint(umi, publicKey(mintAddress));
  if (mintAccount.supply > 0n) {
    const minted = Number(mintAccount.supply) / 10 ** TOKEN_CONFIG.decimals;
    console.error(`\nSupply already minted: ${minted.toLocaleString()} MEEKO.`);
    console.error("Aborting to prevent double-minting.");
    process.exit(1);
  }

  console.log(`\nMinting ${TOKEN_CONFIG.totalSupplyDisplay} MEEKO tokens...`);

  // Mint full supply
  await mintV1(umi, {
    mint: publicKey(mintAddress),
    authority: signer,
    amount: TOKEN_CONFIG.totalSupply,
    tokenOwner: signer.publicKey,
    tokenStandard: TokenStandard.Fungible,
  }).sendAndConfirm(umi);

  console.log("\n========================================");
  console.log("  Minting Complete!");
  console.log("========================================\n");
  console.log(`Minted: ${TOKEN_CONFIG.totalSupplyDisplay} MEEKO`);
  console.log(`To: ${signer.publicKey}`);
  console.log(`\nView on Explorer:`);
  console.log(`https://explorer.solana.com/address/${mintAddress}${NETWORK === "devnet" ? "?cluster=devnet" : ""}`);
  console.log("\nNext step: Run revoke-authority.ts to lock the supply permanently.\n");
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
