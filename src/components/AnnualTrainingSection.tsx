import React, { useState } from 'react';
import { ANNUAL_TRAINING_COURSES } from '../data/skillsData';
import { Calendar, Clock, MapPin, Check, Plus, Filter } from 'lucide-react';

interface AnnualTrainingSectionProps {
  selectedCourseIds: string[];
  onToggleCourse: (courseId: string) => void;
}

export const AnnualTrainingSection: React.FC<AnnualTrainingSectionProps> = ({
  selectedCourseIds,
  onToggleCourse,
}) => {
  const [activeQuarter, setActiveQuarter] = useState<string>('ALL');

  const filteredCourses = activeQuarter === 'ALL'
    ? ANNUAL_TRAINING_COURSES
    : ANNUAL_TRAINING_COURSES.filter(c => c.quarter === activeQuarter);

  const quarters = ['ALL', 'Q1', 'Q2', 'Q3', 'Q4'];

  return (
    <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-600" />
            <span>2026년도 사내 AI 역량 강화 연간 교육 수강 일정</span>
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            진단 결과 부족한 영역을 보완할 수 있도록 분기별 추천 교육 과정을 확인하고 희망 과정을 신청하세요.
          </p>
        </div>

        {/* Quarter Filter Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg shrink-0">
          <Filter className="w-3.5 h-3.5 text-slate-400 ml-1.5 mr-0.5" />
          {quarters.map(q => (
            <button
              key={q}
              type="button"
              onClick={() => setActiveQuarter(q)}
              className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                activeQuarter === q
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {q === 'ALL' ? '전체 일정' : `${q} 분기`}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Courses Summary Badge Bar */}
      <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-700">본인 수강 신청 내역:</span>
          <span className="font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
            총 {selectedCourseIds.length}개 과정 선택됨
          </span>
        </div>
        <span className="text-slate-500 text-[11px]">
          * 연간 최소 2개 이상 과정(16시간 이상) 이수가 인사 평가 권장 기준입니다.
        </span>
      </div>

      {/* Training Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
        {filteredCourses.map(course => {
          const isSelected = selectedCourseIds.includes(course.id);

          return (
            <div
              key={course.id}
              className={`p-4 rounded-xl border transition-all ${
                isSelected
                  ? 'border-indigo-400 bg-indigo-50/20 shadow-xs'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-[11px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                      {course.quarter}
                    </span>
                    <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                      {course.category}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      대상: {course.targetLevel}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 leading-snug">
                    {course.title}
                  </h4>
                </div>

                {/* Apply/Enroll Button */}
                <button
                  type="button"
                  onClick={() => onToggleCourse(course.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>신청 완료</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>수강 신청</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {course.summary}
              </p>

              {/* Course Meta Info */}
              <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px] text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{course.schedule}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{course.duration} ({course.format})</span>
                </div>
              </div>

              {/* Curriculum bullets */}
              <div className="mt-2 text-[11px] text-slate-500">
                <span className="font-semibold text-slate-700">주요 커리큘럼: </span>
                <span>{course.curriculum.join(' · ')}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
