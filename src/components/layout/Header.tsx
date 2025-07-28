import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Leaf, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Garden Types', path: '/garden-types' },
  { name: 'Pricing & Plans', path: '/pricing' },
  { name: 'Book Now', path: '/booking' },
  { name: 'About Us', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { isAuthenticated, user, signOut, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showSignOutPrompt, setShowSignOutPrompt] = useState(false);
  const [fadeOutPrompt, setFadeOutPrompt] = useState(false);

  useEffect(() => {
    if (location.state && location.state.signedOut) {
      setShowSignOutPrompt(true);
      // Remove the state so it doesn't persist on refresh
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    document.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  useEffect(() => {
    if (showSignOutPrompt) {
      setFadeOutPrompt(false);
      const timer = setTimeout(() => {
        setFadeOutPrompt(true);
        setTimeout(() => setShowSignOutPrompt(false), 500); // match fade duration
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showSignOutPrompt]);

  const handleLogout = () => {
    signOut(navigate);
    setShowUserMenu(false);
  };

  // Custom sign out prompt
  const SignOutPrompt = () => (
    <div className={`fixed left-1/2 top-[5rem] transform -translate-x-1/2 z-50 bg-green-100 border border-green-300 text-green-800 px-6 py-3 rounded-xl shadow-lg flex items-center gap-4 transition-opacity duration-500 ${fadeOutPrompt ? 'opacity-0' : 'opacity-100'}`}>
      <span className="font-semibold">You have been successfully signed out.</span>
      <button
        onClick={() => setShowSignOutPrompt(false)}
        className="ml-2 text-green-700 hover:text-green-900 focus:outline-none"
        aria-label="Close notification"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
    </div>
  );

  return (
    <>
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white shadow-md py-2' 
            : 'bg-gray-900/90 backdrop-blur-md py-4'
        }`}
        role="banner"
        aria-label="Site header"
        style={{ position: 'fixed', top: 0, left: 0, right: 0 }}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link 
            to="/" 
            className={`flex items-center gap-2 font-display font-bold text-xl ${
              scrolled ? 'text-primary-700' : 'text-white'
            }`}
            aria-label="Urban Oasis Home"
          >
            <Leaf 
              size={28} 
              className={scrolled ? 'text-primary-700' : 'text-white'} 
              aria-hidden="true"
            />
            <span>Plantheon</span>
          </Link>

          <nav 
            className="hidden md:flex items-center space-x-6"
            role="navigation"
            aria-label="Main navigation"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => `
                  font-medium text-sm transition-colors duration-200
                  ${scrolled 
                    ? (isActive ? 'text-primary-700' : 'text-gray-800 hover:text-primary-700') 
                    : (isActive ? 'text-primary-300' : 'text-white hover:text-primary-200')}
                `}
              >
                {item.name}
              </NavLink>
            ))}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <img
                    src={user?.image || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400'}
                    alt={user?.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className={`text-sm font-medium ${scrolled ? 'text-gray-800' : 'text-white'}`}>
                    {user?.name?.split(' ')[0]}
                  </span>
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/booking"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Book Garden
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={signInWithGoogle}
                className={`btn-md ${
                  scrolled 
                    ? 'bg-primary-700 text-white hover:bg-primary-800' 
                    : 'bg-white text-primary-700 hover:bg-primary-50'
                } rounded-md font-medium transition-colors duration-200`}
                aria-label="Sign in to your account"
              >
                Sign In
              </button>
            )}
          </nav>

          <button 
            className="md:hidden"
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <Menu 
              size={24} 
              className={scrolled ? 'text-gray-800' : 'text-white'} 
              aria-hidden="true"
            />
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              id="mobile-menu"
              className="fixed inset-0 bg-white z-50 md:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              role="dialog"
              aria-label="Mobile menu"
            >
              <div className="flex justify-between items-center p-4 border-b">
                <Link 
                  to="/" 
                  className="flex items-center gap-2 text-primary-700"
                  onClick={() => setIsOpen(false)}
                  aria-label="Urban Oasis Home"
                >
                  <Leaf size={28} aria-hidden="true" />
                  <span className="font-display font-bold text-xl">Urban Oasis</span>
                </Link>
                <button 
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={24} className="text-gray-800" aria-hidden="true" />
                </button>
              </div>
              <nav 
                className="flex flex-col p-4 space-y-4"
                role="navigation"
                aria-label="Mobile navigation"
              >
                {navItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={({ isActive }) => `
                      font-medium text-lg py-2 px-4 rounded-md transition-colors
                      ${isActive ? 'bg-primary-50 text-primary-700' : 'text-gray-800 hover:bg-gray-50'}
                    `}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </NavLink>
                ))}
                {isAuthenticated ? (
                  <div className="flex items-center gap-2 mt-4">
                    <img src={user?.image || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400'} alt={user?.name} className="w-8 h-8 rounded-full" />
                    <Link to="/dashboard" className="btn-secondary btn-lg w-full text-center" onClick={() => setIsOpen(false)}>
                      Dashboard
                    </Link>
                    <button onClick={handleLogout} className="btn-secondary btn-lg w-full text-center">Sign Out</button>
                  </div>
                ) : (
                  <button
                    onClick={signInWithGoogle}
                    className={`btn-primary btn-lg w-full text-center mt-4`}
                    aria-label="Sign in to your account"
                  >
                    Sign In
                  </button>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      {showSignOutPrompt && <SignOutPrompt />}
    </>
  );
};

export default Header;