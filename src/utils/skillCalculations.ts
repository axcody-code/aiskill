import { AI_SKILL_CATEGORIES } from '../data/skillsData';
import { SkillScore, EmployeeProfile } from '../types/aiSkills';

export interface CategoryScoreResult {
  categoryId: string;
  categoryName: string;
  categoryCode: string;
  currentAvg: number;
  targetAvg: number;
  gap: number;
  itemCount: number;
}

export interface OverallScoreResult {
  overallCurrentAvg: number;
  overallTargetAvg: number;
  overallGap: number;
  categoryScores: CategoryScoreResult[];
  completionPercentage: number;
}

/**
 * Calculates current and target averages for an individual employee
 */
export function calculateScores(scores: Record<string, SkillScore>): OverallScoreResult {
  const categoryScores: CategoryScoreResult[] = AI_SKILL_CATEGORIES.map(category => {
    let currentSum = 0;
    let targetSum = 0;
    let validCount = 0;

    category.items.forEach(item => {
      const score = scores[item.id] || { current: 1, target: 1 };
      currentSum += score.current;
      targetSum += score.target;
      validCount += 1;
    });

    const currentAvg = validCount > 0 ? Number((currentSum / validCount).toFixed(2)) : 0;
    const targetAvg = validCount > 0 ? Number((targetSum / validCount).toFixed(2)) : 0;
    const gap = Number((targetAvg - currentAvg).toFixed(2));

    return {
      categoryId: category.id,
      categoryName: category.name,
      categoryCode: category.code,
      currentAvg,
      targetAvg,
      gap,
      itemCount: validCount
    };
  });

  const totalCurrent = categoryScores.reduce((acc, cat) => acc + cat.currentAvg, 0);
  const totalTarget = categoryScores.reduce((acc, cat) => acc + cat.targetAvg, 0);
  const count = categoryScores.length;

  const overallCurrentAvg = count > 0 ? Number((totalCurrent / count).toFixed(2)) : 0;
  const overallTargetAvg = count > 0 ? Number((totalTarget / count).toFixed(2)) : 0;
  const overallGap = Number((overallTargetAvg - overallCurrentAvg).toFixed(2));
  
  // Progress towards 5.0 scale (or towards target)
  const completionPercentage = overallTargetAvg > 0 
    ? Math.min(100, Math.round((overallCurrentAvg / overallTargetAvg) * 100))
    : 0;

  return {
    overallCurrentAvg,
    overallTargetAvg,
    overallGap,
    categoryScores,
    completionPercentage
  };
}

/**
 * Calculates company-wide averages for each category across all employee profiles
 */
export function calculateCompanyAverages(employees: EmployeeProfile[]): {
  categoryAverages: Record<string, number>;
  companyOverallAvg: number;
  companyTargetAvg: number;
} {
  const categorySums: Record<string, number> = {};
  AI_SKILL_CATEGORIES.forEach(cat => {
    categorySums[cat.id] = 0;
  });

  let totalCurrentSum = 0;
  let totalTargetSum = 0;

  employees.forEach(emp => {
    const res = calculateScores(emp.scores);
    res.categoryScores.forEach(catScore => {
      categorySums[catScore.categoryId] += catScore.currentAvg;
    });
    totalCurrentSum += res.overallCurrentAvg;
    totalTargetSum += res.overallTargetAvg;
  });

  const n = employees.length || 1;
  const categoryAverages: Record<string, number> = {};
  Object.keys(categorySums).forEach(catId => {
    categoryAverages[catId] = Number((categorySums[catId] / n).toFixed(2));
  });

  return {
    categoryAverages,
    companyOverallAvg: Number((totalCurrentSum / n).toFixed(2)),
    companyTargetAvg: Number((totalTargetSum / n).toFixed(2))
  };
}

/**
 * Returns grade level label based on score
 */
export function getGradeLabel(score: number): { level: number; label: string; badgeClass: string } {
  if (score >= 4.5) return { level: 5, label: 'LV.5 선도(Champion)', badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
  if (score >= 3.5) return { level: 4, label: 'LV.4 고급(Advanced)', badgeClass: 'bg-indigo-100 text-indigo-800 border-indigo-300' };
  if (score >= 2.5) return { level: 3, label: 'LV.3 중급(Practitioner)', badgeClass: 'bg-blue-100 text-blue-800 border-blue-300' };
  if (score >= 1.5) return { level: 2, label: 'LV.2 초급(Beginner)', badgeClass: 'bg-sky-100 text-sky-800 border-sky-300' };
  return { level: 1, label: 'LV.1 입문(Novice)', badgeClass: 'bg-slate-100 text-slate-700 border-slate-300' };
}
