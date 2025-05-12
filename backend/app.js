import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';
import fs from 'fs';
import pdfParse from 'pdf-parse';
import axios from 'axios';

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Upload middleware
const upload = multer({ dest: 'uploads/' });

// Health check
app.get('/', (req, res) => {
  res.send('✅ Hello from Node backend!');
});

// Extract text from uploaded PDF
app.post('/api/extract-text', upload.single('pdf'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const dataBuffer = fs.readFileSync(req.file.path);
    const parsedData = await pdfParse(dataBuffer);
    res.json({ text: parsedData.text });
  } catch (err) {
    console.error('❌ Error extracting PDF:', err.message);
    res.status(500).json({ error: 'Failed to extract text from PDF' });
  } finally {
    try {
      fs.unlinkSync(req.file.path); // Cleanup
    } catch (err) {
      console.error('❌ File deletion error:', err.message);
    }
  }
});

// Detect language
app.post('/api/detect-language', async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  try {
    const response = await axios.post('https://translate.argosopentech.com/detect', {
      q: text
    }, {
      headers: { 'Content-Type': 'application/json' }
    });

    const detected = response.data && response.data[0]?.language;
    res.json({ language: detected || 'unknown' });
  } catch (err) {
    console.error('❌ Language detection error:', err.message);
    res.status(500).json({ error: 'Language detection failed' });
  }
});

// Translate text
app.post('/api/translate', async (req, res) => {
  const { text, language } = req.body;
  console.log("Text to translate:", text);
  console.log("Target language:", language);
console.log( ` env is ${process.env.RAPIDAPI_KEY} `)
  if (!text || !language) {
    return res.status(400).json({ error: 'Text and language are required' });
  }

  try {
    const response = await axios.post(
      'https://free-google-translator.p.rapidapi.com/external-api/free-google-translator',
      {
        from: 'en',
        to: language,
        query: text,
      },
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-rapidapi-key': process.env.RAPIDAPI_KEY,
          'x-rapidapi-host': 'free-google-translator.p.rapidapi.com',
        },
      }
    );

    console.log("Translated:", response.data.translation);
    res.json({ translatedText: response.data.translation });
  } catch (error) {
    console.error('❌ Error during translation:', error.message);
    res.status(500).json({ error: 'Failed to translate text' });
  }
});

export default app;
