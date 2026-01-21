import {
  Users,
  Briefcase,
  TrendingUp,
  Building2,
  FileText,
  Shield,
  Landmark,
  Calendar,
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { KPICard } from "@/components/stats/KPICard";
import { AreaChartComponent } from "@/components/charts/AreaChartComponent";
import { BarChartComponent } from "@/components/charts/BarChartComponent";
import { PieChartComponent } from "@/components/charts/PieChartComponent";
import { SectionCard } from "@/components/common/SectionCard";
import {
  globalKPIs,
  wilayaInfo,
  yearlyComparison,
  beneficiariesDistribution,
  employmentAgencyStats,
} from "@/data/mockData";

export default function Dashboard() {
  const employmentData = yearlyComparison.employment.map((item) => ({
    ...item,
    employed: item.employed,
    unemployed: item.unemployed,
  }));

  const pieData = beneficiariesDistribution.map((item) => ({
    name: item.institution,
    value: item.count,
    color: item.color,
  }));

  return (
    <div className="p-6">
      <PageHeader
        title="لوحة القيادة الرئيسية"
        subtitle={`الإحصائيات العامة لقطاع التشغيل والعمل والضمان الاجتماعي - ولاية ${wilayaInfo.name}`}
        icon={Landmark}
        badge={`${wilayaInfo.year}`}
      />

      {/* Global KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard
          title="السكان النشطون"
          value={globalKPIs.activePopulation}
          icon={Users}
          tooltip="عدد السكان في سن العمل (15-64 سنة) القادرين على العمل"
          variant="primary"
          trend={{ value: 2.3, isPositive: true }}
        />
        <KPICard
          title="السكان المشتغلون"
          value={globalKPIs.employedPopulation}
          icon={Briefcase}
          tooltip="عدد الأشخاص الذين لديهم عمل مأجور أو نشاط مهني"
          variant="secondary"
          trend={{ value: 3.1, isPositive: true }}
        />
        <KPICard
          title="معدل البطالة"
          value={`${globalKPIs.unemploymentRate}%`}
          icon={TrendingUp}
          tooltip="نسبة العاطلين عن العمل من إجمالي السكان النشطين"
          variant="accent"
          trend={{ value: 1.2, isPositive: true }}
        />
        <KPICard
          title="المستفيدون من الضمان الاجتماعي"
          value={globalKPIs.totalBeneficiaries}
          icon={Shield}
          tooltip="إجمالي المؤمنين اجتماعياً عبر جميع الصناديق"
          trend={{ value: 4.5, isPositive: true }}
        />
      </div>

      {/* Secondary KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard
          title="طالبي العمل المسجلين"
          value={globalKPIs.registeredJobSeekers}
          icon={FileText}
          subtitle="ANEM"
        />
        <KPICard
          title="التنصيبات هذا العام"
          value={globalKPIs.placementsThisYear}
          icon={Building2}
          trend={{ value: 8.2, isPositive: true }}
        />
        <KPICard
          title="نسبة التغطية الاجتماعية"
          value={`${globalKPIs.socialSecurityCoverage}%`}
          icon={Shield}
        />
        <KPICard
          title="المتقاعدون"
          value={globalKPIs.retiredPersons}
          icon={Users}
          subtitle="CNR"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <AreaChartComponent
          title="تطور التشغيل والبطالة (2023-2025)"
          data={employmentData}
          xKey="year"
          areas={[
            { key: "employed", name: "المشتغلون", color: "hsl(145, 45%, 30%)" },
            { key: "unemployed", name: "العاطلون", color: "hsl(0, 65%, 50%)" },
          ]}
          height={320}
        />

        <PieChartComponent
          title="توزيع المستفيدين حسب الصندوق"
          data={pieData}
          height={320}
          innerRadius={60}
          outerRadius={100}
          showLabels
        />
      </div>

      {/* Employment Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <BarChartComponent
          title="التسجيلات والتنصيبات الشهرية"
          data={employmentAgencyStats.monthlyTrend}
          xKey="month"
          bars={[
            { key: "registrations", name: "التسجيلات", color: "hsl(215, 65%, 25%)" },
            { key: "placements", name: "التنصيبات", color: "hsl(145, 45%, 30%)" },
          ]}
          height={300}
        />

        <BarChartComponent
          title="توزيع طالبي العمل حسب المستوى التعليمي"
          data={employmentAgencyStats.jobSeekersByEducation}
          xKey="level"
          bars={[
            { key: "count", name: "العدد", color: "hsl(215, 65%, 25%)" },
          ]}
          height={300}
          colorByIndex
          showLegend={false}
        />
      </div>

      {/* Quick Stats Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SectionCard title="إحصائيات سريعة" icon={Calendar}>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">عروض العمل المتاحة</span>
              <span className="font-kufi font-bold text-primary">
                {employmentAgencyStats.summary.jobOffers.toLocaleString("ar-DZ")}
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">نسبة التنصيب</span>
              <span className="font-kufi font-bold text-secondary">
                {employmentAgencyStats.summary.placementRate}%
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">تسجيلات جديدة</span>
              <span className="font-kufi font-bold text-accent">
                {employmentAgencyStats.summary.newRegistrations.toLocaleString("ar-DZ")}
              </span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-muted-foreground">إجمالي المسجلين</span>
              <span className="font-kufi font-bold">
                {employmentAgencyStats.summary.totalJobSeekers.toLocaleString("ar-DZ")}
              </span>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="المقارنة السنوية للتشغيل" icon={TrendingUp}>
          <div className="space-y-4">
            {yearlyComparison.employment.map((item, index) => (
              <div
                key={item.year}
                className="p-3 rounded-lg bg-muted/50 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-kufi font-bold">{item.year}</span>
                  <span className="text-sm gov-badge gov-badge-primary">
                    معدل البطالة: {item.rate}%
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-secondary">
                    مشتغلون: {item.employed.toLocaleString("ar-DZ")}
                  </span>
                  <span className="text-destructive">
                    عاطلون: {item.unemployed.toLocaleString("ar-DZ")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="المقاولاتية والقروض المصغرة" icon={Building2}>
          <div className="space-y-4">
            {yearlyComparison.entrepreneurship.map((item, index) => (
              <div
                key={item.year}
                className="p-3 rounded-lg bg-muted/50 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-kufi font-bold">{item.year}</span>
                  <span className="text-sm gov-badge gov-badge-success">
                    الإجمالي: {item.total.toLocaleString("ar-DZ")}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-primary">
                    NESDA: {item.nesda.toLocaleString("ar-DZ")}
                  </span>
                  <span className="text-accent">
                    ANGEM: {item.angem.toLocaleString("ar-DZ")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
