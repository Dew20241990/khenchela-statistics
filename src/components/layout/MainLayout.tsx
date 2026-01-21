import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AppSidebar } from "./AppSidebar";
import { LanguageSwitcher } from "@/components/common/LanguageSwitcher";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <div className="min-h-screen bg-background">
      {/* Top Header Bar with Language Switcher */}
      <header 
        className={cn(
          "fixed top-0 z-40 h-12 bg-primary flex items-center justify-between px-4 transition-all duration-300",
          isRTL 
            ? (sidebarCollapsed ? "right-16 left-0" : "right-72 left-0")
            : (sidebarCollapsed ? "left-16 right-0" : "left-72 right-0")
        )}
      >
        <div className="flex items-center gap-2">
          <span className="text-white/80 text-sm">
            {i18n.language === 'ar' ? 'النظام الإحصائي الرقمي' : 
             i18n.language === 'fr' ? 'Système Statistique Numérique' : 
             'Digital Statistics System'}
          </span>
        </div>
        <LanguageSwitcher />
      </header>

      <AppSidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <main
        className={cn(
          "min-h-screen pt-12 transition-all duration-300",
          isRTL 
            ? (sidebarCollapsed ? "mr-16" : "mr-72")
            : (sidebarCollapsed ? "ml-16" : "ml-72")
        )}
      >
        {children}
      </main>
    </div>
  );
}
