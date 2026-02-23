import React from 'react';

interface ReportFooterProps {
  currentPage: number;
  generatedDate: string;
}

const ReportFooter = ({ currentPage, generatedDate }: ReportFooterProps) => {
  return (
    <footer className="mt-auto pt-4 border-t border-gray-300 text-xs text-gray-500 flex justify-between">
      <div>Generated on: {generatedDate}</div>
      <div>Page {currentPage} of 2</div>
    </footer>
  );
};

export default ReportFooter;
