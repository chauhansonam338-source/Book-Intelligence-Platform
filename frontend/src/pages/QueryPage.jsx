import React, { useState } from 'react';
import { Loader2, Sparkles, BookOpen } from 'lucide-react';
import api from '../api/axios';

const QueryPage = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState(null);
  const [sources, setSources] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsLoading(true);
    setError(null);
    setAnswer(null);
    setSources([]);

    try {
      const res = await api.post('query/', { question });
      setAnswer(res.data.answer);
      setSources(res.data.sources);
    } catch {
      setError('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <main
        className="max-w-2xl mx-auto px-6 py-16"
        aria-label="Ask AI page"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-semibold text-indigo-600 mb-5">
            <Sparkles size={11} aria-hidden="true" />
            AI-Powered
          </div>

          <h1
            id="query-page-title"
            className="text-3xl font-semibold tracking-tight text-slate-900 mb-3"
          >
            Ask Questions Based on Available Books
          </h1>
          <p
            id="query-page-subtitle"
            className="text-sm text-slate-500"
          >
            This AI answers only using books stored in the platform.
          </p>
        </div>

        <form
          id="query-form"
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 mb-8"
        >
          <input
            id="query-input"
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="e.g. What is Atomic Habits about?"
            disabled={isLoading}
            required
            aria-label="Your question"
            className="flex-1 px-5 py-3 rounded-xl border border-slate-300 bg-white
                       text-slate-800 placeholder:text-slate-400 text-sm
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                       disabled:opacity-50 transition-all duration-200 shadow-sm"
          />
          <button
            id="query-submit-btn"
            type="submit"
            disabled={isLoading || !question.trim()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl
                       bg-gradient-to-r from-indigo-600 to-purple-600
                       hover:from-indigo-700 hover:to-purple-700
                       text-white text-sm font-semibold whitespace-nowrap
                       hover:scale-[1.02] hover:shadow-md active:scale-100
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                       transition-all duration-200 ease-in-out"
          >
            {isLoading ? (
              <>
                <Loader2 size={14} className="animate-spin" aria-hidden="true" />
                Asking…
              </>
            ) : (
              'Ask AI'
            )}
          </button>
        </form>

        {isLoading && (
          <div
            id="query-loading"
            role="status"
            aria-live="polite"
            className="bg-white border border-slate-200 rounded-xl shadow-sm px-7 py-8 animate-pulse"
          >
            <div className="h-3 bg-slate-100 rounded-full w-1/4 mb-4" />
            <div className="space-y-2.5">
              <div className="h-3 bg-slate-100 rounded-full w-full" />
              <div className="h-3 bg-slate-100 rounded-full w-5/6" />
              <div className="h-3 bg-slate-100 rounded-full w-4/6" />
            </div>
          </div>
        )}

        {error && !isLoading && (
          <div
            id="query-error"
            role="alert"
            className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-5 py-3.5"
          >
            {error}
          </div>
        )}

        {answer !== null && !isLoading && (
          <section
            id="query-result"
            aria-label="Answer"
            className="bg-white border border-slate-200 rounded-xl shadow-md overflow-hidden"
          >
            <div id="query-answer-block" className="px-7 py-7">
              <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-4">
                Answer
              </p>
              <p
                id="query-answer-text"
                className="text-slate-800 text-base leading-7"
              >
                {answer}
              </p>
            </div>

            {sources.length > 0 && (
              <>
                <div className="border-t border-slate-100" aria-hidden="true" />
                <div id="query-sources-block" className="px-7 py-5 bg-slate-50">
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">
                    Sources
                  </p>
                  <ul
                    id="query-sources-list"
                    className="flex flex-col gap-2.5"
                    aria-label="Source books"
                  >
                    {sources.map((title, idx) => (
                      <li
                        key={idx}
                        id={`query-source-${idx}`}
                        className="flex items-center gap-2.5 text-sm text-slate-600 font-medium"
                      >
                        <BookOpen size={13} className="text-indigo-400 shrink-0" aria-hidden="true" />
                        {title}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </section>
        )}

        {answer === null && !isLoading && !error && (
          <div className="text-center text-slate-400 text-sm py-8">
            Ask a question to explore insights from your books.
          </div>
        )}

        <p
          id="query-helper-text"
          className="mt-8 text-xs text-slate-400 text-center"
        >
          Answers are generated only from available books in the system.
        </p>
      </main>
    </div>
  );
};

export default QueryPage;
