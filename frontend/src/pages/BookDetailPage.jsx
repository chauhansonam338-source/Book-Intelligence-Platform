import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, BookOpen, Sparkles } from 'lucide-react';
import api from '../api/axios';

const RecommendedCard = ({ id, title, author, rating, reason }) => {
  const navigate = useNavigate();

  return (
    <article
      id={`recommended-card-${id}`}
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/book/${id}`)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          navigate(`/book/${id}`);
        }
      }}
      aria-label={`View details for ${title} by ${author}`}
      className="min-w-[160px] max-w-[160px] bg-white border border-slate-200 rounded-xl
                 shadow-sm p-4 flex flex-col gap-2 cursor-pointer shrink-0
                 hover:shadow-lg hover:-translate-y-1 hover:border-indigo-100
                 transition-all duration-200 ease-in-out outline-none
                 focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2"
    >
      <p className="text-sm font-semibold text-slate-900 leading-snug line-clamp-2">{title}</p>
      <p className="text-xs text-slate-400 line-clamp-1">{author}</p>
      <div className="flex items-center gap-1 mt-auto pt-2 border-t border-slate-100">
        <Star size={11} className="text-amber-400 fill-amber-400 shrink-0" aria-hidden="true" />
        <span className="text-xs font-semibold text-slate-600 tabular-nums">{rating}</span>
        <p className="text-xs text-slate-400 line-clamp-1">{reason}</p>
      </div>
    </article>
  );
};

const PageSkeleton = () => (
  <div className="animate-pulse flex flex-col gap-6">
    <div className="h-5 bg-slate-100 rounded-full w-24" />
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white rounded-xl shadow-sm h-80 border border-slate-200" />
      <div className="bg-slate-50 rounded-xl shadow-sm h-80 border border-slate-200" />
    </div>
  </div>
);

const ErrorState = ({ id, message }) => (
  <div id={id} role="alert" className="flex items-center justify-center py-32 text-red-500 text-sm">
    {message}
  </div>
);

const BookDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [bookLoading, setBookLoading] = useState(true);
  const [bookError, setBookError] = useState(false);

  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [recsLoading, setRecsLoading] = useState(true);
  const [recsError, setRecsError] = useState(false);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    const fetchBook = async () => {
      setBookLoading(true);
      setBookError(false);
      try {
        const res = await api.get(`books/${id}/`);
        if (!cancelled) setBook(res.data);
      } catch {
        if (!cancelled) setBookError(true);
      } finally {
        if (!cancelled) setBookLoading(false);
      }
    };

    const fetchRecs = async () => {
      setRecsLoading(true);
      setRecsError(false);
      try {
        const res = await api.get(`books/${id}/recommend/`);
        if (!cancelled) setRecommendedBooks(res.data);
      } catch {
        if (!cancelled) setRecsError(true);
      } finally {
        if (!cancelled) setRecsLoading(false);
      }
    };

    fetchBook();
    fetchRecs();

    return () => { cancelled = true; };
  }, [id]);

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="max-w-7xl mx-auto px-6 py-10 flex flex-col gap-8">

        <nav aria-label="Breadcrumb navigation">
          <button
            id="back-to-home"
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500
                       hover:text-slate-900 transition-colors duration-200 group"
          >
            <ArrowLeft
              size={15}
              aria-hidden="true"
              className="group-hover:-translate-x-0.5 transition-transform duration-200"
            />
            Back to Home
          </button>
        </nav>

        {bookLoading && <PageSkeleton id="book-loading" />}

        {bookError && <ErrorState id="book-error" message="Something went wrong" />}

        {book && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            <section
              id="book-header"
              aria-label="Book overview"
              className="lg:col-span-2 bg-white border border-slate-200 rounded-xl shadow-md px-8 py-8 flex flex-col gap-5"
            >
              <div className="flex items-center gap-3 flex-wrap">
                <span
                  id="book-genre"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold
                             px-3 py-1 rounded-full bg-indigo-50 text-indigo-600
                             border border-indigo-100"
                >
                  <BookOpen size={11} aria-hidden="true" />
                  {book.genre}
                </span>

                <div id="book-rating" className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-100 rounded-full px-3 py-1">
                  <Star size={12} className="text-amber-500 fill-amber-500 shrink-0" aria-hidden="true" />
                  <span className="text-xs font-bold text-amber-700 tabular-nums">{book.rating}</span>
                  <span className="text-xs text-amber-500">/ 5</span>
                </div>
              </div>

              <h1
                id="book-title"
                className="text-3xl font-semibold tracking-tight text-slate-900 leading-tight"
              >
                {book.title}
              </h1>

              <p id="book-author" className="text-base text-slate-500">
                by <span className="font-medium text-slate-700">{book.author}</span>
              </p>

              <div id="book-description" className="pt-2">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
                  Description
                </p>
                <p
                  id="book-description-text"
                  className="text-sm text-slate-600 leading-relaxed whitespace-pre-line"
                >
                  {book.description}
                </p>
              </div>
            </section>

            <section
              id="book-summary"
              aria-labelledby="book-summary-heading"
              className="bg-gradient-to-br from-indigo-50 via-purple-50 to-slate-50
                         border border-indigo-100 rounded-xl shadow-md px-6 py-7 flex flex-col gap-4"
            >
              <div className="inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-full bg-white border border-indigo-100 shadow-sm">
                <Sparkles size={11} className="text-indigo-500" aria-hidden="true" />
                <span
                  id="book-summary-heading"
                  className="text-xs font-semibold text-indigo-600"
                >
                  AI‑Generated Summary
                </span>
              </div>

              <p
                id="book-summary-text"
                className="text-sm text-slate-700 leading-relaxed"
              >
                {book.summary}
              </p>
            </section>
          </div>
        )}

        <section
          id="recommended-books"
          aria-labelledby="recommended-books-heading"
          className="bg-white border border-slate-200 rounded-xl shadow-md px-8 py-7"
        >
          <h2
            id="recommended-books-heading"
            className="text-lg font-semibold tracking-tight text-slate-900 mb-6"
          >
            Recommended Books
          </h2>

          {recsLoading && (
            <div id="recs-loading" aria-live="polite" className="flex gap-4 overflow-x-auto pb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="min-w-[160px] max-w-[160px] bg-slate-50 border border-slate-100
                             rounded-xl h-32 animate-pulse shrink-0"
                />
              ))}
            </div>
          )}

          {recsError && (
            <ErrorState id="recs-error" message="Something went wrong" />
          )}

          {!recsLoading && !recsError && recommendedBooks.length > 0 && (
            <div
              id="recommended-books-scroll"
              className="flex gap-4 overflow-x-auto pb-2"
              role="list"
              aria-label="Recommended books list"
            >
              {recommendedBooks.map((rec) => (
                <div key={rec.id} role="listitem">
                  <RecommendedCard
                    id={rec.id}
                    title={rec.title}
                    author={rec.author}
                    rating={rec.rating}
                    reason={rec.reason}
                  />
                </div>
              ))}
            </div>
          )}

          {!recsLoading && !recsError && recommendedBooks.length === 0 && (
            <p id="recs-empty" className="text-sm text-slate-400">
              No recommendations available.
            </p>
          )}
        </section>

      </main>
    </div>
  );
};

export default BookDetailPage;
