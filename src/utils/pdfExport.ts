import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { LabReport } from '../types/lab';

/**
 * Generates and downloads a real, multi-page PDF document
 * with each medical profile on its own separate A4 page.
 */
export async function downloadReportPDF(
  report: LabReport,
  pageElementsSelector = '.report-page-container'
): Promise<void> {
  const pageNodes = document.querySelectorAll(pageElementsSelector);

  if (!pageNodes || pageNodes.length === 0) {
    // Fallback: try window.print()
    try {
      window.print();
    } catch (e) {
      console.warn('window.print failed:', e);
    }
    return;
  }

  // Create A4 PDF (210mm x 297mm)
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true
  });

  const pdfWidth = 210;
  const pdfHeight = 297;

  for (let i = 0; i < pageNodes.length; i++) {
    const node = pageNodes[i] as HTMLElement;

    // Convert DOM page to high-resolution canvas
    const canvas = await html2canvas(node, {
      scale: 2, // 2x for sharp print quality
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 1200
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.95);

    if (i > 0) {
      pdf.addPage('a4', 'portrait');
    }

    // Add canvas image to fill A4 page with 6mm margins
    const margin = 6;
    const contentWidth = pdfWidth - margin * 2;
    const contentHeight = (canvas.height * contentWidth) / canvas.width;

    pdf.addImage(imgData, 'JPEG', margin, margin, contentWidth, Math.min(contentHeight, pdfHeight - margin * 2));
  }

  const safeName = report.patient.fullName.trim().replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_\u0600-\u06FF]/g, '') || 'Patient';
  const fileName = `RT_LAB_${safeName}_${report.patient.labNumber}.pdf`;

  pdf.save(fileName);
}

/**
 * Robust print helper that handles iframe restrictions
 */
export function triggerPrintDialog(): void {
  try {
    window.print();
  } catch (err) {
    console.error('Error triggering window.print():', err);
    alert('تنبيه: لتجنب قيود متصفح الويب داخل نافذة المعاينة، يمكنك الضغط على زر "تحميل ملف PDF" لتحميل التقرير كملف PDF مباشر بجودة عالية وطباعته.');
  }
}
