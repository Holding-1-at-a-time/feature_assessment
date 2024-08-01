import { useState } from 'react';
import { useMutation } from 'convex/react';
import { toast } from '@/components/ui/use-toast';
import { api } from '../../convex/_generated/api';
import { useFormContext } from 'react-hook-form';
import { Button, Label, Progress } from '@/components/ui';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/quicktime'];

const FileUploadsComponent = () => {
  const { register, setValue } = useFormContext();
  const uploadPhotoMetadata = useMutation(api.assessments.uploadPhotoMetadata);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileUpload = async (event) => {
    try {
      const files = Array.from(event.target.files);
      const validFiles = files.filter(file =>
        ALLOWED_IMAGE_TYPES.includes(file.type) || ALLOWED_VIDEO_TYPES.includes(file.type)
      );

      if (validFiles.length > 0) {
        // Upload files to Cloudinary and get URLs
        const uploadedFiles = await Promise.all(validFiles.map(async (file) => {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('upload_preset', 'your_upload_preset');
          const response = await fetch('https://api.cloudinary.com/v1_1/your_cloud_name/upload', {
            method: 'POST',
            body: formData,
          });
          const data = await response.json();
          return { url: data.secure_url, type: file.type };
        }));

        // Store file metadata
        await uploadPhotoMetadata({ files: uploadedFiles });

        // Update form context
        setValue('images', uploadedFiles.filter(file => ALLOWED_IMAGE_TYPES.includes(file.type)));
        setValue('videos', uploadedFiles.filter(file => ALLOWED_VIDEO_TYPES.includes(file.type)));
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload files. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <Label>Upload Images/Videos</Label>
      <input type="file" multiple onChange={handleFileUpload} />
      <Progress value={uploadProgress} />
    </div>
  );
};

export default FileUploadsComponent;