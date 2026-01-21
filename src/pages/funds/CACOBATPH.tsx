import {
  HardHat,
  Users,
  Building2,
  Calendar,
  Wallet,
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { KPICard } from "@/components/stats/KPICard";
import { SectionCard } from "@/components/common/SectionCard";
import { nationalFundsStats } from "@/data/mockData";

export default function CACOBATPH() {
  const { cacobatph } = nationalFundsStats;

  return (
    <div className="p-6">
      <PageHeader
        title="صندوق العطل المدفوعة الأجر للبناء والأشغال العمومية"
        subtitle="إحصائيات العمال المنخرطين والعطل المدفوعة - ولاية خنشلة"
        icon={HardHat}
        badge="CACOBATPH"
      />

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard
          title="العمال المسجلين"
          value={cacobatph.registeredWorkers}
          icon={Users}
          variant="primary"
        />
        <KPICard
          title="أرباب العمل المنخرطين"
          value={cacobatph.employersAffiliated}
          icon={Building2}
          variant="secondary"
        />
        <KPICard
          title="أيام العطل المدفوعة"
          value={cacobatph.leavesDays.toLocaleString("ar-DZ")}
          icon={Calendar}
          variant="accent"
        />
        <KPICard
          title="الميزانية الإجمالية (دج)"
          value={(cacobatph.totalBudget / 1000000).toFixed(0) + " مليون"}
          icon={Wallet}
        />
      </div>

      {/* Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SectionCard title="ملخص المؤشرات" icon={HardHat}>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">العمال المسجلين</span>
              <span className="font-kufi font-bold text-primary">
                {cacobatph.registeredWorkers.toLocaleString("ar-DZ")}
              </span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">أرباب العمل</span>
              <span className="font-kufi font-bold text-secondary">
                {cacobatph.employersAffiliated.toLocaleString("ar-DZ")}
              </span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">أيام العطل الممنوحة</span>
              <span className="font-kufi font-bold text-accent">
                {cacobatph.leavesDays.toLocaleString("ar-DZ")}
              </span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-muted-foreground">الميزانية الإجمالية</span>
              <span className="font-kufi font-bold">
                {cacobatph.totalBudget.toLocaleString("ar-DZ")} دج
              </span>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="مؤشرات مشتقة" icon={Calendar}>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 text-center">
              <p className="text-3xl font-kufi font-bold text-primary">
                {(cacobatph.registeredWorkers / cacobatph.employersAffiliated).toFixed(1)}
              </p>
              <p className="text-sm text-muted-foreground mt-2">عامل/مؤسسة</p>
            </div>
            <div className="p-4 rounded-lg bg-accent/5 border border-accent/20 text-center">
              <p className="text-3xl font-kufi font-bold text-accent">
                {(cacobatph.leavesDays / cacobatph.registeredWorkers).toFixed(1)}
              </p>
              <p className="text-sm text-muted-foreground mt-2">يوم/عامل</p>
            </div>
          </div>
          <div className="mt-4 p-4 rounded-lg bg-muted/50">
            <p className="text-sm text-muted-foreground">
              يتكفل صندوق CACOBATPH بتمويل العطل السنوية المدفوعة الأجر لعمال
              قطاع البناء والأشغال العمومية والري.
            </p>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
