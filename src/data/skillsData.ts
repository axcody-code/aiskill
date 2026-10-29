import { SkillCategory, GradeDefinition, TrainingCourse, EmployeeProfile } from '../types/aiSkills';

export const AI_SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'skill-prompt',
    index: 1,
    code: 'SKILL-01',
    name: '프롬프트 엔지니어링 & 대화형 상호작용',
    englishName: 'Prompt Engineering & Conversational Interaction',
    summary: '원하는 비즈니스 결과를 도출하기 위해 AI 모델의 컨텍스트를 정밀하게 설계하고 피드백을 통해 답을 고도화하는 역량',
    icon: 'MessageSquareText',
    items: [
      {
        id: 'prompt-1',
        code: 'P-01',
        title: '복합 컨텍스트 및 시스템 프롬프팅',
        description: 'AI에게 명확한 역할(Persona), 구체적 배경 맥락, 제약 조건, Few-shot(예시 제시) 및 CoT(사고의 사슬) 기법을 적용하여 질의를 정밀하게 구조화하는 능력입니다.',
        practicalExample: '예: "귀하는 10년 차 B2B 마케팅 디렉터입니다. 예산 5천만원 기준 신제품 런칭 플랜을 단계별 고려사항과 함께 제안해주세요."',
        evaluationFocus: '단순 일회성 질문에 그치지 않고 역할, 목적, 제약 조건을 체계적으로 정의하는가'
      },
      {
        id: 'prompt-2',
        code: 'P-02',
        title: '구조화된 산출물 정밀 제어',
        description: 'AI가 반환하는 결과물을 마크다운 표, JSON 데이터 포맷, 이메일 양식, 결재 보고서 템플릿 등 사내 표준 업무 규격에 맞춰 정밀하게 통제하고 생성시키는 능력입니다.',
        practicalExample: '예: "결과를 사내 주간업무보고 규격(목적/진척/차주계획/리스크) 마크다운 표 형식으로 추출하고 분량은 500자 이내로 제한"',
        evaluationFocus: '원하는 비즈니스 출력 규격과 분량, 톤앤매너를 일관되게 유도할 수 있는가'
      },
      {
        id: 'prompt-3',
        code: 'P-03',
        title: '반복적 피드백 & 할루시네이션 교정',
        description: 'AI 결과물의 사실 여부를 비판적으로 검증하고, 후속 질문(Follow-up Prompt)을 통해 환각 오류를 교정하며 답변의 논리적 완결성을 점진적으로 높이는 능력입니다.',
        practicalExample: '예: "3단계 제안에서 법적 근거가 모호합니다. 최신 근로기준법 판례를 반영하여 재작성하고 출처 근거를 병기해주세요."',
        evaluationFocus: 'AI의 잘못된 답변을 맹신하지 않고 비판적 검증과 지속적 피드백으로 완성도를 높이는가'
      }
    ]
  },
  {
    id: 'skill-automation',
    index: 2,
    code: 'SKILL-02',
    name: '업무 자동화 & 워크플로우 최적화',
    englishName: 'AI Automation & Workflow Optimization',
    summary: '반복 루틴 업무를 AI와 노코드/로우코드 도구와 결합하여 전사적 업무 생산성을 비약적으로 향상시키는 역량',
    icon: 'Workflow',
    items: [
      {
        id: 'auto-1',
        code: 'A-01',
        title: '일상 반복 업무 AI 자동화',
        description: '긴 회의 음성 녹음의 핵심 액션 아이템 추출, 대량의 이메일 분류 및 답변 초안 작성, 캘린더 일정 연계 등 매일 반복되는 잡무를 AI로 자동 처리하는 능력입니다.',
        practicalExample: '예: 1시간 회의 녹음 파일을 업로드해 3분 만에 부서별 R&R과 완료기한이 정리된 회의록 초안 생성',
        evaluationFocus: '개인의 일상적 시간 소모 업무를 능동적으로 파악해 AI로 시간 단축을 이루어내는가'
      },
      {
        id: 'auto-2',
        code: 'A-02',
        title: '노코드/로우코드 AI 툴체인 연계',
        description: 'Zapier, Make, n8n 등의 연동 플랫폼 또는 구글 스프레드시트/엑셀 AI 플러그인을 활용하여 다양한 업무 소프트웨어 간 데이터 파이프라인을 구축하는 능력입니다.',
        practicalExample: '예: 구글 폼으로 고객 문의가 접수되면 AI가 문의 유형을 감지해 슬랙 담당자 채널에 요약 알림 전송',
        evaluationFocus: '별도의 복잡한 코딩 없이 사내 기존 협업 도구와 AI API를 유기적으로 연결하는가'
      },
      {
        id: 'auto-3',
        code: 'A-03',
        title: '엔드투엔드 부서 프로세스 혁신',
        description: '개인 차원을 넘어 부서 전체의 업무 프로세스를 분석하고, 데이터 수집-가공-검토-보고로 이어지는 전 과정을 AI 결합 표준 워크플로우로 재설계하는 능력입니다.',
        practicalExample: '예: 매월 3일 걸리던 정기 경쟁사 동향 보고서 작성을 웹스크래핑+AI 요약 파이프라인으로 반나절 만에 완료',
        evaluationFocus: '팀/부서 단위의 고비용 업무를 발견하고 엔드투엔드 자동화 아키텍처를 수립할 수 있는가'
      }
    ]
  },
  {
    id: 'skill-data',
    index: 3,
    code: 'SKILL-03',
    name: '데이터 분석 & 비즈니스 인사이트',
    englishName: 'AI Data Analysis & Business Intelligence',
    summary: '정형·비정형 사내 데이터를 AI를 통해 신속하게 분석하고 의사결정에 직결되는 시각화와 통찰을 도출하는 역량',
    icon: 'BarChart3',
    items: [
      {
        id: 'data-1',
        code: 'D-01',
        title: '정형/비정형 데이터 전처리 & EDA',
        description: '대용량 엑셀/CSV 데이터, 고객 피드백 텍스트, 설문조사 서술형 답변 등을 AI 고급 데이터 분석 기능을 통해 결측치 정제 및 이상치 탐색을 신속히 수행하는 능력입니다.',
        practicalExample: '예: 수천 건의 고객 CS 불만 텍스트 데이터를 AI에 업로드하여 불만 카테고리 자동 라벨링 및 감성 분석',
        evaluationFocus: '원시 데이터의 노이즈를 파악하고 AI를 통해 신속히 분석 가능한 데이터셋으로 정제하는가'
      },
      {
        id: 'data-2',
        code: 'D-02',
        title: '자연어 질의 기반 통계 분석 및 시각화',
        description: '복잡한 통계 수식이나 SQL 없이도 자연어로 데이터에 질문하여 피벗 테이블, 상관관계 분석, 트렌드 차트 등을 즉시 생성하고 검증하는 능력입니다.',
        practicalExample: '예: "지난 분기 지역별 매출과 마케팅 비용 간의 상관관계를 산점도로 그리고 유의미한 변곡점을 설명해줘"',
        evaluationFocus: '비즈니스 목적에 부합하는 통계 지표와 시각화 형태를 올바르게 선택하여 생성시키는가'
      },
      {
        id: 'data-3',
        code: 'D-03',
        title: '예측 시뮬레이션 & 비즈니스 의사결정 지원',
        description: '과거 실적 데이터와 시장 가정을 결합하여 향후 KPI 시나리오(Best/Worst case)를 모델링하고 경영진 보고를 위한 전략적 시사점을 도출하는 능력입니다.',
        practicalExample: '예: 환율 변동 및 원자재 인상 시나리오별 영업이익 마진 변동을 시뮬레이션하고 방어 전략 제안서 작성',
        evaluationFocus: '단순 데이터 집계를 넘어 경영/실무 의사결정에 기여할 수 있는 통찰력 있는 전략을 이끌어내는가'
      }
    ]
  },
  {
    id: 'skill-multimedia',
    index: 4,
    code: 'SKILL-04',
    name: '멀티미디어 & 비즈니스 콘텐츠 생성',
    englishName: 'Multimedia & Business Content Creation',
    summary: '기획서, 제안서, 그래픽, 인포그래픽, 멀티모달 프레젠테이션 등 사내외 커뮤니케이션 자산을 AI로 고품질 제작하는 역량',
    icon: 'Sparkles',
    items: [
      {
        id: 'multi-1',
        code: 'M-01',
        title: '고품질 비즈니스 문서 & 제안서 작성',
        description: '고객 제안서, 신규 사업 기획안, 보도자료, 경영진 보고용 원페이저 등을 목적과 타깃 오디언스에 맞춰 논리적이고 설득력 있는 문장으로 완성하는 능력입니다.',
        practicalExample: '예: 신규 클라우드 보안 솔루션 도입 제안서의 경영진 요약(Executive Summary) 및 도입 기대효과 작성',
        evaluationFocus: '문서의 논리적 전개(MECE), 비즈니스 어휘 선택, 가독성 높은 헤드라인 구성을 제어하는가'
      },
      {
        id: 'multi-2',
        code: 'M-02',
        title: '시각 자료 및 생성형 그래픽 리소스 제작',
        description: '사내 발표 자료, 마케팅 캠페인, 교육 자료에 삽입될 인포그래픽 콘셉트, 비주얼 다이어그램, 일러스트레이션을 이미지 생성 AI로 효과적으로 연출하는 능력입니다.',
        practicalExample: '예: 2026 비전 발표를 위한 테크놀로지 생태계 콘셉트 아트 및 데이터 파이프라인 인포그래픽 제작',
        evaluationFocus: '원하는 비주얼 무드, 구도, 브랜드 톤에 맞는 고해상도 그래픽 에셋을 프롬프트로 유도하는가'
      },
      {
        id: 'multi-3',
        code: 'M-03',
        title: '멀티모달 프레젠테이션 & 미디어 변환',
        description: '텍스트 기획안을 슬라이드 덱으로 자동 변환하거나, 보고서를 오디오 팟캐스트/영상 스크립트로 재가공하여 사내외 다양한 채널에 맞게 포맷을 변환하는 능력입니다.',
        practicalExample: '예: 20페이지 연구 보고서를 임원 보고용 5장 슬라이드 구조 및 스피치 대본으로 즉시 재구성',
        evaluationFocus: '텍스트-음성-영상-슬라이드 등 다양한 미디어 포맷 간 자유로운 상호 변환 및 재가공이 가능한가'
      }
    ]
  },
  {
    id: 'skill-ethics',
    index: 5,
    code: 'SKILL-05',
    name: 'AI 윤리, 거버넌스 & 데이터 보안',
    englishName: 'AI Ethics, Governance & Data Security',
    summary: '사내 정보 자산과 고객 개인정보를 보호하고, 법적 리스크와 편향을 방지하며 신뢰할 수 있는 방식으로 AI를 운영하는 역량',
    icon: 'ShieldCheck',
    items: [
      {
        id: 'ethics-1',
        code: 'S-01',
        title: '기업 기밀 및 개인정보(PII) 유출 방지',
        description: '고객 식별 정보(PII), 영업비밀, 재무 미공개 정보, 사내 소스코드 등이 외부 상용 AI 모델의 학습 데이터로 유입되지 않도록 데이터 마스킹 및 보안 규정을 준수하는 능력입니다.',
        practicalExample: '예: 고객 클레임 분석 전 주민등록번호, 연락처, 사내 내부 IP 주소를 정규식/스크립트로 마스킹 처리',
        evaluationFocus: '프롬프트 입력 전 민감정보를 사전에 인지하고 사내 AI 보안 가이드라인을 철저히 준수하는가'
      },
      {
        id: 'ethics-2',
        code: 'S-02',
        title: '저작권, 라이선스 & 진위성 검토',
        description: 'AI가 생성한 텍스트, 코드, 이미지의 지식재산권(IP) 침해 가능성을 점검하고, 출처 인용 및 라이선스 적합성을 확인하여 법적 분쟁 리스크를 사전에 예방하는 능력입니다.',
        practicalExample: '예: AI가 작성한 오픈소스 코드를 사내 제품에 통합하기 전 상업적 이용 라이선스(Apache, MIT 등) 검토',
        evaluationFocus: '외부 배포용 콘텐츠 제작 시 저작권 및 상표권 침해 소지를 점검하고 투명성을 확보하는가'
      },
      {
        id: 'ethics-3',
        code: 'S-03',
        title: 'AI 편향성 완화 및 책임 있는 활용',
        description: '인종, 성별, 연령, 문화적 편향이 포함될 수 있는 AI 결과물을 선별하고, 조직 내 다양성과 공정성을 해치지 않도록 윤리적 기준에 따라 필터링하는 능력입니다.',
        practicalExample: '예: 채용 공고 또는 인사 평가 가이드 작성 시 특정 성별이나 연령에 편향된 표현을 점검하고 중립화',
        evaluationFocus: '사회적·윤리적 파급효과를 고려하여 책임 있는 방식으로 AI를 조직 내에서 전파하는가'
      }
    ]
  },
  {
    id: 'skill-tools',
    index: 6,
    code: 'SKILL-06',
    name: '최신 AI 도구 탐색 & 직무 솔루션 접목',
    englishName: 'Tool Fluency & Domain Adaptation',
    summary: '급변하는 AI 최신 생태계를 지속 모니터링하고 직무별 최적의 AI 전문 솔루션을 발굴하여 실제 업무에 선제 도입하는 역량',
    icon: 'Compass',
    items: [
      {
        id: 'tools-1',
        code: 'T-01',
        title: '최신 AI 모델 생태계 트렌드 탐색',
        description: 'GPT, Claude, Gemini, DeepSeek, 오픈소스 LLM 등 최신 파운데이션 모델의 벤치마크, 가격, 강점 영역을 기민하게 파악하고 팀원들에게 정보를 공유하는 능력입니다.',
        practicalExample: '예: 장문 문서 분석 시 컨텍스트 윈도우가 긴 모델을 선택하고, 복잡한 코딩 시 추론 특화 모델을 구별 활용',
        evaluationFocus: '단일 모델에 머무르지 않고 시장의 주요 신규 모델 특성을 실무 목적에 맞게 비교 선택하는가'
      },
      {
        id: 'tools-2',
        code: 'T-02',
        title: '직무 특화 전문 AI 솔루션 적용',
        description: '개발(GitHub Copilot, Cursor), 마케팅/SEO(Semrush AI), 회계/법무(Harvey, Tax AI) 등 본인 직무 도메인에 특화된 버티컬 AI 툴을 능숙하게 도입해 생산성을 극대화하는 능력입니다.',
        practicalExample: '예: 디자이너가 미드저니/파이어플라이를 통해 시안 작업 기간을 기존 5일에서 1일로 단축',
        evaluationFocus: '범용 챗봇을 넘어 본인 담당 실무 영역의 전문 버티컬 AI 도구를 현업에 적용하는가'
      },
      {
        id: 'tools-3',
        code: 'T-03',
        title: '최적 AI 툴체인 조합 및 비용/효율 분석',
        description: '다양한 AI 솔루션의 구독 비용, 팀 계정 관리, API 호출 단가, 사용 편의성을 종합 분석하여 부서 예산 내에서 최적의 ROI를 달성하는 도구 조합을 구성하는 능력입니다.',
        practicalExample: '예: 전 부서 라이선스 구매 전 팀별 사용 빈도와 기능을 PoC(개념검증)하여 비용 대비 효과 분석 보고',
        evaluationFocus: '도구 도입 시 라이선스 비용과 실질적 업무 효율 개선치 간의 경제성을 합리적으로 판단하는가'
      }
    ]
  },
  {
    id: 'skill-agents',
    index: 7,
    code: 'SKILL-07',
    name: 'AI 에이전트 설계 및 시스템 협업',
    englishName: 'AI Agent & Multi-Agent Collaboration',
    summary: '목표 지향적 자율 에이전트와 사내 지식 기반(RAG)을 연결하여 복잡한 비즈니스 문제를 스스로 해결하는 미래형 시스템을 설계하는 역량',
    icon: 'Bot',
    items: [
      {
        id: 'agent-1',
        code: 'G-01',
        title: '단일 자율 에이전트 태스크 위임',
        description: '목표를 부여하면 스스로 단계별 실행 계획(Plan)을 세우고 웹 검색, 사내 API 호출, 문서 작성을 자율적으로 수행하여 완결된 결과를 내놓는 에이전트를 구성·활용하는 능력입니다.',
        practicalExample: '예: "신규 배터리 소재 특허 10건을 검색하여 요약하고 경쟁사별 특허 맵을 작성해줘"라는 명령을 원스톱 수행',
        evaluationFocus: '단순 질문-응답을 넘어 AI에게 문제 해결의 목표와 가드레일을 부여하고 자율 수행을 위임하는가'
      },
      {
        id: 'agent-2',
        code: 'G-02',
        title: '멀티 에이전트 협업 체계 기획',
        description: '조사원, 작성자, 비판적 검토자(Critic), 디자이너 등 다수의 전문 에이전트가 상호 소통하며 결과물을 완성해 나가는 협업 오케스트레이션 워크플로우를 기획하는 능력입니다.',
        practicalExample: '예: 에이전트 A가 시장 조사 -> 에이전트 B가 전략 초안 작성 -> 에이전트 C가 리스크 검증 및 수정 반복',
        evaluationFocus: '복잡한 비즈니스 문제를 세부 역할로 분해하고 에이전트 간 핸드오프(인수인계) 체계를 설계하는가'
      },
      {
        id: 'agent-3',
        code: 'G-03',
        title: '사내 지식기반(RAG) 챗봇 및 허브 기획',
        description: '사내 규정집, 제품 매뉴얼, 과거 프로젝트 보고서 등 조직의 축적된 지식베이스를 벡터 DB 및 AI에 연결하여 임직원 누구나 정확한 사내 정보를 즉각 조회하는 시스템을 기획하는 능력입니다.',
        practicalExample: '예: 인사/총무 사규 500페이지를 RAG로 학습시켜 휴가 규정, 경조사비 신청을 즉답해주는 사내 헬프데스크 봇 기획',
        evaluationFocus: '조직의 비정형 자산을 AI가 정확히 인출할 수 있도록 데이터 구조화 및 RAG 아키텍처를 구상하는가'
      }
    ]
  }
];

export const GRADE_DEFINITIONS: GradeDefinition[] = [
  {
    level: 1,
    levelCode: 'LV.1',
    nameKo: '입문 (Awareness / Novice)',
    nameEn: 'Novice',
    summary: '기초 개념 인지 및 호기심 단계: 비정기적 단순 질의응답 수준',
    behaviorIndicators: [
      '생성형 AI의 기본 명칭과 작동 원리를 어렴풋이 이해하고 있음',
      '단순 정보 검색이나 호기심 위주의 단발성 질문을 비정기적으로 입력함',
      '결과물의 정밀도나 사실 여부를 체계적으로 판별하지 못하고 그대로 수용하는 경향이 있음',
      '사내 보안 규정이나 민감정보 입력 위험성에 대한 인식이 기초 수준임'
    ],
    expectedImpact: '개인적 호기심 해소 수준 (업무 생산성 향상률 < 5%)',
    badgeColor: 'bg-slate-100 text-slate-700 border-slate-300'
  },
  {
    level: 2,
    levelCode: 'LV.2',
    nameKo: '초급 (Basic / Beginner)',
    nameEn: 'Beginner',
    summary: '표준 템플릿 기반 실무 보조 단계: 문서 요약 및 기초 자료 수집 활용',
    behaviorIndicators: [
      '사내 배포 프롬프트 템플릿이나 모범 사례를 활용하여 기본 질문을 수행함',
      '긴 문서나 이메일의 핵심 요약, 외국어 번역, 오탈자 교정 등 단순 보조에 활용함',
      '반환된 결과물의 환각(할루시네이션) 가능성을 인지하고 수동으로 대조 검토함',
      '개인정보 및 사내 기밀 유출 금지 기본 보안 수칙을 준수함'
    ],
    expectedImpact: '단순 반복 업무 시간 단축 (개인 생산성 향상률 10~15%)',
    badgeColor: 'bg-sky-50 text-sky-700 border-sky-300'
  },
  {
    level: 3,
    levelCode: 'LV.3',
    nameKo: '중급 (Competent / Practitioner)',
    nameEn: 'Practitioner',
    summary: '실무 자율 적용 단계: 복합 프롬프트 구사 및 업무 프로세스 주도적 결합',
    behaviorIndicators: [
      '역할 지정, Few-shot, 제약조건 등을 결합한 정밀 프롬프트를 자율적으로 작성함',
      '기획서 초안, 데이터 시각화 차트, 프레젠테이션 골격을 능동적으로 AI로 생성 및 가공함',
      '원하는 출력 포맷(표, JSON, 보고서 서식)으로 산출물을 안정적으로 통제함',
      '업무 문제 발생 시 다양한 시각에서 후속 질의를 전개하며 해답을 점진적으로 도출함'
    ],
    expectedImpact: '주요 실무 과업 처리 속도 2배 향상 (개인 생산성 향상률 30~50%)',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-300'
  },
  {
    level: 4,
    levelCode: 'LV.4',
    nameKo: '고급 (Proficient / Advanced)',
    nameEn: 'Advanced',
    summary: '워크플로우 최적화 및 팀 코칭 단계: 노코드 툴 연계 및 사내 전파자',
    behaviorIndicators: [
      'Zapier, Make, AI API 등을 연동하여 부서 내 반복 업무 자동화 파이프라인을 직접 구축함',
      '부서 동료들에게 실무 맞춤형 프롬프트와 업무 노하우를 코칭하고 템플릿을 제작 공유함',
      '도메인에 특화된 버티컬 AI 툴을 적극 발굴하고 조직에 최적화된 조합을 제안함',
      '사내 AI 거버넌스 가이드라인을 철저히 준수하며 팀의 보안 리스크를 사전에 모니터링함'
    ],
    expectedImpact: '팀/부서 단위 업무 리드타임 40% 절감 및 동료 역량 동반 상승',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-300'
  },
  {
    level: 5,
    levelCode: 'LV.5',
    nameKo: '선도 (Master / AI Champion)',
    nameEn: 'AI Champion',
    summary: '사내 AI 혁신 선도 및 비즈니스 전환 단계: 전사 표준 수립 및 에이전트 도입 주도',
    behaviorIndicators: [
      '전사적 AI 표준 활용 가이드라인, 프롬프트 라이브러리 및 RAG 지식 아키텍처 수립을 주도함',
      '다중 자율 에이전트 협업 체계 및 신규 비즈니스 모델 발굴 프로젝트를 기획 및 완수함',
      '사내외 해커톤, AI 세미나 연사로 활동하며 조직의 디지털 전환(DX) 문화를 선도함',
      '최신 파운데이션 모델의 기술 변화를 기업의 미래 전략 및 신성장 동력으로 연결함'
    ],
    expectedImpact: '전사적 비즈니스 혁신 창출 및 미래 성장 동력 확보 주도',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-300'
  }
];

export const ANNUAL_TRAINING_COURSES: TrainingCourse[] = [
  {
    id: 'tr-01',
    quarter: 'Q1',
    title: '비즈니스 실무 프롬프트 엔지니어링 집중 마스터',
    category: '프롬프트 & 상호작용',
    targetLevel: 'LV.1 ~ LV.3',
    duration: '8시간 (1일 집중)',
    schedule: '2026. 02. 18 (수) 09:00 ~ 18:00',
    instructor: 'DX인재개발원 정진우 수석연구원',
    format: '오프라인 실습',
    summary: '기초 질의부터 페르소나 설정, Few-shot 예시 제시, CoT 다단계 추론까지 실전 비즈니스 보고서 작성 실습',
    curriculum: ['프롬프트 기본 원리와 환각(Hallucination) 방지', '비즈니스 문서 템플릿 맞춤 출력 기법', '실무 케이스 기반 프롬프트 리팩토링']
  },
  {
    id: 'tr-02',
    quarter: 'Q1',
    title: '기업 컴플라이언스 & 생성형 AI 보안 거버넌스',
    category: '윤리 & 보안',
    targetLevel: '전 임직원 필수',
    duration: '4시간 (반일)',
    schedule: '2026. 03. 25 (수) 13:30 ~ 17:30',
    instructor: '정보보안실 박상현 이사 & 법무법인 파트너 변호사',
    format: '온라인 라이브',
    summary: '개인정보(PII) 유출 방지 기법, 사내 데이터 마스킹 실무, 저작권 및 라이선스 분쟁 예방 원칙',
    curriculum: ['기업 기밀 정보 보호 가이드라인', 'AI 생성 산출물의 저작권과 특허 리스크', '사내 AI 활용 보안 서약 및 모니터링 체계']
  },
  {
    id: 'tr-03',
    quarter: 'Q2',
    title: 'AI 기반 데이터 분석 & 시각화 인사이트 도출',
    category: '데이터 분석',
    targetLevel: 'LV.2 ~ LV.4',
    duration: '16시간 (2일 과정)',
    schedule: '2026. 05. 13 (수) ~ 05. 14 (목)',
    instructor: '데이터사이언스팀 한유진 팀장',
    format: '오프라인 실습',
    summary: '자연어 질의로 대용량 엑셀/CSV 데이터 전처리, 다차원 피벗 분석, 동적 대시보드 차트 생성 실습',
    curriculum: ['원시 데이터 결측치 정제 및 이상치 탐색', '자연어로 구현하는 고급 통계 분석', '경영진 의사결정용 시뮬레이션 모델링']
  },
  {
    id: 'tr-04',
    quarter: 'Q2',
    title: '멀티모달 비즈니스 프레젠테이션 & 미디어 제작',
    category: '콘텐츠 생성',
    targetLevel: 'LV.2 ~ LV.4',
    duration: '8시간 (1일 과정)',
    schedule: '2026. 06. 17 (수) 09:00 ~ 18:00',
    instructor: '크리에이티브랩 송민경 디렉터',
    format: '사내 워크숍',
    summary: '원페이저 기획안에서 고품질 슬라이드 덱으로의 자동 변환, 비즈니스 인포그래픽 및 발표 스피치 스크립트 제작',
    curriculum: ['설득력 있는 비즈니스 스토리라인 구성', '생성형 이미지 AI를 활용한 비주얼 에셋 제작', '슬라이드 자동화 툴과 멀티모달 결합']
  },
  {
    id: 'tr-05',
    quarter: 'Q3',
    title: '노코드 AI 워크플로우 & 업무 자동화 파이프라인',
    category: '자동화 & 최적화',
    targetLevel: 'LV.3 ~ LV.5',
    duration: '16시간 (2일 과정)',
    schedule: '2026. 08. 19 (수) ~ 08. 20 (목)',
    instructor: '자동화혁신TFT 최성원 팀장',
    format: '오프라인 실습',
    summary: 'Make, n8n, Zapier를 활용해 슬랙-스프레드시트-이메일-AI를 연동하는 부서 단위 엔드투엔드 파이프라인 구축',
    curriculum: ['노코드 툴 기초 및 웹훅(Webhook) 연계', 'AI 자동 분류 및 사내 결재 알림 시스템 구현', '실제 부서 과제 파이프라인 직접 구축 프로젝트']
  },
  {
    id: 'tr-06',
    quarter: 'Q3',
    title: '직무별 버티컬 AI 솔루션 벤치마킹 & 도입 실무',
    category: '도구 탐색 & 활용',
    targetLevel: 'LV.3 ~ LV.5',
    duration: '8시간 (1일 과정)',
    schedule: '2026. 09. 23 (수) 09:00 ~ 18:00',
    instructor: '사내 직무별 AI 챔피언 연합',
    format: '사내 워크숍',
    summary: '개발, 마케팅, 재무, 법무, 인사 등 각 직무에 특화된 최신 버티컬 도구의 ROI 분석과 사내 실무 적용 사례 연구',
    curriculum: ['직무 도메인별 최신 AI 툴체인 분석', '도구 도입에 따른 비용/효율 분석(ROI)', '팀 단위 PoC(개념검증) 설계 및 평가 방법']
  },
  {
    id: 'tr-07',
    quarter: 'Q4',
    title: '사내 지식(RAG) 기반 자율 AI 에이전트 설계 및 구축',
    category: '에이전트 & 협업',
    targetLevel: 'LV.4 ~ LV.5',
    duration: '24시간 (3일 심화)',
    schedule: '2026. 11. 11 (수) ~ 11. 13 (금)',
    instructor: 'AI플랫폼아키텍처 연구실 김도현 수석',
    format: '오프라인 실습',
    summary: '단일 에이전트의 목표 수립부터 다중 에이전트 오케스트레이션, 사내 규정/기술문서 RAG 시스템 기획 및 PoC',
    curriculum: ['자율 에이전트의 구조와 프롬프트 가드레일', '사내 비정형 문서 벡터화와 RAG 아키텍처', '멀티 에이전트 기반 사내 버추얼 비서 구현']
  },
  {
    id: 'tr-08',
    quarter: 'Q4',
    title: '2026 전사 AI 혁신 아이디어톤 & 챔피언 쇼케이스',
    category: '종합 혁신',
    targetLevel: '전 임직원 대상',
    duration: '16시간 (무박 2일)',
    schedule: '2026. 12. 09 (수) ~ 12. 10 (목)',
    instructor: '경영혁신총괄 & 외부 AI 심사위원단',
    format: '해커톤',
    summary: '부서 간 융합 팀을 구성해 실무 생산성 혁신 및 고객 경험 개선 AI 프로젝트를 구현하고 전사 공유하는 연례 경진대회',
    curriculum: ['아이디어 피칭 및 팀 빌딩', '프로토타입 집중 구현 멘토링', '최종 데모데이 및 우수작 CEO 특별 포상']
  }
];

export const INITIAL_EMPLOYEES: EmployeeProfile[] = [
  {
    id: 'emp-01',
    name: '김서진',
    employeeNo: 'EMP-20210408',
    department: '디지털혁신추진실',
    position: '수석연구원 / 팀장',
    email: 'seojin.kim@enterprise.co.kr',
    evalDate: '2026. 10. 20',
    scores: {
      'prompt-1': { current: 5, target: 5 },
      'prompt-2': { current: 4, target: 5 },
      'prompt-3': { current: 5, target: 5 },
      'auto-1': { current: 5, target: 5 },
      'auto-2': { current: 4, target: 5 },
      'auto-3': { current: 4, target: 5 },
      'data-1': { current: 4, target: 5 },
      'data-2': { current: 4, target: 5 },
      'data-3': { current: 4, target: 5 },
      'multi-1': { current: 4, target: 5 },
      'multi-2': { current: 3, target: 4 },
      'multi-3': { current: 4, target: 5 },
      'ethics-1': { current: 5, target: 5 },
      'ethics-2': { current: 4, target: 5 },
      'ethics-3': { current: 4, target: 5 },
      'tools-1': { current: 5, target: 5 },
      'tools-2': { current: 4, target: 5 },
      'tools-3': { current: 4, target: 5 },
      'agent-1': { current: 4, target: 5 },
      'agent-2': { current: 4, target: 5 },
      'agent-3': { current: 4, target: 5 }
    },
    personalPlan: {
      strengthsReflection: '프롬프트 엔지니어링 및 일상 자동화 파이프라인 구축 능력이 사내 최상위 수준이며, 부서원 교육을 선도하고 있음.',
      weaknessesPlan: '멀티미디어 비주얼 에셋 제작과 사내 지식기반(RAG) 고도화 아키텍처 설계를 올해 4분기까지 마스터할 계획임.',
      personalGoalStatement: '2026년 하반기 전사 사내 규정 RAG 챗봇 1차 파일럿을 성공적으로 론칭하고 부서 간 AI 협업 문화를 정착시키겠습니다.',
      selectedCourseIds: ['tr-05', 'tr-07', 'tr-08']
    },
    supervisorReview: {
      supervisorName: '박대현',
      supervisorTitle: '상무 / DX총괄본부장',
      supervisorDepartment: '디지털혁신총괄본부',
      reviewDate: '2026. 10. 24',
      overallRating: 4.8,
      overallComment: '전사 AI 전환의 실질적인 사내 챔피언 역할을 충실히 수행하고 있습니다. 특히 프롬프트 설계와 자동화 워크플로우 구축에서 타 부서의 모범이 되고 있습니다.',
      strengthsComment: '새로운 AI 도구의 사내 적합성을 신속하게 검증하고, 보안 가이드라인을 철저히 지키며 안전하게 확산시키는 리더십이 탁월합니다.',
      coachingComment: '현재 계획 중인 다중 에이전트 오케스트레이션 및 사내 RAG 시스템 구축을 하반기 핵심 전략 과제로 삼아 전사적 성공 모델로 발전시키길 권장합니다.',
      approvalStatus: 'approved'
    }
  },
  {
    id: 'emp-02',
    name: '이지은',
    employeeNo: 'EMP-20230115',
    department: '브랜드마케팅팀',
    position: '대리',
    email: 'jieun.lee@enterprise.co.kr',
    evalDate: '2026. 10. 22',
    scores: {
      'prompt-1': { current: 4, target: 5 },
      'prompt-2': { current: 4, target: 5 },
      'prompt-3': { current: 3, target: 4 },
      'auto-1': { current: 3, target: 4 },
      'auto-2': { current: 2, target: 4 },
      'auto-3': { current: 2, target: 3 },
      'data-1': { current: 3, target: 4 },
      'data-2': { current: 3, target: 4 },
      'data-3': { current: 2, target: 3 },
      'multi-1': { current: 5, target: 5 },
      'multi-2': { current: 5, target: 5 },
      'multi-3': { current: 4, target: 5 },
      'ethics-1': { current: 4, target: 5 },
      'ethics-2': { current: 4, target: 5 },
      'ethics-3': { current: 3, target: 4 },
      'tools-1': { current: 4, target: 5 },
      'tools-2': { current: 4, target: 5 },
      'tools-3': { current: 3, target: 4 },
      'agent-1': { current: 2, target: 3 },
      'agent-2': { current: 1, target: 3 },
      'agent-3': { current: 1, target: 3 }
    },
    personalPlan: {
      strengthsReflection: '카피라이팅, 제안서 초안 작성 및 생성형 이미지 에셋을 캠페인 시안에 적용하는 속도가 3배 이상 빨라졌습니다.',
      weaknessesPlan: '노코드 연동(Make)을 통한 소셜 미디어 모니터링 자동화 및 에이전트 개념 습득이 시급합니다.',
      personalGoalStatement: '캠페인 기획부터 성과 리포트 작성까지 80% 이상의 프로세스를 AI 워크플로우로 연계하여 마케팅 효율을 극대화하겠습니다.',
      selectedCourseIds: ['tr-03', 'tr-04', 'tr-05']
    },
    supervisorReview: {
      supervisorName: '윤서경',
      supervisorTitle: '팀장 / 마케팅커뮤니케이션실',
      supervisorDepartment: '브랜드마케팅본부',
      reviewDate: '2026. 10. 25',
      overallRating: 3.8,
      overallComment: '콘텐츠 생성과 크리에이티브 시안 작업에서 AI 도구를 매우 감각적으로 잘 활용하고 있습니다.',
      strengthsComment: '마케팅 기획서 작성 시 멀티모달 시각 자료를 빠르게 프로토타이핑하여 클라이언트 설득력을 크게 높였습니다.',
      coachingComment: '노코드 자동화 툴(Zapier/Make) 교육을 수강하여 캠페인 리드 수집과 보고서 생성을 자동화하면 업무 생산성이 한 단계 더 도약할 것입니다.',
      approvalStatus: 'approved'
    }
  },
  {
    id: 'emp-03',
    name: '박준혁',
    employeeNo: 'EMP-20190822',
    department: '클라우드인프라팀',
    position: '책임엔지니어',
    email: 'junhyeok.park@enterprise.co.kr',
    evalDate: '2026. 10. 18',
    scores: {
      'prompt-1': { current: 4, target: 5 },
      'prompt-2': { current: 5, target: 5 },
      'prompt-3': { current: 4, target: 5 },
      'auto-1': { current: 5, target: 5 },
      'auto-2': { current: 5, target: 5 },
      'auto-3': { current: 4, target: 5 },
      'data-1': { current: 4, target: 5 },
      'data-2': { current: 4, target: 5 },
      'data-3': { current: 3, target: 4 },
      'multi-1': { current: 3, target: 4 },
      'multi-2': { current: 2, target: 3 },
      'multi-3': { current: 2, target: 3 },
      'ethics-1': { current: 5, target: 5 },
      'ethics-2': { current: 4, target: 5 },
      'ethics-3': { current: 4, target: 5 },
      'tools-1': { current: 4, target: 5 },
      'tools-2': { current: 5, target: 5 },
      'tools-3': { current: 4, target: 5 },
      'agent-1': { current: 4, target: 5 },
      'agent-2': { current: 3, target: 4 },
      'agent-3': { current: 4, target: 5 }
    },
    personalPlan: {
      strengthsReflection: '서버 모니터링 로그 자동 분석 및 인프라 프로비저닝 스크립트 작성에 GitHub Copilot과 AI API를 적극 연계하고 있음.',
      weaknessesPlan: '경영진 및 비기술 부서를 설득하기 위한 비즈니스 발표 자료 및 다이어그램 생성 역량을 보강하고자 함.',
      personalGoalStatement: '사내 인프라 장애 발생 시 원인 분석과 조치 보고서를 1차 작성해주는 장애 대응 에이전트를 개발하겠습니다.',
      selectedCourseIds: ['tr-04', 'tr-07', 'tr-08']
    },
    supervisorReview: {
      supervisorName: '최창호',
      supervisorTitle: '기술이사 / CTO',
      supervisorDepartment: '기술총괄본부',
      reviewDate: '2026. 10. 21',
      overallRating: 4.4,
      overallComment: '인프라 엔지니어링 전반에 AI를 접목하여 장애 대응 시간과 루틴 점검 시간을 획기적으로 줄였습니다.',
      strengthsComment: '데이터 보안 규정과 API 토큰 관리를 철저히 지키며 신뢰성 높은 인프라 자동화 체계를 정착시켰습니다.',
      coachingComment: '기술적 성과를 타 부서와 경영진에게 효과적으로 전달할 수 있도록 시각화 및 커뮤니케이션 문서화 역량 강화를 추천합니다.',
      approvalStatus: 'approved'
    }
  },
  {
    id: 'emp-04',
    name: '최수민',
    employeeNo: 'EMP-20240901',
    department: '인사조직문화팀',
    position: '사원',
    email: 'sumin.choi@enterprise.co.kr',
    evalDate: '2026. 10. 26',
    scores: {
      'prompt-1': { current: 2, target: 4 },
      'prompt-2': { current: 2, target: 4 },
      'prompt-3': { current: 2, target: 3 },
      'auto-1': { current: 3, target: 4 },
      'auto-2': { current: 1, target: 3 },
      'auto-3': { current: 1, target: 3 },
      'data-1': { current: 2, target: 4 },
      'data-2': { current: 2, target: 3 },
      'data-3': { current: 1, target: 3 },
      'multi-1': { current: 3, target: 4 },
      'multi-2': { current: 2, target: 4 },
      'multi-3': { current: 2, target: 3 },
      'ethics-1': { current: 4, target: 5 },
      'ethics-2': { current: 3, target: 4 },
      'ethics-3': { current: 3, target: 4 },
      'tools-1': { current: 2, target: 4 },
      'tools-2': { current: 2, target: 4 },
      'tools-3': { current: 2, target: 3 },
      'agent-1': { current: 1, target: 3 },
      'agent-2': { current: 1, target: 2 },
      'agent-3': { current: 1, target: 3 }
    },
    personalPlan: {
      strengthsReflection: '신규 입사자로서 사내 보안 규정을 철저히 숙지하고 공지문 및 교육 안내문 초안 작성에 AI를 적극 시험하고 있음.',
      weaknessesPlan: '프롬프트의 체계적 구성과 엑셀 인사 데이터의 AI 분석 능력을 기초부터 체계적으로 학습할 필요가 있음.',
      personalGoalStatement: '올해 안에 프롬프트 실무 과정을 완수하여 전사 교육 일정 관리와 설문 분석 시간을 절반으로 줄이겠습니다.',
      selectedCourseIds: ['tr-01', 'tr-02', 'tr-03']
    },
    supervisorReview: {
      supervisorName: '강태석',
      supervisorTitle: '팀장 / 인사HR실',
      supervisorDepartment: '인재경영본부',
      reviewDate: '2026. 10. 27',
      overallRating: 2.9,
      overallComment: '입사 후 빠른 적응과 함께 새로운 AI 도구를 업무에 주도적으로 도입하려는 학습 열의가 돋보입니다.',
      strengthsComment: '인사 데이터 다룰 때 개인정보 비식별화 및 보안 원칙을 꼼꼼히 지키는 기본 태도가 우수합니다.',
      coachingComment: '상반기 프롬프트 실습 과정과 데이터 분석 과정을 이수하여 실무 역량을 단계적으로 고도화하길 바랍니다.',
      approvalStatus: 'approved'
    }
  },
  {
    id: 'emp-05',
    name: '정태웅',
    employeeNo: 'EMP-20180312',
    department: '재무전략기획팀',
    position: '과장',
    email: 'taewoong.jung@enterprise.co.kr',
    evalDate: '2026. 10. 19',
    scores: {
      'prompt-1': { current: 3, target: 4 },
      'prompt-2': { current: 4, target: 5 },
      'prompt-3': { current: 3, target: 4 },
      'auto-1': { current: 3, target: 4 },
      'auto-2': { current: 2, target: 4 },
      'auto-3': { current: 2, target: 3 },
      'data-1': { current: 4, target: 5 },
      'data-2': { current: 4, target: 5 },
      'data-3': { current: 3, target: 5 },
      'multi-1': { current: 3, target: 4 },
      'multi-2': { current: 2, target: 3 },
      'multi-3': { current: 2, target: 3 },
      'ethics-1': { current: 5, target: 5 },
      'ethics-2': { current: 4, target: 5 },
      'ethics-3': { current: 3, target: 4 },
      'tools-1': { current: 3, target: 4 },
      'tools-2': { current: 3, target: 4 },
      'tools-3': { current: 3, target: 4 },
      'agent-1': { current: 2, target: 3 },
      'agent-2': { current: 1, target: 3 },
      'agent-3': { current: 1, target: 3 }
    },
    personalPlan: {
      strengthsReflection: '대규모 회계 전표 및 결산 데이터 검증에서 AI 스프레드시트 분석 기능을 활용해 오류 검출 시간을 크게 단축함.',
      weaknessesPlan: '재무 결산 보고 자동화 파이프라인(Make 연계)과 정기 경영진 보고서 양식 자동 추출 스킬을 보강할 예정임.',
      personalGoalStatement: '분기별 재무 결산 분석 리포트의 정형 데이터 추출과 시나리오 시뮬레이션을 AI 자동화하여 분석 깊이를 더하겠습니다.',
      selectedCourseIds: ['tr-02', 'tr-03', 'tr-05']
    },
    supervisorReview: {
      supervisorName: '임수철',
      supervisorTitle: 'CFO / 재무총괄전무',
      supervisorDepartment: '재무전략실',
      reviewDate: '2026. 10. 23',
      overallRating: 3.5,
      overallComment: '숫자에 대한 엄밀성과 정확성을 유지하면서도 AI의 데이터 분석 기능을 안전하게 결합하고 있습니다.',
      strengthsComment: '재무 기밀 데이터의 보안 누출 방지 원칙을 완벽하게 지키면서도 회계 통계 처리 속도를 크게 끌어올렸습니다.',
      coachingComment: '경영진 앞 시나리오 예측 모델링 역량을 더 키워 차기 사업계획 수립에 직접 기여하는 수준으로 발전하길 기대합니다.',
      approvalStatus: 'approved'
    }
  },
  {
    id: 'emp-06',
    name: '강서연',
    employeeNo: 'EMP-20220601',
    department: '서비스기획본부',
    position: '선임기획자',
    email: 'seoyeon.kang@enterprise.co.kr',
    evalDate: '2026. 10. 25',
    scores: {
      'prompt-1': { current: 4, target: 5 },
      'prompt-2': { current: 4, target: 5 },
      'prompt-3': { current: 4, target: 5 },
      'auto-1': { current: 4, target: 5 },
      'auto-2': { current: 3, target: 4 },
      'auto-3': { current: 3, target: 4 },
      'data-1': { current: 4, target: 5 },
      'data-2': { current: 3, target: 4 },
      'data-3': { current: 3, target: 4 },
      'multi-1': { current: 4, target: 5 },
      'multi-2': { current: 4, target: 5 },
      'multi-3': { current: 3, target: 4 },
      'ethics-1': { current: 4, target: 5 },
      'ethics-2': { current: 4, target: 5 },
      'ethics-3': { current: 4, target: 5 },
      'tools-1': { current: 4, target: 5 },
      'tools-2': { current: 4, target: 5 },
      'tools-3': { current: 3, target: 4 },
      'agent-1': { current: 3, target: 4 },
      'agent-2': { current: 3, target: 4 },
      'agent-3': { current: 3, target: 4 }
    },
    personalPlan: {
      strengthsReflection: '서비스 기획 요구사항 정의서(PRD) 초안 작성 및 유저 페르소나 시뮬레이션에 AI를 상시 활용 중입니다.',
      weaknessesPlan: '사내 지식베이스를 연동한 맞춤형 서비스 챗봇 기획 및 RAG 구조 설계 역량을 집중 보강하고자 합니다.',
      personalGoalStatement: '고객 행동 로그 데이터를 자연어로 분석하고 기능 요구사항을 도출하는 기획 자동화 체계를 정립하겠습니다.',
      selectedCourseIds: ['tr-03', 'tr-07', 'tr-08']
    },
    supervisorReview: {
      supervisorName: '백승호',
      supervisorTitle: '본부장 / 상무',
      supervisorDepartment: '서비스기획본부',
      reviewDate: '2026. 10. 26',
      overallRating: 4.1,
      overallComment: '기획서 작성 속도뿐 아니라 유저 경험 시나리오를 다각도로 검토하는 데 AI를 매우 영리하게 활용하고 있습니다.',
      strengthsComment: '새로운 기능을 기획할 때 AI로 모의 사용자 피드백을 빠르게 돌려 기획의 빈틈을 선제적으로 찾아냅니다.',
      coachingComment: '하반기 사내 지식기반(RAG) 챗봇 파일럿 구축 시 서비스 기획 리드로 적극 참여하길 권장합니다.',
      approvalStatus: 'approved'
    }
  },
  {
    id: 'emp-07',
    name: '윤동현',
    employeeNo: 'EMP-20150201',
    department: '글로벌영업본부',
    position: '부장 / 해외사업담당',
    email: 'donghyun.yoon@enterprise.co.kr',
    evalDate: '2026. 10. 17',
    scores: {
      'prompt-1': { current: 3, target: 4 },
      'prompt-2': { current: 3, target: 4 },
      'prompt-3': { current: 2, target: 3 },
      'auto-1': { current: 3, target: 4 },
      'auto-2': { current: 1, target: 3 },
      'auto-3': { current: 1, target: 3 },
      'data-1': { current: 2, target: 3 },
      'data-2': { current: 2, target: 3 },
      'data-3': { current: 2, target: 3 },
      'multi-1': { current: 4, target: 5 },
      'multi-2': { current: 2, target: 3 },
      'multi-3': { current: 3, target: 4 },
      'ethics-1': { current: 4, target: 5 },
      'ethics-2': { current: 3, target: 4 },
      'ethics-3': { current: 3, target: 4 },
      'tools-1': { current: 3, target: 4 },
      'tools-2': { current: 2, target: 4 },
      'tools-3': { current: 2, target: 3 },
      'agent-1': { current: 1, target: 2 },
      'agent-2': { current: 1, target: 2 },
      'agent-3': { current: 1, target: 2 }
    },
    personalPlan: {
      strengthsReflection: '영문 비즈니스 이메일 작성 및 해외 파트너사 계약서 조항의 핵심 요약에 일상적으로 AI를 활용 중임.',
      weaknessesPlan: '데이터 기반 해외 시장 동향 분석과 영업 파이프라인 자동화 툴 연동 지식이 부족하여 보강 필요함.',
      personalGoalStatement: '글로벌 바이어 맞춤형 제안서 생성과 현지화 커뮤니케이션 속도를 대폭 단축하여 수주율을 제고하겠습니다.',
      selectedCourseIds: ['tr-01', 'tr-02', 'tr-04']
    },
    supervisorReview: {
      supervisorName: '이규석',
      supervisorTitle: '전무 / 해외영업총괄',
      supervisorDepartment: '글로벌영업본부',
      reviewDate: '2026. 10. 20',
      overallRating: 3.2,
      overallComment: '해외 커뮤니케이션에서 언어적 장벽을 해소하고 빠른 바이어 응대에 AI를 실용적으로 접목하고 있습니다.',
      strengthsComment: '시차와 다국어 소통 문제를 극복하기 위해 영문/일문 제안서를 신속하게 다듬는 실용성이 뛰어납니다.',
      coachingComment: '영업팀 차원의 리드 관리 및 고객사 동향 수집 자동화 연계를 추가 학습하여 부서원들에게도 노하우를 전수해주길 기대합니다.',
      approvalStatus: 'approved'
    }
  }
];

export const CURRENT_USER_DEFAULT: EmployeeProfile = {
  id: 'emp-my',
  name: '홍길동',
  employeeNo: 'EMP-20231102',
  department: '전략기획팀',
  position: '선임매니저',
  email: 'gildong.hong@enterprise.co.kr',
  evalDate: '2026. 10. 28',
  scores: {
    'prompt-1': { current: 3, target: 4 },
    'prompt-2': { current: 3, target: 4 },
    'prompt-3': { current: 3, target: 4 },
    'auto-1': { current: 3, target: 5 },
    'auto-2': { current: 2, target: 4 },
    'auto-3': { current: 2, target: 4 },
    'data-1': { current: 3, target: 4 },
    'data-2': { current: 3, target: 4 },
    'data-3': { current: 2, target: 4 },
    'multi-1': { current: 4, target: 5 },
    'multi-2': { current: 3, target: 4 },
    'multi-3': { current: 3, target: 4 },
    'ethics-1': { current: 4, target: 5 },
    'ethics-2': { current: 4, target: 5 },
    'ethics-3': { current: 3, target: 4 },
    'tools-1': { current: 3, target: 4 },
    'tools-2': { current: 3, target: 4 },
    'tools-3': { current: 2, target: 4 },
    'agent-1': { current: 2, target: 4 },
    'agent-2': { current: 1, target: 3 },
    'agent-3': { current: 2, target: 3 }
  },
  personalPlan: {
    strengthsReflection: '보고서 초안 작성 및 프레젠테이션 스토리라인 구성에서 프롬프트 기법을 적극 활용하여 기획서 초안 작성 시간을 종전 대비 절반으로 단축했습니다.',
    weaknessesPlan: '업무 자동화(노코드 툴 연동)와 사내 지식(RAG) 기반 에이전트 활용 지식이 아직 기초 수준이어서 집중 보완이 필요합니다.',
    personalGoalStatement: '2026년 하반기까지 전략기획팀의 주간 경영회의 보고서 데이터 취합을 자동화하고, 부서 내 AI 선도 매니저로 성장하겠습니다.',
    selectedCourseIds: ['tr-01', 'tr-03', 'tr-05']
  },
  supervisorReview: {
    supervisorName: '김민수',
    supervisorTitle: '팀장 / 전략기획실',
    supervisorDepartment: '경영전략총괄',
    reviewDate: '2026. 10. 28',
    overallRating: 3.6,
    overallComment: '기획 업무 전반에 걸쳐 생성형 AI를 매우 적극적이고 비판적인 시각으로 검증하며 모범적으로 적용하고 있습니다.',
    strengthsComment: '복합 프롬프트 작성을 통해 기획서의 논리 전개를 탄탄하게 구성하고, 사내 데이터 보안 가이드라인을 철저히 준수하는 점이 인상적입니다.',
    coachingComment: '앞으로 3분기 노코드 자동화 파이프라인 과정을 이수하여 정기 경영 지표 보고서 수집 과정을 자동화한다면 조직 전반에 매우 큰 시너지를 낼 수 있을 것입니다.',
    approvalStatus: 'under_review'
  }
};
