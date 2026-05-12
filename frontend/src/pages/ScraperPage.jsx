import React, { useState } from 'react';
import api from '../api/axios';

const STATUS = {
  idle: { label: 'Idle', className: 'text-slate-400' },
  running: { label: 'Running', className: 'text-amber-500' },
  completed: { label: 'Completed', className: 'text-emerald-600' },
  error: { label: 'Error', className: 'text-red-500' },
};

const ScraperPage = () => {
  const [status, setStatus] = useState('idle');

  const handleRunScraper = async () => {
    setStatus('running');

    try {
      await api.post('scrape/');
      setStatus('completed');
    } catch {
      setStatus('error');
    }
  };

  const current = STATUS[status];

  return (
    <main
      className="flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] px-6"
      aria-label="Scraper page"
    >
      <button
        id="scraper-run-btn"
        type="button"
        onClick={handleRunScraper}
        disabled={status === 'running'}
        className="px-6 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-medium
                   hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500
                   focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed
                   transition-colors"
      >
        Run Scraper
      </button>

      <p
        id="scraper-status"
        aria-live="polite"
        className={`mt-4 text-sm font-medium ${current.className}`}
      >
        {current.label}
      </p>
    </main>
  );
};

export default ScraperPage;
