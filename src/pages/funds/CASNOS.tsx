import {
  Wallet,
  Users,
  TrendingUp,
  Building2,
  CheckCircle,
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { KPICard } from "@/components/stats/KPICard";
import { SectionCard } from "@/components/common/SectionCard";
import { nationalFundsStats, yearlyComparison } from "@/data/mockData";
import { BarChartComponent } from "@/components/charts/BarChartComponent";

export default function CASNOS() {
  const { casnos } = nationalFundsStats;

  const yearlyData = yearlyComparison.socialSecurity.map((item) => ({
    year: item.year,
    casnos: item.casnos,
  }));

  return (
    <div className="p-6">
      <PageHeader
        title="الصندوق الوطني للضمان الاجتماعي لغير الأجراء"
        subtitle="إحصائيات التغطية الاجتماعية للعمال المستقلين - ولاية خنشلة"
        icon={Wallet}
        badge="CASNOS"
      />

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard
          title="المنخرطين"
          value={casnos.affiliatedWorkers}
          icon={Users}
          variant="primary"
          trend={{ value: 5.6, isPositive: true }}
        />
        <KPICard
          title="المساهمين النشطين"
          value={casnos.activeContributors}
          icon={CheckCircle}
          variant="secondary"
        />
        <KPICard
          title="المتقاعدين المستفيدين"
          value={casnos.retiredBeneficiaries}
          icon={Users}
        />
        <KPICard
          title="نسبة الاشتراكات"
          value={`${casnos.contributionRate}%`}
          icon={TrendingUp}
          variant="accent"
        />
      </div>

      {/* Chart */}
      <BarChartComponent
        title="تطور عدد المنخرطين (2023-2025)"
        data={yearlyData}
        xKey="year"
        bars={[{ key: "casnos", name: "المنخرطين", color: "hsl(145, 45%, 30%)" }]}
        height={300}
        className="mb-6"
      />

      {/* Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SectionCard title="ملخص المؤشرات" icon={Wallet}>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">إجمالي المنخرطين</span>
              <span className="font-kufi font-bold text-primary">
                {casnos.affiliatedWorkers.toLocaleString("ar-DZ")}
              </span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">المساهمين النشطين</span>
              <span className="font-kufi font-bold text-secondary">
                {casnos.activeContributors.toLocaleString("ar-DZ")}
              </span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">المتقاعدين المستفيدين</span>
              <span className="font-kufi font-bold">
                {casnos.retiredBeneficiaries.toLocaleString("ar-DZ")}
              </span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-muted-foreground">نسبة تحصيل الاشتراكات</span>
              <span className="font-kufi font-bold text-accent">
                {casnos.contributionRate}%
              </span>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="مؤشرات مشتقة" icon={Building2}>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 text-center">
              <p className="text-3xl font-kufi font-bold text-primary">
                {((casnos.activeContributors / casnos.affiliatedWorkers) * 100).toFixed(1)}%
              </p>
              <p className="text-sm text-muted-foreground mt-2">نسبة النشاط</p>
            </div>
            <div className="p-4 rounded-lg bg-secondary/5 border border-secondary/20 text-center">
              <p className="text-3xl font-kufi font-bold text-secondary">
                {((casnos.retiredBeneficiaries / casnos.affiliatedWorkers) * 100).toFixed(1)}%
              </p>
              <p className="text-sm text-muted-foreground mt-2">نسبة المتقاعدين</p>
            </div>
          </div>
          <div className="mt-4 p-4 rounded-lg bg-muted/50">
            <p className="text-sm text-muted-foreground">
              يتكفل صندوق CASNOS بالتغطية الاجتماعية للعمال غير الأجراء كالتجار
              والحرفيين والفلاحين والمهن الحرة.
            </p>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
