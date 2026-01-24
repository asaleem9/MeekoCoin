# MeekoCoin ($MEEKO)

A meme cryptocurrency on Solana inspired by Meeko the cat.

**No utility, just vibes.**

## Token Details

- **Name**: MeekoCoin
- **Symbol**: MEEKO
- **Blockchain**: Solana (SPL Token)
- **Total Supply**: 420,690,000 (420.69 million)
- **Decimals**: 9
- **Tax**: 0%
- **Mint Authority**: Revoked (fixed supply forever)

## Project Structure

```
meekocoin/
├── token/           # Solana token creation scripts
│   ├── src/
│   │   ├── config.ts
│   │   ├── create-token.ts
│   │   ├── mint-tokens.ts
│   │   └── revoke-authority.ts
│   └── assets/
│       └── meekocoin-logo.png  # Add your 512x512 logo here
│
└── web/             # Next.js landing page
    ├── app/
    └── components/
```

## Prerequisites

- Node.js 18+
- Solana CLI (`sh -c "$(curl -sSfL https://release.solana.com/stable/install)"`)
- A funded Solana wallet

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Solana

```bash
# Install Solana CLI (if not installed)
sh -c "$(curl -sSfL https://release.solana.com/stable/install)"

# Create a new keypair
solana-keygen new

# Set to devnet for testing
solana config set --url devnet

# Get test SOL
solana airdrop 2
```

### 3. Add Your Logo

Place a 512x512 PNG image at `token/assets/meekocoin-logo.png`

### 4. Create Token (Devnet)

```bash
cd token
npm install
NETWORK=devnet npm run create
```

### 5. Mint Tokens

```bash
NETWORK=devnet npm run mint
```

### 6. Revoke Mint Authority (IRREVERSIBLE)

```bash
NETWORK=devnet npm run revoke
```

### 7. Run Website Locally

```bash
cd web
npm install
npm run dev
```

Open http://localhost:3000

## Mainnet Deployment

1. Ensure you have ~0.05 SOL in your wallet
2. Switch to mainnet: `solana config set --url mainnet-beta`
3. Run creation scripts with `NETWORK=mainnet`
4. Update the contract address in `web/components/ContractAddress.tsx`
5. Deploy website to Vercel

## Website Customization

### Update Contract Address

Edit `web/components/ContractAddress.tsx`:

```typescript
const CONTRACT_ADDRESS = "YOUR_ACTUAL_TOKEN_ADDRESS";
```

### Add Meeko Images

- Hero image: Place in `web/public/meeko-hero.png`
- Update `web/components/Hero.tsx` to use the image

### Update Social Links

Edit the links in `web/components/Hero.tsx` and `web/components/Footer.tsx`

## Disclaimer

MeekoCoin is a memecoin with no intrinsic value or expectation of financial return. It is purely for entertainment purposes. Cryptocurrency investments are highly volatile and risky. Never invest more than you can afford to lose. This is not financial advice. DYOR.

## License

MIT
