/**
 * MeekoCoin Revoke Mint Authority Script
 *
 * Permanently revokes mint authority, proving the supply is fixed forever.
 * THIS IS IRREVERSIBLE.
 *
 * Usage:
 *   NETWORK=devnet npx tsx src/revoke-authority.ts
 *   NETWORK=mainnet npx tsx src/revoke-authority.ts
 */

import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createSignerFromKeypair,
  keypairIdentity,
  publicKey,
  none,
} from "@metaplex-foundation/umi";
import { setAuthority, AuthorityType } from "@metaplex-foundation/mpl-toolbox";
import { readFileSync, existsSync } from "fs";
import { KEYPAIR_PATH, getRpcUrl, NETWORK } from "./config.js";
import * as readline from "readline";

async function confirm(question: string): Promise<boolean> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === "yes");
    });
  });
}

async function main() {
  console.log("\n========================================");
  console.log("  MeekoCoin Revoke Mint Authority");
  console.log("========================================\n");

  console.log("WARNING: This action is IRREVERSIBLE!");
  console.log("No more tokens can EVER be minted after this.\n");

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
  const umi = createUmi(getRpcUrl());

  const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(keypairData));
  const signer = createSignerFromKeypair(umi, keypair);
  umi.use(keypairIdentity(signer));

  console.log(`Authority: ${signer.publicKey}\n`);

  // Confirm action
  const confirmed = await confirm("Type 'yes' to permanently revoke mint authority: ");

  if (!confirmed) {
    console.log("\nAborted. No changes made.\n");
    process.exit(0);
  }

  console.log("\nRevoking mint authority...");

  // Revoke mint authority
  await setAuthority(umi, {
    owned: publicKey(mintAddress),
    owner: signer,
    authorityType: AuthorityType.MintTokens,
    newAuthority: none(),
  }).sendAndConfirm(umi);

  console.log("\n========================================");
  console.log("  Mint Authority Revoked!");
  console.log("========================================\n");
  console.log("The token supply is now permanently fixed.");
  console.log("No additional tokens can ever be minted.");
  console.log(`\nView on Explorer:`);
  console.log(`https://explorer.solana.com/address/${mintAddress}${NETWORK === "devnet" ? "?cluster=devnet" : ""}`);
  console.log('\nLook for "Mint Authority: Disabled" to confirm.\n');
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
