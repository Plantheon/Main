import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Leaf, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white shadow-md py-2' 
          : 'bg-gray-900/90 backdrop-blur-md py-4'
      }`}
      role="banner"
      aria-label="Site header"
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link 
          to="/" 
          className={`flex items-center gap-2 font-display font-bold text-xl ${
            scrolled ? 'text-primary-700' : 'text-white'
          }`}
          aria-label="Plantheon Home"
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
              aria-current={({ isActive }) => isActive ? 'page' : undefined}
            >
              {item.name}
            </NavLink>
          ))}
          <Link 
            to="/booking" 
            className={`btn-md ${
              scrolled 
                ? 'bg-primary-700 text-white hover:bg-primary-800' 
                : 'bg-white text-primary-700 hover:bg-primary-50'
            } rounded-md font-medium transition-colors duration-200`}
            aria-label="Book your garden space now"
          >
            Book Now
          </Link>
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
                aria-label="Plantheon Home"
              >
                <Leaf size={28} aria-hidden="true" />
                <span className="font-display font-bold text-xl">Plantheon</span>
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
                  aria-current={({ isActive }) => isActive ? 'page' : undefined}
                >
                  {item.name}
                </NavLink>
              ))}
              <Link 
                to="/booking" 
                className="btn-primary btn-lg w-full text-center mt-4"
                onClick={() => setIsOpen(false)}
                aria-label="Book your garden space now"
              >
                Book Now
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;