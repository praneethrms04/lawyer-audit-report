import React from 'react';
import type { ReportData } from '@/types/report';
import type { AIRiskAnalysisOutput } from '@/ai/flows/ai-risk-analysis-generator';
import PageWrapper from './PageWrapper';

interface PageThreeProps {
  data: ReportData;
  aiAnalysis: AIRiskAnalysisOutput;
  generatedDate: string;
}

const PageThree = React.forwardRef<HTMLDivElement, PageThreeProps>(({ data, aiAnalysis, generatedDate }, ref) => {
  return (
    <PageWrapper ref={ref} currentPage={3} generatedDate={generatedDate}>
      <div className="space-y-6 flex flex-col h-full">
        <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">AI Observations & Risk Analysis</h2>

        <div className="space-y-4">
          {aiAnalysis.issues.map((item, index) => (
            <div key={index} className="p-3 bg-gray-50/50 rounded-md border border-gray-200" style={{ pageBreakInside: 'avoid' }}>
              <p className="font-bold text-red-700">{item.issue}</p>
              <p className="text-gray-600 mt-1">
                <em className="text-sm">{item.comment}</em>
              </p>
              {(item.ecValue || item.taxValue) && (
                 <div className="mt-2 text-xs text-gray-500 bg-gray-100 p-2 rounded">
                    {item.ecValue && <div><strong>EC Ref:</strong> {item.ecValue}</div>}
                    {item.taxValue && <div><strong>Tax Ref:</strong> {item.taxValue}</div>}
                 </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-800">Conclusion</h3>
            <p className="mt-2 text-gray-700 bg-blue-50 p-3 rounded-md border border-blue-200">{aiAnalysis.conclusion}</p>
        </div>

        <div className="flex-grow"></div>

        <div className="mt-16 pt-8 border-t-2 border-dotted border-gray-400">
            <p className="text-gray-600">Lawyer Signature:</p>
            <div className="h-20"></div>
        </div>

      </div>
    </PageWrapper>
  );
});

PageThree.displayName = 'PageThree';
export default PageThree;
