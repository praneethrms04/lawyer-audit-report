import ReportEngine from '@/components/report/ReportEngine';
import { reportData } from '@/lib/mock-data';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary font-headline">Property Insights Reporter</h1>
          <p className="text-muted-foreground mt-2">Generate, preview, and upload your professional property reports.</p>
        </header>
        <ReportEngine data={reportData} />
      </div>
    </main>
  );
}
