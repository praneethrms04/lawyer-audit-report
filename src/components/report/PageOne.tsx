import React from 'react';
import Image from 'next/image';
import type { ReportData } from '@/types/report';
import ReportFooter from './ReportFooter';
import {
    Table,
    TableBody,
    TableRow,
    TableCell,
  } from '@/components/ui/table';

interface PageOneProps {
  data: ReportData;
  generatedDate: string;
}

const DetailRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <TableRow>
      <TableCell className="w-1/3 font-semibold text-gray-600 bg-gray-50 border-r">{label}</TableCell>
      <TableCell className="w-2/3 text-gray-800 break-words">{value ?? 'N/A'}</TableCell>
    </TableRow>
  );

const PageOne = React.forwardRef<HTMLDivElement, PageOneProps>(({ data, generatedDate }, ref) => {
  const { propertyInfo, taxdetails } = data.jaagaFetch;

  return (
    <div
      ref={ref}
      className="bg-white text-black font-sans flex flex-col"
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
          <p><span className="font-bold">Generated:</span> {generatedDate}</p>
        </div>
      </header>
      <hr className="border-gray-300 mb-4" />
      {/* <div className='text-center my-4'>
        <h2 className="text-2xl font-bold text-gray-800 tracking-wider">
            PROPERTY VERIFICATION REPORT
        </h2>
        <p className="text-sm text-gray-500">Official Legal Due Diligence Summary</p>
      </div> */}

      <main className="space-y-6 text-sm flex-grow">
        {/* Property Details */}
        <section style={{ pageBreakInside: 'avoid' }}>
          <h3 className="text-lg font-semibold text-gray-800 mb-2 border-b-2 border-gray-700 pb-2">
            Property Information
          </h3>
          <div className="border rounded-lg overflow-hidden">
            <Table className="w-full">
              <TableBody>
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
              </TableBody>
            </Table>
          </div>
        </section>

        {/* Tax Details */}
        <section style={{ pageBreakInside: 'avoid' }}>
          <h3 className="text-lg font-semibold text-gray-800 mb-2 border-b-2 border-gray-700 pb-2">
            Tax Details
          </h3>
          <div className="border rounded-lg overflow-hidden">
            <Table className="w-full">
                <TableBody>
                <DetailRow label="Property ID" value={taxdetails.propertyId} />
                <DetailRow label="Owner Name" value={taxdetails.ownerName} />
                <DetailRow label="Locality" value={taxdetails.locality} />
                <DetailRow label="Annual Tax" value={new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(Number(taxdetails.annualTax))} />
                <DetailRow label="Plinth Area" value={`${taxdetails.plinthArea} sq. ft.`} />
                <DetailRow label="Arrears" value={taxdetails.arrearTax} />
                </TableBody>
            </Table>
          </div>
        </section>
      </main>
      <ReportFooter currentPage={1} generatedDate={generatedDate} />
    </div>
  );
});

PageOne.displayName = 'PageOne';
export default PageOne;
