import React from 'react';
import Image from 'next/image';
import type { ReportData } from '@/types/report';

interface PageOneProps {
  data: ReportData;
  generatedDate: string;
}

const DetailItem = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <div className="border-t border-gray-200 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-600">{label}</dt>
        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{value || 'N/A'}</dd>
    </div>
);


const PageOne = React.forwardRef<HTMLDivElement, PageOneProps>(({ data, generatedDate }, ref) => {
  const sroName = data.SR_CODE?.value?.name || 'N/A';
  const sroCode = data.SR_CODE?.value?.code || '';
  const serviceName = data.services && data.services.length > 0 ? data.services[0].name : 'N/A';

  return (
    <div
      ref={ref}
      className="bg-white text-black font-sans"
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
      {/* Header */}
      <header className="flex justify-between items-start pb-4">
        <div className="flex items-center space-x-3">
          <Image 
            src="https://picsum.photos/seed/logo/50/50" 
            alt="Company Logo" 
            width={50} 
            height={50}
            data-ai-hint="logo"
            className="rounded-full"
          />
          <div>
            <h1 className="font-bold text-xl text-gray-800">PropVerify</h1>
            <p className="text-xs text-gray-500">Your Trusted Partner in Property Diligence</p>
          </div>
        </div>
        <div className="text-right text-xs text-gray-600">
          <p><span className="font-bold">Order ID:</span> {data.srn}</p>
          <p><span className="font-bold">Generated:</span> {generatedDate}</p>
          {data.srn && <p><span className="font-bold">SRN:</span> {data.srn}</p>}
        </div>
      </header>

      <hr className="border-gray-300" />

      {/* Title */}
      <section className="text-center my-8">
        <h2 className="text-2xl font-bold tracking-wider text-gray-800">
          PROPERTY VERIFICATION REPORT
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Official Legal Due Diligence Summary
        </p>
      </section>

      {/* Order Details */}
      <section className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3">
              <h3 className="text-base font-semibold leading-7 text-gray-900">Order Details</h3>
          </div>
          <dl className="divide-y divide-gray-200">
              <DetailItem label="State" value={data.STATE?.name} />
              <DetailItem label="Sub Registrar Office (SRO)" value={`${sroName} (${sroCode})`} />
              <DetailItem label="Document Number" value={data.DOCUMENT_NUMBER?.value} />
              <DetailItem label="Registration Year" value={data.YEAR?.value} />
              <DetailItem label="Property Tax Number (PTIN)" value={data.PTIN?.value} />
              <DetailItem label="Mode" value={data.mode ? data.mode.charAt(0).toUpperCase() + data.mode.slice(1) : 'N/A'} />
              <DetailItem label="Service Type" value={serviceName} />
          </dl>
      </section>

      {/* Annexure Section */}
      <section className="mt-10 flex-grow">
        <h3 className="font-bold text-lg text-gray-800 mb-4">ANNEXURE - I</h3>
        <div className="space-y-6">
            <div>
                <h4 className="font-semibold text-gray-700 text-sm mb-2 border-b pb-1">Additional Document References</h4>
                <div className="h-16 bg-gray-50 rounded-md border border-dashed border-gray-300 p-2 text-center text-xs text-gray-400 flex items-center justify-center">
                    <span>(Attach certified copies, if any)</span>
                </div>
            </div>
            <div>
                <h4 className="font-semibold text-gray-700 text-sm mb-2 border-b pb-1">Supporting Attachments</h4>
                <div className="h-16 bg-gray-50 rounded-md border border-dashed border-gray-300 p-2 text-center text-xs text-gray-400 flex items-center justify-center">
                    <span>(e.g., Maps, Survey Plans)</span>
                </div>
            </div>
             <div>
                <h4 className="font-semibold text-gray-700 text-sm mb-2 border-b pb-1">Notes & Observations</h4>
                <div className="h-24 bg-gray-50 rounded-md border border-dashed border-gray-300 p-2 text-center text-xs text-gray-400 flex items-center justify-center">
                    <span>(Manual verification notes)</span>
                </div>
            </div>
        </div>
      </section>

    </div>
  );
});

PageOne.displayName = 'PageOne';
export default PageOne;
