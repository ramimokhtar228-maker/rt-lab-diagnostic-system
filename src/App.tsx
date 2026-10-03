import React, { useState, useEffect } from 'react';
import { 
  LabReport, 
  TestProfile, 
  TestParameter, 
  CatalogProfileTemplate, 
  LabStaffSignatures,
  ComprehensivePackage,
  IndividualTest,
  StaffMember,
  LabFacility,
  PatientLoyaltyProfile
} from './types/lab';
import { INITIAL_REPORTS } from './data/initialData';
import { 
  DEFAULT_STAFF, 
  LAB_CATALOG, 
  INITIAL_PACKAGES, 
  INITIAL_INDIVIDUAL_TESTS,
  INITIAL_STAFF_MEMBERS,
  INITIAL_FACILITIES,
  INITIAL_LOYALTY_PROFILES
} from './data/labCatalog';
import { Header, MainNavTab } from './components/Header';
import { PatientForm } from './components/PatientForm';
import { ReportEditor } from './components/ReportEditor';
import { ReportViewerPrint } from './components/ReportViewerPrint';
import { ArchiveTable } from './components/ArchiveTable';
import { PatientTrendChart } from './components/PatientTrendChart';
import { CatalogBrowser } from './components/CatalogBrowser';
import { PackagesManager } from './components/PackagesManager';
import { PatientCardsAndPoints } from './components/PatientCardsAndPoints';
import { StaffAndFacilitiesManager } from './components/StaffAndFacilitiesManager';
import { TestCatalogModal } from './components/TestCatalogModal';
import { ManualTestModal } from './components/ManualTestModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import { formatWhatsAppMessage, openWhatsApp } from './utils/whatsapp';
import { exportReportToPPTX } from './utils/pptxExport';
import { CheckCircle2 } from 'lucide-react';

const STORAGE_KEY = 'rt_lab_reports_v2';
const STAFF_STORAGE_KEY = 'rt_lab_staff_v2';
const CATALOG_STORAGE_KEY = 'rt_lab_custom_catalog_v2';
const PACKAGES_STORAGE_KEY = 'rt_lab_packages_v1';
const INDIVIDUAL_TESTS_STORAGE_KEY = 'rt_lab_individual_tests_v2';
const STAFF_MEMBERS_STORAGE_KEY = 'rt_lab_staff_members_v2';
const FACILITIES_STORAGE_KEY = 'rt_lab_facilities_v2';
const LOYALTY_STORAGE_KEY = 'rt_lab_loyalty_profiles_v2';

// Clean old demo patients/branches/chemists on first load of this clean version
if (typeof window !== "undefined" && !localStorage.getItem("rt_lab_clean_v3_oct")) {
  try {
    localStorage.removeItem("rt_lab_reports_v2");
    localStorage.removeItem("rt_lab_reports_v1");
    localStorage.removeItem("rt_lab_cases_sync_v1");
    localStorage.removeItem("rt_lab_incoming_orders_queue");
    localStorage.removeItem("rt_lab_facilities_v2");
    localStorage.removeItem("rt_lab_staff_members_v2");
    localStorage.removeItem("rt_lab_staff_v2");
    localStorage.setItem("rt_lab_clean_v3_oct", "true");
  } catch {}
}

export default function App() {
  // 1. Staff Default Signatures
  const [defaultStaff, setDefaultStaff] = useState<LabStaffSignatures>(() => {
    try {
      const saved = localStorage.getItem(STAFF_STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_STAFF;
    } catch {
      return DEFAULT_STAFF;
    }
  });

  // 2. Custom Catalog (Profiles)
  const [catalog, setCatalog] = useState<CatalogProfileTemplate[]>(() => {
    try {
      const saved = localStorage.getItem(CATALOG_STORAGE_KEY);
      return saved ? JSON.parse(saved) : LAB_CATALOG;
    } catch {
      return LAB_CATALOG;
    }
  });

  // 3. Packages
  const [packages, setPackages] = useState<ComprehensivePackage[]>(() => {
    try {
      const saved = localStorage.getItem(PACKAGES_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_PACKAGES;
    } catch {
      return INITIAL_PACKAGES;
    }
  });

  // 4. Individual Tests Catalog (165 tests from financial system)
  const [individualTests, setIndividualTests] = useState<IndividualTest[]>(() => {
    try {
      const saved = localStorage.getItem(INDIVIDUAL_TESTS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= INITIAL_INDIVIDUAL_TESTS.length) {
          return parsed;
        }
      }
      return INITIAL_INDIVIDUAL_TESTS;
    } catch {
      return INITIAL_INDIVIDUAL_TESTS;
    }
  });

  // 5. Staff Members Directory
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>(() => {
    try {
      const saved = localStorage.getItem(STAFF_MEMBERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_STAFF_MEMBERS;
    } catch {
      return INITIAL_STAFF_MEMBERS;
    }
  });

  // 6. Facilities and Branches
  const [facilities, setFacilities] = useState<LabFacility[]>(() => {
    try {
      const saved = localStorage.getItem(FACILITIES_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_FACILITIES;
    } catch {
      return INITIAL_FACILITIES;
    }
  });

  // 7. Patient Loyalty Profiles & Cards
  const [loyaltyProfiles, setLoyaltyProfiles] = useState<PatientLoyaltyProfile[]>(() => {
    try {
      const saved = localStorage.getItem(LOYALTY_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_LOYALTY_PROFILES;
    } catch {
      return INITIAL_LOYALTY_PROFILES;
    }
  });

  // 8. Patient Reports
  const [reports, setReports] = useState<LabReport[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_REPORTS;
    } catch {
      return INITIAL_REPORTS;
    }
  });

  // Navigation and active states
  const [activeTab, setActiveTab] = useState<MainNavTab>('archive');
  const [viewMode, setViewMode] = useState<'editor' | 'print'>('editor');
  const [currentReportId, setCurrentReportId] = useState<string>(reports[0]?.id || '');
  const [searchTerm, setSearchTerm] = useState('');

  // Modals
  const [isCatalogModalOpen, setIsCatalogModalOpen] = useState(false);
  const [isManualTestModalOpen, setIsManualTestModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
    } catch (e) {
      console.error('Error saving reports:', e);
    }
  }, [reports]);

  useEffect(() => {
    try {
      localStorage.setItem(STAFF_STORAGE_KEY, JSON.stringify(defaultStaff));
    } catch (e) {
      console.error('Error saving defaultStaff:', e);
    }
  }, [defaultStaff]);

  useEffect(() => {
    try {
      localStorage.setItem(CATALOG_STORAGE_KEY, JSON.stringify(catalog));
    } catch (e) {
      console.error('Error saving catalog:', e);
    }
  }, [catalog]);

  useEffect(() => {
    try {
      localStorage.setItem(PACKAGES_STORAGE_KEY, JSON.stringify(packages));
    } catch (e) {
      console.error('Error saving packages:', e);
    }
  }, [packages]);

  useEffect(() => {
    try {
      localStorage.setItem(INDIVIDUAL_TESTS_STORAGE_KEY, JSON.stringify(individualTests));
    } catch (e) {
      console.error('Error saving individualTests:', e);
    }
  }, [individualTests]);

  useEffect(() => {
    try {
      localStorage.setItem(STAFF_MEMBERS_STORAGE_KEY, JSON.stringify(staffMembers));
    } catch (e) {
      console.error('Error saving staffMembers:', e);
    }
  }, [staffMembers]);

  useEffect(() => {
    try {
      localStorage.setItem(FACILITIES_STORAGE_KEY, JSON.stringify(facilities));
    } catch (e) {
      console.error('Error saving facilities:', e);
    }
  }, [facilities]);

  useEffect(() => {
    try {
      localStorage.setItem(LOYALTY_STORAGE_KEY, JSON.stringify(loyaltyProfiles));
    } catch (e) {
      console.error('Error saving loyaltyProfiles:', e);
    }
  }, [loyaltyProfiles]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const [isSyncingFinancial, setIsSyncingFinancial] = useState(false);

  // Manual trigger to pull latest orders from Accounts/Finance (Local + Cloud)
  const handleManualSync = async () => {
    setIsSyncingFinancial(true);
    try {
      const pendingLocal = getLocalFinancialPendingReports(reports);
      const { newReports } = await fetchCloudOrdersFromGitHub([...pendingLocal, ...reports]);
      const allNew = [...pendingLocal, ...newReports];
      if (allNew.length > 0) {
        setReports(prev => {
          const combined = [...allNew, ...prev];
          const seen = new Set();
          return combined.filter(item => {
            const key = item.patient.barcode || item.reportNumber;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
          });
        });
        setCurrentReportId(allNew[0].id);
        showToast("⚡ تم استيراد وتسميع " + allNew.length + " طلب فحص من منظومة الحسابات بنجاح!");
      } else {
        showToast("كافة طلبات الفحص مسمّعة ومحدثة بالفعل مع الحسابات ✓");
      }
    } catch (err) {
      showToast("فشل التسميع: " + err.message);
    } finally {
      setIsSyncingFinancial(false);
    }
  };

  // Real-time synchronization listeners (BroadcastChannel, storage event, interval)
  useEffect(() => {
    let channel = null;
    try {
      if ("BroadcastChannel" in window) {
        channel = new BroadcastChannel("rt_lab_sync_channel");
        channel.onmessage = (event) => {
          if (event.data && (event.data.type === "NEW_PATIENT_ORDER" || event.data.type === "NEW_ORDER_SYNC")) {
            const incomingOrder = event.data.order || event.data.invoice;
            const incomingReport = event.data.report || (incomingOrder ? convertOrderToLabReport(incomingOrder) : null);
            if (incomingReport) {
              setReports(prev => {
                const bcode = incomingReport.patient.barcode;
                const lnum = incomingReport.patient.labNumber || incomingReport.reportNumber;
                const exists = prev.some(r => (bcode && r.patient.barcode === bcode) || (lnum && r.reportNumber === lnum));
                if (exists) {
                  return prev.map(r => ((bcode && r.patient.barcode === bcode) || (lnum && r.reportNumber === lnum)) ? incomingReport : r);
                }
                return [incomingReport, ...prev];
              });
              setCurrentReportId(incomingReport.id);
              showToast("⚡ تم استلام وتسميع طلب فحص فوري للمريض: " + incomingReport.patient.fullName);
            }
          }
        };
      }
    } catch (err) {
      console.warn("BroadcastChannel error:", err);
    }

    const handleStorage = (e) => {
      if (e.key === "rt_lab_reports_v1" || e.key === "rt_lab_sync_trigger" || e.key === "rt_lab_cases_sync_v1") {
        setReports(prev => {
          const pending = getLocalFinancialPendingReports(prev);
          if (pending.length > 0) {
            showToast("⚡ تم استلام وتسميع " + pending.length + " طلب فحص من الحسابات!");
            return [...pending, ...prev];
          }
          return prev;
        });
      }
    };
    window.addEventListener("storage", handleStorage);

    const checkSync = async () => {
      try {
        // 1. Check local pending queue
        setReports(prev => {
          const pendingLocal = getLocalFinancialPendingReports(prev);
          if (pendingLocal.length > 0) {
            showToast("⚡ تم استلام وتسميع " + pendingLocal.length + " طلب فحص جديد من الحسابات!");
            return [...pendingLocal, ...prev];
          }
          return prev;
        });

        // 2. Automatically poll GitHub Cloud for cases pushed from financial system
        try {
          const cloudRes = await fetchCloudOrdersFromGitHub(reports);
          if (cloudRes.newReports && cloudRes.newReports.length > 0) {
            setReports(prev => {
              const reallyNew = cloudRes.newReports.filter(cr =>
                !prev.some(p => (cr.patient.barcode && p.patient.barcode === cr.patient.barcode) ||
                                (cr.reportNumber && (p.reportNumber === cr.reportNumber || p.patient.labNumber === cr.reportNumber)))
              );
              if (reallyNew.length > 0) {
                showToast("⚡ تم استلام وتسميع " + reallyNew.length + " فحص مالي سحابي من منظومة الفواتير!");
                return [...reallyNew, ...prev];
              }
              return prev;
            });
          }
        } catch {}
      } catch (err) {
        console.warn("Sync error:", err);
      }
    };

    // Run immediately on component mount
    checkSync();
    window.addEventListener("focus", checkSync);
    const timer = setInterval(checkSync, 8000);

    return () => {
      if (channel) channel.close();
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("focus", checkSync);
      clearInterval(timer);
    };
  }, []);

  const handleResetCatalog = () => {
    if (confirm('هل أنت متأكد من استعادة كافة التحاليل والمعدلات الافتراضية للكتالوج؟')) {
      setCatalog(LAB_CATALOG);
      setIndividualTests(INITIAL_INDIVIDUAL_TESTS);
      setPackages(INITIAL_PACKAGES);
      try {
        localStorage.removeItem(CATALOG_STORAGE_KEY);
        localStorage.removeItem(INDIVIDUAL_TESTS_STORAGE_KEY);
        localStorage.removeItem(PACKAGES_STORAGE_KEY);
      } catch (e) {
        console.error(e);
      }
      showToast('تمت استعادة الكتالوج والباقات الافتراضية بنجاح');
    }
  };

  // Helper to generate a new blank report
  const createNewReport = (initialTemplate?: CatalogProfileTemplate) => {
    const nextNum = Math.floor(1000 + Math.random() * 9000);
    const labNumber = `RT-2026-${nextNum}`;
    const barcode = `${Math.floor(1000000000 + Math.random() * 9000000000)}`;
    const nowIso = new Date().toISOString();

    const templateToUse = initialTemplate || catalog[0] || LAB_CATALOG[0];

    const initialProfile: TestProfile = {
      id: `prof-${Date.now()}`,
      profileCode: templateToUse.code,
      titleEn: templateToUse.titleEn,
      titleAr: templateToUse.titleAr,
      category: templateToUse.category,
      sampleType: templateToUse.sampleType,
      interpretation: templateToUse.defaultInterpretation || '',
      parameters: templateToUse.parameters.map((p, idx) => ({
        ...p,
        id: `param-${Date.now()}-${idx}`,
        result: '',
        flag: ''
      }))
    };

    const newRep: LabReport = {
      id: `rep-${Date.now()}`,
      reportNumber: labNumber,
      patient: {
        id: `pat-${Date.now()}`,
        labNumber,
        barcode,
        fullName: '',
        age: 30,
        ageUnit: 'years',
        gender: 'male',
        phone: '01',
        referringDoctorTitle: 'Prof. Dr.',
        referringDoctorName: '',
        sampleDate: nowIso.substring(0, 16),
        reportingDate: nowIso.substring(0, 16),
        clinicalHistory: '',
        fastingHours: undefined,
        bloodGroup: 'O+'
      },
      status: 'in_progress',
      staff: defaultStaff,
      generalComment: '',
      createdAt: nowIso,
      updatedAt: nowIso,
      profiles: [initialProfile]
    };

    setReports([newRep, ...reports]);
    setCurrentReportId(newRep.id);
    setViewMode('editor');
    setActiveTab('new-patient');
    showToast(`تم فتح حالة جديدة برقم (${labNumber})`);
  };

  // Create new report with single individual test
  const handleSelectIndividualTestForNewCase = (test: IndividualTest) => {
    const nextNum = Math.floor(1000 + Math.random() * 9000);
    const labNumber = `RT-2026-${nextNum}`;
    const barcode = `${Math.floor(1000000000 + Math.random() * 9000000000)}`;
    const nowIso = new Date().toISOString();

    const initialProfile: TestProfile = {
      id: `prof-${Date.now()}`,
      profileCode: 'INDIVIDUAL',
      titleEn: 'Individual Diagnostic Test',
      titleAr: test.nameAr,
      category: test.category,
      sampleType: test.sampleType,
      parameters: [
        {
          id: `param-${Date.now()}`,
          name: `${test.nameAr} (${test.nameEn})`,
          result: '',
          unit: test.unit,
          minNormal: test.minNormal,
          maxNormal: test.maxNormal,
          panicLow: test.panicLow,
          panicHigh: test.panicHigh,
          textReference: test.textReference,
          method: test.method,
          flag: ''
        }
      ]
    };

    const newRep: LabReport = {
      id: `rep-${Date.now()}`,
      reportNumber: labNumber,
      patient: {
        id: `pat-${Date.now()}`,
        labNumber,
        barcode,
        fullName: '',
        age: 30,
        ageUnit: 'years',
        gender: 'male',
        phone: '01',
        referringDoctorTitle: 'Prof. Dr.',
        referringDoctorName: '',
        sampleDate: nowIso.substring(0, 16),
        reportingDate: nowIso.substring(0, 16),
        clinicalHistory: '',
        fastingHours: undefined,
        bloodGroup: 'O+',
        totalCost: test.price
      },
      status: 'in_progress',
      staff: defaultStaff,
      generalComment: '',
      createdAt: nowIso,
      updatedAt: nowIso,
      profiles: [initialProfile]
    };

    setReports([newRep, ...reports]);
    setCurrentReportId(newRep.id);
    setViewMode('editor');
    setActiveTab('new-patient');
    showToast(`تم فتح حالة جديدة بالفحص المنفرد: (${test.nameAr})`);
  };

  // Get current active report object
  const currentReport = reports.find(r => r.id === currentReportId) || reports[0];

  // Update current report
  const handleUpdateCurrentReport = (updated: LabReport) => {
    setReports(prev => prev.map(r => r.id === updated.id ? updated : r));
  };

  // Save current report
  const handleSaveToArchive = () => {
    if (!currentReport.patient.fullName.trim()) {
      alert('برجاء كتابة اسم المريض قبل الحفظ بالأرشيف.');
      return;
    }
    showToast('تم حفظ وتحديث بيانات التقرير بالأرشيف بنجاح ✅');
  };

  // Duplicate report for new visit
  const handleDuplicateReport = (rep: LabReport) => {
    const nextNum = Math.floor(1000 + Math.random() * 9000);
    const labNumber = `RT-2026-${nextNum}`;
    const barcode = `${Math.floor(1000000000 + Math.random() * 9000000000)}`;
    const nowIso = new Date().toISOString();

    const duplicated: LabReport = {
      ...rep,
      id: `rep-${Date.now()}`,
      reportNumber: labNumber,
      createdAt: nowIso,
      updatedAt: nowIso,
      status: 'in_progress',
      patient: {
        ...rep.patient,
        labNumber,
        barcode,
        sampleDate: nowIso.substring(0, 16),
        reportingDate: nowIso.substring(0, 16)
      },
      profiles: rep.profiles.map(prof => ({
        ...prof,
        id: `prof-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        parameters: prof.parameters.map(param => ({
          ...param,
          id: `param-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          result: '',
          flag: ''
        }))
      }))
    };

    setReports([duplicated, ...reports]);
    setCurrentReportId(duplicated.id);
    setViewMode('editor');
    setActiveTab('new-patient');
    showToast(`تم إنشاء زيارة متابعة جديدة للمريض (${rep.patient.fullName}) برقم ${labNumber}`);
  };

  // Delete report
  const handleDeleteReport = (reportId: string) => {
    const filtered = reports.filter(r => r.id !== reportId);
    setReports(filtered);
    if (currentReportId === reportId && filtered.length > 0) {
      setCurrentReportId(filtered[0].id);
    }
    showToast('تم حذف التقرير من الأرشيف.');
  };

  // Add profile from Catalog
  const handleAddProfileFromCatalog = (newProfile: TestProfile) => {
    if (!currentReport) return;
    const updatedProfiles = [...currentReport.profiles, newProfile];
    handleUpdateCurrentReport({
      ...currentReport,
      profiles: updatedProfiles,
      updatedAt: new Date().toISOString()
    });
    setIsCatalogModalOpen(false);
    showToast(`تمت إضافة بروفايل (${newProfile.titleEn}) بنجاح`);
  };

  // Add individual test to current report
  const handleAddIndividualTest = (test: IndividualTest) => {
    if (!currentReport) return;

    // Check if an INDIVIDUAL profile exists
    const existingIndiv = currentReport.profiles.find(p => p.profileCode === 'INDIVIDUAL');
    const newParam: TestParameter = {
      id: `param-${Date.now()}`,
      name: `${test.nameAr} (${test.nameEn})`,
      result: '',
      unit: test.unit,
      minNormal: test.minNormal,
      maxNormal: test.maxNormal,
      panicLow: test.panicLow,
      panicHigh: test.panicHigh,
      textReference: test.textReference,
      method: test.method,
      flag: ''
    };

    if (existingIndiv) {
      const updatedProfiles = currentReport.profiles.map(p => 
        p.profileCode === 'INDIVIDUAL' 
          ? { ...p, parameters: [...p.parameters, newParam] }
          : p
      );
      handleUpdateCurrentReport({
        ...currentReport,
        profiles: updatedProfiles,
        updatedAt: new Date().toISOString()
      });
    } else {
      const newProf: TestProfile = {
        id: `prof-indiv-${Date.now()}`,
        profileCode: 'INDIVIDUAL',
        titleEn: 'Individual Diagnostic Investigations',
        titleAr: 'تحاليل واستقصاءات منفردة',
        category: test.category,
        sampleType: test.sampleType,
        parameters: [newParam]
      };
      handleUpdateCurrentReport({
        ...currentReport,
        profiles: [...currentReport.profiles, newProf],
        updatedAt: new Date().toISOString()
      });
    }

    setIsCatalogModalOpen(false);
    showToast(`تمت إضافة التحليل المنفرد (${test.nameAr}) للتقرير بنجاح`);
  };

  // Apply Package to report
  const handleApplyPackageToReport = (pkg: ComprehensivePackage) => {
    if (!currentReport) return;

    // Build profiles from package
    const newProfiles: TestProfile[] = [];

    // Add profile templates
    pkg.includedProfiles.forEach(code => {
      const template = catalog.find(c => c.code === code) || LAB_CATALOG.find(c => c.code === code);
      if (template) {
        newProfiles.push({
          id: `prof-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          profileCode: template.code,
          titleEn: template.titleEn,
          titleAr: template.titleAr,
          category: template.category,
          sampleType: template.sampleType,
          interpretation: template.defaultInterpretation || '',
          parameters: template.parameters.map((p, idx) => ({
            ...p,
            id: `param-${Date.now()}-${idx}-${Math.random().toString(36).substr(2, 4)}`,
            result: '',
            flag: ''
          }))
        });
      }
    });

    // Add individual tests in package
    if (pkg.includedIndividualTestCodes.length > 0) {
      const indivParams: TestParameter[] = [];
      pkg.includedIndividualTestCodes.forEach(tCode => {
        const test = individualTests.find(t => t.code === tCode) || INITIAL_INDIVIDUAL_TESTS.find(t => t.code === tCode);
        if (test) {
          indivParams.push({
            id: `param-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
            name: `${test.nameAr} (${test.nameEn})`,
            result: '',
            unit: test.unit,
            minNormal: test.minNormal,
            maxNormal: test.maxNormal,
            panicLow: test.panicLow,
            panicHigh: test.panicHigh,
            textReference: test.textReference,
            method: test.method,
            flag: ''
          });
        }
      });

      if (indivParams.length > 0) {
        newProfiles.push({
          id: `prof-indiv-${Date.now()}`,
          profileCode: 'INDIVIDUAL',
          titleEn: `${pkg.titleEn} - Special Investigations`,
          titleAr: `فحوصات ${pkg.titleAr} الإضافية`,
          category: 'Special Chemistry & Hormones',
          sampleType: pkg.sampleTypes.join(', '),
          parameters: indivParams
        });
      }
    }

    const updatedRep: LabReport = {
      ...currentReport,
      profiles: newProfiles.length > 0 ? newProfiles : currentReport.profiles,
      packageApplied: {
        code: pkg.code,
        titleAr: pkg.titleAr,
        packagePrice: pkg.packagePrice
      },
      patient: {
        ...currentReport.patient,
        assignedPackageId: pkg.id,
        totalCost: pkg.packagePrice,
        discountApplied: pkg.originalPrice - pkg.packagePrice
      },
      updatedAt: new Date().toISOString()
    };

    handleUpdateCurrentReport(updatedRep);
    setViewMode('editor');
    setActiveTab('new-patient');
    showToast(`تم تطبيق باقة (${pkg.titleAr}) بسعر مخفض ${pkg.packagePrice} ج.م بنجاح!`);
  };

  // Add manual custom test
  const handleAddManualTest = (
    targetProfileId: string | 'new',
    testParam: TestParameter,
    newProfileInfo?: { titleEn: string; titleAr: string; category: string }
  ) => {
    if (!currentReport) return;

    if (targetProfileId === 'new') {
      const newProf: TestProfile = {
        id: `prof-custom-${Date.now()}`,
        profileCode: 'CUSTOM',
        titleEn: newProfileInfo?.titleEn || 'Special Diagnostic Investigations',
        titleAr: newProfileInfo?.titleAr || 'فحوصات خاصة',
        category: newProfileInfo?.category || 'Special Chemistry',
        sampleType: 'Serum / Whole Blood',
        parameters: [testParam]
      };
      handleUpdateCurrentReport({
        ...currentReport,
        profiles: [...currentReport.profiles, newProf],
        updatedAt: new Date().toISOString()
      });
    } else {
      const updated = currentReport.profiles.map(p => {
        if (p.id === targetProfileId) {
          return {
            ...p,
            parameters: [...p.parameters, testParam]
          };
        }
        return p;
      });
      handleUpdateCurrentReport({
        ...currentReport,
        profiles: updated,
        updatedAt: new Date().toISOString()
      });
    }

    showToast(`تمت إضافة الفحص اليدوي (${testParam.name}) بنجاح`);
  };

  // Backup JSON database
  const handleBackupDatabase = () => {
    const fullBackup = {
      reports,
      packages,
      individualTests,
      staffMembers,
      facilities,
      loyaltyProfiles,
      defaultStaff,
      catalog,
      version: '2.0.0',
      exportedAt: new Date().toISOString()
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(fullBackup, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `RT_LAB_FullDatabase_${new Date().toISOString().substring(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('تم تصدير النسخة الاحتياطية الشاملة بنجاح 💾');
  };

  // Restore JSON database
  const handleRestoreDatabase = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.reports && Array.isArray(parsed.reports)) {
          setReports(parsed.reports);
          if (parsed.packages) setPackages(parsed.packages);
          if (parsed.individualTests) setIndividualTests(parsed.individualTests);
          if (parsed.staffMembers) setStaffMembers(parsed.staffMembers);
          if (parsed.facilities) setFacilities(parsed.facilities);
          if (parsed.loyaltyProfiles) setLoyaltyProfiles(parsed.loyaltyProfiles);
          if (parsed.defaultStaff) setDefaultStaff(parsed.defaultStaff);
          if (parsed.catalog) setCatalog(parsed.catalog);
          showToast(`تمت استعادة قاعدة البيانات المتكاملة بنجاح!`);
        } else if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].patient) {
          setReports(parsed);
          setCurrentReportId(parsed[0].id);
          showToast(`تمت استعادة ${parsed.length} سجل بنجاح!`);
        } else {
          alert('ملف النسخة الاحتياطية غير صالح.');
        }
      } catch (err) {
        alert('حدث خطأ أثناء قراءة ملف النسخة الاحتياطية.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl border border-rose-800 flex items-center gap-3 animate-in slide-in-from-bottom duration-300 no-print">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Main Lab Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setViewMode('editor');
        }}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onNewPatientClick={() => createNewReport()}
        onSyncClick={handleManualSync}
        isSyncing={isSyncingFinancial}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {/* VIEW 1: PRINT & PDF VIEWER (Each profile on an independent page) */}
        {viewMode === 'print' && currentReport ? (
          <ReportViewerPrint
            report={currentReport}
            onBackToEdit={() => setViewMode('editor')}
          />
        ) : (
          <>
            {/* TAB 1: ARCHIVE */}
            {activeTab === 'archive' && (
              <ArchiveTable
                reports={reports}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                onSelectReport={(r) => {
                  setCurrentReportId(r.id);
                  setViewMode('editor');
                  setActiveTab('new-patient');
                }}
                onPrintReport={(r) => {
                  setCurrentReportId(r.id);
                  setViewMode('print');
                }}
                onDeleteReport={handleDeleteReport}
                onDuplicateReport={handleDuplicateReport}
                onBackupDatabase={handleBackupDatabase}
                onRestoreDatabase={handleRestoreDatabase}
                onSyncClick={handleManualSync}
                isSyncing={isSyncingFinancial}
              />
            )}

            {/* TAB 2: PATIENT ENTRY & REPORT EDITOR */}
            {activeTab === 'new-patient' && currentReport && (
              <div className="space-y-6">
                {/* Active Package Banner (if applied) */}
                {currentReport.packageApplied && (
                  <div className="p-3.5 bg-gradient-to-r from-red-950 via-rose-900 to-slate-900 text-white rounded-xl shadow-md flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-mono bg-red-800/80 px-2 py-0.5 rounded font-bold">
                        {currentReport.packageApplied.code}
                      </span>
                      <span>الباقة المطبقة حالياً: <strong>{currentReport.packageApplied.titleAr}</strong></span>
                    </div>
                    <div className="text-xs font-black text-rose-200 font-mono">
                      السعر الإجمالي للباقة: {currentReport.packageApplied.packagePrice} ج.م
                    </div>
                  </div>
                )}

                {/* Patient Demographics */}
                <PatientForm
                  patient={currentReport.patient}
                  onChange={(updatedPatient) => {
                    handleUpdateCurrentReport({
                      ...currentReport,
                      patient: updatedPatient,
                      updatedAt: new Date().toISOString()
                    });
                  }}
                />

                {/* Report Clinical Editor */}
                <ReportEditor
                  report={currentReport}
                  onUpdateReport={handleUpdateCurrentReport}
                  onSaveToArchive={handleSaveToArchive}
                  onPrintPreview={() => setViewMode('print')}
                  onSendWhatsApp={() => {
                    const msg = formatWhatsAppMessage(currentReport);
                    openWhatsApp(currentReport.patient.phone, msg);
                  }}
                  onExportPPTX={async () => {
                    await exportReportToPPTX(currentReport);
                  }}
                  onOpenCatalog={() => setIsCatalogModalOpen(true)}
                  onOpenManualTest={() => setIsManualTestModalOpen(true)}
                />
              </div>
            )}

            {/* TAB 3: PACKAGES MANAGER */}
            {activeTab === 'packages' && (
              <PackagesManager
                packages={packages}
                onUpdatePackages={setPackages}
                catalogProfiles={catalog}
                individualTests={individualTests}
                onApplyPackageToReport={handleApplyPackageToReport}
              />
            )}

            {/* TAB 4: MEDICAL TEST CATALOG BROWSER */}
            {activeTab === 'catalog' && (
              <CatalogBrowser
                catalog={catalog}
                onUpdateCatalog={setCatalog}
                onResetCatalog={handleResetCatalog}
                onSelectProfileForNewCase={(template) => {
                  createNewReport(template);
                }}
                individualTests={individualTests}
                onUpdateIndividualTests={setIndividualTests}
                onSelectIndividualTestForNewCase={handleSelectIndividualTestForNewCase}
              />
            )}

            {/* TAB 5: PATIENT CARDS & LOYALTY POINTS */}
            {activeTab === 'patient-cards' && (
              <PatientCardsAndPoints
                loyaltyProfiles={loyaltyProfiles}
                onUpdateProfiles={setLoyaltyProfiles}
                reports={reports}
              />
            )}

            {/* TAB 6: LONGITUDINAL TREND CHARTS */}
            {activeTab === 'trends' && (
              <PatientTrendChart
                reports={reports}
                initialPatientId={currentReport?.patient.id}
              />
            )}

            {/* TAB 7: STAFF & FACILITIES MANAGEMENT */}
            {activeTab === 'staff-facilities' && (
              <StaffAndFacilitiesManager
                staffMembers={staffMembers}
                onUpdateStaffMembers={setStaffMembers}
                facilities={facilities}
                onUpdateFacilities={setFacilities}
                defaultSignatures={defaultStaff}
                onUpdateDefaultSignatures={(updated) => {
                  setDefaultStaff(updated);
                  if (currentReport) {
                    handleUpdateCurrentReport({
                      ...currentReport,
                      staff: updated
                    });
                  }
                  showToast('تم اعتماد التوقيعات الافتراضية بنجاح!');
                }}
              />
            )}
          </>
        )}
      </main>

      {/* Catalog Selector Modal with Individual Tests & Packages */}
      {currentReport && (
        <TestCatalogModal
          isOpen={isCatalogModalOpen}
          onClose={() => setIsCatalogModalOpen(false)}
          onAddProfile={handleAddProfileFromCatalog}
          existingProfileCodes={currentReport.profiles.map(p => p.profileCode)}
          catalog={catalog}
          individualTests={individualTests}
          packages={packages}
          onAddIndividualTest={handleAddIndividualTest}
          onApplyPackage={handleApplyPackageToReport}
        />
      )}

      {/* Manual Test Entry Modal */}
      {currentReport && (
        <ManualTestModal
          isOpen={isManualTestModalOpen}
          onClose={() => setIsManualTestModalOpen(false)}
          profiles={currentReport.profiles}
          onAddManualTest={handleAddManualTest}
        />
      )}

      {/* Offline Connectivity State */}
      <OfflineIndicator />
    </div>
  );
}
