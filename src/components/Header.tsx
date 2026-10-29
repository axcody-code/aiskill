import React from 'react';
import { Printer, Download, Sparkles } from 'lucide-react';

interface HeaderProps {
  activeTab: 'evaluation' | 'organization';
  onTabChange: (tab: 'evaluation' | 'organization') => void;
  onPrint: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  onPrint,
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Brand title, one line wordmark */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-base shadow-xs">
            AI
          </div>
          <span className="text-base font-bold tracking-tight text-slate-900 whitespace-nowrap">
            7대 AI 역량 진단 포털
          </span>
        </div>

        {/* Zone 2: 2 primary view tabs & navigation links */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={() => onTabChange('evaluation')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'evaluation'
                ? 'bg-blue-50 text-blue-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            내 역량 진단 및 평가표
          </button>
          <button
            type="button"
            onClick={() => onTabChange('organization')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'organization'
                ? 'bg-blue-50 text-blue-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            전사 임직원 현황 대시보드
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onPrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>진단 리포트 인쇄</span>
          </button>
        </div>

      </div>
    </header>
  );
};
