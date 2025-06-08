import imageCompression from 'browser-image-compression';

export const processFileToUpload = async (files: File[]) => {
  const formData = new FormData();

  for (const file of files) {
    let processedFile = file;

    // Only compress images
    if (file.type.startsWith('image/')) {
      try {
        processedFile = await imageCompression(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
        });
      } catch (err) {
        console.error(`Compression failed for ${file.name}:`, err);
      }
    }

    formData.append('files', processedFile, processedFile.name);
  }

  return formData;
};
