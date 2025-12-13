import tierDataJson from './data.json';
import { TierData } from './types';

const tierData = tierDataJson as TierData[];

// Extract unique values
export const currentTierOptions = Array.from(
  new Set(tierData.map(d => d['Current Tier']).filter((v): v is number => v !== undefined))
).sort((a, b) => a - b) as number[];

export const purchaseTierOptions = Array.from(
  new Set(tierData.map(d => d['Purchase Tier']).filter((v): v is number => v !== undefined))
).sort((a, b) => a - b) as number[];

export const expectedFDVOptions = Array.from(
  new Set(tierData.map(d => d['Expected FDV']).filter((v): v is number => v !== undefined && !isNaN(v)))
).sort((a, b) => a - b) as number[];

export const totalSupply = tierData.find(d => d['Total Supply'])?.['Total Supply'] || 1000000000;

export const totalYearlyRewards = Array.from(
  new Set(tierData.map(d => d['Total Rewards per Year']).filter(v => v !== undefined))
);

// Helper functions
export function getTierData(tier: number): TierData | undefined {
  return tierData.find(d => d['Current Tier'] === tier);
}

export function getPurchasePrice(tier: number): number {
  const data = tierData.find(d => d['Purchase Tier'] === tier);
  return data ? parseFloat(data['Unit Price']) : 0;
}

export function getPurchasePriceUSD(tier: number): number {
  const data = tierData.find(d => d['Purchase Tier'] === tier);
  return data?.['USD Price'] || 0;
}

export function getCumulativeKeys(tier: number): number {
  const data = getTierData(tier);
  return data ? data['Comulative Keys'] : 0;
}

export function getYearlyReward(year: number): number {
  const data = tierData.find(d => d.Year === year);
  return data?.['Total Rewards per Year'] || 0;
}

export { tierData };
