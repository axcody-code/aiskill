import React, { useState } from 'react';
import { AI_SKILL_CATEGORIES } from '../data/skillsData';
import { SkillScore } from '../types/aiSkills';
import { 
  MessageSquareText, 
  Workflow, 
  BarChart3, 
  Sparkles, 
  ShieldCheck, 
  Compass, 
  Bot, 
  ChevronDown, 
  ChevronUp, 
  Info,
  CheckCircle2,
  Wand2
} from 'lucide-react';

interface SkillsEvaluationFormProps {
  scores: Record<string, SkillScore>;
  onScoreChange: (itemId: string, field: 'current' | 'target', value: number) => void;
  onApplyPreset: (presetType: 'beginner' | 'standard' | 'champion') => void;
}

export const SkillsEvaluationForm: React.FC<SkillsEvaluationFormProps> = ({
  scores,
  onScoreChange,
  onApplyPreset,
}) => {
  // Keep track of which category accordion is open (default: all open or first open)
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    'skill-prompt': true,
    'skill-automation': true,
    'skill-data': true,
    'skill-multimedia': true,
    'skill-ethics': true,
    'skill-tools': true,
    'skill-agents': true,
  });

  const toggleCategory = (catId: string) => {
    setOpenCategories(prev => ({
      ...prev,
      [catId]: !prev[catId]
    }));
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'MessageSquareText': return <MessageSquareText className="w-5 h-5 text-blue-600" />;
      case 'Workflow': return <Workflow className="w-5 h-5 text-indigo-600" />;
      case 'BarChart3': return <BarChart3 className="w-5 h-5 text-emerald-600" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-amber-600" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-rose-600" />;
      case 'Compass': return <Compass className="w-5 h-5 text-cyan-600" />;
      case 'Bot': return <Bot className="w-5 h-5 text-purple-600" />;
      default: return <Info className="w-5 h-5 text-slate-600" />;
    }
  };

  const gradeNames: Record<number, string> = {
    1: '1단계: 입문 (Novice)',
    2: '2단계: 초급 (Basic)',
    3: '3단계: 중급 (Competent)',
    4: '4단계: 고급 (Proficient)',
    5: '5단계: 선도 (Champion)'
  };

  return (
    <div className="space-y-6">
      {/* Top action banner for Quick Presets & Guidance */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span>7대 AI 스킬 21개 세부항목 역량 진단표</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            각 항목별로 본인의 <span className="font-semibold text-blue-600">현재 수준(1~5단계)</span>과 달성하고자 하는 <span className="font-semibold text-violet-600">목표 수준(1~5단계)</span>을 각각 지정하세요.
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
            <Wand2 className="w-3.5 h-3.5" /> 빠른 프리셋:
          </span>
          <button
            type="button"
            onClick={() => onApplyPreset('beginner')}
            className="px-2.5 py-1.5 text-xs font-medium rounded-md bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
          >
            입문/신입
          </button>
          <button
            type="button"
            onClick={() => onApplyPreset('standard')}
            className="px-2.5 py-1.5 text-xs font-medium rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
          >
            실무자 표준
          </button>
          <button
            type="button"
            onClick={() => onApplyPreset('champion')}
            className="px-2.5 py-1.5 text-xs font-medium rounded-md bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition-colors"
          >
            AI 선도자/챔피언
          </button>
        </div>
      </div>

      {/* 7 Skill Categories Accordions */}
      <div className="space-y-5">
        {AI_SKILL_CATEGORIES.map((category) => {
          const isOpen = !!openCategories[category.id];

          // Compute category current and target averages
          const catItemScores = category.items.map(item => scores[item.id] || { current: 1, target: 1 });
          const catCurrentAvg = (catItemScores.reduce((acc, s) => acc + s.current, 0) / category.items.length).toFixed(1);
          const catTargetAvg = (catItemScores.reduce((acc, s) => acc + s.target, 0) / category.items.length).toFixed(1);

          return (
            <div
              key={category.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs transition-shadow hover:shadow-sm"
            >
              {/* Category Header Bar */}
              <button
                type="button"
                onClick={() => toggleCategory(category.id)}
                className="w-full text-left p-4 md:p-5 flex items-center justify-between gap-4 bg-slate-50/50 hover:bg-slate-50 transition-colors border-b border-slate-100"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg border border-slate-200 shrink-0">
                    {getIcon(category.icon)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-500">{category.code}</span>
                      <h3 className="text-base font-bold text-slate-900">{category.name}</h3>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{category.summary}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="hidden sm:flex items-center gap-2 text-xs font-mono tabular-nums">
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 font-semibold rounded border border-blue-200">
                      현재 평균 {catCurrentAvg}
                    </span>
                    <span className="px-2 py-1 bg-violet-50 text-violet-700 font-semibold rounded border border-violet-200">
                      목표 평균 {catTargetAvg}
                    </span>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </div>
              </button>

              {/* Sub-items list (3 items per category) */}
              {isOpen && (
                <div className="divide-y divide-slate-100">
                  {category.items.map((subItem, idx) => {
                    const score = scores[subItem.id] || { current: 1, target: 1 };
                    const isTargetHigher = score.target > score.current;

                    return (
                      <div key={subItem.id} className="p-4 md:p-5 transition-colors hover:bg-slate-50/30">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                          
                          {/* Item Info Column (7 Cols on LG) */}
                          <div className="lg:col-span-7 space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="px-1.5 py-0.5 bg-slate-100 text-slate-700 font-mono text-xs font-semibold rounded">
                                {subItem.code}
                              </span>
                              <h4 className="text-sm font-bold text-slate-900">
                                {idx + 1}. {subItem.title}
                              </h4>
                            </div>

                            <p className="text-xs text-slate-600 leading-relaxed">
                              {subItem.description}
                            </p>

                            {/* Practical Example Box */}
                            <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-md border border-slate-200/70">
                              <span className="font-semibold text-slate-700">실무 적용 예시: </span>
                              {subItem.practicalExample}
                            </div>

                            <div className="text-[11px] text-indigo-700/80 flex items-center gap-1 font-medium">
                              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                              <span>평가 주안점: {subItem.evaluationFocus}</span>
                            </div>
                          </div>

                          {/* Evaluation Controls Column (5 Cols on LG) */}
                          <div className="lg:col-span-5 bg-slate-50/70 p-3.5 rounded-lg border border-slate-200/80 space-y-3.5">
                            
                            {/* Current Score Selector (현재 점수 1~5) */}
                            <div>
                              <div className="flex items-center justify-between mb-1.5">
                                <span className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                                  <span className="w-2 h-2 rounded-full bg-blue-600 inline-block"></span>
                                  현재 역량 점수
                                </span>
                                <span className="text-xs font-bold font-mono text-blue-700">
                                  {gradeNames[score.current]}
                                </span>
                              </div>
                              <div className="grid grid-cols-5 gap-1.5">
                                {[1, 2, 3, 4, 5].map((lvl) => {
                                  const isSelected = score.current === lvl;
                                  return (
                                    <button
                                      key={`curr-${subItem.id}-${lvl}`}
                                      type="button"
                                      onClick={() => onScoreChange(subItem.id, 'current', lvl)}
                                      className={`py-1.5 text-xs font-bold rounded-md transition-all text-center ${
                                        isSelected
                                          ? 'bg-blue-600 text-white shadow-xs ring-2 ring-blue-300'
                                          : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                                      }`}
                                      title={gradeNames[lvl]}
                                    >
                                      {lvl}점
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Target Score Selector (목표 점수 1~5) */}
                            <div>
                              <div className="flex items-center justify-between mb-1.5">
                                <span className="text-xs font-bold text-violet-900 flex items-center gap-1.5">
                                  <span className="w-2 h-2 rounded-full bg-violet-600 inline-block"></span>
                                  목표 설정 점수
                                </span>
                                <span className="text-xs font-bold font-mono text-violet-700">
                                  {gradeNames[score.target]}
                                </span>
                              </div>
                              <div className="grid grid-cols-5 gap-1.5">
                                {[1, 2, 3, 4, 5].map((lvl) => {
                                  const isSelected = score.target === lvl;
                                  return (
                                    <button
                                      key={`targ-${subItem.id}-${lvl}`}
                                      type="button"
                                      onClick={() => onScoreChange(subItem.id, 'target', lvl)}
                                      className={`py-1.5 text-xs font-bold rounded-md transition-all text-center ${
                                        isSelected
                                          ? 'bg-violet-600 text-white shadow-xs ring-2 ring-violet-300'
                                          : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                                      }`}
                                      title={gradeNames[lvl]}
                                    >
                                      {lvl}점
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Status indicator line */}
                            <div className="pt-1 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                              <span className="text-slate-500">
                                역량 격차 (Gap):
                              </span>
                              <span className={`font-mono font-bold ${isTargetHigher ? 'text-violet-700' : 'text-slate-600'}`}>
                                {isTargetHigher ? `+${score.target - score.current}점 향상 목표` : '목표 수준 도달'}
                              </span>
                            </div>

                          </div>

                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
