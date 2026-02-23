import axios from 'axios';

const API_ENDPOINT = '/api/upload'; // Using a local mock endpoint

export const uploadPdf = async (orderId: string, file: Blob): Promise<{ orderId: string; url: string }> => {
  const formData = new FormData();
  formData.append('orderId', orderId);
  formData.append('file', file, `${orderId}-report.pdf`);

  try {
    const response = await axios.post(API_ENDPOINT, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to upload PDF');
    }
    throw new Error('An unexpected error occurred during upload.');
  }
};
