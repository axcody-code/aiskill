export interface SkillSubItem {
  id: string;
  code: string;
  title: string;
  description: string;
  practicalExample: string;
  evaluationFocus: string;
}

export interface SkillCategory {
  id: string;
  index: number;
  code: string;
  name: string;
  englishName: string;
  summary: string;
  icon: string;
  items: SkillSubItem[];
}

export interface GradeDefinition {
  level: 1 | 2 | 3 | 4 | 5;
  levelCode: string;
  nameKo: string;
  nameEn: string;
  summary: string;
  behaviorIndicators: string[];
  expectedImpact: string;
  badgeColor: string;
}

export interface SkillScore {
  current: number; // 1 to 5
  target: number;  // 1 to 5
  memo?: string;
}

export interface PersonalPlan {
  strengthsReflection: string;
  weaknessesPlan: string;
  personalGoalStatement: string;
  selectedCourseIds: string[];
}

export interface SupervisorReview {
  supervisorName: string;
  supervisorTitle: string;
  supervisorDepartment: string;
  reviewDate: string;
  overallRating: number;
  overallComment: string;
  strengthsComment: string;
  coachingComment: string;
  approvalStatus: 'draft' | 'under_review' | 'approved';
}

export interface EmployeeProfile {
  id: string;
  name: string;
  employeeNo: string;
  department: string;
  position: string;
  email: string;
  evalDate: string;
  scores: Record<string, SkillScore>; // key is sub-item id
  personalPlan: PersonalPlan;
  supervisorReview: SupervisorReview;
}

export interface TrainingCourse {
  id: string;
  quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4';
  title: string;
  category: string;
  targetLevel: string;
  duration: string;
  schedule: string;
  instructor: string;
  format: '오프라인 실습' | '온라인 라이브' | '사내 워크숍' | '해커톤';
  summary: string;
  curriculum: string[];
}
