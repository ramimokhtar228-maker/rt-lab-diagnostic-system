import React, { useState } from 'react';
import { LAB_CATALOG } from '../data/labCatalog';
import { CatalogProfileTemplate, TestProfile } from '../types/lab';
import { BookOpen, Search, Filter, FlaskConical, CheckCircle, Info } from 'lucide-react';

interface CatalogBrowserProps {
  onSelectProfileForNewCase: (template: CatalogProfileTemplate) => void;
}

export const CatalogBrowser: React.FC<CatalogBrowserProps> = ({
  onSelectProfileForNewCase
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedCode, setExpandedCode] = useState<string | null>(LAB_CATALOG[0]?.code || null);

  const categories = ['All', ...Array.from(new Set(LAB_CATALOG.map(c => c.category)))];

  const filtered = LAB_CATALOG.filter(item => {
    const matchesSearch =
      item.titleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.titleAr.includes(searchTerm) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.parameters.some(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-900 to-rose-700 text-white flex items-center justify-center shadow-md">
            <BookOpen className="w-5 h-5 text-rose-300" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              كتالوج التحاليل والفحوصات الطبية المعتمدة
            </h2>
            <p className="text-xs text-slate-500">
              المعايير المرجعية، وحدات القياس، وطرق المعايرة وفق كلية طب قصر العيني
            </p>
          </div>
        </div>

        <div className="text-xs text-slate-500">
          إجمالي الفحوصات: <strong className="text-rose-950 font-bold">{LAB_CATALOG.length} بروفايل طبي</strong>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="ابحث باسم التحليل، الرمز (مثل: CBC, ALT, TSH, HbA1c, Ferritin)..."
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
        {filtered.map(item => {
          const isExpanded = expandedCode === item.code;

          return (
            <div
              key={item.code}
              className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs transition-all"
            >
              {/* Profile Card Header */}
              <div
                onClick={() => setExpandedCode(isExpanded ? null : item.code)}
                className="p-4 bg-white hover:bg-slate-50/80 cursor-pointer flex items-center justify-between gap-4 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-12 text-center py-1 font-mono-numbers text-xs font-black bg-rose-50 text-rose-900 rounded-md border border-rose-200">
                    {item.code}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-900 text-sm">{item.titleEn}</h3>
                      <span className="text-slate-400 text-xs">·</span>
                      <h4 className="text-xs font-bold text-slate-600">{item.titleAr}</h4>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-0.5">
                      <span>القسم: <strong className="text-slate-700">{item.category}</strong></span>
                      <span>·</span>
                      <span>العينة: <strong className="text-slate-700">{item.sampleType}</strong></span>
                      <span>·</span>
                      <span>عدد المعاملات: <strong className="text-rose-900">{item.parameters.length}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProfileForNewCase(item);
                    }}
                    className="px-3 py-1.5 bg-rose-900 hover:bg-rose-800 text-white text-xs font-bold rounded-lg shadow-2xs transition-all"
                  >
                    بدء حالة بهذا البروفايل
                  </button>
                  <span className="text-xs text-slate-400 font-bold px-1">
                    {isExpanded ? '▲' : '▼'}
                  </span>
                </div>
              </div>

              {/* Expanded Details Table */}
              {isExpanded && (
                <div className="p-4 bg-slate-50/60 border-t border-slate-200 space-y-4">
                  <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
                    <table className="w-full text-right text-xs" dir="ltr">
                      <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                        <tr>
                          <th className="py-2.5 px-3 text-left w-10">#</th>
                          <th className="py-2.5 px-3 text-left">Parameter / Investigation</th>
                          <th className="py-2.5 px-3 text-center">Unit</th>
                          <th className="py-2.5 px-3 text-left">Standard Reference Interval</th>
                          <th className="py-2.5 px-3 text-left">Method / Technology</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {item.parameters.map((p, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/80">
                            <td className="py-2 px-3 text-left font-mono-numbers text-slate-400">{idx + 1}</td>
                            <td className="py-2 px-3 text-left font-bold text-slate-900">{p.name}</td>
                            <td className="py-2 px-3 text-center font-mono-numbers text-slate-600">{p.unit || '—'}</td>
                            <td className="py-2 px-3 text-left font-mono-numbers text-slate-700">
                              {p.textReference
                                ? p.textReference
                                : p.minNormal !== undefined && p.maxNormal !== undefined
                                ? `${p.minNormal} - ${p.maxNormal} ${p.unit}`
                                : p.maxNormal !== undefined
                                ? `< ${p.maxNormal} ${p.unit}`
                                : p.minNormal !== undefined
                                ? `> ${p.minNormal} ${p.unit}`
                                : '—'}
                            </td>
                            <td className="py-2 px-3 text-left font-mono text-[11px] text-slate-500">
                              {p.method || 'Standard Clinical Chemistry / Hematology'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {item.defaultInterpretation && (
                    <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs">
                      <span className="font-bold text-rose-950 block mb-0.5">التعليق الاستشاري النموذجي:</span>
                      <p className="text-slate-700 italic">{item.defaultInterpretation}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
