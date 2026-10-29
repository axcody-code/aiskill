import React from 'react';
import { CategoryScoreResult } from '../utils/skillCalculations';

interface SkillComparisonBarsProps {
  categoryScores: CategoryScoreResult[];
  companyAverages?: Record<string, number>;
}

export const SkillComparisonBars: React.FC<SkillComparisonBarsProps> = ({
  categoryScores,
  companyAverages,
}) => {
  return (
    <div className="space-y-4">
      {categoryScores.map((cat) => {
        const compAvg = companyAverages?.[cat.categoryId] ?? 2.8;
        const currentPercent = (cat.currentAvg / 5) * 100;
        const targetPercent = (cat.targetAvg / 5) * 100;
        const companyPercent = (compAvg / 5) * 100;

        return (
          <div key={cat.categoryId} className="bg-slate-50/70 p-3 rounded-lg border border-slate-200/80">
            <div className="flex items-center justify-between mb-1.5 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-slate-500">{cat.categoryCode}</span>
                <span className="font-semibold text-slate-900">{cat.categoryName}</span>
              </div>
              <div className="flex items-center gap-3 font-mono tabular-nums text-slate-600">
                <span className="text-blue-600 font-bold">현재 {cat.currentAvg.toFixed(1)}</span>
                <span className="text-slate-300">/</span>
                <span className="text-violet-600 font-bold">목표 {cat.targetAvg.toFixed(1)}</span>
                <span className="text-slate-300">/</span>
                <span className="text-amber-700">전사 {compAvg.toFixed(1)}</span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold text-[11px]">
                  갭 +{cat.gap.toFixed(1)}
                </span>
              </div>
            </div>

            {/* Visual Bar Stack */}
            <div className="relative h-3 bg-slate-200 rounded-full overflow-hidden">
              {/* Target Goal (Subtle Violet Background) */}
              <div
                className="absolute top-0 bottom-0 left-0 bg-violet-200 rounded-full"
                style={{ width: `${targetPercent}%` }}
              />
              {/* Current Score (Solid Blue Foreground) */}
              <div
                className="absolute top-0 bottom-0 left-0 bg-blue-600 rounded-full"
                style={{ width: `${currentPercent}%` }}
              />
              {/* Company Average Indicator Line */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-amber-600 z-10"
                style={{ left: `${companyPercent}%` }}
                title={`전사 평균: ${compAvg.toFixed(1)}점`}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
