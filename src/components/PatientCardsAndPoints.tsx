import React, { useState } from 'react';
import { PatientLoyaltyProfile, LoyaltyTier, LoyaltyTransaction, LabReport } from '../types/lab';
import { TIER_BENEFITS } from '../data/loyaltyData';
import { RTLogo } from './RTLogo';
import { 
  CreditCard, 
  Award, 
  QrCode, 
  Printer, 
  Download, 
  Plus, 
  Search, 
  Gift, 
  TrendingUp, 
  Droplet, 
  Phone, 
  Calendar, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight, 
  ArrowDownLeft,
  User,
  HeartPulse,
  RefreshCw
} from 'lucide-react';

interface PatientCardsAndPointsProps {
  loyaltyProfiles: PatientLoyaltyProfile[];
  onUpdateProfiles: (profiles: PatientLoyaltyProfile[]) => void;
  reports: LabReport[];
  onSelectPatientForReport?: (patientName: string) => void;
}

export const PatientCardsAndPoints: React.FC<PatientCardsAndPointsProps> = ({
  loyaltyProfiles,
  onUpdateProfiles,
  reports,
  onSelectPatientForReport
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProfileId, setSelectedProfileId] = useState<string>(loyaltyProfiles[0]?.patientId || '');
  const [cardSide, setCardSide] = useState<'front' | 'back'>('front');

  // Modals / Actions state
  const [isAddPointsOpen, setIsAddPointsOpen] = useState(false);
  const [pointsToAdd, setPointsToAdd] = useState<number>(100);
  const [pointsDescription, setPointsDescription] = useState('نقاط زيارة فحص معملي جديد');
  const [isRedeemOpen, setIsRedeemOpen] = useState(false);
  const [pointsToRedeem, setPointsToRedeem] = useState<number>(50);

  // New patient card modal
  const [isNewCardModalOpen, setIsNewCardModalOpen] = useState(false);
  const [newCardName, setNewCardName] = useState('');
  const [newCardPhone, setNewCardPhone] = useState('');
  const [newCardBlood, setNewCardBlood] = useState('O+');
  const [newCardEmergency, setNewCardEmergency] = useState('');
  const [newCardCondition, setNewCardCondition] = useState('');

  const filteredProfiles = loyaltyProfiles.filter(p => 
    p.patientName.includes(searchTerm) ||
    p.phone.includes(searchTerm) ||
    p.barcode.includes(searchTerm)
  );

  const activeProfile = loyaltyProfiles.find(p => p.patientId === selectedProfileId) || loyaltyProfiles[0];
  const tierInfo = activeProfile ? TIER_BENEFITS[activeProfile.tier] : TIER_BENEFITS.Silver;

  // Add Points Handler
  const handleAddPoints = () => {
    if (!activeProfile || pointsToAdd <= 0) return;
    const newTx: LoyaltyTransaction = {
      id: `tx-${Date.now()}`,
      date: new Date().toISOString().substring(0, 10),
      type: 'earn',
      points: pointsToAdd,
      description: pointsDescription.trim() || 'اكتساب نقاط فحص'
    };

    const newTotal = activeProfile.totalPoints + pointsToAdd;
    let newTier: LoyaltyTier = activeProfile.tier;
    if (newTotal >= 3000) newTier = 'VIP';
    else if (newTotal >= 1500) newTier = 'Platinum';
    else if (newTotal >= 500) newTier = 'Gold';

    const updated = loyaltyProfiles.map(p => 
      p.patientId === activeProfile.patientId 
        ? {
            ...p,
            totalPoints: newTotal,
            tier: newTier,
            lifetimeSpent: p.lifetimeSpent + (pointsToAdd * 10),
            transactions: [newTx, ...p.transactions]
          }
        : p
    );

    onUpdateProfiles(updated);
    setIsAddPointsOpen(false);
  };

  // Redeem Points Handler
  const handleRedeemPoints = () => {
    if (!activeProfile || pointsToRedeem <= 0) return;
    if (pointsToRedeem > activeProfile.totalPoints) {
      alert('رصيد النقاط غير كافٍ للاستبدال المطلوب.');
      return;
    }

    const newTx: LoyaltyTransaction = {
      id: `tx-${Date.now()}`,
      date: new Date().toISOString().substring(0, 10),
      type: 'redeem',
      points: pointsToRedeem,
      description: `استبدال ${pointsToRedeem} نقطة بخصم نقدي بقيمة ${pointsToRedeem} ج.م`
    };

    const updated = loyaltyProfiles.map(p => 
      p.patientId === activeProfile.patientId 
        ? {
            ...p,
            totalPoints: p.totalPoints - pointsToRedeem,
            transactions: [newTx, ...p.transactions]
          }
        : p
    );

    onUpdateProfiles(updated);
    setIsRedeemOpen(false);
  };

  // Create New Card
  const handleCreateNewCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCardName.trim()) {
      alert('يرجى إدخال اسم المريض');
      return;
    }

    const barcode = `${Math.floor(1000000000 + Math.random() * 9000000000)}`;
    const newProfile: PatientLoyaltyProfile = {
      patientId: `pat-${Date.now()}`,
      patientName: newCardName.trim(),
      phone: newCardPhone.trim() || '01',
      barcode,
      bloodGroup: newCardBlood,
      totalPoints: 100, // 100 welcome bonus points!
      tier: 'Silver',
      lifetimeSpent: 1000,
      emergencyContact: newCardEmergency.trim() || undefined,
      chronicConditions: newCardCondition.trim() ? [newCardCondition.trim()] : undefined,
      issueDate: new Date().toISOString().substring(0, 10),
      transactions: [
        {
          id: `tx-welcome-${Date.now()}`,
          date: new Date().toISOString().substring(0, 10),
          type: 'bonus',
          points: 100,
          description: 'هدية ترحيبية 100 نقطة عند إصدار كرت المريض الذكي'
        }
      ]
    };

    onUpdateProfiles([newProfile, ...loyaltyProfiles]);
    setSelectedProfileId(newProfile.patientId);
    setIsNewCardModalOpen(false);
    setNewCardName('');
    setNewCardPhone('');
    setNewCardEmergency('');
    setNewCardCondition('');
  };

  const handlePrintCard = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 rounded-2xl p-6 text-white shadow-xl border border-red-900/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 no-print">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-red-600/30 text-rose-300 border border-red-500/40">
              <CreditCard className="w-5 h-5 text-rose-400" />
            </span>
            <h2 className="text-xl font-black tracking-wide">
              كروت المرضى الذكية ونظام نقاط الولاء (RT Loyalty Club)
            </h2>
          </div>
          <p className="text-xs text-rose-200/80">
            بطاقات عضوية رقمية وطباعية للمرضى، فصائل الدم، خصومات المستويات (فضي / ذهبي / بلاتيني / VIP)، واستبدال النقاط
          </p>
        </div>

        <button
          onClick={() => setIsNewCardModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-700 to-rose-600 hover:from-red-600 hover:to-rose-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-red-950/40 hover:shadow-xl transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>إصدار كرت مريض ذكي جديد</span>
        </button>
      </div>

      {/* Main Grid: Card Preview & Loyalty Account */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col (Cards Selector & Search) - 4 Cols */}
        <div className="lg:col-span-4 space-y-4 no-print">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900">سجل بطاقات المرضى</h3>
              <span className="text-[11px] text-slate-500">{loyaltyProfiles.length} بطاقة مسجلة</span>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="بحث باسم المريض أو الهاتف أو الباركود..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
              {filteredProfiles.map((profile) => {
                const isSelected = profile.patientId === activeProfile?.patientId;
                const pTier = TIER_BENEFITS[profile.tier];

                return (
                  <div
                    key={profile.patientId}
                    onClick={() => setSelectedProfileId(profile.patientId)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-rose-50/70 border-rose-400 shadow-sm'
                        : 'bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-xs text-slate-900 truncate">
                        {profile.patientName}
                      </span>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${pTier.badgeBg}`}>
                        {profile.tier}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 font-mono">
                      <span>{profile.phone}</span>
                      <span className="text-rose-900 font-bold">{profile.totalPoints} نقطة</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Col: Interactive High-Tech Card & Points Control - 8 Cols */}
        {activeProfile && (
          <div className="lg:col-span-8 space-y-6">
            {/* Card Preview Section */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 no-print">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-rose-800" />
                  <h3 className="text-sm font-bold text-slate-900">
                    معاينة كرت المريض الذكي (Smart Health Card)
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCardSide(cardSide === 'front' ? 'back' : 'front')}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>قلب البطاقة ({cardSide === 'front' ? 'الوجه الخلفي' : 'الوجه الأمامي'})</span>
                  </button>

                  <button
                    onClick={handlePrintCard}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 bg-rose-900 hover:bg-rose-800 text-white text-xs font-bold rounded-lg shadow-sm transition-all"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>طباعة الكرت الذكي</span>
                  </button>
                </div>
              </div>

              {/* THE SMART PHYSICAL CARD: Standard ISO Card Proportion (85.6mm x 53.98mm) */}
              <div className="flex justify-center p-2 sm:p-4">
                {cardSide === 'front' ? (
                  /* FRONT OF CARD */
                  <div className="w-full max-w-[440px] aspect-[1.586] rounded-2xl bg-gradient-to-br from-[#1a0505] via-[#4d0909] to-[#0a0f1d] p-5 text-white shadow-2xl border border-red-500/40 relative flex flex-col justify-between overflow-hidden select-none">
                    {/* Metallic reflective carbon fiber background texture */}
                    <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '16px 16px' }}></div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/20 rounded-full blur-3xl pointer-events-none"></div>

                    {/* Card Top: Logo & Tier */}
                    <div className="relative z-10 flex items-start justify-between">
                      <RTLogo size="sm" showSlogan={false} sloganColor="text-rose-300" />
                      <div className="text-right">
                        <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border shadow-sm ${tierInfo.badgeBg}`}>
                          {activeProfile.tier} MEMBER
                        </span>
                        <div className="text-[9px] text-rose-300 font-bold mt-1">
                          معامل رامي مختار
                        </div>
                      </div>
                    </div>

                    {/* Card Middle: EMV Smart Chip Graphic + Blood Group */}
                    <div className="relative z-10 flex items-center justify-between py-1">
                      {/* Gold Chip Graphic */}
                      <div className="w-11 h-8 rounded-md bg-gradient-to-tr from-amber-400 via-amber-200 to-amber-500 border border-amber-600/60 p-1 flex flex-col justify-between shadow-sm">
                        <div className="border-b border-amber-600/40 h-2"></div>
                        <div className="border-b border-amber-600/40 h-2"></div>
                      </div>

                      {/* Blood Group Badge */}
                      <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-lg border border-red-500/30">
                        <Droplet className="w-3.5 h-3.5 text-rose-400 fill-rose-500" />
                        <span className="text-[10px] text-rose-200">فصيلة الدم:</span>
                        <span className="text-sm font-black text-white font-mono">{activeProfile.bloodGroup}</span>
                      </div>
                    </div>

                    {/* Card Bottom: Patient Name & Code */}
                    <div className="relative z-10 flex items-end justify-between">
                      <div>
                        <span className="text-[9px] text-rose-300 block uppercase tracking-wider">Patient Name</span>
                        <h4 className="text-sm font-black text-white tracking-wide drop-shadow-sm truncate max-w-[240px]">
                          {activeProfile.patientName}
                        </h4>
                        <span className="text-[10px] text-slate-300 font-mono tracking-widest block mt-0.5">
                          ID: {activeProfile.barcode}
                        </span>
                      </div>

                      {/* QR Code graphic */}
                      <div className="bg-white p-1 rounded-lg shadow-md shrink-0">
                        <QrCode className="w-10 h-10 text-slate-900" />
                      </div>
                    </div>
                  </div>
                ) : (
                  /* BACK OF CARD */
                  <div className="w-full max-w-[440px] aspect-[1.586] rounded-2xl bg-gradient-to-br from-[#0c0d12] via-[#1a1c23] to-[#0a0f1d] p-5 text-white shadow-2xl border border-slate-700 relative flex flex-col justify-between overflow-hidden select-none">
                    {/* Magnetic Stripe */}
                    <div className="absolute top-5 inset-x-0 h-9 bg-slate-950 border-y border-slate-800"></div>

                    {/* Signature bar & CVC */}
                    <div className="relative z-10 mt-12 flex items-center justify-between text-[10px]">
                      <div className="bg-slate-200 text-slate-800 font-mono px-3 py-1 rounded flex-1 text-left" dir="ltr">
                        AUTHORIZED SIGNATURE / توقيع العميل
                      </div>
                      <div className="bg-white text-slate-900 font-mono font-bold px-2 py-1 rounded ml-2">
                        {activeProfile.barcode.slice(-3)}
                      </div>
                    </div>

                    {/* Emergency & Lab Contacts */}
                    <div className="relative z-10 text-[10px] text-slate-300 space-y-1 bg-black/40 p-2.5 rounded-lg border border-slate-800">
                      <div className="flex items-center justify-between">
                        <span className="text-rose-400 font-bold">طوارئ المريض:</span>
                        <span className="font-mono">{activeProfile.emergencyContact || 'غير مسجل'}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">الخط الساخن لمعامل RT:</span>
                        <span className="font-mono text-white font-bold">01001234567 / 02-23658900</span>
                      </div>
                      <div className="text-[9px] text-slate-400 text-center pt-1 border-t border-slate-700/60 font-medium">
                        التشخيص الصحيح يبدأ معنا · كلية طب قصر العيني · بطاقة شخصية طبية
                      </div>
                    </div>

                    {/* Bottom Barcode */}
                    <div className="relative z-10 text-center font-mono text-[9px] tracking-widest text-slate-400">
                      ||||| ||| |||| ||||| ||| {activeProfile.barcode} |||| |||
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Loyalty Account & Points Management */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6 no-print">
              {/* Account Overview Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-500" />
                    <h3 className="text-base font-black text-slate-900">
                      حساب نقاط الولاء للمريض: {activeProfile.patientName}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    عضوية المستوى: <strong className="text-slate-900 font-bold">{tierInfo.titleAr}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsAddPointsOpen(true)}
                    className="flex items-center gap-1.5 px-3 py-2 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold rounded-lg transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>إضافة نقاط</span>
                  </button>

                  <button
                    onClick={() => setIsRedeemOpen(true)}
                    className="flex items-center gap-1.5 px-3 py-2 bg-rose-900 hover:bg-rose-800 text-white text-xs font-bold rounded-lg transition-all"
                  >
                    <Gift className="w-3.5 h-3.5" />
                    <span>استبدال نقاط بخصم</span>
                  </button>
                </div>
              </div>

              {/* Stats Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] text-slate-500 font-semibold block">رصيد النقاط الحالي</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-2xl font-black text-rose-900 font-mono">
                      {activeProfile.totalPoints}
                    </span>
                    <span className="text-xs font-bold text-slate-700">نقطة</span>
                  </div>
                  <span className="text-[10px] text-emerald-700 font-medium block mt-1">
                    تعادل خصم نقدي بقيمة {activeProfile.totalPoints} جنيه مصري
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] text-slate-500 font-semibold block">نسبة الخصم التلقائي</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-2xl font-black text-slate-900 font-mono">
                      {tierInfo.discountRate}%
                    </span>
                    <span className="text-xs font-bold text-slate-700">خصم دائم</span>
                  </div>
                  <span className="text-[10px] text-slate-600 font-medium block mt-1">
                    {tierInfo.description}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] text-slate-500 font-semibold block">إجمالي الإنفاق التراكمي</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-2xl font-black text-slate-900 font-mono">
                      {activeProfile.lifetimeSpent}
                    </span>
                    <span className="text-xs font-bold text-slate-700">ج.م</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium block mt-1">
                    تاريخ الانضمام: {activeProfile.issueDate}
                  </span>
                </div>
              </div>

              {/* Points History Transactions Table */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-800">
                  سجل حركات واكتساب واستبدال النقاط:
                </h4>
                <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                  <table className="w-full text-right">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold text-[11px]">
                      <tr>
                        <th className="p-2.5">التاريخ</th>
                        <th className="p-2.5">النوع</th>
                        <th className="p-2.5">البيان</th>
                        <th className="p-2.5 text-left">النقاط</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {activeProfile.transactions.map((tx) => (
                        <tr key={tx.id} className="hover:bg-slate-50">
                          <td className="p-2.5 font-mono text-slate-600">{tx.date}</td>
                          <td className="p-2.5">
                            {tx.type === 'earn' && (
                              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                                اكتساب
                              </span>
                            )}
                            {tx.type === 'redeem' && (
                              <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded">
                                استبدال
                              </span>
                            )}
                            {tx.type === 'bonus' && (
                              <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                                هدية بونص
                              </span>
                            )}
                          </td>
                          <td className="p-2.5 text-slate-800 font-medium">
                            {tx.description}
                            {tx.reportNumber && (
                              <span className="text-rose-800 font-mono mr-1">({tx.reportNumber})</span>
                            )}
                          </td>
                          <td className="p-2.5 text-left font-mono font-bold">
                            {tx.type === 'redeem' ? (
                              <span className="text-rose-600">-{tx.points}</span>
                            ) : (
                              <span className="text-emerald-600">+{tx.points}</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal: Add Points */}
      {isAddPointsOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200 text-xs">
            <h3 className="text-sm font-bold text-slate-900 border-b pb-2">
              إضافة نقاط مكافأة للمريض: {activeProfile.patientName}
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">عدد النقاط المكتسبة:</label>
                <input
                  type="number"
                  value={pointsToAdd}
                  onChange={(e) => setPointsToAdd(Number(e.target.value))}
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-mono font-bold text-sm"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">بيان وسبب النقاط:</label>
                <input
                  type="text"
                  value={pointsDescription}
                  onChange={(e) => setPointsDescription(e.target.value)}
                  placeholder="مثال: نقاط فحص دوري، بونص ترقية المستوى..."
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2 border-t">
              <button
                onClick={() => setIsAddPointsOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg"
              >
                إلغاء
              </button>
              <button
                onClick={handleAddPoints}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-lg shadow-sm"
              >
                تأكيد الإضافة
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Redeem Points */}
      {isRedeemOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200 text-xs">
            <h3 className="text-sm font-bold text-slate-900 border-b pb-2">
              استبدال نقاط لخصم نقدي مباشر
            </h3>
            <p className="text-slate-600">
              الرصيد المتاح: <strong className="text-rose-900 font-mono font-bold">{activeProfile.totalPoints} نقطة</strong>
            </p>
            <div>
              <label className="block font-bold text-slate-700 mb-1">النقاط المراد استبدالها (1 نقطة = 1 ج.م خصم):</label>
              <input
                type="number"
                max={activeProfile.totalPoints}
                value={pointsToRedeem}
                onChange={(e) => setPointsToRedeem(Number(e.target.value))}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-mono font-bold text-sm text-rose-900"
              />
            </div>
            <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-[11px] text-rose-950 font-bold">
              سيتم خصم مبلغ {pointsToRedeem} ج.م من الفاتورة الإجمالية لخدمات المعمل.
            </div>
            <div className="flex items-center justify-end gap-2 pt-2 border-t">
              <button
                onClick={() => setIsRedeemOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg"
              >
                إلغاء
              </button>
              <button
                onClick={handleRedeemPoints}
                className="px-4 py-2 bg-rose-900 hover:bg-rose-800 text-white font-bold rounded-lg shadow-sm"
              >
                تأكيد الاستبدال والخصم
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Create New Patient Card */}
      {isNewCardModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200 text-xs">
            <h3 className="text-sm font-bold text-slate-900 border-b pb-2">
              إصدار كرت مريض ذكي جديد
            </h3>
            <form onSubmit={handleCreateNewCard} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">اسم المريض الكامل *</label>
                <input
                  type="text"
                  required
                  value={newCardName}
                  onChange={(e) => setNewCardName(e.target.value)}
                  placeholder="الاسم ثلاثي أو رباعي..."
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">رقم الهاتف (الواتساب)</label>
                <input
                  type="text"
                  value={newCardPhone}
                  onChange={(e) => setNewCardPhone(e.target.value)}
                  placeholder="01012345678"
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">فصيلة الدم</label>
                  <select
                    value={newCardBlood}
                    onChange={(e) => setNewCardBlood(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-mono font-bold"
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">رقم هاتف الطوارئ</label>
                  <input
                    type="text"
                    value={newCardEmergency}
                    onChange={(e) => setNewCardEmergency(e.target.value)}
                    placeholder="رقم أحد الأقارب..."
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">حالة صحية مزمنة أو حساسية (اختياري)</label>
                <input
                  type="text"
                  value={newCardCondition}
                  onChange={(e) => setNewCardCondition(e.target.value)}
                  placeholder="مثال: حساسية بنسلين، ضغط، سكر..."
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="p-2.5 bg-rose-50 rounded-lg border border-rose-200 text-[11px] text-rose-950">
                ⭐ سيتم منح المريض <strong>100 نقطة ترحيبية مجانية</strong> فور إصدار الكرت!
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setIsNewCardModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-rose-900 hover:bg-rose-800 text-white font-bold rounded-lg shadow-sm"
                >
                  إصدار الكرت
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
