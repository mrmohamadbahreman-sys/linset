'use client';
import { useState, useRef } from 'react';

interface ImageUploaderProps {
  onUpload: (url: string) => void;
  currentImage?: string;
  folder?: string;
  label?: string;
}

export default function ImageUploader({ 
  onUpload, 
  currentImage, 
  folder = 'projects',
  label = 'آپلود تصویر'
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentImage || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // نمایش پیش‌نمایش
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // آپلود فایل
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      
      if (data.success) {
        onUpload(data.url);
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert('خطا در آپلود');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview('');
    onUpload('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">{label}</label>
      
      <div className="flex gap-3 items-start flex-wrap">
        {/* دکمه آپلود */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {uploading ? 'در حال آپلود...' : 'انتخاب فایل'}
        </button>
        
        {/* دکمه حذف */}
        {preview && (
          <button
            type="button"
            onClick={handleRemove}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            حذف
          </button>
        )}
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
      
      {/* پیش‌نمایش */}
      {preview && (
        <div className="mt-3 relative inline-block">
          <img 
            src={preview} 
            alt="Preview" 
            className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs text-center py-1 rounded-b-lg">
            {uploading ? 'در حال آپلود...' : 'آپلود شد'}
          </div>
        </div>
      )}
    </div>
  );
}