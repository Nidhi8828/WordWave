import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function PDFTranslation() {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [language, setLanguage] = useState('en');
  const [detectedLanguage, setDetectedLanguage] = useState('Unknown');
  const [loading, setLoading] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState('');

  // Load available voices on mount
  useEffect(() => {
    const synth = window.speechSynthesis;

    const loadVoices = () => {
      const voiceList = synth.getVoices();
      setVoices(voiceList);
      if (voiceList.length > 0 && !selectedVoice) {
        setSelectedVoice(voiceList[0].name);
      }
    };

    loadVoices();
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = loadVoices;
    }
  }, [selectedVoice]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleExtractText = async () => {
    if (!file) {
      alert('Please select a PDF file');
      return;
    }

    const formData = new FormData();
    formData.append('doc', file);

    try {
      const response = await axios.post('http://localhost:5000/api/extract-text', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setExtractedText(response.data.text);
    } catch (error) {
      console.error('❌ Error extracting text:', error);
      alert('Failed to extract text from PDF');
    }
  };

  const handleDetectLanguage = async () => {
    if (!extractedText) {
      alert('Please extract text first');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/detect-language', { text: extractedText });
      setDetectedLanguage(response.data.language);
    } catch (error) {
      console.error('❌ Error detecting language:', error);
      alert('Failed to detect language');
    }
  };

  const handleTranslate = async () => {
    if (!extractedText || !language) {
      alert('Please extract text first');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/translate', {
        text: extractedText,
        language: language
      });

      setTranslatedText(response.data.translatedText);
    } catch (error) {
      console.error('❌ Error translating text:', error);
      alert('Failed to translate text');
    } finally {
      setLoading(false);
    }
  };

  const handleReadOut = () => {
    if (!translatedText) {
      alert('No text to read out');
      return;
    }

    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(translatedText);
      const voice = voices.find(v => v.name === selectedVoice);
      if (voice) {
        utterance.voice = voice;
      }
      utterance.lang = voice?.lang || language;
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Text to Speech feature is not available.');
    }
  };

  const stopreadout = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  return (
    <>
      <div className="container py-4" id="extract">
        <h3>PDF Translation and Read Out Loud</h3>
        <p>Select a PDF file, extract its text, and translate or read it aloud.</p>

        <div className="mb-3">
          <label htmlFor="inpfile" className="form-label">Select Document:</label>
          <input
            type="file"
            className="form-control"
            id="inpfile"
            accept=".pdf,.doc,.docx,.txt,.rtf,.odt"
            onChange={handleFileChange}
          />
        </div>

        <button className="btn btn-primary" onClick={handleExtractText}>Extract Text</button>
      </div>

      <div className="container py-4">
        <h4>Original Text in PDF</h4>
        <div className="border border-warning p-2" style={{ height: '100px', overflowY: 'scroll' }}>
          {extractedText || 'This text will be replaced by text from the selected PDF file...'}
        </div>
      </div>

      <div className="container py-4">
        <button className="btn btn-primary" onClick={handleDetectLanguage}>Detect Language</button>
        <input
          type="text"
          className="form-control d-inline-block ms-2"
          placeholder="Unknown"
          value={detectedLanguage}
          style={{ maxWidth: '200px' }}
          disabled
        />
      </div>

      <div className="container py-4" id="translate">
        <h4>Translation</h4>
        <label className="form-label">Choose a Language:</label>
        <select
          className="form-select"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="en">English (default)</option>
          <option value="it">Italian</option>
          <option value="es">Spanish</option>
          <option value="de">German</option>
          <option value="hi">Hindi</option>
        </select>

        <button className="btn btn-primary mt-2" onClick={handleTranslate} disabled={loading}>
          {loading ? 'Translating...' : 'Translate'}
        </button>

        <div className="border border-warning p-2 mt-2" style={{ height: '100px', overflowY: 'scroll' }}>
          {translatedText || 'Translated text will be shown here ...'}
        </div>
      </div>

      <div className="container py-4">
        <label className="form-label">Choose Voice / Accent:</label>
        <select
          className="form-select"
          value={selectedVoice}
          onChange={(e) => setSelectedVoice(e.target.value)}
        >
          {voices.map((voice, index) => (
            <option key={index} value={voice.name}>
              {voice.name} ({voice.lang})
            </option>
          ))}
        </select>
      </div>

      <div className="container py-4" id="readout">
        <h4>Read Out</h4>
        <label className="form-label me-2">Click to Read Out Loud:</label>
        <button className="btn btn-primary me-2" onClick={handleReadOut}>
          🔊 Read Out
        </button>
        <button className="btn btn-danger ms-2" onClick={stopreadout}>
          ❌ Cancel
        </button>
      </div>
    </>
  );
}

export default PDFTranslation;
