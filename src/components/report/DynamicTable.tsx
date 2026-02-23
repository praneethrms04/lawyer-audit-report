import React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';

interface DynamicTableProps {
  headers: string[];
  data: Record<string, any>[];
}

const DynamicTable = ({ headers, data }: DynamicTableProps) => {
  if (!data || data.length === 0) {
    return <p className="text-gray-500">No data available.</p>;
  }

  const dataKeys = Object.keys(data[0]);

  return (
    <div className="w-full my-4">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100">
            {headers.map((header) => (
              <TableHead key={header} className="font-bold text-gray-700">{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex} style={{ pageBreakInside: 'avoid' }} className="border-b">
              {dataKeys.map((key) => (
                <TableCell key={`${rowIndex}-${key}`}>{row[key] || 'N/A'}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DynamicTable;
