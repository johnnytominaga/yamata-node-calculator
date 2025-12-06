"use client";

import Image from "next/image";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TopNavProps {
    onMenuClick?: () => void;
    showMenuButton?: boolean;
}

export function TopNav({ onMenuClick, showMenuButton = false }: TopNavProps) {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
            <div className="flex items-center justify-between h-16 px-4 lg:px-6">
                {/* Logo */}
                <div className="flex items-center">
                    <Image
                        src="/yamata-logo.svg"
                        alt="Yamata"
                        width={90}
                        height={30}
                        className="w-auto h-6"
                    />
                </div>

                {/* Mobile Menu Button - Right Side */}
                {showMenuButton && (
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={onMenuClick}
                        className="lg:hidden"
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                )}
            </div>
        </header>
    );
}
