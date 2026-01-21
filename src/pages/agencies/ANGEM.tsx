import {
  CreditCard,
  Users,
  Wallet,
  TrendingUp,
  Heart,
  CheckCircle,
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { KPICard } from "@/components/stats/KPICard";
import { SectionCard } from "@/components/common/SectionCard";
import { BarChartComponent } from "@/components/charts/BarChartComponent";
import { agenciesStats, yearlyComparison } from "@/data/mockData";

export default function ANGEM() {
  const { angem } = agenciesStats;

  const yearlyData = yearlyComparison.entrepreneurship.map((item) => ({
    year: item.year,
    angem: item.angem,
  }));

  return (
    <div className="p-6">
      <PageHeader
        title="الوكالة الوطنية للقرض المصغر"
        subtitle="إحصائيات القروض المصغرة والتشغيل الذاتي - ولاية خنشلة"
        icon={CreditCard}
        badge="ANGEM"
      />

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
        <KPICard
          title="القروض الممنوحة"
          value={angem.creditsGranted}
          icon={CreditCard}
          variant="primary"
        />
        <KPICard
          title="المبلغ الإجمالي (دج)"
          value={(angem.totalAmount / 1000000).toFixed(0) + " مليون"}
          icon={Wallet}
          variant="secondary"
        />
        <KPICard
          title="المستفيدين"
          value={angem.beneficiaries}
          icon={Users}
        />
        <KPICard
          title="نسبة النساء"
          value={`${angem.womenPercentage}%`}
          icon={Heart}
          variant="accent"
          tooltip="نسبة النساء المستفيدات من القروض"
        />
        <KPICard
          title="نسبة السداد"
          value={`${angem.repaymentRate}%`}
          icon={CheckCircle}
          trend={{ value: 2.1, isPositive: true }}
        />
        <KPICard
          title="متوسط القرض (دج)"
          value={(angem.totalAmount / angem.creditsGranted).toLocaleString("ar-DZ", { maximumFractionDigits: 0 })}
          icon={TrendingUp}
        />
      </div>

      {/* Chart */}
      <BarChartComponent
        title="تطور القروض الممنوحة (2023-2025)"
        data={yearlyData}
        xKey="year"
        bars={[{ key: "angem", name: "القروض", color: "hsl(205, 85%, 55%)" }]}
        height={300}
        className="mb-6"
      />

      {/* Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SectionCard title="ملخص المؤشرات" icon={CreditCard}>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">القروض الممنوحة</span>
              <span className="font-kufi font-bold text-primary">
                {angem.creditsGranted.toLocaleString("ar-DZ")}
              </span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">المبلغ الإجمالي</span>
              <span className="font-kufi font-bold text-secondary">
                {angem.totalAmount.toLocaleString("ar-DZ")} دج
              </span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">المستفيدين</span>
              <span className="font-kufi font-bold">
                {angem.beneficiaries.toLocaleString("ar-DZ")}
              </span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-muted-foreground">نسبة السداد</span>
              <span className="font-kufi font-bold text-secondary">
                {angem.repaymentRate}%
              </span>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="البعد الاجتماعي" icon={Heart}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="p-4 rounded-lg bg-accent/5 border border-accent/20 text-center">
              <p className="text-3xl font-kufi font-bold text-accent">
                {angem.womenPercentage}%
              </p>
              <p className="text-sm text-muted-foreground mt-2">نسبة النساء</p>
            </div>
            <div className="p-4 rounded-lg bg-secondary/5 border border-secondary/20 text-center">
              <p className="text-3xl font-kufi font-bold text-secondary">
                {Math.round(angem.beneficiaries * angem.womenPercentage / 100)}
              </p>
              <p className="text-sm text-muted-foreground mt-2">امرأة مستفيدة</p>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-muted/50">
            <p className="text-sm text-muted-foreground">
              تهدف وكالة ANGEM إلى محاربة البطالة والهشاشة من خلال منح قروض
              مصغرة لتمويل مشاريع صغيرة ونشاطات مدرة للدخل.
            </p>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
