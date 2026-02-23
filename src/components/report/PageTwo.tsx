import React from 'react';
import type { ReportData } from '@/types/report';
import PageWrapper from './PageWrapper';
import DynamicTable from './DynamicTable';

interface PageTwoProps {
  data: ReportData;
  generatedDate: string;
}

const DetailItem = ({ label, value }: { label:string, value: string | undefined }) => (
  <div className="flex py-2 border-b border-gray-200">
    <p className="w-1/3 font-semibold text-gray-600">{label}</p>
    <p className="w-2/3 text-gray-800">{value || 'N/A'}</p>
  </div>
);

const Boundaries = ({ boundaries }: { boundaries: ReportData['jaagaFetch']['propertyInfo']['Boundaries'] }) => (
  <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-2 p-3 bg-gray-50 rounded-md">
    <div><span className="font-semibold text-gray-600">North:</span> {boundaries.North}</div>
    <div><span className="font-semibold text-gray-600">South:</span> {boundaries.South}</div>
    <div><span className="font-semibold text-gray-600">East:</span> {boundaries.East}</div>
    <div><span className="font-semibold text-gray-600">West:</span> {boundaries.West}</div>
  </div>
);


const PageTwo = React.forwardRef<HTMLDivElement, PageTwoProps>(({ data, generatedDate }, ref) => {
  const { propertyInfo, taxdetails, Property_Investment_Overview } = data.jaagaFetch;

  return (
    <PageWrapper ref={ref} currentPage={2} generatedDate={generatedDate}>
      <div className="space-y-6">
        
        <div>
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Property Information</h2>
          <div className="space-y-1 mt-2">
            <DetailItem label="Owner" value={propertyInfo.Owner} />
            <DetailItem label="Built Area" value={propertyInfo['Built Area']} />
            <DetailItem label="Survey" value={propertyInfo.Survey} />
            <DetailItem label="Block" value={propertyInfo.Block} />
            <DetailItem label="Extent" value={propertyInfo.Extent} />
            <DetailItem label="Village" value={propertyInfo.Village} />
            <DetailItem label="Address" value={propertyInfo.Address} />
            <div className="py-2">
              <p className="font-semibold text-gray-600">Boundaries</p>
              <Boundaries boundaries={propertyInfo.Boundaries} />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mt-6">Tax Details</h2>
          <div className="space-y-1 mt-2">
            <DetailItem label="Property ID" value={taxdetails.PropertyID} />
            <DetailItem label="Owner Name" value={taxdetails.OwnerName} />
            <DetailItem label="Locality" value={taxdetails.Locality} />
            <DetailItem label="Plinth Area" value={taxdetails.PlinthArea} />
            <DetailItem label="Annual Tax" value={taxdetails.AnnualTax} />
            <DetailItem label="Arrear Tax" value={taxdetails.ArrearTax} />
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mt-6">Property Investment Overview</h2>
          <DynamicTable
            headers={['Registration Value', 'Consideration Value']}
            data={Property_Investment_Overview}
          />
        </div>

      </div>
    </PageWrapper>
  );
});

PageTwo.displayName = 'PageTwo';
export default PageTwo;
