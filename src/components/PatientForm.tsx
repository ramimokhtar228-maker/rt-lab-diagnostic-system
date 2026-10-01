import React from 'react';
import { Patient, Gender, AgeUnit, DoctorTitle } from '../types/lab';
import { User, Phone, Calendar, Clock, Stethoscope, Hash, FileText } from 'lucide-react';

interface PatientFormProps {
  patient: Patient;
  onChange: (updated: Patient) => void;
}

export const PatientForm: React.FC<PatientFormProps> = ({ patient, onChange }) => {
  const updateField = <K extends keyof Patient>(key: K, value: Patient[K]) => {
    onChange({
      ...patient,
      [key]: value
    });
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-800 flex items-center justify-center font-bold">
            <User className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">بيانات المريض والمعاينة</h2>
            <p className="text-xs text-slate-500">ادخال بيانات الحالة والملف الطبي المعملي كاملاً</p>
          </div>
        </div>

        {/* Lab number & Barcode badge */}
        <div className="flex items-center gap-2 text-xs">
          <div className="px-2.5 py-1 bg-slate-100 rounded-md text-slate-700 font-mono-numbers font-medium flex items-center gap-1 border border-slate-200">
            <Hash className="w-3.5 h-3.5 text-slate-400" />
            <span>رقم التحليل: <strong className="text-rose-900">{patient.labNumber}</strong></span>
          </div>
          <div className="px-2 py-1 bg-rose-50 text-rose-900 rounded-md font-mono-numbers font-semibold border border-rose-200">
            باركود: {patient.barcode}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Full Name */}
        <div className="lg:col-span-2">
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            اسم المريض ثلاثي / رباعي <span className="text-rose-600">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              required
              placeholder="مثال: أحمد محمود علي إبراهيم"
              value={patient.fullName}
              onChange={(e) => updateField('fullName', e.target.value)}
              className="w-full text-sm font-semibold bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 focus:border-rose-600 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all"
            />
          </div>
        </div>

        {/* Age and Age Unit */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            السن ووحدة العمر <span className="text-rose-600">*</span>
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              min="0"
              max="125"
              value={patient.age || ''}
              onChange={(e) => updateField('age', parseInt(e.target.value) || 0)}
              className="w-24 text-sm font-semibold font-mono-numbers bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 focus:border-rose-600 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all"
              placeholder="السن"
            />
            <select
              value={patient.ageUnit}
              onChange={(e) => updateField('ageUnit', e.target.value as AgeUnit)}
              className="flex-1 text-xs font-medium bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 focus:border-rose-600 rounded-lg px-2.5 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
            >
              <option value="years">سنة (Years)</option>
              <option value="months">شهور (Months)</option>
              <option value="days">أيام (Days)</option>
            </select>
          </div>
        </div>

        {/* Gender */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            النوع (Gender) <span className="text-rose-600">*</span>
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => updateField('gender', 'male')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all ${
                patient.gender === 'male'
                  ? 'bg-blue-900 text-white border-blue-900 shadow-sm'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              ذكر (Male)
            </button>
            <button
              type="button"
              onClick={() => updateField('gender', 'female')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all ${
                patient.gender === 'female'
                  ? 'bg-rose-800 text-white border-rose-800 shadow-sm'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              أنثى (Female)
            </button>
          </div>
        </div>

        {/* WhatsApp Phone */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              رقم الهاتف (واتساب) <span className="text-rose-600">*</span>
            </span>
            <span className="text-[10px] text-slate-400">للتنبيه المباشر بالنتائج</span>
          </label>
          <input
            type="tel"
            placeholder="010XXXXXXXX"
            value={patient.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            className="w-full text-sm font-semibold font-mono-numbers bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 focus:border-rose-600 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all text-left"
            dir="ltr"
          />
        </div>

        {/* Referring Doctor Title & Options */}
        <div className="lg:col-span-2">
          <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
            <Stethoscope className="w-3.5 h-3.5 text-rose-800" />
            الطبيب المعالج (Referring Doctor)
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <select
              value={patient.referringDoctorTitle}
              onChange={(e) => {
                const title = e.target.value as DoctorTitle;
                updateField('referringDoctorTitle', title);
                if (title === 'Herself' || title === 'Himself') {
                  updateField('referringDoctorName', '');
                }
              }}
              className="sm:w-44 text-xs font-bold bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 focus:border-rose-600 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
            >
              <option value="Prof. Dr.">أ.د / Prof. Dr.</option>
              <option value="Dr.">دكتور / Dr.</option>
              <option value="Herself">من طرفها / Herself</option>
              <option value="Himself">من طرفه / Himself</option>
              <option value="Custom">تخصيص يدوي</option>
            </select>

            {patient.referringDoctorTitle !== 'Herself' && patient.referringDoctorTitle !== 'Himself' && (
              <input
                type="text"
                placeholder="اسم الطبيب والتخصص (مثال: طارق عبد المنعم - باطنة وغدد)"
                value={patient.referringDoctorName}
                onChange={(e) => updateField('referringDoctorName', e.target.value)}
                className="flex-1 text-sm bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 focus:border-rose-600 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all"
              />
            )}
          </div>
        </div>

        {/* Fasting Hours */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            ساعات الصيام (Fasting)
          </label>
          <input
            type="number"
            min="0"
            max="24"
            placeholder="مثال: 12 ساعة"
            value={patient.fastingHours !== undefined ? patient.fastingHours : ''}
            onChange={(e) => updateField('fastingHours', e.target.value ? parseInt(e.target.value) : undefined)}
            className="w-full text-sm font-mono-numbers bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 focus:border-rose-600 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all"
          />
        </div>

        {/* Sample Date */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            تاريخ ووقت سحب العينة
          </label>
          <input
            type="datetime-local"
            value={patient.sampleDate ? patient.sampleDate.substring(0, 16) : ''}
            onChange={(e) => updateField('sampleDate', e.target.value)}
            className="w-full text-xs font-mono-numbers bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 focus:border-rose-600 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all"
          />
        </div>

        {/* Reporting Date */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            تاريخ ووقت إصدار النتيجة
          </label>
          <input
            type="datetime-local"
            value={patient.reportingDate ? patient.reportingDate.substring(0, 16) : ''}
            onChange={(e) => updateField('reportingDate', e.target.value)}
            className="w-full text-xs font-mono-numbers bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 focus:border-rose-600 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all"
          />
        </div>

        {/* Clinical History & Diagnosis Notes */}
        <div className="lg:col-span-2">
          <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
            <FileText className="w-3.5 h-3.5 text-slate-500" />
            ملاحظات إكلينيكية / التشخيص المبدئي
          </label>
          <input
            type="text"
            placeholder="مثال: متابعة علاج السكر، شحوب ودوخة، فحص روتيني شامل..."
            value={patient.clinicalHistory || ''}
            onChange={(e) => updateField('clinicalHistory', e.target.value)}
            className="w-full text-sm bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 focus:border-rose-600 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all"
          />
        </div>

        {/* Blood Group & Emergency Contact */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            فصيلة الدم (Blood Group)
          </label>
          <select
            value={patient.bloodGroup || 'O+'}
            onChange={(e) => updateField('bloodGroup', e.target.value)}
            className="w-full text-xs font-bold font-mono bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 focus:border-rose-600 rounded-lg px-3 py-2 text-slate-900"
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
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            هاتف الطوارئ لكرت المريض
          </label>
          <input
            type="tel"
            placeholder="010XXXXXXXX"
            value={patient.emergencyContact || ''}
            onChange={(e) => updateField('emergencyContact', e.target.value)}
            className="w-full text-sm font-mono-numbers bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 focus:border-rose-600 rounded-lg px-3 py-2 text-slate-900 text-left"
            dir="ltr"
          />
        </div>
      </div>
    </div>
  );
};
