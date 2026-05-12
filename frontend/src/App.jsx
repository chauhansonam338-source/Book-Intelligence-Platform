import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import BookDetailPage from './pages/BookDetailPage';
import AddBookPage from './pages/AddBookPage';
import QueryPage from './pages/QueryPage';
import ScraperPage from './pages/ScraperPage';

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 font-['Inter',sans-serif]">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/add" element={<AddBookPage />} />
          <Route path="/query" element={<QueryPage />} />
          <Route path="/scrape" element={<ScraperPage />} />
          <Route path="/book/:id" element={<BookDetailPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
