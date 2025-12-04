"use client";

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { CalculatorInputs } from '@/lib/types';
import {
  currentTierOptions,
  purchaseTierOptions,
  expectedFDVOptions,
} from '@/lib/data-helpers';
import { exchanges, exchangeNames } from '@/lib/exchanges';

interface CalculatorSidebarProps {
  inputs: CalculatorInputs;
  onInputChange: (inputs: Partial<CalculatorInputs>) => void;
}

export function CalculatorSidebar({ inputs, onInputChange }: CalculatorSidebarProps) {
  const handleExchangeChange = (exchange: string) => {
    if (exchange !== 'Custom' && exchanges[exchange]) {
      onInputChange({
        selectedExchange: exchange,
        monthlyVolume: exchanges[exchange].volume,
        feePercentage: exchanges[exchange].fee,
      });
    } else {
      onInputChange({ selectedExchange: exchange });
    }
  };

  return (
    <div className="w-full lg:w-80 space-y-6 p-6 bg-background">
      {/* Branding */}
      <div className="space-y-4">
        <a
          href="https://blacktokenomics.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <Image
            src="/blacktokenomics.png"
            alt="Blacktokenomics"
            width={300}
            height={80}
            className="w-full max-w-[300px]"
          />
        </a>
        <p className="text-xs text-muted-foreground">
          Specialized Tokenomics firm for Web3 Projects, Launchpads, VCs & Funds.
        </p>
      </div>

      <div className="border-t border-border" />

      {/* Purchase Currency */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-sm font-medium uppercase tracking-wide">
            Purchase Currency
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">
              Select Coin To Be Used for Purchase
            </Label>
            <Select defaultValue="USDT">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USDT">USDT</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Node System Inputs */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-sm font-medium uppercase tracking-wide">
            Node System Inputs
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label className="text-xs text-muted-foreground">
                Select Current Tier Being Sold
              </Label>
              <span className="text-sm font-medium">{inputs.currentTier}</span>
            </div>
            <Slider
              value={[inputs.currentTier]}
              onValueChange={([value]) => onInputChange({ currentTier: value })}
              min={1}
              max={50}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1</span>
              <span>50</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">
              At what tier you purchased your node?
            </Label>
            <Select
              value={inputs.purchaseTier.toString()}
              onValueChange={(value) =>
                onInputChange({ purchaseTier: parseInt(value) })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {purchaseTierOptions.map((tier) => (
                  <SelectItem key={tier} value={tier.toString()}>
                    {tier}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Token FDV Target */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-sm font-medium uppercase tracking-wide">
            Token FDV Target
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Select Expected FDV</Label>
            <Select
              value={inputs.expectedFDV.toString()}
              onValueChange={(value) =>
                onInputChange({ expectedFDV: parseInt(value) })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {expectedFDVOptions.map((fdv) => (
                  <SelectItem key={fdv} value={fdv.toString()}>
                    {new Intl.NumberFormat('en-US').format(fdv)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <p className="text-xs text-muted-foreground">
            Initial FDV at Launch will be $80,000,000.
          </p>
        </CardContent>
      </Card>

      {/* Exchange Volume & Fees */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-sm font-medium uppercase tracking-wide">
            Exchange Volume & Fees
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">
              Select Exchange to Mimic
            </Label>
            <Select
              value={inputs.selectedExchange}
              onValueChange={handleExchangeChange}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {exchangeNames.map((name) => (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="advanced"
              checked={inputs.showAdvanced}
              onCheckedChange={(checked) =>
                onInputChange({ showAdvanced: checked === true })
              }
            />
            <Label
              htmlFor="advanced"
              className="text-xs text-muted-foreground cursor-pointer"
            >
              Show Advanced Settings
            </Label>
          </div>

          {(inputs.showAdvanced || inputs.selectedExchange === 'Custom') && (
            <>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label className="text-xs text-muted-foreground">
                    Monthly Exchange Volume (Billion $)
                  </Label>
                  <span className="text-sm font-medium">
                    {(inputs.monthlyVolume / 1_000_000_000).toFixed(2)}
                  </span>
                </div>
                <Slider
                  value={[inputs.monthlyVolume / 1_000_000_000]}
                  onValueChange={([value]) =>
                    onInputChange({ monthlyVolume: value * 1_000_000_000 })
                  }
                  min={1}
                  max={800}
                  step={0.01}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1.00</span>
                  <span>800.00</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label className="text-xs text-muted-foreground">
                    Average Exchange Fee
                  </Label>
                  <span className="text-sm font-medium">
                    {inputs.feePercentage.toFixed(2)}%
                  </span>
                </div>
                <Slider
                  value={[inputs.feePercentage]}
                  onValueChange={([value]) => onInputChange({ feePercentage: value })}
                  min={0.01}
                  max={0.30}
                  step={0.01}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0.01%</span>
                  <span>0.30%</span>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
