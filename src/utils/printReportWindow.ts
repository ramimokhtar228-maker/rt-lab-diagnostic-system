import { LabReport } from '../types/lab';
import { formatReferenceDisplay, getChartPointerPosition } from './calculator';

export function openPrintReportWindow(report: LabReport): void {
  const p = report.patient;
  const totalPages = report.profiles.length;

  const doctorDisplay = p.referringDoctorTitle === 'Herself' || p.referringDoctorTitle === 'Himself'
    ? 'طلب فحص ذاتي (Self-Request)'
    : `${p.referringDoctorTitle} ${p.referringDoctorName}`.trim() || 'General Medical Request';

  const sampleDateFormatted = new Date(p.sampleDate).toLocaleDateString('en-GB');
  const reportingDateFormatted = new Date(p.reportingDate).toLocaleDateString('en-GB');

  let profilesHtml = '';

  report.profiles.forEach((profile, index) => {
    const pageNum = index + 1;

    let rowsHtml = '';
    profile.parameters.forEach((param, rIdx) => {
      const isHigh = param.flag === 'HIGH' || param.flag === 'PANIC_HIGH';
      const isLow = param.flag === 'LOW' || param.flag === 'PANIC_LOW';
      const isAbnormal = isHigh || isLow || param.flag === 'ABNORMAL';

      let rowBg = rIdx % 2 === 0 ? '#ffffff' : '#f8fafc';
      if (isAbnormal) rowBg = '#fff1f2';

      let flagBadgeHtml = '<span style="color:#059669; font-weight:bold; font-size:10px;">Normal</span>';
      if (param.flag === 'HIGH') {
        flagBadgeHtml = '<span style="background:#ffe4e6; color:#9f1239; padding:2px 6px; border-radius:4px; font-weight:800; font-size:10px; border:1px solid #fecdd3;">High [ H ]</span>';
      } else if (param.flag === 'LOW') {
        flagBadgeHtml = '<span style="background:#fef3c7; color:#92400e; padding:2px 6px; border-radius:4px; font-weight:800; font-size:10px; border:1px solid #fde68a;">Low [ L ]</span>';
      } else if (param.flag === 'PANIC_HIGH' || param.flag === 'PANIC_LOW') {
        flagBadgeHtml = '<span style="background:#b91c1c; color:#ffffff; padding:2px 6px; border-radius:4px; font-weight:bold; font-size:10px;">CRITICAL [!]</span>';
      } else if (param.flag === 'ABNORMAL') {
        flagBadgeHtml = '<span style="background:#fee2e2; color:#991b1b; padding:2px 6px; border-radius:4px; font-weight:bold; font-size:10px;">Abnormal</span>';
      }

      // Coloured Range Visual Indicator
      let chartHtml = '<span style="color:#cbd5e1;">—</span>';
      if (param.minNormal !== undefined && param.maxNormal !== undefined) {
        const { positionPercent, zone } = getChartPointerPosition(param.result, param.minNormal, param.maxNormal);
        let pointerColor = '#10b981';
        let pointerBorder = '#065f46';
        if (zone === 'low') {
          pointerColor = '#f59e0b';
          pointerBorder = '#92400e';
        } else if (zone === 'high') {
          pointerColor = '#e11d48';
          pointerBorder = '#881337';
        }

        chartHtml = `
          <div style="width:110px; margin:0 auto; text-align:center;">
            <div style="position:relative; height:6px; background:#e2e8f0; border-radius:4px; display:flex; overflow:hidden; border:1px solid #cbd5e1;">
              <div style="width:25%; background:#fde68a;"></div>
              <div style="width:50%; background:#86efac;"></div>
              <div style="width:25%; background:#fca5a5;"></div>
            </div>
            <div style="position:relative; height:8px; margin-top:-7px;">
              <div style="position:absolute; left:${positionPercent}%; transform:translateX(-50%); width:8px; height:8px; border-radius:50%; background:${pointerColor}; border:1.5px solid ${pointerBorder};"></div>
            </div>
            <div style="display:flex; justify-content:space-between; font-size:7px; color:#64748b; font-family:monospace; margin-top:-2px;">
              <span>L</span>
              <span style="color:#059669; font-weight:bold;">NOR</span>
              <span>H</span>
            </div>
          </div>
        `;
      } else if (param.flag === 'NORMAL') {
        chartHtml = '<span style="color:#059669; font-size:10px; font-weight:600;">Within Target</span>';
      }

      const resultColor = isHigh ? '#9f1239' : isLow ? '#92400e' : '#0f172a';
      const resultWeight = isAbnormal ? '800' : '700';

      rowsHtml += `
        <tr style="background:${rowBg}; border-bottom:1px solid #e2e8f0;">
          <td style="padding:6px 10px; font-weight:700; color:#0f172a; text-align:left;">
            ${param.name}
            ${param.method ? `<span style="display:block; font-size:9px; color:#64748b; font-family:monospace;">Method: ${param.method}</span>` : ''}
          </td>
          <td style="padding:6px 10px; text-align:center; font-family:'JetBrains Mono', monospace; font-size:13px; font-weight:${resultWeight}; color:${resultColor};">
            ${param.result || '—'} <span style="font-size:10px; color:#64748b; font-weight:normal;">${param.unit || ''}</span>
          </td>
          <td style="padding:4px 6px; text-align:center; vertical-align:middle;">
            ${chartHtml}
          </td>
          <td style="padding:6px 8px; text-align:center; vertical-align:middle;">
            ${flagBadgeHtml}
          </td>
          <td style="padding:6px 10px; text-align:left; font-family:'JetBrains Mono', monospace; font-size:11px; color:#334155;">
            ${formatReferenceDisplay(param)}
            ${param.notes ? `<span style="display:block; font-size:9px; color:#94a3b8; font-style:italic;">${param.notes}</span>` : ''}
          </td>
        </tr>
      `;
    });

    profilesHtml += `
      <div class="report-page">
        <!-- Top Official Header -->
        <div class="report-header">
          <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #800000; padding-bottom:12px;">
            <!-- Arabic Side -->
            <div style="text-align:right; flex:1;">
              <h1 style="margin:0; font-size:18px; font-weight:900; color:#800000;">معامل RT للتحاليل التشخيصية</h1>
              <h2 style="margin:2px 0 0 0; font-size:13px; font-weight:700; color:#0f172a;">معامل رامي مختار</h2>
              <p style="margin:2px 0 0 0; font-size:11px; font-weight:600; color:#800000;">أطباء الباثولوجيا الإكلينيكية والكيميائية</p>
              <p style="margin:2px 0 0 0; font-size:11px; color:#475569;">كلية طب قصر العيني - جامعة القاهرة</p>
   <p style="margin:2px 0 0 0; font-size:9.5px; color:#64748b; font-weight:bold;">📍 المقر الرئيسي: ميدان بهتيم برج صيدلية العزبي الدور الثالث امام الأسانسير شبرا الخيمة | هاتف: 01012345678</p>
            </div>

            <!-- Central 3D Brand Logo -->
            <div style="text-align:center; padding:0 16px;">
              <div style="width:58px; height:58px; background:linear-gradient(135deg, #800000, #991b1b, #0f172a); border-radius:12px; padding:2px; display:inline-flex; align-items:center; justify-content:center; box-shadow:0 4px 6px rgba(0,0,0,0.15);">
                <div style="width:100%; height:100%; background:#020617; border-radius:10px; display:flex; flex-direction:column; align-items:center; justify-content:center; color:#ffffff;">
                  <div style="font-weight:900; font-size:20px; line-height:1; letter-spacing:-1px;">
                    <span style="color:#f43f5e;">R</span><span style="color:#ef4444; font-size:14px; margin:0 -2px;">💧</span><span style="color:#ffffff;">T</span>
                  </div>
                  <div style="font-size:7px; font-weight:800; letter-spacing:1px; color:#cbd5e1; margin-top:2px;">LABS</div>
                </div>
              </div>
              <div style="font-size:8px; font-weight:800; color:#800000; letter-spacing:1px; margin-top:3px; text-transform:uppercase;">Kasr Al Ainy</div>
              <div style="font-size:9px; font-weight:900; color:#991b1b; margin-top:2px;">التشخيص الصحيح يبدأ معنا</div>
            </div>

            <!-- English Side -->
            <div style="text-align:left; flex:1;" dir="ltr">
              <h1 style="margin:0; font-size:18px; font-weight:900; color:#800000;">RT LAB LABORATORIES</h1>
              <h2 style="margin:2px 0 0 0; font-size:13px; font-weight:700; color:#0f172a;">Rami Mokhtar Laboratories</h2>
              <p style="margin:2px 0 0 0; font-size:11px; font-weight:600; color:#800000;">Clinical & Chemical Pathologists</p>
              <p style="margin:2px 0 0 0; font-size:11px; color:#475569;">Kasr Al Ainy Faculty of Medicine</p>
            </div>
          </div>
          <!-- Red & Navy Stripe -->
          <div style="display:flex; height:4px; width:100%; margin-top:4px;">
            <div style="width:75%; background:#800000;"></div>
            <div style="width:25%; background:#0f172a;"></div>
          </div>
        </div>

        <!-- Patient Info Card -->
        <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:10px 14px; margin:14px 0; font-size:11.5px; color:#1e293b;">
          <div style="display:grid; grid-template-columns: 2fr 1fr 1fr; gap:6px 14px;">
            <div>
              <span style="color:#64748b;">اسم المريض:</span>
              <strong style="color:#0f172a; font-size:13px; margin-right:4px;">${p.fullName}</strong>
            </div>
            <div dir="ltr" style="text-align:right;">
              <span style="color:#64748b;">Lab No:</span>
              <strong style="color:#800000; font-family:monospace; font-size:13px; margin-left:4px;">${p.labNumber}</strong>
            </div>
            <div dir="ltr" style="text-align:right;">
              <span style="background:#ffffff; border:1px solid #cbd5e1; padding:2px 6px; border-radius:4px; font-family:monospace; font-size:9.5px;">||| | ||| ${p.barcode}</span>
            </div>

            <div>
              <span style="color:#64748b;">السن / النوع:</span>
              <strong style="margin-right:4px;">${p.age} ${p.ageUnit === 'years' ? 'سنة' : p.ageUnit === 'months' ? 'شهر' : 'يوم'} / ${p.gender === 'male' ? 'ذكر' : 'أنثى'}</strong>
            </div>
            <div>
              <span style="color:#64748b;">تاريخ السحب:</span>
              <span style="font-family:monospace; margin-right:4px;">${sampleDateFormatted}</span>
            </div>
            <div>
              <span style="color:#64748b;">تاريخ النتيجة:</span>
              <span style="font-family:monospace; margin-right:4px;">${reportingDateFormatted}</span>
            </div>

            <div style="grid-column: span 2;">
              <span style="color:#64748b;">الطبيب المعالج:</span>
              <strong style="margin-right:4px;">${doctorDisplay}</strong>
            </div>
            <div dir="ltr" style="text-align:right;">
              <span style="color:#64748b;">WhatsApp:</span>
              <span style="font-family:monospace; margin-left:4px;">${p.phone}</span>
            </div>
          </div>
        </div>

        <!-- Profile Title Banner -->
        <div style="background:linear-gradient(90deg, #700b0b, #0f172a); color:#ffffff; padding:7px 14px; border-radius:6px; display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="width:8px; height:8px; border-radius:50%; background:#f43f5e; display:inline-block;"></span>
            <strong style="font-size:13px; text-transform:uppercase; letter-spacing:0.5px;">${profile.titleEn}</strong>
            <span style="color:#fecdd3; font-size:11px;">— ${profile.titleAr}</span>
          </div>
          <div style="font-size:10px; color:#fed7aa; font-family:monospace;">
            Sample: ${profile.sampleType} | Page ${pageNum} of ${totalPages}
          </div>
        </div>

        <!-- 5-Column Table: Investigations / Results / Coloured chart / Flags / References -->
        <div style="border:1px solid #cbd5e1; border-radius:6px; overflow:hidden; margin-bottom:12px;">
          <table style="width:100%; border-collapse:collapse; font-size:11px; text-align:left;" dir="ltr">
            <thead>
              <tr style="background:#f1f5f9; color:#1e293b; font-weight:800; font-size:10.5px; border-bottom:1.5px solid #cbd5e1; text-transform:uppercase; letter-spacing:0.5px;">
                <th style="padding:8px 10px; width:34%;">Investigations</th>
                <th style="padding:8px 10px; width:18%; text-align:center;">Results</th>
                <th style="padding:8px 6px; width:16%; text-align:center;">Coloured Chart</th>
                <th style="padding:8px 6px; width:14%; text-align:center;">Flags</th>
                <th style="padding:8px 10px; width:18%;">References</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
        </div>

        <!-- Clinical Interpretation and Comment -->
        ${(profile.interpretation || profile.comment) ? `
          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:8px 12px; margin-bottom:14px; font-size:11px; line-height:1.5;">
            ${profile.interpretation ? `
              <div><strong style="color:#800000;">Interpretation:</strong> <span style="color:#1e293b;">${profile.interpretation}</span></div>
            ` : ''}
            ${profile.comment ? `
              <div style="margin-top:2px; font-size:10.5px; color:#64748b;"><strong style="color:#475569;">Comments:</strong> ${profile.comment}</div>
            ` : ''}
          </div>
        ` : ''}

        <!-- Official Signatures Footer (Bottom of every profile page) -->
        <div class="report-footer" style="margin-top:auto; padding-top:10px; border-top:1.5px solid #cbd5e1;">
          <div style="display:grid; grid-template-columns: 1fr 1fr 1fr; gap:12px; text-align:center; margin-bottom:8px;">
            <!-- Lab CHEMIST -->
            <div>
              <div style="font-size:10px; font-weight:800; color:#64748b; text-transform:uppercase;">Lab CHEMIST</div>
              <div style="font-family:serif; font-style:italic; font-size:12px; color:#475569; padding:4px 0; font-weight:bold;">Approved / Chemist</div>
              <div style="font-size:10px; font-weight:700; color:#0f172a;">${report.staff.labChemist}</div>
            </div>

            <!-- Verify by -->
            <div>
              <div style="font-size:10px; font-weight:800; color:#64748b; text-transform:uppercase;">Verify by</div>
              <div style="font-family:serif; font-style:italic; font-size:12px; color:#475569; padding:4px 0; font-weight:bold;">Quality Audit Verified</div>
              <div style="font-size:10px; font-weight:700; color:#0f172a;">${report.staff.verifiedBy}</div>
            </div>

            <!-- Pathologist -->
            <div style="border-right:1px solid #e2e8f0; padding-right:8px;">
              <div style="font-size:10px; font-weight:800; color:#800000; text-transform:uppercase;">Consultant Pathologist</div>
              <div style="padding:2px 0;">
                <span style="display:inline-block; border:1px dashed #800000; padding:1px 8px; border-radius:4px; background:#fff1f2; font-family:serif; font-style:italic; font-size:12px; color:#800000; font-weight:900;">
                  Dr. Rami Mokhtar
                </span>
              </div>
              <div style="font-size:10.5px; font-weight:800; color:#800000;">${report.staff.pathologist}</div>
            </div>
          </div>

          <div style="display:flex; justify-content:space-between; font-size:9.5px; color:#64748b; border-top:1px solid #f1f5f9; padding-top:4px;">
            <div>RT LAB Diagnostic System | Kasr Al Ainy | الفرع الرئيسي: ميدان بهتيم برج صيدلية العزبي (01012345678)</div>
            <div style="font-family:monospace;">Report ID: ${report.reportNumber} | Page ${pageNum} of ${totalPages}</div></div><div style="text-align:center; font-size:8.5px; color:#475569; margin-top:3px; padding-top:2px; border-top:1px dashed #e2e8f0;">معامل RT للتشخيص الطبي | الخط الساخن: <strong>01001234567 / 02-23658900</strong> | فروع: القاهرة (المنيل وقصر العيني) · الجيزة (الدقي) · الإسكندرية (سموحة)
          </div>
        </div>
      </div>
    `;
  });

  const fullHtml = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>RT LAB Report - ${p.fullName} - ${p.labNumber}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=Inter:wght@400;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 0;
      background: #ffffff;
      background-color: #ffffff;
      font-family: 'Cairo', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      color: #0f172a;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    /* Fixed top toolbar for easy printing */
    .no-print-toolbar {
      position: sticky;
      top: 0;
      left: 0;
      right: 0;
      background: #0f172a;
      color: #ffffff;
      padding: 12px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 9999;
    }

    .btn-print {
      background: linear-gradient(135deg, #991b1b, #800000);
      color: #ffffff;
      border: none;
      padding: 8px 20px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 800;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.25);
    }
    .btn-print:hover { background: #b91c1c; }

    .btn-close {
      background: #334155;
      color: #ffffff;
      border: none;
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 12px;
      cursor: pointer;
    }
    .btn-close:hover { background: #475569; }

    /* Each Profile on a Separate Page (كل بروفايل في صفحة) */
    .report-page {
      background: #ffffff;
      background-color: #ffffff;
      width: 210mm;
      min-height: 297mm;
      margin: 0 auto;
      padding: 14mm 16mm 14mm 16mm;
      box-shadow: none;
      border: none;
      border-radius: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      page-break-after: always;
      break-after: page;
    }

    @media print {
      html, body {
        background: #ffffff !important;
        background-color: #ffffff !important;
        margin: 0 !important;
        padding: 0 !important;
      }
      .no-print-toolbar {
        display: none !important;
      }
      .report-page {
        margin: 0 !important;
        padding: 8mm 12mm 10mm 12mm !important;
        box-shadow: none !important;
        border: none !important;
        border-radius: 0 !important;
        width: 100% !important;
        min-height: 297mm !important;
        page-break-after: always !important;
        break-after: page !important;
        background: #ffffff !important;
        background-color: #ffffff !important;
      }
      @page {
        size: A4 portrait;
        margin: 0;
      }
    }
  </style>
</head>
<body>
  <div class="no-print-toolbar">
    <div style="display:flex; align-items:center; gap:12px;">
      <span style="font-weight:800; font-size:14px; color:#fda4af;">معامل RT - طباعة وحفظ التقرير (A4)</span>
      <span style="color:#64748b;">|</span>
      <span style="font-size:12px; color:#e2e8f0;">المريض: <strong>${p.fullName}</strong> (${p.labNumber})</span>
    </div>
    <div style="display:flex; align-items:center; gap:10px;">
      <button class="btn-print" onclick="window.print()">
        🖨️ طباعة الآن أو حفظ كـ PDF
      </button>
      <button class="btn-close" onclick="window.close()">إغلاق النافذة ✕</button>
    </div>
  </div>

  ${profilesHtml}

  <script>
    // Automatically trigger print dialog when page loads
    window.addEventListener('load', () => {
      setTimeout(() => {
        window.print();
      }, 500);
    });
  </script>
</body>
</html>`;

  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.open();
    printWindow.document.write(fullHtml);
    printWindow.document.close();
  } else {
    // If popup was blocked by browser
    alert('برجاء السماح بفتح النوافذ المنبثقة (Popups) في المتصفح لعرض وحفظ تقرير الـ PDF مباشرة.');
  }
}
