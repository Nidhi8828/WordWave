import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function PDFTranslation() {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [language, setLanguage] = useState("en");
  const [detectedLanguage, setDetectedLanguage] = useState("Unknown");
  const [loading, setLoading] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState("");

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
      alert("Please select a PDF file");
      return;
    }

    const formData = new FormData();
    formData.append("doc", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/extract-text",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setExtractedText(response.data.text);
    } catch (error) {
      console.error("❌ Error extracting text:", error);
      alert("Failed to extract text from PDF");
    }
  };

  const handleDetectLanguage = async () => {
    if (!extractedText) {
      alert("Please extract text first");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/detect-language",
        { text: extractedText }
      );
      setDetectedLanguage(response.data.language);
    } catch (error) {
      console.error("❌ Error detecting language:", error);
      alert("Failed to detect language");
    }
  };

  const handleTranslate = async () => {
    if (!extractedText || !language) {
      alert("Please extract text first");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/translate", {
        text: extractedText,
        language: language,
      });

      setTranslatedText(response.data.translatedText);
    } catch (error) {
      console.error("❌ Error translating text:", error);
      alert("Failed to translate text");
    } finally {
      setLoading(false);
    }
  };

  const downloadTextFile = (text, filename = "translation.txt") => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url); // free the memory resources
  };

  const handleReadOut = () => {
    if (!translatedText) {
      alert("No text to read out");
      return;
    }

    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(translatedText);
      const voice = voices.find((v) => v.name === selectedVoice);
      if (voice) {
        utterance.voice = voice;
      }
      utterance.lang = voice?.lang || language;
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text to Speech feature is not available.");
    }
  };

  const stopreadout = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  };

  return (
    <>
      <div className="container py-4" id="extract">
        <h3>PDF Translation and Read Out Loud</h3>
        <p>
          Select a PDF file, extract its text, and translate or read it aloud.
        </p>

        <div className="mb-3">
          <label htmlFor="inpfile" className="form-label">
            Select Document:
          </label>
          <input
            type="file"
            className="form-control"
            id="inpfile"
            accept=".pdf,.doc,.docx,.txt,.rtf,.odt"
            onChange={handleFileChange}
          />
        </div>

        <button className="btn btn-primary" onClick={handleExtractText}>
          Extract Text
        </button>
      </div>

      <div className="container py-4">
        <h4>Original Text in PDF</h4>
        <div
          className="border border-warning p-2"
          style={{ height: "100px", overflowY: "scroll" }}
        >
          {extractedText ||
            "This text will be replaced by text from the selected PDF file..."}
        </div>
      </div>

      <div className="container py-4">
        <button className="btn btn-primary" onClick={handleDetectLanguage}>
          Detect Language
        </button>
        <input
          type="text"
          className="form-control d-inline-block ms-2"
          placeholder="Unknown"
          value={detectedLanguage}
          style={{ maxWidth: "200px" }}
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
          <option value="af">Afrikaans</option>
          <option value="sq">Albanian</option>
          <option value="am">Amharic</option>
          <option value="ar">Arabic</option>
          <option value="hy">Armenian</option>
          <option value="az">Azerbaijani</option>
          <option value="eu">Basque</option>
          <option value="be">Belarusian</option>
          <option value="bn">Bengali</option>
          <option value="bs">Bosnian</option>
          <option value="bg">Bulgarian</option>
          <option value="ca">Catalan</option>
          <option value="ceb">Cebuano</option>
          <option value="ny">Chichewa</option>
          <option value="zh-CN">Chinese (Simplified)</option>
          <option value="zh-TW">Chinese (Traditional)</option>
          <option value="co">Corsican</option>
          <option value="hr">Croatian</option>
          <option value="cs">Czech</option>
          <option value="da">Danish</option>
          <option value="nl">Dutch</option>
          <option value="eo">Esperanto</option>
          <option value="et">Estonian</option>
          <option value="tl">Filipino</option>
          <option value="fi">Finnish</option>
          <option value="fr">French</option>
          <option value="fy">Frisian</option>
          <option value="gl">Galician</option>
          <option value="ka">Georgian</option>
          <option value="el">Greek</option>
          <option value="gu">Gujarati</option>
          <option value="ht">Haitian Creole</option>
          <option value="ha">Hausa</option>
          <option value="haw">Hawaiian</option>
          <option value="iw">Hebrew</option>
          <option value="hmn">Hmong</option>
          <option value="hu">Hungarian</option>
          <option value="is">Icelandic</option>
          <option value="ig">Igbo</option>
          <option value="id">Indonesian</option>
          <option value="ga">Irish</option>
          <option value="ja">Japanese</option>
          <option value="jw">Javanese</option>
          <option value="kn">Kannada</option>
          <option value="kk">Kazakh</option>
          <option value="km">Khmer</option>
          <option value="rw">Kinyarwanda</option>
          <option value="ko">Korean</option>
          <option value="ku">Kurdish (Kurmanji)</option>
          <option value="ky">Kyrgyz</option>
          <option value="lo">Lao</option>
          <option value="la">Latin</option>
          <option value="lv">Latvian</option>
          <option value="lt">Lithuanian</option>
          <option value="lb">Luxembourgish</option>
          <option value="mk">Macedonian</option>
          <option value="mg">Malagasy</option>
          <option value="ms">Malay</option>
          <option value="ml">Malayalam</option>
          <option value="mt">Maltese</option>
          <option value="mi">Maori</option>
          <option value="mr">Marathi</option>
          <option value="mn">Mongolian</option>
          <option value="my">Myanmar (Burmese)</option>
          <option value="ne">Nepali</option>
          <option value="no">Norwegian</option>
          <option value="or">Odia (Oriya)</option>
          <option value="ps">Pashto</option>
          <option value="fa">Persian</option>
          <option value="pl">Polish</option>
          <option value="pt">Portuguese</option>
          <option value="pa">Punjabi</option>
          <option value="ro">Romanian</option>
          <option value="ru">Russian</option>
          <option value="sm">Samoan</option>
          <option value="gd">Scots Gaelic</option>
          <option value="sr">Serbian</option>
          <option value="st">Sesotho</option>
          <option value="sn">Shona</option>
          <option value="sd">Sindhi</option>
          <option value="si">Sinhala (Sinhalese)</option>
          <option value="sk">Slovak</option>
          <option value="sl">Slovenian</option>
          <option value="so">Somali</option>
          <option value="su">Sundanese</option>
          <option value="sw">Swahili</option>
          <option value="sv">Swedish</option>
          <option value="tg">Tajik</option>
          <option value="ta">Tamil</option>
          <option value="te">Telugu</option>
          <option value="th">Thai</option>
          <option value="tr">Turkish</option>
          <option value="uk">Ukrainian</option>
          <option value="ur">Urdu</option>
          <option value="ug">Uyghur</option>
          <option value="uz">Uzbek</option>
          <option value="vi">Vietnamese</option>
          <option value="cy">Welsh</option>
          <option value="xh">Xhosa</option>
          <option value="yi">Yiddish</option>
          <option value="yo">Yoruba</option>
          <option value="zu">Zulu</option>
        </select>

        <button
          className="btn btn-primary mt-2"
          onClick={handleTranslate}
          disabled={loading}
        >
          {loading ? "Translating..." : "Translate"}
        </button>

        <div
          className="border border-warning p-2 mt-2"
          style={{ height: "100px", overflowY: "scroll" }}
        >
          {translatedText || "Translated text will be shown here ..."}
        </div>

        {translatedText && (
          <button
            className="btn btn-primary mt-2"
            onClick={() => downloadTextFile(translatedText)}
          >
            Download Translation
          </button>
        )}
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
