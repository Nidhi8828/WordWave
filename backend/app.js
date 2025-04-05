// backend/app.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';
import fs from 'fs';
import pdfParse from 'pdf-parse';
import * as googleTranslate from '@vitalets/google-translate-api';

import axios from 'axios';


const app = express();
app.use(cors());
app.use(bodyParser.json());

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

// Translate text
app.post('/api/translate', async (req, res) => {
  const { text, language } = req.body;

  if (!text || !language) {
    return res.status(400).json({ error: 'Text and language are required' });
  }

  try {
    const response = await axios.post('https://translate.argosopentech.com/translate', {
      q: text,
      source: 'en',
      target: language,
      format: 'text'
    }, {
      headers: { 'Content-Type': 'application/json' }
    });

    res.json({ translatedText: response.data.translatedText });
  } catch (err) {
    console.error('❌ Translation error:', err.message);
    res.status(500).json({ error: 'Translation failed' });
  }
});


export default app;
