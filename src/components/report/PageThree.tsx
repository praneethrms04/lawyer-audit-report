import React from 'react';
import type { ReportData } from '@/types/report';
import type { AIRiskAnalysisOutput } from '@/ai/flows/ai-risk-analysis-types';
import PageWrapper from './PageWrapper';
import DynamicTable from './DynamicTable';
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
  } from '@/components/ui/table';

interface PageThreeProps {
  data: ReportData;
  aiAnalysis: AIRiskAnalysisOutput;
  generatedDate: string;
}

const PageThree = React.forwardRef<HTMLDivElement, PageThreeProps>(({ data, aiAnalysis, generatedDate }, ref) => {
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
    <PageWrapper ref={ref} currentPage={3} generatedDate={generatedDate}>
        <div className="space-y-6 flex flex-col h-full">

            <section>
                <h2 className="text-xl font-semibold text-gray-800 border-b-2 pb-2">Property Investment Overview</h2>
                <div className="my-4 border rounded-lg overflow-hidden">
                    <DynamicTable
                        headers={['Registration Value', 'Consideration Value']}
                        data={investmentTableData}
                    />
                </div>
            </section>
            
            <section>
                <h2 className="text-xl font-semibold text-gray-800 border-b-2 pb-2">AI Observations & Risk Analysis</h2>
                {aiAnalysis.issues.length > 0 ? (
                    <div className="my-4 border rounded-lg overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-100 hover:bg-gray-100">
                                    <TableHead className="w-1/4 font-bold text-gray-700">Issue</TableHead>
                                    <TableHead className="font-bold text-gray-700">Comment</TableHead>
                                    <TableHead className="w-1/4 font-bold text-gray-700">Data Points</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                            {aiAnalysis.issues.map((item, index) => (
                                <TableRow key={index} className="border-b align-top" style={{ pageBreakInside: 'avoid' }}>
                                    <TableCell className="font-bold text-red-700">{item.issue}</TableCell>
                                    <TableCell>
                                        <p className="text-gray-600 mt-1">
                                            <em className="text-sm">{item.comment}</em>
                                        </p>
                                    </TableCell>
                                    <TableCell>
                                        {(item.ecValue || item.taxValue) && (
                                            <div className="text-xs text-gray-500 bg-gray-100 p-2 rounded">
                                                {item.ecValue && <div><strong>EC Ref:</strong> {item.ecValue}</div>}
                                                {item.taxValue && <div><strong>Tax Ref:</strong> {item.taxValue}</div>}
                                            </div>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </div>
                ) : (
                    <div className="h-24 bg-gray-50 rounded-md border border-dashed border-gray-300 p-4 text-center text-sm text-gray-500 flex items-center justify-center mt-4">
                        <span>No AI-generated issues found.</span>
                    </div>
                )}
            </section>

        </div>
    </PageWrapper>
  );
});

PageThree.displayName = 'PageThree';
export default PageThree;
