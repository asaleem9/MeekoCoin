# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MeekoCoin is a Solana SPL memecoin with a Next.js landing page. The project uses npm workspaces with two packages: `token` (Solana scripts) and `web` (Next.js site).

**Live Token:** `9AqPGi9n7unEA8C6T6ujHxXsg1ywb1Ro6fitw9daMGNa` (mainnet, mint authority revoked)

## Commands

### Token Scripts (require Solana CLI + funded wallet)
```bash
# Set network via environment variable
NETWORK=devnet npm run token:create   # Create token with metadata on Arweave
NETWORK=devnet npm run token:mint     # Mint full supply to deployer wallet
NETWORK=devnet npm run token:revoke   # Permanently revoke mint authority (IRREVERSIBLE)

# Update metadata (logo/description) - run from token/ directory
NETWORK=mainnet npm run update
```

### Web Development
```bash
npm run web:dev      # Start dev server (localhost:3000)
npm run web:build    # Production build
```

### Install Dependencies
```bash
npm install          # Installs both workspaces
```

## Architecture

### Token Scripts (`token/src/`)
- **config.ts** - Central configuration: token name, symbol, supply (420.69M), RPC endpoints, keypair path
- **create-token.ts** - Uploads logo/metadata to Arweave via Irys, creates SPL token mint with Metaplex metadata
- **mint-tokens.ts** - Mints entire supply to deployer wallet
- **revoke-authority.ts** - Permanently disables minting (uses `mpl-toolbox` setAuthority)
- **update-metadata.ts** - Updates on-chain metadata (logo, description) without affecting supply

All scripts read `NETWORK` env var (`devnet`|`mainnet`) and keypair from `~/.config/solana/id.json`.

### Web (`web/`)
Next.js 14 App Router with Tailwind CSS and Framer Motion.

Key files:
- `components/ContractAddress.tsx` - Contains the hardcoded token mint address
- `components/Hero.tsx` - Main hero with logo from `/public/meeko-logo.png`
- `app/globals.css` - Custom Tailwind theme (meeko-orange, meeko-gold colors)

## Token Configuration

Edit `token/src/config.ts` to change:
- Token name/symbol/description
- Total supply (currently 420,690,000 with 9 decimals)
- External links (website, twitter)
- Logo path

## Solana Tooling

Uses Metaplex Umi framework with:
- `@metaplex-foundation/mpl-token-metadata` - Token metadata program
- `@metaplex-foundation/mpl-toolbox` - Authority management
- `@metaplex-foundation/umi-uploader-irys` - Arweave uploads via Irys
