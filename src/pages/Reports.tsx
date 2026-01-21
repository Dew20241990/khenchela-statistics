import {
  FileText,
  Download,
  Calendar,
  BarChart3,
  PieChart,
  TrendingUp,
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { Button } from "@/components/ui/button";
import {
  globalKPIs,
  wilayaInfo,
  nationalFundsStats,
  employmentAgencyStats,
  laborInspectionStats,
} from "@/data/mockData";

export default function Reports() {
  return (
    <div className="p-6">
      <PageHeader
        title="التقارير السنوية"
        subtitle="الحصيلة السنوية لقطاع التشغيل والعمل والضمان الاجتماعي"
        icon={FileText}
        badge={`${wilayaInfo.year}`}
        actions={
          <Button className="bg-white/20 hover:bg-white/30 text-white">
            <Download className="w-4 h-4 ml-2" />
            تصدير PDF
          </Button>
        }
      />

      {/* Executive Summary */}
      <SectionCard
        title="الملخص التنفيذي"
        icon={BarChart3}
        className="mb-6"
      >
        <div className="prose prose-lg max-w-none text-right">
          <p className="text-muted-foreground leading-relaxed">
            تتشرف مديرية التشغيل بولاية {wilayaInfo.name} بتقديم الحصيلة السنوية
            لسنة {wilayaInfo.year}، والتي تتضمن أهم المؤشرات والإنجازات المحققة
            في قطاع التشغيل والعمل والضمان الاجتماعي. تهدف هذه الحصيلة إلى تقديم
            صورة شاملة عن وضعية التشغيل والتغطية الاجتماعية بالولاية.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 text-center">
            <p className="text-3xl font-kufi font-bold text-primary">
              {globalKPIs.employedPopulation.toLocaleString("ar-DZ")}
            </p>
            <p className="text-sm text-muted-foreground mt-1">مشتغل</p>
          </div>
          <div className="p-4 rounded-lg bg-secondary/5 border border-secondary/20 text-center">
            <p className="text-3xl font-kufi font-bold text-secondary">
              {globalKPIs.unemploymentRate}%
            </p>
            <p className="text-sm text-muted-foreground mt-1">معدل البطالة</p>
          </div>
          <div className="p-4 rounded-lg bg-accent/5 border border-accent/20 text-center">
            <p className="text-3xl font-kufi font-bold text-accent">
              {globalKPIs.totalBeneficiaries.toLocaleString("ar-DZ")}
            </p>
            <p className="text-sm text-muted-foreground mt-1">مستفيد</p>
          </div>
          <div className="p-4 rounded-lg bg-muted text-center">
            <p className="text-3xl font-kufi font-bold">
              {globalKPIs.placementsThisYear.toLocaleString("ar-DZ")}
            </p>
            <p className="text-sm text-muted-foreground mt-1">تنصيب</p>
          </div>
        </div>
      </SectionCard>

      {/* Sections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Employment */}
        <SectionCard title="قطاع التشغيل" icon={TrendingUp}>
          <div className="space-y-4">
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">طالبي العمل المسجلين</span>
              <span className="font-bold">
                {employmentAgencyStats.summary.totalJobSeekers.toLocaleString("ar-DZ")}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">عروض العمل</span>
              <span className="font-bold">
                {employmentAgencyStats.summary.jobOffers.toLocaleString("ar-DZ")}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">التنصيبات المحققة</span>
              <span className="font-bold text-secondary">
                {employmentAgencyStats.summary.placements.toLocaleString("ar-DZ")}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-muted-foreground">نسبة التنصيب</span>
              <span className="font-bold text-primary">
                {employmentAgencyStats.summary.placementRate}%
              </span>
            </div>
          </div>
        </SectionCard>

        {/* Labor Inspection */}
        <SectionCard title="مفتشية العمل" icon={Calendar}>
          <div className="space-y-4">
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">زيارات التفتيش</span>
              <span className="font-bold">
                {laborInspectionStats.summary.totalVisits.toLocaleString("ar-DZ")}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">المؤسسات المراقبة</span>
              <span className="font-bold">
                {laborInspectionStats.summary.companiesInspected.toLocaleString("ar-DZ")}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">المخالفات المسجلة</span>
              <span className="font-bold text-destructive">
                {laborInspectionStats.summary.violationsRecorded.toLocaleString("ar-DZ")}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-muted-foreground">نسبة الامتثال</span>
              <span className="font-bold text-secondary">
                {laborInspectionStats.summary.complianceRate}%
              </span>
            </div>
          </div>
        </SectionCard>

        {/* Social Security */}
        <SectionCard title="الضمان الاجتماعي" icon={PieChart}>
          <div className="space-y-4">
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">CNAS - المنخرطين</span>
              <span className="font-bold">
                {nationalFundsStats.cnas.affiliatedWorkers.toLocaleString("ar-DZ")}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">CASNOS - غير الأجراء</span>
              <span className="font-bold">
                {nationalFundsStats.casnos.affiliatedWorkers.toLocaleString("ar-DZ")}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">CNR - المتقاعدين</span>
              <span className="font-bold">
                {nationalFundsStats.cnr.totalRetirees.toLocaleString("ar-DZ")}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-muted-foreground">نسبة التغطية العامة</span>
              <span className="font-bold text-primary">
                {globalKPIs.socialSecurityCoverage}%
              </span>
            </div>
          </div>
        </SectionCard>

        {/* Entrepreneurship */}
        <SectionCard title="المقاولاتية والتشغيل الذاتي" icon={BarChart3}>
          <div className="space-y-4">
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">NESDA - المشاريع الممولة</span>
              <span className="font-bold">
                {nationalFundsStats.cnac.projectsFinanced.toLocaleString("ar-DZ")}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">ANGEM - القروض الممنوحة</span>
              <span className="font-bold">1,250</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">مناصب الشغل المستحدثة</span>
              <span className="font-bold text-secondary">
                {nationalFundsStats.cnac.jobsCreated.toLocaleString("ar-DZ")}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-muted-foreground">نسبة النجاح</span>
              <span className="font-bold text-primary">62.5%</span>
            </div>
          </div>
        </SectionCard>
      </div>

      {/* Footer Note */}
      <div className="p-6 rounded-lg bg-muted/50 border border-border text-center">
        <p className="text-sm text-muted-foreground">
          هذا التقرير صادر عن مديرية التشغيل لولاية {wilayaInfo.name} - السنة
          المالية {wilayaInfo.year}
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          جميع البيانات رسمية ومعتمدة من الهيئات المختصة
        </p>
      </div>
    </div>
  );
}
