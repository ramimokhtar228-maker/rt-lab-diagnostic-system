import { LabReport } from '../types/lab';

export function formatWhatsAppMessage(report: LabReport): string {
  const p = report.patient;
  const profilesList = report.profiles.map(pr => `• ${pr.titleEn} (${pr.titleAr})`).join('\n');
  const dateFormatted = new Date(p.sampleDate).toLocaleDateString('ar-EG', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const referringDr = p.referringDoctorTitle === 'Herself' || p.referringDoctorTitle === 'Himself'
    ? 'طلب فحص ذاتي (Self-Request)'
    : `${p.referringDoctorTitle} ${p.referringDoctorName}`.trim();

  return `🔬 *معامل RT للتحاليل التشخيصية*
*معامل رامي مختار*
*أطباء الباثولوجيا الإكلينيكية والكيميائية - كلية طب قصر العيني*
────────────────────
سعادة المريض/ة: *${p.fullName}*
رقم الملف / الباركود: *${p.labNumber}*
تاريخ سحب العينة: ${dateFormatted}
الطبيب المعالج: ${referringDr}

📋 *الفحوصات الطبية المنجزة:*
${profilesList}

حالة التقرير: *معتمد ومدقق رسمياً* ✅
إشراف: *${report.staff.pathologist}*
مراجعة: ${report.staff.verifiedBy}

📎 يسعدنا إبلاغكم بجاهزية نتائج تحاليلكم الطبية.
يمكنكم استلام النسخة الورقية المعتمدة من فرع المعمل، أو طلب إرسال النسخة الرقمية (PDF) مباشرة عبر هذه المحادثة.

مع تمنيات أسرة *معامل RT* لكم بموفور الصحة والعافية. 🌸
📞 هاتف المعمل: 01000000000
📍 العنوان: كلية طب قصر العيني - القاهرة`;
}

export function openWhatsApp(phone: string, message: string): void {
  // Clean phone number: remove spaces, dashes, parentheses
  let cleaned = phone.replace(/[^0-9]/g, '');

  // If local Egyptian number starting with 01, prepend 20
  if (cleaned.startsWith('01') && cleaned.length === 11) {
    cleaned = '20' + cleaned.substring(1);
  } else if (!cleaned.startsWith('20') && cleaned.length === 10 && cleaned.startsWith('1')) {
    cleaned = '20' + cleaned;
  }

  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/${cleaned}?text=${encoded}`;
  window.open(url, '_blank');
}
