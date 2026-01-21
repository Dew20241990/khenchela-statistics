import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  LayoutDashboard,
  Building2,
  ClipboardCheck,
  Landmark,
  Users,
  FileText,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Shield,
  Briefcase,
  HeartHandshake,
  Wallet,
  HardHat,
  Accessibility,
  Lightbulb,
  CreditCard,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface AppSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export function AppSidebar({ isCollapsed, onToggle }: AppSidebarProps) {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [openGroups, setOpenGroups] = useState<string[]>(["nationalFunds", "agencies"]);

  const menuItems = [
    {
      title: t('nav.dashboard'),
      icon: LayoutDashboard,
      path: "/",
    },
    {
      title: t('nav.employmentAgency'),
      icon: Briefcase,
      path: "/employment-agency",
    },
    {
      title: t('nav.laborInspection'),
      icon: ClipboardCheck,
      path: "/labor-inspection",
    },
    {
      title: t('nav.nationalFunds'),
      icon: Landmark,
      isGroup: true,
      groupKey: "nationalFunds",
      children: [
        { title: `${t('institutions.cnas.acronym')} - ${t('institutions.cnas.name')}`, icon: Shield, path: "/funds/cnas" },
        { title: `${t('institutions.cnr.acronym')} - ${t('institutions.cnr.name')}`, icon: Users, path: "/funds/cnr" },
        { title: `${t('institutions.cnac.acronym')} - ${t('institutions.cnac.name')}`, icon: HeartHandshake, path: "/funds/cnac" },
        { title: `${t('institutions.casnos.acronym')} - ${t('institutions.casnos.name')}`, icon: Wallet, path: "/funds/casnos" },
        { title: `${t('institutions.cacobatph.acronym')} - ${t('institutions.cacobatph.name')}`, icon: HardHat, path: "/funds/cacobatph" },
      ],
    },
    {
      title: t('nav.agencies'),
      icon: Building2,
      isGroup: true,
      groupKey: "agencies",
      children: [
        { title: `${t('institutions.nesda.acronym')} - ${t('institutions.nesda.name')}`, icon: Lightbulb, path: "/agencies/nesda" },
        { title: `${t('institutions.angem.acronym')} - ${t('institutions.angem.name')}`, icon: CreditCard, path: "/agencies/angem" },
        { title: `${t('institutions.onaaph.acronym')} - ${t('institutions.onaaph.name')}`, icon: Accessibility, path: "/agencies/onaaph" },
      ],
    },
    {
      title: t('nav.annualReports'),
      icon: FileText,
      path: "/reports",
    },
  ];

  const toggleGroup = (groupKey: string) => {
    setOpenGroups((prev) =>
      prev.includes(groupKey)
        ? prev.filter((k) => k !== groupKey)
        : [...prev, groupKey]
    );
  };

  const isActive = (path: string) => location.pathname === path;
  const isGroupActive = (children: { path: string }[]) =>
    children.some((child) => location.pathname === child.path);

  const CollapseIcon = isRTL ? ChevronLeft : ChevronRight;

  return (
    <aside
      className={cn(
        "fixed top-0 h-screen bg-sidebar text-sidebar-foreground transition-all duration-300 z-50 flex flex-col",
        isRTL ? "right-0" : "left-0",
        isCollapsed ? "w-16" : "w-72"
      )}
    >
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sidebar-primary flex items-center justify-center">
              <Landmark className="w-6 h-6 text-sidebar-primary-foreground" />
            </div>
            <div>
              <h1 className="font-kufi font-bold text-sm">{t('institutions.directorate')}</h1>
              <p className="text-xs text-sidebar-foreground/70">{t('app.wilaya')}</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {isCollapsed ? <Menu className="w-5 h-5" /> : <CollapseIcon className="w-5 h-5" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        <ul className="space-y-1">
          {menuItems.map((item, idx) => (
            <li key={idx}>
              {item.isGroup ? (
                <Collapsible
                  open={!isCollapsed && openGroups.includes(item.groupKey!)}
                  onOpenChange={() => !isCollapsed && toggleGroup(item.groupKey!)}
                >
                  <CollapsibleTrigger asChild>
                    <button
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                        "hover:bg-sidebar-accent",
                        isGroupActive(item.children || []) && "bg-sidebar-accent"
                      )}
                    >
                      <item.icon className="w-5 h-5 shrink-0" />
                      {!isCollapsed && (
                        <>
                          <span className={cn("flex-1", isRTL ? "text-right" : "text-left")}>{item.title}</span>
                          <ChevronDown
                            className={cn(
                              "w-4 h-4 transition-transform",
                              openGroups.includes(item.groupKey!) && "rotate-180"
                            )}
                          />
                        </>
                      )}
                    </button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <ul className={cn(
                      "mt-1 space-y-1 border-sidebar-border",
                      isRTL ? "mr-4 border-r pr-3" : "ml-4 border-l pl-3"
                    )}>
                      {item.children?.map((child) => (
                        <li key={child.path}>
                          <Link
                            to={child.path}
                            className={cn(
                              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                              "hover:bg-sidebar-accent",
                              isActive(child.path) &&
                                "bg-sidebar-primary text-sidebar-primary-foreground"
                            )}
                          >
                            <child.icon className="w-4 h-4 shrink-0" />
                            <span className="truncate text-xs">{child.title}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    "hover:bg-sidebar-accent",
                    isActive(item.path) &&
                      "bg-sidebar-primary text-sidebar-primary-foreground"
                  )}
                >
                  <item.icon className="w-5 h-5 shrink-0" />
                  {!isCollapsed && <span>{item.title}</span>}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-sidebar-border">
          <div className="text-xs text-sidebar-foreground/60 text-center">
            <p>{t('app.title')}</p>
            <p>{t('app.version')}</p>
          </div>
        </div>
      )}
    </aside>
  );
}
