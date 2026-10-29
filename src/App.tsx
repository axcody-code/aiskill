import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { EmployeeProfileCard } from './components/EmployeeProfileCard';
import { RadarChart } from './components/RadarChart';
import { SkillComparisonBars } from './components/SkillComparisonBars';
import { SkillsEvaluationForm } from './components/SkillsEvaluationForm';
import { GradeDefinitionSection } from './components/GradeDefinitionSection';
import { PersonalDevelopmentSection } from './components/PersonalDevelopmentSection';
import { AnnualTrainingSection } from './components/AnnualTrainingSection';
import { SupervisorFeedbackSection } from './components/SupervisorFeedbackSection';
import { OrganizationDashboard } from './components/OrganizationDashboard';
import { 
  CURRENT_USER_DEFAULT, 
  INITIAL_EMPLOYEES, 
  AI_SKILL_CATEGORIES 
} from './data/skillsData';
import { EmployeeProfile, PersonalPlan, SupervisorReview, SkillScore } from './types/aiSkills';
import { calculateScores, calculateCompanyAverages } from './utils/skillCalculations';
import { CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'evaluation' | 'organization'>('evaluation');

  // Load current user profile from localStorage or default
  const [currentUser, setCurrentUser] = useState<EmployeeProfile>(() => {
    try {
      const saved = localStorage.getItem('ai_skills_current_user');
      return saved ? JSON.parse(saved) : CURRENT_USER_DEFAULT;
    } catch {
      return CURRENT_USER_DEFAULT;
    }
  });

  // Load all employees from localStorage or initial dataset
  const [employees, setEmployees] = useState<EmployeeProfile[]>(() => {
    try {
      const saved = localStorage.getItem('ai_skills_all_employees');
      if (saved) return JSON.parse(saved);
      return [CURRENT_USER_DEFAULT, ...INITIAL_EMPLOYEES];
    } catch {
      return [CURRENT_USER_DEFAULT, ...INITIAL_EMPLOYEES];
    }
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSupervisorSaved, setIsSupervisorSaved] = useState(false);

  // Auto-save current user to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ai_skills_current_user', JSON.stringify(currentUser));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [currentUser]);

  // Auto-save employees to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ai_skills_all_employees', JSON.stringify(employees));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [employees]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Calculate scores for current user
  const overallScores = calculateScores(currentUser.scores);

  // Calculate company-wide averages
  const companyAverages = calculateCompanyAverages(employees);

  // Handle score changes for 21 sub-items
  const handleScoreChange = (itemId: string, field: 'current' | 'target', value: number) => {
    setCurrentUser(prev => {
      const currentItem = prev.scores[itemId] || { current: 1, target: 1 };
      const updatedItem = {
        ...currentItem,
        [field]: value
      };
      return {
        ...prev,
        scores: {
          ...prev.scores,
          [itemId]: updatedItem
        }
      };
    });
  };

  // Quick Preset Handlers
  const handleApplyPreset = (presetType: 'beginner' | 'standard' | 'champion') => {
    const newScores: Record<string, SkillScore> = {};

    AI_SKILL_CATEGORIES.forEach(cat => {
      cat.items.forEach(item => {
        if (presetType === 'beginner') {
          newScores[item.id] = { current: 1 + (Math.random() > 0.5 ? 1 : 0), target: 3 };
        } else if (presetType === 'standard') {
          newScores[item.id] = { current: 3, target: 4 };
        } else {
          newScores[item.id] = { current: 4 + (Math.random() > 0.4 ? 1 : 0), target: 5 };
        }
      });
    });

    setCurrentUser(prev => ({
      ...prev,
      scores: newScores
    }));

    showToast(
      presetType === 'beginner' ? '입문/신입사원 프리셋이 적용되었습니다.' :
      presetType === 'standard' ? '실무자 표준 프리셋이 적용되었습니다.' :
      'AI 선도자/챔피언 프리셋이 적용되었습니다.'
    );
  };

  // Reset to default
  const handleResetScores = () => {
    if (window.confirm('평가 점수를 초기 상태로 복원하시겠습니까?')) {
      setCurrentUser(CURRENT_USER_DEFAULT);
      showToast('기본 평가 데이터로 초기화되었습니다.');
    }
  };

  // Personal Plan changes
  const handlePersonalPlanChange = (field: keyof PersonalPlan, value: string | string[]) => {
    setCurrentUser(prev => ({
      ...prev,
      personalPlan: {
        ...prev.personalPlan,
        [field]: value
      }
    }));
  };

  // Toggle training courses
  const handleToggleCourse = (courseId: string) => {
    const currentCourses = currentUser.personalPlan.selectedCourseIds || [];
    const updated = currentCourses.includes(courseId)
      ? currentCourses.filter(id => id !== courseId)
      : [...currentCourses, courseId];

    handlePersonalPlanChange('selectedCourseIds', updated);
    showToast(currentCourses.includes(courseId) ? '수강 신청이 취소되었습니다.' : '교육 수강 과정이 신청되었습니다.');
  };

  // Auto-generate personal development suggestions based on scores
  const handleAutoGenerateSuggestions = () => {
    const sorted = [...overallScores.categoryScores].sort((a, b) => b.currentAvg - a.currentAvg);
    const topCat = sorted[0];
    const lowCat = sorted[sorted.length - 1];

    const newReflection = `현재 ${topCat.categoryName}(평균 ${topCat.currentAvg}점) 영역에서 높은 숙련도를 보이고 있으며, 이를 바탕으로 일상 기획 및 분석 업무의 리드타임을 약 40% 이상 단축하고 사내 베스트 프랙티스를 형성하고 있습니다.`;
    const newWeakness = `상대적으로 점수가 낮은 ${lowCat.categoryName}(평균 ${lowCat.currentAvg}점) 영역을 보완하기 위해, 분기별 실무 집중 교육 과정을 수강하고 사내 자동화 프로젝트 파일럿에 적극 참여하여 실무 역량을 강화하겠습니다.`;
    const newGoal = `2026년 하반기까지 ${lowCat.categoryName} 역량을 4.0점 이상으로 끌어올리고, 부서 내 업무 프로세스 2건 이상을 AI 기반 파이프라인으로 전환하여 전사 AI 혁신에 기여하겠습니다.`;

    setCurrentUser(prev => ({
      ...prev,
      personalPlan: {
        ...prev.personalPlan,
        strengthsReflection: newReflection,
        weaknessesPlan: newWeakness,
        personalGoalStatement: newGoal
      }
    }));

    showToast('현재 역량 점수 기반 맞춤 발전계획이 자동 작성되었습니다.');
  };

  // Supervisor Review changes
  const handleSupervisorReviewChange = (field: keyof SupervisorReview, value: string | number) => {
    setIsSupervisorSaved(false);
    setCurrentUser(prev => ({
      ...prev,
      supervisorReview: {
        ...prev.supervisorReview,
        [field]: value
      }
    }));
  };

  // Save supervisor review
  const handleSaveSupervisorReview = () => {
    setIsSupervisorSaved(true);
    // Sync into employees list as well
    setEmployees(prev => {
      const idx = prev.findIndex(e => e.id === currentUser.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = currentUser;
        return copy;
      } else {
        return [currentUser, ...prev];
      }
    });
    showToast('상급자 평가 및 코멘트가 성공적으로 저장되었습니다.');
  };

  // Sync current user to company list
  const handleSyncCurrentToCompany = () => {
    setEmployees(prev => {
      const idx = prev.findIndex(e => e.id === currentUser.id);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = currentUser;
        return updated;
      } else {
        return [currentUser, ...prev];
      }
    });
    showToast('내 역량 진단 결과가 전사 임직원 현황에 반영되었습니다.');
  };

  // Print Handler
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      
      {/* Top Bar Header */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onPrint={handlePrint}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-lg shadow-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* TAB 1: Individual Assessment View */}
        {activeTab === 'evaluation' && (
          <div className="space-y-8">
            
            {/* Employee Profile Header Card */}
            <EmployeeProfileCard
              profile={currentUser}
              overallScore={overallScores}
              onUpdateProfile={(updates) => setCurrentUser(prev => ({ ...prev, ...updates }))}
            />

            {/* Visual Charts Section (Radar Chart + Comparison Bars) */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
                <div>
                  <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-blue-600" />
                    <span>7대 AI 역량 시각화 분석 도표 (Radar & Gap Analysis)</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    본인의 현재 역량, 설정한 목표 수준, 그리고 전사 임직원 평균을 다차원 레이더 및 비교 지표로 시각화합니다.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleResetScores}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>점수 초기화</span>
                  </button>
                </div>
              </div>

              {/* 2-Column Split: Radar Chart on Left, Detailed Metric Bars on Right */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6 items-center">
                
                {/* Left: Interactive Radar Chart (6 Cols) */}
                <div className="lg:col-span-6 flex flex-col items-center justify-center p-2">
                  <RadarChart
                    categoryScores={overallScores.categoryScores}
                    companyAverages={companyAverages.categoryAverages}
                    size={460}
                    showCompanyAverage={true}
                  />
                </div>

                {/* Right: Comparative Breakdown Bars (6 Cols) */}
                <div className="lg:col-span-6 space-y-4">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700 pb-2 border-b border-slate-100">
                    <span>7대 핵심 영역별 비교 분석</span>
                    <span className="text-[11px] text-slate-400 font-mono">현재 / 목표 / 전사평균</span>
                  </div>
                  <SkillComparisonBars
                    categoryScores={overallScores.categoryScores}
                    companyAverages={companyAverages.categoryAverages}
                  />
                </div>

              </div>
            </div>

            {/* 7 AI Skills Assessment Form (21 sub-items, 5-grade sliders/buttons) */}
            <SkillsEvaluationForm
              scores={currentUser.scores}
              onScoreChange={handleScoreChange}
              onApplyPreset={handleApplyPreset}
            />

            {/* Bottom 1: 5-Grade Definitive Rubric Criteria */}
            <GradeDefinitionSection />

            {/* Bottom 2: Personal Development Plan Based on Scores */}
            <PersonalDevelopmentSection
              categoryScores={overallScores.categoryScores}
              personalPlan={currentUser.personalPlan}
              onChangePlan={handlePersonalPlanChange}
              onAutoGenerateSuggestions={handleAutoGenerateSuggestions}
            />

            {/* Bottom 3: Annual AI Training Schedule (Q1~Q4) */}
            <AnnualTrainingSection
              selectedCourseIds={currentUser.personalPlan.selectedCourseIds}
              onToggleCourse={handleToggleCourse}
            />

            {/* Bottom 4: Supervisor Narrative Feedback & Coaching */}
            <SupervisorFeedbackSection
              supervisorReview={currentUser.supervisorReview}
              onChangeReview={handleSupervisorReviewChange}
              onSaveFeedback={handleSaveSupervisorReview}
              isSaved={isSupervisorSaved}
            />

          </div>
        )}

        {/* TAB 2: Company-Wide Organization Dashboard View */}
        {activeTab === 'organization' && (
          <OrganizationDashboard
            employees={employees}
            currentUserProfile={currentUser}
            onSelectEmployeeToView={(emp) => {
              setCurrentUser(emp);
              setActiveTab('evaluation');
              showToast(`${emp.name} 님의 진단서 화면으로 전환되었습니다.`);
            }}
            onSyncCurrentToCompany={handleSyncCurrentToCompany}
          />
        )}

      </main>

      {/* Corporate HRD Quiet Footer */}
      <footer className="mt-12 py-6 border-t border-slate-200 bg-white text-xs text-slate-500 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Enterprise AI Talent Framework 2026</span>
            <span>·</span>
            <span>디지털혁신추진단 & 인재개발HRD</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>7대 AI 역량 진단 표준 규격 v2.4</span>
            <span>·</span>
            <span>사내 기밀 데이터 보호 준수</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
