/**
 * MeekoCoin Revoke Freeze Authority Script
 *
 * Permanently revokes freeze authority so no wallets can ever be frozen.
 * THIS IS IRREVERSIBLE.
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

async function main() {
  console.log("\n========================================");
  console.log("  MeekoCoin Revoke Freeze Authority");
  console.log("========================================\n");

  console.log("This will permanently remove the ability to freeze any wallets.");
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
  console.log("Revoking freeze authority...");

  // Revoke freeze authority
  await setAuthority(umi, {
    owned: publicKey(mintAddress),
    owner: signer,
    authorityType: AuthorityType.FreezeAccount,
    newAuthority: none(),
  }).sendAndConfirm(umi);

  console.log("\n========================================");
  console.log("  Freeze Authority Revoked!");
  console.log("========================================\n");
  console.log("No wallets can ever be frozen.");
  console.log(`\nView on Explorer:`);
  console.log(`https://explorer.solana.com/address/${mintAddress}${NETWORK === "devnet" ? "?cluster=devnet" : ""}`);
  console.log('\nDEXScreener warning should disappear soon.\n');
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
