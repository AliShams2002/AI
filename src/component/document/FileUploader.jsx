import React, { useState, useRef, useContext } from "react";
import { CheckCircle, Trash2, RotateCcw } from "lucide-react";
import { MainContext } from "../../context/MainContext";

const FileUploader = () => {
  const [files, setFiles] = useState([]);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);
    const { sidebarIsOpen, setSidebarIsOpen } = useContext(MainContext);
  

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files).map((file) => ({
      name: file.name,
      size: file.size,
      div: 0,
      status: "uploading",
    }));

    setFiles((prev) => [...prev, ...newFiles]);
    newFiles.forEach((file, index) => simulateUpload(file, files.length + index));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    const newFiles = droppedFiles.map((file) => ({
      name: file.name,
      size: file.size,
      div: 0,
      status: "uploading",
    }));

    setFiles((prev) => [...prev, ...newFiles]);
    newFiles.forEach((file, index) => simulateUpload(file, files.length + index));
  };

  const simulateUpload = (file, index) => {
    let div = 0;
    const interval = setInterval(() => {
      if (div >= 100) {
        clearInterval(interval);
        const success = Math.random() > 0.3;
        setFiles((prev) => {
          const updated = [...prev];
          updated[index] = {
            ...updated[index],
            div: 100,
            status: success ? "success" : "failed",
          };
          return updated;
        });
      } else {
        div += 10;
        setFiles((prev) => {
          const updated = [...prev];
          updated[index] = {
            ...updated[index],
            div,
          };
          return updated;
        });
      }
    }, 300);
  };

  const retryUpload = (index) => {
    setFiles((prev) => {
      const updated = [...prev];
      updated[index].status = "uploading";
      updated[index].div = 0;
      return updated;
    });
    simulateUpload(files[index], index);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div
        className={`${
          sidebarIsOpen
            ? "w-full lg:w-[calc(100%-250px)]"
            : "w-full lg:w-[calc(100%-64px)]"
        } absolute top-0 ${
          sidebarIsOpen ? "lg:left-[250px]" : "lg:left-[64px]"
        } h-screen flex items-center gap-5 flex-col bg-blue-300 transition-all duration-500 p-5 text-5xl text-white-100`}
      >
      <div
        className={`block max-w-[600px] w-full p-6 border-2 border-dashed rounded-xl text-center cursor-pointer bg-blue-200 hover:bg-blue-100 transition-all duration-200 ${
          dragging ? "border-blue-100 bg-blue-100" : "border-blue-100"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current.click()}
      >
        <input
          type="file"
          multiple
          className="hidden"
          ref={inputRef}
          onChange={handleFileChange}
        />
        <p className="text-sm text-gray-500">
          Click here or drag and drop your files.<br />
          Supported Format: SVG, JPG, PNG (10mb each)
        </p>
      </div>

      <div className="mt-6 space-y-4">
        {files.map((file, index) => (
          <div
            key={index}
            className={`flex items-center p-4 rounded-xl shadow border justify-between ${
              file.status === "success"
                ? "border-blue-100"
                : file.status === "failed"
                ? "border-red-700"
                : "border-blue-100"
            }`}
          >
            <div className="flex items-start space-x-4 min-w-64 md:min-w-96 w-full">
              <div className="mt-1">
                <div
                  className={`p-2 rounded-full ${
                    file.status === "success"
                      ? "bg-white-100 text-green-600"
                      : file.status === "failed"
                      ? "bg-red-100 text-red-600"
                      : "bg-violet-100 text-violet-600"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 16v-4m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm">{file.name}</p>
                {file.status === "success" ? (
                  <p className="text-green-600 text-xs mt-1">Upload Successful!</p>
                ) : file.status === "failed" ? (
                  <p className="text-red-600 text-xs mt-1">
                    Upload failed! Please try again.
                  </p>
                ) : (
                  <p className="text-gray-500 text-xs mt-1">
                    {Math.round(file.size / 1e6 * 100) / 100} MB
                  </p>
                )}
                <div
                  value={file.div}
                  className={`h-2 mt-2 ${
                    file.status === "success"
                      ? "bg-green-200"
                      : file.status === "failed"
                      ? "bg-red-200"
                      : "bg-violet-200"
                  }`}
                />
              </div>
            </div>
            <div className="ml-4">
              {file.status === "success" ? (
                <CheckCircle className="text-green-500" />
              ) : file.status === "failed" ? (
                <div className="flex items-center space-x-2">
                  <button onClick={() => retryUpload(index)}>
                    <span className="text-xs text-blue-600 hover:underline">
                      Try Again
                    </span>
                  </button>
                  <button onClick={() => removeFile(index)}>
                    <Trash2 className="text-red-500" />
                  </button>
                </div>
              ) : (
                <button onClick={() => removeFile(index)}>
                  <Trash2 className="text-gray-400 hover:text-red-500" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUploader;
