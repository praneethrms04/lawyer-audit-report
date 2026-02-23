import React from 'react';
import type { ReportData, PropertyInfo } from '@/types/report';
import PageWrapper from './PageWrapper';
import DynamicTable from './DynamicTable';

interface PageTwoProps {
  data: ReportData;
  generatedDate: string;
}

const DetailItem = ({ label, value }: { label:string, value: React.ReactNode }) => (
  <div className="flex py-2 border-b border-gray-200">
    <p className="w-1/3 font-semibold text-gray-600">{label}</p>
    <p className="w-2/3 text-gray-800">{value ?? 'N/A'}</p>
  </div>
);

const Boundaries = ({ boundaries }: { boundaries: PropertyInfo['boundaries'] }) => (
  <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-2 p-3 bg-gray-50 rounded-md">
    <div><span className="font-semibold text-gray-600">North:</span> {boundaries['[N]'] || 'N/A'}</div>
    <div><span className="font-semibold text-gray-600">South:</span> {boundaries['[S]'] || 'N/A'}</div>
    <div><span className="font-semibold text-gray-600">East:</span> {boundaries['[E]'] || 'N/A'}</div>
    <div><span className="font-semibold text-gray-600">West:</span> {boundaries['[W]'] || 'N/A'}</div>
  </div>
);


const PageTwo = React.forwardRef<HTMLDivElement, PageTwoProps>(({ data, generatedDate }, ref) => {
  const { propertyInfo, taxdetails, Property_Investment_Overview } = data.jaagaFetch;

  const investmentData = Property_Investment_Overview.reduce((acc, item) => {
    acc[item.field] = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(Number(item.value));
    return acc;
  }, {} as Record<string, string>);

  const investmentTableData = [
    {
      "Registration Value": investmentData["Registration Value"] || "N/A",
      "Consideration Value": investmentData["Consideration Value"] || "N/A",
    }
  ];

  return (
    <PageWrapper ref={ref} currentPage={2} generatedDate={generatedDate}>
      <div className="space-y-6">
        
        <div>
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Property Information</h2>
          <div className="space-y-1 mt-2">
            <DetailItem label="Owner" value={propertyInfo.propertyOwnerName} />
            <DetailItem label="Built Area" value={propertyInfo.built} />
            <DetailItem label="Survey" value={propertyInfo.survey} />
            <DetailItem label="Block" value={propertyInfo.block} />
            <DetailItem label="Extent" value={propertyInfo.extent} />
            <DetailItem label="Village" value={propertyInfo.village} />
            <DetailItem label="Address" value={propertyInfo.address} />
            <div className="py-2">
              <p className="font-semibold text-gray-600">Boundaries</p>
              <Boundaries boundaries={propertyInfo.boundaries} />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mt-6">Tax Details</h2>
          <div className="space-y-1 mt-2">
            <DetailItem label="Property ID" value={taxdetails.propertyId} />
            <DetailItem label="Owner Name" value={taxdetails.ownerName} />
            <DetailItem label="Locality" value={taxdetails.locality} />
            <DetailItem label="Plinth Area" value={taxdetails.plinthArea ?? 'N/A'} />
            <DetailItem label="Annual Tax" value={new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(Number(taxdetails.annualTax))} />
            <DetailItem label="Arrear Tax" value={taxdetails.arrearTax} />
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mt-6">Property Investment Overview</h2>
          <DynamicTable
            headers={['Registration Value', 'Consideration Value']}
            data={investmentTableData}
          />
        </div>

      </div>
    </PageWrapper>
  );
});

PageTwo.displayName = 'PageTwo';
export default PageTwo;
