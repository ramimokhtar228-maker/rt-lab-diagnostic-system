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
  bloodGroup?: string; // e.g. "A+", "O+", "B-", etc.
  emergencyContact?: string;
  loyaltyPoints?: number;
  assignedPackageId?: string;
  totalCost?: number;
  discountApplied?: number;
  bookingType?: 'branch' | 'home_visit';
  branchAddress?: string;
  homeAddress?: string;
  deliveryNotes?: string;
  appointmentDate?: string;
  appointmentTime?: string;
  paymentMethod?: 'cash' | 'card' | 'wallet' | 'instapay';
  discountType?: 'percentage' | 'daily_fixed' | 'package_bundle' | 'dynamic_lab' | 'coupon' | 'none';
  couponCode?: string;
  sampleCollected?: boolean;
  sampleCollectedAt?: string;
  sampleNotes?: string;
  loyaltyCardIssued?: boolean;
  loyaltyCardNumber?: string;
  rating?: number;
  reviewComment?: string;
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
  profileCode: string; // "CBC", "LFT", "KFT", "LIPID", "GLYCEMIC", "THYROID", "INDIVIDUAL", etc.
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

export type StaffRole = 'chemist' | 'verifier' | 'pathologist' | 'phlebotomist' | 'receptionist';

export interface StaffMember {
  id: string;
  name: string;
  role: StaffRole;
  title: string; // المسمى الوظيفي والدرجة العلمية
  specialty: string;
  licenseNumber: string; // رقم القيد والترخيص
  phone: string;
  branchId: string; // الفرع التابع له
  signatureLabel: string; // الصيغة المعتمدة في تقرير التحليل
  isActive: boolean;
}

export interface LabFacility {
  id: string;
  nameAr: string;
  nameEn: string;
  branchCode: string;
  address: string;
  city: string;
  phones: string[];
  whatsapp: string;
  managerName: string;
  operatingHours: string;
  availableServices: string[];
  isMainBranch: boolean;
  isActive: boolean;
}

export type LoyaltyTier = 'Silver' | 'Gold' | 'Platinum' | 'VIP';

export interface LoyaltyTransaction {
  id: string;
  date: string;
  type: 'earn' | 'redeem' | 'bonus';
  points: number;
  description: string;
  reportNumber?: string;
}

export interface PatientLoyaltyProfile {
  patientId: string;
  patientName: string;
  phone: string;
  barcode: string;
  bloodGroup: string;
  totalPoints: number;
  tier: LoyaltyTier;
  lifetimeSpent: number;
  emergencyContact?: string;
  chronicConditions?: string[];
  issueDate: string;
  transactions: LoyaltyTransaction[];
}

export interface IndividualTest {
  id: string;
  code: string; // e.g. "GLU_F", "CREAT", "ALT", "TSH", "VIT_D"
  nameEn: string;
  nameAr: string;
  category: string;
  sampleType: string;
  unit: string;
  minNormal?: number;
  maxNormal?: number;
  panicLow?: number;
  panicHigh?: number;
  textReference?: string;
  method?: string;
  fastingInstructions?: string;
  turnaroundHours: number;
  price: number; // EGP
}

export interface ComprehensivePackage {
  id: string;
  code: string; // e.g. "PKG-WELLNESS", "PKG-MEN", "PKG-WOMEN"
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  targetAudience: string;
  includedProfiles: string[]; // Codes of profile templates
  includedIndividualTestCodes: string[]; // Individual test codes
  originalPrice: number;
  packagePrice: number;
  discountPercentage: number;
  fastingRequired: string;
  sampleTypes: string[];
  isPopular?: boolean;
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
  packageApplied?: {
    code: string;
    titleAr: string;
    packagePrice: number;
  };
}

export interface CatalogProfileTemplate {
  code: string;
  titleEn: string;
  titleAr: string;
  category: string;
  sampleType: string;
  defaultInterpretation?: string;
  parameters: Omit<TestParameter, 'id' | 'result' | 'flag'>[];
  profilePrice?: number;
}
