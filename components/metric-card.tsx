import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string;
  subtitle?: string;
  className?: string;
}

export function MetricCard({ title, value, subtitle, className }: MetricCardProps) {
  return (
    <Card className={cn('bg-card border-border', className)}>
      <CardContent className="p-6 text-center space-y-2">
        <p className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wide font-semibold">
          {title}
        </p>
        <p className="text-2xl sm:text-3xl font-bold text-foreground">
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
