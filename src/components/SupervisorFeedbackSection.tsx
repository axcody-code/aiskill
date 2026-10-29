import React from 'react';
import { SupervisorReview } from '../types/aiSkills';
import { UserCheck, ShieldCheck, Star, Save, CheckCircle } from 'lucide-react';

interface SupervisorFeedbackSectionProps {
  supervisorReview: SupervisorReview;
  onChangeReview: (field: keyof SupervisorReview, value: string | number) => void;
  onSaveFeedback: () => void;
  isSaved?: boolean;
}

export const SupervisorFeedbackSection: React.FC<SupervisorFeedbackSectionProps> = ({
  supervisorReview,
  onChangeReview,
  onSaveFeedback,
  isSaved = false,
}) => {
  return (
    <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-emerald-600" />
            <span>상급자 종합 평가 및 서술형 피드백 (Supervisor Review)</span>
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            담당 조직장 및 상급자가 해당 임직원의 AI 역량 수준, 실무 기여도, 보완점을 서술형으로 피드백하고 승인합니다.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onSaveFeedback}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-xs"
          >
            {isSaved ? <CheckCircle className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
            <span>{isSaved ? '피드백 저장 완료' : '상급자 평가 저장'}</span>
          </button>
        </div>
      </div>

      {/* Supervisor Meta Input Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-5 p-4 rounded-lg bg-slate-50 border border-slate-200/80 text-xs">
        <div>
          <label className="block text-slate-500 font-semibold mb-1">상급자 성명</label>
          <input
            type="text"
            value={supervisorReview.supervisorName}
            onChange={(e) => onChangeReview('supervisorName', e.target.value)}
            className="w-full bg-white px-2.5 py-1.5 rounded border border-slate-300 font-medium text-slate-800"
            placeholder="상급자 성명 입력"
          />
        </div>

        <div>
          <label className="block text-slate-500 font-semibold mb-1">상급자 직책 / 직급</label>
          <input
            type="text"
            value={supervisorReview.supervisorTitle}
            onChange={(e) => onChangeReview('supervisorTitle', e.target.value)}
            className="w-full bg-white px-2.5 py-1.5 rounded border border-slate-300 font-medium text-slate-800"
            placeholder="예: 팀장 / 부서장"
          />
        </div>

        <div>
          <label className="block text-slate-500 font-semibold mb-1">소속 부서</label>
          <input
            type="text"
            value={supervisorReview.supervisorDepartment}
            onChange={(e) => onChangeReview('supervisorDepartment', e.target.value)}
            className="w-full bg-white px-2.5 py-1.5 rounded border border-slate-300 font-medium text-slate-800"
            placeholder="예: 경영전략본부"
          />
        </div>

        <div>
          <label className="block text-slate-500 font-semibold mb-1">평가 승인 상태</label>
          <select
            value={supervisorReview.approvalStatus}
            onChange={(e) => onChangeReview('approvalStatus', e.target.value as any)}
            className="w-full bg-white px-2.5 py-1.5 rounded border border-slate-300 font-semibold text-slate-800"
          >
            <option value="draft">작성 중 (Draft)</option>
            <option value="under_review">검토 중 (Under Review)</option>
            <option value="approved">최종 승인 완료 (Approved)</option>
          </select>
        </div>
      </div>

      {/* Narrative Review Fields */}
      <div className="mt-5 space-y-4">
        
        {/* Overall Evaluation */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Star className="w-4 h-4 text-amber-500" />
              <span>1. 상급자 종합 총평 (Overall Evaluation)</span>
            </label>
            <span className="text-[11px] text-slate-400">조직 차원의 AI 실무 활용도 및 기여도 종합 소견</span>
          </div>
          <textarea
            rows={3}
            value={supervisorReview.overallComment}
            onChange={(e) => onChangeReview('overallComment', e.target.value)}
            placeholder="예: 기획 업무 전반에 걸쳐 생성형 AI를 매우 적극적이고 비판적인 시각으로 검증하며 모범적으로 적용하고 있습니다. 사내 표준화에 기여하고 있습니다."
            className="w-full text-xs p-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-slate-800 leading-relaxed"
          />
        </div>

        {/* Strengths & Contributions */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>2. 핵심 강점 및 사내 기여도 코멘트 (Key Strengths & Contribution)</span>
            </label>
            <span className="text-[11px] text-slate-400">부서 내 인정받는 뛰어난 스킬 및 모범 사례</span>
          </div>
          <textarea
            rows={3}
            value={supervisorReview.strengthsComment}
            onChange={(e) => onChangeReview('strengthsComment', e.target.value)}
            placeholder="예: 복합 프롬프트 작성을 통해 기획서의 논리 전개를 탄탄하게 구성하고, 사내 데이터 보안 가이드라인을 철저히 준수하는 점이 인상적입니다."
            className="w-full text-xs p-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-slate-800 leading-relaxed"
          />
        </div>

        {/* Coaching & Development Guidance */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-blue-600" />
              <span>3. 향후 역량 개발 권고사항 및 코칭 (Coaching & Recommendations)</span>
            </label>
            <span className="text-[11px] text-slate-400">목표 달성을 위해 보완해야 할 교육 수강 및 직무 실습 가이드</span>
          </div>
          <textarea
            rows={3}
            value={supervisorReview.coachingComment}
            onChange={(e) => onChangeReview('coachingComment', e.target.value)}
            placeholder="예: 3분기 노코드 자동화 파이프라인 과정을 이수하여 정기 경영 지표 보고서 수집 과정을 자동화한다면 조직 전반에 매우 큰 시너지를 낼 수 있을 것입니다."
            className="w-full text-xs p-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-slate-800 leading-relaxed"
          />
        </div>

      </div>

      {/* Review Confirmation Stamp / Footer */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-700">최종 평가일:</span>
          <span className="font-mono">{supervisorReview.reviewDate || '2026. 10. 28'}</span>
          <span className="text-slate-300">|</span>
          <span className="font-semibold text-slate-700">평가자:</span>
          <span>{supervisorReview.supervisorName} ({supervisorReview.supervisorTitle})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded font-semibold text-xs border bg-emerald-50 text-emerald-800 border-emerald-200">
            {supervisorReview.approvalStatus === 'approved' ? '✓ 상급자 서명 승인 완료' : '상급자 서명 대기/검토 중'}
          </span>
        </div>
      </div>
    </section>
  );
};
