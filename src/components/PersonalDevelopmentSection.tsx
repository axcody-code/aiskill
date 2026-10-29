import React from 'react';
import { PersonalPlan } from '../types/aiSkills';
import { CategoryScoreResult } from '../utils/skillCalculations';
import { Sparkles, TrendingUp, AlertTriangle, Target, Lightbulb } from 'lucide-react';

interface PersonalDevelopmentSectionProps {
  categoryScores: CategoryScoreResult[];
  personalPlan: PersonalPlan;
  onChangePlan: (field: keyof PersonalPlan, value: string | string[]) => void;
  onAutoGenerateSuggestions: () => void;
}

export const PersonalDevelopmentSection: React.FC<PersonalDevelopmentSectionProps> = ({
  categoryScores,
  personalPlan,
  onChangePlan,
  onAutoGenerateSuggestions,
}) => {
  // Find top 2 highest current average skills (strengths)
  const sortedByCurrent = [...categoryScores].sort((a, b) => b.currentAvg - a.currentAvg);
  const strengths = sortedByCurrent.slice(0, 2);

  // Find top 2 lowest current average skills (weaknesses / improvement areas)
  const sortedByLowest = [...categoryScores].sort((a, b) => a.currentAvg - b.currentAvg);
  const weaknesses = sortedByLowest.slice(0, 2);

  // Find biggest gap (target - current)
  const sortedByGap = [...categoryScores].sort((a, b) => b.gap - a.gap);
  const biggestGap = sortedByGap[0];

  return (
    <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            <span>점수 대비 본인의 AI 발전방향 및 자기개발 로드맵</span>
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            진단된 7대 역량 점수를 바탕으로 본인의 강점과 보완점을 분석하고, 향후 실무 성장 계획을 서술합니다.
          </p>
        </div>

        <button
          type="button"
          onClick={onAutoGenerateSuggestions}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 transition-colors shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>점수 기반 추천 발전방향 자동 생성</span>
        </button>
      </div>

      {/* Dynamic Diagnostic Cards (Strengths vs Weaknesses) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
        
        {/* Card 1: Key Strengths */}
        <div className="p-4 rounded-lg bg-emerald-50/60 border border-emerald-200/80">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-emerald-700" />
            <h4 className="text-xs font-bold text-emerald-900">핵심 강점 역량 (Top Strengths)</h4>
          </div>
          <div className="space-y-1.5 text-xs">
            {strengths.map(s => (
              <div key={s.categoryId} className="flex items-center justify-between font-medium text-emerald-800">
                <span>• {s.categoryName.split('&')[0]}</span>
                <span className="font-mono tabular-nums font-bold">{s.currentAvg.toFixed(1)} / 5.0</span>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-emerald-700/90 mt-2.5 pt-2 border-t border-emerald-200/60">
            사내 실무 적용 경험을 팀원들과 적극 공유하여 부서 내 멘토 역할을 수행할 수 있는 영역입니다.
          </p>
        </div>

        {/* Card 2: Improvement Focus */}
        <div className="p-4 rounded-lg bg-amber-50/60 border border-amber-200/80">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-amber-700" />
            <h4 className="text-xs font-bold text-amber-900">단기 집중 보완 역량 (Focus Area)</h4>
          </div>
          <div className="space-y-1.5 text-xs">
            {weaknesses.map(w => (
              <div key={w.categoryId} className="flex items-center justify-between font-medium text-amber-800">
                <span>• {w.categoryName.split('&')[0]}</span>
                <span className="font-mono tabular-nums font-bold">{w.currentAvg.toFixed(1)} / 5.0</span>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-amber-700/90 mt-2.5 pt-2 border-t border-amber-200/60">
            사내 연간 교육 일정 중 해당 분야의 기초 및 실습 과정을 우선 수강하여 기본기를 보완하세요.
          </p>
        </div>

        {/* Card 3: Largest Growth Opportunity */}
        <div className="p-4 rounded-lg bg-indigo-50/60 border border-indigo-200/80">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-4 h-4 text-indigo-700" />
            <h4 className="text-xs font-bold text-indigo-900">최대 성장 기회 (Largest Gap)</h4>
          </div>
          <div className="text-xs font-medium text-indigo-900">
            {biggestGap?.categoryName}
          </div>
          <div className="mt-1 flex items-center justify-between text-xs font-mono text-indigo-700">
            <span>현재 {biggestGap?.currentAvg.toFixed(1)}점 → 목표 {biggestGap?.targetAvg.toFixed(1)}점</span>
            <span className="font-bold text-indigo-900">+{biggestGap?.gap.toFixed(1)}점 성장 필요</span>
          </div>
          <p className="text-[11px] text-indigo-700/90 mt-2.5 pt-2 border-t border-indigo-200/60">
            목표 수준과의 격차가 가장 큰 분야입니다. 실습 프로젝트와 멘토링 결합이 효과적입니다.
          </p>
        </div>

      </div>

      {/* Narrative Self-Reflection Inputs */}
      <div className="mt-6 space-y-4">
        
        {/* Reflection 1 */}
        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1.5">
            1. 본인의 강점 역량 성찰 및 현재 업무 적용 사례
          </label>
          <textarea
            rows={3}
            value={personalPlan.strengthsReflection}
            onChange={(e) => onChangePlan('strengthsReflection', e.target.value)}
            placeholder="예: 보고서 초안 작성 및 프레젠테이션 스토리라인 구성에서 프롬프트 기법을 적극 활용하여 기획서 작성 시간을 종전 대비 절반으로 단축했습니다."
            className="w-full text-xs p-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white placeholder:text-slate-400 text-slate-800 leading-relaxed"
          />
        </div>

        {/* Reflection 2 */}
        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1.5">
            2. 보완 필요 역량에 대한 구체적 개선 실행 계획
          </label>
          <textarea
            rows={3}
            value={personalPlan.weaknessesPlan}
            onChange={(e) => onChangePlan('weaknessesPlan', e.target.value)}
            placeholder="예: 업무 자동화(노코드 툴 연동)와 사내 지식 기반 에이전트 활용 지식이 부족하여, 3분기 실습 교육을 이수하고 부서 정기 보고서 수집 파이프라인을 구축하겠습니다."
            className="w-full text-xs p-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white placeholder:text-slate-400 text-slate-800 leading-relaxed"
          />
        </div>

        {/* Reflection 3 */}
        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1.5">
            3. 향후 6개월간의 정량적 목표 및 포부 (개인 다짐)
          </label>
          <textarea
            rows={2}
            value={personalPlan.personalGoalStatement}
            onChange={(e) => onChangePlan('personalGoalStatement', e.target.value)}
            placeholder="예: 2026년 하반기까지 전략기획팀의 주간 경영회의 보고서 데이터 취합을 자동화하고, 부서 내 AI 선도 매니저로 성장하겠습니다."
            className="w-full text-xs p-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white placeholder:text-slate-400 text-slate-800 leading-relaxed"
          />
        </div>

      </div>
    </section>
  );
};
