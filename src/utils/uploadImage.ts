export const handleImageUpload = async (
  file: File,
  setUser: React.Dispatch<React.SetStateAction<any>>,
  setUploadError: (msg: string) => void,
  setUploading: (state: boolean) => void,
  fileInputRef: React.RefObject<HTMLInputElement>
) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
  if (!allowedTypes.includes(file.type)) {
    setUploadError('Please select a valid image file (JPEG, PNG, WebP, or GIF)');
    return;
  }

  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    setUploadError('File size must be less than 5MB');
    return;
  }

  setUploading(true);
  setUploadError('');

  try {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/profile/uploadImage`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      setUploadError(data.error || 'Upload failed');
      return;
    }

    setUser((prev: any) => prev ? { ...prev, profileImage: data.imageUrl } : null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  } catch (err) {
    console.error('Upload error:', err);
    setUploadError('Network error. Please try again.');
  } finally {
    setUploading(false);
  }
};
