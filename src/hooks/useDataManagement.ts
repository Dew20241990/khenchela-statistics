// Data Management Hook - CRUD Operations with Audit Trail
// Handles Create, Read, Update, Delete with history tracking

import { useState, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Institution } from '@/types/auth';

export interface AuditEntry {
  id: string;
  entityType: string;
  entityId: string;
  action: 'create' | 'update' | 'delete';
  userId: string;
  userName: string;
  timestamp: Date;
  previousValue?: any;
  newValue?: any;
}

export interface DataRecord {
  id: string;
  year: number;
  institution: Institution;
  data: Record<string, any>;
  isLocked: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}

interface UseDataManagementOptions<T> {
  entityType: string;
  institution: Institution;
  initialData?: T[];
  onSave?: (data: T[]) => void;
}

interface UseDataManagementReturn<T> {
  data: T[];
  isLoading: boolean;
  error: string | null;
  auditTrail: AuditEntry[];
  create: (item: Omit<T, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'updatedBy'>) => Promise<T | null>;
  update: (id: string, updates: Partial<T>) => Promise<boolean>;
  remove: (id: string) => Promise<boolean>;
  bulkImport: (items: Omit<T, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'updatedBy'>[]) => Promise<number>;
  canCreate: boolean;
  canUpdate: boolean;
  canDelete: boolean;
  canExport: boolean;
  canImport: boolean;
}

export function useDataManagement<T extends DataRecord>(
  options: UseDataManagementOptions<T>
): UseDataManagementReturn<T> {
  const { entityType, institution, initialData = [], onSave } = options;
  const { user, hasPermission, canAccessInstitution, isYearEditable } = useAuth();
  
  const [data, setData] = useState<T[]>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [auditTrail, setAuditTrail] = useState<AuditEntry[]>([]);

  const addAuditEntry = useCallback((
    action: 'create' | 'update' | 'delete',
    entityId: string,
    previousValue?: any,
    newValue?: any
  ) => {
    if (!user) return;
    
    const entry: AuditEntry = {
      id: crypto.randomUUID(),
      entityType,
      entityId,
      action,
      userId: user.id,
      userName: user.name,
      timestamp: new Date(),
      previousValue,
      newValue,
    };
    
    setAuditTrail((prev) => [entry, ...prev]);
    
    // In production, this would be sent to the server
    console.log('Audit Entry:', entry);
  }, [user, entityType]);

  const create = useCallback(async (
    item: Omit<T, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'updatedBy'>
  ): Promise<T | null> => {
    if (!user || !hasPermission('create') || !canAccessInstitution(institution)) {
      setError('لا تملك صلاحية إضافة البيانات');
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300));

      const newItem = {
        ...item,
        id: crypto.randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: user.id,
        updatedBy: user.id,
      } as T;

      setData((prev) => {
        const updated = [...prev, newItem];
        onSave?.(updated);
        return updated;
      });

      addAuditEntry('create', newItem.id, undefined, newItem);
      
      return newItem;
    } catch (err) {
      setError('حدث خطأ أثناء إضافة البيانات');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [user, hasPermission, canAccessInstitution, institution, addAuditEntry, onSave]);

  const update = useCallback(async (id: string, updates: Partial<T>): Promise<boolean> => {
    if (!user || !hasPermission('update') || !canAccessInstitution(institution)) {
      setError('لا تملك صلاحية تعديل البيانات');
      return false;
    }

    const existingItem = data.find((item) => item.id === id);
    if (!existingItem) {
      setError('العنصر غير موجود');
      return false;
    }

    if (existingItem.isLocked && user.role !== 'super_admin') {
      setError('البيانات مقفلة ولا يمكن تعديلها');
      return false;
    }

    if (!isYearEditable(existingItem.year)) {
      setError('لا يمكن تعديل بيانات السنوات السابقة');
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 300));

      setData((prev) => {
        const updated = prev.map((item) =>
          item.id === id
            ? { ...item, ...updates, updatedAt: new Date(), updatedBy: user.id }
            : item
        );
        onSave?.(updated);
        return updated;
      });

      addAuditEntry('update', id, existingItem, { ...existingItem, ...updates });
      
      return true;
    } catch (err) {
      setError('حدث خطأ أثناء تعديل البيانات');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [user, hasPermission, canAccessInstitution, institution, data, isYearEditable, addAuditEntry, onSave]);

  const remove = useCallback(async (id: string): Promise<boolean> => {
    if (!user || !hasPermission('delete') || !canAccessInstitution(institution)) {
      setError('لا تملك صلاحية حذف البيانات');
      return false;
    }

    const existingItem = data.find((item) => item.id === id);
    if (!existingItem) {
      setError('العنصر غير موجود');
      return false;
    }

    if (existingItem.isLocked) {
      setError('البيانات مقفلة ولا يمكن حذفها');
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 300));

      setData((prev) => {
        const updated = prev.filter((item) => item.id !== id);
        onSave?.(updated);
        return updated;
      });

      addAuditEntry('delete', id, existingItem, undefined);
      
      return true;
    } catch (err) {
      setError('حدث خطأ أثناء حذف البيانات');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [user, hasPermission, canAccessInstitution, institution, data, addAuditEntry, onSave]);

  const bulkImport = useCallback(async (
    items: Omit<T, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'updatedBy'>[]
  ): Promise<number> => {
    if (!user || !hasPermission('import') || !canAccessInstitution(institution)) {
      setError('لا تملك صلاحية استيراد البيانات');
      return 0;
    }

    setIsLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const newItems = items.map((item) => ({
        ...item,
        id: crypto.randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: user.id,
        updatedBy: user.id,
      })) as T[];

      setData((prev) => {
        const updated = [...prev, ...newItems];
        onSave?.(updated);
        return updated;
      });

      newItems.forEach((item) => {
        addAuditEntry('create', item.id, undefined, item);
      });
      
      return newItems.length;
    } catch (err) {
      setError('حدث خطأ أثناء استيراد البيانات');
      return 0;
    } finally {
      setIsLoading(false);
    }
  }, [user, hasPermission, canAccessInstitution, institution, addAuditEntry, onSave]);

  return {
    data,
    isLoading,
    error,
    auditTrail,
    create,
    update,
    remove,
    bulkImport,
    canCreate: hasPermission('create') && canAccessInstitution(institution),
    canUpdate: hasPermission('update') && canAccessInstitution(institution),
    canDelete: hasPermission('delete') && canAccessInstitution(institution),
    canExport: hasPermission('export'),
    canImport: hasPermission('import') && canAccessInstitution(institution),
  };
}
