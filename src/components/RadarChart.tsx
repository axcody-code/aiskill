import React, { useState } from 'react';
import { AI_SKILL_CATEGORIES } from '../data/skillsData';
import { CategoryScoreResult } from '../utils/skillCalculations';

interface RadarChartProps {
  categoryScores: CategoryScoreResult[];
  companyAverages?: Record<string, number>;
  size?: number;
  showCompanyAverage?: boolean;
}

export const RadarChart: React.FC<RadarChartProps> = ({
  categoryScores,
  companyAverages,
  size = 460,
  showCompanyAverage = true,
}) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const center = size / 2;
  const radius = (size / 2) - 64; // leave margin for text labels
  const totalAxes = AI_SKILL_CATEGORIES.length; // 7 skills
  const maxScore = 5;
  const levels = [1, 2, 3, 4, 5];

  // Helper to convert polar coordinates (axisIndex, score) to Cartesian (x, y)
  const getCoordinates = (axisIndex: number, score: number) => {
    // Start at top (-90 deg or -PI/2) and rotate clockwise
    const angle = (Math.PI * 2 / totalAxes) * axisIndex - (Math.PI / 2);
    const r = (score / maxScore) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y, angle };
  };

  // Build grid concentric polygons (levels 1 to 5)
  const gridPolygons = levels.map(level => {
    const points = Array.from({ length: totalAxes }).map((_, i) => {
      const { x, y } = getCoordinates(i, level);
      return `${x},${y}`;
    }).join(' ');
    return { level, points };
  });

  // Calculate coordinates for Current Score Polygon
  const currentPoints = categoryScores.map((cat, i) => {
    const { x, y } = getCoordinates(i, cat.currentAvg);
    return `${x},${y}`;
  }).join(' ');

  // Calculate coordinates for Target Score Polygon
  const targetPoints = categoryScores.map((cat, i) => {
    const { x, y } = getCoordinates(i, cat.targetAvg);
    return `${x},${y}`;
  }).join(' ');

  // Calculate coordinates for Company Average Polygon
  const companyPoints = categoryScores.map((cat, i) => {
    const compAvg = companyAverages?.[cat.categoryId] ?? 2.8;
    const { x, y } = getCoordinates(i, compAvg);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="flex flex-col items-center select-none">
      <div className="relative w-full max-w-[480px] aspect-square flex items-center justify-center">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="w-full h-full overflow-visible transition-all duration-300"
        >
          {/* Defs for gradients & shadow filters */}
          <defs>
            <radialGradient id="radarGridGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f1f5f9" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.2" />
            </radialGradient>
            <linearGradient id="currentAreaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="targetAreaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.08" />
            </linearGradient>
          </defs>

          {/* Background concentric level polygons */}
          {gridPolygons.map(({ level, points }) => (
            <polygon
              key={`grid-${level}`}
              points={points}
              fill={level === 5 ? 'url(#radarGridGradient)' : 'transparent'}
              stroke="#cbd5e1"
              strokeWidth={level === 5 ? '1.5' : '1'}
              strokeDasharray={level % 2 === 0 ? '3 3' : undefined}
            />
          ))}

          {/* Radial axis lines from center to outer points */}
          {Array.from({ length: totalAxes }).map((_, i) => {
            const { x, y } = getCoordinates(i, maxScore);
            return (
              <line
                key={`axis-${i}`}
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke="#e2e8f0"
                strokeWidth="1.5"
              />
            );
          })}

          {/* Level number labels along the vertical axis (axis 0, upward) */}
          {levels.map(level => {
            const { y } = getCoordinates(0, level);
            return (
              <text
                key={`label-lvl-${level}`}
                x={center + 6}
                y={y + 3}
                fill="#94a3b8"
                fontSize="10"
                fontFamily="monospace"
                fontWeight="600"
              >
                {level}.0
              </text>
            );
          })}

          {/* Target Score Polygon (Violet outline + subtle translucent fill) */}
          <polygon
            points={targetPoints}
            fill="url(#targetAreaGradient)"
            stroke="#8b5cf6"
            strokeWidth="2.5"
            strokeDasharray="5 4"
            className="transition-all duration-300"
          />

          {/* Company Average Polygon (Optional, Subtle amber/slate dashed line) */}
          {showCompanyAverage && companyAverages && (
            <polygon
              points={companyPoints}
              fill="transparent"
              stroke="#d97706"
              strokeWidth="1.8"
              strokeDasharray="3 3"
              opacity="0.8"
              className="transition-all duration-300"
            />
          )}

          {/* Current Score Polygon (Primary Blue with gradient fill) */}
          <polygon
            points={currentPoints}
            fill="url(#currentAreaGradient)"
            stroke="#2563eb"
            strokeWidth="2.5"
            className="transition-all duration-300"
          />

          {/* Data point markers for Current Score */}
          {categoryScores.map((cat, i) => {
            const { x, y } = getCoordinates(i, cat.currentAvg);
            const isHovered = activeCategory === cat.categoryId;
            return (
              <g
                key={`curr-dot-${cat.categoryId}`}
                className="cursor-pointer"
                onMouseEnter={() => setActiveCategory(cat.categoryId)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                <circle
                  cx={x}
                  cy={y}
                  r={isHovered ? 7 : 4.5}
                  fill="#ffffff"
                  stroke="#2563eb"
                  strokeWidth="2.5"
                  className="transition-all duration-200"
                />
              </g>
            );
          })}

          {/* Data point markers for Target Score */}
          {categoryScores.map((cat, i) => {
            const { x, y } = getCoordinates(i, cat.targetAvg);
            return (
              <circle
                key={`targ-dot-${cat.categoryId}`}
                cx={x}
                cy={y}
                r="3.5"
                fill="#ffffff"
                stroke="#8b5cf6"
                strokeWidth="2"
              />
            );
          })}

          {/* Axis Labels (Outer Text around radar) */}
          {categoryScores.map((cat, i) => {
            const { x, y, angle } = getCoordinates(i, maxScore + 0.65);
            // Text alignment adjustments based on angle
            let textAnchor: 'middle' | 'start' | 'end' = 'middle';
            const cos = Math.cos(angle);
            if (cos > 0.25) textAnchor = 'start';
            else if (cos < -0.25) textAnchor = 'end';

            const isHovered = activeCategory === cat.categoryId;
            const shortName = cat.categoryName.split('&')[0].trim();

            return (
              <g
                key={`axis-label-${cat.categoryId}`}
                className="cursor-pointer"
                onMouseEnter={() => setActiveCategory(cat.categoryId)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                <text
                  x={x}
                  y={y - 6}
                  textAnchor={textAnchor}
                  fill={isHovered ? '#1e40af' : '#334155'}
                  fontSize="11.5"
                  fontWeight={isHovered ? '700' : '600'}
                  className="transition-colors duration-150"
                >
                  {cat.categoryCode} {shortName}
                </text>
                <text
                  x={x}
                  y={y + 8}
                  textAnchor={textAnchor}
                  fill={isHovered ? '#2563eb' : '#64748b'}
                  fontSize="10"
                  fontFamily="monospace"
                  className="tabular-nums"
                >
                  현재 {cat.currentAvg.toFixed(1)} / 목표 {cat.targetAvg.toFixed(1)}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover Information Floating Tooltip */}
        {activeCategory && (() => {
          const item = categoryScores.find(c => c.categoryId === activeCategory);
          if (!item) return null;
          const compAvg = companyAverages?.[item.categoryId] ?? 0;
          return (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-3.5 py-2 rounded-lg shadow-lg text-xs flex items-center gap-3 z-10 whitespace-nowrap pointer-events-none">
              <span className="font-semibold text-slate-100">{item.categoryName}</span>
              <span className="text-blue-300 font-mono">현재: {item.currentAvg.toFixed(2)}</span>
              <span className="text-violet-300 font-mono">목표: {item.targetAvg.toFixed(2)}</span>
              {showCompanyAverage && (
                <span className="text-amber-300 font-mono">전사평균: {compAvg.toFixed(2)}</span>
              )}
              <span className="text-emerald-300 font-mono">갭: +{item.gap.toFixed(2)}</span>
            </div>
          );
        })()}
      </div>

      {/* Chart Legend */}
      <div className="flex flex-wrap items-center justify-center gap-5 mt-2 text-xs font-medium text-slate-600">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-blue-600 inline-block"></span>
          <span>본인 현재 점수</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-0.5 border-t-2 border-dashed border-violet-600 inline-block"></span>
          <span>목표 설정 점수</span>
        </div>
        {showCompanyAverage && (
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-0.5 border-t-2 border-dashed border-amber-600 inline-block"></span>
            <span>전사 임직원 평균</span>
          </div>
        )}
      </div>
    </div>
  );
};
