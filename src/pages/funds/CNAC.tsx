import {
  HeartHandshake,
  Users,
  Wallet,
  Briefcase,
  TrendingUp,
  Target,
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { KPICard } from "@/components/stats/KPICard";
import { SectionCard } from "@/components/common/SectionCard";
import { nationalFundsStats } from "@/data/mockData";

export default function CNAC() {
  const { cnac } = nationalFundsStats;

  return (
    <div className="p-6">
      <PageHeader
        title="الصندوق الوطني للتأمين عن البطالة"
        subtitle="إحصائيات التعويض عن البطالة ودعم المشاريع - ولاية خنشلة"
        icon={HeartHandshake}
        badge="CNAC"
      />

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <KPICard
          title="البطالون المسجلون"
          value={cnac.registeredUnemployed}
          icon={Users}
          variant="primary"
        />
        <KPICard
          title="المستفيدون من التعويضات"
          value={cnac.allowanceBeneficiaries}
          icon={Wallet}
          variant="secondary"
          trend={{ value: 3.2, isPositive: true }}
        />
        <KPICard
          title="التعويض الشهري (دج)"
          value={cnac.monthlyAllowance.toLocaleString("ar-DZ")}
          icon={Wallet}
          variant="accent"
        />
        <KPICard
          title="المشاريع الممولة"
          value={cnac.projectsFinanced}
          icon={Briefcase}
          trend={{ value: 15.5, isPositive: true }}
        />
        <KPICard
          title="مناصب الشغل المستحدثة"
          value={cnac.jobsCreated}
          icon={TrendingUp}
          tooltip="مناصب الشغل المستحدثة عبر المشاريع الممولة"
        />
      </div>

      {/* Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SectionCard title="إحصائيات التعويض عن البطالة" icon={HeartHandshake}>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">البطالون المسجلون</span>
              <span className="font-kufi font-bold text-primary">
                {cnac.registeredUnemployed.toLocaleString("ar-DZ")}
              </span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">المستفيدون من التعويضات</span>
              <span className="font-kufi font-bold text-secondary">
                {cnac.allowanceBeneficiaries.toLocaleString("ar-DZ")}
              </span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">التعويض الشهري</span>
              <span className="font-kufi font-bold text-accent">
                {cnac.monthlyAllowance.toLocaleString("ar-DZ")} دج
              </span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-muted-foreground">نسبة الاستفادة</span>
              <span className="font-kufi font-bold">
                {((cnac.allowanceBeneficiaries / cnac.registeredUnemployed) * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="دعم المشاريع المصغرة" icon={Target}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 text-center">
                <p className="text-3xl font-kufi font-bold text-primary">
                  {cnac.projectsFinanced}
                </p>
                <p className="text-sm text-muted-foreground mt-1">مشروع ممول</p>
              </div>
              <div className="p-4 rounded-lg bg-secondary/5 border border-secondary/20 text-center">
                <p className="text-3xl font-kufi font-bold text-secondary">
                  {cnac.jobsCreated}
                </p>
                <p className="text-sm text-muted-foreground mt-1">منصب مستحدث</p>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  متوسط المناصب/مشروع
                </span>
                <span className="font-kufi font-bold text-accent">
                  {(cnac.jobsCreated / cnac.projectsFinanced).toFixed(1)}
                </span>
              </div>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
