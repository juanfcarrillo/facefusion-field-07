
/**
 * Service for handling file uploads
 */

export async function uploadFaceImage(file: File): Promise<{ success: boolean; message: string }> {
  try {
    // Create a FormData instance
    const formData = new FormData();
    formData.append('file', file);
    
    // For demo purposes, we'll log the form data and simulate a successful upload
    console.log('Uploading file:', file.name, 'Size:', file.size, 'Type:', file.type);
    
    // In a real application, you would send this to your backend
    const response = await fetch(`${import.meta.env.VITE_ENDPOINT_URL}/upload`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const jsonResponse = await response.json();

    console.log('Response:', jsonResponse);
    
    // Return success response
    return {
      success: true,
      message: 'Image uploaded successfully'
    };
  } catch (error) {
    console.error('Upload error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to upload image'
    };
  }
}
