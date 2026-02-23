import React from 'react';
import type { ReportData } from '@/types/report';
import type { AIRiskAnalysisOutput } from '@/ai/flows/ai-risk-analysis-types';
import PageWrapper from './PageWrapper';
import DynamicTable from './DynamicTable';

interface PageTwoProps {
  data: ReportData;
  aiAnalysis: AIRiskAnalysisOutput;
  generatedDate: string;
}

const PageTwo = React.forwardRef<HTMLDivElement, PageTwoProps>(({ data, aiAnalysis, generatedDate }, ref) => {
    const { Property_Investment_Overview } = data.jaagaFetch;

    const investmentData = Property_Investment_Overview.reduce((acc, item) => {
        acc[item.field] = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(Number(item.value));
        return acc;
    }, {} as Record<string, string>);

    const investmentTableData = [
        {
        "Registration Value": investmentData["Registration Value"] || "N/A",
        "Consideration Value": investmentData["Consideration Value"] || "N/A",
        }
    ];

  return (
    <PageWrapper ref={ref} currentPage={2} generatedDate={generatedDate}>
      <div className="space-y-6 flex flex-col h-full">

        <div>
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Property Investment Overview</h2>
          <DynamicTable
            headers={['Registration Value', 'Consideration Value']}
            data={investmentTableData}
          />
        </div>
        
        <div>
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">AI Observations & Risk Analysis</h2>

            <div className="space-y-4 mt-4">
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
        </div>

        <div className="flex-grow"></div>

        <div className="pt-8 border-t-2 border-dotted border-gray-400">
            <p className="text-gray-600">Lawyer Signature:</p>
            <div className="h-20"></div>
        </div>

      </div>
    </PageWrapper>
  );
});

PageTwo.displayName = 'PageTwo';
export default PageTwo;
