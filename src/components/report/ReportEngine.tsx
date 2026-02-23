"use client";

import { useState, useRef } from 'react';
import type { ReportData } from '@/types/report';
import { generateAIRiskAnalysis } from '@/ai/flows/ai-risk-analysis-generator';
import type { AIRiskAnalysisOutput } from '@/ai/flows/ai-risk-analysis-types';
import { generatePdf } from '@/lib/services/pdf';

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Download } from 'lucide-react';

import PageOne from './PageOne';
import PageTwo from './PageTwo';
import PageThree from './PageThree';

interface ReportEngineProps {
  data: ReportData;
}

export default function ReportEngine({ data }: ReportEngineProps) {
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const page1Ref = useRef<HTMLDivElement>(null);
  const page2Ref = useRef<HTMLDivElement>(null);
  const page3Ref = useRef<HTMLDivElement>(null);
  const generatedDate = new Date().toLocaleDateString();

  const handleGeneratePdf = async () => {
    setIsLoading(true);
    try {
      if (!page1Ref.current || !page2Ref.current || !page3Ref.current) {
        throw new Error('Report pages not rendered correctly.');
      }
      
      const blob = await generatePdf([
          page1Ref.current, 
          page2Ref.current,
          page3Ref.current,
      ]);
      
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${data._id}-report.pdf`;
      document.body.appendChild(a);
      a.click();
      
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
          title: "Download Started",
          description: "Your PDF report is downloading.",
      });

    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        variant: 'destructive',
        title: 'PDF Generation Failed',
        description: error instanceof Error ? error.message : 'An unknown error occurred.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const aiAnalysisResult = {
    issues: data.jaagaFetch.AIGeneratedDescription,
  };

  return (
    <>
      <div className="flex flex-col items-center gap-8 py-8">
        <div ref={page1Ref} className="shadow-lg rounded-lg overflow-hidden border">
            <PageOne data={data} generatedDate={generatedDate} />
        </div>
        <div ref={page2Ref} className="shadow-lg rounded-lg overflow-hidden border">
            <PageTwo data={data} generatedDate={generatedDate} />
        </div>
        <div ref={page3Ref} className="shadow-lg rounded-lg overflow-hidden border">
            <PageThree data={data} aiAnalysis={aiAnalysisResult} generatedDate={generatedDate} />
        </div>
      </div>

      <div className="bg-card p-6 rounded-lg shadow-md border text-center sticky bottom-0">
        <Button onClick={handleGeneratePdf} disabled={isLoading} size="lg">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Generate &amp; Download PDF
            </>
          )}
        </Button>
      </div>
    </>
  );
}
