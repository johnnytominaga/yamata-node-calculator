export interface TierData {
  Tier: number;
  Keys: number;
  "Comulative Keys": number;
  "Unit Price": string;
  "Current Tier": number;
  "Purchase Tier": number;
  "Expected FDV"?: number;
  "__EMPTY_2"?: number;
  "Total Supply"?: number;
  Year?: number;
  "Total Rewards per Year"?: number;
}

export interface Exchange {
  volume: number;
  fee: number;
}

export interface CalculatorInputs {
  currentTier: number;
  purchaseTier: number;
  expectedFDV: number;
  selectedExchange: string;
  monthlyVolume: number;
  feePercentage: number;
  showAdvanced: boolean;
}

export interface CalculatorResults {
  // Token emission rewards
  dailyReward: number;
  monthlyReward: number;
  yearlyReward: number;
  lifetimeReward: number;

  // Token amounts
  dailyTokens: number;
  monthlyTokens: number;
  yearlyTokens: number;
  lifetimeTokens: number;

  // Fee rewards
  dailyFeeRevenue: number;
  monthlyFeeRevenue: number;
  yearlyFeeRevenue: number;

  // Combined totals
  totalDailyReward: number;
  totalMonthlyReward: number;
  totalYearlyReward: number;

  // Purchase and ROI
  purchasePrice: number;
  yearlyAPY: number;

  // Metadata
  cumulativeKeys: number;
  ethPrice: number;
}
