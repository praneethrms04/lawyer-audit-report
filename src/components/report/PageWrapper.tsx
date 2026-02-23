import React from 'react';
import ReportHeader from './ReportHeader';
import ReportFooter from './ReportFooter';

interface PageWrapperProps {
  children: React.ReactNode;
  currentPage: number;
  generatedDate: string;
}

const PageWrapper = React.forwardRef<HTMLDivElement, PageWrapperProps>(
  ({ children, currentPage, generatedDate }, ref) => {
    return (
      <div
        ref={ref}
        className="bg-white text-black font-body"
        style={{
          width: '210mm',
          height: '297mm',
          padding: '20mm',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: "'Inter', sans-serif",
          boxSizing: 'border-box',
        }}
      >
        <ReportHeader />
        <main className="flex-grow flex flex-col text-sm">
          {children}
        </main>
        <ReportFooter currentPage={currentPage} generatedDate={generatedDate} />
      </div>
    );
  }
);

PageWrapper.displayName = 'PageWrapper';

export default PageWrapper;
