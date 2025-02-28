
import React from 'react';
import { Instagram, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-black text-white py-16">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center mb-6">
              <img 
                src="/lovable-uploads/12f65d9b-15c8-4a5f-8482-905125be3fd2.png" 
                alt="Z Market Logo" 
                className="h-10 mr-2" 
              />
              <h2 className="text-2xl font-bold">
                Z <span className="text-brand-orange">Market</span>
              </h2>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Votre destination pour des produits Halal de qualité. 
              Surgelés, frais, épicerie sèche et boissons – tout ce dont 
              vous avez besoin pour une alimentation savoureuse et respectueuse.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-brand-orange transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-brand-orange transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-brand-orange transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Liens Rapides</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-brand-orange transition-colors">
                  Accueil
                </a>
              </li>
              <li>
                <a href="#produits" className="text-gray-400 hover:text-brand-orange transition-colors">
                  Nos Produits
                </a>
              </li>
              <li>
                <a href="#a-propos" className="text-gray-400 hover:text-brand-orange transition-colors">
                  À Propos
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-brand-orange transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact</h3>
            <ul className="space-y-3 text-gray-400">
              <li>123 Avenue de la République</li>
              <li>75011 Paris, France</li>
              <li>+33 (0)1 23 45 67 89</li>
              <li>contact@zmarket.fr</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Z Market. Tous droits réservés.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-brand-orange transition-colors">
              Politique de confidentialité
            </a>
            <a href="#" className="text-gray-500 hover:text-brand-orange transition-colors">
              Conditions d'utilisation
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
