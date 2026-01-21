// Data Entry Modal - CRUD Form Component
// Professional modal for adding/editing data

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, Save, X } from 'lucide-react';

export interface FieldConfig {
  key: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'date';
  required?: boolean;
  options?: { value: string; label: string }[];
  min?: number;
  max?: number;
  placeholder?: string;
}

interface DataEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Record<string, any>) => Promise<boolean>;
  title: string;
  description?: string;
  fields: FieldConfig[];
  initialData?: Record<string, any>;
  isLoading?: boolean;
  mode: 'create' | 'edit';
}

export const DataEntryModal: React.FC<DataEntryModalProps> = ({
  isOpen,
  onClose,
  onSave,
  title,
  description,
  fields,
  initialData = {},
  isLoading = false,
  mode,
}) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [formData, setFormData] = useState<Record<string, any>>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setFormData(initialData);
    setErrors({});
  }, [initialData, isOpen]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    fields.forEach((field) => {
      const value = formData[field.key];

      if (field.required && (value === undefined || value === '' || value === null)) {
        newErrors[field.key] = t('validation.required', { field: field.label });
      }

      if (field.type === 'number') {
        const numValue = Number(value);
        if (isNaN(numValue)) {
          newErrors[field.key] = t('validation.invalidNumber');
        } else {
          if (field.min !== undefined && numValue < field.min) {
            newErrors[field.key] = t('validation.minValue', { min: field.min });
          }
          if (field.max !== undefined && numValue > field.max) {
            newErrors[field.key] = t('validation.maxValue', { max: field.max });
          }
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const success = await onSave(formData);
    if (success) {
      onClose();
    }
  };

  const handleFieldChange = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[key];
        return newErrors;
      });
    }
  };

  const renderField = (field: FieldConfig) => {
    const value = formData[field.key] ?? '';
    const error = errors[field.key];

    switch (field.type) {
      case 'select':
        return (
          <Select
            value={String(value)}
            onValueChange={(val) => handleFieldChange(field.key, val)}
          >
            <SelectTrigger className={error ? 'border-destructive' : ''}>
              <SelectValue placeholder={field.placeholder || t('common.select')} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'date':
        return (
          <Input
            type="date"
            value={value}
            onChange={(e) => handleFieldChange(field.key, e.target.value)}
            className={error ? 'border-destructive' : ''}
          />
        );

      case 'number':
        return (
          <Input
            type="number"
            value={value}
            onChange={(e) => handleFieldChange(field.key, e.target.value)}
            min={field.min}
            max={field.max}
            placeholder={field.placeholder}
            className={error ? 'border-destructive' : ''}
            dir="ltr"
          />
        );

      default:
        return (
          <Input
            type="text"
            value={value}
            onChange={(e) => handleFieldChange(field.key, e.target.value)}
            placeholder={field.placeholder}
            className={error ? 'border-destructive' : ''}
          />
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]" dir={isRTL ? 'rtl' : 'ltr'}>
        <DialogHeader>
          <DialogTitle className="font-kufi">
            {mode === 'create' ? t('crud.addNew') : t('crud.edit')} - {title}
          </DialogTitle>
          {description && (
            <DialogDescription>{description}</DialogDescription>
          )}
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          {fields.map((field) => (
            <div key={field.key} className="space-y-2">
              <Label htmlFor={field.key} className="font-medium">
                {field.label}
                {field.required && <span className="text-destructive mr-1">*</span>}
              </Label>
              {renderField(field)}
              {errors[field.key] && (
                <p className="text-sm text-destructive">{errors[field.key]}</p>
              )}
            </div>
          ))}
        </form>

        <DialogFooter className={isRTL ? 'flex-row-reverse' : ''}>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
          >
            <X className="w-4 h-4 ml-2" />
            {t('common.cancel')}
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-primary hover:bg-primary/90"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 ml-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 ml-2" />
            )}
            {t('common.save')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
