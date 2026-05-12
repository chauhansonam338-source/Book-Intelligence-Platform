# Book Intelligence Platform

A full-stack AI-powered application that enables users to explore books, generate insights, and perform intelligent semantic search using a Retrieval-Augmented Generation (RAG) pipeline.

---

## Overview

This system allows users to:

- Add books with metadata
- Automatically generate AI-based summaries and genres
- Get intelligent book recommendations using semantic similarity
- Ask natural language questions about books
- Scrape books from external sources

The platform combines traditional backend engineering with modern AI techniques such as embeddings, vector search, and local LLM inference.

---

## Features

### 1. Book Management
- Add books via API or UI
- Store title, author, description, rating, and URL
- Automatic AI enrichment:
  - Summary generation
  - Genre classification

---

### 2. Semantic Recommendation System
- Uses FAISS vector database
- Recommendations based on embedding similarity (not keyword matching)
- Provides context-aware suggestions:
  - "If you like X, you’ll like Y"

---

### 3. RAG-Based Q&A System
- Accepts natural language queries
- Retrieves relevant books using FAISS
- Constructs context dynamically
- Uses local LLM (Mistral 7B via LM Studio) to generate answers
- Returns answer with source references

---

### 4. Web Scraper
- Selenium-based scraper
- Collects book data from external sources
- Can be triggered via API

---

### 5. Performance Enhancements
- In-memory caching for repeated queries
- Fast similarity search using FAISS
- Clean API design for efficient data flow

---

## Tech Stack

### Backend
- Django
- Django REST Framework

### Frontend
- React
- Tailwind CSS

### AI / ML
- Sentence Transformers (all-MiniLM-L6-v2)
- FAISS (vector search)
- Local LLM (Mistral 7B via LM Studio)

### Tools
- Selenium (web scraping)
- Axios (API communication)

---

## System Architecture

1. Book is added → stored in database  
2. Description is converted into embeddings  
3. Embeddings stored in FAISS index  
4. Query triggers:
   - Vector similarity search
   - Context retrieval
   - LLM-based answer generation  

---

## Project Structure
book-intelligence-platform/

backend (book_ai/)
├── book_ai/
├── books/
├── manage.py
└── requirements.txt

frontend/
├── src/
├── package.json

README.md
.gitignore


---

## Setup Instructions

### 1. Clone Repository
git clone <your-repo-link>
cd <repo-name>


---

### 2. Backend Setup
cd book_ai
python -m venv myenv

## Windows

myenv\Scripts\activate

## Mac/Linux
source myenv/bin/activate

pip install -r requirements.txt

python manage.py migrate
python manage.py runserver


---

### 3. Frontend Setup
cd frontend
npm install
npm run dev


---

### 4. Start Local LLM (Important)

This project uses a local LLM via LM Studio.

Steps:
- Open LM Studio
- Load a model (recommended: mistral-7b-instruct)
- Start local server

Default endpoint:
http://127.0.0.1:1234


---

### 5. Access Application

- Frontend: http://localhost:5173  
- Backend: http://127.0.0.1:8000  

---

## API Endpoints

### Books

- `GET /api/books/`  
  Retrieve all books

- `POST /api/books/`  
  Add a new book (triggers AI processing)

- `GET /api/books/<id>/`  
  Retrieve book details

---

### Recommendations

- `GET /api/books/<id>/recommend/`  
  Returns semantically similar books using FAISS

---

### Query (RAG)

- `POST /api/query/`

Request:
{
"question": "What is this book about?"
}

Response:
{
"answer": "...",
"sources": [
{
"title": "...",
"description": "..."
}
]
}


---

### Scraper

- `POST /api/scrape/`  
  Starts background scraping process

---

## Important Notes

- FAISS is an in-memory vector store.  
  The index is rebuilt at server startup using existing database entries.

- Ensure LM Studio is running before using:
  - Query API
  - Summary/genre generation

---

## Design Decisions

- AI insights are generated at ingestion time to reduce query latency  
- Semantic similarity is preferred over keyword matching for recommendations  
- RAG pipeline ensures grounded, context-aware responses  
- Local LLM is used to avoid external API dependency  

---

## Future Improvements

- Persistent vector database
- Advanced chunking for better RAG performance
- Async task queue (Celery) for AI processing
- User personalization
- Deployment setup

---

## Author

Developed as part of an AI internship assignment to demonstrate:
- Backend system design
- Applied machine learning integration
- End-to-end product thinking


