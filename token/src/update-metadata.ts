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
import { TOKEN_CONFIG, KEYPAIR_PATH, getRpcUrl, NETWORK } from "./config.js";

const NEW_DESCRIPTION = `Meeko thinks he's a big strong man, but he's actually just a little fry. 420.69 million tokens of pure grr energy. He'll chase his toy like he's hunting the next 100x, growl under the bed like a whale defending support, and lick plastic bags because... well, that's just Meeko. Scared of doorbells, fearless in the charts. Fixed supply, no rugs, just a little guy pretending to be huge. HODL like Meeko HODLs his favorite crinkly bag.`;

async function main() {
  console.log("\n========================================");
  console.log("  MeekoCoin Metadata Update");
  console.log("========================================\n");
  console.log(`Network: ${NETWORK}`);

  // Get mint address
  const mintAddressPath = "./mint-address.txt";
  if (!existsSync(mintAddressPath)) {
    console.error("Mint address not found.");
    process.exit(1);
  }
  const mintAddress = readFileSync(mintAddressPath, "utf-8").trim();
  console.log(`Mint Address: ${mintAddress}`);

  // Load keypair
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
  console.log("Uploading new logo to Arweave...");
  const imageBuffer = readFileSync(TOKEN_CONFIG.logoPath);
  const [imageUri] = await umi.uploader.upload([
    {
      buffer: imageBuffer,
      fileName: "meekocoin-logo.png",
      displayName: "MeekoCoin Logo",
      uniqueName: "meekocoin-logo-v2",
      contentType: "image/png",
      extension: "png",
      tags: [{ name: "Content-Type", value: "image/png" }],
    },
  ]);
  console.log(`Logo uploaded: ${imageUri}`);

  // Upload new metadata
  console.log("\nUploading new metadata to Arweave...");
  const metadata = {
    name: TOKEN_CONFIG.name,
    symbol: TOKEN_CONFIG.symbol,
    description: NEW_DESCRIPTION,
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
      ...initialMetadata,
      uri: metadataUri,
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
