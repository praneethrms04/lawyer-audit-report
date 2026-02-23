import React from 'react';
import type { ReportData } from '@/types/report';
import PageWrapper from './PageWrapper';
import DynamicTable from './DynamicTable';

interface PageOneProps {
  data: ReportData;
  generatedDate: string;
}

const DetailItem = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex py-2 border-b border-gray-200">
    <p className="w-1/3 font-semibold text-gray-600">{label}</p>
    <p className="w-2/3 text-gray-800">{value ?? 'N/A'}</p>
  </div>
);

const PageOne = React.forwardRef<HTMLDivElement, PageOneProps>(({ data, generatedDate }, ref) => {
  return (
    <PageWrapper ref={ref} currentPage={1} generatedDate={generatedDate}>
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Order & Registration Details</h2>
        <div className="space-y-1">
          <DetailItem label="SRN" value={data.srn} />
          <DetailItem label="State" value={data.STATE.name} />
          <DetailItem label="SRO" value={`${data.SR_CODE.value.name} (${data.SR_CODE.value.code})`} />
          <DetailItem label="Document Number" value={data.DOCUMENT_NUMBER.value} />
          <DetailItem label="Registration Year" value={data.YEAR.value} />
          <DetailItem label="PTIN" value={data.PTIN.value} />
          <DetailItem label="Status" value={data.status} />
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-2">EC Records</h3>
          <DynamicTable
            headers={['Deed No', 'Deed Date', 'Deed Type', 'First Party', 'Second Party', 'SRO']}
            data={data.jaagaFetch.ecRecords}
          />
        </div>
      </div>
    </PageWrapper>
  );
});

PageOne.displayName = 'PageOne';
export default PageOne;
