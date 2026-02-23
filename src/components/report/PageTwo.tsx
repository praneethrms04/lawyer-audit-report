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
    <PageWrapper ref={ref} currentPage={2} totalPages={3} generatedDate={generatedDate}>
        <section className="flex flex-col h-full">
            <h2 className="text-xl font-semibold text-gray-800 border-b-2 pb-2 mb-4">
                Encumbrance Certificate (EC) Records
            </h2>
            {ecRecords.length > 0 ? (
                 <div className="border rounded-lg overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-100 hover:bg-gray-100">
                                <TableHead className="font-bold text-gray-700 border-r w-[10%]">Deed No</TableHead>
                                <TableHead className="font-bold text-gray-700 border-r w-[10%]">Deed Date</TableHead>
                                <TableHead className="font-bold text-gray-700 border-r w-[10%]">Deed Type</TableHead>
                                <TableHead className="font-bold text-gray-700 border-r w-[30%]">First Party Name</TableHead>
                                <TableHead className="font-bold text-gray-700 border-r w-[30%]">Second Party Name</TableHead>
                                <TableHead className="font-bold text-gray-700 w-[10%]">SRO</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                        {ecRecords.map((record, index) => (
                            <TableRow key={index} className="border-b align-top">
                                <TableCell className="border-r">{record.deedNo}</TableCell>
                                <TableCell className="border-r">{record.deedDate}</TableCell>
                                <TableCell className="border-r">{record.deedType}</TableCell>
                                <TableCell className="break-words border-r">{record.firstPartyName}</TableCell>
                                <TableCell className="break-words border-r">{record.secondPartyName}</TableCell>
                                <TableCell>{record.sro}</TableCell>
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
