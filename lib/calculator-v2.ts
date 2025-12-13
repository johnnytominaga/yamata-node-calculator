import { CalculatorV2Inputs, CalculatorV2Results } from './types';
import {
  getPurchasePriceUSD,
  getYearlyReward,
  totalSupply,
} from './data-helpers';

export function calculateRewardsV2(
  inputs: CalculatorV2Inputs
): CalculatorV2Results {
  const { currentTier, quantity, expectedFDV, nodesSoldYear1, monthlyVolume, feePercentage } = inputs;

  // ============================================
  // TOTAL INVESTMENT CALCULATION
  // ============================================
  // Get USD price per node from tier data
  const pricePerNodeUSD = getPurchasePriceUSD(currentTier);
  // Total investment = price per node × quantity of nodes purchased
  const totalInvestment = pricePerNodeUSD * quantity;

  // Calculate dollar value per token based on expected FDV
  const dollarPerToken = expectedFDV / totalSupply;

  // ============================================
  // BASE REWARDS (TOKEN EMISSION)
  // ============================================
  // 20% of total token supply allocated as base rewards
  // Distributed on yearly halving basis over 5 years after launch
  // These rewards are split equally among all activated nodes
  const year1TotalTokenRewards = getYearlyReward(1);
  const tokensPerNode = nodesSoldYear1 > 0 ? year1TotalTokenRewards / nodesSoldYear1 : 0;
  const baseRewardPerNode = tokensPerNode * dollarPerToken;
  // Scale by quantity: total base rewards = per node reward × number of nodes owned
  const year1BaseRewards = baseRewardPerNode * quantity;
  const year1TotalTokens = tokensPerNode * quantity;

  // ============================================
  // TRANSACTION FEE REWARDS
  // ============================================
  // Transaction fees are split:
  // - 10% to node holders (validator nodes)
  // - 10% burn
  // - 10% to Yamata for future rewards
  // Only the 10% to node holders is calculated here
  const yearlyRevenue = monthlyVolume * 12 * (feePercentage / 100);
  const validatorShare = yearlyRevenue * 0.10; // 10% of fees go to node holders
  const feeRewardPerNode = nodesSoldYear1 > 0 ? validatorShare / nodesSoldYear1 : 0;
  // Scale by quantity: total fee rewards = per node reward × number of nodes owned
  const year1FeeRewards = feeRewardPerNode * quantity;

  // ============================================
  // COMBINED TOTALS & ROI
  // ============================================
  // Total rewards combine both base token emissions and transaction fees
  const year1TotalRewards = year1BaseRewards + year1FeeRewards;

  // Annual ROI: (total year 1 rewards / total investment) × 100
  const year1APY = totalInvestment > 0 ? (year1TotalRewards / totalInvestment) * 100 : 0;

  return {
    totalInvestment,
    year1BaseRewards,
    year1FeeRewards,
    year1TotalRewards,
    baseRewardPerNode,
    feeRewardPerNode,
    year1TokensPerNode: tokensPerNode,
    year1TotalTokens,
    year1APY,
  };
}

export function formatCurrencyV2(num: number, decimals: number = 2): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
}

export function formatNumberV2(num: number): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
}
