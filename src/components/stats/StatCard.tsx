import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  description?: string;
  className?: string;
  valueClassName?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  description,
  className,
  valueClassName,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "bg-card rounded-lg border border-border p-4 animate-fade-in",
        className
      )}
    >
      <div className="flex items-center gap-3 mb-2">
        {Icon && (
          <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
            <Icon className="w-4 h-4 text-primary" />
          </div>
        )}
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
      </div>
      <p
        className={cn(
          "text-2xl font-kufi font-bold text-foreground",
          valueClassName
        )}
      >
        {typeof value === "number" ? value.toLocaleString("ar-DZ") : value}
      </p>
      {description && (
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      )}
    </div>
  );
}
