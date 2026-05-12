import React, { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';
import api from '../api/axios';

const SkeletonCard = () => (
  <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5 flex flex-col gap-3 animate-pulse">
    <div className="h-3.5 bg-slate-100 rounded-full w-3/4" />
    <div className="h-3 bg-slate-100 rounded-full w-1/2" />
    <div className="mt-auto pt-3 border-t border-slate-100">
      <div className="h-3 bg-slate-100 rounded-full w-1/4" />
    </div>
  </div>
);

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const fetchBooks = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const res = await api.get('books/');
        if (!cancelled) setBooks(res.data);
      } catch {
        if (!cancelled) setIsError(true);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchBooks();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-50 pointer-events-none" aria-hidden="true" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-50 pointer-events-none" aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-6 py-16 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-semibold text-indigo-600 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" aria-hidden="true" />
            AI-Powered Platform
          </span>

          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900 mb-4 leading-tight">
            Discover Your Next<br />
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Great Read
            </span>
          </h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            AI-powered book insights and recommendations, all in one place.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Explore Books</h2>
            <p className="text-sm text-slate-500 mt-0.5">Browse all books stored in the platform.</p>
          </div>
        </div>

        {isError && (
          <div
            id="books-error"
            role="alert"
            className="flex items-center justify-center py-32 text-red-500 text-sm"
          >
            Something went wrong
          </div>
        )}

        {isLoading && (
          <div
            id="books-loading"
            aria-live="polite"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {!isLoading && !isError && books.length > 0 && (
          <section
            id="book-grid"
            aria-label="Book list"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
          >
            {books.map((book) => (
              <BookCard
                key={book.id}
                id={book.id}
                title={book.title}
                author={book.author}
                rating={book.rating}
              />
            ))}
          </section>
        )}

        {!isLoading && !isError && books.length === 0 && (
          <div
            id="books-empty"
            className="flex flex-col items-center justify-center py-32 gap-4"
          >
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-2xl">
              📚
            </div>
            <p className="text-slate-500 text-sm font-medium">
              No books yet — start by adding one
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
