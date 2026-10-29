import React, { useState } from 'react';
import { EmployeeProfile } from '../types/aiSkills';
import { OverallScoreResult, getGradeLabel } from '../utils/skillCalculations';
import { User, Edit3, Check, Calendar, Mail, Building } from 'lucide-react';

interface EmployeeProfileCardProps {
  profile: EmployeeProfile;
  overallScore: OverallScoreResult;
  onUpdateProfile: (updates: Partial<EmployeeProfile>) => void;
}

export const EmployeeProfileCard: React.FC<EmployeeProfileCardProps> = ({
  profile,
  overallScore,
  onUpdateProfile,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: profile.name,
    department: profile.department,
    position: profile.position,
    employeeNo: profile.employeeNo,
    email: profile.email,
  });

  const grade = getGradeLabel(overallScore.overallCurrentAvg);

  const handleSave = () => {
    onUpdateProfile(editForm);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        
        {/* Left: Employee Basic Info */}
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xl flex items-center justify-center shrink-0 shadow-sm">
            {profile.name.charAt(0)}
          </div>

          {!isEditing ? (
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900">{profile.name}</h1>
                <span className="font-mono text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                  {profile.employeeNo}
                </span>
                <span className={`px-2 py-0.5 rounded text-xs font-semibold border ${grade.badgeClass}`}>
                  {grade.label}
                </span>
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="p-1 rounded text-slate-400 hover:text-blue-600 hover:bg-slate-100 transition-colors"
                  title="프로필 정보 수정"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-medium text-slate-700">{profile.department}</span>
                  <span>·</span>
                  <span>{profile.position}</span>
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>평가 기준일: {profile.evalDate}</span>
                </span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <input
                type="text"
                value={editForm.name}
                onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                placeholder="성명"
                className="px-2 py-1 border border-slate-300 rounded font-semibold"
              />
              <input
                type="text"
                value={editForm.department}
                onChange={e => setEditForm({ ...editForm, department: e.target.value })}
                placeholder="소속 부서"
                className="px-2 py-1 border border-slate-300 rounded"
              />
              <input
                type="text"
                value={editForm.position}
                onChange={e => setEditForm({ ...editForm, position: e.target.value })}
                placeholder="직급/직책"
                className="px-2 py-1 border border-slate-300 rounded"
              />
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-2.5 py-1 bg-blue-600 text-white rounded font-semibold text-xs flex items-center gap-1"
                >
                  <Check className="w-3 h-3" /> 저장
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-2 py-1 bg-slate-200 text-slate-700 rounded text-xs"
                >
                  취소
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right: Key Summary Statistics */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-100">
          
          <div className="text-left sm:text-right">
            <span className="text-[11px] font-medium text-slate-400 block">현재 종합 점수</span>
            <div className="flex items-baseline sm:justify-end gap-1">
              <span className="text-2xl font-bold font-mono text-blue-600 tabular-nums">
                {overallScore.overallCurrentAvg.toFixed(2)}
              </span>
              <span className="text-xs text-slate-400 font-mono">/ 5.0</span>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-[11px] font-medium text-slate-400 block">목표 설정 수준</span>
            <div className="flex items-baseline sm:justify-end gap-1">
              <span className="text-2xl font-bold font-mono text-violet-600 tabular-nums">
                {overallScore.overallTargetAvg.toFixed(2)}
              </span>
              <span className="text-xs text-slate-400 font-mono">/ 5.0</span>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-[11px] font-medium text-slate-400 block">목표 달성 갭 (Gap)</span>
            <span className="text-lg font-bold font-mono text-emerald-600 tabular-nums block">
              +{overallScore.overallGap.toFixed(2)}점
            </span>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-[11px] font-medium text-slate-400 block">목표 진척도</span>
            <span className="text-lg font-bold font-mono text-slate-800 tabular-nums block">
              {overallScore.completionPercentage}%
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};
