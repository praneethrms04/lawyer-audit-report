import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generatePdf = async (elements: HTMLElement[]): Promise<Blob> => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pdfWidth = 210;
  const pdfHeight = 297;

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    
    const canvas = await html2canvas(element, {
      scale: 3, // Higher scale for better quality
      useCORS: true,
      logging: false,
    });
    
    const imgData = canvas.toDataURL('image/png');
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    if (i > 0) {
      pdf.addPage();
    }
    
    // Add the image to the PDF, ensuring it doesn't exceed the page height.
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight > pdfHeight ? pdfHeight : imgHeight);
  }

  return pdf.output('blob');
};
