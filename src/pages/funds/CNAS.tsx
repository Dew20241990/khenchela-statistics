import {
  Shield,
  Users,
  Building2,
  Wallet,
  TrendingUp,
  Heart,
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { KPICard } from "@/components/stats/KPICard";
import { SectionCard } from "@/components/common/SectionCard";
import { BarChartComponent } from "@/components/charts/BarChartComponent";
import { nationalFundsStats, yearlyComparison } from "@/data/mockData";

export default function CNAS() {
  const { cnas } = nationalFundsStats;

  const yearlyData = yearlyComparison.socialSecurity.map((item) => ({
    year: item.year,
    cnas: item.cnas,
  }));

  return (
    <div className="p-6">
      <PageHeader
        title="الصندوق الوطني للتأمينات الاجتماعية"
        subtitle="إحصائيات التغطية الاجتماعية للأجراء - ولاية خنشلة"
        icon={Shield}
        badge="CNAS"
      />

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <KPICard
          title="العمال المنخرطين"
          value={cnas.affiliatedWorkers}
          icon={Users}
          variant="primary"
          tooltip="عدد العمال المنخرطين في نظام التأمين الاجتماعي"
          trend={{ value: 4.6, isPositive: true }}
        />
        <KPICard
          title="أرباب العمل"
          value={cnas.employers}
          icon={Building2}
          variant="secondary"
        />
        <KPICard
          title="المستفيدون"
          value={cnas.beneficiaries}
          icon={Heart}
          tooltip="إجمالي المستفيدين من التغطية (العمال وذويهم)"
        />
        <KPICard
          title="تعويضات الأدوية (دج)"
          value={(cnas.medicalReimbursements / 1000000).toFixed(0) + " مليون"}
          icon={Wallet}
          variant="accent"
        />
        <KPICard
          title="نسبة الاشتراكات"
          value={`${cnas.contributionRate}%`}
          icon={TrendingUp}
          tooltip="نسبة تحصيل الاشتراكات من إجمالي المستحقات"
          trend={{ value: 1.8, isPositive: true }}
        />
      </div>

      {/* Chart */}
      <BarChartComponent
        title="تطور عدد المنخرطين (2023-2025)"
        data={yearlyData}
        xKey="year"
        bars={[{ key: "cnas", name: "المنخرطين", color: "hsl(215, 65%, 25%)" }]}
        height={300}
        className="mb-6"
      />

      {/* Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SectionCard title="ملخص المؤشرات" icon={Shield}>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">العمال المنخرطين</span>
              <span className="font-kufi font-bold text-primary">
                {cnas.affiliatedWorkers.toLocaleString("ar-DZ")}
              </span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">أرباب العمل</span>
              <span className="font-kufi font-bold">
                {cnas.employers.toLocaleString("ar-DZ")}
              </span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">إجمالي المستفيدين</span>
              <span className="font-kufi font-bold text-secondary">
                {cnas.beneficiaries.toLocaleString("ar-DZ")}
              </span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">تعويضات الأدوية</span>
              <span className="font-kufi font-bold text-accent">
                {cnas.medicalReimbursements.toLocaleString("ar-DZ")} دج
              </span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-muted-foreground">نسبة تحصيل الاشتراكات</span>
              <span className="font-kufi font-bold text-secondary">
                {cnas.contributionRate}%
              </span>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="معلومات الصندوق" icon={Building2}>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <h4 className="font-kufi font-bold text-primary mb-2">
                الصندوق الوطني للتأمينات الاجتماعية
              </h4>
              <p className="text-sm text-muted-foreground">
                يتكفل الصندوق بتغطية العمال الأجراء ضد المخاطر المهنية والأمراض،
                ويضمن لهم تعويضات الأدوية والعلاج والإقامة في المستشفيات.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-muted/50 text-center">
                <p className="text-2xl font-kufi font-bold text-primary">
                  {((cnas.beneficiaries / cnas.affiliatedWorkers) * 100).toFixed(1)}%
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  معدل التغطية للعائلات
                </p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 text-center">
                <p className="text-2xl font-kufi font-bold text-secondary">
                  {(cnas.affiliatedWorkers / cnas.employers).toFixed(0)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  متوسط العمال/مؤسسة
                </p>
              </div>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
