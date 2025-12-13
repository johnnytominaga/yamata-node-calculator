"use client";

import { useState, useMemo } from "react";
import { ArrowLeft, Settings, Minus, Plus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { CalculatorV2Settings } from "@/components/calculator-v2-settings";
import { CalculatorV2Inputs } from "@/lib/types";
import {
    calculateRewardsV2,
    formatCurrencyV2,
    formatNumberV2,
} from "@/lib/calculator-v2";
import { purchaseTierOptions } from "@/lib/data-helpers";
import { exchanges } from "@/lib/exchanges";

export default function CalculatorV2Page() {
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [inputs, setInputs] = useState<CalculatorV2Inputs>({
        currentTier: 1,
        quantity: 1,
        expectedFDV: 50000000, // $50M
        nodesSoldYear1: 2000,
        selectedExchange: "Meteora",
        monthlyVolume: exchanges["Meteora"].volume,
        feePercentage: exchanges["Meteora"].fee,
    });

    const results = useMemo(() => calculateRewardsV2(inputs), [inputs]);

    const handleInputChange = (newInputs: Partial<CalculatorV2Inputs>) => {
        setInputs((prev) => ({ ...prev, ...newInputs }));
    };

    const incrementQuantity = () => {
        if (inputs.quantity < 10) {
            handleInputChange({ quantity: inputs.quantity + 1 });
        }
    };

    const decrementQuantity = () => {
        if (inputs.quantity > 1) {
            handleInputChange({ quantity: inputs.quantity - 1 });
        }
    };

    return (
        <div className="min-h-screen bg-darkest-gray">
            {/* Header */}
            <div className="relative">
                {/* Back Button */}
                <Link href="https://www.yamata.io/node-sale" target="_blank">
                    <Button
                        variant="default"
                        className="absolute top-6 left-6 px-6 bg-primary text-primary-foreground hover:bg-primary/90 border-0 font-bold uppercase tracking-wide"
                    >
                        <ArrowLeft className="mr-2 h-5 w-5" />
                        Back
                    </Button>
                </Link>

                {/* Coming Soon Badge */}
                <div className="absolute top-6 right-6 text-muted-foreground uppercase tracking-wider text-sm">
                    <span className="text-foreground font-bold">Node Sale</span>{" "}
                    Coming Soon
                </div>

                {/* Title */}
                <div className="pt-24 pb-12 text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight font-heading mb-4 text-lightest-gray">
                        Yamata Node Calculator
                    </h1>
                    <p className="text-muted-foreground uppercase tracking-wider text-sm md:text-base">
                        Own the infrastructure. Earn protocol fees.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12 lg:flex lg:items-center lg:justify-center lg:min-h-[calc(100vh-16rem)]">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto w-full">
                    {/* Left Panel - Inputs */}
                    <div className="lg:col-span-1">
                        <div className="bg-dark-gray border border-border rounded-3xl p-6 h-full flex flex-col justify-between">
                            {/* Current Available Tier */}
                            <div className="space-y-3">
                                <Label className="text-xs text-muted-foreground uppercase tracking-wide font-bold">
                                    Current Available Tier
                                </Label>
                                <Select
                                    value={inputs.currentTier.toString()}
                                    onValueChange={(value) =>
                                        handleInputChange({
                                            currentTier: parseInt(value),
                                        })
                                    }
                                    disabled={true}
                                >
                                    <SelectTrigger className="w-full h-14 bg-input border-border text-lg">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {purchaseTierOptions.map((tier) => (
                                            <SelectItem
                                                key={tier}
                                                value={tier.toString()}
                                            >
                                                {tier}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Quantity */}
                            <div className="space-y-3">
                                <Label className="text-xs text-muted-foreground uppercase tracking-wide font-bold">
                                    Quantity
                                </Label>
                                <div className="flex items-center gap-4">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={decrementQuantity}
                                        disabled={inputs.quantity <= 1}
                                        className="h-14 w-14 rounded-xl border-border hover:text-primary"
                                    >
                                        <Minus className="h-5 w-5" />
                                    </Button>
                                    <div className="flex-1 text-center text-3xl font-bold">
                                        {inputs.quantity}
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={incrementQuantity}
                                        disabled={inputs.quantity >= 10}
                                        className="h-14 w-14 rounded-xl border-border hover:text-primary"
                                    >
                                        <Plus className="h-5 w-5" />
                                    </Button>
                                </div>
                                <p className="text-xs text-muted-foreground text-center">
                                    Max 10 nodes per wallet
                                </p>
                            </div>

                            {/* Total Investment */}
                            <div className="space-y-3 pt-4 border-t border-border">
                                <Label className="text-xs text-muted-foreground uppercase tracking-wide font-bold">
                                    Total Investment (USD)
                                </Label>
                                <div className="bg-input border border-border rounded-xl p-4">
                                    <div className="text-2xl font-bold">
                                        {formatCurrencyV2(
                                            results.totalInvestment,
                                            2
                                        )}
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Based on Current Available Tier
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Center Panel - Rewards */}
                    <div className="lg:col-span-1">
                        <div className="bg-darkest-gray border-0 rounded-3xl py-6 px-4 h-full relative">
                            {/* Header with Settings */}
                            <div className="flex items-start justify-between">
                                <div className="flex-1 pe-10">
                                    <h2 className="text-[.75rem] text-muted-foreground uppercase tracking-wide font-bold">
                                        Total Base + Trading Fee Rewards Year 1
                                    </h2>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setSettingsOpen(true)}
                                    className="h-10 w-10 absolute top-4 right-0"
                                >
                                    <Settings className="h-6 w-6 text-muted-foreground" />
                                </Button>
                            </div>

                            {/* Large Amount */}
                            <div className="py-6">
                                <div className="text-5xl font-sans uppercase font-bold text-primary">
                                    {formatCurrencyV2(
                                        results.year1TotalRewards,
                                        0
                                    )}
                                </div>
                            </div>

                            {/* Breakdown */}
                            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border">
                                <div>
                                    <p className="text-[.5rem] text-muted-foreground uppercase mb-1">
                                        Yearly Fee Rewards
                                    </p>
                                    <p className="text-lg font-bold">
                                        {formatCurrencyV2(
                                            results.year1FeeRewards,
                                            0
                                        )}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[.5rem] text-muted-foreground uppercase mb-1">
                                        Total Year 1 Base Rewards
                                    </p>
                                    <p className="text-lg font-bold">
                                        {formatCurrencyV2(
                                            results.year1BaseRewards,
                                            0
                                        )}
                                    </p>
                                </div>
                            </div>

                            {/* Estimates */}
                            <div className="grid grid-cols-2 gap-4 pt-4">
                                <div>
                                    <p className="text-[.5rem] text-muted-foreground uppercase mb-1">
                                        Estimated Nodes Sold Year 1
                                    </p>
                                    <p className="text-lg font-bold">
                                        {formatNumberV2(inputs.nodesSoldYear1)}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[.5rem] text-muted-foreground uppercase mb-1">
                                        Estimated FDV Year 1
                                    </p>
                                    <p className="text-lg font-bold">
                                        {formatCurrencyV2(
                                            inputs.expectedFDV,
                                            0
                                        )}
                                    </p>
                                </div>
                            </div>

                            {/* CTA Button */}
                            <div className="pt-6">
                                <Button
                                    size="sm"
                                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-wide"
                                >
                                    Join Waitlist
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel - Node Image */}
                    <div className="lg:col-span-1">
                        <div className="p-0 h-full flex items-center justify-start">
                            <div className="relative size-full max-w-sm justify-self-start">
                                <Image
                                    src="/node-image-1.png"
                                    alt="Yamata Node"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Settings Modal */}
            <CalculatorV2Settings
                open={settingsOpen}
                onOpenChange={setSettingsOpen}
                inputs={inputs}
                onSave={handleInputChange}
            />
        </div>
    );
}
