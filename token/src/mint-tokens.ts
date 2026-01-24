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
import {
  createSignerFromKeypair,
  keypairIdentity,
  publicKey,
} from "@metaplex-foundation/umi";
import { readFileSync, existsSync } from "fs";
import { TOKEN_CONFIG, KEYPAIR_PATH, getRpcUrl, NETWORK } from "./config.js";

async function main() {
  console.log("\n========================================");
  console.log("  MeekoCoin Token Minting");
  console.log("========================================\n");
  console.log(`Network: ${NETWORK}`);

  // Get mint address
  const mintAddressPath = "./mint-address.txt";
  if (!existsSync(mintAddressPath)) {
    console.error("Mint address not found. Run create-token.ts first.");
    process.exit(1);
  }
  const mintAddress = readFileSync(mintAddressPath, "utf-8").trim();
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
