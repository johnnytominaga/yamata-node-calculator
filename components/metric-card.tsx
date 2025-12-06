import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
    title: string;
    value: string;
    valueSize?: string;
    valueColor?: string;
    subtitle?: string;
    className?: string;
}

// Map of size strings to Tailwind classes
const sizeClasses: Record<string, string> = {
    "text-7xl": "text-2xl sm:text-7xl",
    "text-6xl": "text-2xl sm:text-6xl",
    "text-5xl": "text-2xl sm:text-5xl",
    "text-4xl": "text-2xl sm:text-4xl",
    "text-3xl": "text-2xl sm:text-3xl",
};

export function MetricCard({
    title,
    value,
    valueSize,
    valueColor,
    subtitle,
    className,
}: MetricCardProps) {
    // Get the responsive class from the map or default
    const sizeClass = valueSize && sizeClasses[valueSize]
        ? sizeClasses[valueSize]
        : "text-2xl sm:text-3xl";

    return (
        <Card className={cn("bg-card border-border py-0", className)}>
            <CardContent className="p-6">
                <p className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wide font-semibold">
                    {title}
                </p>
                <p
                    className={cn(sizeClass, "font-bold text-foreground")}
                    style={valueColor ? { color: valueColor } : undefined}
                >
                    {value}
                </p>
                {subtitle && (
                    <p className="text-xs sm:text-sm text-primary font-medium">
                        {subtitle}
                    </p>
                )}
            </CardContent>
        </Card>
    );
}
