import React, { useState } from 'react';
import { GRADE_DEFINITIONS } from '../data/skillsData';
import { Check, ShieldAlert, Award, TrendingUp, Sparkles } from 'lucide-react';

export const GradeDefinitionSection: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<number>(3);

  const getLevelIcon = (level: number) => {
    switch (level) {
      case 1: return <ShieldAlert className="w-5 h-5 text-slate-500" />;
      case 2: return <TrendingUp className="w-5 h-5 text-sky-600" />;
      case 3: return <Sparkles className="w-5 h-5 text-blue-600" />;
      case 4: return <Award className="w-5 h-5 text-indigo-600" />;
      case 5: return <Award className="w-5 h-5 text-emerald-600" />;
      default: return null;
    }
  };

  const activeGrade = GRADE_DEFINITIONS.find(g => g.level === selectedLevel) || GRADE_DEFINITIONS[2];

  return (
    <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100 gap-3">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span>5단계 역량 그레이드(Grade)별 상세 기준 정의</span>
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            임직원의 AI 역량 수준을 객관적으로 측정하고 육성하기 위한 5단계 행동 지표 및 기대 성과 기준표입니다.
          </p>
        </div>

        {/* Level Switcher Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg shrink-0">
          {GRADE_DEFINITIONS.map(grade => {
            const isActive = selectedLevel === grade.level;
            return (
              <button
                key={grade.level}
                type="button"
                onClick={() => setSelectedLevel(grade.level)}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {grade.levelCode}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Grade Detail Card */}
      <div className="mt-5 p-5 rounded-xl border border-slate-200/90 bg-slate-50/60">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white rounded-lg border border-slate-200 shadow-xs">
              {getLevelIcon(activeGrade.level)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-200/80 text-slate-700">
                  {activeGrade.levelCode}
                </span>
                <h4 className="text-base font-bold text-slate-900">{activeGrade.nameKo}</h4>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">{activeGrade.summary}</p>
            </div>
          </div>
          <div className="text-xs font-medium text-slate-600 bg-white px-3 py-1.5 rounded-md border border-slate-200 self-start sm:self-auto">
            <span className="text-slate-400">조직 기여도: </span>
            <span className="font-semibold text-slate-800">{activeGrade.expectedImpact}</span>
          </div>
        </div>

        {/* Behavioral Indicators List */}
        <div className="mt-4">
          <span className="text-xs font-bold text-slate-800 block mb-2">
            주요 관찰 행동 지표 (Behavioral Indicators)
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {activeGrade.behaviorIndicators.map((indicator, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 bg-white p-3 rounded-lg border border-slate-200/80 text-xs text-slate-700"
              >
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{indicator}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* All 5 Grades Quick Comparison Table */}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50/70">
              <th className="py-2.5 px-3 whitespace-nowrap">그레이드</th>
              <th className="py-2.5 px-3 whitespace-nowrap">단계명</th>
              <th className="py-2.5 px-4">핵심 정의 및 업무 활용 범위</th>
              <th className="py-2.5 px-3 whitespace-nowrap">업무 생산성 향상률</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {GRADE_DEFINITIONS.map(grade => {
              const isSelected = selectedLevel === grade.level;
              return (
                <tr
                  key={grade.level}
                  onClick={() => setSelectedLevel(grade.level)}
                  className={`cursor-pointer transition-colors ${
                    isSelected ? 'bg-blue-50/60 font-medium' : 'hover:bg-slate-50'
                  }`}
                >
                  <td className="py-2.5 px-3 font-mono font-bold text-slate-700">
                    {grade.levelCode}
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-slate-900 whitespace-nowrap">
                    {grade.nameKo.split('(')[0].trim()}
                  </td>
                  <td className="py-2.5 px-4 text-slate-600">
                    {grade.summary}
                  </td>
                  <td className="py-2.5 px-3 font-mono tabular-nums text-slate-700 whitespace-nowrap">
                    {grade.expectedImpact.split('(')[1]?.replace(')', '') || grade.expectedImpact}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};
