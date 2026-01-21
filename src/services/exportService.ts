// Export Service - Government Statistics Platform
// Handles Excel, Word, PDF, and PowerPoint exports

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, HeadingLevel, AlignmentType, WidthType, BorderStyle } from 'docx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import pptxgen from 'pptxgenjs';

// Types
export interface ExportMetadata {
  title: string;
  subtitle?: string;
  institution?: string;
  year: number;
  wilaya: string;
  generatedAt: Date;
  language: 'ar' | 'fr' | 'en';
}

export interface TableData {
  headers: string[];
  rows: (string | number)[][];
  title?: string;
}

export interface ChartData {
  title: string;
  type: 'bar' | 'pie' | 'line' | 'area';
  data: { label: string; value: number }[];
}

// ============= EXCEL EXPORT =============
export const exportToExcel = (
  data: TableData[],
  metadata: ExportMetadata,
  filename: string
): void => {
  const workbook = XLSX.utils.book_new();
  
  // Add metadata sheet
  const metaSheet = XLSX.utils.aoa_to_sheet([
    ['المعلومات العامة / Informations Générales / General Information'],
    [],
    ['العنوان / Titre / Title', metadata.title],
    ['المؤسسة / Institution', metadata.institution || ''],
    ['الولاية / Wilaya', metadata.wilaya],
    ['السنة / Année / Year', metadata.year],
    ['تاريخ التصدير / Date d\'export / Export Date', metadata.generatedAt.toLocaleDateString()],
  ]);
  XLSX.utils.book_append_sheet(workbook, metaSheet, 'Info');
  
  // Add data sheets
  data.forEach((table, index) => {
    const sheetData = [
      table.headers,
      ...table.rows
    ];
    const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
    
    // Auto-width columns
    const colWidths = table.headers.map((header, i) => ({
      wch: Math.max(
        header.length,
        ...table.rows.map(row => String(row[i] || '').length)
      ) + 2
    }));
    worksheet['!cols'] = colWidths;
    
    const sheetName = table.title?.substring(0, 31) || `Sheet${index + 1}`;
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  });
  
  // Generate and download
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(blob, `${filename}.xlsx`);
};

// ============= WORD EXPORT =============
export const exportToWord = async (
  data: TableData[],
  metadata: ExportMetadata,
  filename: string
): Promise<void> => {
  const isRTL = metadata.language === 'ar';
  
  const children: (Paragraph | Table)[] = [];
  
  // Title
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: metadata.title,
          bold: true,
          size: 48,
          font: isRTL ? 'Traditional Arabic' : 'Arial',
        }),
      ],
      heading: HeadingLevel.TITLE,
      alignment: isRTL ? AlignmentType.RIGHT : AlignmentType.LEFT,
      spacing: { after: 400 },
    })
  );
  
  // Subtitle
  if (metadata.subtitle) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: metadata.subtitle,
            size: 28,
            color: '666666',
            font: isRTL ? 'Traditional Arabic' : 'Arial',
          }),
        ],
        alignment: isRTL ? AlignmentType.RIGHT : AlignmentType.LEFT,
        spacing: { after: 400 },
      })
    );
  }
  
  // Metadata
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: `${metadata.wilaya} - ${metadata.year}`,
          size: 24,
          font: isRTL ? 'Traditional Arabic' : 'Arial',
        }),
      ],
      alignment: isRTL ? AlignmentType.RIGHT : AlignmentType.LEFT,
      spacing: { after: 600 },
    })
  );
  
  // Tables
  data.forEach((tableData) => {
    if (tableData.title) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: tableData.title,
              bold: true,
              size: 32,
              font: isRTL ? 'Traditional Arabic' : 'Arial',
            }),
          ],
          heading: HeadingLevel.HEADING_2,
          alignment: isRTL ? AlignmentType.RIGHT : AlignmentType.LEFT,
          spacing: { before: 400, after: 200 },
        })
      );
    }
    
    const tableRows: TableRow[] = [];
    
    // Header row
    tableRows.push(
      new TableRow({
        children: tableData.headers.map((header) =>
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: header,
                    bold: true,
                    size: 22,
                    font: isRTL ? 'Traditional Arabic' : 'Arial',
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
            shading: { fill: '1e3a5f' },
            margins: { top: 100, bottom: 100, left: 100, right: 100 },
          })
        ),
        tableHeader: true,
      })
    );
    
    // Data rows
    tableData.rows.forEach((row) => {
      tableRows.push(
        new TableRow({
          children: row.map((cell) =>
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: String(cell),
                      size: 20,
                      font: isRTL ? 'Traditional Arabic' : 'Arial',
                    }),
                  ],
                  alignment: AlignmentType.CENTER,
                }),
              ],
              margins: { top: 50, bottom: 50, left: 100, right: 100 },
            })
          ),
        })
      );
    });
    
    children.push(
      new Table({
        rows: tableRows,
        width: { size: 100, type: WidthType.PERCENTAGE },
        borders: {
          top: { style: BorderStyle.SINGLE, size: 1, color: '999999' },
          bottom: { style: BorderStyle.SINGLE, size: 1, color: '999999' },
          left: { style: BorderStyle.SINGLE, size: 1, color: '999999' },
          right: { style: BorderStyle.SINGLE, size: 1, color: '999999' },
          insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' },
          insideVertical: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' },
        },
      })
    );
    
    // Spacing after table
    children.push(new Paragraph({ spacing: { after: 400 } }));
  });
  
  // Footer
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: `Generated on ${metadata.generatedAt.toLocaleDateString()} - ${metadata.wilaya}`,
          size: 18,
          color: '999999',
          font: isRTL ? 'Traditional Arabic' : 'Arial',
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: 600 },
    })
  );
  
  const doc = new Document({
    sections: [{
      properties: {
        page: {
          margin: {
            top: 1440,
            right: 1440,
            bottom: 1440,
            left: 1440,
          },
        },
      },
      children,
    }],
  });
  
  const buffer = await Packer.toBlob(doc);
  saveAs(buffer, `${filename}.docx`);
};

// ============= PDF EXPORT =============
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

export const exportToPDF = (
  data: TableData[],
  metadata: ExportMetadata,
  filename: string
): void => {
  const isRTL = metadata.language === 'ar';
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });
  
  // Government header styling
  const primaryColor: [number, number, number] = [30, 58, 95];
  const accentColor: [number, number, number] = [212, 175, 55];
  
  let yPos = 20;
  
  // Header bar
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 210, 35, 'F');
  
  // Title - for RTL we'll use English/French fallback for PDF due to font limitations
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(metadata.title, 105, 15, { align: 'center' });
  
  if (metadata.subtitle) {
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text(metadata.subtitle, 105, 25, { align: 'center' });
  }
  
  yPos = 45;
  
  // Metadata section
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(10);
  doc.text(`${metadata.wilaya} | ${metadata.year}`, 105, yPos, { align: 'center' });
  yPos += 15;
  
  // Tables
  data.forEach((tableData, tableIndex) => {
    // Check if we need a new page
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }
    
    // Table title
    if (tableData.title) {
      doc.setTextColor(...primaryColor);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text(tableData.title, isRTL ? 195 : 15, yPos, { align: isRTL ? 'right' : 'left' });
      yPos += 10;
    }
    
    // Table
    doc.autoTable({
      startY: yPos,
      head: [tableData.headers],
      body: tableData.rows,
      theme: 'grid',
      headStyles: {
        fillColor: primaryColor,
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        halign: 'center',
      },
      bodyStyles: {
        halign: 'center',
      },
      alternateRowStyles: {
        fillColor: [245, 247, 250],
      },
      styles: {
        fontSize: 9,
        cellPadding: 3,
      },
      margin: { left: 15, right: 15 },
    });
    
    yPos = (doc as any).lastAutoTable.finalY + 15;
  });
  
  // Footer on each page
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      `Page ${i} / ${pageCount}`,
      105,
      290,
      { align: 'center' }
    );
    doc.text(
      `Generated: ${metadata.generatedAt.toLocaleDateString()}`,
      15,
      290
    );
  }
  
  doc.save(`${filename}.pdf`);
};

// ============= POWERPOINT EXPORT =============
export const exportToPowerPoint = (
  data: TableData[],
  charts: ChartData[],
  metadata: ExportMetadata,
  filename: string
): void => {
  const pptx = new pptxgen();
  
  // Set presentation properties
  pptx.author = 'Government Statistics Platform';
  pptx.title = metadata.title;
  pptx.subject = metadata.subtitle || '';
  pptx.layout = 'LAYOUT_16x9';
  
  // Theme colors
  const primaryColor = '1e3a5f';
  const accentColor = 'd4af37';
  const textColor = '333333';
  
  // Title Slide
  const titleSlide = pptx.addSlide();
  titleSlide.addShape('rect', {
    x: 0,
    y: 0,
    w: '100%',
    h: '100%',
    fill: { color: primaryColor },
  });
  
  titleSlide.addText(metadata.title, {
    x: 0.5,
    y: 2,
    w: '90%',
    h: 1.5,
    fontSize: 44,
    fontFace: 'Arial',
    color: 'FFFFFF',
    bold: true,
    align: 'center',
  });
  
  if (metadata.subtitle) {
    titleSlide.addText(metadata.subtitle, {
      x: 0.5,
      y: 3.5,
      w: '90%',
      h: 0.8,
      fontSize: 24,
      fontFace: 'Arial',
      color: accentColor,
      align: 'center',
    });
  }
  
  titleSlide.addText(`${metadata.wilaya} - ${metadata.year}`, {
    x: 0.5,
    y: 4.8,
    w: '90%',
    h: 0.5,
    fontSize: 18,
    fontFace: 'Arial',
    color: 'CCCCCC',
    align: 'center',
  });
  
  // Data slides
  data.forEach((tableData) => {
    const slide = pptx.addSlide();
    
    // Header bar
    slide.addShape('rect', {
      x: 0,
      y: 0,
      w: '100%',
      h: 0.8,
      fill: { color: primaryColor },
    });
    
    // Slide title
    slide.addText(tableData.title || 'Data', {
      x: 0.3,
      y: 0.15,
      w: '95%',
      h: 0.5,
      fontSize: 24,
      fontFace: 'Arial',
      color: 'FFFFFF',
      bold: true,
    });
    
    // Table
    const tableRows: pptxgen.TableRow[] = [];
    
    // Header row
    tableRows.push(
      tableData.headers.map((header) => ({
        text: header,
        options: {
          fill: { color: primaryColor },
          color: 'FFFFFF',
          bold: true,
          align: 'center' as const,
          fontFace: 'Arial',
          fontSize: 11,
        },
      }))
    );
    
    // Data rows
    tableData.rows.forEach((row, rowIndex) => {
      tableRows.push(
        row.map((cell) => ({
          text: String(cell),
          options: {
            fill: { color: rowIndex % 2 === 0 ? 'F5F7FA' : 'FFFFFF' },
            color: textColor,
            align: 'center' as const,
            fontFace: 'Arial',
            fontSize: 10,
          },
        }))
      );
    });
    
    slide.addTable(tableRows, {
      x: 0.5,
      y: 1.2,
      w: 9,
      colW: tableData.headers.map(() => 9 / tableData.headers.length),
      border: { color: 'CCCCCC', pt: 0.5 },
    });
    
    // Footer
    slide.addText(metadata.wilaya, {
      x: 0.3,
      y: 5.2,
      w: 2,
      h: 0.3,
      fontSize: 10,
      fontFace: 'Arial',
      color: '999999',
    });
  });
  
  // Charts slides
  charts.forEach((chartData) => {
    const slide = pptx.addSlide();
    
    // Header bar
    slide.addShape('rect', {
      x: 0,
      y: 0,
      w: '100%',
      h: 0.8,
      fill: { color: primaryColor },
    });
    
    slide.addText(chartData.title, {
      x: 0.3,
      y: 0.15,
      w: '95%',
      h: 0.5,
      fontSize: 24,
      fontFace: 'Arial',
      color: 'FFFFFF',
      bold: true,
    });
    
    // Chart
    const chartColors = ['1e3a5f', '2d5a3d', 'd4af37', '3b82f6', '8b5cf6'];
    
    if (chartData.type === 'bar') {
      slide.addChart(pptx.ChartType.bar, [
        {
          name: chartData.title,
          labels: chartData.data.map((d) => d.label),
          values: chartData.data.map((d) => d.value),
        },
      ], {
        x: 0.5,
        y: 1.2,
        w: 9,
        h: 4,
        chartColors,
        showLegend: false,
        showValue: true,
        dataLabelPosition: 'outEnd',
      });
    } else if (chartData.type === 'pie') {
      slide.addChart(pptx.ChartType.pie, [
        {
          name: chartData.title,
          labels: chartData.data.map((d) => d.label),
          values: chartData.data.map((d) => d.value),
        },
      ], {
        x: 1,
        y: 1.2,
        w: 8,
        h: 4,
        chartColors,
        showLegend: true,
        legendPos: 'r',
        showPercent: true,
      });
    }
  });
  
  // Thank you slide
  const endSlide = pptx.addSlide();
  endSlide.addShape('rect', {
    x: 0,
    y: 0,
    w: '100%',
    h: '100%',
    fill: { color: primaryColor },
  });
  
  endSlide.addText('Thank You', {
    x: 0.5,
    y: 2.5,
    w: '90%',
    h: 1,
    fontSize: 48,
    fontFace: 'Arial',
    color: 'FFFFFF',
    bold: true,
    align: 'center',
  });
  
  endSlide.addText(`${metadata.wilaya} - ${metadata.year}`, {
    x: 0.5,
    y: 4,
    w: '90%',
    h: 0.5,
    fontSize: 18,
    fontFace: 'Arial',
    color: accentColor,
    align: 'center',
  });
  
  pptx.writeFile({ fileName: `${filename}.pptx` });
};

// ============= UTILITY FUNCTIONS =============
export const formatDataForExport = (
  data: Record<string, any>[],
  columnMap: { key: string; header: string }[]
): TableData => {
  return {
    headers: columnMap.map((col) => col.header),
    rows: data.map((row) => columnMap.map((col) => row[col.key] ?? '')),
  };
};

export const prepareAnnualReportData = (
  allData: {
    employment: any;
    laborInspection: any;
    funds: any;
    agencies: any;
  },
  metadata: ExportMetadata
): { tables: TableData[]; charts: ChartData[] } => {
  const tables: TableData[] = [];
  const charts: ChartData[] = [];
  
  // This would be expanded with actual data transformation
  // Example structure for comprehensive annual report
  
  return { tables, charts };
};
