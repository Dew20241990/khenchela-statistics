// Authentication & Authorization Types
// Role-Based Access Control (RBAC) for Government Statistics Platform

export type UserRole = 'super_admin' | 'institution_admin' | 'analyst' | 'viewer';

export type Institution = 
  | 'directorate'
  | 'employment'
  | 'labor_inspection'
  | 'cnas'
  | 'cnr'
  | 'cnac'
  | 'casnos'
  | 'cacobatph'
  | 'nesda'
  | 'angem'
  | 'onaaph';

export type Permission = 
  | 'create'
  | 'read'
  | 'update'
  | 'delete'
  | 'export'
  | 'import'
  | 'validate'
  | 'lock'
  | 'manage_users';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  institution: Institution;
  permissions: Permission[];
  createdAt: Date;
  lastLogin?: Date;
  isActive: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Role permission matrix
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  super_admin: ['create', 'read', 'update', 'delete', 'export', 'import', 'validate', 'lock', 'manage_users'],
  institution_admin: ['create', 'read', 'update', 'delete', 'export', 'import'],
  analyst: ['create', 'read', 'update', 'export', 'import'],
  viewer: ['read', 'export'],
};

// Role labels in multiple languages
export const ROLE_LABELS: Record<UserRole, { ar: string; fr: string; en: string }> = {
  super_admin: {
    ar: 'المسؤول العام',
    fr: 'Super Administrateur',
    en: 'Super Administrator',
  },
  institution_admin: {
    ar: 'مسؤول المؤسسة',
    fr: 'Administrateur Institution',
    en: 'Institution Administrator',
  },
  analyst: {
    ar: 'محلل / إحصائي',
    fr: 'Analyste / Statisticien',
    en: 'Analyst / Statistician',
  },
  viewer: {
    ar: 'مطالع',
    fr: 'Lecteur',
    en: 'Viewer',
  },
};

// Institution labels
export const INSTITUTION_LABELS: Record<Institution, { ar: string; fr: string; en: string }> = {
  directorate: {
    ar: 'مديرية التشغيل',
    fr: 'Direction de l\'Emploi',
    en: 'Employment Directorate',
  },
  employment: {
    ar: 'مصلحة التشغيل',
    fr: 'Service de l\'Emploi',
    en: 'Employment Service',
  },
  labor_inspection: {
    ar: 'مفتشية العمل',
    fr: 'Inspection du Travail',
    en: 'Labor Inspection',
  },
  cnas: {
    ar: 'الصندوق الوطني للتأمينات الاجتماعية',
    fr: 'Caisse Nationale des Assurances Sociales',
    en: 'National Social Insurance Fund',
  },
  cnr: {
    ar: 'الصندوق الوطني للتقاعد',
    fr: 'Caisse Nationale des Retraites',
    en: 'National Retirement Fund',
  },
  cnac: {
    ar: 'الصندوق الوطني للتأمين عن البطالة',
    fr: 'Caisse Nationale d\'Assurance Chômage',
    en: 'National Unemployment Insurance Fund',
  },
  casnos: {
    ar: 'الصندوق الوطني للضمان الاجتماعي لغير الأجراء',
    fr: 'Caisse Nationale de Sécurité Sociale des Non-Salariés',
    en: 'National Social Security Fund for Non-Employees',
  },
  cacobatph: {
    ar: 'صندوق العطل المدفوعة الأجر للبناء',
    fr: 'Caisse des Congés Payés du Bâtiment',
    en: 'Construction Paid Leave Fund',
  },
  nesda: {
    ar: 'الوكالة الوطنية لدعم وتنمية المقاولاتية',
    fr: 'Agence Nationale de Soutien à l\'Emploi des Jeunes',
    en: 'National Agency for Entrepreneurship Support',
  },
  angem: {
    ar: 'الوكالة الوطنية للقرض المصغر',
    fr: 'Agence Nationale de Gestion du Micro-crédit',
    en: 'National Microcredit Agency',
  },
  onaaph: {
    ar: 'الديوان الوطني للأعضاء الاصطناعية',
    fr: 'Office National des Appareillages',
    en: 'National Office for Prosthetics',
  },
};

// Check if user has permission
export const hasPermission = (user: User | null, permission: Permission): boolean => {
  if (!user) return false;
  return user.permissions.includes(permission);
};

// Check if user can access institution data
export const canAccessInstitution = (user: User | null, institution: Institution): boolean => {
  if (!user) return false;
  if (user.role === 'super_admin') return true;
  if (user.role === 'viewer') return true; // Read-only access to all
  return user.institution === institution;
};

// Check if data year is editable
export const isYearEditable = (year: number, currentYear: number): boolean => {
  return year === currentYear;
};
