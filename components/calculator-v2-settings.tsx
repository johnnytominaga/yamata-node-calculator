"use client";

import { useState, useEffect } from "react";
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
    // Local state for editing
    const [fdvInput, setFdvInput] = useState("");
    const [nodesInput, setNodesInput] = useState("");
    const [volumeInput, setVolumeInput] = useState("");
    const [feeInput, setFeeInput] = useState("");
    const [isFdvFocused, setIsFdvFocused] = useState(false);
    const [isNodesFocused, setIsNodesFocused] = useState(false);

    // Sync with props when dialog opens
    useEffect(() => {
        if (open) {
            setFdvInput(inputs.expectedFDV.toString());
            setNodesInput(inputs.nodesSoldYear1.toString());
            setVolumeInput((inputs.monthlyVolume / 1_000_000_000).toFixed(2));
            setFeeInput(inputs.feePercentage.toFixed(2));
        }
    }, [open, inputs.expectedFDV, inputs.nodesSoldYear1, inputs.monthlyVolume, inputs.feePercentage]);

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

    const handleFdvBlur = () => {
        setIsFdvFocused(false);
        const num = parseFloat(fdvInput.replace(/[,$]/g, ""));
        if (!isNaN(num) && num > 0) {
            onSave({ expectedFDV: num });
        } else {
            // Reset to current value if invalid
            setFdvInput(inputs.expectedFDV.toString());
        }
    };

    const handleNodesBlur = () => {
        setIsNodesFocused(false);
        const num = parseInt(nodesInput.replace(/,/g, ""));
        if (!isNaN(num) && num > 0) {
            onSave({ nodesSoldYear1: num });
        } else {
            // Reset to current value if invalid
            setNodesInput(inputs.nodesSoldYear1.toString());
        }
    };

    const formatNumberWithCommas = (value: string): string => {
        // Remove all non-digit characters
        const digits = value.replace(/\D/g, "");
        if (!digits) return "";
        // Add commas
        return parseInt(digits).toLocaleString("en-US");
    };

    const formatFdvDisplay = () => {
        if (!fdvInput) return "";
        if (isFdvFocused) {
            return formatNumberWithCommas(fdvInput);
        }
        const num = parseFloat(fdvInput.replace(/[,$]/g, ""));
        return isNaN(num) ? fdvInput : `$${num.toLocaleString("en-US")}`;
    };

    const formatNodesDisplay = () => {
        if (!nodesInput) return "";
        return formatNumberWithCommas(nodesInput);
    };

    const handleFdvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // Allow only digits
        const digitsOnly = value.replace(/\D/g, "");
        setFdvInput(digitsOnly);
    };

    const handleNodesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // Allow only digits
        const digitsOnly = value.replace(/\D/g, "");
        setNodesInput(digitsOnly);
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // Allow digits and decimal point
        const cleaned = value.replace(/[^\d.]/g, "");
        // Prevent multiple decimal points
        const parts = cleaned.split(".");
        if (parts.length > 2) return;
        setVolumeInput(cleaned);
    };

    const handleFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // Allow digits and decimal point
        const cleaned = value.replace(/[^\d.]/g, "");
        // Prevent multiple decimal points
        const parts = cleaned.split(".");
        if (parts.length > 2) return;
        setFeeInput(cleaned);
    };

    const handleVolumeBlur = () => {
        const num = parseFloat(volumeInput);
        if (!isNaN(num) && num > 0) {
            onSave({ monthlyVolume: num * 1_000_000_000 });
            setVolumeInput(num.toFixed(2));
        } else {
            setVolumeInput((inputs.monthlyVolume / 1_000_000_000).toFixed(2));
        }
    };

    const handleFeeBlur = () => {
        const num = parseFloat(feeInput);
        if (!isNaN(num) && num > 0 && num <= 100) {
            onSave({ feePercentage: num });
            setFeeInput(num.toFixed(2));
        } else {
            setFeeInput(inputs.feePercentage.toFixed(2));
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
                            value={formatFdvDisplay()}
                            onChange={handleFdvChange}
                            onFocus={() => setIsFdvFocused(true)}
                            onBlur={handleFdvBlur}
                            placeholder="50,000,000"
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
                            value={formatNodesDisplay()}
                            onChange={handleNodesChange}
                            onFocus={() => setIsNodesFocused(true)}
                            onBlur={handleNodesBlur}
                            placeholder="2,000"
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

                    {/* Custom Exchange Settings */}
                    {inputs.selectedExchange === "Custom" && (
                        <>
                            {/* Monthly Volume */}
                            <div className="space-y-2">
                                <Label className="text-xs text-muted-foreground uppercase">
                                    Monthly Exchange Volume (Billion $)
                                </Label>
                                <input
                                    type="text"
                                    value={volumeInput}
                                    onChange={handleVolumeChange}
                                    onBlur={handleVolumeBlur}
                                    placeholder="61.52"
                                    className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground"
                                />
                            </div>

                            {/* Average Exchange Fee */}
                            <div className="space-y-2">
                                <Label className="text-xs text-muted-foreground uppercase">
                                    Average Exchange Fee (%)
                                </Label>
                                <input
                                    type="text"
                                    value={feeInput}
                                    onChange={handleFeeChange}
                                    onBlur={handleFeeBlur}
                                    placeholder="0.30"
                                    className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground"
                                />
                            </div>
                        </>
                    )}

                    {/* Save Button */}
                    <Button
                        onClick={() => {
                            // Save any pending changes before closing
                            const fdvNum = parseFloat(fdvInput.replace(/[,$]/g, ""));
                            const nodesNum = parseInt(nodesInput.replace(/,/g, ""));
                            const volumeNum = parseFloat(volumeInput);
                            const feeNum = parseFloat(feeInput);

                            if (!isNaN(fdvNum) && fdvNum > 0) {
                                onSave({ expectedFDV: fdvNum });
                            }
                            if (!isNaN(nodesNum) && nodesNum > 0) {
                                onSave({ nodesSoldYear1: nodesNum });
                            }
                            if (
                                inputs.selectedExchange === "Custom" &&
                                !isNaN(volumeNum) &&
                                volumeNum > 0
                            ) {
                                onSave({ monthlyVolume: volumeNum * 1_000_000_000 });
                            }
                            if (
                                inputs.selectedExchange === "Custom" &&
                                !isNaN(feeNum) &&
                                feeNum > 0 &&
                                feeNum <= 100
                            ) {
                                onSave({ feePercentage: feeNum });
                            }

                            onOpenChange(false);
                        }}
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-wide"
                    >
                        Save
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
