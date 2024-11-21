# WordWave: Audio Translate Hub

**WordWave** is a web platform that enables seamless audio translation across languages. It extracts text from PDFs, translates it into the desired language, and reads it aloud to the user. This platform leverages modern web technologies and APIs to deliver an interactive and user-friendly experience.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Usage](#usage)
- [Tech Stack](#tech-stack)

## Project Overview

WordWave combines audio translation, PDF text extraction, and language readout capabilities into a single web application. The intuitive interface ensures accessibility for a diverse audience, enhancing communication and learning experiences.

## Features

- **PDF Text Extraction**: Upload a PDF file and extract its text seamlessly.
- **Language Translation**: Translate extracted text into any desired language using the Google Translation API.
- **Read-Aloud Functionality**: Use the Responsive Voice API to convert translated text into speech.
- **Responsive Design**: Built with Bootstrap for a modern and mobile-friendly interface.

## Getting Started

These instructions will help you set up and run the project locally.

### Prerequisites

- **Node.js** (v12 or higher)
- **Git**
- **XAMPP** (for MySQL and PHP support)

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/WordWave.git
   cd WordWave
2. **Install the dependencies**:
   ```bash
   cd backend
    npm install
   cd frontend
     npm install
   
### Running the Application
1.  **Start the Backend Server**:
```bash
cd backend
npm run dev
```
The backend will run on port 5000.

2.  **Start the Frontend**:

```bash
cd frontend
npm start
```
The frontend will run on port 3000.

Your application should now be running with the backend and frontend connected.

### Usage

Open your browser and navigate to http://localhost:3000.
Use the platform to:
Upload a PDF file.
Translate its content into a target language.
Listen to the translated text using the read-aloud feature.

## Technologies

- **Frontend**:  
  React, Bootstrap 

- **Backend**:  
  Node.js, Express.js ,PHP

- **Database**:  
  MySQL (via XAMPP)  

- **APIs**:  
  Google Translation API, Responsive Voice API (for text-to-speech functionality)  

- **Tools**:  
  Git (version control), dotenv (environment variable management)  
