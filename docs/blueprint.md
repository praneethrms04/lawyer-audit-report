# **App Name**: Property Insights Reporter

## Core Features:

- Data Parsing & Transformation: Parse the JSON data, transforming it into a structure suitable for PDF generation.
- Dynamic PDF Generation: Generate a multi-page A4 PDF document using html2canvas and jsPDF, populating it with data from the parsed JSON.
- AI-Powered Risk Analysis: Use AI to extract key risks from the AIGeneratedDescription, format the findings, and present a conclusion.
- Preview and Print: Allow users to preview the generated PDF in a modal and print it directly from the application.
- Backend Upload: Upload the generated PDF to a backend API using Axios and FormData.
- UI Components: Build React components (ReportEngine, PageOne, PageTwo, PageThree, DynamicTable) to organize UI and PDF generation logic.
- Loading and Error Handling: Implement loading states and error handling to provide a smooth user experience during PDF generation and upload.

## Style Guidelines:

- Primary color: Deep navy blue (#003049) to convey professionalism and authority.
- Background color: Light gray (#F0F0F0) for a clean and neutral base.
- Accent color: Subtle teal (#A9D6E5) for interactive elements and highlights.
- Body and headline font: 'Inter' sans-serif for a modern, machined, objective, neutral look.
- Use simple, professional icons to represent data categories and actions.
- Employ a structured layout with clear section headings and consistent margins for a government report aesthetic.
- Use subtle loading animations to indicate progress during PDF generation and data uploading.