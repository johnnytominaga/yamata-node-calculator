"use client";

import { useState, useEffect, useMemo } from "react";
import { X } from "lucide-react";
import { CalculatorSidebar } from "@/components/calculator-sidebar";
import { CalculatorResultsDisplay } from "@/components/calculator-results";
import { TopNav } from "@/components/top-nav";
import { CalculatorInputs } from "@/lib/types";
import { calculateRewards } from "@/lib/calculator";
import { exchanges } from "@/lib/exchanges";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

export default function Home() {
    const [ethPrice, setEthPrice] = useState(3500);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);
    const [inputs, setInputs] = useState<CalculatorInputs>({
        currentTier: 1,
        purchaseTier: 1,
        expectedFDV: 2000000000, // 2 billion
        selectedExchange: "Uniswap",
        monthlyVolume: exchanges["Uniswap"].volume,
        feePercentage: exchanges["Uniswap"].fee,
        showAdvanced: false,
    });

    // Handle initial drawer state after hydration
    // This is the correct pattern to avoid hydration mismatch
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setHasMounted(true);
        // Open drawer on mobile after component mounts
        if (window.matchMedia("(max-width: 1023px)").matches) {
            setIsDrawerOpen(true);
        }
    }, []);

    // Fetch ETH price on component mount
    useEffect(() => {
        async function fetchPrice() {
            try {
                const response = await fetch(
                    "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
                );
                const data = await response.json();
                if (data.ethereum?.usd) {
                    setEthPrice(data.ethereum.usd);
                }
            } catch (error) {
                console.error("Error fetching ETH price:", error);
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
        <>
            {/* Top Navigation */}
            <TopNav
                showMenuButton={hasMounted}
                onMenuClick={() => setIsDrawerOpen(true)}
            />

            {/* Mobile Drawer */}
            {hasMounted && (
                <Drawer
                    open={isDrawerOpen}
                    onOpenChange={setIsDrawerOpen}
                    direction="left"
                >
                    <DrawerContent className="w-[90vw] max-w-md h-screen overflow-y-auto">
                        <DrawerHeader className="border-b border-border">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <DrawerTitle className="text-lg font-bold">
                                        Calculator Settings
                                    </DrawerTitle>
                                    <DrawerDescription className="mt-2">
                                        Make your selections below, then close this menu
                                        to view your projected rewards on the results page.
                                    </DrawerDescription>
                                </div>
                                <DrawerClose asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="ml-2 -mt-2"
                                    >
                                        <X className="h-5 w-5" />
                                    </Button>
                                </DrawerClose>
                            </div>
                        </DrawerHeader>
                        <div className="overflow-y-auto">
                            <CalculatorSidebar
                                inputs={inputs}
                                onInputChange={handleInputChange}
                            />
                        </div>
                    </DrawerContent>
                </Drawer>
            )}

            <main className="min-h-screen bg-background flex flex-col lg:flex-row pt-16">
                {/* Desktop Sidebar */}
                <aside className="hidden lg:block lg:fixed lg:left-0 lg:top-16 lg:h-[calc(100vh-4rem)] lg:overflow-y-auto border-r border-border">
                    <div className="pt-6">
                        <CalculatorSidebar
                            inputs={inputs}
                            onInputChange={handleInputChange}
                        />
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex-1 lg:ml-80">
                    <CalculatorResultsDisplay results={results} />
                </div>
            </main>
        </>
    );
}
