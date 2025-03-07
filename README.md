# 🚀 **Research Paper Processing Tool**  

This project is a web-based tool that allows users to **upload research papers (PDFs)** and generate various outputs, such as **text summaries, podcasts, and PowerPoint presentations**.  

---

## ✨ **Features**  

### 📂 **PDF Upload**  
- Users can upload research papers in PDF format.  

### 🔍 **Text Extraction**  
- Extracts text content from the uploaded PDF.  

### 📜 **Summarization**  
- Generates a concise summary of the research paper using AI models.  

### 🎙 **Podcast Generation**  
- Converts the research paper into an **audio podcast** using AI voice synthesis.  

### 📊 **PPT Generation**  
- Creates **PowerPoint slides** based on the extracted content for presentations.  

### 🌐 **React Frontend**  
- A user-friendly interface built with **React and Tailwind CSS**.  

### 🖥 **Flask Backend**  
- A lightweight backend to handle **text processing and API calls**.  

---

## 🛠 **Technologies Used**  

### 🖥 **Frontend (React + Tailwind CSS)**  
- **React Router** – Handles navigation between different pages.  
- **Axios** – Sends HTTP requests to the Flask backend.  
- **React Icons** – Provides icons for a better UI experience.  
- **Toastify** – Displays notifications for user actions.  

### 🔗 **Backend (Flask)**  
- **Flask** – Handles file uploads and API requests.  
- **PyMuPDF** – Extracts text from PDF files.  
- **Gemini 1.5 Flash** – Generates summaries.  
- **LLaMA 3.3** – Used for podcast script and slide content generation.  
- **Flask-CORS** – Enables cross-origin requests between frontend and backend.  

---

## 🏗 **How the Code Works**  

### 1️⃣ **Uploading a PDF**  
📌 The `PdfUpload.js` component provides a UI for users to upload a PDF.  
📌 When a file is selected, it is stored in the component's state.  
📌 The file is sent to the backend using `axios.post()`.  

### 2️⃣ **Text Extraction from PDF**  
📌 The Flask backend receives the uploaded file.  
📌 It uses `pymupdf4llm` (a PDF processing library) to extract text.  

### 3️⃣ **Generating a Summary**  
📌 The extracted text is sent to **Gemini 1.5 Flash** for summarization.  
📌 The AI processes the content and returns a **structured summary**.  
📌 The summary is displayed on the frontend in the `Summary.js` component.  

### 4️⃣ **Podcast Creation**  
📌 The **summary** is converted into an audio script.  
📌 The script is sent to **LLaMA 3.3** to generate speech.  
📌 The backend processes the response and returns an **audio file**.  
📌 The frontend provides **playback controls** for listening to the podcast.  

### 5️⃣ **Generating a PPT**  
📌 The extracted text is **segmented into slide content**.  
📌 The backend uses **LLaMA 3.3** to format the content into **slide points**.  
📌 The generated **PowerPoint file** is provided for download.  

## 🛠**API Configuration**
- Create API key from Google AI Studio and paste it in below code.
```
genai.configure(api_key="GOOGLE_API_KEY")
```
- Create 5 API keys from Groq and add it in below line.
```
api_keys = [
    "Groq_API_KEY1",
    "Groq_API_KEY2",
    "Groq_API_KEY3",
    "Groq_API_KEY4",
    "Groq_API_KEY5"
]
``` 
---

## 🚀 **How to Run the Project**  

### 1️⃣ **Clone the Repository**  
```sh
git clone https://github.com/Prince5598/InsightScribe.git
```

