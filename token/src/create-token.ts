/**
 * MeekoCoin Token Creation Script
 *
 * Creates the MEEKO token on Solana with metadata using Metaplex Umi.
 *
 * Usage:
 *   NETWORK=devnet npx tsx src/create-token.ts
 *   NETWORK=mainnet npx tsx src/create-token.ts
 */

import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createV1,
  mplTokenMetadata,
  TokenStandard,
} from "@metaplex-foundation/mpl-token-metadata";
import {
  createSignerFromKeypair,
  generateSigner,
  keypairIdentity,
  percentAmount,
} from "@metaplex-foundation/umi";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";
import { readFileSync, writeFileSync, existsSync } from "fs";
import {
  TOKEN_CONFIG,
  KEYPAIR_PATH,
  MINT_ADDRESS_PATH,
  getRpcUrl,
  NETWORK,
} from "./config.js";

async function main() {
  console.log("\n========================================");
  console.log("  MeekoCoin Token Creation");
  console.log("========================================\n");
  console.log(`Network: ${NETWORK}`);
  console.log(`RPC: ${getRpcUrl()}\n`);

  // Refuse to clobber an existing deployment
  if (existsSync(MINT_ADDRESS_PATH)) {
    const existing = readFileSync(MINT_ADDRESS_PATH, "utf-8").trim();
    console.error(`A token was already created: ${existing}`);
    console.error(`Delete ${MINT_ADDRESS_PATH} first if you really want a new mint.`);
    process.exit(1);
  }

  // Load keypair
  if (!existsSync(KEYPAIR_PATH)) {
    console.error(`Keypair not found at: ${KEYPAIR_PATH}`);
    console.error("Run: solana-keygen new");
    process.exit(1);
  }

  const keypairData = JSON.parse(readFileSync(KEYPAIR_PATH, "utf-8"));

  // Initialize Umi
  const umi = createUmi(getRpcUrl())
    .use(mplTokenMetadata())
    .use(irysUploader({
      address: NETWORK === "mainnet"
        ? "https://node1.irys.xyz"
        : "https://devnet.irys.xyz",
    }));

  // Create signer from keypair
  const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(keypairData));
  const signer = createSignerFromKeypair(umi, keypair);
  umi.use(keypairIdentity(signer));

  console.log(`Deployer: ${signer.publicKey}`);

  // Check balance
  const balance = await umi.rpc.getBalance(signer.publicKey);
  const solBalance = Number(balance.basisPoints) / 1e9;
  console.log(`Balance: ${solBalance.toFixed(4)} SOL\n`);

  if (solBalance < 0.05) {
    if (NETWORK === "devnet") {
      console.log("Low balance. Request airdrop with: solana airdrop 2");
    } else {
      console.error("Insufficient balance for mainnet deployment. Need ~0.05 SOL");
    }
    process.exit(1);
  }

  // Upload logo image
  if (!existsSync(TOKEN_CONFIG.logoPath)) {
    console.error(`Logo not found at: ${TOKEN_CONFIG.logoPath}`);
    console.error("Add the logo before creating the token.");
    process.exit(1);
  }

  console.log("Uploading logo to Arweave...");
  const imageBuffer = readFileSync(TOKEN_CONFIG.logoPath);
  const logoFile = {
    buffer: imageBuffer,
    fileName: "meekocoin-logo.png",
    displayName: "MeekoCoin Logo",
    uniqueName: "meekocoin-logo",
    contentType: "image/png",
    extension: "png",
    tags: [{ name: "Content-Type", value: "image/png" }],
  };

  const uploadPrice = await umi.uploader.getUploadPrice([logoFile]);
  console.log(`Upload cost: ${Number(uploadPrice.basisPoints) / 1e9} ${uploadPrice.identifier}`);

  const [imageUri] = await umi.uploader.upload([logoFile]);
  console.log(`Logo uploaded: ${imageUri}`);

  // Upload metadata JSON
  console.log("\nUploading metadata to Arweave...");
  const metadata = {
    name: TOKEN_CONFIG.name,
    symbol: TOKEN_CONFIG.symbol,
    description: TOKEN_CONFIG.description,
    image: imageUri,
    external_url: TOKEN_CONFIG.website,
    attributes: [
      { trait_type: "Category", value: "Memecoin" },
      { trait_type: "Blockchain", value: "Solana" },
    ],
    properties: {
      files: [{ uri: imageUri, type: "image/png" }],
      category: "image",
    },
  };

  const metadataUri = await umi.uploader.uploadJson(metadata);
  console.log(`Metadata uploaded: ${metadataUri}`);

  // Generate mint keypair
  const mint = generateSigner(umi);
  console.log(`\nMint Address: ${mint.publicKey}`);

  // Create token with metadata
  console.log("\nCreating token...");

  await createV1(umi, {
    mint,
    authority: signer,
    name: TOKEN_CONFIG.name,
    symbol: TOKEN_CONFIG.symbol,
    uri: metadataUri,
    sellerFeeBasisPoints: percentAmount(0), // No royalties
    decimals: TOKEN_CONFIG.decimals,
    tokenStandard: TokenStandard.Fungible,
  }).sendAndConfirm(umi);

  console.log("\n========================================");
  console.log("  Token Created Successfully!");
  console.log("========================================\n");
  console.log(`Token Name: ${TOKEN_CONFIG.name}`);
  console.log(`Symbol: ${TOKEN_CONFIG.symbol}`);
  console.log(`Mint Address: ${mint.publicKey}`);
  console.log(`Metadata URI: ${metadataUri}`);
  console.log(`\nView on Explorer:`);
  console.log(`https://explorer.solana.com/address/${mint.publicKey}${NETWORK === "devnet" ? "?cluster=devnet" : ""}`);
  console.log("\n*** SAVE THE MINT ADDRESS ABOVE ***");
  console.log("You'll need it for the next steps.\n");

  // Save mint address to file for other scripts
  writeFileSync(MINT_ADDRESS_PATH, mint.publicKey.toString(), "utf-8");
  console.log(`Mint address saved to: ${MINT_ADDRESS_PATH}\n`);
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
