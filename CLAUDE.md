# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js application that calculates projected rewards from Yamata Node validators. Users can input their node purchase tier, current tier being sold, expected FDV, and exchange volume/fees to calculate their potential returns.

## Development Commands

### Run Development Server
```bash
npm run dev
```
Starts the Next.js development server on http://localhost:3000

### Build Production
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

### Convert Excel to JSON
```bash
node scripts/convertExcel.js
```
Converts `public/yamata-nodes.xlsx` to `lib/data.json`. Run this whenever the Excel file is updated with new tier data.

## Architecture

### State Management
The application uses React's `useState` and `useMemo` for state management. Main state lives in `app/page.tsx`:
- `inputs`: All calculator input parameters (CalculatorInputs type)
- `ethPrice`: Fetched from CoinGecko API on mount
- `results`: Computed via `calculateRewards()` whenever inputs/ethPrice change

### Calculator Logic (lib/calculator.ts)
The core calculation happens in `calculateRewards()`:
1. **Token Emission Rewards**: 20% of total supply distributed over 5 years with yearly halving
   - Uses `getYearlyReward(year)` to get total rewards for each year
   - Divides by cumulative keys to get per-node rewards
   - Multiplies by dollar per reward unit (FDV / total supply)
2. **Transaction Fee Rewards**: 10% of exchange fees go to validators
   - Monthly revenue = volume * fee percentage
   - Validator share = 10% of revenue, split among all nodes
3. **Combined calculations** for daily, monthly, yearly, and lifetime rewards

### Data Flow
1. User inputs → `CalculatorInputs` state in page.tsx
2. Inputs + ethPrice → `calculateRewards()` function
3. Returns `CalculatorResults` → passed to CalculatorResultsDisplay component
4. Results displayed in metric cards

### Responsive Design Pattern
The application uses a unique mobile/desktop pattern:
- **Desktop (lg+)**: Fixed sidebar on left, scrollable results on right
- **Mobile**: Drawer component that slides in from left with sidebar contents
- `hasMounted` state prevents hydration mismatch by only rendering drawer after mount

### Data Source
Tier data comes from `public/yamata-nodes.xlsx` → converted to `lib/data.json` via scripts/convertExcel.js
- Contains tier levels (1-50), cumulative keys, unit prices in ETH, reward schedules
- Helper functions in `lib/data-helpers.ts` access this data: `getCumulativeKeys()`, `getPurchasePrice()`, `getYearlyReward()`

## Key Files

- `app/page.tsx`: Main page with state management, drawer logic, and layout structure
- `components/calculator-sidebar.tsx`: All input controls (tiers, FDV, exchange settings)
- `components/calculator-results.tsx`: Results display with metric cards
- `lib/calculator.ts`: Core calculation logic and formatting utilities
- `lib/types.ts`: TypeScript interfaces for CalculatorInputs, CalculatorResults, TierData
- `lib/data-helpers.ts`: Functions to access tier data from data.json
- `lib/exchanges.ts`: Exchange presets with volume and fee data

## Important Patterns

### Exchange Selection
When user selects an exchange, both `monthlyVolume` and `feePercentage` are updated together from the `exchanges` object. "Custom" exchange allows manual adjustment via sliders.

### Advanced Settings Toggle
The `showAdvanced` checkbox reveals volume and fee sliders. These are also shown automatically when "Custom" exchange is selected.

### ETH Price Fetching
On mount, app fetches current ETH price from CoinGecko API. Falls back to $3500 if fetch fails. This converts node prices from ETH to USD.

### Number Formatting
Use the utility functions in `lib/calculator.ts`:
- `formatNumber(num)`: For whole numbers with commas
- `formatCurrency(num, decimals)`: For USD values
- `formatPercentage(num)`: For percentage values

## Styling

Uses Tailwind CSS v4 with custom design tokens in `app/globals.css`:
- Dark theme with cyan accents
- Custom Yamata fonts: Eurostile (headings), HCapsule (display), PixelOperator (monospace)
- shadcn/ui components customized to match Yamata design
- CSS variables for colors: `--background`, `--card`, `--primary`, `--accent`, `--destructive`

## Adding New Features

### Adding a New Exchange Preset
Edit `lib/exchanges.ts` and add to the `exchanges` object with volume and fee properties.

### Modifying Calculation Logic
Edit the `calculateRewards()` function in `lib/calculator.ts`. The function returns a `CalculatorResults` object - if adding new calculated values, update the interface in `lib/types.ts` first.

### Adding New Input Controls
Add to `CalculatorInputs` interface in `lib/types.ts`, then add UI controls in `components/calculator-sidebar.tsx`.
