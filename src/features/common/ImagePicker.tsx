"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { Icon, Image } from "@/ui";

interface ImagePickerProps {
  images: string[];
  onChange: (newImages: any[]) => void;
  multiple?: boolean;
  isDisabled?: boolean;
}

const ImagePicker = (props: ImagePickerProps) => {
  const { images = [], onChange, multiple = false, isDisabled } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const dragCounter = useRef(0);

  const handleSelectClick = () => {
    if (!isDisabled) inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const rawFiles = Array.from(e.target.files);
    handleFiles(rawFiles);
    e.target.value = "";
  };

  const handleFiles = (rawFiles: File[]) => {
    const imageFiles = rawFiles.filter((file) => file.type.startsWith("image/"));
    if (!imageFiles.length) return;

    const newUrls = imageFiles.map((file) => URL.createObjectURL(file));
    const updated = multiple ? [...images, ...newUrls] : [newUrls[0]];
    onChange(imageFiles);
  };

  const handleDrop = (e: DragEvent) => {
    if (isDisabled) return;
    e.preventDefault();
    dragCounter.current = 0;
    setDragging(false);

    const rawFiles = Array.from(e.dataTransfer?.files || []);
    handleFiles(rawFiles);
  };

  const handleDragEnter = (e: DragEvent) => {
    if (isDisabled) return;
    e.preventDefault();
    dragCounter.current += 1;
    if (dragCounter.current === 1) setDragging(true);
  };

  const handleDragLeave = (e: DragEvent) => {
    if (isDisabled) return;
    e.preventDefault();
    dragCounter.current -= 1;
    if (dragCounter.current === 0) setDragging(false);
  };

  const handleDragOver = (e: DragEvent) => {
    if (isDisabled) return;
    e.preventDefault();
  };

  useEffect(() => {
    window.addEventListener("dragenter", handleDragEnter);
    window.addEventListener("dragleave", handleDragLeave);
    window.addEventListener("dragover", handleDragOver);
    window.addEventListener("drop", handleDrop);

    return () => {
      window.removeEventListener("dragenter", handleDragEnter);
      window.removeEventListener("dragleave", handleDragLeave);
      window.removeEventListener("dragover", handleDragOver);
      window.removeEventListener("drop", handleDrop);
    };
  }, [images, isDisabled]);

  const handleRemove = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <>
      {/* Dragging overlay */}
      {dragging && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 dark:bg-black/30 backdrop-blur-md">
          <div className="flex flex-col items-center justify-center gap-4 animate-fade-in px-6">
            <div className="relative w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-lg">
              <Icon name="Upload" size={40} />
            </div>
            <p className="text-lg font-semibold text-center text-gray-800 dark:text-gray-100">
              Drop images to upload
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Supports JPG, PNG, WEBP
            </p>
          </div>
        </div>
      )}

      {/* Main container */}
      <div className="flex flex-col gap-3">
        <div
          className={cn(
            "border-2 border-dashed rounded-xl flex flex-col items-center justify-center py-8 cursor-pointer hover:border-primary transition-colors relative",
            isDisabled && "opacity-50 cursor-not-allowed"
          )}
          onClick={handleSelectClick}
        >
          {/* {images?.length > 0 ? (
            <div className={cn(images?.length === 1 ? "" : "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 ", "w-full gap-3 px-4 overflow-x-auto")}>
              {images.map((src, index) => (
                <div
                  key={index}
                  className="relative group rounded-xl overflow-hidden border border-border bg-gray-50"
                >
                  <Image
                    src={src}
                    alt={`Gastro ${index}`}
                    className={cn(images?.length === 1 ? "w-fit" : "object-cover w-full h-28")}
                  />
                  {!isDisabled && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(index);
                      }}
                      className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                    >
                      <Icon name="Close" size={14} iconClassName="!stroke-white" strokeWidth={2} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : ( */}
            <div className="flex flex-col items-center justify-center gap-2 text-center">
              <Icon name="Upload" size={36} />
              <p className="text-sm text-gray-600">
                Click or drag & drop image(s)
              </p>
            </div>
          {/* )} */}
        </div>

        <input
          ref={inputRef}
          type="file"
          hidden
          multiple={multiple}
          accept="image/*"
          disabled={isDisabled}
          onChange={handleFileChange}
        />
      </div>
    </>
  );
};

export default ImagePicker;
