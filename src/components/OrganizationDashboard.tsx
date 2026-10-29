import React, { useState } from 'react';
import { EmployeeProfile } from '../types/aiSkills';
import { AI_SKILL_CATEGORIES } from '../data/skillsData';
import { calculateScores, calculateCompanyAverages, getGradeLabel } from '../utils/skillCalculations';
import { RadarChart } from './RadarChart';
import { 
  Users, 
  Search, 
  Filter, 
  Award, 
  TrendingUp, 
  Building2, 
  CheckCircle2, 
  ArrowUpRight,
  Eye,
  X
} from 'lucide-react';

interface OrganizationDashboardProps {
  employees: EmployeeProfile[];
  onSelectEmployeeToView: (employee: EmployeeProfile) => void;
  currentUserProfile: EmployeeProfile;
  onSyncCurrentToCompany: () => void;
}

export const OrganizationDashboard: React.FC<OrganizationDashboardProps> = ({
  employees,
  currentUserProfile,
  onSyncCurrentToCompany,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>('ALL');
  const [selectedGradeFilter, setSelectedGradeFilter] = useState<string>('ALL');
  const [inspectingEmployee, setInspectingEmployee] = useState<EmployeeProfile | null>(null);

  // Calculate company stats
  const companyStats = calculateCompanyAverages(employees);

  // Unique departments
  const departments = ['ALL', ...Array.from(new Set(employees.map(e => e.department)))];

  // Calculate department averages
  const deptAverages = departments
    .filter(d => d !== 'ALL')
    .map(dept => {
      const deptEmployees = employees.filter(e => e.department === dept);
      const totalScore = deptEmployees.reduce((acc, emp) => {
        return acc + calculateScores(emp.scores).overallCurrentAvg;
      }, 0);
      const avg = Number((totalScore / deptEmployees.length).toFixed(2));
      return {
        department: dept,
        count: deptEmployees.length,
        average: avg,
      };
    })
    .sort((a, b) => b.average - a.average);

  // Filtered employees list
  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = 
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.employeeNo.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDept = selectedDept === 'ALL' || emp.department === selectedDept;

    const empScore = calculateScores(emp.scores).overallCurrentAvg;
    const grade = getGradeLabel(empScore);
    const matchesGrade = selectedGradeFilter === 'ALL' || grade.level.toString() === selectedGradeFilter;

    return matchesSearch && matchesDept && matchesGrade;
  });

  // Calculate champion count (Level 4.5+)
  const championCount = employees.filter(emp => {
    const score = calculateScores(emp.scores).overallCurrentAvg;
    return score >= 4.0;
  }).length;

  return (
    <div className="space-y-6">
      
      {/* Top Company Executive KPI Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Total Employees & Participation */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">진단 참여 임직원</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono tabular-nums text-slate-900">
              {employees.length}명
            </span>
            <span className="text-xs text-emerald-600 font-semibold font-mono">
              참여율 96.4%
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            전사 8개 본부 대상 정기 2026 역량 평가 집계
          </p>
        </div>

        {/* Metric 2: Company Current Average Score */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">전사 AI 역량 평균</span>
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono tabular-nums text-blue-600">
              {companyStats.companyOverallAvg.toFixed(2)}
            </span>
            <span className="text-xs text-slate-400">/ 5.0 만점</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-2 flex items-center justify-between">
            <span>목표 수준: {companyStats.companyTargetAvg.toFixed(2)}점</span>
            <span className="font-semibold text-violet-600 font-mono">
              갭 +{(companyStats.companyTargetAvg - companyStats.companyOverallAvg).toFixed(2)}
            </span>
          </div>
        </div>

        {/* Metric 3: AI Champions & Leaders */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">AI 선도자 (Lv.4+ 고급/선도)</span>
            <Award className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono tabular-nums text-emerald-700">
              {championCount}명
            </span>
            <span className="text-xs text-slate-500 font-mono">
              ({Math.round((championCount / employees.length) * 100)}%)
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            부서별 업무 자동화 및 워크플로우 코칭 가능 인력
          </p>
        </div>

        {/* Metric 4: Top Department */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">최고 역량 보유 부서</span>
            <Building2 className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-slate-900 truncate">
              {deptAverages[0]?.department || '디지털혁신추진실'}
            </span>
          </div>
          <p className="text-[11px] text-indigo-600 font-semibold font-mono mt-2">
            부서 평균 {deptAverages[0]?.average.toFixed(2)}점 (선도 수준)
          </p>
        </div>

      </div>

      {/* Mid Section: 7 Skills Company Heatmap & Department Rankings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: 7 Skills Company Matrix (7 Cols on LG) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">7대 AI 역량별 전사 보유 현황</h3>
              <p className="text-xs text-slate-500 mt-0.5">전사 임직원의 스킬별 평균 점수 및 목표 비교</p>
            </div>
            <span className="text-xs font-mono font-semibold text-slate-600">5.0점 만점 척도</span>
          </div>

          <div className="space-y-3.5">
            {AI_SKILL_CATEGORIES.map((cat) => {
              const score = companyStats.categoryAverages[cat.id] || 2.8;
              const percent = (score / 5) * 100;

              return (
                <div key={cat.id} className="text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-slate-800">
                      <span className="font-mono text-slate-500 mr-1.5">{cat.code}</span>
                      {cat.name}
                    </span>
                    <div className="flex items-center gap-2 font-mono tabular-nums">
                      <span className="font-bold text-slate-900">{score.toFixed(2)}</span>
                      <span className="text-slate-400">/ 5.0</span>
                    </div>
                  </div>
                  <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        score >= 4.0 ? 'bg-emerald-500' :
                        score >= 3.0 ? 'bg-blue-600' :
                        score >= 2.0 ? 'bg-sky-500' : 'bg-slate-400'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Department Average Ranking (5 Cols on LG) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900">부서별 AI 역량 순위</h3>
                <p className="text-xs text-slate-500 mt-0.5">조직별 종합 평균 점수 랭킹</p>
              </div>
            </div>

            <div className="space-y-2.5">
              {deptAverages.map((dept, idx) => (
                <div
                  key={dept.department}
                  className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center font-mono font-bold text-[11px] ${
                      idx === 0 ? 'bg-amber-100 text-amber-800 font-extrabold' :
                      idx === 1 ? 'bg-slate-200 text-slate-800' :
                      idx === 2 ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {idx + 1}
                    </span>
                    <span className="font-semibold text-slate-900">{dept.department}</span>
                    <span className="text-slate-400 text-[11px]">({dept.count}명)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-blue-600 tabular-nums">
                      {dept.average.toFixed(2)}점
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white border border-slate-200 font-medium text-slate-600">
                      {getGradeLabel(dept.average).label.split('(')[0]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sync Current User to Company Button */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">내 평가 결과를 전사 현황에 반영:</span>
            <button
              type="button"
              onClick={onSyncCurrentToCompany}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-xs"
            >
              내 진단결과 전사 등록
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Section: All Employees Directory Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        
        {/* Filter & Search Bar */}
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-50/50">
          <div>
            <h3 className="text-sm font-bold text-slate-900">전사 임직원 AI 역량 상세 명부</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              임직원별 7대 역량 진단 결과 및 상급자 평가 상태를 실시간 확인하세요.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="이름, 사번, 부서 검색..."
                className="pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 w-44"
              />
            </div>

            {/* Department Select Filter */}
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="text-xs bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 font-medium focus:outline-none"
            >
              <option value="ALL">전체 부서</option>
              {departments.filter(d => d !== 'ALL').map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>

            {/* Grade Level Filter */}
            <select
              value={selectedGradeFilter}
              onChange={(e) => setSelectedGradeFilter(e.target.value)}
              className="text-xs bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 font-medium focus:outline-none"
            >
              <option value="ALL">전체 그레이드</option>
              <option value="5">LV.5 선도 (Champion)</option>
              <option value="4">LV.4 고급 (Advanced)</option>
              <option value="3">LV.3 중급 (Practitioner)</option>
              <option value="2">LV.2 초급 (Beginner)</option>
              <option value="1">LV.1 입문 (Novice)</option>
            </select>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50">
                <th className="py-3 px-4 whitespace-nowrap">임직원 / 사번</th>
                <th className="py-3 px-4 whitespace-nowrap">부서 / 직급</th>
                <th className="py-3 px-4 whitespace-nowrap">현재 종합 역량</th>
                <th className="py-3 px-4 whitespace-nowrap">목표 역량 (갭)</th>
                <th className="py-3 px-4 whitespace-nowrap">역량 등급</th>
                <th className="py-3 px-4 whitespace-nowrap">상급자 승인</th>
                <th className="py-3 px-4 text-right whitespace-nowrap">상세 진단서</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredEmployees.map((emp) => {
                const scoreResult = calculateScores(emp.scores);
                const grade = getGradeLabel(scoreResult.overallCurrentAvg);
                const isChampion = scoreResult.overallCurrentAvg >= 4.0;

                return (
                  <tr key={emp.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Employee Info */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-xs">
                          {emp.name.charAt(0)}
                        </div>
                        <div>
                          <span className="font-bold text-slate-900 block">{emp.name}</span>
                          <span className="font-mono text-[11px] text-slate-400">{emp.employeeNo}</span>
                        </div>
                      </div>
                    </td>

                    {/* Department & Position */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="font-semibold text-slate-800 block">{emp.department}</span>
                      <span className="text-slate-500 text-[11px]">{emp.position}</span>
                    </td>

                    {/* Current Score */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-bold text-blue-600 tabular-nums">
                          {scoreResult.overallCurrentAvg.toFixed(2)}
                        </span>
                        <span className="text-slate-400 text-[11px]">/ 5.0</span>
                      </div>
                    </td>

                    {/* Target Score & Gap */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 font-mono text-[11px]">
                        <span className="text-violet-700 font-bold">{scoreResult.overallTargetAvg.toFixed(2)}점</span>
                        <span className="text-slate-400">(+{scoreResult.overallGap.toFixed(2)})</span>
                      </div>
                    </td>

                    {/* Grade Level Badge */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${grade.badgeClass}`}>
                        {grade.label}
                      </span>
                    </td>

                    {/* Supervisor Review Status */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 text-[11px] font-semibold ${
                        emp.supervisorReview.approvalStatus === 'approved'
                          ? 'text-emerald-700'
                          : 'text-amber-700'
                      }`}>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {emp.supervisorReview.approvalStatus === 'approved' ? '승인 완료' : '검토 중'}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => setInspectingEmployee(emp)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>진단서 열람</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>

      {/* Inspect Employee Modal Dialog */}
      {inspectingEmployee && (() => {
        const inspScores = calculateScores(inspectingEmployee.scores);
        const grade = getGradeLabel(inspScores.overallCurrentAvg);

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6">
              
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm">
                    {inspectingEmployee.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-slate-900">{inspectingEmployee.name}</h3>
                      <span className="font-mono text-xs text-slate-400">{inspectingEmployee.employeeNo}</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold border ${grade.badgeClass}`}>
                        {grade.label}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      {inspectingEmployee.department} · {inspectingEmployee.position} · 평가일: {inspectingEmployee.evalDate}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setInspectingEmployee(null)}
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body: Radar Chart + 7 Skills Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 items-center">
                <div>
                  <h4 className="text-xs font-bold text-slate-700 text-center mb-2">
                    {inspectingEmployee.name} 님의 7대 AI 역량 레이더 차트
                  </h4>
                  <RadarChart
                    categoryScores={inspScores.categoryScores}
                    companyAverages={companyStats.categoryAverages}
                    size={380}
                  />
                </div>

                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold text-slate-700 mb-2">역량별 점수 현황</h4>
                  {inspScores.categoryScores.map(cat => (
                    <div key={cat.categoryId} className="p-2.5 rounded bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
                      <span className="font-semibold text-slate-800">{cat.categoryName}</span>
                      <div className="flex items-center gap-2 font-mono tabular-nums">
                        <span className="text-blue-600 font-bold">현재 {cat.currentAvg.toFixed(1)}</span>
                        <span className="text-slate-300">/</span>
                        <span className="text-violet-600 font-bold">목표 {cat.targetAvg.toFixed(1)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Supervisor Feedback Snippet */}
              <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <span className="font-bold text-slate-900 block">
                  상급자 ({inspectingEmployee.supervisorReview.supervisorName} {inspectingEmployee.supervisorReview.supervisorTitle}) 총평:
                </span>
                <p className="text-slate-700 leading-relaxed italic">
                  "{inspectingEmployee.supervisorReview.overallComment}"
                </p>
                <div className="pt-2 text-slate-500 flex items-center justify-between text-[11px]">
                  <span>승인 상태: {inspectingEmployee.supervisorReview.approvalStatus === 'approved' ? '최종 승인 완료' : '검토 중'}</span>
                  <span>평가일: {inspectingEmployee.supervisorReview.reviewDate}</span>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="mt-6 pt-4 border-t border-slate-200 flex justify-end">
                <button
                  type="button"
                  onClick={() => setInspectingEmployee(null)}
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors"
                >
                  닫기
                </button>
              </div>

            </div>
          </div>
        );
      })()}

    </div>
  );
};
