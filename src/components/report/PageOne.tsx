import React from 'react';
import Image from 'next/image';
import type { ReportData, PropertyInfo } from '@/types/report';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface PageOneProps {
  data: ReportData;
  generatedDate: string;
}

const DetailItem = ({ label, value }: { label:string, value: React.ReactNode }) => (
    <div className="flex py-2 border-b border-gray-200 text-sm">
      <p className="w-1/3 font-semibold text-gray-600">{label}</p>
      <p className="w-2/3 text-gray-800">{value ?? 'N/A'}</p>
    </div>
  );
  
const Boundaries = ({ boundaries }: { boundaries: PropertyInfo['boundaries'] }) => (
    <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-2 p-3 bg-gray-50 rounded-md text-xs">
      <div><span className="font-semibold text-gray-600">North:</span> {boundaries['[N]'] || 'N/A'}</div>
      <div><span className="font-semibold text-gray-600">South:</span> {boundaries['[S]'] || 'N/A'}</div>
      <div><span className="font-semibold text-gray-600">East:</span> {boundaries['[E]'] || 'N/A'}</div>
      <div><span className="font-semibold text-gray-600">West:</span> {boundaries['[W]'] || 'N/A'}</div>
    </div>
);

const PageOne = React.forwardRef<HTMLDivElement, PageOneProps>(({ data, generatedDate }, ref) => {
  const { propertyInfo, taxdetails, ecRecords } = data.jaagaFetch;

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

      <section className="text-center my-6">
        <h2 className="text-2xl font-bold tracking-wider text-gray-800">
          PROPERTY VERIFICATION REPORT
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Official Legal Due Diligence Summary
        </p>
      </section>

      <div className="flex-grow space-y-4">
        <section>
          <h3 className="text-lg font-semibold text-gray-800 mb-2 border-b pb-2">
            Property Information
          </h3>
          <div className="space-y-1">
            <DetailItem label="Owner" value={propertyInfo.propertyOwnerName} />
            <DetailItem label="Address" value={propertyInfo.address} />
            <DetailItem label="Village" value={propertyInfo.village} />
            <div className="py-2">
                <p className="font-semibold text-gray-600 text-sm">Boundaries</p>
                <Boundaries boundaries={propertyInfo.boundaries} />
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-gray-800 mb-2 border-b pb-2">
            Tax Details
          </h3>
          <div className="space-y-1">
            <DetailItem label="Property ID" value={taxdetails.propertyId} />
            <DetailItem label="Owner Name" value={taxdetails.ownerName} />
            <DetailItem label="Annual Tax" value={new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(Number(taxdetails.annualTax))} />
          </div>
        </section>
        
        <section>
            <h3 className="text-lg font-semibold text-gray-800 mb-2 border-b pb-2">
            Encumbrance Certificate (EC) Records
            </h3>
            {ecRecords.length > 0 ? (
            <Table>
                <TableHeader>
                <TableRow className="bg-gray-50">
                    <TableHead className="font-bold text-gray-600 w-[15%]">Deed No / Date</TableHead>
                    <TableHead className="font-bold text-gray-600">First Party (Seller)</TableHead>
                    <TableHead className="font-bold text-gray-600">Second Party (Buyer)</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {ecRecords.map((record, index) => (
                    <TableRow key={index} className="align-top text-xs">
                    <TableCell>
                        <p className="font-medium">{record.deedNo}</p>
                        <p className="text-gray-500">{record.deedDate}</p>
                    </TableCell>
                    <TableCell>{record.firstPartyName}</TableCell>
                    <TableCell>{record.secondPartyName}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            ) : (
            <div className="h-24 bg-gray-50 rounded-md border border-dashed border-gray-300 p-4 text-center text-sm text-gray-500 flex items-center justify-center">
                <span>No Encumbrance Certificate records found.</span>
            </div>
            )}
        </section>
      </div>
    </div>
  );
});

PageOne.displayName = 'PageOne';
export default PageOne;
