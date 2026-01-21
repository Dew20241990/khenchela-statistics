import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface SectionCardProps {
  title: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  className?: string;
  headerActions?: React.ReactNode;
}

export function SectionCard({
  title,
  icon: Icon,
  children,
  className,
  headerActions,
}: SectionCardProps) {
  return (
    <div className={cn("gov-card", className)}>
      <div className="gov-card-header flex items-center justify-between">
        <h3 className="gov-section-title">
          {Icon && <Icon className="w-5 h-5 text-primary" />}
          {title}
        </h3>
        {headerActions && <div>{headerActions}</div>}
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}
