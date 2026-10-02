import React from 'react';
import { PWAInstallButton } from './PWAInstallButton';
import { RTLogo } from './RTLogo';
import { 
  Building2, 
  FlaskConical, 
  Search,
  PhoneCall,
  Edit3, 
  PlusCircle, 
  TrendingUp, 
  BookOpen, 
  Settings, 
  Archive,
  Package,
  CreditCard,
  Building
} from 'lucide-react';

export type MainNavTab = 
  | 'archive' 
  | 'new-patient' 
  | 'packages' 
  | 'catalog' 
  | 'patient-cards' 
  | 'trends' 
  | 'staff-facilities';

interface HeaderProps {
  activeTab: MainNavTab;
  setActiveTab: (tab: MainNavTab) => void;
  searchTerm: string;
  setSearchTerm: (s: string) => void;
  onNewPatientClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  searchTerm,
  setSearchTerm,
  onNewPatientClick
}) => {
  const [isBranchesModalOpen, setIsBranchesModalOpen] = React.useState(false);
  const [contactInfo, setContactInfo] = React.useState(() => {
    try {
      const saved = localStorage.getItem('rt_lab_contacts');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      hotline: '01001234567 / 02-23658900',
      emergencyPhone: '01001234567',
      branchesSummary: 'القاهرة · الجيزة · الإسكندرية',
      cairoAddress: 'شارع المنيل الرئيسي، تقاطع قصر العيني، القاهرة (02-23658900)',
      gizaAddress: 'شارع التحرير، ميدان الدقي والجيزة (02-37612345)',
      alexAddress: 'شارع فوزي معاذ، ميدان فيكتور عمانويل، سموحة، الإسكندرية (03-4209800)'
    };
  });

  const [editHotline, setEditHotline] = React.useState(contactInfo.hotline);
  const [editBranches, setEditBranches] = React.useState(contactInfo.branchesSummary);
  const [editCairo, setEditCairo] = React.useState(contactInfo.cairoAddress);
  const [editGiza, setEditGiza] = React.useState(contactInfo.gizaAddress);
  const [editAlex, setEditAlex] = React.useState(contactInfo.alexAddress);

  const handleSaveContacts = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      hotline: editHotline,
      emergencyPhone: editHotline.split('/')[0]?.trim() || editHotline,
      branchesSummary: editBranches,
      cairoAddress: editCairo,
      gizaAddress: editGiza,
      alexAddress: editAlex
    };
    setContactInfo(updated);
    try {
      localStorage.setItem('rt_lab_contacts', JSON.stringify(updated));
      window.dispatchEvent(new Event('rt-lab-contacts-updated'));
    } catch {}
    setIsBranchesModalOpen(false);
  };

  return (
    <header className="bg-slate-900 text-white shadow-xl border-b border-rose-950/40 no-print sticky top-0 z-40">
      {/* Top Credentials Ribbon */}
      <div className="bg-gradient-to-r from-[#630606] via-[#850b0b] to-[#0f172a] text-xs py-1.5 px-4 sm:px-8 border-b border-red-900/40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-rose-100">
          <div className="flex items-center gap-3">
            <span className="font-black tracking-wide text-white">معامل RT للتحاليل التشخيصية</span>
            <span className="text-rose-300/60 hidden sm:inline">|</span>
            <span className="hidden sm:inline">معامل رامي مختار</span>
            <span className="text-rose-300/60 hidden sm:inline">|</span>
            <span className="font-semibold text-rose-200">أطباء الباثولوجيا الإكلينيكية والكيميائية - كلية طب قصر العيني</span>
          </div>
          <div className="flex items-center gap-3 text-xs flex-wrap">
            <span className="flex items-center gap-1.5 text-rose-100 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              الخط الساخن: {contactInfo.hotline}
            </span>
            <span className="text-rose-300/60 hidden sm:inline">|</span>
            <span className="text-rose-200 font-medium hidden sm:inline">{contactInfo.branchesSummary}</span>
            <button
              type="button"
              onClick={() => {
                setEditHotline(contactInfo.hotline);
                setEditBranches(contactInfo.branchesSummary);
                setEditCairo(contactInfo.cairoAddress);
                setEditGiza(contactInfo.gizaAddress);
                setEditAlex(contactInfo.alexAddress);
                setIsBranchesModalOpen(true);
              }}
              className="px-2 py-0.5 bg-rose-950/60 hover:bg-rose-900 text-rose-200 hover:text-white rounded border border-rose-800 text-[10px] font-bold flex items-center gap-1 transition-all"
              title="تعديل وحفظ الخط الساخن وفروع القاهرة / الجيزة / الإسكندرية"
            >
              <Edit3 className="w-3 h-3" />
              <span>تعديل الفروع والخط الساخن</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Brand Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand identity with Logo and requested Slogan */}
        <div 
          className="cursor-pointer transition-transform active:scale-98"
          onClick={() => setActiveTab('archive')}
        >
          <RTLogo size="md" showSlogan={true} sloganColor="text-rose-300" />
        </div>

        {/* Global Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="بحث برقم التحليل، اسم المريض، أو الهاتف..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-800/90 text-xs text-slate-100 placeholder-slate-400 rounded-lg pl-9 pr-3 py-2 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Quick Actions & PWA Install */}
        <div className="flex items-center gap-2">
          <PWAInstallButton />
          
          <button
            onClick={onNewPatientClick}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-800 to-rose-700 hover:from-red-700 hover:to-rose-600 text-white font-bold text-xs rounded-xl shadow-md shadow-red-950/40 hover:shadow-lg transition-all active:scale-[0.98]"
          >
            <PlusCircle className="w-4 h-4" />
            <span>تسجيل حالة جديدة</span>
          </button>
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 border-t border-slate-800/80">
        <nav className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-none text-xs font-semibold">
          <button
            onClick={() => setActiveTab('archive')}
            className={`flex items-center gap-1.5 px-3 py-2.5 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'archive'
                ? 'border-rose-500 text-white font-black bg-slate-800/50'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/20'
            }`}
          >
            <Archive className="w-4 h-4 text-rose-400" />
            <span>أرشيف وسجل المرضى</span>
          </button>

          <button
            onClick={() => setActiveTab('new-patient')}
            className={`flex items-center gap-1.5 px-3 py-2.5 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'new-patient'
                ? 'border-rose-500 text-white font-black bg-slate-800/50'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/20'
            }`}
          >
            <FlaskConical className="w-4 h-4 text-rose-400" />
            <span>إدخال النتائج والفحوصات</span>
          </button>

          {/* NEW: Comprehensive Packages */}
          <button
            onClick={() => setActiveTab('packages')}
            className={`flex items-center gap-1.5 px-3 py-2.5 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'packages'
                ? 'border-rose-500 text-white font-black bg-slate-800/50'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/20'
            }`}
          >
            <Package className="w-4 h-4 text-rose-400" />
            <span>باقات الفحص الشامل</span>
          </button>

          {/* UPDATED: Catalog Browser (Single & Profiles) */}
          <button
            onClick={() => setActiveTab('catalog')}
            className={`flex items-center gap-1.5 px-3 py-2.5 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'catalog'
                ? 'border-rose-500 text-white font-black bg-slate-800/50'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/20'
            }`}
          >
            <BookOpen className="w-4 h-4 text-rose-400" />
            <span>كتالوج التحاليل (المنفردة والبروفايل)</span>
          </button>

          {/* NEW: Patient Cards and Loyalty Points */}
          <button
            onClick={() => setActiveTab('patient-cards')}
            className={`flex items-center gap-1.5 px-3 py-2.5 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'patient-cards'
                ? 'border-rose-500 text-white font-black bg-slate-800/50'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/20'
            }`}
          >
            <CreditCard className="w-4 h-4 text-rose-400" />
            <span>كروت المرضى ونقاط الولاء</span>
          </button>

          <button
            onClick={() => setActiveTab('trends')}
            className={`flex items-center gap-1.5 px-3 py-2.5 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'trends'
                ? 'border-rose-500 text-white font-black bg-slate-800/50'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/20'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-rose-400" />
            <span>التطور البياني للمريض</span>
          </button>

          {/* UPDATED: Staff & Facilities with Add/Edit/Delete */}
          <button
            onClick={() => setActiveTab('staff-facilities')}
            className={`flex items-center gap-1.5 px-3 py-2.5 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'staff-facilities'
                ? 'border-rose-500 text-white font-black bg-slate-800/50'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/20'
            }`}
          >
            <Building2 className="w-4 h-4 text-rose-400" />
            <span>الطاقم والإنشاءات والفروع</span>
          </button>
        </nav>
      </div>
      {/* MODAL: EDIT HOTLINE & BRANCHES */}
      {isBranchesModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 text-slate-100 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-rose-950 text-rose-400 border border-rose-800 flex items-center justify-center font-bold">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">تعديل وحفظ الخط الساخن وفروع المعمل</h3>
                  <p className="text-[11px] text-slate-400">القاهرة / الجيزة / الإسكندرية - تظهر مباشرة في الشريط العلوي والتقارير</p>
                </div>
              </div>
              <button type="button" onClick={() => setIsBranchesModalOpen(false)} className="text-slate-400 hover:text-white text-sm">✕</button>
            </div>

            <form onSubmit={handleSaveContacts} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">أرقام الخط الساخن وطوارئ المعمل *</label>
                <input
                  type="text"
                  required
                  value={editHotline}
                  onChange={e => setEditHotline(e.target.value)}
                  placeholder="مثال: 01001234567 / 02-23658900"
                  className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-rose-200 font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">نص ملخص الفروع (في الشريط العلوي)</label>
                <input
                  type="text"
                  value={editBranches}
                  onChange={e => setEditBranches(e.target.value)}
                  placeholder="القاهرة · الجيزة · الإسكندرية"
                  className="w-full p-2 bg-slate-800 border border-slate-700 rounded-xl text-white font-medium"
                />
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div>
                  <label className="block text-slate-400 font-bold mb-0.5">فرع القاهرة (العنوان والتليفون):</label>
                  <input
                    type="text"
                    value={editCairo}
                    onChange={e => setEditCairo(e.target.value)}
                    className="w-full p-2 bg-slate-800/90 border border-slate-700 rounded-lg text-slate-200"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-bold mb-0.5">فرع الجيزة (العنوان والتليفون):</label>
                  <input
                    type="text"
                    value={editGiza}
                    onChange={e => setEditGiza(e.target.value)}
                    className="w-full p-2 bg-slate-800/90 border border-slate-700 rounded-lg text-slate-200"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-bold mb-0.5">فرع الإسكندرية (العنوان والتليفون):</label>
                  <input
                    type="text"
                    value={editAlex}
                    onChange={e => setEditAlex(e.target.value)}
                    className="w-full p-2 bg-slate-800/90 border border-slate-700 rounded-lg text-slate-200"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsBranchesModalOpen(false)}
                  className="px-4 py-2 border border-slate-700 text-slate-300 rounded-xl hover:bg-slate-800 font-bold transition-all"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-rose-800 hover:bg-rose-700 text-white rounded-xl font-bold shadow-md transition-all"
                >
                  حفظ وتطبيق التغييرات
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </header>
  );
};
