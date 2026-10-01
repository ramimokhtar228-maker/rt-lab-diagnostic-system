import { LabReport } from '../types/lab';
import { DEFAULT_STAFF } from './labCatalog';

export const INITIAL_REPORTS: LabReport[] = [
  {
    id: 'rep-001',
    reportNumber: 'RT-2026-0891',
    patient: {
      id: 'pat-1001',
      labNumber: 'RT-2026-0891',
      barcode: '9827361829',
      fullName: 'محمود حسن إبراهيم السيد',
      age: 52,
      ageUnit: 'years',
      gender: 'male',
      phone: '01012345678',
      referringDoctorTitle: 'Prof. Dr.',
      referringDoctorName: 'طارق عبد المنعم - استشاري السكر والغدد الصماء',
      sampleDate: '2026-10-01T08:30:00',
      reportingDate: '2026-10-01T14:00:00',
      fastingHours: 10,
      clinicalHistory: 'Type 2 DM routine follow-up, Dyslipidemia evaluation'
    },
    status: 'released',
    staff: DEFAULT_STAFF,
    generalComment: 'Samples collected under standard fasting protocol. Regular monitoring of glycemic and lipid parameters advised.',
    createdAt: '2026-10-01T08:35:00',
    updatedAt: '2026-10-01T14:15:00',
    profiles: [
      {
        id: 'prof-001-glyc',
        profileCode: 'GLYCEMIC',
        titleEn: 'Diabetes & Glycemic Assessment',
        titleAr: 'تقييم السكر التراكمي والجلوكوز',
        category: 'Clinical Chemistry',
        sampleType: 'Fluoride Plasma & EDTA Blood',
        interpretation: 'HbA1c reflects improved glycemic control compared to prior visit. Fasting plasma glucose is mildly elevated.',
        comment: 'Patient confirmed taking morning oral hypoglycemic medications.',
        parameters: [
          { id: 'p-1', name: 'Fasting Blood Glucose (FBG)', result: '138', unit: 'mg/dL', minNormal: 70, maxNormal: 100, flag: 'HIGH', method: 'GOD-PAP' },
          { id: 'p-2', name: 'Post-Prandial Glucose (2h PP)', result: '174', unit: 'mg/dL', minNormal: 70, maxNormal: 140, flag: 'HIGH', method: 'GOD-PAP' },
          { id: 'p-3', name: 'HbA1c (Glycated Hemoglobin)', result: '6.8', unit: '%', minNormal: 4.5, maxNormal: 5.6, flag: 'HIGH', method: 'HPLC Certified NGSP' },
          { id: 'p-4', name: 'Estimated Average Glucose (eAG)', result: '148', unit: 'mg/dL', minNormal: 70, maxNormal: 115, flag: 'HIGH' }
        ]
      },
      {
        id: 'prof-001-lipid',
        profileCode: 'LIPID',
        titleEn: 'Lipid Profile',
        titleAr: 'دهون الدم الشاملة',
        category: 'Clinical Chemistry',
        sampleType: 'Serum (12h Fasting)',
        interpretation: 'Moderate hypertriglyceridemia with border-line elevated total cholesterol. HDL-C within acceptable target for male patients.',
        comment: 'Lifestyle modification and low carbohydrate/fat diet recommended.',
        parameters: [
          { id: 'p-5', name: 'Total Serum Cholesterol', result: '215', unit: 'mg/dL', minNormal: 120, maxNormal: 200, flag: 'HIGH', method: 'CHOD-PAP' },
          { id: 'p-6', name: 'Serum Triglycerides', result: '198', unit: 'mg/dL', minNormal: 40, maxNormal: 150, flag: 'HIGH', method: 'GPO-PAP' },
          { id: 'p-7', name: 'HDL - Cholesterol (Good)', result: '44', unit: 'mg/dL', minNormal: 40, maxNormal: 65, flag: 'NORMAL' },
          { id: 'p-8', name: 'LDL - Cholesterol (Calculated)', result: '131', unit: 'mg/dL', minNormal: 0, maxNormal: 100, flag: 'HIGH' },
          { id: 'p-9', name: 'VLDL - Cholesterol', result: '39.6', unit: 'mg/dL', minNormal: 5, maxNormal: 30, flag: 'HIGH' },
          { id: 'p-10', name: 'Total Chol / HDL Ratio', result: '4.88', unit: 'Ratio', minNormal: 0, maxNormal: 4.5, flag: 'HIGH' }
        ]
      },
      {
        id: 'prof-001-kft',
        profileCode: 'KFT',
        titleEn: 'Kidney Function Profile',
        titleAr: 'وظائف الكلى واليوريا',
        category: 'Clinical Chemistry',
        sampleType: 'Serum',
        interpretation: 'Normal renal indices. Adequate glomerular clearance.',
        parameters: [
          { id: 'p-11', name: 'Serum Creatinine', result: '0.95', unit: 'mg/dL', minNormal: 0.6, maxNormal: 1.2, flag: 'NORMAL', method: 'Jaffe Modified' },
          { id: 'p-12', name: 'Blood Urea', result: '28', unit: 'mg/dL', minNormal: 15, maxNormal: 45, flag: 'NORMAL' },
          { id: 'p-13', name: 'Serum Uric Acid', result: '5.8', unit: 'mg/dL', minNormal: 3.5, maxNormal: 7.2, flag: 'NORMAL' },
          { id: 'p-14', name: 'eGFR (CKD-EPI)', result: '96', unit: 'mL/min/1.73m²', minNormal: 90, maxNormal: 120, flag: 'NORMAL' }
        ]
      }
    ]
  },
  // Visit 2 for same patient (60 days ago) for Longitudinal Trend Charts:
  {
    id: 'rep-001-prev1',
    reportNumber: 'RT-2026-0420',
    patient: {
      id: 'pat-1001',
      labNumber: 'RT-2026-0420',
      barcode: '9827361801',
      fullName: 'محمود حسن إبراهيم السيد',
      age: 52,
      ageUnit: 'years',
      gender: 'male',
      phone: '01012345678',
      referringDoctorTitle: 'Prof. Dr.',
      referringDoctorName: 'طارق عبد المنعم - استشاري السكر والغدد الصماء',
      sampleDate: '2026-07-28T09:00:00',
      reportingDate: '2026-07-28T15:00:00',
      fastingHours: 12
    },
    status: 'released',
    staff: DEFAULT_STAFF,
    createdAt: '2026-07-28T09:10:00',
    updatedAt: '2026-07-28T15:30:00',
    profiles: [
      {
        id: 'prof-prev1-glyc',
        profileCode: 'GLYCEMIC',
        titleEn: 'Diabetes & Glycemic Assessment',
        titleAr: 'تقييم السكر التراكمي والجلوكوز',
        category: 'Clinical Chemistry',
        sampleType: 'Fluoride Plasma & EDTA Blood',
        parameters: [
          { id: 'p-pr1-1', name: 'Fasting Blood Glucose (FBG)', result: '162', unit: 'mg/dL', minNormal: 70, maxNormal: 100, flag: 'HIGH' },
          { id: 'p-pr1-2', name: 'Post-Prandial Glucose (2h PP)', result: '210', unit: 'mg/dL', minNormal: 70, maxNormal: 140, flag: 'HIGH' },
          { id: 'p-pr1-3', name: 'HbA1c (Glycated Hemoglobin)', result: '7.6', unit: '%', minNormal: 4.5, maxNormal: 5.6, flag: 'HIGH' }
        ]
      },
      {
        id: 'prof-prev1-lipid',
        profileCode: 'LIPID',
        titleEn: 'Lipid Profile',
        titleAr: 'دهون الدم الشاملة',
        category: 'Clinical Chemistry',
        sampleType: 'Serum',
        parameters: [
          { id: 'p-pr1-5', name: 'Total Serum Cholesterol', result: '238', unit: 'mg/dL', minNormal: 120, maxNormal: 200, flag: 'HIGH' },
          { id: 'p-pr1-6', name: 'Serum Triglycerides', result: '240', unit: 'mg/dL', minNormal: 40, maxNormal: 150, flag: 'HIGH' }
        ]
      }
    ]
  },
  // Visit 3 for same patient (120 days ago) for Longitudinal Trend Charts:
  {
    id: 'rep-001-prev2',
    reportNumber: 'RT-2026-0112',
    patient: {
      id: 'pat-1001',
      labNumber: 'RT-2026-0112',
      barcode: '9827361715',
      fullName: 'محمود حسن إبراهيم السيد',
      age: 52,
      ageUnit: 'years',
      gender: 'male',
      phone: '01012345678',
      referringDoctorTitle: 'Prof. Dr.',
      referringDoctorName: 'طارق عبد المنعم - استشاري السكر والغدد الصماء',
      sampleDate: '2026-04-15T08:45:00',
      reportingDate: '2026-04-15T13:30:00',
      fastingHours: 12
    },
    status: 'released',
    staff: DEFAULT_STAFF,
    createdAt: '2026-04-15T08:50:00',
    updatedAt: '2026-04-15T13:45:00',
    profiles: [
      {
        id: 'prof-prev2-glyc',
        profileCode: 'GLYCEMIC',
        titleEn: 'Diabetes & Glycemic Assessment',
        titleAr: 'تقييم السكر التراكمي والجلوكوز',
        category: 'Clinical Chemistry',
        sampleType: 'Fluoride Plasma & EDTA Blood',
        parameters: [
          { id: 'p-pr2-1', name: 'Fasting Blood Glucose (FBG)', result: '185', unit: 'mg/dL', minNormal: 70, maxNormal: 100, flag: 'HIGH' },
          { id: 'p-pr2-2', name: 'Post-Prandial Glucose (2h PP)', result: '245', unit: 'mg/dL', minNormal: 70, maxNormal: 140, flag: 'HIGH' },
          { id: 'p-pr2-3', name: 'HbA1c (Glycated Hemoglobin)', result: '8.4', unit: '%', minNormal: 4.5, maxNormal: 5.6, flag: 'HIGH' }
        ]
      }
    ]
  },
  // Case 2: Anemia Female Patient
  {
    id: 'rep-002',
    reportNumber: 'RT-2026-0892',
    patient: {
      id: 'pat-1002',
      labNumber: 'RT-2026-0892',
      barcode: '9827361830',
      fullName: 'منى أحمد عبد العزيز الخولي',
      age: 28,
      ageUnit: 'years',
      gender: 'female',
      phone: '01123456789',
      referringDoctorTitle: 'Dr.',
      referringDoctorName: 'سارة رضوان - أخصائي أمراض الباطنة',
      sampleDate: '2026-10-01T09:15:00',
      reportingDate: '2026-10-01T14:30:00',
      clinicalHistory: 'Fatigue, dizziness, pallor. Anemia workup.'
    },
    status: 'released',
    staff: DEFAULT_STAFF,
    generalComment: 'Peripheral blood film demonstrates moderate microcytosis and hypochromia with mild anisopoikilocytosis.',
    createdAt: '2026-10-01T09:20:00',
    updatedAt: '2026-10-01T14:40:00',
    profiles: [
      {
        id: 'prof-002-cbc',
        profileCode: 'CBC',
        titleEn: 'Complete Blood Picture (CBC)',
        titleAr: 'صورة دم كاملة',
        category: 'Hematology',
        sampleType: 'EDTA Whole Blood',
        interpretation: 'Microcytic hypochromic anemia picture. Iron deficiency pattern is strongly suggested. Correlation with Serum Ferritin.',
        parameters: [
          { id: 'cb-1', name: 'Hemoglobin (Hb)', result: '9.2', unit: 'g/dL', minNormal: 12.0, maxNormal: 16.0, flag: 'LOW', method: 'Automated SLS-Hb' },
          { id: 'cb-2', name: 'R.B.Cs Count', result: '3.8', unit: 'x10^6/µL', minNormal: 4.0, maxNormal: 5.4, flag: 'LOW' },
          { id: 'cb-3', name: 'Hematocrit (PCV)', result: '29.5', unit: '%', minNormal: 36.0, maxNormal: 46.0, flag: 'LOW' },
          { id: 'cb-4', name: 'M.C.V', result: '71.2', unit: 'fL', minNormal: 80.0, maxNormal: 98.0, flag: 'LOW' },
          { id: 'cb-5', name: 'M.C.H', result: '23.8', unit: 'pg', minNormal: 27.0, maxNormal: 33.0, flag: 'LOW' },
          { id: 'cb-6', name: 'M.C.H.C', result: '30.1', unit: 'g/dL', minNormal: 32.0, maxNormal: 36.0, flag: 'LOW' },
          { id: 'cb-7', name: 'R.D.W-CV', result: '16.4', unit: '%', minNormal: 11.5, maxNormal: 14.5, flag: 'HIGH' },
          { id: 'cb-8', name: 'Platelets Count', result: '320', unit: 'x10^3/µL', minNormal: 150, maxNormal: 450, flag: 'NORMAL' },
          { id: 'cb-9', name: 'Total Leucocytic Count (TLC)', result: '6.4', unit: 'x10^3/µL', minNormal: 4.0, maxNormal: 11.0, flag: 'NORMAL' },
          { id: 'cb-10', name: 'Neutrophils %', result: '58', unit: '%', minNormal: 40, maxNormal: 70, flag: 'NORMAL' },
          { id: 'cb-11', name: 'Lymphocytes %', result: '34', unit: '%', minNormal: 20, maxNormal: 45, flag: 'NORMAL' }
        ]
      },
      {
        id: 'prof-002-iron',
        profileCode: 'ANEMIA_VITAMINS',
        titleEn: 'Anemia & Iron Status',
        titleAr: 'مخزون الحديد والحديد المصلي',
        category: 'Clinical Chemistry',
        sampleType: 'Serum',
        interpretation: 'Significantly depleted iron stores (low Ferritin and Iron with elevated TIBC), confirming Iron Deficiency Anemia.',
        parameters: [
          { id: 'fe-1', name: 'Serum Ferritin', result: '8.4', unit: 'ng/mL', minNormal: 15, maxNormal: 150, flag: 'LOW', method: 'CLIA' },
          { id: 'fe-2', name: 'Serum Iron', result: '32', unit: 'µg/dL', minNormal: 50, maxNormal: 170, flag: 'LOW' },
          { id: 'fe-3', name: 'Total Iron Binding Capacity (TIBC)', result: '475', unit: 'µg/dL', minNormal: 250, maxNormal: 450, flag: 'HIGH' },
          { id: 'fe-4', name: 'Transferrin Saturation', result: '6.7', unit: '%', minNormal: 15, maxNormal: 45, flag: 'LOW' },
          { id: 'fe-5', name: 'Vitamin D3 (25-OH Total)', result: '18.2', unit: 'ng/mL', minNormal: 30, maxNormal: 100, flag: 'LOW' }
        ]
      }
    ]
  },
  // Case 3: Thyroid & General Screen
  {
    id: 'rep-003',
    reportNumber: 'RT-2026-0893',
    patient: {
      id: 'pat-1003',
      labNumber: 'RT-2026-0893',
      barcode: '9827361831',
      fullName: 'عمرو فؤاد منصور خليل',
      age: 41,
      ageUnit: 'years',
      gender: 'male',
      phone: '01223344556',
      referringDoctorTitle: 'Herself',
      referringDoctorName: '',
      sampleDate: '2026-10-01T10:00:00',
      reportingDate: '2026-10-01T15:00:00',
      clinicalHistory: 'Checkup, sluggishness, weight changes'
    },
    status: 'in_progress',
    staff: DEFAULT_STAFF,
    createdAt: '2026-10-01T10:05:00',
    updatedAt: '2026-10-01T11:20:00',
    profiles: [
      {
        id: 'prof-003-thy',
        profileCode: 'THYROID',
        titleEn: 'Thyroid Hormonal Profile',
        titleAr: 'هرمونات الغدة الدرقية',
        category: 'Endocrinology',
        sampleType: 'Serum',
        interpretation: 'Elevated TSH with normal Free T4 is consistent with Subclinical Hypothyroidism.',
        parameters: [
          { id: 'th-1', name: 'TSH (3rd Generation)', result: '6.42', unit: 'µIU/mL', minNormal: 0.35, maxNormal: 4.94, flag: 'HIGH', method: 'CLIA' },
          { id: 'th-2', name: 'Free T4 (FT4)', result: '1.02', unit: 'ng/dL', minNormal: 0.70, maxNormal: 1.48, flag: 'NORMAL', method: 'CLIA' },
          { id: 'th-3', name: 'Free T3 (FT3)', result: '2.8', unit: 'pg/mL', minNormal: 1.8, maxNormal: 4.2, flag: 'NORMAL', method: 'CLIA' }
        ]
      }
    ]
  }
];
