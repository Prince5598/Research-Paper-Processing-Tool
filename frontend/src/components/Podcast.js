import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { usePdf } from "../context/PdfContext";

function Podcast() {
  const { summary, setSummary, selectedFileName, podcastPath, setPodcastPath } = usePdf();
  const [loading, setLoading] = useState(!podcastPath);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const hasFetchedPodcast = useRef(false); // Prevent duplicate calls

  useEffect(() => {
    if (!selectedFileName || hasFetchedPodcast.current || podcastPath) return; // Use existing podcast

    hasFetchedPodcast.current = true;
    setLoading(true);
    setError("");

    const fetchPodcast = async () => {
      try {
        let finalSummary = summary;

        // Generate summary if not available
        if (!summary) {
          const summaryResponse = await axios.post("http://localhost:5000/summarize", { filename: selectedFileName });
          console.log("summary")
          if (summaryResponse.data?.summary) {
            finalSummary = summaryResponse.data.summary;
            setSummary(finalSummary);
          } else {
            throw new Error("Failed to generate summary.");
          }
        }

        // Generate podcast
        const podcastResponse = await axios.post("http://localhost:5000/generate_podcast", { filename: selectedFileName });
        console.log("podcast")
        if (podcastResponse.data?.podcast_path) {
          setPodcastPath(podcastResponse.data.podcast_path); // Save in context
        } else {
          throw new Error("Failed to generate podcast.");
        }
      } catch (err) {
        setError("Error generating podcast. Please try again.");
      }

      setLoading(false);
    };

    fetchPodcast();
  }, [selectedFileName, podcastPath]); // Depend on `podcastPath`

  return (
    <div className="max-w-2xl mx-auto mt-10 p-5 border rounded-lg shadow-lg bg-white">
      <h1 className="text-2xl font-semibold text-center mb-5">Generated Podcast</h1>

      {loading ? (
        <p className="text-gray-600 text-center">Generating podcast, please wait...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="text-center">
          <p className="text-gray-700 mb-4">Your podcast is ready!</p>
          <audio controls className="w-full mb-4">
            <source src={`http://localhost:5000/${podcastPath}`} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
          <a
            href={`http://localhost:5000/output/${podcastPath.split("/").pop()}`}
            download
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
          >
            Download Podcast
          </a>
        </div>
      )}

      <div className="flex justify-between mt-4">
        <button onClick={() => navigate(-1)} className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
          Go Back
        </button>
      </div>
    </div>
  );
}

export default Podcast;
