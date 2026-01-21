import {
  Accessibility,
  Users,
  Package,
  Heart,
  Award,
  TrendingUp,
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { KPICard } from "@/components/stats/KPICard";
import { SectionCard } from "@/components/common/SectionCard";
import { agenciesStats } from "@/data/mockData";

export default function ONAAPH() {
  const { onnaph } = agenciesStats;

  return (
    <div className="p-6">
      <PageHeader
        title="الديوان الوطني لتجهيزات الأشخاص المعاقين"
        subtitle="إحصائيات الأعضاء الاصطناعية والإدماج الاجتماعي - ولاية خنشلة"
        icon={Accessibility}
        badge="ONAAPH"
      />

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard
          title="المستفيدين المسجلين"
          value={onnaph.registeredBeneficiaries}
          icon={Users}
          variant="primary"
        />
        <KPICard
          title="التجهيزات المقدمة"
          value={onnaph.devicesProvided}
          icon={Package}
          variant="secondary"
          trend={{ value: 12.5, isPositive: true }}
        />
        <KPICard
          title="برامج الإدماج"
          value={onnaph.integrationPrograms}
          icon={Heart}
          variant="accent"
        />
        <KPICard
          title="نسبة الرضا"
          value={`${onnaph.satisfactionRate}%`}
          icon={Award}
          tooltip="نسبة رضا المستفيدين عن الخدمات المقدمة"
        />
      </div>

      {/* Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SectionCard title="ملخص المؤشرات" icon={Accessibility}>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">المستفيدين المسجلين</span>
              <span className="font-kufi font-bold text-primary">
                {onnaph.registeredBeneficiaries.toLocaleString("ar-DZ")}
              </span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">التجهيزات المقدمة</span>
              <span className="font-kufi font-bold text-secondary">
                {onnaph.devicesProvided.toLocaleString("ar-DZ")}
              </span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">برامج الإدماج</span>
              <span className="font-kufi font-bold text-accent">
                {onnaph.integrationPrograms.toLocaleString("ar-DZ")}
              </span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-muted-foreground">نسبة الرضا</span>
              <span className="font-kufi font-bold">
                {onnaph.satisfactionRate}%
              </span>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="مؤشرات الأداء" icon={TrendingUp}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 text-center">
              <p className="text-3xl font-kufi font-bold text-primary">
                {(onnaph.devicesProvided / onnaph.registeredBeneficiaries).toFixed(1)}
              </p>
              <p className="text-sm text-muted-foreground mt-2">تجهيز/مستفيد</p>
            </div>
            <div className="p-4 rounded-lg bg-accent/5 border border-accent/20 text-center">
              <p className="text-3xl font-kufi font-bold text-accent">
                {((onnaph.integrationPrograms / onnaph.registeredBeneficiaries) * 100).toFixed(1)}%
              </p>
              <p className="text-sm text-muted-foreground mt-2">نسبة الإدماج</p>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-muted/50">
            <p className="text-sm text-muted-foreground">
              يهدف الديوان الوطني إلى توفير الأعضاء الاصطناعية والتجهيزات
              الطبية للأشخاص ذوي الإعاقة ودعم إدماجهم الاجتماعي والمهني.
            </p>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
