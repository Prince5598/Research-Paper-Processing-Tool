import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePdf } from "../context/PdfContext";
import { FaCloudDownloadAlt, FaSpinner } from "react-icons/fa"; // Importing icons

function Ppt() {
  const { selectedFileName, pptFilePath, setPptFilePath } = usePdf();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const handleGeneratePpt = async () => {
    if (!selectedFileName) {
      toast.error("No file uploaded. Please upload a PDF first.");
      return;
    }

    setLoading(true);

    try {
      console.log("Generating PPT for:", selectedFileName);
      const response = await axios.post(
        "http://localhost:5000/generate_ppt",
        { filename: selectedFileName },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data && response.data.ppt_path) {
        toast.success("PPT generated successfully!");
        setPptFilePath(response.data.ppt_path); // Store the generated file path
      } else {
        toast.error("Failed to generate PPT.");
      }
    } catch (error) {
      toast.error("Error generating PPT. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white text-center">
      <h1 className="text-3xl font-semibold mb-4 text-blue-600">Generate PPT</h1>

      <p className="text-gray-700 mb-4">
        Selected File: <span className="font-semibold">{selectedFileName || "No file uploaded"}</span>
      </p>

      {/* Button for generating PPT */}
      <button
        onClick={handleGeneratePpt}
        className={`w-full text-white p-3 mt-4 rounded-lg transition duration-300 ${
          selectedFileName && !pptFilePath
            ? "bg-blue-500 hover:bg-blue-600"
            : "bg-gray-400 cursor-not-allowed"
        }`}
        disabled={!selectedFileName || loading || pptFilePath}
      >
        {loading ? (
          <div className="flex justify-center items-center">
            <FaSpinner className="animate-spin mr-2" />
            Generating...
          </div>
        ) : pptFilePath ? (
          "PPT Already Generated"
        ) : (
          "Generate PPT"
        )}
      </button>

      {/* Display the download link if PPT file path exists */}
      {pptFilePath && (
        <div className="mt-5">
          <a
            href={`http://localhost:5000/download/${pptFilePath}`}
            download
            className="flex justify-center items-center text-green-600 font-semibold text-lg hover:text-green-700"
          >
            <FaCloudDownloadAlt className="mr-2" />
            📂 Download PPT
          </a>
        </div>
      )}

      {pptFilePath &&
      (<button
        onClick={() => navigate(-1)}
        className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Go Back
      </button>)
      }
      <ToastContainer />
    </div>
  );
}

export default Ppt;
