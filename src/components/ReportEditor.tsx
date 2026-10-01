import React, { useState } from 'react';
import { LabReport, TestProfile, TestParameter, LabStaffSignatures, ReportStatus } from '../types/lab';
import { calculateFlag, formatReferenceDisplay } from '../utils/calculator';
import { COMMON_INTERPRETATIONS, STAFF_OPTIONS } from '../data/labCatalog';
import { ColouredRangeChart } from './ColouredRangeChart';
import { FlagBadge } from './FlagBadge';
import { 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  BookOpen, 
  Edit2, 
  Printer, 
  Share2, 
  FileSpreadsheet, 
  Save, 
  CheckCircle2, 
  MessageSquare, 
  Layers,
  ChevronDown,
  Sparkles,
  UserCheck
} from 'lucide-react';

interface ReportEditorProps {
  report: LabReport;
  onUpdateReport: (updated: LabReport) => void;
  onSaveToArchive: () => void;
  onPrintPreview: () => void;
  onSendWhatsApp: () => void;
  onExportPPTX: () => void;
  onOpenCatalog: () => void;
  onOpenManualTest: () => void;
}

export const ReportEditor: React.FC<ReportEditorProps> = ({
  report,
  onUpdateReport,
  onSaveToArchive,
  onPrintPreview,
  onSendWhatsApp,
  onExportPPTX,
  onOpenCatalog,
  onOpenManualTest
}) => {
  const [activeProfileTab, setActiveProfileTab] = useState<string>(report.profiles[0]?.id || '');
  const [editingParamId, setEditingParamId] = useState<string | null>(null);

  // Update profile field
  const handleUpdateProfile = (profileId: string, updates: Partial<TestProfile>) => {
    const updatedProfiles = report.profiles.map(p => {
      if (p.id === profileId) {
        return { ...p, ...updates };
      }
      return p;
    });
    onUpdateReport({ ...report, profiles: updatedProfiles, updatedAt: new Date().toISOString() });
  };

  // Move profile up / down
  const handleMoveProfile = (index: number, direction: 'up' | 'down') => {
    const newProfiles = [...report.profiles];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newProfiles.length) return;

    const temp = newProfiles[index];
    newProfiles[index] = newProfiles[targetIdx];
    newProfiles[targetIdx] = temp;

    onUpdateReport({ ...report, profiles: newProfiles, updatedAt: new Date().toISOString() });
  };

  // Delete profile
  const handleDeleteProfile = (profileId: string) => {
    if (report.profiles.length <= 1) {
      alert('يجب أن يحتوي التقرير على فحص واحد على الأقل.');
      return;
    }
    if (confirm('هل أنت متأكد من حذف هذا البروفايل بالكامل من التقرير؟')) {
      const filtered = report.profiles.filter(p => p.id !== profileId);
      onUpdateReport({ ...report, profiles: filtered, updatedAt: new Date().toISOString() });
      if (activeProfileTab === profileId) {
        setActiveProfileTab(filtered[0]?.id || '');
      }
    }
  };

  // Update single parameter
  const handleUpdateParameter = (profileId: string, paramId: string, updates: Partial<TestParameter>) => {
    const updatedProfiles = report.profiles.map(prof => {
      if (prof.id === profileId) {
        const updatedParams = prof.parameters.map(param => {
          if (param.id === paramId) {
            const merged = { ...param, ...updates };
            // If result or min/max changed, recalculate flag
            if (updates.result !== undefined || updates.minNormal !== undefined || updates.maxNormal !== undefined) {
              merged.flag = calculateFlag(merged.result, merged.minNormal, merged.maxNormal, merged.panicLow, merged.panicHigh);
            }
            return merged;
          }
          return param;
        });
        return { ...prof, parameters: updatedParams };
      }
      return prof;
    });
    onUpdateReport({ ...report, profiles: updatedProfiles, updatedAt: new Date().toISOString() });
  };

  // Move parameter up / down inside profile
  const handleMoveParameter = (profileId: string, paramIndex: number, direction: 'up' | 'down') => {
    const updatedProfiles = report.profiles.map(prof => {
      if (prof.id === profileId) {
        const params = [...prof.parameters];
        const targetIdx = direction === 'up' ? paramIndex - 1 : paramIndex + 1;
        if (targetIdx < 0 || targetIdx >= params.length) return prof;
        const temp = params[paramIndex];
        params[paramIndex] = params[targetIdx];
        params[targetIdx] = temp;
        return { ...prof, parameters: params };
      }
      return prof;
    });
    onUpdateReport({ ...report, profiles: updatedProfiles, updatedAt: new Date().toISOString() });
  };

  // Delete single parameter
  const handleDeleteParameter = (profileId: string, paramId: string) => {
    const updatedProfiles = report.profiles.map(prof => {
      if (prof.id === profileId) {
        return {
          ...prof,
          parameters: prof.parameters.filter(p => p.id !== paramId)
        };
      }
      return prof;
    });
    onUpdateReport({ ...report, profiles: updatedProfiles, updatedAt: new Date().toISOString() });
  };

  // Staff updates
  const handleStaffChange = <K extends keyof LabStaffSignatures>(key: K, val: string) => {
    onUpdateReport({
      ...report,
      staff: {
        ...report.staff,
        [key]: val
      },
      updatedAt: new Date().toISOString()
    });
  };

  const currentProfile = report.profiles.find(p => p.id === activeProfileTab) || report.profiles[0];
  const currentProfileIdx = report.profiles.findIndex(p => p.id === (currentProfile?.id || ''));

  return (
    <div className="space-y-6">
      {/* Top Action Ribbon */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-wrap items-center justify-between gap-3 sticky top-28 z-30">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-500">حالة التقرير:</span>
          <select
            value={report.status}
            onChange={(e) => onUpdateReport({ ...report, status: e.target.value as ReportStatus })}
            className={`text-xs font-bold px-3 py-1.5 rounded-lg border focus:outline-none ${
              report.status === 'released'
                ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                : report.status === 'verified'
                ? 'bg-blue-50 text-blue-900 border-blue-300'
                : 'bg-amber-50 text-amber-900 border-amber-300'
            }`}
          >
            <option value="draft">مسودة (Draft)</option>
            <option value="in_progress">قيد الفحص (In Progress)</option>
            <option value="verified">تمت المراجعة والتدقيق (Verified)</option>
            <option value="released">معتمد ومصدر رسمياً (Released)</option>
          </select>

          <span className="text-slate-300 text-xs hidden sm:inline">|</span>
          <span className="text-xs text-slate-500 hidden sm:inline">
            عدد البروفايلات: <strong className="text-slate-800">{report.profiles.length}</strong> (كل بروفايل في صفحة مستقلة)
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Add test buttons */}
          <button
            onClick={onOpenCatalog}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg border border-slate-300 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-rose-800" />
            <span>إضافة من الكتالوج</span>
          </button>

          <button
            onClick={onOpenManualTest}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-900 text-xs font-bold rounded-lg border border-rose-300 transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-rose-800" />
            <span>إضافة تحليل يدوي</span>
          </button>

          {/* Save button */}
          <button
            onClick={onSaveToArchive}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-lg shadow-xs transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            <span>حفظ بالأرشيف</span>
          </button>

          {/* WhatsApp Direct Alert */}
          <button
            onClick={onSendWhatsApp}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold rounded-lg shadow-xs transition-colors"
            title="إرسال تنبيه فوري عبر واتساب للمريض"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>تنبيه واتساب</span>
          </button>

          {/* PPTX Export */}
          <button
            onClick={onExportPPTX}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-lg shadow-xs transition-colors"
            title="تصدير عرض تقديمي بوربوينت"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>PowerPoint</span>
          </button>

          {/* Automated Print & PDF */}
          <button
            onClick={onPrintPreview}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-red-800 to-rose-700 hover:from-red-700 hover:to-rose-600 text-white text-xs font-bold rounded-lg shadow-sm transition-all active:scale-98"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>الطباعة الآلية والـ PDF</span>
          </button>
        </div>
      </div>

      {/* Profiles Tabs & Switcher */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 p-2 flex items-center justify-between gap-2 overflow-x-auto">
          <div className="flex items-center gap-1.5">
            {report.profiles.map((profile, idx) => (
              <button
                key={profile.id}
                onClick={() => setActiveProfileTab(profile.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  (currentProfile?.id === profile.id)
                    ? 'bg-rose-900 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-black/20 flex items-center justify-center text-[10px]">
                  {idx + 1}
                </span>
                <span>{profile.titleEn}</span>
                <span className="text-[10px] opacity-75">({profile.parameters.length})</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={onOpenCatalog}
              className="flex items-center gap-1 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-900 rounded-lg text-xs font-bold border border-rose-200"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>إضافة بروفايل</span>
            </button>
          </div>
        </div>

        {/* Current Active Profile Editor */}
        {currentProfile && (
          <div className="p-5 space-y-5">
            {/* Profile Header Controls: Title, category, reorder & delete */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono-numbers font-semibold">
                    {currentProfile.profileCode || 'CUSTOM'}
                  </span>
                  <input
                    type="text"
                    value={currentProfile.titleEn}
                    onChange={(e) => handleUpdateProfile(currentProfile.id, { titleEn: e.target.value })}
                    className="text-base font-black text-slate-900 border-b border-dashed border-slate-300 hover:border-rose-600 focus:border-rose-600 focus:outline-none px-1"
                    placeholder="Profile Name (English)"
                  />
                  <span className="text-slate-400">/</span>
                  <input
                    type="text"
                    value={currentProfile.titleAr}
                    onChange={(e) => handleUpdateProfile(currentProfile.id, { titleAr: e.target.value })}
                    className="text-sm font-bold text-slate-700 border-b border-dashed border-slate-300 hover:border-rose-600 focus:border-rose-600 focus:outline-none px-1"
                    placeholder="اسم البروفايل (عربي)"
                  />
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span>نوع العينة (Sample):</span>
                  <input
                    type="text"
                    value={currentProfile.sampleType}
                    onChange={(e) => handleUpdateProfile(currentProfile.id, { sampleType: e.target.value })}
                    className="border-b border-slate-200 text-slate-700 px-1 py-0.5 font-medium"
                    placeholder="e.g. EDTA Whole Blood, Serum"
                  />
                </div>
              </div>

              {/* Profile Reordering / Delete */}
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-slate-400 ml-1">ترتيب الصفحة:</span>
                <button
                  type="button"
                  disabled={currentProfileIdx === 0}
                  onClick={() => handleMoveProfile(currentProfileIdx, 'up')}
                  className="p-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-30 disabled:pointer-events-none"
                  title="تحريك البروفايل لأعلى"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  disabled={currentProfileIdx === report.profiles.length - 1}
                  onClick={() => handleMoveProfile(currentProfileIdx, 'down')}
                  className="p-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-30 disabled:pointer-events-none"
                  title="تحريك البروفايل لأسفل"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteProfile(currentProfile.id)}
                  className="p-1.5 rounded bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 ml-2"
                  title="حذف هذا البروفايل"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Test Parameters Table:
                User requested exact order from left to right:
                Investigations / results / coloured chart / flags / references
            */}
            <div className="overflow-x-auto rounded-lg border border-slate-200">
              <table className="w-full text-right border-collapse" dir="ltr">
                <thead>
                  <tr className="bg-gradient-to-r from-red-950 via-slate-900 to-slate-900 text-white text-xs font-bold uppercase tracking-wider">
                    <th className="py-2.5 px-3 text-left w-10">#</th>
                    <th className="py-2.5 px-3 text-left">Investigations</th>
                    <th className="py-2.5 px-3 text-center w-36">Results</th>
                    <th className="py-2.5 px-3 text-center w-40">Coloured Chart</th>
                    <th className="py-2.5 px-3 text-center w-32">Flags</th>
                    <th className="py-2.5 px-3 text-left w-48">References</th>
                    <th className="py-2.5 px-2 text-center w-24">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white text-sm">
                  {currentProfile.parameters.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-8 text-slate-400 text-xs">
                        لا توجد تحاليل في هذا البروفايل حالياً. اضغط "إضافة تحليل" للبدء.
                      </td>
                    </tr>
                  ) : (
                    currentProfile.parameters.map((param, pIdx) => {
                      const isAbnormal = param.flag && param.flag !== 'NORMAL';
                      return (
                        <tr
                          key={param.id}
                          className={`hover:bg-rose-50/20 transition-colors ${
                            isAbnormal ? 'bg-rose-50/10' : ''
                          }`}
                        >
                          {/* Row Index */}
                          <td className="py-2.5 px-3 text-xs text-slate-400 font-mono-numbers text-left">
                            {pIdx + 1}
                          </td>

                          {/* 1. Investigations */}
                          <td className="py-2.5 px-3 text-left">
                            <div>
                              <input
                                type="text"
                                value={param.name}
                                onChange={(e) => handleUpdateParameter(currentProfile.id, param.id, { name: e.target.value })}
                                className="w-full font-bold text-slate-900 bg-transparent hover:bg-slate-50 focus:bg-white rounded px-1.5 py-1 focus:outline-none focus:ring-1 focus:ring-rose-500 border border-transparent focus:border-rose-400 text-sm"
                              />
                              {param.method && (
                                <span className="text-[10px] text-slate-400 px-1 block font-mono">
                                  Method: {param.method}
                                </span>
                              )}
                            </div>
                          </td>

                          {/* 2. Results */}
                          <td className="py-2.5 px-3 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <input
                                type="text"
                                placeholder="النتيجة"
                                value={param.result}
                                onChange={(e) => handleUpdateParameter(currentProfile.id, param.id, { result: e.target.value })}
                                className={`w-24 text-center font-black font-mono-numbers text-sm rounded-md px-2 py-1 border transition-all ${
                                  param.flag === 'HIGH' || param.flag === 'PANIC_HIGH'
                                    ? 'bg-rose-50 text-rose-900 border-rose-400 font-extrabold'
                                    : param.flag === 'LOW' || param.flag === 'PANIC_LOW'
                                    ? 'bg-amber-50 text-amber-900 border-amber-400 font-extrabold'
                                    : 'bg-slate-50 text-slate-900 border-slate-300 focus:bg-white focus:border-rose-600'
                                } focus:outline-none focus:ring-2 focus:ring-rose-500/20`}
                              />
                              <span className="text-xs text-slate-500 font-medium">
                                {param.unit}
                              </span>
                            </div>
                          </td>

                          {/* 3. Coloured chart */}
                          <td className="py-2 px-2 text-center">
                            <ColouredRangeChart
                              resultStr={param.result}
                              minNormal={param.minNormal}
                              maxNormal={param.maxNormal}
                              flag={param.flag}
                              textReference={param.textReference}
                            />
                          </td>

                          {/* 4. Flags */}
                          <td className="py-2.5 px-3 text-center">
                            <FlagBadge flag={param.flag} />
                          </td>

                          {/* 5. References */}
                          <td className="py-2.5 px-3 text-left">
                            <div className="space-y-0.5">
                              <span className="text-xs text-slate-700 font-mono-numbers block font-medium">
                                {formatReferenceDisplay(param)}
                              </span>
                              {/* Edit references trigger */}
                              {editingParamId === param.id ? (
                                <div className="p-2 bg-slate-100 rounded-lg space-y-1 text-xs border border-slate-300 mt-1">
                                  <div className="flex gap-1 items-center">
                                    <span className="text-[10px] text-slate-500">Min:</span>
                                    <input
                                      type="number"
                                      step="any"
                                      value={param.minNormal !== undefined ? param.minNormal : ''}
                                      onChange={(e) => handleUpdateParameter(currentProfile.id, param.id, { minNormal: e.target.value ? parseFloat(e.target.value) : undefined })}
                                      className="w-14 bg-white border border-slate-300 rounded px-1 text-xs"
                                    />
                                    <span className="text-[10px] text-slate-500">Max:</span>
                                    <input
                                      type="number"
                                      step="any"
                                      value={param.maxNormal !== undefined ? param.maxNormal : ''}
                                      onChange={(e) => handleUpdateParameter(currentProfile.id, param.id, { maxNormal: e.target.value ? parseFloat(e.target.value) : undefined })}
                                      className="w-14 bg-white border border-slate-300 rounded px-1 text-xs"
                                    />
                                  </div>
                                  <div className="flex gap-1 items-center">
                                    <span className="text-[10px] text-slate-500">Unit:</span>
                                    <input
                                      type="text"
                                      value={param.unit}
                                      onChange={(e) => handleUpdateParameter(currentProfile.id, param.id, { unit: e.target.value })}
                                      className="w-20 bg-white border border-slate-300 rounded px-1 text-xs"
                                    />
                                    <button
                                      onClick={() => setEditingParamId(null)}
                                      className="text-[10px] bg-slate-800 text-white px-2 py-0.5 rounded ml-auto"
                                    >
                                      تم
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => setEditingParamId(param.id)}
                                  className="text-[10px] text-rose-800 hover:text-rose-950 underline flex items-center gap-0.5"
                                >
                                  <Edit2 className="w-2.5 h-2.5" />
                                  <span>تعديل المعدل</span>
                                </button>
                              )}
                            </div>
                          </td>

                          {/* Row Actions: Reorder & Delete */}
                          <td className="py-2 px-2 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <button
                                type="button"
                                disabled={pIdx === 0}
                                onClick={() => handleMoveParameter(currentProfile.id, pIdx, 'up')}
                                className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-20"
                                title="تحريك لأعلى"
                              >
                                <ArrowUp className="w-3 h-3" />
                              </button>
                              <button
                                type="button"
                                disabled={pIdx === currentProfile.parameters.length - 1}
                                onClick={() => handleMoveParameter(currentProfile.id, pIdx, 'down')}
                                className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-20"
                                title="تحريك لأسفل"
                              >
                                <ArrowDown className="w-3 h-3" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteParameter(currentProfile.id, param.id)}
                                className="p-1 text-rose-600 hover:text-rose-900"
                                title="حذف هذا التحليل"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Quick add manual parameter to this profile */}
            <div className="flex justify-start">
              <button
                type="button"
                onClick={onOpenManualTest}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-rose-900 bg-rose-50 hover:bg-rose-100 rounded-lg border border-rose-200 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>إضافة تحليل آخر يدوي لهذا البروفايل</span>
              </button>
            </div>

            {/* Interpretation & Comment Section (Interpretation and comment) */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-rose-900" />
                  <h4 className="text-xs font-bold text-slate-900">
                    Clinical Interpretation & Comment (التعليق والتقرير الإكلينيكي)
                  </h4>
                </div>

                {/* Predefined comment templates for Kasr Al Ainy pathology */}
                {COMMON_INTERPRETATIONS[currentProfile.profileCode] && (
                  <div className="relative group">
                    <button
                      type="button"
                      className="flex items-center gap-1 text-[11px] font-semibold text-rose-900 bg-white px-2.5 py-1 rounded-md border border-rose-200 hover:bg-rose-50 transition-colors"
                    >
                      <Sparkles className="w-3 h-3 text-rose-700" />
                      <span>قوالب تعليقات استشارية جاهزة</span>
                      <ChevronDown className="w-3 h-3" />
                    </button>
                    <div className="absolute left-0 mt-1 w-80 bg-white rounded-lg shadow-xl border border-slate-200 p-2 hidden group-hover:block z-20 space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 px-2 py-1">اختر تعليقاً إكلينيكياً معتمداً:</p>
                      {COMMON_INTERPRETATIONS[currentProfile.profileCode].map((txt, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleUpdateProfile(currentProfile.id, { interpretation: txt })}
                          className="w-full text-right p-2 text-xs text-slate-700 hover:bg-rose-50 hover:text-rose-950 rounded transition-colors"
                        >
                          {txt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <textarea
                  rows={2}
                  value={currentProfile.interpretation || ''}
                  onChange={(e) => handleUpdateProfile(currentProfile.id, { interpretation: e.target.value })}
                  placeholder="اكتب التفسير الإكلينيكي للنتائج (Clinical Interpretation)..."
                  className="w-full text-xs bg-white border border-slate-300 rounded-lg p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-600"
                />

                <input
                  type="text"
                  value={currentProfile.comment || ''}
                  onChange={(e) => handleUpdateProfile(currentProfile.id, { comment: e.target.value })}
                  placeholder="ملاحظة إضافية للبروفايل (مثل: تم التأكيد بإعادة الفحص، عينة صيام، إلخ...)"
                  className="w-full text-xs bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-rose-500"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Signatures Selection Section:
          User requested:
          امضاءات
          اختبار من قائمه
          Lab CHEMIST
          Verify by
          Pathologist
          اضافه اسماء تحت كل بند للاختيار
      */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <UserCheck className="w-5 h-5 text-rose-900" />
          <div>
            <h3 className="text-sm font-bold text-slate-900">اعتماد وإمضاءات الفريق الطبي المعملي</h3>
            <p className="text-xs text-slate-500">اختر أو عدل أسماء المسؤولين عن التحليل والمراجعة والاعتماد النهائي</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 1. Lab CHEMIST */}
          <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <label className="block text-xs font-bold text-slate-800">
              1. Lab CHEMIST (كيميائي المعمل)
            </label>
            <select
              value={report.staff.labChemist}
              onChange={(e) => handleStaffChange('labChemist', e.target.value)}
              className="w-full text-xs font-medium bg-white border border-slate-300 rounded-lg p-2 text-slate-900 focus:ring-2 focus:ring-rose-500/20"
            >
              {STAFF_OPTIONS.chemists.map((chem, idx) => (
                <option key={idx} value={chem}>{chem}</option>
              ))}
              <option value="custom">-- إدخال اسم يدوي مخصص --</option>
            </select>
            <input
              type="text"
              value={report.staff.labChemist}
              onChange={(e) => handleStaffChange('labChemist', e.target.value)}
              placeholder="تعديل الاسم واللقب..."
              className="w-full text-xs bg-white border border-slate-200 rounded p-1.5 text-slate-800"
            />
          </div>

          {/* 2. Verify by */}
          <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <label className="block text-xs font-bold text-slate-800">
              2. Verify by (مراجعة وتدقيق)
            </label>
            <select
              value={report.staff.verifiedBy}
              onChange={(e) => handleStaffChange('verifiedBy', e.target.value)}
              className="w-full text-xs font-medium bg-white border border-slate-300 rounded-lg p-2 text-slate-900 focus:ring-2 focus:ring-rose-500/20"
            >
              {STAFF_OPTIONS.verifiers.map((ver, idx) => (
                <option key={idx} value={ver}>{ver}</option>
              ))}
              <option value="custom">-- إدخال اسم يدوي مخصص --</option>
            </select>
            <input
              type="text"
              value={report.staff.verifiedBy}
              onChange={(e) => handleStaffChange('verifiedBy', e.target.value)}
              placeholder="تعديل الاسم واللقب..."
              className="w-full text-xs bg-white border border-slate-200 rounded p-1.5 text-slate-800"
            />
          </div>

          {/* 3. Pathologist */}
          <div className="space-y-1.5 p-3 rounded-xl bg-rose-50/60 border border-rose-200">
            <label className="block text-xs font-bold text-rose-950">
              3. Pathologist (أطباء الباثولوجيا الإكلينيكية والكيميائية)
            </label>
            <select
              value={report.staff.pathologist}
              onChange={(e) => handleStaffChange('pathologist', e.target.value)}
              className="w-full text-xs font-bold bg-white border border-rose-300 rounded-lg p-2 text-rose-950 focus:ring-2 focus:ring-rose-500/20"
            >
              {STAFF_OPTIONS.pathologists.map((path, idx) => (
                <option key={idx} value={path}>{path}</option>
              ))}
              <option value="custom">-- إدخال اسم يدوي مخصص --</option>
            </select>
            <input
              type="text"
              value={report.staff.pathologist}
              onChange={(e) => handleStaffChange('pathologist', e.target.value)}
              placeholder="تعديل اسم الاستشاري..."
              className="w-full text-xs bg-white border border-rose-200 rounded p-1.5 text-slate-900 font-semibold"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
