// Export Toolbar Component
// Provides export options for Excel, Word, PDF, PowerPoint

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Download,
  FileSpreadsheet,
  FileText,
  FileType,
  Presentation,
  Loader2,
} from 'lucide-react';
import {
  exportToExcel,
  exportToWord,
  exportToPDF,
  exportToPowerPoint,
  TableData,
  ChartData,
  ExportMetadata,
} from '@/services/exportService';
import { useToast } from '@/hooks/use-toast';

interface ExportToolbarProps {
  data: TableData[];
  charts?: ChartData[];
  metadata: ExportMetadata;
  filename: string;
  disabled?: boolean;
}

type ExportFormat = 'excel' | 'word' | 'pdf' | 'pptx';

export const ExportToolbar: React.FC<ExportToolbarProps> = ({
  data,
  charts = [],
  metadata,
  filename,
  disabled = false,
}) => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const [exporting, setExporting] = useState<ExportFormat | null>(null);

  const handleExport = async (format: ExportFormat) => {
    setExporting(format);

    try {
      const exportMetadata: ExportMetadata = {
        ...metadata,
        language: i18n.language as 'ar' | 'fr' | 'en',
        generatedAt: new Date(),
      };

      switch (format) {
        case 'excel':
          exportToExcel(data, exportMetadata, filename);
          break;
        case 'word':
          await exportToWord(data, exportMetadata, filename);
          break;
        case 'pdf':
          exportToPDF(data, exportMetadata, filename);
          break;
        case 'pptx':
          exportToPowerPoint(data, charts, exportMetadata, filename);
          break;
      }

      toast({
        title: t('export.success'),
        description: t('export.fileGenerated', { format: format.toUpperCase() }),
      });
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: t('export.error'),
        description: t('export.errorMessage'),
        variant: 'destructive',
      });
    } finally {
      setExporting(null);
    }
  };

  const exportOptions = [
    {
      format: 'excel' as ExportFormat,
      label: t('export.excel'),
      icon: FileSpreadsheet,
      description: t('export.excelDesc'),
    },
    {
      format: 'pdf' as ExportFormat,
      label: t('export.pdf'),
      icon: FileType,
      description: t('export.pdfDesc'),
    },
    {
      format: 'word' as ExportFormat,
      label: t('export.word'),
      icon: FileText,
      description: t('export.wordDesc'),
    },
    {
      format: 'pptx' as ExportFormat,
      label: t('export.powerpoint'),
      icon: Presentation,
      description: t('export.powerpointDesc'),
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled || exporting !== null}
          className="gap-2"
        >
          {exporting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Download className="w-4 h-4" />
          )}
          {t('common.export')}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>{t('export.selectFormat')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {exportOptions.map((option) => (
          <DropdownMenuItem
            key={option.format}
            onClick={() => handleExport(option.format)}
            disabled={exporting !== null}
            className="flex items-start gap-3 py-2"
          >
            <option.icon className="w-5 h-5 mt-0.5 text-primary" />
            <div className="flex flex-col">
              <span className="font-medium">{option.label}</span>
              <span className="text-xs text-muted-foreground">
                {option.description}
              </span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
