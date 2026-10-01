import { StaffMember, LabFacility } from '../types/lab';

export const INITIAL_STAFF_MEMBERS: StaffMember[] = [
  {
    id: 'staff-1',
    name: 'أ.د. رامي مختار',
    role: 'pathologist',
    title: 'أستاذ واستشاري الباثولوجيا الإكلينيكية والكيميائية',
    specialty: 'Clinical & Chemical Pathology',
    licenseNumber: 'EGY-MED-48201',
    phone: '01001234567',
    branchId: 'branch-kasr',
    signatureLabel: 'أ.د. رامي مختار - استشاري الباثولوجيا الإكلينيكية والكيميائية - كلية طب قصر العيني',
    isActive: true
  },
  {
    id: 'staff-2',
    name: 'د. مروة عبد الرحمن',
    role: 'verifier',
    title: 'استشاري مشارك المراجعة والتدقيق الإكلينيكي',
    specialty: 'Clinical Quality & Lab Governance',
    licenseNumber: 'EGY-MED-59104',
    phone: '01098765432',
    branchId: 'branch-kasr',
    signatureLabel: 'د. مروة عبد الرحمن - مراجعة إكلينيكية',
    isActive: true
  },
  {
    id: 'staff-3',
    name: 'كيميائي / محمود سامي',
    role: 'chemist',
    title: 'أخصائي أول الكيمياء الطبية وأمراض الدم',
    specialty: 'Clinical Chemistry & Automated Hematology',
    licenseNumber: 'EGY-SCI-38291',
    phone: '01122334455',
    branchId: 'branch-kasr',
    signatureLabel: 'كيميائي / محمود سامي - أخصائي كيمياء طبية',
    isActive: true
  },
  {
    id: 'staff-4',
    name: 'كيميائية / آية النجار',
    role: 'chemist',
    title: 'أخصائية الباثولوجيا الكيميائية والهرمونات',
    specialty: 'Hormones & Immunochemistry (CLIA)',
    licenseNumber: 'EGY-SCI-44102',
    phone: '01233445566',
    branchId: 'branch-maadi',
    signatureLabel: 'كيميائية / آية النجار - أخصائية باثولوجيا كيميائية',
    isActive: true
  },
  {
    id: 'staff-5',
    name: 'د. كريم حامد',
    role: 'verifier',
    title: 'أخصائي مراقبة وضمان الجودة الإكلينيكية',
    specialty: 'ISO 15189 Quality Control Lead',
    licenseNumber: 'EGY-MED-66320',
    phone: '01011223388',
    branchId: 'branch-mohandessin',
    signatureLabel: 'د. كريم حامد - أخصائي مراقبة الجودة الإكلينيكية',
    isActive: true
  },
  {
    id: 'staff-6',
    name: 'كيميائي / أحمد السيد',
    role: 'chemist',
    title: 'أخصائي أمراض الدم والمناعة والميكروبيولوجي',
    specialty: 'Medical Microbiology & Serology',
    licenseNumber: 'EGY-SCI-29110',
    phone: '01555667788',
    branchId: 'branch-nasrcity',
    signatureLabel: 'كيميائي / أحمد السيد - أخصائي أمراض دم ومناعة',
    isActive: true
  },
  {
    id: 'staff-7',
    name: 'أخصائية / فاطمة محمود',
    role: 'phlebotomist',
    title: 'أخصائية أولى سحب العينات الوريدية والأطفال',
    specialty: 'Pediatric & Geriatric Phlebotomy',
    licenseNumber: 'EGY-NUR-19022',
    phone: '01022446688',
    branchId: 'branch-kasr',
    signatureLabel: 'فاطمة محمود - أخصائية سحب العينات',
    isActive: true
  }
];

export const INITIAL_FACILITIES: LabFacility[] = [
  {
    id: 'branch-kasr',
    nameAr: 'معامل RT - الفرع الرئيسي (قصر العيني والمنيل)',
    nameEn: 'RT LAB Headquarters - Kasr Al Ainy & Manial',
    branchCode: 'RT-HQ-01',
    address: 'شارع المنيل الرئيسي، تقاطع قصر العيني، أمام المستشفى التعليمي، القاهرة',
    city: 'القاهرة',
    phones: ['02-23658900', '01001234567'],
    whatsapp: '01001234567',
    managerName: 'أ.د. رامي مختار',
    operatingHours: 'على مدار 24 ساعة (خدمة طوارئ مستمرة 24/7)',
    availableServices: [
      'المعمل المركزي الآلي المتكامل',
      'فحوصات الطوارئ الفورية خلال 45 دقيقة',
      'وحدة التدفق الخلوي (Flow Cytometry)',
      'وحدة الهرمونات المتطورة (CLIA)',
      'خدمة السحب المنزلي VIP لكبار السن'
    ],
    isMainBranch: true,
    isActive: true
  },
  {
    id: 'branch-maadi',
    nameAr: 'معامل RT - فرع المعادي',
    nameEn: 'RT LAB - Maadi Branch',
    branchCode: 'RT-BR-02',
    address: 'شارع النصر الرئيسي، برج الأطباء، أمام ميدان الجزائر، المعادي الجديدة',
    city: 'القاهرة',
    phones: ['02-25197800', '01099887766'],
    whatsapp: '01099887766',
    managerName: 'كيميائية / آية النجار',
    operatingHours: 'يومياً من 8:00 صباحاً حتى 11:00 مساءً',
    availableServices: [
      'سحب عينات الأطفال بدون ألم',
      'باقات الفحص الشامل التنفيذية',
      'سحب منزلي سريع بالمعادي والمقطم'
    ],
    isMainBranch: false,
    isActive: true
  },
  {
    id: 'branch-mohandessin',
    nameAr: 'معامل RT - فرع المهندسين والدقي',
    nameEn: 'RT LAB - Mohandessin & Dokki Branch',
    branchCode: 'RT-BR-03',
    address: 'شارع البطل أحمد عبد العزيز، بالقرب من تقاطع جامعة الدول العربية',
    city: 'الجيزة',
    phones: ['02-37612345', '01155443322'],
    whatsapp: '01155443322',
    managerName: 'د. كريم حامد',
    operatingHours: 'يومياً من 8:00 صباحاً حتى 12:00 منتصف الليل',
    availableServices: [
      'فحوصات ما قبل الزواج المعتمدة',
      'وحدة المناعة وأمراض الروماتيزم',
      'نتائج فورية عبر الواتساب'
    ],
    isMainBranch: false,
    isActive: true
  },
  {
    id: 'branch-nasrcity',
    nameAr: 'معامل RT - فرع مدينة نصر والتجمع',
    nameEn: 'RT LAB - Nasr City Branch',
    branchCode: 'RT-BR-04',
    address: 'شارع عباس العقاد، عمارة النصر، بجوار بنك مصر، مدينة نصر',
    city: 'القاهرة',
    phones: ['02-22745678', '01288776655'],
    whatsapp: '01288776655',
    managerName: 'كيميائي / أحمد السيد',
    operatingHours: 'يومياً من 8:30 صباحاً حتى 11:30 مساءً',
    availableServices: [
      'استلام عينات الفحص الدوري الشامل',
      'خدمة الزيارات المنزلية بمدينة نصر والتجمع',
      'فحص السكر التراكمي الفوري'
    ],
    isMainBranch: false,
    isActive: true
  },
  {
    id: 'branch-alex',
    nameAr: 'معامل RT - فرع الإسكندرية (سموحة)',
    nameEn: 'RT LAB - Alexandria (Smouha Branch)',
    branchCode: 'RT-BR-05',
    address: 'شارع فوزي معاذ، ميدان فيكتور عمانويل، سموحة، الإسكندرية',
    city: 'الإسكندرية',
    phones: ['03-4209800', '01055667788'],
    whatsapp: '01055667788',
    managerName: 'د. سارة عثمان',
    operatingHours: 'يومياً من 9:00 صباحاً حتى 11:00 مساءً',
    availableServices: [
      'فحوصات الحساسية والأغذية الشاملة',
      'متابعة أورام وأمراض الدم',
      'سحب منزلي بجميع أحياء الإسكندرية'
    ],
    isMainBranch: false,
    isActive: true
  }
];
