import React from 'react';
import Image from 'next/image';
import type { ReportData } from '@/types/report';

interface PageOneProps {
  data: ReportData;
}

const DetailItem = ({ label, value }: { label:string, value: React.ReactNode }) => (
    <div className="flex py-2 border-b border-gray-200 text-sm">
      <p className="w-1/3 font-semibold text-gray-600">{label}</p>
      <p className="w-2/3 text-gray-800 break-words">{value ?? 'N/A'}</p>
    </div>
  );

const Boundaries = ({ boundaries }: { boundaries: ReportData['jaagaFetch']['propertyInfo']['boundaries'] }) => (
    <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-2 p-3 bg-gray-50 rounded-md text-xs">
      <div><span className="font-semibold text-gray-600">North:</span> {boundaries['[N]'] || 'N/A'}</div>
      <div><span className="font-semibold text-gray-600">South:</span> {boundaries['[S]'] || 'N/A'}</div>
      <div><span className="font-semibold text-gray-600">East:</span> {boundaries['[E]'] || 'N/A'}</div>
      <div><span className="font-semibold text-gray-600">West:</span> {boundaries['[W]'] || 'N/A'}</div>
    </div>
);

const PageOne = React.forwardRef<HTMLDivElement, PageOneProps>(({ data }, ref) => {
  const { propertyInfo, taxdetails, ecRecords } = data.jaagaFetch;

  return (
    <div
      ref={ref}
      className="bg-white text-black font-sans"
      style={{
        width: '210mm',
        minHeight: '297mm',
        padding: '20mm',
        fontFamily: "'Inter', sans-serif",
        boxSizing: 'border-box',
      }}
    >
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
          <p><span className="font-bold">Generated:</span> {new Date().toLocaleDateString()}</p>
        </div>
      </header>
      <hr className="border-gray-300 mb-4" />

      <main className="space-y-4 text-sm">
        {/* Property & Tax Details */}
        <section style={{ pageBreakInside: 'avoid' }}>
          <div className="grid grid-cols-2 gap-x-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2 border-b pb-2">
                Property Information
              </h3>
              <div className="space-y-1">
                <DetailItem label="Owner" value={propertyInfo.propertyOwnerName} />
                <DetailItem label="Address" value={propertyInfo.address} />
                <DetailItem label="Village" value={propertyInfo.village} />
                <DetailItem label="Built-up Area" value={propertyInfo.built} />
                <DetailItem label="Extent" value={propertyInfo.extent} />
                <DetailItem label="Survey No." value={propertyInfo.survey} />
                <DetailItem label="Block" value={propertyInfo.block} />
                <DetailItem label="Property Type" value={propertyInfo.propertyType} />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2 border-b pb-2">
                Tax Details
              </h3>
              <div className="space-y-1">
                <DetailItem label="Property ID" value={taxdetails.propertyId} />
                <DetailItem label="Owner Name" value={taxdetails.ownerName} />
                <DetailItem label="Locality" value={taxdetails.locality} />
                <DetailItem label="Annual Tax" value={new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(Number(taxdetails.annualTax))} />
                <DetailItem label="Plinth Area" value={`${taxdetails.plinthArea} sq. ft.`} />
                <DetailItem label="Arrears" value={taxdetails.arrearTax} />
              </div>
            </div>
          </div>
          <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 border-b pb-2">
                Boundaries
              </h3>
              <Boundaries boundaries={propertyInfo.boundaries} />
          </div>
        </section>

        {/* EC Records */}
        <section className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 border-b pb-2">
            Encumbrance Certificate (EC) Records
          </h3>
          {ecRecords.length > 0 ? (
            <div className="space-y-4">
              {ecRecords.map((record, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50/50" style={{ pageBreakInside: 'avoid' }}>
                  <div className="grid grid-cols-3 gap-x-4 gap-y-2 text-xs mb-3">
                    <div className="font-medium">
                      <span className="text-gray-500">Deed No: </span>{record.deedNo}
                    </div>
                    <div className="font-medium">
                      <span className="text-gray-500">Date: </span>{record.deedDate}
                    </div>
                    <div className="font-medium">
                      <span className="text-gray-500">Deed Type: </span>{record.deedType}
                    </div>
                  </div>
                  <div className="text-xs space-y-3">
                    <div className="border-t pt-2">
                      <p className="font-semibold text-gray-600">First Party (Seller):</p>
                      <p className="text-gray-800 mt-1 break-words">{record.firstPartyName}</p>
                    </div>
                    <div className="border-t pt-2">
                      <p className="font-semibold text-gray-600">Second Party (Buyer):</p>
                      <p className="text-gray-800 mt-1 break-words">{record.secondPartyName}</p>
                    </div>
                    <div className="border-t pt-2">
                      <p className="font-semibold text-gray-600">SRO:</p>
                      <p className="text-gray-800 mt-1">{record.sro}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-24 bg-gray-50 rounded-md border border-dashed border-gray-300 p-4 text-center text-sm text-gray-500 flex items-center justify-center">
              <span>No Encumbrance Certificate records found.</span>
            </div>
          )}
        </section>
      </main>
    </div>
  );
});

PageOne.displayName = 'PageOne';
export default PageOne;
