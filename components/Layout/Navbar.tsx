
import React, { useState } from 'react';
import { Menu, X, BarChart3, Lock } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Services', path: '/#services' },
    { name: 'Équipe', path: '/#team' },
    { name: 'Projets', path: '/#projects' },
    { name: 'Contact', path: '/#contact' },
  ];

  const isActive = (path: string) => location.pathname + location.hash === path;

  return (
    <nav className="bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              {/* Logo Graphic: Orange Bars */}
              <div className="flex items-end space-x-1 h-8">
                <div className="w-2 h-4 bg-shc-orange rounded-t-sm"></div>
                <div className="w-2 h-6 bg-shc-orange/80 rounded-t-sm"></div>
                <div className="w-2 h-8 bg-shc-orange rounded-t-sm"></div>
              </div>
              
              {/* Logo Text */}
              <div className="flex flex-col justify-center">
                <span className="font-heading font-bold text-2xl text-shc-blue leading-none tracking-tight">SHC</span>
                <span className="text-[9px] text-gray-500 uppercase tracking-widest font-semibold">Consulting</span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className={`font-medium text-sm transition-colors duration-200 ${
                  isActive(link.path) ? 'text-shc-orange font-bold' : 'text-gray-700 hover:text-shc-blue'
                }`}
              >
                {link.name}
              </a>
            ))}
            <Link 
                to="/admin" 
                className="flex items-center px-4 py-2 rounded-full bg-shc-dark text-white text-xs font-bold hover:bg-gray-800 transition shadow-sm hover:shadow-md"
            >
                <Lock size={12} className="mr-1" />
                Admin
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-shc-blue focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-shc-blue hover:bg-gray-50"
              >
                {link.name}
              </a>
            ))}
             <Link 
                to="/admin" 
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 mt-4 text-center rounded-md text-base font-medium bg-gray-100 text-gray-700"
            >
                Connexion Admin
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
