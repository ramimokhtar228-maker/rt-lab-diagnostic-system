import React from 'react';
import { PWAInstallButton } from './PWAInstallButton';
import { RTLogo } from './RTLogo';
import { 
  Building2, 
  FlaskConical, 
  Search, 
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
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5 text-rose-100 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              الخط الساخن: 01001234567 / 02-23658900
            </span>
            <span className="text-rose-300/60">|</span>
            <span className="text-rose-200">القاهرة - الجيزة - الإسكندرية</span>
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
    </header>
  );
};
