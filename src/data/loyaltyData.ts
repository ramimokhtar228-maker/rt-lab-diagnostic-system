import { PatientLoyaltyProfile } from '../types/lab';

export const INITIAL_LOYALTY_PROFILES: PatientLoyaltyProfile[] = [
  {
    patientId: 'pat-1',
    patientName: 'أحمد محمود عبد العزيز',
    phone: '01012345678',
    barcode: '4920194821',
    bloodGroup: 'O+',
    totalPoints: 480,
    tier: 'Gold',
    lifetimeSpent: 4800,
    emergencyContact: '01009876543 (الزوجة)',
    chronicConditions: ['ارتفاع ضغط الدم (Hypertension)', 'مرحلة ما قبل السكري'],
    issueDate: '2025-11-15',
    transactions: [
      {
        id: 'tx-1',
        date: '2025-11-15',
        type: 'bonus',
        points: 50,
        description: 'هدية التسجيل وإصدار كرت المريض الذكي لأول مرة'
      },
      {
        id: 'tx-2',
        date: '2026-01-20',
        type: 'earn',
        points: 180,
        description: 'اكتساب نقاط باقة متابعة السكر والدهون',
        reportNumber: 'RT-2026-1042'
      },
      {
        id: 'tx-3',
        date: '2026-05-12',
        type: 'earn',
        points: 250,
        description: 'اكتساب نقاط باقة الفحص الدوري السنوي الشامل',
        reportNumber: 'RT-2026-3829'
      }
    ]
  },
  {
    patientId: 'pat-2',
    patientName: 'سارة إبراهيم حسن',
    phone: '01123456789',
    barcode: '7729104823',
    bloodGroup: 'A+',
    totalPoints: 720,
    tier: 'Platinum',
    lifetimeSpent: 7200,
    emergencyContact: '01111223344 (الوالد)',
    chronicConditions: ['قصور نشاط الغدة الدرقية (Hypothyroidism)'],
    issueDate: '2025-08-10',
    transactions: [
      {
        id: 'tx-4',
        date: '2025-08-10',
        type: 'bonus',
        points: 50,
        description: 'هدية إصدار كرت المريض'
      },
      {
        id: 'tx-5',
        date: '2025-12-05',
        type: 'earn',
        points: 320,
        description: 'اكتساب نقاط باقة صحة المرأة والهرمونات',
        reportNumber: 'RT-2025-8812'
      },
      {
        id: 'tx-6',
        date: '2026-04-18',
        type: 'earn',
        points: 350,
        description: 'اكتساب نقاط تحاليل الفيتامينات والمعادن',
        reportNumber: 'RT-2026-2114'
      }
    ]
  },
  {
    patientId: 'pat-3',
    patientName: 'محمد طارق السيد',
    phone: '01234567890',
    barcode: '9182374610',
    bloodGroup: 'B+',
    totalPoints: 120,
    tier: 'Silver',
    lifetimeSpent: 1200,
    emergencyContact: '01223344556 (الأخ)',
    chronicConditions: ['حساسية الصدر (Bronchial Asthma)'],
    issueDate: '2026-02-01',
    transactions: [
      {
        id: 'tx-7',
        date: '2026-02-01',
        type: 'bonus',
        points: 50,
        description: 'هدية الانضمام لنظام كروت المرضى'
      },
      {
        id: 'tx-8',
        date: '2026-06-10',
        type: 'earn',
        points: 70,
        description: 'اكتساب نقاط تحليل صورة دم كاملة ووظائف كلى',
        reportNumber: 'RT-2026-5591'
      }
    ]
  }
];

export const TIER_BENEFITS = {
  Silver: {
    minPoints: 0,
    maxPoints: 499,
    discountRate: 5,
    badgeBg: 'bg-slate-200 text-slate-800 border-slate-300',
    titleAr: 'المستوى الفضي (Silver)',
    description: 'خصم 5% على جميع التحاليل + أولوية استلام النتائج عبر الواتساب'
  },
  Gold: {
    minPoints: 500,
    maxPoints: 1499,
    discountRate: 10,
    badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
    titleAr: 'المستوى الذهبي (Gold)',
    description: 'خصم 10% دائم + سحب منزلي مجاني مرتين سنوياً + تقرير التطور البياني'
  },
  Platinum: {
    minPoints: 1500,
    maxPoints: 2999,
    discountRate: 15,
    badgeBg: 'bg-indigo-100 text-indigo-900 border-indigo-300',
    titleAr: 'المستوى البلاتيني (Platinum VIP)',
    description: 'خصم 15% دائم + سحب منزلي مجاني غير محدود + استشارة مع استشاري المعمل مجاناً'
  },
  VIP: {
    minPoints: 3000,
    maxPoints: Infinity,
    discountRate: 20,
    badgeBg: 'bg-gradient-to-r from-red-800 to-rose-700 text-white border-red-500',
    titleAr: 'نخبة الماس VIP (Diamond Elite)',
    description: 'خصم 20% دائم لك ولأفراد عائلتك من الدرجة الأولى + باقة فحص سنوي مجانية كبرى'
  }
};
