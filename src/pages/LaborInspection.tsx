import {
  ClipboardCheck,
  Building,
  AlertTriangle,
  Users,
  CheckCircle,
  Search,
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { KPICard } from "@/components/stats/KPICard";
import { BarChartComponent } from "@/components/charts/BarChartComponent";
import { PieChartComponent } from "@/components/charts/PieChartComponent";
import { DataTable } from "@/components/stats/DataTable";
import { SectionCard } from "@/components/common/SectionCard";
import { laborInspectionStats } from "@/data/mockData";

export default function LaborInspection() {
  const visitTypeData = laborInspectionStats.visitsByType.map((item) => ({
    name: item.type,
    value: item.count,
  }));

  const violationData = laborInspectionStats.violationsByCategory.map(
    (item) => ({
      name: item.category,
      value: item.count,
    })
  );

  return (
    <div className="p-6">
      <PageHeader
        title="مفتشية العمل"
        subtitle="إحصائيات المراقبة والتفتيش - ولاية خنشلة"
        icon={ClipboardCheck}
        badge="2025"
      />

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <KPICard
          title="إجمالي الزيارات"
          value={laborInspectionStats.summary.totalVisits}
          icon={Search}
          variant="primary"
          tooltip="عدد زيارات التفتيش الميدانية المنجزة خلال السنة"
        />
        <KPICard
          title="المؤسسات المراقبة"
          value={laborInspectionStats.summary.companiesInspected}
          icon={Building}
          variant="secondary"
        />
        <KPICard
          title="العمال المراقبون"
          value={laborInspectionStats.summary.workersControlled}
          icon={Users}
          trend={{ value: 8.5, isPositive: true }}
        />
        <KPICard
          title="المخالفات المسجلة"
          value={laborInspectionStats.summary.violationsRecorded}
          icon={AlertTriangle}
          variant="accent"
        />
        <KPICard
          title="نسبة الامتثال"
          value={`${laborInspectionStats.summary.complianceRate}%`}
          icon={CheckCircle}
          tooltip="نسبة المؤسسات الممتثلة لقانون العمل"
          trend={{ value: 2.3, isPositive: true }}
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <PieChartComponent
          title="توزيع الزيارات حسب النوع"
          data={visitTypeData}
          height={320}
          innerRadius={50}
          outerRadius={90}
          showLabels
        />

        <PieChartComponent
          title="توزيع المخالفات حسب الفئة"
          data={violationData}
          height={320}
          innerRadius={50}
          outerRadius={90}
        />
      </div>

      {/* Sector Distribution */}
      <BarChartComponent
        title="توزيع الزيارات والمخالفات حسب القطاع"
        data={laborInspectionStats.sectorDistribution}
        xKey="sector"
        bars={[
          { key: "visits", name: "الزيارات", color: "hsl(215, 65%, 25%)" },
          { key: "violations", name: "المخالفات", color: "hsl(0, 65%, 50%)" },
        ]}
        height={350}
        className="mb-6"
      />

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <DataTable
          title="توزيع الزيارات حسب النوع"
          columns={[
            { key: "type", header: "نوع الزيارة" },
            {
              key: "count",
              header: "العدد",
              render: (item) => item.count.toLocaleString("ar-DZ"),
            },
            {
              key: "percentage",
              header: "النسبة",
              render: (item) => `${item.percentage}%`,
            },
          ]}
          data={laborInspectionStats.visitsByType}
        />

        <DataTable
          title="توزيع المخالفات حسب الفئة"
          columns={[
            { key: "category", header: "فئة المخالفة" },
            {
              key: "count",
              header: "العدد",
              render: (item) => item.count.toLocaleString("ar-DZ"),
            },
            {
              key: "percentage",
              header: "النسبة",
              render: (item) => `${item.percentage}%`,
            },
          ]}
          data={laborInspectionStats.violationsByCategory}
        />
      </div>

      {/* Quarterly Trend */}
      <SectionCard title="التطور الفصلي" icon={ClipboardCheck}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {laborInspectionStats.quarterlyTrend.map((item, index) => (
            <div
              key={item.quarter}
              className="p-4 rounded-lg border border-border bg-muted/30 text-center animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <h4 className="font-kufi font-bold text-lg mb-3 text-primary">
                {item.quarter}
              </h4>
              <div className="space-y-3">
                <div>
                  <p className="text-2xl font-kufi font-bold text-foreground">
                    {item.visits.toLocaleString("ar-DZ")}
                  </p>
                  <p className="text-sm text-muted-foreground">زيارة</p>
                </div>
                <div className="pt-2 border-t border-border">
                  <p className="text-xl font-kufi font-bold text-destructive">
                    {item.violations.toLocaleString("ar-DZ")}
                  </p>
                  <p className="text-sm text-muted-foreground">مخالفة</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
