import ReportEngine from '@/components/report/ReportEngine';
import { reportData } from '@/lib/mock-data';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary font-headline">Property Insights Reporter</h1>
          <p className="text-muted-foreground mt-2">Your selected template is shown below. Click "Generate PDF" to create your report.</p>
        </header>

        {reportData.TEMPLATE?.url && (
            <div className="mb-8 border rounded-lg overflow-hidden shadow-md max-w-3xl mx-auto bg-white">
                <Image
                    src={reportData.TEMPLATE.url}
                    alt={reportData.TEMPLATE.name || 'Report Template'}
                    width={800}
                    height={1120}
                    className="w-full h-auto"
                    priority
                />
            </div>
        )}

        <ReportEngine data={reportData} />
      </div>
    </main>
  );
}
