import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Loader2 } from 'lucide-react';
import api from '../api/axios';

const INITIAL_FORM = {
  title: '',
  author: '',
  description: '',
  rating: '',
  book_url: '',
};

const Field = ({ id, label, error, children }) => (
  <div className="flex flex-col gap-1.5">
    <label htmlFor={id} className="text-sm font-medium text-slate-700">
      {label}
    </label>
    {children}
    {error && (
      <p role="alert" className="text-xs text-red-500 mt-0.5">
        {error}
      </p>
    )}
  </div>
);

const inputClass =
  'w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-800 ' +
  'placeholder-slate-400 bg-white ' +
  'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ' +
  'disabled:bg-slate-50 disabled:text-slate-400 transition-all duration-200';

const AddBookPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState(INITIAL_FORM);
  const [fieldErrors, setFieldErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successData, setSuccessData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = () => {
    const errors = {};
    if (!form.title.trim()) errors.title = 'Title is required.';
    if (!form.author.trim()) errors.author = 'Author is required.';
    if (!form.description.trim()) errors.description = 'Description is required.';
    if (form.rating === '' || Number.isNaN(Number(form.rating))) {
      errors.rating = 'Rating is required and must be a number.';
    } else if (Number(form.rating) < 0 || Number(form.rating) > 5) {
      errors.rating = 'Rating must be between 0 and 5.';
    }
    if (!form.book_url.trim()) errors.book_url = 'Book URL is required.';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setIsLoading(true);
    console.log("SUBMIT CLICKED");

    try {

      const body = {
        title: form.title.trim(),
        author: form.author.trim(),
        description: form.description.trim(),
        rating: parseFloat(form.rating),
        book_url: form.book_url.trim(),
      };
      console.log("Sending body:", body);
      if (!form.rating || isNaN(parseFloat(form.rating))) {
        setApiError("Rating must be a valid number");
        return;
      }

      const res = await api.post('books/', body);
      console.log("RESPONSE:", res);
      if (res.status === 201) {
        setSuccessData(res.data);
      } else {
        setApiError("Failed to add book");
      }

    } catch (err) {
      console.log("ERROR RESPONSE:", err?.response?.data);
      setApiError(
        err?.response?.data
          ? JSON.stringify(err.response.data)
          : "Request failed"
      );
    }
    finally {
      setIsLoading(false);
    }
  };

  if (successData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-xl shadow-lg p-10 flex flex-col items-center gap-6 text-center">
          <div className="w-16 h-16 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-center">
            <CheckCircle size={32} className="text-emerald-500" aria-hidden="true" id="success-icon" />
          </div>

          <div>
            <h1 id="success-heading" className="text-xl font-semibold tracking-tight text-slate-900">
              Book added successfully
            </h1>
            <p className="text-sm text-slate-500 mt-1">Your book has been processed by the AI.</p>
          </div>

          <dl
            id="success-details"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl divide-y divide-slate-100 text-left"
          >
            <div className="px-5 py-3.5 flex gap-4 items-start">
              <dt className="text-xs font-semibold text-slate-400 w-16 shrink-0 pt-0.5">Title</dt>
              <dd id="success-title" className="text-sm font-medium text-slate-800">{successData.title}</dd>
            </div>
            <div className="px-5 py-3.5 flex gap-4 items-center">
              <dt className="text-xs font-semibold text-slate-400 w-16 shrink-0">Genre</dt>
              <dd id="success-genre">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-600 border border-indigo-100">
                  {successData.genre}
                </span>
              </dd>
            </div>
            <div className="px-5 py-4 flex flex-col gap-2">
              <dt className="text-xs font-semibold text-slate-400">AI Summary</dt>
              <dd id="success-summary" className="text-sm text-slate-600 leading-relaxed">
                {successData.summary}
              </dd>
            </div>
          </dl>

          <button
            id="go-home-btn"
            onClick={() => navigate('/')}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-800
                       transition-colors duration-200"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-start justify-center px-6 py-12">
      <div className="w-full max-w-xl">

        <nav aria-label="Back navigation" className="mb-8">
          <button
            id="back-to-home"
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500
                       hover:text-slate-900 transition-colors duration-200 group"
          >
            <ArrowLeft size={15} aria-hidden="true" className="group-hover:-translate-x-0.5 transition-transform duration-200" />
            Back to Home
          </button>
        </nav>

        <div className="bg-white border border-slate-200 rounded-xl shadow-lg px-8 py-10">

          <div className="mb-8">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Add a Book</h1>
            <p className="text-sm text-slate-500 mt-1">Fill in the details — AI will generate a summary and genre.</p>
          </div>

          <form
            id="add-book-form"
            onSubmit={handleSubmit}
            noValidate
            className="space-y-5"
          >
            <Field id="field-title" label="Title" error={fieldErrors.title}>
              <input
                id="field-title"
                name="title"
                type="text"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Atomic Habits"
                disabled={isLoading}
                autoComplete="off"
                className={inputClass}
              />
            </Field>

            <Field id="field-author" label="Author" error={fieldErrors.author}>
              <input
                id="field-author"
                name="author"
                type="text"
                value={form.author}
                onChange={handleChange}
                placeholder="e.g. James Clear"
                disabled={isLoading}
                autoComplete="off"
                className={inputClass}
              />
            </Field>

            <Field id="field-description" label="Description" error={fieldErrors.description}>
              <textarea
                id="field-description"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Brief description of the book…"
                disabled={isLoading}
                rows={4}
                className={inputClass + ' resize-y'}
              />
            </Field>

            <Field id="field-rating" label="Rating (0 – 5)" error={fieldErrors.rating}>
              <input
                id="field-rating"
                name="rating"
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={form.rating}
                onChange={handleChange}
                placeholder="e.g. 4.5"
                disabled={isLoading}
                className={inputClass}
              />
            </Field>

            <Field id="field-book-url" label="Book URL" error={fieldErrors.book_url}>
              <input
                id="field-book-url"
                name="book_url"
                type="url"
                value={form.book_url}
                onChange={handleChange}
                placeholder="https://…"
                disabled={isLoading}
                autoComplete="off"
                className={inputClass}
              />
            </Field>

            {apiError && (
              <p
                id="form-api-error"
                role="alert"
                className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3"
              >
                {apiError}
              </p>
            )}

            <button
              id="submit-book-btn"
              type="submit"
              disabled={isLoading}
              className="mt-2 w-full flex items-center justify-center gap-2
                         bg-gradient-to-r from-indigo-600 to-purple-600
                         hover:from-indigo-700 hover:to-purple-700
                         disabled:opacity-70 disabled:cursor-not-allowed
                         text-white text-sm font-semibold py-3 rounded-lg
                         hover:scale-[1.01] hover:shadow-md active:scale-100
                         transition-all duration-200 ease-in-out"
            >
              {isLoading ? (
                <>
                  <Loader2 size={15} className="animate-spin" aria-hidden="true" />
                  Submitting…
                </>
              ) : (
                'Add Book'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBookPage;
