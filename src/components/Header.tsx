import React from 'react';
import { 
  Building2, 
  FlaskConical, 
  Search, 
  PlusCircle, 
  TrendingUp, 
  BookOpen, 
  Settings, 
  Archive,
  Phone,
  FileSpreadsheet
} from 'lucide-react';

interface HeaderProps {
  activeTab: 'archive' | 'new-patient' | 'trends' | 'catalog' | 'settings';
  setActiveTab: (tab: 'archive' | 'new-patient' | 'trends' | 'catalog' | 'settings') => void;
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
      <div className="bg-gradient-to-r from-[#700b0b] via-[#8b0e0e] to-[#0f172a] text-xs py-1.5 px-4 sm:px-8 border-b border-red-900/40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-rose-100">
          <div className="flex items-center gap-3">
            <span className="font-bold tracking-wide text-white">معامل RT للتحاليل التشخيصية</span>
            <span className="text-rose-300/60 hidden sm:inline">|</span>
            <span className="hidden sm:inline">أطباء الباثولوجيا الإكلينيكية والكيميائية</span>
            <span className="text-rose-300/60 hidden sm:inline">|</span>
            <span className="font-semibold text-rose-200">كلية طب قصر العيني</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1 text-rose-100">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              النظام متصل ومعتمد
            </span>
            <span className="text-rose-300/60">|</span>
            <span>القاهرة - مصر</span>
          </div>
        </div>
      </div>

      {/* Main Brand Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand identity */}
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => setActiveTab('archive')}>
          {/* Logo Icon with red crystal drop & metallic badge */}
          <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-[#800000] via-[#991b1b] to-[#1e1b4b] p-0.5 shadow-lg shadow-red-950/50 flex items-center justify-center border border-red-400/30">
            <div className="w-full h-full rounded-[10px] bg-slate-950 flex items-center justify-center relative overflow-hidden">
              {/* Blood drop glowing background */}
              <div className="absolute inset-0 bg-radial from-red-600/30 via-transparent to-transparent"></div>
              <div className="relative flex items-center justify-center">
                <span className="font-black text-xl tracking-tighter text-rose-500">R</span>
                <span className="text-rose-400 -mx-0.5 text-base">💧</span>
                <span className="font-black text-xl tracking-tighter text-slate-200">T</span>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-baseline gap-2">
              <h1 className="text-2xl font-black tracking-wider text-white">
                RT <span className="text-rose-500 font-extrabold">LAB</span>
              </h1>
              <span className="text-xs px-2 py-0.5 rounded bg-rose-950/80 text-rose-300 border border-rose-800/60 font-semibold tracking-wide">
                LABORATORIES
              </span>
            </div>
            <p className="text-sm font-semibold text-slate-300">
              معامل رامي مختار <span className="text-rose-400 text-xs font-normal">| قصر العيني</span>
            </p>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="بحث برقم التحليل، اسم المريض، أو الهاتف..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-800/90 text-sm text-slate-100 placeholder-slate-400 rounded-lg pl-9 pr-3 py-2 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Quick New Patient Action */}
        <div className="flex items-center gap-2">
          <button
            onClick={onNewPatientClick}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-800 to-rose-700 hover:from-red-700 hover:to-rose-600 text-white font-bold text-sm rounded-lg shadow-md shadow-red-950/40 hover:shadow-lg transition-all active:scale-[0.98]"
          >
            <PlusCircle className="w-4 h-4" />
            <span>تسجيل حالة جديدة</span>
          </button>
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 border-t border-slate-800/80">
        <nav className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-none text-sm font-medium">
          <button
            onClick={() => setActiveTab('archive')}
            className={`flex items-center gap-2 px-3.5 py-2.5 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'archive'
                ? 'border-rose-500 text-white font-bold bg-slate-800/40'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/20'
            }`}
          >
            <Archive className="w-4 h-4 text-rose-400" />
            <span>أرشيف وسجل المرضى</span>
          </button>

          <button
            onClick={() => setActiveTab('new-patient')}
            className={`flex items-center gap-2 px-3.5 py-2.5 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'new-patient'
                ? 'border-rose-500 text-white font-bold bg-slate-800/40'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/20'
            }`}
          >
            <FlaskConical className="w-4 h-4 text-rose-400" />
            <span>إدخال النتائج والفحوصات</span>
          </button>

          <button
            onClick={() => setActiveTab('trends')}
            className={`flex items-center gap-2 px-3.5 py-2.5 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'trends'
                ? 'border-rose-500 text-white font-bold bg-slate-800/40'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/20'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-rose-400" />
            <span>التطور البياني للمريض</span>
          </button>

          <button
            onClick={() => setActiveTab('catalog')}
            className={`flex items-center gap-2 px-3.5 py-2.5 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'catalog'
                ? 'border-rose-500 text-white font-bold bg-slate-800/40'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/20'
            }`}
          >
            <BookOpen className="w-4 h-4 text-rose-400" />
            <span>كتالوج التحاليل والمعدلات الطبيعية</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-3.5 py-2.5 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'settings'
                ? 'border-rose-500 text-white font-bold bg-slate-800/40'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/20'
            }`}
          >
            <Settings className="w-4 h-4 text-rose-400" />
            <span>إعدادات الطاقم والإمضاءات</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
