
import React from 'react';
import { ShoppingCart, Clock, ChevronRight } from 'lucide-react';
import { products } from './Categories';
import ScrollReveal from '../ui/ScrollReveal';

interface HomeDeliveryProps {
  onAddToCart: (product: { id: number; title: string; image: string; price: number }) => void;
  stockItems?: Array<{ id: number; title: string; inStock: boolean }>;
}

const HomeDelivery: React.FC<HomeDeliveryProps> = ({ onAddToCart, stockItems = [] }) => {
  // Select random products that are in stock
  const getRandomProducts = () => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    
    // Filter products based on stock status
    const productsWithStockStatus = shuffled.map(product => {
      const stockItem = stockItems.find(item => item.id === product.id);
      return {
        ...product,
        inStock: stockItem ? stockItem.inStock : true
      };
    });
    
    // Prioritize in-stock products but include some out-of-stock ones too for visual indicator
    return productsWithStockStatus.slice(0, 4);
  };
  
  const randomProducts = getRandomProducts();

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/20 to-brand-orange/5 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Livraison rapide à domicile</h2>
            <p className="text-lg text-gray-700 mb-8">
              Nos livreurs vous apportent vos produits surgelés dans un délai d'une heure,
              garantissant leur qualité et fraîcheur jusqu'à votre porte.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <div className="bg-white p-5 rounded-xl shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange">
                  <Clock size={24} />
                </div>
                <div className="text-left">
                  <h3 className="font-bold">Livraison en 1h</h3>
                  <p className="text-sm text-gray-500">Directement chez vous</p>
                </div>
              </div>
              
              <div className="bg-white p-5 rounded-xl shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange">
                  <ShoppingCart size={24} />
                </div>
                <div className="text-left">
                  <h3 className="font-bold">Commande facile</h3>
                  <p className="text-sm text-gray-500">En quelques clics</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
        
        <ScrollReveal delay={200}>
          <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 mb-10">
            <h3 className="text-xl font-bold mb-6">Quelques-uns de nos produits populaires</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {randomProducts.map((product) => {
                const stockItem = stockItems.find(item => item.id === product.id);
                const inStock = stockItem ? stockItem.inStock : true;
                
                return (
                  <div key={product.id} className={`rounded-xl overflow-hidden shadow-sm ${inStock ? 'hover:shadow-md' : 'opacity-75'} transition-all`}>
                    <div className="relative aspect-square overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.title} 
                        className={`w-full h-full object-cover ${inStock ? '' : 'grayscale'}`}
                      />
                      
                      {!inStock && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <span className="bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-full">
                            Épuisé
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{product.title}</h4>
                          <p className="text-sm text-gray-500">{product.weight}</p>
                        </div>
                        <span className="text-brand-orange font-bold">{product.price.toFixed(2)}€</span>
                      </div>
                      
                      <button 
                        onClick={() => onAddToCart(product)}
                        disabled={!inStock}
                        className={`mt-3 w-full flex items-center justify-center gap-2 py-2 rounded-lg transition-colors ${
                          inStock 
                            ? 'bg-brand-orange hover:bg-brand-orange/90 text-white' 
                            : 'bg-gray-300 cursor-not-allowed text-gray-700'
                        }`}
                      >
                        <ShoppingCart size={16} />
                        <span>{inStock ? 'Ajouter' : 'Épuisé'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-8 flex justify-center">
              <a href="/commande" className="flex items-center gap-2 text-brand-orange font-medium hover:underline">
                Voir plus de produits <ChevronRight size={16} />
              </a>
            </div>
          </div>
        </ScrollReveal>
        
        <ScrollReveal delay={300}>
          <div className="text-center">
            <a 
              href="/commande" 
              className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange/90 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Commander maintenant
              <ChevronRight size={18} />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default HomeDelivery;
