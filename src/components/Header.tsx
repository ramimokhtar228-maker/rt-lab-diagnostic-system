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
  Building,
  Zap
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
  onSyncClick?: () => void;
  isSyncing?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  searchTerm,
  setSearchTerm,
  onNewPatientClick,
  onSyncClick,
  isSyncing
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
  const [editEmergency, setEditEmergency] = React.useState(contactInfo.emergencyPhone);
  const [editBranchesSummary, setEditBranchesSummary] = React.useState(contactInfo.branchesSummary);
  const [editCairo, setEditCairo] = React.useState(contactInfo.cairoAddress);
  const [editGiza, setEditGiza] = React.useState(contactInfo.gizaAddress);
  const [editAlex, setEditAlex] = React.useState(contactInfo.alexAddress);

  const handleSaveContactInfo = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      hotline: editHotline,
      emergencyPhone: editEmergency,
      branchesSummary: editBranchesSummary,
      cairoAddress: editCairo,
      gizaAddress: editGiza,
      alexAddress: editAlex
    };
    setContactInfo(updated);
    localStorage.setItem('rt_lab_contacts', JSON.stringify(updated));
    setIsBranchesModalOpen(false);
  };

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-40 shadow-lg">
      {/* Top Notification / Hotline Banner */}
      <div className="bg-rose-950/70 border-b border-rose-900/40 px-4 py-1.5 text-[11px] font-medium text-rose-200">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-rose-600/30 text-rose-300 font-bold border border-rose-500/40 text-[10px]">
              طوارئ 24/7
            </span>
            <span>الخط الساخن: <strong className="font-mono-numbers text-white">{contactInfo.hotline}</strong></span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsBranchesModalOpen(true)}
              className="hover:text-white flex items-center gap-1 transition-colors text-rose-300 underline underline-offset-2 decoration-rose-500/50"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>فروع المعمل: {contactInfo.branchesSummary}</span>
              <Edit3 className="w-3 h-3 text-rose-400 opacity-60 ml-0.5" />
            </button>
            <span className="hidden sm:inline text-rose-500">|</span>
            <span className="hidden sm:inline text-rose-300">أطباء كلية طب قصر العيني</span>
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

        {/* Quick Actions & PWA Install & Financial Sync */}
        <div className="flex items-center gap-2">
          {onSyncClick && (
            <button
              onClick={onSyncClick}
              disabled={isSyncing}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 hover:text-emerald-300 border border-emerald-500/30 font-bold text-xs rounded-xl shadow-sm transition-all"
              title="تسميع فوري لطلبات الفحص الواردة من منظومة الحسابات والمالية"
            >
              <Zap className={`w-3.5 h-3.5 ${isSyncing ? 'animate-bounce text-amber-300' : 'text-emerald-400'}`} />
              <span>{isSyncing ? 'جاري التسميع...' : 'تسميع الحسابات ⚡'}</span>
            </button>
          )}

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
            <span>إدخال وتعديل التقرير</span>
          </button>

          <button
            onClick={() => setActiveTab('packages')}
            className={`flex items-center gap-1.5 px-3 py-2.5 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'packages'
                ? 'border-rose-500 text-white font-black bg-slate-800/50'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/20'
            }`}
          >
            <Package className="w-4 h-4 text-rose-400" />
            <span>باقات الفحص الشاملة</span>
          </button>

          <button
            onClick={() => setActiveTab('catalog')}
            className={`flex items-center gap-1.5 px-3 py-2.5 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'catalog'
                ? 'border-rose-500 text-white font-black bg-slate-800/50'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/20'
            }`}
          >
            <BookOpen className="w-4 h-4 text-rose-400" />
            <span>دليل التحاليل والقوالب</span>
          </button>

          <button
            onClick={() => setActiveTab('patient-cards')}
            className={`flex items-center gap-1.5 px-3 py-2.5 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'patient-cards'
                ? 'border-rose-500 text-white font-black bg-slate-800/50'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/20'
            }`}
          >
            <CreditCard className="w-4 h-4 text-rose-400" />
            <span>كروت وخصومات المرضى</span>
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
            <span>متابعة منحنى المريض</span>
          </button>

          <button
            onClick={() => setActiveTab('staff-facilities')}
            className={`flex items-center gap-1.5 px-3 py-2.5 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'staff-facilities'
                ? 'border-rose-500 text-white font-black bg-slate-800/50'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/20'
            }`}
          >
            <Building className="w-4 h-4 text-rose-400" />
            <span>الأطباء والفروع</span>
          </button>
        </nav>
      </div>

      {/* Branches & Contact Info Modal */}
      {isBranchesModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 text-slate-800 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-rose-600" />
              <span>تعديل بيانات الاتصال والفروع بمعامل RT</span>
            </h3>

            <form onSubmit={handleSaveContactInfo} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">الخط الساخن وتليفونات الاستقبال:</label>
                <input
                  type="text"
                  value={editHotline}
                  onChange={(e) => setEditHotline(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg text-slate-800 font-mono"
                  placeholder="01001234567 / 02-23658900"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">هاتف الطوارئ والواتساب:</label>
                <input
                  type="text"
                  value={editEmergency}
                  onChange={(e) => setEditEmergency(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg text-slate-800 font-mono"
                  placeholder="01001234567"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">ملخص الفروع (في الشريط العلوي):</label>
                <input
                  type="text"
                  value={editBranchesSummary}
                  onChange={(e) => setEditBranchesSummary(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg text-slate-800"
                  placeholder="القاهرة · الجيزة · الإسكندرية"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">عنوان فرع القاهرة (قصر العيني):</label>
                <input
                  type="text"
                  value={editCairo}
                  onChange={(e) => setEditCairo(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg text-slate-800"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">عنوان فرع الجيزة (الدقي):</label>
                <input
                  type="text"
                  value={editGiza}
                  onChange={(e) => setEditGiza(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg text-slate-800"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">عنوان فرع الإسكندرية (سموحة):</label>
                <input
                  type="text"
                  value={editAlex}
                  onChange={(e) => setEditAlex(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg text-slate-800"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsBranchesModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-colors"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg transition-colors"
                >
                  حفظ البيانات
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};
