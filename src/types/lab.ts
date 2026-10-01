export type Gender = 'male' | 'female';
export type AgeUnit = 'years' | 'months' | 'days';
export type DoctorTitle = 'Prof. Dr.' | 'Dr.' | 'Herself' | 'Himself' | 'Custom';

export type ResultFlag = 'NORMAL' | 'HIGH' | 'LOW' | 'PANIC_HIGH' | 'PANIC_LOW' | 'ABNORMAL' | '';

export interface Patient {
  id: string;
  labNumber: string;
  barcode: string;
  fullName: string; // اسم ثلاثي / رباعي
  age: number;
  ageUnit: AgeUnit;
  gender: Gender;
  phone: string; // WhatsApp
  referringDoctorTitle: DoctorTitle;
  referringDoctorName: string;
  sampleDate: string; // ISO date-time
  reportingDate: string; // ISO date-time
  clinicalHistory?: string;
  fastingHours?: number;
  nationalId?: string;
}

export interface TestParameter {
  id: string;
  name: string; // e.g. "Hemoglobin (Hb)", "Serum Creatinine"
  result: string;
  unit: string; // e.g. "g/dL", "mg/dL"
  minNormal?: number;
  maxNormal?: number;
  panicLow?: number;
  panicHigh?: number;
  textReference?: string; // For qualitative tests e.g. "Negative", "Non-reactive", "70 - 100 mg/dL"
  flag: ResultFlag;
  method?: string; // e.g. "Spectrophotometry", "CLIA", "Enzymatic"
  notes?: string;
}

export interface TestProfile {
  id: string;
  profileCode: string; // "CBC", "LFT", "KFT", "LIPID", "GLYCEMIC", "THYROID", etc.
  titleEn: string;
  titleAr: string;
  category: string;
  sampleType: string; // "EDTA Whole Blood", "Serum", "Urine", etc.
  parameters: TestParameter[];
  interpretation?: string;
  comment?: string;
}

export interface LabStaffSignatures {
  labChemist: string; // Lab CHEMIST
  verifiedBy: string; // Verify by
  pathologist: string; // Pathologist (استشاري الباثولوجيا الإكلينيكية والكيميائية)
}

export type ReportStatus = 'draft' | 'in_progress' | 'verified' | 'released';

export interface LabReport {
  id: string;
  reportNumber: string;
  patient: Patient;
  profiles: TestProfile[];
  staff: LabStaffSignatures;
  generalComment?: string;
  status: ReportStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CatalogProfileTemplate {
  code: string;
  titleEn: string;
  titleAr: string;
  category: string;
  sampleType: string;
  defaultInterpretation?: string;
  parameters: Omit<TestParameter, 'id' | 'result' | 'flag'>[];
}
