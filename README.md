# Yamata Node Calculator

A Next.js application for calculating projected rewards from Yamata Node validators.

## Features

- **Modern Stack**: Built with Next.js 15, TypeScript, Tailwind CSS, and shadcn/ui
- **Dark Theme**: Sleek dark interface matching the Yamata design
- **Custom Fonts**: Integrated Yamata fonts (Eurostile, HCapsule, PixelOperator)
- **Real-time Calculations**: Instant reward calculations based on user inputs
- **Exchange Presets**: Pre-configured settings for major exchanges (Binance, Uniswap, etc.)
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Getting Started

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Build the production application:

```bash
npm run build
npm start
```

## Project Structure

```
yamata-calculator/
├── app/                      # Next.js app router
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Main calculator page
│   └── globals.css          # Global styles and fonts
├── components/              # React components
│   ├── calculator-sidebar.tsx      # Input controls sidebar
│   ├── calculator-results.tsx      # Results display
│   ├── metric-card.tsx            # Reusable metric card
│   └── ui/                        # shadcn/ui components
├── lib/                     # Core logic and utilities
│   ├── calculator.ts        # Calculation logic
│   ├── data-helpers.ts      # Data access functions
│   ├── exchanges.ts         # Exchange configurations
│   ├── eth-price.ts         # ETH price fetching
│   ├── types.ts            # TypeScript type definitions
│   └── data.json           # Tier data (converted from Excel)
├── public/                  # Static assets
│   ├── fonts/              # Yamata custom fonts
│   ├── yamata.png          # Yamata logo
│   └── blacktokenomics.png # Blacktokenomics logo
└── scripts/                 # Build scripts
    └── convertExcel.js      # Excel to JSON converter
```

## How It Works

### Calculator Inputs

1. **Purchase Currency**: Select the coin for purchase (USDT)
2. **Node System Inputs**:
   - Current Tier: The tier at which nodes are currently being sold (1-50)
   - Purchase Tier: The tier at which you purchased your node
3. **Token FDV Target**: Expected Fully Diluted Valuation
4. **Exchange Volume & Fees**:
   - Select an exchange to mimic (or custom)
   - Advanced settings for volume and fee adjustments

### Reward Calculations

The calculator computes two types of rewards:

#### 1. Token Emission Rewards
- 20% of total token supply distributed to nodes over 5 years
- Yearly halving schedule
- Split equally among all active nodes

#### 2. Transaction Fee Rewards
- 10% of Yamata exchange transaction fees
- Distributed equally among all active nodes
- Based on monthly exchange volume and fee percentage

### Results Display

- **Total Rewards**: Combined base + fee rewards
- **Tokenomics Emission**: Daily, monthly, yearly, and lifetime token rewards
- **Transaction Fees**: Fee-based rewards at different time scales
- **Annual Reward Rate**: ROI calculations and node purchase price

## Data Source

The calculator uses tier data from `yamata-nodes.xlsx` which is converted to JSON format during build. The data includes:

- Tier levels (1-50)
- Cumulative keys per tier
- Unit prices in ETH
- Reward schedules
- FDV options

## API Integration

The calculator fetches real-time Ethereum prices from CoinGecko API to convert node prices from ETH to USD. If the API is unavailable, it falls back to a default price of $3,500.

## Customization

### Adding New Exchanges

Edit `lib/exchanges.ts` to add new exchange presets:

```typescript
export const exchanges: Record<string, Exchange> = {
  'NewExchange': { volume: 1000000000, fee: 0.100 },
  // ...
};
```

### Updating Tier Data

1. Update the `public/yamata-nodes.xlsx` file
2. Run the conversion script:
   ```bash
   node scripts/convertExcel.js
   ```

### Styling

The application uses Tailwind CSS with custom color variables defined in `app/globals.css`. Key colors:

- **Background**: `hsl(220 13% 13%)`
- **Primary/Accent**: `hsl(180 77% 58%)` (Cyan)
- **Destructive**: `hsl(347 77% 50%)` (Pink/Red)
- **Card**: `hsl(220 13% 18%)`

## Technologies

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Data Processing**: xlsx (for Excel conversion)
- **Icons**: Lucide React

## License

This calculator is provided by Blacktokenomics. Yamata does not own, moderate, or influence this calculator.

## Disclaimer

The assumptions made within this calculator are speculative and are chosen by the user. We do not guarantee returns based on these assumptions.
