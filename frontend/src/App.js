import React from "react";
import { Routes, Route } from "react-router-dom";
import PdfUpload from "./components/PdfUpload";
import Podcast from "./components/Podcast";
import Ppt from "./components/Ppt";
import Summary from "./components/Summary";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PdfUpload />} />
      <Route path="/summary" element={<Summary />} />
      <Route path="/podcast" element={<Podcast />} />
      <Route path="/ppt" element={<Ppt />} />
    </Routes>
  );
}

export default App;
