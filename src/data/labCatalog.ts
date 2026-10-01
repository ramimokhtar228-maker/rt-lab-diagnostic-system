import { CatalogProfileTemplate, LabStaffSignatures } from '../types/lab';

export const DEFAULT_STAFF: LabStaffSignatures = {
  labChemist: 'كيميائي / محمود سامي - أخصائي كيمياء طبية',
  verifiedBy: 'د. مروة عبد الرحمن - مراجعة إكلينيكية',
  pathologist: 'أ.د. رامي مختار - استشاري الباثولوجيا الإكلينيكية والكيميائية - كلية طب قصر العيني'
};

export const STAFF_OPTIONS = {
  chemists: [
    'كيميائي / محمود سامي - أخصائي كيمياء طبية',
    'كيميائية / آية النجار - أخصائية باثولوجيا كيميائية',
    'كيميائي / أحمد السيد - أخصائي أمراض دم ومناعة',
    'كيميائية / ريهام فتحي - أخصائية ميكروبيولوجي'
  ],
  verifiers: [
    'د. مروة عبد الرحمن - مراجعة إكلينيكية',
    'د. كريم حامد - أخصائي مراقبة الجودة الإكلينيكية',
    'د. سارة عثمان - أخصائي باثولوجيا إكلينيكية'
  ],
  pathologists: [
    'أ.د. رامي مختار - استشاري الباثولوجيا الإكلينيكية والكيميائية - كلية طب قصر العيني',
    'د. رامي مختار - رئيس قسم التشخيص المعملي - قصر العيني',
    'أ.د. محمد حسن الشريف - استشاري الباثولوجيا الإكلينيكية - قصر العيني'
  ]
};

export const COMMON_INTERPRETATIONS: { [key: string]: string[] } = {
  CBC: [
    'Mild microcytic hypochromic anemia, iron deficiency picture is suggested. Serum Ferritin is recommended.',
    'Normocytic normochromic anemia. Chronic disease or blood loss evaluation suggested.',
    'Relative leucocytosis with neutrophilia, suggestive of acute bacterial infection or inflammatory process.',
    'Mild thrombocytopenia, platelet count should be confirmed on fresh peripheral blood smear in citrate.',
    'Normal complete blood picture within reference values for age and sex.'
  ],
  LFT: [
    'Mild elevation of transaminases (ALT & AST), correlation with viral hepatitis serology and abdominal ultrasound is advised.',
    'Isolated elevation of Direct Bilirubin with normal liver enzymes. Biliary evaluation suggested.',
    'Hypoalbuminemia with mild transaminitis, correlation with clinical status and renal/protein loss status is advised.',
    'Normal liver function panel within physiological limits.'
  ],
  KFT: [
    'Normal renal parameters, Serum Creatinine and Blood Urea are within physiological reference intervals.',
    'Mild elevation of Serum Creatinine and Blood Urea. Follow-up after adequate hydration and eGFR calculation.',
    'Hyperuricemia, dietary modification and hydration recommended, clinical correlation for gouty diathesis.'
  ],
  LIPID: [
    'Desirable lipid profile with normal atherogenic index.',
    'Hypercholesterolemia with elevated LDL-C. Cardiovascular risk evaluation and dietary modification recommended.',
    'Mixed dyslipidemia (Elevated Total Cholesterol and Triglycerides with low HDL-C).',
    'Hypertriglyceridemia, fasting duration and metabolic syndrome correlation recommended.'
  ],
  GLYCEMIC: [
    'Normal fasting and post-prandial glycemic parameters.',
    'Impaired fasting glucose (IFG), pre-diabetes pattern. Lifestyle modification and 3-month HbA1c follow-up advised.',
    'Glycemic results consistent with diabetes mellitus criteria. Clinical correlation and medical follow-up.',
    'HbA1c shows optimal glycemic control over the past 8-12 weeks (< 7.0%).'
  ],
  THYROID: [
    'Euthyroid state: TSH, Free T3, and Free T4 are within euthyroid reference ranges.',
    'Elevated TSH with normal Free T4, findings compatible with Subclinical Hypothyroidism.',
    'Suppressed TSH with elevated Free T4/Free T3, suggestive of Primary Hyperthyroidism.'
  ]
};

export const LAB_CATALOG: CatalogProfileTemplate[] = [
  {
    code: 'CBC',
    titleEn: 'Complete Blood Picture (CBC)',
    titleAr: 'صورة دم كاملة',
    category: 'Hematology',
    sampleType: 'EDTA Whole Blood',
    defaultInterpretation: 'Blood indices are within acceptable physiological limits.',
    parameters: [
      { name: 'Hemoglobin (Hb)', unit: 'g/dL', minNormal: 12.0, maxNormal: 16.5, panicLow: 7.0, panicHigh: 20.0, method: 'Automated SLS-Hb' },
      { name: 'R.B.Cs Count', unit: 'x10^6/µL', minNormal: 4.2, maxNormal: 5.8, method: 'Electrical Impedance' },
      { name: 'Hematocrit (PCV)', unit: '%', minNormal: 36.0, maxNormal: 48.0 },
      { name: 'M.C.V', unit: 'fL', minNormal: 80.0, maxNormal: 98.0 },
      { name: 'M.C.H', unit: 'pg', minNormal: 27.0, maxNormal: 33.0 },
      { name: 'M.C.H.C', unit: 'g/dL', minNormal: 32.0, maxNormal: 36.0 },
      { name: 'R.D.W-CV', unit: '%', minNormal: 11.5, maxNormal: 14.5 },
      { name: 'Platelets Count', unit: 'x10^3/µL', minNormal: 150, maxNormal: 450, panicLow: 50, panicHigh: 1000 },
      { name: 'Total Leucocytic Count (TLC)', unit: 'x10^3/µL', minNormal: 4.0, maxNormal: 11.0, panicLow: 2.0, panicHigh: 30.0 },
      { name: 'Neutrophils %', unit: '%', minNormal: 40, maxNormal: 70 },
      { name: 'Lymphocytes %', unit: '%', minNormal: 20, maxNormal: 45 },
      { name: 'Monocytes %', unit: '%', minNormal: 2, maxNormal: 8 },
      { name: 'Eosinophils %', unit: '%', minNormal: 1, maxNormal: 6 },
      { name: 'Basophils %', unit: '%', minNormal: 0, maxNormal: 1 }
    ]
  },
  {
    code: 'LFT',
    titleEn: 'Liver Function Tests (LFT)',
    titleAr: 'وظائف كبد متكاملة',
    category: 'Clinical Chemistry',
    sampleType: 'Serum',
    defaultInterpretation: 'Enzyme activities and synthetic hepatic markers are within normal limits.',
    parameters: [
      { name: 'ALT (SGPT)', unit: 'U/L', minNormal: 0, maxNormal: 45, method: 'IFCC UV with P5P' },
      { name: 'AST (SGOT)', unit: 'U/L', minNormal: 0, maxNormal: 40, method: 'IFCC UV with P5P' },
      { name: 'Alkaline Phosphatase (ALP)', unit: 'U/L', minNormal: 40, maxNormal: 130 },
      { name: 'Total Bilirubin', unit: 'mg/dL', minNormal: 0.2, maxNormal: 1.2, panicHigh: 5.0 },
      { name: 'Direct Bilirubin', unit: 'mg/dL', minNormal: 0.0, maxNormal: 0.3 },
      { name: 'Total Serum Proteins', unit: 'g/dL', minNormal: 6.4, maxNormal: 8.3 },
      { name: 'Serum Albumin', unit: 'g/dL', minNormal: 3.5, maxNormal: 5.2 },
      { name: 'Serum Globulin', unit: 'g/dL', minNormal: 2.3, maxNormal: 3.5 },
      { name: 'A/G Ratio', unit: 'Ratio', minNormal: 1.2, maxNormal: 2.2 },
      { name: 'G.G.T', unit: 'U/L', minNormal: 9, maxNormal: 48 }
    ]
  },
  {
    code: 'KFT',
    titleEn: 'Kidney Function Profile',
    titleAr: 'وظائف الكلى واليوريا',
    category: 'Clinical Chemistry',
    sampleType: 'Serum',
    defaultInterpretation: 'Renal biomarkers indicate adequate glomerular filtration and nitrogenous clearance.',
    parameters: [
      { name: 'Serum Creatinine', unit: 'mg/dL', minNormal: 0.6, maxNormal: 1.2, panicHigh: 4.0, method: 'Jaffe Modified / Enzymatic' },
      { name: 'Blood Urea', unit: 'mg/dL', minNormal: 15, maxNormal: 45, panicHigh: 120 },
      { name: 'Blood Urea Nitrogen (BUN)', unit: 'mg/dL', minNormal: 7, maxNormal: 20 },
      { name: 'Serum Uric Acid', unit: 'mg/dL', minNormal: 3.5, maxNormal: 7.2 },
      { name: 'eGFR (CKD-EPI)', unit: 'mL/min/1.73m²', minNormal: 90, maxNormal: 120 }
    ]
  },
  {
    code: 'LIPID',
    titleEn: 'Lipid Profile',
    titleAr: 'دهون الدم الشاملة',
    category: 'Clinical Chemistry',
    sampleType: 'Serum (12h Fasting)',
    defaultInterpretation: 'Lipid ratios demonstrate favorable cardiovascular risk stratification.',
    parameters: [
      { name: 'Total Serum Cholesterol', unit: 'mg/dL', minNormal: 120, maxNormal: 200, method: 'CHOD-PAP' },
      { name: 'Serum Triglycerides', unit: 'mg/dL', minNormal: 40, maxNormal: 150, panicHigh: 500, method: 'GPO-PAP' },
      { name: 'HDL - Cholesterol (Good)', unit: 'mg/dL', minNormal: 40, maxNormal: 65 },
      { name: 'LDL - Cholesterol (Calculated)', unit: 'mg/dL', minNormal: 0, maxNormal: 100 },
      { name: 'VLDL - Cholesterol', unit: 'mg/dL', minNormal: 5, maxNormal: 30 },
      { name: 'Total Chol / HDL Ratio', unit: 'Ratio', minNormal: 0, maxNormal: 4.5 },
      { name: 'LDL / HDL Ratio', unit: 'Ratio', minNormal: 0, maxNormal: 3.0 }
    ]
  },
  {
    code: 'GLYCEMIC',
    titleEn: 'Diabetes & Glycemic Assessment',
    titleAr: 'تقييم السكر التراكمي والجلوكوز',
    category: 'Clinical Chemistry',
    sampleType: 'Fluoride Plasma & EDTA Blood',
    defaultInterpretation: 'Glycemic parameters evaluated according to ADA guidelines.',
    parameters: [
      { name: 'Fasting Blood Glucose (FBG)', unit: 'mg/dL', minNormal: 70, maxNormal: 100, panicLow: 50, panicHigh: 300, method: 'Hexokinase / GOD-PAP' },
      { name: 'Post-Prandial Glucose (2h PP)', unit: 'mg/dL', minNormal: 70, maxNormal: 140, panicHigh: 350 },
      { name: 'Random Blood Glucose (RBG)', unit: 'mg/dL', minNormal: 70, maxNormal: 140 },
      { name: 'HbA1c (Glycated Hemoglobin)', unit: '%', minNormal: 4.5, maxNormal: 5.6, method: 'HPLC Certified NGSP' },
      { name: 'Estimated Average Glucose (eAG)', unit: 'mg/dL', minNormal: 70, maxNormal: 115 },
      { name: 'Fasting Serum Insulin', unit: 'µIU/mL', minNormal: 2.6, maxNormal: 24.9 },
      { name: 'HOMA-IR (Insulin Resistance)', unit: 'Index', minNormal: 0.5, maxNormal: 2.0 }
    ]
  },
  {
    code: 'THYROID',
    titleEn: 'Thyroid Hormonal Profile',
    titleAr: 'هرمونات الغدة الدرقية',
    category: 'Endocrinology & Immunology',
    sampleType: 'Serum',
    defaultInterpretation: 'Pituitary-thyroid axis functioning within normal physiological feedback limits.',
    parameters: [
      { name: 'TSH (3rd Generation)', unit: 'µIU/mL', minNormal: 0.35, maxNormal: 4.94, method: 'Chemiluminescence (CLIA)' },
      { name: 'Free T3 (FT3)', unit: 'pg/mL', minNormal: 1.8, maxNormal: 4.2, method: 'CLIA' },
      { name: 'Free T4 (FT4)', unit: 'ng/dL', minNormal: 0.70, maxNormal: 1.48, method: 'CLIA' },
      { name: 'Total T3', unit: 'ng/mL', minNormal: 0.8, maxNormal: 2.0 },
      { name: 'Total T4', unit: 'µg/dL', minNormal: 5.1, maxNormal: 12.0 },
      { name: 'Anti-TPO Antibodies', unit: 'IU/mL', minNormal: 0, maxNormal: 34, textReference: '< 34 IU/mL' }
    ]
  },
  {
    code: 'ELECTROLYTES',
    titleEn: 'Serum Electrolytes & Minerals',
    titleAr: 'أملاح ومعادن الدم',
    category: 'Clinical Chemistry',
    sampleType: 'Serum',
    defaultInterpretation: 'Serum electrolytes balanced with normal acid-base and osmolar homeostasis.',
    parameters: [
      { name: 'Serum Sodium (Na+)', unit: 'mmol/L', minNormal: 136, maxNormal: 145, panicLow: 120, panicHigh: 160, method: 'ISE Direct' },
      { name: 'Serum Potassium (K+)', unit: 'mmol/L', minNormal: 3.5, maxNormal: 5.1, panicLow: 2.8, panicHigh: 6.5, method: 'ISE Direct' },
      { name: 'Serum Chloride (Cl-)', unit: 'mmol/L', minNormal: 98, maxNormal: 107 },
      { name: 'Total Calcium (Ca++)', unit: 'mg/dL', minNormal: 8.5, maxNormal: 10.5, panicLow: 6.5, panicHigh: 13.0 },
      { name: 'Ionized Calcium', unit: 'mmol/L', minNormal: 1.15, maxNormal: 1.33 },
      { name: 'Serum Magnesium', unit: 'mg/dL', minNormal: 1.7, maxNormal: 2.6 },
      { name: 'Serum Phosphorus', unit: 'mg/dL', minNormal: 2.5, maxNormal: 4.5 }
    ]
  },
  {
    code: 'COAGULATION',
    titleEn: 'Coagulation Profile',
    titleAr: 'سيولة وتجلط الدم',
    category: 'Hematology',
    sampleType: 'Citrated Plasma',
    defaultInterpretation: 'Extrinsic and intrinsic coagulation cascade pathways are intact.',
    parameters: [
      { name: 'Prothrombin Time (PT)', unit: 'Seconds', minNormal: 11.0, maxNormal: 14.0 },
      { name: 'Control PT', unit: 'Seconds', minNormal: 11.5, maxNormal: 12.5, textReference: '12.0 Seconds' },
      { name: 'Prothrombin Concentration (PC%)', unit: '%', minNormal: 70, maxNormal: 100 },
      { name: 'I.N.R', unit: 'Ratio', minNormal: 0.9, maxNormal: 1.15, panicHigh: 4.5 },
      { name: 'Activated PTT (APTT)', unit: 'Seconds', minNormal: 26, maxNormal: 38 },
      { name: 'D-Dimer (Quantitative)', unit: 'µg/mL FEU', minNormal: 0, maxNormal: 0.5, textReference: '< 0.50 µg/mL FEU' }
    ]
  },
  {
    code: 'ANEMIA_VITAMINS',
    titleEn: 'Anemia & Vitamin Status',
    titleAr: 'مخزون الحديد وفيتامينات الدم',
    category: 'Clinical Chemistry & Immunology',
    sampleType: 'Serum',
    defaultInterpretation: 'Iron stores and essential hematinic vitamins are sufficient.',
    parameters: [
      { name: 'Serum Ferritin', unit: 'ng/mL', minNormal: 30, maxNormal: 300, method: 'CLIA' },
      { name: 'Serum Iron', unit: 'µg/dL', minNormal: 60, maxNormal: 170 },
      { name: 'Total Iron Binding Capacity (TIBC)', unit: 'µg/dL', minNormal: 250, maxNormal: 450 },
      { name: 'Transferrin Saturation', unit: '%', minNormal: 20, maxNormal: 50 },
      { name: 'Vitamin D3 (25-OH Total)', unit: 'ng/mL', minNormal: 30, maxNormal: 100, method: 'CLIA' },
      { name: 'Vitamin B12 (Cyanocobalamin)', unit: 'pg/mL', minNormal: 200, maxNormal: 900 }
    ]
  },
  {
    code: 'INFLAMMATORY',
    titleEn: 'Inflammatory & Serological Markers',
    titleAr: 'دلالات الالتهاب والروماتيزم',
    category: 'Immunology',
    sampleType: 'Serum & ESR Whole Blood',
    defaultInterpretation: 'No significant acute phase reactant elevation detected.',
    parameters: [
      { name: 'C-Reactive Protein (CRP) Quantitative', unit: 'mg/L', minNormal: 0, maxNormal: 6.0, textReference: '< 6.0 mg/L', method: 'Turbidimetric High-Sensitivity' },
      { name: 'E.S.R (1st Hour)', unit: 'mm/1st hr', minNormal: 0, maxNormal: 15 },
      { name: 'E.S.R (2nd Hour)', unit: 'mm/2nd hr', minNormal: 0, maxNormal: 25 },
      { name: 'Rheumatoid Factor (RF)', unit: 'IU/mL', minNormal: 0, maxNormal: 14, textReference: 'Negative (< 14 IU/mL)' },
      { name: 'A.S.O.T (Anti-Streptolysin O)', unit: 'IU/mL', minNormal: 0, maxNormal: 200, textReference: '< 200 IU/mL' }
    ]
  },
  {
    code: 'URINE_ANALYSIS',
    titleEn: 'Complete Urine Examination',
    titleAr: 'فحص البول الكامل',
    category: 'Clinical Microscopy',
    sampleType: 'Clean Catch Midstream Urine',
    defaultInterpretation: 'Normal physical, biochemical and microscopic urinary examination.',
    parameters: [
      { name: 'Color', unit: '', textReference: 'Pale Yellow / Amber' },
      { name: 'Aspect / Clarity', unit: '', textReference: 'Clear' },
      { name: 'Specific Gravity', unit: '', minNormal: 1.010, maxNormal: 1.025, textReference: '1.015 - 1.025' },
      { name: 'Reaction (pH)', unit: 'pH', minNormal: 5.0, maxNormal: 7.5, textReference: '5.5 - 6.5' },
      { name: 'Albumin (Protein)', unit: '', textReference: 'Nil / Negative' },
      { name: 'Glucose (Sugar)', unit: '', textReference: 'Nil / Negative' },
      { name: 'Ketone Bodies (Acetone)', unit: '', textReference: 'Nil / Negative' },
      { name: 'Bile Pigments / Bilirubin', unit: '', textReference: 'Negative' },
      { name: 'Urobilinogen', unit: '', textReference: 'Normal (< 1.0 mg/dL)' },
      { name: 'Nitrite', unit: '', textReference: 'Negative' },
      { name: 'Pus Cells (WBCs)', unit: '/HPF', minNormal: 0, maxNormal: 5, textReference: '1 - 4 / HPF' },
      { name: 'Red Blood Cells (RBCs)', unit: '/HPF', minNormal: 0, maxNormal: 3, textReference: '0 - 2 / HPF' },
      { name: 'Epithelial Cells', unit: '/HPF', textReference: 'Few / HPF' },
      { name: 'Crystals', unit: '', textReference: 'Nil' },
      { name: 'Casts', unit: '', textReference: 'Nil' },
      { name: 'Bacteria', unit: '', textReference: 'Nil' }
    ]
  },
  {
    code: 'HORMONES',
    titleEn: 'Fertility & Reproductive Hormones',
    titleAr: 'هرمونات الخصوبة والذكورة والأنوثة',
    category: 'Endocrinology',
    sampleType: 'Serum',
    parameters: [
      { name: 'Serum Prolactin', unit: 'ng/mL', minNormal: 4.8, maxNormal: 23.3, method: 'CLIA' },
      { name: 'FSH (Follicle Stimulating)', unit: 'mIU/mL', minNormal: 3.5, maxNormal: 12.5 },
      { name: 'LH (Luteinizing Hormone)', unit: 'mIU/mL', minNormal: 2.4, maxNormal: 12.6 },
      { name: 'Estradiol (E2)', unit: 'pg/mL', minNormal: 20, maxNormal: 160 },
      { name: 'Total Serum Testosterone', unit: 'ng/dL', minNormal: 240, maxNormal: 850 },
      { name: 'Free Testosterone', unit: 'pg/mL', minNormal: 8.7, maxNormal: 25.1 },
      { name: 'AMH (Anti-Mullerian Hormone)', unit: 'ng/mL', minNormal: 1.0, maxNormal: 4.0 },
      { name: 'Total Beta-hCG (Quantitative)', unit: 'mIU/mL', minNormal: 0, maxNormal: 5.0, textReference: '< 5.0 mIU/mL (Non-pregnant)' }
    ]
  },
  {
    code: 'TUMOR_MARKERS',
    titleEn: 'Tumor Biomarkers',
    titleAr: 'دلالات الأورام التشخيصية',
    category: 'Oncology / Immunology',
    sampleType: 'Serum',
    parameters: [
      { name: 'Total P.S.A (Prostate)', unit: 'ng/mL', minNormal: 0, maxNormal: 4.0, textReference: '< 4.0 ng/mL' },
      { name: 'Free P.S.A', unit: 'ng/mL', minNormal: 0, maxNormal: 0.9, textReference: '< 0.90 ng/mL' },
      { name: 'Free / Total PSA Ratio', unit: '%', minNormal: 25, maxNormal: 100, textReference: '> 25%' },
      { name: 'C.E.A (Carcinoembryonic)', unit: 'ng/mL', minNormal: 0, maxNormal: 3.0, textReference: '< 3.0 ng/mL (Non-smokers)' },
      { name: 'CA 19-9 (Pancreato-biliary)', unit: 'U/mL', minNormal: 0, maxNormal: 37, textReference: '< 37 U/mL' },
      { name: 'CA 125 (Ovarian)', unit: 'U/mL', minNormal: 0, maxNormal: 35, textReference: '< 35 U/mL' },
      { name: 'CA 15-3 (Breast)', unit: 'U/mL', minNormal: 0, maxNormal: 30, textReference: '< 30 U/mL' },
      { name: 'Alpha-Fetoprotein (AFP)', unit: 'ng/mL', minNormal: 0, maxNormal: 8.0, textReference: '< 8.0 ng/mL' }
    ]
  }
];
