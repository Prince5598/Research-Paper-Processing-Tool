import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { usePdf } from "../context/PdfContext";

function Summary() {
  const { summary, setSummary, selectedFileName } = usePdf();
  const [loading, setLoading] = useState(!summary);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedFileName) {
      setError("No file selected. Please upload a file first.");
      setLoading(false);
      return;
    }

    if (summary) {
      setLoading(false);
      return;
    }

    const fetchSummary = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await axios.post("http://localhost:5000/summarize", { filename: selectedFileName });

        if (response.data?.summary) {
          setSummary(response.data.summary);
        } else {
          setError("Failed to generate summary.");
        }
      } catch (err) {
        setError("Error fetching summary. Please try again.");
      }

      setLoading(false);
    };

    fetchSummary();
  }, [selectedFileName, setSummary]);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
      <h1 className="text-3xl font-semibold text-center text-blue-600 mb-5">Generated Summary</h1>

      {loading ? (
        <p className="text-gray-600 text-center animate-pulse">Generating summary, please wait...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 max-h-96 overflow-y-auto text-gray-700 text-left whitespace-pre-line leading-relaxed">
          {summary}
        </div>
      )}

      <div className="flex justify-center mt-6">
        <button 
          onClick={() => navigate(-1)} 
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default Summary;
