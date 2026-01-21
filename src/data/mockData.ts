// البيانات الإحصائية التجريبية - قطاع التشغيل والعمل والضمان الاجتماعي
// ولاية خنشلة

export const wilayaInfo = {
  name: "خنشلة",
  code: "40",
  population: 423000,
  activePopulation: 185000,
  year: 2025,
};

// المؤشرات الرئيسية للوحة القيادة
export const globalKPIs = {
  activePopulation: 185000,
  employedPopulation: 156000,
  unemploymentRate: 15.7,
  totalBeneficiaries: 89500,
  registeredJobSeekers: 28900,
  placementsThisYear: 4250,
  socialSecurityCoverage: 78.5,
  retiredPersons: 24500,
};

// إحصائيات وكالة التشغيل
export const employmentAgencyStats = {
  summary: {
    totalJobSeekers: 28900,
    newRegistrations: 3420,
    jobOffers: 5680,
    placements: 4250,
    placementRate: 74.8,
  },
  jobSeekersByEducation: [
    { level: "جامعي", count: 8450, percentage: 29.2 },
    { level: "ثانوي", count: 9680, percentage: 33.5 },
    { level: "تكوين مهني", count: 6320, percentage: 21.9 },
    { level: "متوسط فما دون", count: 4450, percentage: 15.4 },
  ],
  jobSeekersByAge: [
    { range: "18-25", count: 11560, percentage: 40 },
    { range: "26-35", count: 10115, percentage: 35 },
    { range: "36-45", count: 4913, percentage: 17 },
    { range: "+45", count: 2312, percentage: 8 },
  ],
  placementsByContractType: [
    { type: "عقد غير محدد المدة", count: 1680, percentage: 39.5 },
    { type: "عقد محدد المدة", count: 1870, percentage: 44 },
    { type: "إدماج مهني", count: 520, percentage: 12.2 },
    { type: "تكوين", count: 180, percentage: 4.3 },
  ],
  monthlyTrend: [
    { month: "جانفي", registrations: 420, placements: 310 },
    { month: "فيفري", registrations: 380, placements: 290 },
    { month: "مارس", registrations: 450, placements: 380 },
    { month: "أفريل", registrations: 520, placements: 420 },
    { month: "ماي", registrations: 480, placements: 390 },
    { month: "جوان", registrations: 560, placements: 450 },
    { month: "جويلية", registrations: 390, placements: 320 },
    { month: "أوت", registrations: 340, placements: 280 },
    { month: "سبتمبر", registrations: 580, placements: 470 },
    { month: "أكتوبر", registrations: 620, placements: 510 },
    { month: "نوفمبر", registrations: 540, placements: 430 },
    { month: "ديسمبر", registrations: 140, placements: 0 },
  ],
  yearlyComparison: [
    { year: "2023", registrations: 32500, placements: 3850, rate: 11.8 },
    { year: "2024", registrations: 30200, placements: 4120, rate: 13.6 },
    { year: "2025", registrations: 28900, placements: 4250, rate: 14.7 },
  ],
};

// إحصائيات مفتشية العمل
export const laborInspectionStats = {
  summary: {
    totalVisits: 1845,
    companiesInspected: 1280,
    workersControlled: 18560,
    violationsRecorded: 428,
    complianceRate: 76.8,
  },
  visitsByType: [
    { type: "زيارات روتينية", count: 980, percentage: 53.1 },
    { type: "زيارات مراقبة", count: 485, percentage: 26.3 },
    { type: "تحقيقات حوادث", count: 156, percentage: 8.5 },
    { type: "متابعة شكاوى", count: 224, percentage: 12.1 },
  ],
  violationsByCategory: [
    { category: "السلامة والصحة المهنية", count: 142, percentage: 33.2 },
    { category: "عقود العمل", count: 98, percentage: 22.9 },
    { category: "الأجور والتعويضات", count: 85, percentage: 19.9 },
    { category: "ساعات العمل", count: 63, percentage: 14.7 },
    { category: "أخرى", count: 40, percentage: 9.3 },
  ],
  sectorDistribution: [
    { sector: "البناء والأشغال العمومية", visits: 520, violations: 145 },
    { sector: "التجارة", visits: 380, violations: 98 },
    { sector: "الصناعة", visits: 290, violations: 72 },
    { sector: "الخدمات", visits: 420, violations: 68 },
    { sector: "الفلاحة", visits: 235, violations: 45 },
  ],
  quarterlyTrend: [
    { quarter: "الربع الأول", visits: 425, violations: 98 },
    { quarter: "الربع الثاني", visits: 480, violations: 112 },
    { quarter: "الربع الثالث", visits: 390, violations: 89 },
    { quarter: "الربع الرابع", visits: 550, violations: 129 },
  ],
};

// إحصائيات الصناديق الوطنية
export const nationalFundsStats = {
  cnas: {
    name: "الصندوق الوطني للتأمينات الاجتماعية",
    acronym: "CNAS",
    affiliatedWorkers: 68500,
    employers: 4250,
    beneficiaries: 145000,
    medicalReimbursements: 2850000000,
    contributionRate: 92.5,
  },
  cnr: {
    name: "الصندوق الوطني للتقاعد",
    acronym: "CNR",
    totalRetirees: 24500,
    newRetirees2025: 1850,
    averagePension: 42000,
    pensionBudget: 12348000000,
    survivalPensions: 8200,
  },
  cnac: {
    name: "الصندوق الوطني للتأمين عن البطالة",
    acronym: "CNAC",
    registeredUnemployed: 12500,
    allowanceBeneficiaries: 8900,
    monthlyAllowance: 15000,
    projectsFinanced: 245,
    jobsCreated: 520,
  },
  casnos: {
    name: "الصندوق الوطني للضمان الاجتماعي لغير الأجراء",
    acronym: "CASNOS",
    affiliatedWorkers: 28500,
    activeContributors: 22400,
    retiredBeneficiaries: 6100,
    contributionRate: 78.6,
  },
  cacobatph: {
    name: "صندوق العطل المدفوعة الأجر للبناء",
    acronym: "CACOBATPH",
    registeredWorkers: 8900,
    employersAffiliated: 620,
    leavesDays: 156000,
    totalBudget: 1250000000,
  },
};

// إحصائيات الوكالات
export const agenciesStats = {
  anem: {
    name: "الوكالة الوطنية للتشغيل",
    acronym: "ANEM",
    registeredSeekers: 28900,
    placedWorkers: 4250,
    activeOffers: 1420,
    partnerCompanies: 850,
  },
  nesda: {
    name: "الوكالة الوطنية لدعم وتنمية المقاولاتية",
    acronym: "NESDA",
    projectsSubmitted: 680,
    projectsApproved: 425,
    jobsCreated: 1280,
    totalFinancing: 2850000000,
    successRate: 62.5,
  },
  angem: {
    name: "الوكالة الوطنية للقرض المصغر",
    acronym: "ANGEM",
    creditsGranted: 1250,
    totalAmount: 950000000,
    beneficiaries: 1180,
    womenPercentage: 68.5,
    repaymentRate: 85.2,
  },
  onnaph: {
    name: "الديوان الوطني للأعضاء الاصطناعية",
    acronym: "ONAAPH",
    registeredBeneficiaries: 2450,
    devicesProvided: 3200,
    integrationPrograms: 180,
    satisfactionRate: 89.5,
  },
};

// بيانات المقارنة السنوية
export const yearlyComparison = {
  employment: [
    { year: "2023", employed: 148000, unemployed: 32000, rate: 17.8 },
    { year: "2024", employed: 152000, unemployed: 30500, rate: 16.7 },
    { year: "2025", employed: 156000, unemployed: 29000, rate: 15.7 },
  ],
  socialSecurity: [
    { year: "2023", cnas: 62000, casnos: 25000, cnr: 22000 },
    { year: "2024", cnas: 65500, casnos: 27000, cnr: 23200 },
    { year: "2025", cnas: 68500, casnos: 28500, cnr: 24500 },
  ],
  entrepreneurship: [
    { year: "2023", nesda: 320, angem: 980, total: 1300 },
    { year: "2024", nesda: 385, angem: 1120, total: 1505 },
    { year: "2025", nesda: 425, angem: 1250, total: 1675 },
  ],
};

// توزيع المستفيدين حسب المؤسسة
export const beneficiariesDistribution = [
  { institution: "CNAS", count: 68500, color: "hsl(215, 65%, 25%)" },
  { institution: "CASNOS", count: 28500, color: "hsl(145, 45%, 30%)" },
  { institution: "CNR", count: 24500, color: "hsl(40, 75%, 50%)" },
  { institution: "CNAC", count: 8900, color: "hsl(205, 85%, 55%)" },
  { institution: "CACOBATPH", count: 8900, color: "hsl(280, 50%, 45%)" },
];
