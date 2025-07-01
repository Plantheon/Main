import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Mail, Phone, MapPin, Instagram, Facebook, Twitter, ChevronRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Leaf size={24} className="text-primary-400" />
              <span className="font-display font-bold text-xl">Urban Oasis</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Transform urban living with your personal rooftop retreat. 
              Urban Oasis connects city dwellers with beautiful garden spaces.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'Garden Types', 'Pricing & Plans', 'Book Now', 'About Us', 'Contact'].map((item) => (
                <li key={item}>
                  <Link 
                    to={`/${item === 'Home' ? '' : item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-gray-400 hover:text-primary-400 transition-colors flex items-center gap-1"
                  >
                    <ChevronRight size={14} />
                    <span>{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Garden Types */}
          <div>
            <h4 className="font-bold text-lg mb-4">Garden Types</h4>
            <ul className="space-y-2">
              {['Wellness Gardens', 'Social Gardens', 'Pet-Friendly Gardens', 'Sports & Activity Gardens'].map((type) => (
                <li key={type}>
                  <Link 
                    to={`/garden-types/${type.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-gray-400 hover:text-primary-400 transition-colors flex items-center gap-1"
                  >
                    <ChevronRight size={14} />
                    <span>{type}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin size={18} className="flex-shrink-0 mt-1" />
                <span>123 Green Street, Skyline Tower, New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone size={18} />
                <span>(123) 456-7890</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail size={18} />
                <span>hello@urbanoasis.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Urban Oasis. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link to="/privacy-policy" className="hover:text-primary-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;