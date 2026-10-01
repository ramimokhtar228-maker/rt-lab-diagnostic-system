import React, { useState } from 'react';
import { CatalogProfileTemplate, TestParameter } from '../types/lab';
import { ParameterEditModal } from './ParameterEditModal';
import { AddParameterModal } from './AddParameterModal';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Plus, 
  Edit2, 
  Trash2, 
  RotateCcw, 
  CheckCircle, 
  X, 
  Save, 
  Sparkles,
  Layers,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface CatalogBrowserProps {
  catalog: CatalogProfileTemplate[];
  onUpdateCatalog: (newCatalog: CatalogProfileTemplate[]) => void;
  onResetCatalog: () => void;
  onSelectProfileForNewCase: (template: CatalogProfileTemplate) => void;
}

export const CatalogBrowser: React.FC<CatalogBrowserProps> = ({
  catalog,
  onUpdateCatalog,
  onResetCatalog,
  onSelectProfileForNewCase
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedCode, setExpandedCode] = useState<string | null>(catalog[0]?.code || null);

  // Modals state
  const [isNewProfileModalOpen, setIsNewProfileModalOpen] = useState(false);
  const [editingProfileCode, setEditingProfileCode] = useState<string | null>(null);

  const [activeProfileForParam, setActiveProfileForParam] = useState<string | null>(null);
  const [paramToEdit, setParamToEdit] = useState<{ profileCode: string; paramIndex: number; param: TestParameter } | null>(null);
  const [isAddParamModalOpen, setIsAddParamModalOpen] = useState(false);

  // New profile form state
  const [newProfCode, setNewProfCode] = useState('');
  const [newProfTitleEn, setNewProfTitleEn] = useState('');
  const [newProfTitleAr, setNewProfTitleAr] = useState('');
  const [newProfCategory, setNewProfCategory] = useState('Clinical Chemistry');
  const [newProfSample, setNewProfSample] = useState('Serum');
  const [newProfInterp, setNewProfInterp] = useState('');

  const categories = ['All', ...Array.from(new Set(catalog.map(c => c.category)))];

  const filtered = catalog.filter(item => {
    const matchesSearch =
      item.titleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.titleAr.includes(searchTerm) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.parameters.some(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Handle Create New Profile in Catalog
  const handleCreateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProfCode.trim() || !newProfTitleEn.trim()) {
      alert('برجاء كتابة رمز الفحص واسمه باللغة الإنجليزية');
      return;
    }

    const cleanCode = newProfCode.trim().toUpperCase();
    if (catalog.some(c => c.code === cleanCode)) {
      alert(`الرمز (${cleanCode}) موجود بالفعل في الكتالوج، يرجى اختيار رمز آخر.`);
      return;
    }

    const newTemplate: CatalogProfileTemplate = {
      code: cleanCode,
      titleEn: newProfTitleEn.trim(),
      titleAr: newProfTitleAr.trim() || newProfTitleEn.trim(),
      category: newProfCategory.trim() || 'General',
      sampleType: newProfSample.trim() || 'Serum',
      defaultInterpretation: newProfInterp.trim() || undefined,
      parameters: []
    };

    const updated = [newTemplate, ...catalog];
    onUpdateCatalog(updated);
    setExpandedCode(cleanCode);

    // Reset form
    setNewProfCode('');
    setNewProfTitleEn('');
    setNewProfTitleAr('');
    setNewProfInterp('');
    setIsNewProfileModalOpen(false);
  };

  // Handle Edit Profile Meta
  const handleUpdateProfileMeta = (code: string, updates: Partial<CatalogProfileTemplate>) => {
    const updated = catalog.map(c => {
      if (c.code === code) {
        return { ...c, ...updates };
      }
      return c;
    });
    onUpdateCatalog(updated);
  };

  // Handle Delete Profile
  const handleDeleteProfile = (code: string) => {
    if (confirm(`هل أنت متأكد من حذف بروفايل (${code}) بالكامل من الكتالوج؟`)) {
      const updated = catalog.filter(c => c.code !== code);
      onUpdateCatalog(updated);
      if (expandedCode === code) {
        setExpandedCode(updated[0]?.code || null);
      }
    }
  };

  // Add parameter to a catalog profile
  const handleAddParamToProfile = (newParam: Omit<TestParameter, 'id' | 'result' | 'flag'>) => {
    if (!activeProfileForParam) return;

    const updated = catalog.map(c => {
      if (c.code === activeProfileForParam) {
        return {
          ...c,
          parameters: [...c.parameters, newParam]
        };
      }
      return c;
    });

    onUpdateCatalog(updated);
  };

  // Edit parameter in a catalog profile
  const handleSaveParamEdit = (updatedParam: Partial<TestParameter>) => {
    if (!paramToEdit) return;

    const { profileCode, paramIndex } = paramToEdit;
    const updated = catalog.map(c => {
      if (c.code === profileCode) {
        const params = [...c.parameters];
        params[paramIndex] = {
          ...params[paramIndex],
          ...updatedParam
        };
        return { ...c, parameters: params };
      }
      return c;
    });

    onUpdateCatalog(updated);
    setParamToEdit(null);
  };

  // Delete parameter from a catalog profile
  const handleDeleteParam = (profileCode: string, paramIndex: number) => {
    if (confirm('هل تريد حذف هذا التحليل من البروفايل في الكتالوج؟')) {
      const updated = catalog.map(c => {
        if (c.code === profileCode) {
          const params = c.parameters.filter((_, idx) => idx !== paramIndex);
          return { ...c, parameters: params };
        }
        return c;
      });
      onUpdateCatalog(updated);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
      {/* Title & Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-900 to-rose-700 text-white flex items-center justify-center shadow-md">
            <BookOpen className="w-5 h-5 text-rose-300" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              كتالوج التحاليل والفحوصات الطبية المعتمدة (قابل للتعديل الكامل)
            </h2>
            <p className="text-xs text-slate-500">
              يمكنك إضافة وتعديل وحذف أي تحليل أو بروفايل والمعدلات الطبيعية ووحدات القياس
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Add New Profile to Catalog */}
          <button
            type="button"
            onClick={() => setIsNewProfileModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-rose-900 hover:bg-rose-800 text-white text-xs font-bold rounded-lg shadow-sm transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>+ إضافة بروفايل جديد للكتالوج</span>
          </button>

          {/* Reset to Default */}
          <button
            type="button"
            onClick={onResetCatalog}
            className="flex items-center gap-1 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg border border-slate-300 transition-colors"
            title="استعادة الكتالوج المعتمد الأصلي"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>استعادة الافتراضي</span>
          </button>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="ابحث باسم التحليل، الرمز (مثل: CBC, Urine, Stool, Semen, Culture, HOMA, ACR, Calcium)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-600 transition-all"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-rose-900 text-white shadow-xs font-bold'
                  : 'bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200'
              }`}
            >
              {cat === 'All' ? 'جميع الأقسام' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Profiles Accordion List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-10 text-slate-400 text-xs">
            لا توجد تحاليل مطابقة للبحث. يمكنك الضغط على "+ إضافة بروفايل جديد للكتالوج" لإضافتها.
          </div>
        ) : (
          filtered.map(item => {
            const isExpanded = expandedCode === item.code;

            return (
              <div
                key={item.code}
                className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs transition-all"
              >
                {/* Profile Card Header */}
                <div className="p-4 bg-white hover:bg-slate-50/80 flex items-center justify-between gap-4 transition-colors">
                  <div
                    onClick={() => setExpandedCode(isExpanded ? null : item.code)}
                    className="flex items-center gap-3 cursor-pointer flex-1"
                  >
                    <span className="w-14 text-center py-1 font-mono-numbers text-xs font-black bg-rose-50 text-rose-900 rounded-md border border-rose-200">
                      {item.code}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm text-slate-900">{item.titleEn}</h3>
                        <span className="text-xs text-rose-800 font-semibold">• {item.titleAr}</span>
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-0.5">
                        <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">{item.category}</span>
                        <span>العينة: <strong>{item.sampleType}</strong></span>
                        <span>عدد الفحوصات: <strong>{item.parameters.length}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Profile Actions: Start Case, Add Param, Delete */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectProfileForNewCase(item)}
                      className="px-3 py-1.5 bg-rose-900 hover:bg-rose-800 text-white rounded-lg text-xs font-bold transition-all shadow-xs"
                    >
                      فتح حالة بهذا الفحص
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setActiveProfileForParam(item.code);
                        setIsAddParamModalOpen(true);
                      }}
                      className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-colors"
                      title="إضافة تحليل لهذا البروفايل في الكتالوج"
                    >
                      <Plus className="w-4 h-4 text-rose-800" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteProfile(item.code)}
                      className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      title="حذف هذا البروفايل من الكتالوج"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setExpandedCode(isExpanded ? null : item.code)}
                      className="p-1 text-slate-400 hover:text-slate-700"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Details Table */}
                {isExpanded && (
                  <div className="p-4 bg-slate-50/60 border-t border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700">
                        محتويات الفحص والمعدلات الطبيعية المعتمدة (يمكنك التعديل أو الحذف):
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveProfileForParam(item.code);
                          setIsAddParamModalOpen(true);
                        }}
                        className="text-xs text-rose-900 font-bold hover:underline flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>إضافة تحليل جديد لهذا البروفايل</span>
                      </button>
                    </div>

                    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
                      <table className="w-full text-right text-xs" dir="ltr">
                        <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                          <tr>
                            <th className="p-2.5 text-left">#</th>
                            <th className="p-2.5 text-left">Parameter / Test</th>
                            <th className="p-2.5 text-center">Unit</th>
                            <th className="p-2.5 text-left">Normal Range</th>
                            <th className="p-2.5 text-left">Method / Notes</th>
                            <th className="p-2.5 text-center w-24">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {item.parameters.length === 0 ? (
                            <tr>
                              <td colSpan={6} className="text-center py-4 text-slate-400">
                                لا توجد تحاليل مسجلة في هذا البروفايل حتى الآن.
                              </td>
                            </tr>
                          ) : (
                            item.parameters.map((param, pIdx) => {
                              let rangeText = 'Normal';
                              if (param.textReference) rangeText = param.textReference;
                              else if (param.minNormal !== undefined && param.maxNormal !== undefined) {
                                rangeText = `${param.minNormal} - ${param.maxNormal} ${param.unit || ''}`;
                              } else if (param.maxNormal !== undefined) {
                                rangeText = `< ${param.maxNormal} ${param.unit || ''}`;
                              }

                              return (
                                <tr key={pIdx} className="hover:bg-slate-50 transition-colors">
                                  <td className="p-2.5 text-slate-400 font-mono">{pIdx + 1}</td>
                                  <td className="p-2.5 font-bold text-slate-900 text-left">{param.name}</td>
                                  <td className="p-2.5 text-center font-mono text-slate-600">{param.unit || '—'}</td>
                                  <td className="p-2.5 text-left font-mono font-medium text-slate-700">{rangeText}</td>
                                  <td className="p-2.5 text-left text-slate-500 font-mono text-[11px]">
                                    {param.method ? `[${param.method}] ` : ''}
                                    {param.notes || ''}
                                  </td>
                                  <td className="p-2.5 text-center">
                                    <div className="flex items-center justify-center gap-1">
                                      {/* Edit Parameter in Catalog */}
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setParamToEdit({
                                            profileCode: item.code,
                                            paramIndex: pIdx,
                                            param: {
                                              ...param,
                                              id: `p-${pIdx}`,
                                              result: '',
                                              flag: ''
                                            }
                                          });
                                        }}
                                        className="p-1 text-slate-600 hover:text-rose-900 hover:bg-rose-50 rounded"
                                        title="تعديل هذا التحليل"
                                      >
                                        <Edit2 className="w-3.5 h-3.5" />
                                      </button>

                                      {/* Delete Parameter from Catalog */}
                                      <button
                                        type="button"
                                        onClick={() => handleDeleteParam(item.code, pIdx)}
                                        className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                                        title="حذف هذا التحليل من الكتالوج"
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
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Modal: Create New Profile in Catalog */}
      {isNewProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md overflow-hidden text-right">
            <div className="bg-gradient-to-r from-red-900 to-rose-800 text-white p-4 flex items-center justify-between">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <Plus className="w-4 h-4 text-rose-300" />
                <span>إضافة بروفايل فحص طبي جديد للكتالوج</span>
              </h3>
              <button onClick={() => setIsNewProfileModalOpen(false)} className="text-rose-200 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProfile} className="p-5 space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">رمز التحليل (Code):</label>
                <input
                  type="text"
                  value={newProfCode}
                  onChange={(e) => setNewProfCode(e.target.value.toUpperCase())}
                  className="w-full text-xs font-mono font-bold p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  dir="ltr"
                  placeholder="e.g. VITAMINS, ARTHRITIS, IMMUNO"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">اسم الفحص بالإنجليزية (Profile Title EN):</label>
                <input
                  type="text"
                  value={newProfTitleEn}
                  onChange={(e) => setNewProfTitleEn(e.target.value)}
                  className="w-full text-xs font-bold p-2.5 border border-slate-300 rounded-lg"
                  dir="ltr"
                  placeholder="e.g. Vitamins & Trace Elements Panel"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">اسم الفحص بالعربية (Title AR):</label>
                <input
                  type="text"
                  value={newProfTitleAr}
                  onChange={(e) => setNewProfTitleAr(e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-lg"
                  placeholder="مثال: باقة الفيتامينات والمعادن النادرة"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">القسم (Category):</label>
                  <input
                    type="text"
                    value={newProfCategory}
                    onChange={(e) => setNewProfCategory(e.target.value)}
                    className="w-full text-xs p-2 border border-slate-300 rounded-lg"
                    placeholder="Clinical Chemistry"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">نوع العينة (Sample):</label>
                  <input
                    type="text"
                    value={newProfSample}
                    onChange={(e) => setNewProfSample(e.target.value)}
                    className="w-full text-xs p-2 border border-slate-300 rounded-lg"
                    placeholder="Serum"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">التفسير الافتراضي (Default Interpretation):</label>
                <textarea
                  rows={2}
                  value={newProfInterp}
                  onChange={(e) => setNewProfInterp(e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-lg"
                  placeholder="التفسير السريري التلقائي الذي يظهر في التقرير..."
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsNewProfileModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-rose-900 hover:bg-rose-800 rounded-lg shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>إنشاء البروفايل</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Parameter in Catalog */}
      <ParameterEditModal
        isOpen={!!paramToEdit}
        onClose={() => setParamToEdit(null)}
        parameter={paramToEdit ? paramToEdit.param : null}
        onSave={handleSaveParamEdit}
      />

      {/* Modal: Add Parameter to Catalog Profile */}
      <AddParameterModal
        isOpen={isAddParamModalOpen}
        onClose={() => {
          setIsAddParamModalOpen(false);
          setActiveProfileForParam(null);
        }}
        onAdd={handleAddParamToProfile}
      />
    </div>
  );
};
