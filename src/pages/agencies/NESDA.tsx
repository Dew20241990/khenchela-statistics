import {
  Lightbulb,
  FileText,
  CheckCircle,
  Users,
  Wallet,
  TrendingUp,
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { KPICard } from "@/components/stats/KPICard";
import { SectionCard } from "@/components/common/SectionCard";
import { BarChartComponent } from "@/components/charts/BarChartComponent";
import { agenciesStats, yearlyComparison } from "@/data/mockData";

export default function NESDA() {
  const { nesda } = agenciesStats;

  const yearlyData = yearlyComparison.entrepreneurship.map((item) => ({
    year: item.year,
    nesda: item.nesda,
  }));

  return (
    <div className="p-6">
      <PageHeader
        title="الوكالة الوطنية لدعم وتنمية المقاولاتية"
        subtitle="إحصائيات دعم المشاريع المقاولاتية - ولاية خنشلة"
        icon={Lightbulb}
        badge="NESDA"
      />

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <KPICard
          title="المشاريع المقدمة"
          value={nesda.projectsSubmitted}
          icon={FileText}
          variant="primary"
        />
        <KPICard
          title="المشاريع المصادق عليها"
          value={nesda.projectsApproved}
          icon={CheckCircle}
          variant="secondary"
          trend={{ value: 10.4, isPositive: true }}
        />
        <KPICard
          title="مناصب الشغل المستحدثة"
          value={nesda.jobsCreated}
          icon={Users}
          variant="accent"
        />
        <KPICard
          title="التمويل الممنوح (دج)"
          value={(nesda.totalFinancing / 1000000000).toFixed(1) + " مليار"}
          icon={Wallet}
        />
        <KPICard
          title="نسبة النجاح"
          value={`${nesda.successRate}%`}
          icon={TrendingUp}
          tooltip="نسبة المشاريع المصادق عليها من إجمالي المقدمة"
        />
      </div>

      {/* Chart */}
      <BarChartComponent
        title="تطور المشاريع الممولة (2023-2025)"
        data={yearlyData}
        xKey="year"
        bars={[{ key: "nesda", name: "المشاريع", color: "hsl(40, 75%, 50%)" }]}
        height={300}
        className="mb-6"
      />

      {/* Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SectionCard title="ملخص المؤشرات" icon={Lightbulb}>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">المشاريع المقدمة</span>
              <span className="font-kufi font-bold text-primary">
                {nesda.projectsSubmitted.toLocaleString("ar-DZ")}
              </span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">المشاريع المصادق عليها</span>
              <span className="font-kufi font-bold text-secondary">
                {nesda.projectsApproved.toLocaleString("ar-DZ")}
              </span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">مناصب الشغل المستحدثة</span>
              <span className="font-kufi font-bold text-accent">
                {nesda.jobsCreated.toLocaleString("ar-DZ")}
              </span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-muted-foreground">نسبة النجاح</span>
              <span className="font-kufi font-bold">
                {nesda.successRate}%
              </span>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="مؤشرات الأداء" icon={TrendingUp}>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 text-center">
              <p className="text-3xl font-kufi font-bold text-primary">
                {(nesda.jobsCreated / nesda.projectsApproved).toFixed(1)}
              </p>
              <p className="text-sm text-muted-foreground mt-2">منصب/مشروع</p>
            </div>
            <div className="p-4 rounded-lg bg-accent/5 border border-accent/20 text-center">
              <p className="text-3xl font-kufi font-bold text-accent">
                {(nesda.totalFinancing / nesda.projectsApproved / 1000000).toFixed(1)}
              </p>
              <p className="text-sm text-muted-foreground mt-2">مليون دج/مشروع</p>
            </div>
          </div>
          <div className="mt-4 p-4 rounded-lg bg-muted/50">
            <p className="text-sm text-muted-foreground">
              تهدف وكالة NESDA إلى دعم وتطوير روح المقاولاتية لدى الشباب
              وتمويل مشاريعهم الاستثمارية.
            </p>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
