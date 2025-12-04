import { CalculatorInputs, CalculatorResults } from './types';
import {
  getCumulativeKeys,
  getPurchasePrice,
  getYearlyReward,
  totalSupply,
} from './data-helpers';

export function calculateRewards(
  inputs: CalculatorInputs,
  ethPrice: number
): CalculatorResults {
  const { currentTier, purchaseTier, expectedFDV, monthlyVolume, feePercentage } = inputs;

  // Get tier data
  const cumulativeKeys = getCumulativeKeys(currentTier);
  const purchasePriceEth = getPurchasePrice(purchaseTier);
  const purchasePrice = purchasePriceEth * ethPrice;

  // Calculate dollar per reward unit
  const dollarPerRewardUnit = expectedFDV / totalSupply;

  // Calculate token emission rewards for each year
  const yearRewards: number[] = [];
  const yearTokens: number[] = [];

  for (let year = 1; year <= 5; year++) {
    const totalRewardsForYear = getYearlyReward(year);
    if (totalRewardsForYear && cumulativeKeys > 0) {
      const rewardPerNode = totalRewardsForYear / cumulativeKeys;
      const nodeRewardsDollars = rewardPerNode * dollarPerRewardUnit;

      yearRewards.push(nodeRewardsDollars);
      yearTokens.push(rewardPerNode);
    } else {
      yearRewards.push(0);
      yearTokens.push(0);
    }
  }

  // Year 1 rewards
  const yearlyReward = yearRewards[0] || 0;
  const yearlyTokens = yearTokens[0] || 0;
  const monthlyReward = yearlyReward / 12;
  const dailyReward = monthlyReward / 30;
  const monthlyTokens = yearlyTokens / 12;
  const dailyTokens = monthlyTokens / 30;

  // Lifetime rewards (sum of all 5 years)
  const lifetimeReward = yearRewards.reduce((sum, reward) => sum + reward, 0);
  const lifetimeTokens = yearTokens.reduce((sum, tokens) => sum + tokens, 0);

  // Calculate fee revenues
  const monthlyRevenue = monthlyVolume * (feePercentage / 100);
  const validatorShare = monthlyRevenue * 0.10; // 10% goes to validators
  const monthlyFeeRevenue = cumulativeKeys > 0 ? validatorShare / cumulativeKeys : 0;
  const dailyFeeRevenue = monthlyFeeRevenue / 30;
  const yearlyFeeRevenue = monthlyFeeRevenue * 12;

  // Combined totals
  const totalDailyReward = dailyReward + dailyFeeRevenue;
  const totalMonthlyReward = monthlyReward + monthlyFeeRevenue;
  const totalYearlyReward = yearlyReward + yearlyFeeRevenue;

  // Calculate APY
  const yearlyAPY = purchasePrice > 0 ? (totalYearlyReward / purchasePrice) * 100 : 0;

  return {
    dailyReward,
    monthlyReward,
    yearlyReward,
    lifetimeReward,
    dailyTokens,
    monthlyTokens,
    yearlyTokens,
    lifetimeTokens,
    dailyFeeRevenue,
    monthlyFeeRevenue,
    yearlyFeeRevenue,
    totalDailyReward,
    totalMonthlyReward,
    totalYearlyReward,
    purchasePrice,
    yearlyAPY,
    cumulativeKeys,
    ethPrice,
  };
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
}

export function formatCurrency(num: number, decimals: number = 2): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
}

export function formatPercentage(num: number): string {
  return `${num.toFixed(2)}%`;
}
