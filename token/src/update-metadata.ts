/**
 * MeekoCoin Update Metadata Script
 *
 * Updates the token logo and description on-chain.
 */

import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  updateV1,
  fetchMetadataFromSeeds,
  mplTokenMetadata,
} from "@metaplex-foundation/mpl-token-metadata";
import {
  createSignerFromKeypair,
  keypairIdentity,
  publicKey,
} from "@metaplex-foundation/umi";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";
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
  console.log("  MeekoCoin Metadata Update");
  console.log("========================================\n");
  console.log(`Network: ${NETWORK}`);

  // Get mint address
  if (!existsSync(MINT_ADDRESS_PATH)) {
    console.error("Mint address not found.");
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
  const umi = createUmi(getRpcUrl())
    .use(mplTokenMetadata())
    .use(irysUploader({
      address: NETWORK === "mainnet"
        ? "https://node1.irys.xyz"
        : "https://devnet.irys.xyz",
    }));

  const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(keypairData));
  const signer = createSignerFromKeypair(umi, keypair);
  umi.use(keypairIdentity(signer));

  console.log(`Update Authority: ${signer.publicKey}\n`);

  // Upload new logo
  if (!existsSync(TOKEN_CONFIG.logoPath)) {
    console.error(`Logo not found at: ${TOKEN_CONFIG.logoPath}`);
    process.exit(1);
  }

  console.log("Uploading new logo to Arweave...");
  const imageBuffer = readFileSync(TOKEN_CONFIG.logoPath);
  const logoFile = {
    buffer: imageBuffer,
    fileName: "meekocoin-logo.png",
    displayName: "MeekoCoin Logo",
    uniqueName: "meekocoin-logo-v2",
    contentType: "image/png",
    extension: "png",
    tags: [{ name: "Content-Type", value: "image/png" }],
  };

  const uploadPrice = await umi.uploader.getUploadPrice([logoFile]);
  console.log(`Upload cost: ${Number(uploadPrice.basisPoints) / 1e9} ${uploadPrice.identifier}`);

  const [imageUri] = await umi.uploader.upload([logoFile]);
  console.log(`Logo uploaded: ${imageUri}`);

  // Upload new metadata
  console.log("\nUploading new metadata to Arweave...");
  const metadata = {
    name: TOKEN_CONFIG.name,
    symbol: TOKEN_CONFIG.symbol,
    description: TOKEN_CONFIG.description,
    image: imageUri,
    external_url: TOKEN_CONFIG.website,
    attributes: [
      { trait_type: "Category", value: "Memecoin" },
      { trait_type: "Blockchain", value: "Solana" },
      { trait_type: "Personality", value: "Smol but fierce" },
      { trait_type: "Favorite Activity", value: "Licking plastic bags" },
    ],
    properties: {
      files: [{ uri: imageUri, type: "image/png" }],
      category: "image",
    },
  };

  const metadataUri = await umi.uploader.uploadJson(metadata);
  console.log(`Metadata uploaded: ${metadataUri}`);

  // Update on-chain metadata
  console.log("\nUpdating on-chain metadata...");

  const mintPubkey = publicKey(mintAddress);
  const initialMetadata = await fetchMetadataFromSeeds(umi, { mint: mintPubkey });

  await updateV1(umi, {
    mint: mintPubkey,
    authority: signer,
    data: {
      name: initialMetadata.name,
      symbol: initialMetadata.symbol,
      uri: metadataUri,
      sellerFeeBasisPoints: initialMetadata.sellerFeeBasisPoints,
      creators: initialMetadata.creators,
    },
  }).sendAndConfirm(umi);

  console.log("\n========================================");
  console.log("  Metadata Updated Successfully!");
  console.log("========================================\n");
  console.log(`New Image: ${imageUri}`);
  console.log(`New Metadata: ${metadataUri}`);
  console.log(`\nView on Explorer:`);
  console.log(`https://explorer.solana.com/address/${mintAddress}${NETWORK === "devnet" ? "?cluster=devnet" : ""}`);
  console.log("\nNote: It may take a few minutes for explorers to refresh the cached metadata.\n");
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
