import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSalon } from '../../context/SalonContext';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

const Header = () => {
  const { isScrolled, isMenuOpen, toggleMenu, closeMenu } = useSalon();
  const { user, isAdmin, isClient, logout } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
    { path: '/booking', label: 'Book Now', isButton: true }
  ];

  const toggleSearch = () => {
    setIsSearchOpen(prev => !prev);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  return (
    <header className={`header ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="header-logo" onClick={closeMenu}>
          <span className="logo-text">LUXE</span>
          <span className="logo-subtext">SALON</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="header-nav" role="navigation" aria-label="Main navigation">
          <ul className="nav-list">
            {navLinks.map((link, index) => (
              <li key={index} className="nav-item">
                {link.isButton ? (
                  <Link to={link.path} className="btn btn-primary nav-btn">
                    {link.label}
                  </Link>
                ) : (
                  <NavLink 
                    to={link.path} 
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Header Actions */}
        <div className="header-actions">
          {/* Auth Buttons */}
          {user ? (
            <>
              <Link 
                to={isAdmin ? "/admin" : "/dashboard"} 
                className="btn btn-secondary auth-btn-header"
              >
                {isAdmin ? 'Admin' : 'Dashboard'}
              </Link>
              <button onClick={handleLogout} className="btn btn-primary logout-header">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary auth-btn-header">
                Login
              </Link>
              <Link to="/signup" className="btn btn-primary auth-btn-header">
                Sign Up
              </Link>
            </>
          )}

          {/* Search Toggle */}
          <button 
            className="header-action-btn search-btn" 
            onClick={toggleSearch}
            aria-label="Toggle search"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            className={`header-action-btn menu-toggle ${isMenuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className="menu-bar"></span>
            <span className="menu-bar"></span>
            <span className="menu-bar"></span>
          </button>
        </div>

        {/* Search Overlay */}
        <div className={`search-overlay ${isSearchOpen ? 'open' : ''}`}>
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Search services, treatments..." 
              className="search-input"
              autoFocus
            />
            <button className="search-close" onClick={toggleSearch}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav">
          <ul className="mobile-nav-list">
            {navLinks.map((link, index) => (
              <li key={index} className="mobile-nav-item">
                {link.isButton ? (
                  <Link 
                    to={link.path} 
                    className="btn btn-primary mobile-nav-btn"
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <NavLink 
                    to={link.path} 
                    className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </NavLink>
                )}
              </li>
            ))}
            {/* Mobile Auth Links */}
            {user ? (
              <>
                <li className="mobile-nav-item">
                  <Link 
                    to={isAdmin ? "/admin" : "/dashboard"} 
                    className="mobile-nav-link"
                    onClick={closeMenu}
                  >
                    {isAdmin ? 'Admin Dashboard' : 'My Dashboard'}
                  </Link>
                </li>
                <li className="mobile-nav-item">
                  <button 
                    className="mobile-nav-link"
                    onClick={handleLogout}
                    style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left' }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="mobile-nav-item">
                  <Link to="/login" className="mobile-nav-link" onClick={closeMenu}>
                    Login
                  </Link>
                </li>
                <li className="mobile-nav-item">
                  <Link to="/signup" className="mobile-nav-link" onClick={closeMenu}>
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
        <div className="mobile-menu-footer">
          <p>Follow us</p>
          <div className="mobile-social-links">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;