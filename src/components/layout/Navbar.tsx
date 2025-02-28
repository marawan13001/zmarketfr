
import React, { useEffect, useState } from 'react';
import { Menu, ShoppingCart, X } from 'lucide-react';
import { cn } from '@/lib/utils';

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
        <a href="/" className="z-50">
          <h1 className="text-2xl font-bold tracking-tight text-brand-black">
            Halal<span className="text-brand-orange">Délices</span>
          </h1>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <ul className="flex items-center space-x-8">
            <li>
              <a
                href="#produits"
                className="font-medium text-gray-800 hover:text-brand-orange transition-colors"
              >
                Nos Produits
              </a>
            </li>
            <li>
              <a
                href="#a-propos"
                className="font-medium text-gray-800 hover:text-brand-orange transition-colors"
              >
                À Propos
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="font-medium text-gray-800 hover:text-brand-orange transition-colors"
              >
                Contact
              </a>
            </li>
          </ul>
          <a
            href="#"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-orange text-white hover:bg-brand-orange/90 transition-colors"
          >
            <ShoppingCart size={20} />
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <a
            href="#"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-orange text-white hover:bg-brand-orange/90 transition-colors mr-2"
          >
            <ShoppingCart size={20} />
          </a>
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
              <Menu size={24} className="text-gray-800" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-0 bg-white z-40 flex flex-col justify-center items-center transition-transform duration-500 ease-elastic',
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <nav className="flex flex-col items-center space-y-8">
          <a
            href="#produits"
            className="text-2xl font-semibold text-gray-800 hover:text-brand-orange transition-colors"
            onClick={toggleMenu}
          >
            Nos Produits
          </a>
          <a
            href="#a-propos"
            className="text-2xl font-semibold text-gray-800 hover:text-brand-orange transition-colors"
            onClick={toggleMenu}
          >
            À Propos
          </a>
          <a
            href="#contact"
            className="text-2xl font-semibold text-gray-800 hover:text-brand-orange transition-colors"
            onClick={toggleMenu}
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
