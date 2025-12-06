"use client";

import { CalculatorResults } from "@/lib/types";
import {
    formatCurrency,
    formatNumber,
    formatPercentage,
} from "@/lib/calculator";
import { MetricCard } from "./metric-card";

interface CalculatorResultsProps {
    results: CalculatorResults;
}

export function CalculatorResultsDisplay({ results }: CalculatorResultsProps) {
    return (
        <div className="flex-1 p-6 lg:p-10 space-y-12 overflow-y-auto">
            {/* Main Display */}
            <div className="space-y-4">
                <h1 className="text-sm text-muted-foreground uppercase font-[family-name:var(--font-heading)] font-black">
                    Node Calculator
                </h1>
                <div className="text-5xl sm:text-6xl lg:text-9xl font-[family-name:var(--font-sans)] font-bold text-foreground">
                    {formatCurrency(results.totalYearlyReward, 0)}
                </div>
                <p className="text-sm sm:text-base text-primary">
                    Total Base + Trading Fee Rewards on Year 1
                </p>
            </div>

            {/* Total Rewards: Base + Fees */}
            <section className="space-y-6">
                <div className="border-t border-border" />
                <div className="space-y-2">
                    <h2 className="text-lg sm:text-xl font-[family-name:var(--font-heading)] font-black uppercase tracking-wide">
                        Total Rewards: Base + Fees
                    </h2>
                    <p className="text-xs sm:text-sm text-muted-foreground max-w-3xl">
                        Total rewards combine both base token emissions and
                        transaction fees, creating the total rewards that the
                        Validating Nodes will receive over time.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                    <MetricCard
                        title="Total Daily Rewards"
                        value={formatCurrency(results.totalDailyReward)}
                    />
                    <MetricCard
                        title="Total Monthly Rewards"
                        value={formatCurrency(results.totalMonthlyReward, 1)}
                    />
                    <MetricCard
                        title="Total Year 1 Rewards"
                        value={formatCurrency(results.totalYearlyReward, 0)}
                        className="sm:col-span-2 lg:col-span-1 hidden"
                    />
                </div>
            </section>

            {/* Tokenomics Emission Rewards */}
            <section className="space-y-6">
                <div className="border-t border-border" />
                <div className="space-y-2">
                    <h2 className="text-lg sm:text-xl font-[family-name:var(--font-heading)] font-black uppercase tracking-wide">
                        Tokenomics Emission Rewards
                    </h2>
                    <p className="text-xs sm:text-sm text-muted-foreground max-w-3xl">
                        A total of 20% of the token supply is allocated as base
                        rewards, split between the activated nodes. These
                        rewards will be distributed on a yearly halving basis
                        for the first 5 years after launch.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-4">
                    <MetricCard
                        title="Daily Base Rewards"
                        value={formatCurrency(results.dailyReward)}
                        subtitle={`${formatNumber(
                            results.dailyTokens
                        )} $YMTA Tokens`}
                        className="col-span-1"
                    />
                    <MetricCard
                        title="Monthly Base Rewards"
                        value={formatCurrency(results.monthlyReward, 1)}
                        subtitle={`${formatNumber(
                            results.monthlyTokens
                        )} $YMTA Tokens`}
                        className="col-span-1"
                    />
                    <MetricCard
                        title="Year 1 Base Rewards"
                        value={formatCurrency(results.yearlyReward, 0)}
                        subtitle={`${formatNumber(
                            results.yearlyTokens
                        )} $YMTA Tokens`}
                        className="lg:row-span-2 col-span-1 justify-end"
                    />
                    <MetricCard
                        title="Life Time Base Rewards"
                        value={formatCurrency(results.lifetimeReward, 0)}
                        subtitle={`${formatNumber(
                            results.lifetimeTokens
                        )} $YMTA Tokens`}
                        className="sm:col-span-2 lg:col-start-1 lg:row-start-2"
                    />
                </div>
            </section>

            {/* Transaction Fee Rewards */}
            <section className="space-y-6">
                <div className="border-t border-border" />
                <div className="space-y-2">
                    <h2 className="text-lg sm:text-xl font-[family-name:var(--font-heading)] font-black uppercase tracking-wide">
                        Transaction Fee Rewards
                    </h2>
                    <p className="text-xs sm:text-sm text-muted-foreground max-w-3xl">
                        Validating Nodes (VNs) receive 10% of all transaction
                        fees generated by the Yamata exchange. These rewards are
                        distributed equally among all active nodes and vary
                        based on exchange volume and fees.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <MetricCard
                        title="Daily Fee Rewards"
                        value={formatCurrency(results.dailyFeeRevenue)}
                    />
                    <MetricCard
                        title="Monthly Fee Rewards"
                        value={formatCurrency(results.monthlyFeeRevenue, 1)}
                    />
                    <MetricCard
                        title="Yearly Fee Rewards"
                        value={formatCurrency(results.yearlyFeeRevenue, 0)}
                        className="sm:col-span-2 lg:col-span-1"
                    />
                </div>
            </section>

            {/* Annual Reward Rate */}
            <section className="space-y-6">
                <div className="border-t border-border" />
                <div className="space-y-2">
                    <h2 className="text-lg sm:text-xl font-heading font-black uppercase tracking-wide">
                        Annual Reward Rate
                    </h2>
                    <p className="text-xs sm:text-sm text-muted-foreground max-w-3xl">
                        The following section provides your annual return on
                        investment, calculated using the node purchase price and
                        comparing it to the total rewards you can earn in Year
                        1.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <MetricCard
                        title="Node Purchasing Price"
                        value={formatCurrency(results.purchasePrice, 0)}
                        valueSize="text-7xl"
                        valueColor="#5fa9a7"
                    />
                    <MetricCard
                        title="Year 1 Total APY"
                        value={formatPercentage(results.yearlyAPY)}
                        valueSize="text-7xl"
                        valueColor="#5fa9a7"
                    />
                </div>
                <p className="text-xs text-muted-foreground max-w-2xl">
                    The node purchasing price is calculated based on the tier at
                    which you purchased your Validating Node license, and is
                    multiplied by the current market price of ETH. (Last update:{" "}
                    {formatCurrency(results.ethPrice, 0)})
                </p>
            </section>

            {/* Disclaimer */}
            <section className="space-y-4">
                <div className="border-t border-border" />
                <h2 className="text-sm font-heading font-black uppercase tracking-wide text-destructive">
                    Important Disclaimer
                </h2>
                <p className="text-xs text-destructive max-w-3xl">
                    This calculator is provided by a third-party firm,
                    Blacktokenomics. Yamata does not own, moderate, or influence
                    this calculator in any manner. The assumptions made within
                    this calculator are speculative and are chosen by the user.
                    We do not guarantee returns based on these assumptions.
                </p>
            </section>
        </div>
    );
}
