import React from 'react';
import Image from 'next/image';
import type { ReportData } from '@/types/report';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface PageOneProps {
  data: ReportData;
  generatedDate: string;
}

const PageOne = React.forwardRef<HTMLDivElement, PageOneProps>(({ data, generatedDate }, ref) => {
  const ecRecords = data.jaagaFetch?.ecRecords || [];

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

      {/* EC Records Section */}
      <section className="flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
          Encumbrance Certificate (EC) Records
        </h3>
        {ecRecords.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-bold text-gray-600 w-[15%]">Deed No / Date</TableHead>
                <TableHead className="font-bold text-gray-600 w-[15%]">Deed Type</TableHead>
                <TableHead className="font-bold text-gray-600">First Party (Seller)</TableHead>
                <TableHead className="font-bold text-gray-600">Second Party (Buyer)</TableHead>
                <TableHead className="font-bold text-gray-600 w-[15%]">SRO</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ecRecords.map((record, index) => (
                <TableRow key={index} className="align-top">
                  <TableCell className="text-xs">
                    <p className="font-medium">{record.deedNo}</p>
                    <p className="text-gray-500">{record.deedDate}</p>
                  </TableCell>
                  <TableCell className="text-xs">{record.deedType}</TableCell>
                  <TableCell className="text-xs">{record.firstPartyName}</TableCell>
                  <TableCell className="text-xs">{record.secondPartyName}</TableCell>
                  <TableCell className="text-xs">{record.sro}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="h-40 bg-gray-50 rounded-md border border-dashed border-gray-300 p-4 text-center text-sm text-gray-500 flex items-center justify-center">
            <span>No Encumbrance Certificate records found.</span>
          </div>
        )}
      </section>
    </div>
  );
});

PageOne.displayName = 'PageOne';
export default PageOne;
