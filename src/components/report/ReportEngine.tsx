"use client";

import { useState, useRef, useEffect } from 'react';
import type { ReportData } from '@/types/report';
import { generateAIRiskAnalysis } from '@/ai/flows/ai-risk-analysis-generator';
import type { AIRiskAnalysisOutput } from '@/ai/flows/ai-risk-analysis-types';
import { generatePdf } from '@/lib/services/pdf';
import { uploadPdf } from '@/lib/services/api';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Upload, Printer } from 'lucide-react';

import PageOne from './PageOne';
import PageTwo from './PageTwo';
import PageThree from './PageThree';

interface ReportEngineProps {
  data: ReportData;
}

export default function ReportEngine({ data }: ReportEngineProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [aiAnalysisResult, setAiAnalysisResult] = useState<AIRiskAnalysisOutput | null>(null);
  const [pdfGenerationTrigger, setPdfGenerationTrigger] = useState<number | null>(null);

  const { toast } = useToast();

  const page1Ref = useRef<HTMLDivElement>(null);
  const page2Ref = useRef<HTMLDivElement>(null);
  const page3Ref = useRef<HTMLDivElement>(null);
  const generatedDate = new Date().toLocaleDateString();


  useEffect(() => {
    if (!pdfGenerationTrigger) return;

    const createPdf = async () => {
      try {
        if (!page1Ref.current || !page2Ref.current || !page3Ref.current) {
          throw new Error('Report pages not rendered correctly.');
        }
        
        const blob = await generatePdf([page1Ref.current, page2Ref.current, page3Ref.current]);
        setPdfBlob(blob);
        
        const dataUrl = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    resolve(reader.result);
                } else {
                    reject(new Error('Failed to convert blob to data URL.'));
                }
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
        setPreviewUrl(dataUrl);

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
    setTimeout(createPdf, 100);

  }, [pdfGenerationTrigger, toast]);

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

  const handleUpload = async () => {
    if (!pdfBlob) {
      toast({
        variant: 'destructive',
        title: 'No PDF to Upload',
        description: 'Please generate a preview first.',
      });
      return;
    }

    setIsUploading(true);
    try {
      const response = await uploadPdf(data._id, pdfBlob);
      toast({
        title: 'Upload Successful',
        description: `Report for order ${response.orderId} uploaded.`,
      });
      setPreviewUrl(null);
    } catch (error) {
      console.error('Error uploading PDF:', error);
      toast({
        variant: 'destructive',
        title: 'Upload Failed',
        description: error instanceof Error ? error.message : 'An unknown error occurred.',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handlePrint = () => {
    if (previewUrl) {
      const printWindow = window.open(previewUrl);
      printWindow?.addEventListener('load', () => {
          printWindow.print();
      });
    } else {
      toast({
        title: 'No PDF to print',
        description: 'Please generate a preview first.',
      });
    }
  };

  return (
    <div className="bg-card p-6 rounded-lg shadow-md border text-center">
      <div className="flex flex-wrap gap-4 items-center justify-center">
        <Button onClick={handleGeneratePdf} disabled={isLoading} size="lg">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            'Generate PDF'
          )}
        </Button>
      </div>

      {/* Hidden container for rendering pages for html2canvas */}
      <div className="fixed top-0 left-[-9999px] w-auto h-auto opacity-100" aria-hidden="true">
        <div ref={page1Ref}><PageOne data={data} generatedDate={generatedDate} /></div>
        <div ref={page2Ref}><PageTwo data={data} generatedDate={generatedDate} /></div>
        <div ref={page3Ref}>
          {aiAnalysisResult && <PageThree data={data} aiAnalysis={aiAnalysisResult} generatedDate={generatedDate} />}
        </div>
      </div>

      <Dialog open={!!previewUrl} onOpenChange={(open) => !open && setPreviewUrl(null)}>
        <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Report Preview</DialogTitle>
          </DialogHeader>
          <div className="flex-grow rounded-md overflow-hidden">
            {previewUrl && (
              <iframe
                src={previewUrl}
                className="w-full h-full"
                title="Report Preview"
                aria-label="Report Preview"
              />
            )}
          </div>
           <DialogFooter className="mt-4 gap-2">
            <Button variant="outline" onClick={handlePrint} disabled={!previewUrl}>
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button onClick={handleUpload} disabled={!pdfBlob || isUploading}>
              {isUploading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Upload className="mr-2 h-4 w-4" />
              )}
              Confirm & Upload
            </Button>
            <Button variant="secondary" onClick={() => setPreviewUrl(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
