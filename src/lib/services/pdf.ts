import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generatePdf = async (elements: HTMLElement[]): Promise<Blob> => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pdfWidth = 210;
  const pdfHeight = 297;

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    
    // Temporarily ensure visibility for capture if needed, though position absolute off-screen usually works
    const originalStyle = element.style.cssText;
    element.style.position = 'static';
    element.style.opacity = '1';

    const canvas = await html2canvas(element, {
      scale: 3, // Higher scale for better quality
      useCORS: true,
      logging: false,
    });
    
    // Restore original style
    element.style.cssText = originalStyle;

    const imgData = canvas.toDataURL('image/png');
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    let heightLeft = imgHeight;
    let position = 0;

    if (i > 0) {
      pdf.addPage();
    }
    
    // This logic is simplified; for this app, one canvas fits one page.
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight > pdfHeight ? pdfHeight : imgHeight);
    heightLeft -= pdfHeight;

    while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
    }
  }

  return pdf.output('blob');
};
