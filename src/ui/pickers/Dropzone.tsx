// components/Dropzone.tsx
"use client";
import { Icon } from "@/ui";
import { useCallback, useState } from "react";
import { useDropzone, FileRejection } from "react-dropzone";

interface DropzoneProps {
  value: any;
  onChange: (e?: any) => void;
}

const Dropzone = (props: DropzoneProps) => {
  const { value, onChange } = props;

  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      // Filter only PDF files
      const allowedFiles = acceptedFiles.filter((file) =>
        [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "text/plain",
        ].includes(file.type)
      );

      if (allowedFiles.length > 0) {
        const newFiles = [...value, ...allowedFiles];
        onChange(newFiles);
        setError(null);
      }

      if (fileRejections.length > 0) {
        setError("Only PDF, DOC, DOCX, and TXT files are allowed.");
      }
    },
    [value, onChange]
  );

  const removeFile = (fileToRemove: File) => {
    const updatedFiles = value?.filter((file: any) => file !== fileToRemove);

    onChange(updatedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [],
      "application/msword": [],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [],
      "text/plain": [],
    },
    multiple: true,
  });

  return (
    <div className="mt-6 w-full">
      <div
        {...getRootProps()}
        className={`w-full flex flex-col items-center justify-center cursor-pointer border h-full rounded-lg p-6 transition py-10 
                    ${isDragActive ? "border-blue-500 bg-blue-100" : ""}`}
      >
        <input {...getInputProps()} />
        <Icon name="Upload" />
        <p className="text-gray-500 !text-sm">
          Drag and drop files here, or click to select files
        </p>
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {value?.length ? (
        <div className="mt-4 bg-white rounded-lg divide-gray-200">
          <div className="p-4 border-b border-gray-200 text-gray-500 font-semibold">
            Selected Files
          </div>
          <ul className="divide-y overflow-y-auto max-h-[200px]">
            {value.map((file: any, index: any) => (
              <li
                key={index}
                className="flex relative items-center justify-between p-4 text-sm"
              >
                <div className="flex items-center overflow-hidden">
                  <div className="w-8 h-8 bg-red-100 text-red-500 flex items-center justify-center rounded mr-4">
                    PDF
                  </div>
                  <div>
                    <p className="text-gray-700 ">{file.name}</p>
                    <p className="text-gray-400">
                      {(file.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => removeFile(file)}
                  className="text-gray-400 bg-white p-3 absolute right-0 hover:text-red-500"
                >
                  &#10005;
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Dropzone;
