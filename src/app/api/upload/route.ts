import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const orderId = formData.get('orderId') as string | null;

    if (!file) {
      return NextResponse.json({ message: 'No file found.' }, { status: 400 });
    }
    if (!orderId) {
      return NextResponse.json({ message: 'No orderId found.' }, { status: 400 });
    }

    console.log(`Received file for order ${orderId}: ${file.name}, size: ${file.size} bytes`);

    // In a real app, you would upload this to a storage service (e.g., Google Cloud Storage, AWS S3)
    // and save the URL to your database.

    const mockFileUrl = `https://fake-storage.com/reports/${file.name}`;

    return NextResponse.json({ 
        message: 'File uploaded successfully.',
        orderId,
        url: mockFileUrl
     }, { status: 200 });

  } catch (error) {
    console.error('Upload API error:', error);
    return NextResponse.json({ message: 'Error processing upload.' }, { status: 500 });
  }
}
