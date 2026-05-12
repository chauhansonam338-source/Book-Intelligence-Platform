import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';

const BookCard = ({ id, title, author, rating }) => {
  const navigate = useNavigate();

  const handleClick = () => navigate(`/book/${id}`);
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navigate(`/book/${id}`);
    }
  };

  return (
    <article
      id={`book-card-${id}`}
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={`View details for ${title} by ${author}`}
      className="group relative bg-white border border-slate-200 rounded-xl shadow-md
                 cursor-pointer flex flex-col gap-3 p-5 overflow-hidden outline-none
                 hover:shadow-xl hover:-translate-y-[3px] hover:border-indigo-100
                 transition-all duration-200 ease-in-out
                 focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2"
    >
      <div
        className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-600
                   opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        aria-hidden="true"
      />

      <h2 className="text-sm font-semibold text-slate-900 leading-snug line-clamp-2 pt-1">
        {title}
      </h2>

      <p className="text-xs text-slate-400 line-clamp-1">{author}</p>

      <div className="flex items-center gap-1.5 mt-auto pt-3 border-t border-slate-100">
        <Star size={12} className="text-amber-400 fill-amber-400 shrink-0" aria-hidden="true" />
        <span className="text-xs font-semibold text-slate-600 tabular-nums">{rating}</span>
      </div>
    </article>
  );
};

export default BookCard;
