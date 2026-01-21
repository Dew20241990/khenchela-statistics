import {
  Users,
  Calendar,
  Wallet,
  TrendingUp,
  Heart,
  Award,
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { KPICard } from "@/components/stats/KPICard";
import { SectionCard } from "@/components/common/SectionCard";
import { BarChartComponent } from "@/components/charts/BarChartComponent";
import { nationalFundsStats, yearlyComparison } from "@/data/mockData";

export default function CNR() {
  const { cnr } = nationalFundsStats;

  const yearlyData = yearlyComparison.socialSecurity.map((item) => ({
    year: item.year,
    cnr: item.cnr,
  }));

  return (
    <div className="p-6">
      <PageHeader
        title="الصندوق الوطني للتقاعد"
        subtitle="إحصائيات المتقاعدين ومعاشات التقاعد - ولاية خنشلة"
        icon={Users}
        badge="CNR"
      />

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <KPICard
          title="إجمالي المتقاعدين"
          value={cnr.totalRetirees}
          icon={Users}
          variant="primary"
          trend={{ value: 5.6, isPositive: true }}
        />
        <KPICard
          title="المتقاعدون الجدد 2025"
          value={cnr.newRetirees2025}
          icon={Calendar}
          variant="secondary"
        />
        <KPICard
          title="متوسط المعاش (دج)"
          value={cnr.averagePension.toLocaleString("ar-DZ")}
          icon={Wallet}
          variant="accent"
        />
        <KPICard
          title="ميزانية المعاشات"
          value={(cnr.pensionBudget / 1000000000).toFixed(1) + " مليار"}
          icon={TrendingUp}
        />
        <KPICard
          title="معاشات الوراثة"
          value={cnr.survivalPensions}
          icon={Heart}
          tooltip="عدد المستفيدين من معاشات الوراثة"
        />
      </div>

      {/* Chart */}
      <BarChartComponent
        title="تطور عدد المتقاعدين (2023-2025)"
        data={yearlyData}
        xKey="year"
        bars={[{ key: "cnr", name: "المتقاعدين", color: "hsl(40, 75%, 50%)" }]}
        height={300}
        className="mb-6"
      />

      {/* Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SectionCard title="ملخص المؤشرات" icon={Award}>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">إجمالي المتقاعدين</span>
              <span className="font-kufi font-bold text-primary">
                {cnr.totalRetirees.toLocaleString("ar-DZ")}
              </span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">المتقاعدون الجدد 2025</span>
              <span className="font-kufi font-bold">
                {cnr.newRetirees2025.toLocaleString("ar-DZ")}
              </span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">متوسط المعاش الشهري</span>
              <span className="font-kufi font-bold text-accent">
                {cnr.averagePension.toLocaleString("ar-DZ")} دج
              </span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">ميزانية المعاشات السنوية</span>
              <span className="font-kufi font-bold">
                {cnr.pensionBudget.toLocaleString("ar-DZ")} دج
              </span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-muted-foreground">معاشات الوراثة</span>
              <span className="font-kufi font-bold text-secondary">
                {cnr.survivalPensions.toLocaleString("ar-DZ")}
              </span>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="مؤشرات مشتقة" icon={TrendingUp}>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 text-center">
              <p className="text-3xl font-kufi font-bold text-primary">
                {((cnr.survivalPensions / cnr.totalRetirees) * 100).toFixed(1)}%
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                نسبة معاشات الوراثة
              </p>
            </div>
            <div className="p-4 rounded-lg bg-accent/5 border border-accent/20 text-center">
              <p className="text-3xl font-kufi font-bold text-accent">
                {(cnr.pensionBudget / cnr.totalRetirees / 12).toLocaleString("ar-DZ", {
                  maximumFractionDigits: 0,
                })}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                متوسط المعاش الشهري المحسوب
              </p>
            </div>
            <div className="p-4 rounded-lg bg-secondary/5 border border-secondary/20 text-center col-span-2">
              <p className="text-3xl font-kufi font-bold text-secondary">
                {((cnr.newRetirees2025 / cnr.totalRetirees) * 100).toFixed(1)}%
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                نسبة التدفق الجديد 2025
              </p>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
