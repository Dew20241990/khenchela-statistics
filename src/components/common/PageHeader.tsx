import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  badge?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  icon: Icon,
  badge,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "gov-header rounded-xl p-6 mb-6 animate-fade-in",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {Icon && (
            <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center">
              <Icon className="w-8 h-8 text-white" />
            </div>
          )}
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-kufi font-bold text-white">
                {title}
              </h1>
              {badge && (
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm text-white">
                  {badge}
                </span>
              )}
            </div>
            {subtitle && (
              <p className="text-white/80 mt-1">{subtitle}</p>
            )}
          </div>
        </div>
        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </div>
    </div>
  );
}
