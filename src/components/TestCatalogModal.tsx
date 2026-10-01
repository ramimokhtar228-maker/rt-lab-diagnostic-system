import React, { useState } from 'react';
import { LAB_CATALOG } from '../data/labCatalog';
import { CatalogProfileTemplate, TestProfile, TestParameter } from '../types/lab';
import { Search, Plus, Check, X, BookOpen, Layers } from 'lucide-react';

interface TestCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProfile: (profile: TestProfile) => void;
  existingProfileCodes: string[];
}

export const TestCatalogModal: React.FC<TestCatalogModalProps> = ({
  isOpen,
  onClose,
  onAddProfile,
  existingProfileCodes
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  if (!isOpen) return null;

  const categories = ['All', ...Array.from(new Set(LAB_CATALOG.map(c => c.category)))];

  const filteredCatalog = LAB_CATALOG.filter(item => {
    const matchesSearch =
      item.titleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.titleAr.includes(searchTerm) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.parameters.some(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleAdd = (template: CatalogProfileTemplate) => {
    const newProfile: TestProfile = {
      id: `prof-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      profileCode: template.code,
      titleEn: template.titleEn,
      titleAr: template.titleAr,
      category: template.category,
      sampleType: template.sampleType,
      interpretation: template.defaultInterpretation || '',
      parameters: template.parameters.map((p, idx) => ({
        ...p,
        id: `param-${Date.now()}-${idx}`,
        result: '',
        flag: ''
      }))
    };

    onAddProfile(newProfile);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col border border-slate-200 overflow-hidden animate-in fade-in duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-950 via-slate-900 to-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-rose-900/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-900/60 border border-rose-700/50 flex items-center justify-center text-rose-300">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">كتالوج التحاليل والفحوصات الطبية</h3>
              <p className="text-xs text-rose-200">اختر البروفايل أو الفحص الطبي لإضافته مباشرة لحالة المريض</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Category Filter */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="ابحث بالاسم بالإنجليزية أو العربية (مثل: CBC, Glucose, وظائف كبد, TSH)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-600 transition-all"
            />
          </div>

          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-rose-900 text-white shadow-xs font-bold'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat === 'All' ? 'جميع الأقسام' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* List of Catalog Profiles */}
        <div className="p-4 overflow-y-auto flex-1 divide-y divide-slate-100 space-y-3">
          {filteredCatalog.length === 0 ? (
            <div className="py-12 text-center text-slate-500">
              <Layers className="w-12 h-12 mx-auto text-slate-300 mb-2" />
              <p className="text-sm font-semibold">لم يتم العثور على فحوصات مطابقة لبحثك</p>
              <p className="text-xs text-slate-400">يمكنك أيضاً إضافة أي تحليل يدوي مخصص من الزر في شاشة التقرير</p>
            </div>
          ) : (
            filteredCatalog.map(template => {
              const isAlreadyAdded = existingProfileCodes.includes(template.code);

              return (
                <div
                  key={template.code}
                  className="pt-3 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl hover:bg-rose-50/40 border border-transparent hover:border-rose-200/60 transition-all"
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono-numbers text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold border border-slate-200">
                        {template.code}
                      </span>
                      <h4 className="font-bold text-slate-900 text-sm">{template.titleEn}</h4>
                      <span className="text-slate-400 text-xs font-normal">|</span>
                      <span className="text-slate-600 text-xs font-semibold">{template.titleAr}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                      <span>القسم: <strong className="text-slate-700">{template.category}</strong></span>
                      <span>·</span>
                      <span>العينة: <strong className="text-slate-700">{template.sampleType}</strong></span>
                      <span>·</span>
                      <span>عدد المعاملات: <strong className="text-rose-900">{template.parameters.length}</strong></span>
                    </div>

                    <div className="text-[11px] text-slate-400 truncate max-w-xl">
                      {template.parameters.map(p => p.name).join(', ')}
                    </div>
                  </div>

                  <div className="sm:self-center">
                    <button
                      onClick={() => handleAdd(template)}
                      className={`w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                        isAlreadyAdded
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100'
                          : 'bg-rose-900 hover:bg-rose-800 text-white shadow-xs'
                      }`}
                    >
                      {isAlreadyAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>إضافة نسخة أخرى</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>إضافة للتقرير</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>إجمالي البروفايلات المتوفرة: {LAB_CATALOG.length} بروفايل طبي معتمد</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg font-semibold transition-colors"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
