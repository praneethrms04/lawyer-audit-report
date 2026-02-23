import React from 'react';
import type { ReportData } from '@/types/report';
import PageWrapper from './PageWrapper';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';

interface PageTwoProps {
  data: ReportData;
  generatedDate: string;
}

const PageTwo = React.forwardRef<HTMLDivElement, PageTwoProps>(({ data, generatedDate }, ref) => {
    const { ecRecords } = data.jaagaFetch;

  return (
    <PageWrapper ref={ref} currentPage={2} generatedDate={generatedDate}>
        <section className="space-y-6 flex flex-col h-full">
            <h2 className="text-xl font-semibold text-gray-800 border-b-2 pb-2">
                Encumbrance Certificate (EC) Records
            </h2>
            {ecRecords.length > 0 ? (
                 <div className="border rounded-lg overflow-hidden mt-4">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-100 hover:bg-gray-100">
                                <TableHead className="font-bold text-gray-700">Deed Details</TableHead>
                                <TableHead className="font-bold text-gray-700">Parties</TableHead>
                                <TableHead className="font-bold text-gray-700">SRO</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                        {ecRecords.map((record, index) => (
                            <TableRow key={index} className="border-b align-top" style={{ pageBreakInside: 'avoid' }}>
                                <TableCell className="w-1/3">
                                    <div className="font-medium">Deed No: {record.deedNo}</div>
                                    <div className="text-gray-600">Date: {record.deedDate}</div>
                                    <div className="text-gray-600">Type: {record.deedType}</div>
                                </TableCell>
                                <TableCell className="w-1/3">
                                    <div className='mb-2'>
                                        <p className="font-semibold text-gray-500 text-xs">Executant (Seller):</p>
                                        <p className="text-gray-800 break-words">{record.firstPartyName}</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-500 text-xs">Claimant (Buyer):</p>
                                        <p className="text-gray-800 break-words">{record.secondPartyName}</p>
                                    </div>
                                </TableCell>
                                <TableCell className="w-1/3">{record.sro}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                 </div>
            ) : (
                <div className="h-24 bg-gray-50 rounded-md border border-dashed border-gray-300 p-4 text-center text-sm text-gray-500 flex items-center justify-center mt-4">
                    <span>No Encumbrance Certificate records found.</span>
                </div>
            )}
        </section>
    </PageWrapper>
  );
});

PageTwo.displayName = 'PageTwo';
export default PageTwo;
