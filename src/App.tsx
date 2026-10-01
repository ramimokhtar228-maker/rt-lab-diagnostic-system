import React, { useState, useEffect } from 'react';
import { LabReport, TestProfile, TestParameter, CatalogProfileTemplate, LabStaffSignatures } from './types/lab';
import { INITIAL_REPORTS } from './data/initialData';
import { DEFAULT_STAFF, LAB_CATALOG } from './data/labCatalog';
import { Header } from './components/Header';
import { PatientForm } from './components/PatientForm';
import { ReportEditor } from './components/ReportEditor';
import { ReportViewerPrint } from './components/ReportViewerPrint';
import { ArchiveTable } from './components/ArchiveTable';
import { PatientTrendChart } from './components/PatientTrendChart';
import { CatalogBrowser } from './components/CatalogBrowser';
import { StaffSettingsModal } from './components/StaffSettingsModal';
import { TestCatalogModal } from './components/TestCatalogModal';
import { ManualTestModal } from './components/ManualTestModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import { formatWhatsAppMessage, openWhatsApp } from './utils/whatsapp';
import { exportReportToPPTX } from './utils/pptxExport';
import { CheckCircle2 } from 'lucide-react';

const STORAGE_KEY = 'rt_lab_reports_v1';
const STAFF_STORAGE_KEY = 'rt_lab_staff_v1';

export default function App() {
  // Load staff defaults
  const [defaultStaff, setDefaultStaff] = useState<LabStaffSignatures>(() => {
    try {
      const saved = localStorage.getItem(STAFF_STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_STAFF;
    } catch {
      return DEFAULT_STAFF;
    }
  });

  // Load reports
  const [reports, setReports] = useState<LabReport[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_REPORTS;
    } catch {
      return INITIAL_REPORTS;
    }
  });

  // Navigation and active states
  const [activeTab, setActiveTab] = useState<'archive' | 'new-patient' | 'trends' | 'catalog' | 'settings'>('archive');
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
      console.error('Error saving reports to localStorage:', e);
    }
  }, [reports]);

  useEffect(() => {
    try {
      localStorage.setItem(STAFF_STORAGE_KEY, JSON.stringify(defaultStaff));
    } catch (e) {
      console.error('Error saving staff to localStorage:', e);
    }
  }, [defaultStaff]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Helper to generate a new blank report
  const createNewReport = (initialTemplate?: CatalogProfileTemplate) => {
    const nextNum = Math.floor(1000 + Math.random() * 9000);
    const labNumber = `RT-2026-${nextNum}`;
    const barcode = `${Math.floor(1000000000 + Math.random() * 9000000000)}`;
    const nowIso = new Date().toISOString();

    const templateToUse = initialTemplate || LAB_CATALOG[0]; // Default CBC

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
        fastingHours: undefined
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

  // Duplicate report for new follow-up visit of same patient
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
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(reports, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `RT_LAB_Backup_${new Date().toISOString().substring(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('تم تصدير النسخة الاحتياطية بنجاح 💾');
  };

  // Restore JSON database
  const handleRestoreDatabase = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].patient) {
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
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {/* VIEW 1: PRINT & PDF VIEWER (Automated Print Layout with each profile on separate page) */}
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
              />
            )}

            {/* TAB 2: PATIENT ENTRY & REPORT EDITOR */}
            {activeTab === 'new-patient' && currentReport && (
              <div className="space-y-6">
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

            {/* TAB 3: LONGITUDINAL TREND CHARTS */}
            {activeTab === 'trends' && (
              <PatientTrendChart
                reports={reports}
                initialPatientId={currentReport?.patient.id}
              />
            )}

            {/* TAB 4: MEDICAL TEST CATALOG BROWSER */}
            {activeTab === 'catalog' && (
              <CatalogBrowser
                onSelectProfileForNewCase={(template) => {
                  createNewReport(template);
                }}
              />
            )}

            {/* TAB 5: STAFF & SIGNATURES SETTINGS */}
            {activeTab === 'settings' && (
              <StaffSettingsModal
                currentStaff={defaultStaff}
                onUpdateDefaultStaff={(updated) => {
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

      {/* Catalog Selector Modal */}
      {currentReport && (
        <TestCatalogModal
          isOpen={isCatalogModalOpen}
          onClose={() => setIsCatalogModalOpen(false)}
          onAddProfile={handleAddProfileFromCatalog}
          existingProfileCodes={currentReport.profiles.map(p => p.profileCode)}
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
