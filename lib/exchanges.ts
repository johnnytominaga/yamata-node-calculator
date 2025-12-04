import { Exchange } from './types';

export const exchanges: Record<string, Exchange> = {
  'Binance': { volume: 624881131654, fee: 0.100 },
  'Bybit': { volume: 123850127092, fee: 0.050 },
  'OKX': { volume: 98243165806, fee: 0.125 },
  'Coinbase': { volume: 85995559262, fee: 0.130 },
  'Gate': { volume: 69714224483, fee: 0.200 },
  'Uniswap': { volume: 61524304906, fee: 0.300 },
  'Bitget': { volume: 57740714435, fee: 0.100 },
  'MEXC': { volume: 46025939519, fee: 0.030 },
  'Crypto.com': { volume: 39589251158, fee: 0.130 },
  'PancakeSwap': { volume: 14697194758, fee: 0.250 },
  'Orca': { volume: 12310495208, fee: 0.300 },
  'Curve': { volume: 7836449596, fee: 0.300 },
  'Raydium': { volume: 4878196208, fee: 0.250 },
  'Meteora': { volume: 2796671672, fee: 0.300 },
  'Aerodrome': { volume: 1638539660, fee: 0.300 },
  'Thruster': { volume: 1421691995, fee: 0.300 }
};

export const exchangeNames = ['Custom', ...Object.keys(exchanges)];
