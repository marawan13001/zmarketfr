import React, { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/home/Hero';
import Categories from '@/components/home/Categories';
import HomeDelivery from '@/components/home/HomeDelivery';
import About from '@/components/home/About';
import Contact from '@/components/home/Contact';
import Footer from '@/components/layout/Footer';
import FloatingCart from '@/components/cart/FloatingCart';
import { toast } from 'sonner';
import { Truck, ChevronRight } from 'lucide-react';

const initialCartItems = [
  {
    id: 1,
    name: "Pizza 4 Fromages Surgelée",
    image: "/lovable-uploads/3230e5df-068b-4a55-89ea-10484b277a5a.png",
    price: 12.99,
    quantity: 1
  },
  {
    id: 2,
    name: "Glace Vanille Premium",
    image: "/lovable-uploads/f96329d1-539b-41bc-8c63-c12b7a050ae6.png",
    price: 8.50,
    quantity: 2
  }
];

export const WHATSAPP_NUMBER = "0675725897";

const Index = () => {
  const deliveryRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const [cartItems, setCartItems] = useState(initialCartItems);

  useEffect(() => {
    setTimeout(() => {
      toast.info(
        <div>
          Nous avons mis à jour notre site avec un nouveau design surgelé! 
          <a href="/test-images" className="text-blue-500 underline ml-1">
            Voir tous nos visuels
          </a>
        </div>,
        {
          duration: 8000,
          position: "bottom-center"
        }
      );
    }, 1000);
  }, []);

  const scrollToDelivery = () => {
    deliveryRef.current?.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      window.scrollBy(0, -100);
    }, 100);
  };

  const scrollToCategories = () => {
    categoriesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToFrozen = (subcategory?: string) => {
    categoriesRef.current?.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      const frozenCategoryElement = document.querySelector('[data-category="frozen"]');
      if (frozenCategoryElement instanceof HTMLElement) {
        frozenCategoryElement.click();
        
        if (subcategory) {
          setTimeout(() => {
            const subcategoryButton = document.querySelector(`[data-subcategory="${subcategory}"]`);
            if (subcategoryButton instanceof HTMLElement) {
              subcategoryButton.click();
            }
          }, 300);
        }
      }
    }, 500);
  };

  const updateCartItemQuantity = (id: number, newQuantity: number) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeCartItem = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const addToCart = (product: { id: number; title: string; image: string; price: number }) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      updateCartItemQuantity(product.id, existingItem.quantity + 1);
    } else {
      setCartItems([...cartItems, {
        id: product.id,
        name: product.title,
        image: product.image,
        price: product.price,
        quantity: 1
      }]);
    }
    
    toast.success(
      <div className="flex items-center gap-2">
        <span className="font-medium">{product.title}</span> ajouté au panier
      </div>,
      { duration: 3000 }
    );
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden w-full">
      <Navbar />
      
      <div className="bg-brand-orange/10 py-3 w-full">
        <div className="container mx-auto px-4 flex items-center justify-center cursor-pointer" onClick={scrollToDelivery}>
          <div className="flex items-center gap-3 group">
            <div className="flex items-center justify-center bg-white p-2 rounded-full shadow-sm">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L12 22" stroke="#F97316" strokeWidth="2" strokeLinecap="round"/>
                <path d="M17 5L7 19" stroke="#F97316" strokeWidth="2" strokeLinecap="round"/>
                <path d="M7 5L17 19" stroke="#F97316" strokeWidth="2" strokeLinecap="round"/>
                <path d="M2 12L22 12" stroke="#F97316" strokeWidth="2" strokeLinecap="round"/>
                <path d="M4.93 4.93L19.07 19.07" stroke="#F97316" strokeWidth="2" strokeLinecap="round"/>
                <path d="M19.07 4.93L4.93 19.07" stroke="#F97316" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <p className="font-medium text-gray-800">
              Livraison rapide de produits surgelés <span className="text-brand-orange">en 1 heure</span>
            </p>
            <span className="text-brand-orange group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>
      </div>
      
      <main className="w-full">
        <Hero />
        
        <div className="container mx-auto px-4 py-6 flex justify-center">
          <button 
            onClick={scrollToDelivery}
            className="bg-brand-orange hover:bg-brand-orange/90 text-white px-8 py-4 rounded-lg flex items-center gap-3 transition-colors shadow-md text-lg font-medium"
          >
            <Truck className="h-6 w-6" />
            Livraison à domicile en 1 heure
            <ChevronRight size={20} />
          </button>
        </div>
        
        <div ref={categoriesRef}>
          <Categories onAddToCart={addToCart} />
        </div>
        
        <div id="livraison-section" ref={deliveryRef}>
          <HomeDelivery onAddToCart={addToCart} />
        </div>
        
        <About />
        <Contact />
      </main>
      <Footer />

      <FloatingCart 
        items={cartItems}
        onUpdateQuantity={updateCartItemQuantity}
        onRemoveItem={removeCartItem}
      />
    </div>
  );
};

export default Index;
