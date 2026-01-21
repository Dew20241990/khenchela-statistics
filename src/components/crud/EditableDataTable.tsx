// Editable Data Table Component
// Professional data table with inline editing capabilities

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Plus,
  Pencil,
  Trash2,
  Lock,
  Upload,
  Search,
  Filter,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';
import { DataEntryModal, FieldConfig } from './DataEntryModal';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';
import { ExportToolbar } from './ExportToolbar';
import { TableData, ExportMetadata } from '@/services/exportService';
import { cn } from '@/lib/utils';

interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T, index: number) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}

interface EditableDataTableProps<T extends { id: string; isLocked?: boolean }> {
  data: T[];
  columns: Column<T>[];
  fields: FieldConfig[];
  title: string;
  description?: string;
  onAdd?: (item: Omit<T, 'id'>) => Promise<boolean>;
  onEdit?: (id: string, item: Partial<T>) => Promise<boolean>;
  onDelete?: (id: string) => Promise<boolean>;
  onBulkImport?: (items: Omit<T, 'id'>[]) => Promise<number>;
  canCreate?: boolean;
  canUpdate?: boolean;
  canDelete?: boolean;
  canExport?: boolean;
  canImport?: boolean;
  isLoading?: boolean;
  exportMetadata?: ExportMetadata;
}

export function EditableDataTable<T extends { id: string; isLocked?: boolean }>({
  data,
  columns,
  fields,
  title,
  description,
  onAdd,
  onEdit,
  onDelete,
  onBulkImport,
  canCreate = true,
  canUpdate = true,
  canDelete = true,
  canExport = true,
  canImport = true,
  isLoading = false,
  exportMetadata,
}: EditableDataTableProps<T>) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<T | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Filter and sort data
  const processedData = React.useMemo(() => {
    let result = [...data];

    // Search
    if (searchTerm) {
      result = result.filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Sort
    if (sortConfig) {
      result.sort((a, b) => {
        const aVal = a[sortConfig.key as keyof T];
        const bVal = b[sortConfig.key as keyof T];
        
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [data, searchTerm, sortConfig]);

  const handleSort = (key: string) => {
    setSortConfig((prev) => {
      if (prev?.key === key) {
        return prev.direction === 'asc'
          ? { key, direction: 'desc' }
          : null;
      }
      return { key, direction: 'asc' };
    });
  };

  const handleAdd = async (formData: Record<string, any>) => {
    if (onAdd) {
      return await onAdd(formData as Omit<T, 'id'>);
    }
    return false;
  };

  const handleEdit = async (formData: Record<string, any>) => {
    if (onEdit && editingItem) {
      return await onEdit(editingItem.id, formData as Partial<T>);
    }
    return false;
  };

  const handleDelete = async () => {
    if (onDelete && deletingId) {
      await onDelete(deletingId);
    }
  };

  // Prepare export data
  const exportData: TableData[] = [
    {
      title,
      headers: columns.map((col) => col.header),
      rows: processedData.map((item) =>
        columns.map((col) => {
          const value = item[col.key as keyof T];
          return value !== undefined && value !== null ? String(value) : '';
        })
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={t('common.search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-9 w-64"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Import */}
          {canImport && onBulkImport && (
            <Button variant="outline" className="gap-2">
              <Upload className="w-4 h-4" />
              {t('crud.import')}
            </Button>
          )}

          {/* Export */}
          {canExport && exportMetadata && (
            <ExportToolbar
              data={exportData}
              metadata={exportMetadata}
              filename={title.replace(/\s+/g, '_')}
            />
          )}

          {/* Add */}
          {canCreate && onAdd && (
            <Button
              onClick={() => setIsAddModalOpen(true)}
              className="gap-2 bg-primary hover:bg-primary/90"
            >
              <Plus className="w-4 h-4" />
              {t('crud.addNew')}
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              {columns.map((column) => (
                <TableHead
                  key={String(column.key)}
                  className={cn(
                    'font-kufi font-semibold',
                    column.sortable && 'cursor-pointer hover:bg-muted/70',
                    column.width && `w-[${column.width}]`
                  )}
                  onClick={() => column.sortable && handleSort(String(column.key))}
                >
                  <div className="flex items-center gap-2">
                    {column.header}
                    {column.sortable && sortConfig?.key === column.key && (
                      sortConfig.direction === 'asc' ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )
                    )}
                  </div>
                </TableHead>
              ))}
              {(canUpdate || canDelete) && (
                <TableHead className="w-24 text-center">
                  {t('crud.actions')}
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {processedData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className="text-center py-8 text-muted-foreground"
                >
                  {t('common.noData')}
                </TableCell>
              </TableRow>
            ) : (
              processedData.map((item, index) => (
                <TableRow
                  key={item.id}
                  className={cn(
                    'hover:bg-muted/30 transition-colors',
                    item.isLocked && 'bg-muted/20'
                  )}
                >
                  {columns.map((column) => (
                    <TableCell key={String(column.key)}>
                      {column.render
                        ? column.render(item, index)
                        : String(item[column.key as keyof T] ?? '')}
                    </TableCell>
                  ))}
                  {(canUpdate || canDelete) && (
                    <TableCell>
                      <div className="flex items-center justify-center gap-1">
                        {item.isLocked ? (
                          <Tooltip>
                            <TooltipTrigger>
                              <Badge variant="secondary" className="gap-1">
                                <Lock className="w-3 h-3" />
                                {t('crud.locked')}
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              {t('crud.lockedTooltip')}
                            </TooltipContent>
                          </Tooltip>
                        ) : (
                          <>
                            {canUpdate && onEdit && (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setEditingItem(item)}
                                    className="h-8 w-8"
                                  >
                                    <Pencil className="w-4 h-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>{t('crud.edit')}</TooltipContent>
                              </Tooltip>
                            )}
                            {canDelete && onDelete && (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setDeletingId(item.id)}
                                    className="h-8 w-8 text-destructive hover:text-destructive"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>{t('crud.delete')}</TooltipContent>
                              </Tooltip>
                            )}
                          </>
                        )}
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Result count */}
      <div className="text-sm text-muted-foreground">
        {t('crud.showingResults', { count: processedData.length, total: data.length })}
      </div>

      {/* Add Modal */}
      <DataEntryModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAdd}
        title={title}
        description={description}
        fields={fields}
        mode="create"
        isLoading={isLoading}
      />

      {/* Edit Modal */}
      <DataEntryModal
        isOpen={editingItem !== null}
        onClose={() => setEditingItem(null)}
        onSave={handleEdit}
        title={title}
        description={description}
        fields={fields}
        initialData={editingItem ?? {}}
        mode="edit"
        isLoading={isLoading}
      />

      {/* Delete Confirmation */}
      <DeleteConfirmDialog
        isOpen={deletingId !== null}
        onClose={() => setDeletingId(null)}
        onConfirm={handleDelete}
        isLoading={isLoading}
      />
    </div>
  );
}
