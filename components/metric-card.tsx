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

export function MetricCard({
    title,
    value,
    valueSize,
    valueColor,
    subtitle,
    className,
}: MetricCardProps) {
    return (
        <Card className={cn("bg-card border-border py-0", className)}>
            <CardContent className="p-6">
                <p className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wide font-semibold">
                    {title}
                </p>
                <p
                    className={
                        `text-2xl sm:text-3xl font-bold text-foreground` +
                        ` sm:` +
                        valueSize +
                        `!` +
                        ` text-[` +
                        valueColor +
                        `]`
                    }
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
