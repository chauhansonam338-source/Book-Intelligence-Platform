import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const linkClass = ({ isActive }) =>
    `relative text-sm font-medium transition-all duration-200 pb-0.5 ${
      isActive
        ? 'text-indigo-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-indigo-500 after:to-purple-600 after:rounded-full'
        : 'text-slate-500 hover:text-slate-900'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-lg border-b border-slate-200/60">
      <nav
        className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        <NavLink
          to="/"
          id="nav-logo"
          className="text-xl font-bold tracking-tight select-none bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
        >
          BookIQ
        </NavLink>

        <ul className="flex items-center gap-7 list-none m-0 p-0">
          <li>
            <NavLink id="nav-home" to="/" end className={linkClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink id="nav-add-book" to="/add" className={linkClass}>
              Add Book
            </NavLink>
          </li>
          <li>
            <NavLink id="nav-ask-ai" to="/query" className={linkClass}>
              Ask AI
            </NavLink>
          </li>
          <li>
            <NavLink id="nav-scraper" to="/scrape" className={linkClass}>
              Scraper
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
