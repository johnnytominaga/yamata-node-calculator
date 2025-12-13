"use client";

import { X } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { exchanges, exchangeNames } from "@/lib/exchanges";
import { CalculatorV2Inputs } from "@/lib/types";

interface CalculatorV2SettingsProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    inputs: CalculatorV2Inputs;
    onSave: (inputs: Partial<CalculatorV2Inputs>) => void;
}

export function CalculatorV2Settings({
    open,
    onOpenChange,
    inputs,
    onSave,
}: CalculatorV2SettingsProps) {
    const handleExchangeChange = (exchange: string) => {
        if (exchange !== "Custom" && exchanges[exchange]) {
            onSave({
                selectedExchange: exchange,
                monthlyVolume: exchanges[exchange].volume,
                feePercentage: exchanges[exchange].fee,
            });
        } else {
            onSave({ selectedExchange: exchange });
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px] bg-card border-border p-0">
                <DialogHeader className="p-6 pb-4">
                    <div className="flex items-center justify-between">
                        <DialogTitle className="text-2xl font-bold uppercase font-heading tracking-wide">
                            Settings
                        </DialogTitle>
                        <DialogClose asChild />
                    </div>
                </DialogHeader>

                <div className="px-6 pb-6 space-y-6">
                    {/* FDV Input */}
                    <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground uppercase">
                            $YMTA Token FDV
                        </Label>
                        <input
                            type="text"
                            value={`$${inputs.expectedFDV.toLocaleString(
                                "en-US",
                                {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                }
                            )}`}
                            onChange={(e) => {
                                const value = e.target.value.replace(
                                    /[$,]/g,
                                    ""
                                );
                                const num = parseFloat(value);
                                if (!isNaN(num)) {
                                    onSave({ expectedFDV: num });
                                }
                            }}
                            className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground"
                        />
                    </div>

                    {/* Nodes Sold Year 1 */}
                    <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground uppercase">
                            Nodes Sold On Year 1
                        </Label>
                        <input
                            type="text"
                            value={inputs.nodesSoldYear1.toLocaleString(
                                "en-US"
                            )}
                            onChange={(e) => {
                                const value = e.target.value.replace(/,/g, "");
                                const num = parseInt(value);
                                if (!isNaN(num)) {
                                    onSave({ nodesSoldYear1: num });
                                }
                            }}
                            className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground"
                        />
                    </div>

                    {/* Exchange Volume Benchmark */}
                    <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground uppercase">
                            Exchange Volume Benchmark
                        </Label>
                        <Select
                            value={inputs.selectedExchange}
                            onValueChange={handleExchangeChange}
                        >
                            <SelectTrigger className="w-full h-12 bg-input border-border uppercase">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {exchangeNames.map((name) => (
                                    <SelectItem
                                        key={name}
                                        value={name}
                                        className="uppercase"
                                    >
                                        {name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Save Button */}
                    <Button
                        onClick={() => onOpenChange(false)}
                        className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-wide rounded-lg"
                    >
                        Save
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
