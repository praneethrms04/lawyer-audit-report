"use client";

import { useState, useRef, useEffect } from 'react';
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
  const [aiAnalysisResult, setAiAnalysisResult] = useState<AIRiskAnalysisOutput | null>(null);
  const [pdfGenerationTrigger, setPdfGenerationTrigger] = useState<number | null>(null);

  const { toast } = useToast();

  const page1Ref = useRef<HTMLDivElement>(null);
  const page2Ref = useRef<HTMLDivElement>(null);
  const page3Ref = useRef<HTMLDivElement>(null);
  const generatedDate = new Date().toLocaleDateString();

  useEffect(() => {
    // On mount, populate AI issues from mock data for display
    setAiAnalysisResult({
      issues: data.jaagaFetch.AIGeneratedDescription,
      conclusion: 'The AI-generated conclusion will appear here after you click "Generate & Download PDF".',
    });
  }, [data.jaagaFetch.AIGeneratedDescription]);

  useEffect(() => {
    if (!pdfGenerationTrigger) return;

    const createAndDownloadPdf = async () => {
      try {
        if (!page1Ref.current || !page2Ref.current || !page3Ref.current) {
          throw new Error('Report pages not rendered correctly.');
        }
        
        const blob = await generatePdf([page1Ref.current, page2Ref.current, page3Ref.current]);
        
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
    // Timeout to ensure DOM is updated with AI data before capturing
    setTimeout(createAndDownloadPdf, 100);

  }, [pdfGenerationTrigger, toast, data._id]);

  const handleGeneratePdf = async () => {
    setIsLoading(true);
    try {
      const result = await generateAIRiskAnalysis({
        issues: data.jaagaFetch.AIGeneratedDescription,
      });
      setAiAnalysisResult(result);
      setPdfGenerationTrigger(Date.now());
    } catch (error) {
      console.error('AI Analysis failed:', error);
      toast({
        variant: 'destructive',
        title: 'AI Analysis Failed',
        description: 'Could not generate AI risk analysis for the report.',
      });
      setIsLoading(false);
    }
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
        {aiAnalysisResult && (
            <div ref={page3Ref} className="shadow-lg rounded-lg overflow-hidden border">
                <PageThree data={data} aiAnalysis={aiAnalysisResult} generatedDate={generatedDate} />
            </div>
        )}
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
