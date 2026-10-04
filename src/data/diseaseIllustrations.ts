import { DiseaseIllustration } from '../types';

export const DISEASE_ILLUSTRATIONS: DiseaseIllustration[] = [
  // ==========================================
  // HEMATOLOGY / CBC MICROSCOPIC DISEASE CARDS
  // ==========================================
  {
    id: "hem-normal",
    code: "HEM_NORMAL",
    category: "hematology",
    titleAr: "شريحة دم محيطي طبيعية (Normal Peripheral Blood Smear)",
    titleEn: "Normal Peripheral Blood Smear",
    pathologySummaryAr: "كرات دم حمراء طبيعية الحجم ومتساوية الصبغ (Normocytic Normochromic) مع مساحة شحوب مركزي طبيعية تعادل ثلث قطر الخلية، مع توزيع طبيعي لكرات الدم البيضاء والصفائح الدموية.",
    pathologySummaryEn: "Normocytic, normochromic erythrocytes with normal central pallor (~1/3 diameter). Adequate platelets and normal differential leucocytic morphology.",
    keyDiagnosticPoints: [
      "MCV: 80 - 98 fL | MCH: 27 - 33 pg | MCHC: 32 - 36 g/dL",
      "RBCs: uniform size and biconcave disc shape",
      "WBC differential within normal reference intervals",
      "Platelets: 150 - 450 x10^3/µL with normal granular appearance"
    ],
    associatedConditions: ["Physiological Baseline", "Healthy Reference", "Routine Wellness"],
    differentialDiagnosis: "No cytopenias or dysplastic features identified."
  },
  {
    id: "hem-iron-deficiency",
    code: "HEM_IDA",
    category: "hematology",
    titleAr: "أنيميا نقص الحديد (Iron Deficiency Anemia)",
    titleEn: "Microcytic Hypochromic Anemia (Iron Deficiency)",
    pathologySummaryAr: "صورة كرات دم حمراء صغيرة الحجم وشديدة الشحوب (Microcytic Hypochromic) مع اتساع واضح للشحوب المركزي وخلايا قلمية مميزة (Pencil / Cigar cells) وتباين في الأحجام (Anisocytosis) وارتفاع مؤشر RDW ومؤشر منتزر > 13.",
    pathologySummaryEn: "Marked microcytosis and hypochromia with exaggerated central pallor, pencil/cigar-shaped elliptocytes, elevated RDW (>15%), and Mentzer Index > 13.",
    keyDiagnosticPoints: [
      "Low Hemoglobin, Low MCV (< 80 fL), Low MCH (< 27 pg)",
      "High RDW-CV (> 15%) reflecting marked anisocytosis",
      "Mentzer Index (MCV / RBC) > 13",
      "Pencil cells (cigar cells) and teardrop cells seen on blood film",
      "Low Serum Ferritin & Low Iron with elevated TIBC"
    ],
    associatedConditions: ["Chronic blood loss (GI / Menorrhagia)", "Poor dietary iron intake", "Malabsorption / Celiac disease"],
    differentialDiagnosis: "Beta Thalassemia Minor (distinguished by Mentzer < 13, normal RDW, and HbA2 > 3.5%)."
  },
  {
    id: "hem-thalassemia",
    code: "HEM_THAL",
    category: "hematology",
    titleAr: "أنيميا البحر المتوسط (ثلاسيميا بيتا - Beta Thalassemia)",
    titleEn: "Beta Thalassemia Minor / Trait",
    pathologySummaryAr: "صغر واضح في حجم كرات الدم الحمراء (Microcytosis) مع وفرة عددية في كرات الدم الحمراء بالنسبة لنسبة الهيموجلوبين، وخلايا هدفية كلاسيكية (Target cells / Codocytes) مع تنقيط قاعدي مميز (Basophilic Stippling) ومؤشر منتزر أقل من 13.",
    pathologySummaryEn: "Profound microcytosis out of proportion to mild anemia, frequent Target cells (codocytes), basophilic stippling, normal to slightly elevated RDW, and Mentzer Index < 13.",
    keyDiagnosticPoints: [
      "Mentzer Index (MCV / RBC) < 13 (Highly suggestive of Thalassemia Trait)",
      "Target cells (bullseye appearance) prominent on peripheral smear",
      "Coarse basophilic stippling of erythrocytes",
      "Normal or mildly elevated serum ferritin level",
      "Confirmed via Hemoglobin Electrophoresis (Elevated HbA2 > 3.5%)"
    ],
    associatedConditions: ["Beta Thalassemia Minor (Trait)", "Hemoglobin E disease", "Alpha Thalassemia trait"],
    differentialDiagnosis: "Iron Deficiency Anemia (Ferritin low, Mentzer > 13, RDW markedly elevated)."
  },
  {
    id: "hem-megaloblastic",
    code: "HEM_MEGALO",
    category: "hematology",
    titleAr: "الأنيميا الخبيثة ونقص فيتامين ب12 والفوليك (Megaloblastic Anemia)",
    titleEn: "Megaloblastic Anemia (Vitamin B12 / Folate Deficiency)",
    pathologySummaryAr: "صورة كرات دم حمراء كروية بيضاوية ضخمة (Macro-ovalocytes) مع ارتفاع ملحوظ في الحجم الكروي الوسطي (MCV > 100 fL) مع خلايا متعادلة مفرطة التفصص (Hypersegmented Neutrophils تحوي 6 فصوص أو أكثر).",
    pathologySummaryEn: "Macro-ovalocytic erythrocytes with elevated MCV (> 100-115 fL), accompanied by pathognomonic hypersegmented neutrophils (>= 6 nuclear lobes) and pancytopenia.",
    keyDiagnosticPoints: [
      "High MCV (> 100 to 125 fL) with macro-ovalocytes",
      "Hypersegmented polymorphonuclear leukocytes (>= 5 lobes in > 5% of neutrophils or single 6-lobed)",
      "Howell-Jolly bodies (nuclear remnants) and Cabot rings",
      "Low Vitamin B12 (< 200 pg/mL) or low Serum / RBC Folate",
      "Markedly elevated serum LDH and indirect bilirubin (ineffective erythropoiesis)"
    ],
    associatedConditions: ["Pernicious anemia (Anti-Intrinsic Factor)", "Vegan dietary restriction", "Metformin or PPI long-term use"],
    differentialDiagnosis: "Non-megaloblastic macrocytosis (Liver disease, alcoholism, hypothyroidism, reticulocytosis)."
  },
  {
    id: "hem-sickle",
    code: "HEM_SICKLE",
    category: "hematology",
    titleAr: "أنيميا الخلايا المنجلية (Sickle Cell Anemia - HbSS)",
    titleEn: "Sickle Cell Disease (Drepanocytosis)",
    pathologySummaryAr: "خلايا منجلية مقوسة مميزة حادة الأطراف (Sickle cells / Drepanocytes) ناتجة عن بلمرة هيموجلوبين S عند نقص الأكسجين، مع خلايا هدفية وأجسام هاول-جولي المصاحبة لقصور الطحال.",
    pathologySummaryEn: "Crescent-shaped elongated sickle cells (drepanocytes) with pointed ends due to HbS polymerization, target cells, and Howell-Jolly bodies reflecting autosplenectomy.",
    keyDiagnosticPoints: [
      "Classic sickle / crescentic RBCs on film with pointed tips",
      "Target cells, polychromasia, and nucleated RBCs in peripheral blood",
      "Howell-Jolly bodies reflecting functional autosplenectomy",
      "Positive Sickling Test & Hemoglobin Electrophoresis (HbS > 80% in HbSS)",
      "High Reticulocyte count and elevated unconjugated bilirubin"
    ],
    associatedConditions: ["Vaso-occlusive pain crisis", "Acute chest syndrome", "Hemolytic jaundice"],
    differentialDiagnosis: "Sickle-Thalassemia, Hemoglobin SC disease."
  },
  {
    id: "hem-spherocytosis",
    code: "HEM_SPHERO",
    category: "hematology",
    titleAr: "الخلايا الكروية الوراثية (Hereditary Spherocytosis)",
    titleEn: "Hereditary Spherocytosis & Immune Hemolysis",
    pathologySummaryAr: "كرات دم حمراء دائرية كثيفة الصبغة صغيرة القطر وتفتقر تماماً لمساحة الشحوب المركزي (Spherocytes) مع ارتفاع ملحوظ في مؤشر تركيز الهيموجلوبين MCHC (> 36 g/dL).",
    pathologySummaryEn: "Dense, spherical erythrocytes without central pallor (spherocytes) caused by RBC membrane defects, with elevated MCHC (> 36 g/dL) and reticulocytosis.",
    keyDiagnosticPoints: [
      "Microspherocytes on peripheral film (dense round cells lacking central pallor)",
      "Elevated MCHC (> 36 g/dL - pathognomonic parameter)",
      "Increased Osmotic Fragility and positive eosin-5-maleimide (EMA) binding test",
      "Elevated Reticulocyte count (> 5-10%)",
      "Negative Direct Antiglobulin Test (DAT/Coombs) differentiates from autoimmune hemolysis"
    ],
    associatedConditions: ["Hereditary spherocytosis (Spectrin / Ankyrin defect)", "Autoimmune Hemolytic Anemia (AIHA - Coombs positive)"],
    differentialDiagnosis: "Autoimmune hemolytic anemia (Warm AIHA with positive direct Coombs test)."
  },
  {
    id: "hem-sepsis",
    code: "HEM_SEPSIS",
    category: "hematology",
    titleAr: "العدوى البكتيرية الشديدة ورد الفعل الابيضاضي (Bacterial Sepsis / Leukemoid Reaction)",
    titleEn: "Bacterial Sepsis & Leukemoid Reaction (Left Shift)",
    pathologySummaryAr: "زيادة كبيرة في عدد كرات الدم البيضاء المتعادلة مع انحراف لليسار (Shift to the Left: ظهور أشكال العصيات Band cells وخلايا Metamyelocytes) مع حبيبات سامة داكنة (Toxic Granulations) وفجوات سيتوبلازمية (Vacuoles) وأجسام دولي (Döhle bodies).",
    pathologySummaryEn: "Neutrophilic leukocytosis with significant left shift (elevated Band forms > 10%), coarse dark toxic granulations, cytoplasmic vacuolation, and Döhle bodies.",
    keyDiagnosticPoints: [
      "Total Leucocytic Count (TLC) marked elevation (> 15,000 - 30,000 /µL)",
      "High Absolute Neutrophil Count (ANC) and elevated NLR (> 5 - 15)",
      "Toxic granulation: coarse basophilic granules in neutrophil cytoplasm",
      "Döhle bodies: light blue cytoplasmic inclusions (ribosomal RNA remnants)",
      "High Leukocyte Alkaline Phosphatase (LAP) score (differs from CML)"
    ],
    associatedConditions: ["Severe bacterial pneumonia", "Bacteremia & septic shock", "Acute abdominal peritonitis"],
    differentialDiagnosis: "Chronic Myeloid Leukemia (distinguished by low LAP score and BCR-ABL translocation)."
  },
  {
    id: "hem-mono",
    code: "HEM_MONO",
    category: "hematology",
    titleAr: "داء وحيدات النواة الخمجي (Infectious Mononucleosis - EBV)",
    titleEn: "Infectious Mononucleosis (Atypical Reactive Lymphocytes)",
    pathologySummaryAr: "ارتفاع عدد كرات الدم البيضاء الليمفاوية مع ظهور خلايا ليمفاوية تحفيزية مميزة (Atypical / Downey Lymphocytes) ذات حجم كبير وسيتوبلازم واسع متعرج يحيط بكرات الدم الحمراء المجاورة (Scalloped borders).",
    pathologySummaryEn: "Absolute lymphocytosis with prominent atypical / reactive Downey lymphocytes characterized by copious basophilic cytoplasm conforming to surrounding RBCs.",
    keyDiagnosticPoints: [
      "Absolute Lymphocyte Count (ALC) > 4,000 /µL with atypical lymphocytes > 10-20%",
      "Reactive lymphocytes with scalloped borders indented by erythrocytes",
      "Positive Paul-Bunnell / Monospot heterophile antibody test",
      "Elevated EBV IgM / VCA titers",
      "Mild concomitant elevation of hepatic transaminases (ALT/AST)"
    ],
    associatedConditions: ["Epstein-Barr Virus (EBV) infection", "Cytomegalovirus (CMV)", "Acute Viral Hepatitis"],
    differentialDiagnosis: "Acute lymphoblastic leukemia (distinguished by uniform immature blast morphology)."
  },
  {
    id: "hem-aml",
    code: "HEM_AML",
    category: "hematology",
    titleAr: "سرطان الدم النخاعي الحاد (Acute Myeloid Leukemia - AML)",
    titleEn: "Acute Myeloid Leukemia (AML)",
    pathologySummaryAr: "وجود أرومات نخاعية غير ناضجة (Myeloblasts) تشغل مساحة واسعة مع نسبة نواة لسيتوبلازم مرتفعة (High N:C ratio) وأنوية متعددة واضحة، مع ظهور عصي آور المميزة (Auer rods) في السيتوبلازم مع نقص شديد في الصفائح الدموية وفقر دم حاد.",
    pathologySummaryEn: "Presence of large myeloblasts with delicate chromatin, prominent nucleoli, high N:C ratio, and pathognomonic red-pink Auer rods in the cytoplasm, accompanied by severe thrombocytopenia.",
    keyDiagnosticPoints: [
      "Blasts in peripheral blood >= 20% of nucleated cells",
      "Auer rods: crystallized peroxidase granules (pathognomonic of AML)",
      "Severe anemia and severe thrombocytopenia (< 50,000 /µL) with hemorrhagic tendency",
      "Myeloperoxidase (MPO) cytochemical staining positive",
      "Flow cytometry: CD13, CD33, CD34, CD117 positive"
    ],
    associatedConditions: ["Acute primary myeloid leukemia", "Secondary leukemic transformation from MDS", "Therapy-related AML"],
    differentialDiagnosis: "ALL, Acute promyelocytic leukemia (APML with faggot cells and t(15;17))."
  },
  {
    id: "hem-cll",
    code: "HEM_CLL",
    category: "hematology",
    titleAr: "سرطان الدم الليمفاوي المزمن (Chronic Lymphocytic Leukemia - CLL)",
    titleEn: "Chronic Lymphocytic Leukemia (CLL)",
    pathologySummaryAr: "زيادة ليمفاوية شديدة ورتيبة من خلايا ليمفاوية صغيرة ناضجة المظهر مع تكتل كروماتيني نمطي (Soccer ball chromatin) ووفرة خلايا ملطخة مميزة (Smudge / Basket / Gumprecht cells) ناتجة عن هشاشة الخلايا السرطانية.",
    pathologySummaryEn: "Monotonous proliferation of mature-appearing small lymphocytes with clumped chromatin, along with abundant fragile smudge (basket) cells.",
    keyDiagnosticPoints: [
      "Persistent absolute monoclonal lymphocytosis > 5,000 /µL (often > 20,000 - 100,000)",
      "Smudge / Basket cells (Gumprecht shadows) readily visible on blood smear",
      "Small mature lymphocytes with dense cracked/checkerboard chromatin",
      "Flow cytometry co-expression: CD5+, CD19+, CD20 (dim), CD23+, and weak surface Ig",
      "Gradual painless lymphadenopathy and splenomegaly"
    ],
    associatedConditions: ["B-cell chronic lymphocytic leukemia", "Small lymphocytic lymphoma (SLL)", "Autoimmune hemolytic anemia complication"],
    differentialDiagnosis: "Mantle cell lymphoma, Prolymphocytic leukemia, Reactive viral lymphocytosis."
  },
  {
    id: "hem-cml",
    code: "HEM_CML",
    category: "hematology",
    titleAr: "سرطان الدم النخاعي المزمن (Chronic Myeloid Leukemia - CML)",
    titleEn: "Chronic Myeloid Leukemia (CML)",
    pathologySummaryAr: "زيادة هائلة في عدد كرات الدم البيضاء (غالباً > 50,000 - 200,000) مع ظهور السلسلة النخاعية المحببة بأكملها في الدم المحيطي (أرومات، طلائع نقوية، خلايا نقوية، شبه نقوية، وعصيات) مع زيادة مميزة في الخلايا القاعدية (Basophilia).",
    pathologySummaryEn: "Dramatic leukocytosis (> 50,000 to > 200,000 /µL) displaying the full spectrum of myeloid differentiation: myeloblasts, promyelocytes, myelocytes, metamyelocytes, bands, and prominent basophilia.",
    keyDiagnosticPoints: [
      "Myelocyte bulge (myelocytes exceed metamyelocytes)",
      "Marked basophilia (> 2-5%) and eosinophilia",
      "Extremely low or absent Leukocyte Alkaline Phosphatase (LAP / NAP) score",
      "Presence of Philadelphia Chromosome t(9;22) and BCR-ABL1 fusion transcript",
      "Massive splenomegaly"
    ],
    associatedConditions: ["Chronic phase CML", "Accelerated phase / Blast crisis risk", "Myeloproliferative neoplasm (MPN)"],
    differentialDiagnosis: "Leukemoid reaction (distinguished by high LAP score, toxic granulation, and absent BCR-ABL)."
  },
  {
    id: "hem-itp",
    code: "HEM_ITP",
    category: "hematology",
    titleAr: "نقص الصفائح المناعي والصفائح العملاقة (Immune Thrombocytopenic Purpura - ITP)",
    titleEn: "Immune Thrombocytopenia (ITP) & Giant Platelets",
    pathologySummaryAr: "نقص حاد في عدد الصفائح الدموية المحيطية (< 20,000 - 50,000) مع وجود صفائح دموية عملاقة نشطة (Giant / Megathrombocytes) تدل على تعويض نخاعي نشط لتعويض التكسير المناعي.",
    pathologySummaryEn: "Marked isolated peripheral thrombocytopenia with occasional giant macrothrombocytes reflecting accelerated megakaryocytic turnover in response to immune destruction.",
    keyDiagnosticPoints: [
      "Isolated thrombocytopenia (< 100,000 down to < 20,000 /µL)",
      "Normal WBC count and normal RBC morphology (unless secondary to hemorrhage)",
      "Giant platelets (diameter exceeding that of normal erythrocytes)",
      "Elevated MPV (Mean Platelet Volume) and elevated Immature Platelet Fraction (IPF)",
      "Absence of schistocytes (rules out TTP/HUS/DIC)"
    ],
    associatedConditions: ["Primary Autoimmune ITP", "Secondary ITP (SLE, Hepatitis C, Helicobacter pylori, HIV)"],
    differentialDiagnosis: "Thrombotic Thrombocytopenic Purpura (TTP - schistocytes present), Pseudothrombocytopenia (EDTA platelet clumping)."
  },

  // ==========================================
  // PATHOLOGICAL INFOGRAMS FOR OTHER LAB TESTS
  // ==========================================
  {
    id: "inf-lft",
    code: "INF_LFT",
    category: "biochemistry",
    titleAr: "إنفوجرام تشخيص أمراض الكبد واليرقان (Liver Pathology Infogram)",
    titleEn: "Hepatocellular Damage vs. Cholestasis Infogram",
    pathologySummaryAr: "مخطط تفريقي سريري بين أذية الخلايا الكبدية (ارتفاع سائد في ALT و AST مثل التهابات الكبد الفيروسية والسمية) وبين ركود الصفراء والانسداد المراري (ارتفاع سائد في ALP و GGT والبيليروبين المباشر).",
    pathologySummaryEn: "Clinical diagnostic flowchart distinguishing Hepatocellular pattern (ALT/AST predominance) from Cholestatic / Biliary Obstructive pattern (ALP/GGT and Direct Bilirubin predominance).",
    keyDiagnosticPoints: [
      "Hepatocellular Pattern: ALT > AST markedly elevated (> 5-10x) in viral/acute hepatitis",
      "Alcoholic Liver Disease: AST/ALT ratio > 2.0 with elevated GGT",
      "Cholestatic Pattern: Marked elevation of ALP (> 3x) and GGT with high Direct Bilirubin",
      "Synthetic Liver Function: Serum Albumin and PT/INR reflect hepatic synthetic capacity",
      "Isolated indirect hyperbilirubinemia: Gilbert syndrome or hemolytic state"
    ],
    associatedConditions: ["Viral Hepatitis A/B/C", "NAFLD / NASH", "Gallbladder obstruction / Cholelithiasis", "Cirrhosis"],
    differentialDiagnosis: "Hepatic vs Post-hepatic Jaundice, Toxic drug injury vs viral hepatitis."
  },
  {
    id: "inf-kft",
    code: "INF_KFT",
    category: "biochemistry",
    titleAr: "إنفوجرام القصور الكلوي ومراحل الترشيح الكبيبي (Kidney Function & eGFR Infogram)",
    titleEn: "Kidney Disease Stages & Azotemia Differential Infogram",
    pathologySummaryAr: "مخطط درجات القصور الكلوي المزمن (CKD Stages 1-5) المبني على معدل الترشيح الكبيبي المحسوب (eGFR) والتفريق بين القصور قبل الكلوي والكلوي وبعد الكلوي عبر نسبة اليوريا للكرياتينين.",
    pathologySummaryEn: "Clinical infographic detailing Chronic Kidney Disease (CKD) staging (eGFR stages 1 to 5) and differential azotemia evaluation using BUN-to-Creatinine ratio and urine sediment.",
    keyDiagnosticPoints: [
      "Stage 1: eGFR >= 90 (normal with kidney damage) | Stage 2: eGFR 60 - 89 (mild)",
      "Stage 3: eGFR 30 - 59 (moderate CKD) | Stage 4: eGFR 15 - 29 (severe CKD)",
      "Stage 5: eGFR < 15 mL/min/1.73m² (End-Stage Renal Disease - ESRD)",
      "Prerenal Azotemia: BUN/Creatinine ratio > 20:1 with high urine osmolality",
      "Intrinsic Renal Failure: BUN/Creatinine ratio 10-15:1 with granular casts",
      "Serum Uric Acid: Hyperuricemia leading to gouty nephropathy or nephrolithiasis"
    ],
    associatedConditions: ["Diabetic Nephropathy", "Hypertensive Nephrosclerosis", "Glomerulonephritis", "Acute Tubular Necrosis"],
    differentialDiagnosis: "Prerenal dehydration vs intrinsic ATN vs postrenal obstruction."
  },
  {
    id: "inf-lipid",
    code: "INF_LIPID",
    category: "biochemistry",
    titleAr: "إنفوجرام تصلب الشرايين ومخاطر الدهون (Atherosclerosis & Lipid Target Infogram)",
    titleEn: "Lipid Profile & Cardiovascular Risk Infogram",
    pathologySummaryAr: "مخطط مرئي لمراحل تكون اللويحة التصلبية الشريانية الناتجة عن أكسدة كوليسترول LDL وترسب الخلايا الرغوية (Foam cells)، مع حدود الأهداف العلاجية للدهون طبقاً للتوصيات العالمية.",
    pathologySummaryEn: "Visual pathophysiological timeline of atherosclerosis: endothelial injury -> oxidized LDL accumulation -> macrophage foam cell formation -> fibrous cap plaque rupture.",
    keyDiagnosticPoints: [
      "Total Cholesterol: Desirable < 200 mg/dL | Borderline: 200-239 | High >= 240",
      "LDL-C (Bad): Optimal < 100 mg/dL (< 70 or < 55 in very high risk CAD patients)",
      "HDL-C (Protective): > 40 mg/dL in males, > 50 mg/dL in females",
      "Triglycerides: Normal < 150 mg/dL | High 200-499 | Very high >= 500 (Pancreatitis risk)",
      "Non-HDL-C: Total Cholesterol minus HDL (Comprehensive atherogenic particle estimate)"
    ],
    associatedConditions: ["Coronary Artery Disease (CAD)", "Metabolic Syndrome", "Familial Hypercholesterolemia"],
    differentialDiagnosis: "Primary vs Secondary dyslipidemia (Hypothyroidism, Nephrotic syndrome, Diabetes)."
  },
  {
    id: "inf-glycemic",
    code: "INF_GLYCEMIC",
    category: "endocrinology",
    titleAr: "إنفوجرام سكر الدم والتراكمي ومقاومة الإنسولين (Glycemic Control & HbA1c Infogram)",
    titleEn: "Diabetes Diagnosis & 90-Day HbA1c Glycation Infogram",
    pathologySummaryAr: "مخطط بيولوجي يوضح ارتباط الجلوكوز بهيموجلوبين كرات الدم الحمراء طوال دورة حياتها البالغة 90-120 يوماً، مع معايير الجمعية الأمريكية للسكري (ADA) لتشخيص السكري وما قبل السكري ومؤشر HOMA-IR.",
    pathologySummaryEn: "Biological illustration of hemoglobin non-enzymatic glycation over RBC lifespan (90-120 days), with ADA diagnostic cutoffs for diabetes, prediabetes, and insulin resistance index.",
    keyDiagnosticPoints: [
      "Normal: Fasting < 100 mg/dL | 2h PPBS < 140 mg/dL | HbA1c < 5.7%",
      "Prediabetes: Fasting 100 - 125 | 2h PPBS 140 - 199 | HbA1c 5.7% - 6.4%",
      "Diabetes Mellitus: Fasting >= 126 | 2h PPBS >= 200 | HbA1c >= 6.5%",
      "HOMA-IR (Insulin Resistance): (Fasting Glucose mg/dL × Fasting Insulin µIU/mL) / 405",
      "HOMA-IR > 2.5 indicates significant insulin resistance"
    ],
    associatedConditions: ["Type 1 Diabetes Mellitus", "Type 2 Diabetes Mellitus", "Gestational Diabetes", "Metabolic Syndrome"],
    differentialDiagnosis: "Impaired Fasting Glucose vs Impaired Glucose Tolerance vs Stress Hyperglycemia."
  },
  {
    id: "inf-thyroid",
    code: "INF_THYROID",
    category: "endocrinology",
    titleAr: "إنفوجرام محور الغدة الدرقية والتغذية الراجعة (Thyroid HPT Axis Infogram)",
    titleEn: "Hypothalamic-Pituitary-Thyroid (HPT) Feedback Axis",
    pathologySummaryAr: "مخطط فسيولوجي للتغذية الراجعة السلبية لهرمونات الغدة الدرقية (FT3 و FT4) على الغدة النخامية (TSH) ومصفوفة تشخيص خمول ونشاط الغدة الأولي وتحت الإكلينيكي.",
    pathologySummaryEn: "Physiological feedback diagram illustrating HPT axis and diagnostic matrix for Primary Hypothyroidism, Subclinical Hypothyroidism, Hyperthyroidism, and Pituitary adenoma.",
    keyDiagnosticPoints: [
      "Primary Hypothyroidism: Elevated TSH with decreased Free T4 and Free T3",
      "Subclinical Hypothyroidism: Elevated TSH with normal Free T4 (monitor Anti-TPO)",
      "Primary Hyperthyroidism / Thyrotoxicosis: Suppressed TSH (< 0.05) with elevated FT4 / FT3",
      "Subclinical Hyperthyroidism: Suppressed TSH with normal Free T4",
      "Secondary (Central) Thyroid Failure: Low / Normal TSH with Low Free T4",
      "Anti-TPO & Anti-TG antibodies: Elevated in Hashimoto thyroiditis and Graves disease"
    ],
    associatedConditions: ["Hashimoto Thyroiditis", "Graves Disease", "Toxic Multinodular Goiter", "Subacute Thyroiditis"],
    differentialDiagnosis: "Primary vs Secondary thyroid dysfunction, Euthyroid Sick Syndrome."
  },
  {
    id: "inf-urine",
    code: "INF_URINE",
    category: "microscopy",
    titleAr: "إنفوجرام الفحص المجهري لرواسب البول (Urinary Sediment Microscopy Infogram)",
    titleEn: "Urine Microscopic Sediment Atlas Infogram",
    pathologySummaryAr: "دليل مرئي مجهري للبلورات (أوكزالات كالسيوم، يوريك أسيد، فوسفات ثلاثي) والأسطوانات (شفافة، حبيبية، كلوية، صديدية) وخلايا الصديد والدم والظهارية.",
    pathologySummaryEn: "Illustrated microscopic atlas of urinary sediment elements including crystals (calcium oxalate, uric acid, triple phosphate), casts (hyaline, granular, RBC, WBC casts), and cells.",
    keyDiagnosticPoints: [
      "Calcium Oxalate Crystals: Envelope-shaped (dihydrate) or dumbbell-shaped (monohydrate)",
      "Uric Acid Crystals: Diamond, rosette, or rhomboid under acidic urine pH",
      "Triple Phosphate Crystals: Coffin-lid appearance in alkaline urine (Proteus UTI)",
      "RBC Casts: Pathognomonic of acute glomerulonephritis",
      "WBC Casts: Differentiates acute pyelonephritis from lower cystitis",
      "Pus Cells (Pyuria): > 5 / HPF indicates urinary tract inflammation / infection"
    ],
    associatedConditions: ["Urinary Tract Infection (UTI)", "Urolithiasis / Kidney Stones", "Glomerulonephritis", "Interstitial Nephritis"],
    differentialDiagnosis: "Glomerular vs Non-glomerular hematuria (Dysmorphic RBCs and RBC casts)."
  },
  {
    id: "inf-stool",
    code: "INF_STOOL",
    category: "parasitology",
    titleAr: "إنفوجرام طفيليات وبويضات البراز (Stool Parasitology & Microscopy Infogram)",
    titleEn: "Stool Parasites, Cysts, and Occult Blood Infogram",
    pathologySummaryAr: "مخطط مجهري لطفيليات الجهاز الهضمي: أكياس وأطوار الأميبا النشطة (Entamoeba histolytica)، طفيل الجيارديا (Giardia lamblia)، بويضات الإسكارس والدبوسية مع دلالات الدم الخفي في البراز (FOBT).",
    pathologySummaryEn: "Microscopic diagnostic reference for intestinal protozoa: Entamoeba histolytica cysts/trophozoites, Giardia lamblia trophozoites/cysts, helminth ova, and Fecal Occult Blood significance.",
    keyDiagnosticPoints: [
      "Entamoeba histolytica: Cyst with 1-4 nuclei and central endosome; trophozoite with ingested RBCs",
      "Giardia lamblia: Symmetrical tear-drop shaped trophozoite with two nuclei (face-like) and flagella",
      "Ascaris lumbricoides: Corticated thick-shelled mamillated ova",
      "Enterobius vermicularis (Pinworm): D-shaped asymmetric ova",
      "Fecal Occult Blood Test (FOBT): Positive indicates mucosal ulceration, polyps, or colorectal neoplasia",
      "Helicobacter pylori Stool Antigen: Sensitive non-invasive marker of active gastric infection"
    ],
    associatedConditions: ["Amebic Dysentery & colitis", "Giardiasis / Malabsorption syndrome", "Helminthic intestinal infestation", "GI Bleeding"],
    differentialDiagnosis: "Infectious diarrhea (bacterial vs parasitic) vs Inflammatory Bowel Disease (IBD)."
  },
  {
    id: "inf-cardiac",
    code: "INF_CARDIAC",
    category: "cardiac",
    titleAr: "إنفوجرام دلالات جلطة القلب ونخر عضلة القلب (Cardiac Biomarkers Infogram)",
    titleEn: "Myocardial Infarction Biomarker Kinetic Curves Infogram",
    pathologySummaryAr: "مخطط زمني حركي دقيق لتصاعد وهبوط دلالات النخر القلبي بعد الاحتشاء القلبي: تروبونين عالي الحساسية (hs-Troponin I)، كرياتين كيناز النطاق القلبي (CK-MB)، والميوجلوبين.",
    pathologySummaryEn: "Kinetic timeline curves illustrating cardiac biomarker release following acute myocardial infarction: onset, peak, and normalization timeline of Troponin I vs CK-MB vs Myoglobin.",
    keyDiagnosticPoints: [
      "Troponin I / T: Gold standard marker. Rises at 3-4 hours, peaks at 12-24 hours, remains elevated 7-14 days",
      "High-Sensitivity Troponin (hs-cTnI): Detects myocardial injury within 1-2 hours of symptom onset",
      "CK-MB: Rises at 4-6 hours, peaks at 18-24 hours, normalizes within 48-72 hours (useful for re-infarction)",
      "BNP / NT-proBNP: Ventricular stretch biomarker for diagnosing and staging Congestive Heart Failure",
      "LDH: Late cardiac marker, peaks at 48-72 hours, persists up to 10 days"
    ],
    associatedConditions: ["Acute Myocardial Infarction (STEMI & NSTEMI)", "Acute Coronary Syndrome (ACS)", "Congestive Heart Failure (CHF)", "Myocarditis"],
    differentialDiagnosis: "ACS vs Non-ischemic troponin elevation (PE, sepsis, renal failure, severe myocarditis)."
  },
  {
    id: "inf-coag",
    code: "INF_COAG",
    category: "coagulation",
    titleAr: "إنفوجرام شلال التجلط والمسار الداخلي والخارجي (Coagulation Cascade Infogram)",
    titleEn: "Coagulation Cascade: Extrinsic (PT) vs Intrinsic (PTT) Infogram",
    pathologySummaryAr: "مخطط تفصيلي لشلال التجلط يوضح المسار الخارجي المقاس بواسطة PT/INR (العامل السابع 7)، والمسار الداخلي المقاس بواسطة PTT (العوامل 12, 11, 9, 8) والمسار المشترك (العوامل 10, 5, 2, 1).",
    pathologySummaryEn: "Comprehensive coagulation cascade diagram mapping the Extrinsic Pathway monitored by PT/INR, Intrinsic Pathway monitored by PTT/aPTT, and Common Pathway convergence to Fibrin clot.",
    keyDiagnosticPoints: [
      "Prothrombin Time (PT / INR): Evaluates Extrinsic & Common pathways (Factors VII, X, V, II, I)",
      "Warfarin / Marivan Therapy: Monitored via INR (Target 2.0 - 3.0 for DVT/PE/AFib; 2.5 - 3.5 for Mech Valve)",
      "Partial Thromboplastin Time (PTT / aPTT): Evaluates Intrinsic & Common pathways (Factors XII, XI, IX, VIII)",
      "Unfractionated Heparin: Monitored via PTT (Target therapeutic ratio 1.5 - 2.5x control)",
      "Isolated prolonged PTT: Hemophilia A (Factor VIII deficiency), Hemophilia B (Factor IX), Lupus Anticoagulant",
      "Prolonged PT and PTT: Vitamin K deficiency, Severe liver failure, DIC, Massive transfusion"
    ],
    associatedConditions: ["Deep Vein Thrombosis (DVT) & PE", "Hemophilia A & B", "Disseminated Intravascular Coagulation (DIC)", "Liver Disease Coagulopathy"],
    differentialDiagnosis: "Extrinsic defect vs Intrinsic defect vs Factor inhibitor vs Vitamin K antagonism."
  }
];

// Helper to find illustration by code or category
export function getIllustrationByCode(code: string): DiseaseIllustration | undefined {
  return DISEASE_ILLUSTRATIONS.find(item => item.code.toUpperCase() === code.toUpperCase());
}

// Auto-suggest hematological illustration based on CBC parameters
export function suggestHematologicalIllustration(params: {
  hb?: number;
  mcv?: number;
  mch?: number;
  mchc?: number;
  rdw?: number;
  wbc?: number;
  neutrophils?: number;
  bands?: number;
  lymphocytes?: number;
  platelets?: number;
  mentzerIndex?: number;
}): DiseaseIllustration {
  const { hb, mcv, rdw, wbc, bands, lymphocytes, platelets, mentzerIndex } = params;

  // 1. Severe bacterial sepsis / leukemoid
  if ((wbc && wbc > 15) || (bands && bands > 6)) {
    return getIllustrationByCode("HEM_SEPSIS")!;
  }

  // 2. Severe isolated thrombocytopenia with giant platelets
  if (platelets && platelets < 50 && (!wbc || (wbc >= 4 && wbc <= 11))) {
    return getIllustrationByCode("HEM_ITP")!;
  }

  // 3. Absolute lymphocytosis / Mononucleosis or CLL
  if (wbc && wbc > 25 && lymphocytes && lymphocytes > 70) {
    return getIllustrationByCode("HEM_CLL")!;
  }
  if (lymphocytes && lymphocytes > 50 && wbc && wbc >= 11 && wbc <= 20) {
    return getIllustrationByCode("HEM_MONO")!;
  }

  // 4. Microcytic anemia
  if ((mcv && mcv < 80) || (hb && hb < 11)) {
    if (mentzerIndex && mentzerIndex < 13) {
      return getIllustrationByCode("HEM_THAL")!;
    }
    if ((rdw && rdw > 15) || (mentzerIndex && mentzerIndex >= 13)) {
      return getIllustrationByCode("HEM_IDA")!;
    }
    return getIllustrationByCode("HEM_IDA")!;
  }

  // 5. Macrocytic anemia
  if (mcv && mcv > 100) {
    return getIllustrationByCode("HEM_MEGALO")!;
  }

  // Default normal
  return getIllustrationByCode("HEM_NORMAL")!;
}
