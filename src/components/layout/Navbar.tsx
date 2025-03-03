
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, ShoppingCart, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import UserMenu from './UserMenu';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-elastic',
        isScrolled
          ? 'bg-white/80 backdrop-blur-md shadow-sm py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="container px-4 mx-auto flex justify-between items-center">
        <Link to="/" className="z-50 flex items-center">
          <img 
            src="/lovable-uploads/81fe1b1a-9718-4a7d-b30e-3b1b32c3cc85.png" 
            alt="Z Market Logo" 
            className="h-10 mr-2" 
          />
          <span className={`text-2xl font-bold tracking-tight ${isScrolled || isMenuOpen ? 'text-brand-black' : 'text-white'}`}>
            Z <span className="text-brand-orange">Market</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <ul className="flex items-center space-x-8">
            <li>
              <a
                href="#produits"
                className={`font-medium hover:text-brand-orange transition-colors ${isScrolled ? 'text-gray-800' : 'text-white'}`}
              >
                Nos Produits
              </a>
            </li>
            <li>
              <a
                href="#livraison"
                className={`font-medium hover:text-brand-orange transition-colors ${isScrolled ? 'text-gray-800' : 'text-white'}`}
              >
                Livraison
              </a>
            </li>
            <li>
              <a
                href="#a-propos"
                className={`font-medium hover:text-brand-orange transition-colors ${isScrolled ? 'text-gray-800' : 'text-white'}`}
              >
                À Propos
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className={`font-medium hover:text-brand-orange transition-colors ${isScrolled ? 'text-gray-800' : 'text-white'}`}
              >
                Contact
              </a>
            </li>
          </ul>
          <div className="flex items-center gap-2">
            <UserMenu />
            <Link
              to="/commande"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-orange text-white hover:bg-brand-orange/90 transition-colors"
            >
              <ShoppingCart size={20} />
            </Link>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <UserMenu />
          <Link
            to="/commande"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-orange text-white hover:bg-brand-orange/90 transition-colors mr-2"
          >
            <ShoppingCart size={20} />
          </Link>
          <button
            onClick={toggleMenu}
            className="p-2 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <X
                size={24}
                className="text-gray-800 transition-transform duration-300 ease-elastic transform rotate-90"
              />
            ) : (
              <Menu size={24} className={isScrolled ? 'text-gray-800' : 'text-white'} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Fixed positioning and completely separate from the page content */}
      <div
        className={cn(
          'fixed inset-0 bg-black z-40 transition-transform duration-500 ease-elastic flex flex-col',
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="px-4 py-5 flex justify-between items-center border-b border-white/10">
          <Link to="/" className="flex items-center" onClick={toggleMenu}>
            <img 
              src="/lovable-uploads/81fe1b1a-9718-4a7d-b30e-3b1b32c3cc85.png" 
              alt="Z Market Logo" 
              className="h-10 mr-2" 
            />
            <span className="text-2xl font-bold tracking-tight text-white">
              Z <span className="text-brand-orange">Market</span>
            </span>
          </Link>
          <button
            onClick={toggleMenu}
            className="p-2 focus:outline-none"
            aria-label="Close Menu"
          >
            <X size={24} className="text-white" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6">
          <nav className="flex flex-col w-full px-4">
            <a
              href="#produits"
              className="py-4 text-xl font-semibold text-white hover:text-brand-orange transition-colors border-b border-white/10"
              onClick={toggleMenu}
            >
              Nos Produits
            </a>
            <a
              href="#livraison"
              className="py-4 text-xl font-semibold text-white hover:text-brand-orange transition-colors border-b border-white/10"
              onClick={toggleMenu}
            >
              Livraison
            </a>
            <a
              href="#a-propos"
              className="py-4 text-xl font-semibold text-white hover:text-brand-orange transition-colors border-b border-white/10"
              onClick={toggleMenu}
            >
              À Propos
            </a>
            <a
              href="#contact"
              className="py-4 text-xl font-semibold text-white hover:text-brand-orange transition-colors border-b border-white/10"
              onClick={toggleMenu}
            >
              Contact
            </a>
          </nav>
        </div>
        
        <div className="p-4 border-t border-white/10">
          <Link
            to="/commande"
            className="flex items-center justify-center gap-2 w-full py-3 bg-brand-orange text-white rounded-lg font-semibold"
            onClick={toggleMenu}
          >
            <ShoppingCart size={20} />
            Commander
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
