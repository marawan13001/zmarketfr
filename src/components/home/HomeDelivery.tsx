
import React, { useState } from 'react';
import { Truck, Clock, ShoppingCart } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';
import { toast } from 'sonner';

interface Product {
  id: number;
  image: string;
  title: string;
  price: number;
  unit: string;
}

const HomeDelivery: React.FC = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  
  const featuredProducts: Product[] = [
    {
      id: 1,
      image: "/lovable-uploads/1e7548f5-8859-4e95-b8cb-40cab3d8dd35.png",
      title: "Hachis Parmentier",
      price: 6.99,
      unit: "1kg"
    },
    {
      id: 2,
      image: "/lovable-uploads/f99e6b99-49a1-43a5-8745-fc4c75b9469d.png",
      title: "Poulet Vedina",
      price: 8.49,
      unit: "400g"
    },
    {
      id: 3,
      image: "/lovable-uploads/f8882b9d-14ea-4d99-80c5-9e95889b9a08.png",
      title: "Pizza Kebab",
      price: 5.99,
      unit: "420g"
    }
  ];

  const addToCart = (product: Product) => {
    setCartItems([...cartItems, product]);
    toast.success(
      <div className="flex items-center gap-2">
        <span className="font-medium">{product.title}</span> ajouté au panier
      </div>,
      {
        duration: 3000,
      }
    );
  };

  return (
    <section id="livraison" className="py-20 md:py-32 bg-white">
      <div className="container px-4 mx-auto">
        <ScrollReveal delay={50} direction="up">
          <span className="inline-block py-1 px-3 mb-6 rounded-full bg-brand-orange/10 text-brand-orange font-medium text-sm">
            Livraison à Domicile
          </span>
        </ScrollReveal>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <ScrollReveal delay={100} direction="up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-0 text-gray-900">
              Rapide et <span className="text-brand-orange">Pratique</span>
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={200} direction="up">
            <p className="text-gray-600 max-w-md">
              Commandez vos produits préférés et recevez-les directement chez vous dans l'heure qui suit.
            </p>
          </ScrollReveal>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
          <ScrollReveal delay={300} direction="up">
            <div className="bg-brand-cream rounded-xl p-8 text-center">
              <div className="w-16 h-16 mx-auto rounded-lg bg-brand-orange/10 flex items-center justify-center mb-6 text-brand-orange">
                <ShoppingCart size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Commandez en ligne</h3>
              <p className="text-gray-600">
                Sélectionnez vos produits préférés et ajoutez-les à votre panier en quelques clics.
              </p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={400} direction="up">
            <div className="bg-brand-cream rounded-xl p-8 text-center">
              <div className="w-16 h-16 mx-auto rounded-lg bg-brand-orange/10 flex items-center justify-center mb-6 text-brand-orange">
                <Clock size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Livraison rapide</h3>
              <p className="text-gray-600">
                Recevez votre commande dans l'heure qui suit, entre 10h et 19h tous les jours.
              </p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={500} direction="up">
            <div className="bg-brand-cream rounded-xl p-8 text-center">
              <div className="w-16 h-16 mx-auto rounded-lg bg-brand-orange/10 flex items-center justify-center mb-6 text-brand-orange">
                <Truck size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Service de qualité</h3>
              <p className="text-gray-600">
                Nos livreurs s'assurent que vos produits arrivent en parfait état et à la bonne température.
              </p>
            </div>
          </ScrollReveal>
        </div>
        
        <div className="mb-20">
          <ScrollReveal delay={200} direction="up">
            <h3 className="text-2xl font-bold mb-8 text-center">Nos Produits Populaires</h3>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ScrollReveal key={product.id} delay={300 + product.id * 100} direction="up">
                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all hover:translate-y-[-5px] border border-gray-100">
                  <div className="relative aspect-square overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        console.error(`Failed to load product image: ${product.title}`);
                        e.currentTarget.src = '/placeholder.svg';
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-bold text-gray-900">{product.title}</h4>
                      <span className="text-brand-orange font-bold">{product.price.toFixed(2)}€</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{product.unit}</span>
                      <button 
                        onClick={() => addToCart(product)}
                        className="flex items-center gap-2 bg-brand-orange hover:bg-brand-orange/90 text-white py-2 px-4 rounded-lg transition-colors"
                      >
                        <ShoppingCart size={16} />
                        Ajouter
                      </button>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
        
        <div className="bg-brand-orange/5 rounded-2xl p-8 md:p-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-md">
              <h3 className="text-2xl font-bold mb-4">Horaires de livraison</h3>
              <p className="text-gray-600 mb-6">
                Nous livrons tous les jours de 10h à 19h. Votre commande est livrée dans l'heure qui suit votre confirmation.
                Pour les commandes passées après 18h, la livraison sera effectuée le lendemain matin.
              </p>
              <div className="flex items-center gap-3 text-brand-orange font-medium">
                <Clock size={20} />
                <span>Livraison en 1 heure maximum</span>
              </div>
            </div>
            
            <div className="w-full max-w-sm">
              <img 
                src="/lovable-uploads/9ca2f98b-369e-4205-ad84-00c5d774d128.png" 
                alt="Livraison ZMarket" 
                className="w-full rounded-xl shadow-lg"
                onError={(e) => {
                  console.error('Failed to load delivery image');
                  e.currentTarget.src = '/placeholder.svg';
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeDelivery;
