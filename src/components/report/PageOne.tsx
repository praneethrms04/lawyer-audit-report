import React from 'react';
import Image from 'next/image';
import type { ReportData } from '@/types/report';

interface PageOneProps {
  data: ReportData;
}

const DetailRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <tr className="border-b">
      <td className="w-1/3 px-4 py-2 font-semibold text-gray-600 bg-gray-50 border-r">{label}</td>
      <td className="w-2/3 px-4 py-2 text-gray-800 break-words">{value ?? 'N/A'}</td>
    </tr>
  );

const PageOne = React.forwardRef<HTMLDivElement, PageOneProps>(({ data }, ref) => {
  const { propertyInfo, taxdetails } = data.jaagaFetch;

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
      <div className='text-center my-4'>
        <h2 className="text-2xl font-bold text-gray-800 tracking-wider">
            PROPERTY VERIFICATION REPORT
        </h2>
        <p className="text-sm text-gray-500">Official Legal Due Diligence Summary</p>
      </div>

      <main className="space-y-6 text-sm">
        {/* Property Details */}
        <section style={{ pageBreakInside: 'avoid' }}>
          <h3 className="text-lg font-semibold text-gray-800 mb-2 border-b-2 pb-2">
            Property Information
          </h3>
          <table className="w-full border-collapse border border-gray-300">
            <tbody>
              <DetailRow label="Owner" value={propertyInfo.propertyOwnerName} />
              <DetailRow label="Address" value={propertyInfo.address} />
              <DetailRow label="Village" value={propertyInfo.village} />
              <DetailRow label="Built-up Area" value={propertyInfo.built} />
              <DetailRow label="Extent" value={propertyInfo.extent} />
              <DetailRow label="Survey No." value={propertyInfo.survey} />
              <DetailRow label="Block" value={propertyInfo.block} />
              <DetailRow label="Property Type" value={propertyInfo.propertyType} />
              <DetailRow label="Boundaries" value={
                  <div className="grid grid-cols-2 gap-x-4 text-xs">
                      <div><span className="font-semibold">North:</span> {propertyInfo.boundaries['[N]'] || 'N/A'}</div>
                      <div><span className="font-semibold">South:</span> {propertyInfo.boundaries['[S]'] || 'N/A'}</div>
                      <div><span className="font-semibold">East:</span> {propertyInfo.boundaries['[E]'] || 'N/A'}</div>
                      <div><span className="font-semibold">West:</span> {propertyInfo.boundaries['[W]'] || 'N/A'}</div>
                  </div>
              } />
            </tbody>
          </table>
        </section>

        {/* Tax Details */}
        <section style={{ pageBreakInside: 'avoid' }}>
          <h3 className="text-lg font-semibold text-gray-800 mb-2 border-b-2 pb-2">
            Tax Details
          </h3>
          <table className="w-full border-collapse border border-gray-300">
            <tbody>
              <DetailRow label="Property ID" value={taxdetails.propertyId} />
              <DetailRow label="Owner Name" value={taxdetails.ownerName} />
              <DetailRow label="Locality" value={taxdetails.locality} />
              <DetailRow label="Annual Tax" value={new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(Number(taxdetails.annualTax))} />
              <DetailRow label="Plinth Area" value={`${taxdetails.plinthArea} sq. ft.`} />
              <DetailRow label="Arrears" value={taxdetails.arrearTax} />
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
});

PageOne.displayName = 'PageOne';
export default PageOne;
