import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const readouturl="https://code.responsivevoice.org/responsivevoice.js";


function PDFTranslation() {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [language, setLanguage] = useState('en');
  const [detectedLanguage, setDetectedLanguage] = useState('Unknown');
  const [loading, setLoading] = useState(false);  

  // Handle file input change
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Handle PDF text extraction
  const handleExtractText = async () => {
    if (!file) {
      alert('Please select a PDF file');
      return;
    }

    const formData = new FormData();
    formData.append('pdf', file);

    try {
      const response = await axios.post('http://localhost:5000/api/extract-text', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setExtractedText(response.data.text); // Set the extracted text
    } catch (error) {
      console.error('Error extracting text:', error);
    }
  };

  // Handle language detection (assuming backend handles this)
  const handleDetectLanguage = async () => {
    if (!extractedText) {
      alert('Please extract text first');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/detect-language', { text: extractedText });
      setDetectedLanguage(response.data.language); // Set the detected language
    } catch (error) {
      console.error('Error detecting language:', error);
    }
  };


  const handleTranslate = async () => {
    if (!extractedText || !language) {
      alert('Please extract text first');
      return;
    }

    setLoading(true);  // Start loading

    try {
      // Send the extracted text and selected language to the backend
      const response = await axios.post('http://localhost:5000/api/translate', { 
        text: extractedText, 
        language: language 
      });

      setTranslatedText(response.data.translatedText);  // Set the translated text from the response
    } catch (error) {
      console.error('Error translating text:', error);
      alert('Error translating text.');
    } finally {
      setLoading(false);  // Stop loading
    }
  };

  const handleReadOut = () => {
    if (!translatedText) {
      alert('No text to read out');
      return;
    }
  
    // Make sure the responsiveVoice library is loaded
    if (window.responsiveVoice) {
      // Read out the extracted text using ResponsiveVoice
      responsiveVoice.speak(translatedText, "UK English Male", { rate: 1, pitch: 1, volume: 1 });
    } else {
      alert("Text to Speech feature is not available.");
    }
  };

  
  const stopreadout = () => {
  // Make sure the responsiveVoice library is loaded
    if (window.responsiveVoice) {
      // Read out the extracted text using ResponsiveVoice
      responsiveVoice.cancel();
    } else {
      alert("Text to Speech feature is not available.");
    }
  };

  return (
    <>
      <div className="container py-4" id="extract">
        <h3>PDF Translation and Read Out Loud</h3>
        <p>Once PDF file is selected, its content will be shown in the textarea below. If needed, its language could be detected. Later, it could be read out loud!</p>
        
        {/* File upload */}
        <div className="mb-3">
        <form enctype="multipart/form-data" action="../../../../backend/uploads" method="post">
          <label htmlFor="inpfile" className="form-label">Select PDF:</label>
          <input type="file" className="form-control" id="inpfile" onChange={handleFileChange} />
          {/* <input type="file" className="form-control" id="inpfile" /> */}
          </form>
        </div>

        {/* Extract text button */}
        <button className="btn btn-primary" onClick={handleExtractText}>Extract Text</button>
      </div>

      <div className="container py-4">
        <h4>Original Text in PDF</h4>
        <div className="border border-warning p-2" style={{ height: '100px', width: '100%', overflow: 'scroll' }} id="origtext">
          {extractedText || 'This text will be replaced by text from the selected PDF file...'}
        </div>
      </div>

      <div className="container py-4">
        {/* Language detection */}
        <button className="btn btn-primary" onClick={handleDetectLanguage}>Detect Language</button>
        <input
          type="text"
          className="form-control d-inline-block ms-2"
          id="langname"
          placeholder="Unknown"
          value={detectedLanguage}
          style={{ maxWidth: '200px' }}
          disabled
        />
      </div>

      <div className="container py-4" id="translate">
        <h4>Translation</h4>
        <label htmlFor="langs" className="form-label">Choose a Language:</label>
        <select
          className="form-select"
          name="langs"
          id="langs"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="en">English (default)</option>
          <option value="it">Italian</option>
          <option value="es">Spanish</option>
          <option value="de">German</option>
        </select>

        {/* Translate button */}
        <button className="btn btn-primary mt-2" onClick={handleTranslate}>Translate</button>

        <div className="border border-warning p-2 mt-2" style={{ height: '100px', width: '100%', overflow: 'scroll' }} id="transtext">
          {translatedText || 'Translated text will be shown here ...'}
        </div>
      </div>

      {/* <div className="container py-4">
        <h4>Read Out</h4>
        <label htmlFor="readout" className="form-label">Click to Read Out Loud:</label>
        <button className="btn btn-primary" onClick={handleReadOut}><i className="fa fa-volume-up"></i></button>
        <button className="btn btn-primary" onClick={stopreadout}><i className="fa fa-volume-up"></i></button>
      </div> */}

    <div className="container py-4" id="readout">
      <h4>Read Out</h4>
      <label htmlFor="readout" className="form-label me-2">Click to Read Out Loud:</label>
      <button className="btn btn-primary me-2" onClick={handleReadOut}>
        <i className="fa fa-volume-up"></i> Read Out
      </button>
      <button className="btn btn-danger ms-2" onClick={stopreadout}>
        <span role="img" aria-label="cancel">❌</span> Cancel
      </button>
    </div>

    </>
  );
}

export default PDFTranslation;
