import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdSummarize, MdOutlineMic, MdSlideshow } from "react-icons/md";
import { usePdf } from "../context/PdfContext";
import { ImSpinner8 } from "react-icons/im";

function PdfUpload() {
  const { setPdfData, selectedFileName, setSelectedFileName, showOptions, setShowOptions, setSummary } = usePdf();
  const [file, setFile] = useState(null);
  const [uploadClick, setUploadClick] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setSelectedFileName(selectedFile.name);
      setUploadClick(true);
      setShowOptions(false);
      setSummary("");
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      toast.error("Please select a file before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    setUploadClick(false);
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data && response.data.text) {
        setPdfData(response.data.text);
        toast.success("PDF uploaded and text extracted successfully!");
        setShowOptions(true);
      } else {
        toast.error("Failed to extract text. Please try again.");
      }
    } catch (error) {
      toast.error("Error uploading file. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-indigo-50 to-purple-100">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-md p-6 transition-all duration-300">
        
        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">Upload PDF</h1>
        
        {/* Upload Section */}
        <label
          htmlFor="file-upload"
          className="cursor-pointer flex flex-col items-center justify-center gap-3 p-5 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-500 transition-all duration-300 bg-gray-50 hover:bg-indigo-50"
        >
          <FaCloudUploadAlt className="text-5xl text-indigo-500 hover:text-indigo-600 transition-all duration-300" />
          <p className="text-gray-700 text-sm font-medium">Drag & Drop or Click to Upload</p>
          <p className="text-gray-500 text-xs">Only PDF files are supported</p>
        </label>
        <input id="file-upload" type="file" accept=".pdf" onChange={handleFileChange} className="hidden" />

        {/* Selected File Display */}
        {selectedFileName && (
          <p className="text-center text-gray-700 mt-3 font-medium text-sm">
            File: <span className="text-indigo-600 font-semibold">{selectedFileName}</span>
          </p>
        )}

        {/* Upload Button */}
        <button
          onClick={handleFileUpload}
          className={`w-full mt-4 py-2.5 font-semibold text-sm rounded-lg transition-all duration-300 flex items-center justify-center ${
            uploadClick
              ? "bg-indigo-500 text-white hover:bg-indigo-600 shadow-md hover:shadow-lg"
              : "bg-gray-400 text-gray-700 cursor-not-allowed"
          }`}
          disabled={!uploadClick || isLoading}
        >
          {isLoading ? <ImSpinner8 className="animate-spin text-lg mr-2" /> : "Upload & Process"}
        </button>
      </div>

      {/* Options Section */}
      {showOptions && (
        <div className="w-full max-w-lg bg-white rounded-xl shadow-md p-6 mt-6">
          <h2 className="text-lg font-semibold text-gray-800 text-center mb-4">Choose an Action</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Summary */}
            <div
              className="p-4 flex flex-col items-center justify-center bg-green-100 rounded-lg cursor-pointer hover:bg-green-200 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105"
              onClick={() => navigate("/summary")}
            >
              <MdSummarize className="text-4xl text-green-700 mb-2" />
              <span className="text-sm font-medium text-gray-800">Summary</span>
            </div>

            {/* Podcast */}
            <div
              className="p-4 flex flex-col items-center justify-center bg-purple-100 rounded-lg cursor-pointer hover:bg-purple-200 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105"
              onClick={() => navigate("/podcast")}
            >
              <MdOutlineMic className="text-4xl text-purple-700 mb-2" />
              <span className="text-sm font-medium text-gray-800">Podcast</span>
            </div>

            {/* PPT */}
            <div
              className="p-4 flex flex-col items-center justify-center bg-orange-100 rounded-lg cursor-pointer hover:bg-orange-200 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105"
              onClick={() => navigate("/ppt")}
            >
              <MdSlideshow className="text-4xl text-orange-700 mb-2" />
              <span className="text-sm font-medium text-gray-800">PPT</span>
            </div>

          </div>
        </div>
      )}
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}

export default PdfUpload;
