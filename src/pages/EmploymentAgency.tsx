import {
  Briefcase,
  Users,
  FileText,
  TrendingUp,
  Building2,
  GraduationCap,
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { KPICard } from "@/components/stats/KPICard";
import { AreaChartComponent } from "@/components/charts/AreaChartComponent";
import { BarChartComponent } from "@/components/charts/BarChartComponent";
import { PieChartComponent } from "@/components/charts/PieChartComponent";
import { DataTable } from "@/components/stats/DataTable";
import { SectionCard } from "@/components/common/SectionCard";
import { employmentAgencyStats } from "@/data/mockData";

export default function EmploymentAgency() {
  const ageData = employmentAgencyStats.jobSeekersByAge.map((item) => ({
    name: item.range,
    value: item.count,
  }));

  const contractData = employmentAgencyStats.placementsByContractType.map(
    (item) => ({
      name: item.type,
      value: item.count,
    })
  );

  return (
    <div className="p-6">
      <PageHeader
        title="مصلحة التشغيل بالولاية"
        subtitle="الوكالة الوطنية للتشغيل - فرع خنشلة"
        icon={Briefcase}
        badge="ANEM"
      />

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <KPICard
          title="طالبي العمل المسجلين"
          value={employmentAgencyStats.summary.totalJobSeekers}
          icon={Users}
          variant="primary"
        />
        <KPICard
          title="التسجيلات الجديدة"
          value={employmentAgencyStats.summary.newRegistrations}
          icon={FileText}
          trend={{ value: 5.2, isPositive: false }}
        />
        <KPICard
          title="عروض العمل"
          value={employmentAgencyStats.summary.jobOffers}
          icon={Building2}
          variant="secondary"
        />
        <KPICard
          title="التنصيبات"
          value={employmentAgencyStats.summary.placements}
          icon={TrendingUp}
          trend={{ value: 12.3, isPositive: true }}
        />
        <KPICard
          title="نسبة التنصيب"
          value={`${employmentAgencyStats.summary.placementRate}%`}
          icon={TrendingUp}
          variant="accent"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <AreaChartComponent
          title="التطور الشهري للتسجيلات والتنصيبات"
          data={employmentAgencyStats.monthlyTrend}
          xKey="month"
          areas={[
            {
              key: "registrations",
              name: "التسجيلات",
              color: "hsl(215, 65%, 25%)",
            },
            {
              key: "placements",
              name: "التنصيبات",
              color: "hsl(145, 45%, 30%)",
            },
          ]}
          height={320}
        />

        <PieChartComponent
          title="توزيع طالبي العمل حسب الفئة العمرية"
          data={ageData}
          height={320}
          innerRadius={50}
          outerRadius={90}
          showLabels
        />
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <BarChartComponent
          title="توزيع طالبي العمل حسب المستوى التعليمي"
          data={employmentAgencyStats.jobSeekersByEducation}
          xKey="level"
          bars={[{ key: "count", name: "العدد", color: "hsl(215, 65%, 25%)" }]}
          height={300}
          colorByIndex
          showLegend={false}
        />

        <PieChartComponent
          title="توزيع التنصيبات حسب نوع العقد"
          data={contractData}
          height={300}
          innerRadius={0}
          outerRadius={90}
        />
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <DataTable
          title="توزيع طالبي العمل حسب المستوى التعليمي"
          columns={[
            { key: "level", header: "المستوى التعليمي" },
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
          data={employmentAgencyStats.jobSeekersByEducation}
        />

        <DataTable
          title="توزيع التنصيبات حسب نوع العقد"
          columns={[
            { key: "type", header: "نوع العقد" },
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
          data={employmentAgencyStats.placementsByContractType}
        />
      </div>

      {/* Yearly Comparison */}
      <SectionCard title="المقارنة السنوية" icon={GraduationCap}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {employmentAgencyStats.yearlyComparison.map((item, index) => (
            <div
              key={item.year}
              className="p-4 rounded-lg border border-border bg-muted/30 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <h4 className="font-kufi font-bold text-lg mb-3 text-primary">
                {item.year}
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">التسجيلات</span>
                  <span className="font-medium">
                    {item.registrations.toLocaleString("ar-DZ")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">التنصيبات</span>
                  <span className="font-medium text-secondary">
                    {item.placements.toLocaleString("ar-DZ")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">نسبة التنصيب</span>
                  <span className="font-medium text-accent">{item.rate}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
