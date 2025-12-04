"use client";

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { CalculatorSidebar } from '@/components/calculator-sidebar';
import { CalculatorResultsDisplay } from '@/components/calculator-results';
import { CalculatorInputs } from '@/lib/types';
import { calculateRewards } from '@/lib/calculator';
import { exchanges } from '@/lib/exchanges';

export default function Home() {
  const [ethPrice, setEthPrice] = useState(3500);
  const [inputs, setInputs] = useState<CalculatorInputs>({
    currentTier: 5,
    purchaseTier: 2,
    expectedFDV: 2000000000, // 2 billion
    selectedExchange: 'Uniswap',
    monthlyVolume: exchanges['Uniswap'].volume,
    feePercentage: exchanges['Uniswap'].fee,
    showAdvanced: false,
  });

  // Fetch ETH price on component mount
  useEffect(() => {
    async function fetchPrice() {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
        );
        const data = await response.json();
        if (data.ethereum?.usd) {
          setEthPrice(data.ethereum.usd);
        }
      } catch (error) {
        console.error('Error fetching ETH price:', error);
        // Keep default price of 3500
      }
    }
    fetchPrice();
  }, []);

  const handleInputChange = (newInputs: Partial<CalculatorInputs>) => {
    setInputs((prev) => ({ ...prev, ...newInputs }));
  };

  const results = useMemo(
    () => calculateRewards(inputs, ethPrice),
    [inputs, ethPrice]
  );

  return (
    <main className="min-h-screen bg-background flex flex-col lg:flex-row">
      {/* Logo Header */}
      <div className="absolute top-6 left-6 z-10">
        <Image
          src="/yamata.png"
          alt="Yamata"
          width={180}
          height={60}
          className="w-auto h-12"
        />
      </div>

      {/* Sidebar */}
      <aside className="lg:fixed lg:left-0 lg:top-0 lg:h-screen lg:overflow-y-auto border-r border-border">
        <div className="pt-24 lg:pt-6">
          <CalculatorSidebar inputs={inputs} onInputChange={handleInputChange} />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-80">
        <CalculatorResultsDisplay results={results} />
      </div>
    </main>
  );
}
