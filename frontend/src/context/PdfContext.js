import { createContext, useContext, useState } from "react";

const PdfContext = createContext();

export const PdfProvider = ({ children }) => {
  const [pdfData, setPdfData] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [summary, setSummary] = useState(""); 
  const [pptFilePath, setPptFilePath] = useState(""); 
  const [podcastPath, setPodcastPath] = useState(""); // Store podcast path

  // Function to reset states when a new file is uploaded
  const updateSelectedFileName = (fileName) => {
    if (fileName !== selectedFileName) {
      setSelectedFileName(fileName);
      setPodcastPath(""); // Reset podcast **only when a new file is uploaded**
      setSummary(""); 
    }
  };

  return (
    <PdfContext.Provider value={{ 
      pdfData, setPdfData, 
      selectedFileName, setSelectedFileName: updateSelectedFileName,  
      showOptions, setShowOptions, 
      summary, setSummary,
      pptFilePath, setPptFilePath,
      podcastPath, setPodcastPath // Provide podcast path state
    }}>
      {children}
    </PdfContext.Provider>
  );
};

export const usePdf = () => useContext(PdfContext);
