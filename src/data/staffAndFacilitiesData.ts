import { StaffMember, LabFacility } from "../types/lab";

export const INITIAL_STAFF_MEMBERS: StaffMember[] = [
  {
    id: "staff-1",
    name: "أ.د. رامي مختار",
    role: "pathologist",
    title: "أستاذ واستشاري الباثولوجيا الإكلينيكية والكيميائية",
    specialty: "Clinical & Chemical Pathology",
    licenseNumber: "EGY-MED-48201",
    phone: "01001234567",
    branchId: "main-branch",
    signatureLabel: "أ.د. رامي مختار - استشاري الباثولوجيا الإكلينيكية والكيميائية - كلية طب قصر العيني",
    isActive: true
  }
];

export const INITIAL_FACILITIES: LabFacility[] = [
  {
    id: "main-branch",
    nameAr: "الفرع الرئيسي",
    nameEn: "Main Laboratory Branch",
    branchCode: "MAIN-01",
    address: "المقر الرئيسي للمعمل",
    city: "القاهرة",
    phones: ["01001234567"],
    whatsapp: "01001234567",
    managerName: "أ.د. رامي مختار",
    operatingHours: "24/7",
    availableServices: [
      "سحب عينات ومعمل متكامل",
      "كيمياء إكلينيكية وهرمونات",
      "أمراض دم ومناعة وتخثر",
      "ميكروبيولوجي ومزارع"
    ],
    isMainBranch: true,
    isActive: true
  }
];
