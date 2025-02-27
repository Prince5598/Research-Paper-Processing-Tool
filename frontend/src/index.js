import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { PdfProvider } from "./context/PdfContext"; // Import PdfProvider
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <PdfProvider>
      <App />
    </PdfProvider>
  </BrowserRouter>
);
