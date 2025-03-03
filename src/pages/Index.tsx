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
import { Truck, ChevronRight, Store } from 'lucide-react';
import { StockItem } from '@/components/admin/types';

export const WHATSAPP_NUMBER = "0675725897";

const Index = () => {
  const deliveryRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const [cartItems, setCartItems] = useState([]);
  const [stockItems, setStockItems] = useState<StockItem[]>([]);

  useEffect(() => {
    const savedStock = localStorage.getItem("stockItems");
    if (savedStock) {
      setStockItems(JSON.parse(savedStock));
    }

    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }

    if (window.location.hash === '#livraison') {
      setTimeout(() => {
        scrollToDelivery();
      }, 500);
    }
  }, []);

  const scrollToDelivery = () => {
    if (deliveryRef.current) {
      const rect = deliveryRef.current.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const top = rect.top + scrollTop - 100;
      
      window.scrollTo({
        top,
        behavior: 'smooth'
      });
    }
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
    const updatedItems = cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
  };

  const removeCartItem = (id: number) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
  };

  const addToCart = (product: { id: number; title: string; image: string; price: number }) => {
    const stockItem = stockItems.find(item => item.id === product.id);
    if (stockItem && !stockItem.inStock) {
      toast.error(
        <div className="flex items-center gap-2">
          <span className="font-medium">{product.title}</span> est en rupture de stock
        </div>,
        { duration: 3000 }
      );
      return;
    }

    const existingItem = cartItems.find(item => item.id === product.id);
    let updatedItems;
    
    if (existingItem) {
      if (stockItem && existingItem.quantity >= stockItem.quantity) {
        toast.error(
          <div className="flex items-center gap-2">
            <span className="font-medium">Maximum disponible: {stockItem.quantity}</span>
          </div>,
          { duration: 3000 }
        );
        return;
      }
      
      updatedItems = cartItems.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      );
    } else {
      updatedItems = [...cartItems, {
        id: product.id,
        name: product.title,
        image: product.image,
        price: product.price,
        quantity: 1,
        inStock: stockItem ? stockItem.inStock : true
      }];
    }
    
    setCartItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
    
    toast.success(
      <div className="flex items-center gap-2">
        <span className="font-medium">{product.title}</span> ajouté au panier
      </div>,
      { duration: 3000 }
    );
  };

  const navigateToCommandeWithParams = (method: 'delivery' | 'pickup') => {
    localStorage.setItem("deliveryMethod", method);
    window.location.href = "/commande";
  };

  return (
    <div className="min-h-screen bg-white w-full">
      <Navbar />
      
      <main className="w-full pt-16">
        <Hero />
        
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row gap-4 justify-center">
          <button 
            onClick={() => navigateToCommandeWithParams('delivery')}
            className="bg-brand-orange hover:bg-brand-orange/90 text-white px-6 py-4 rounded-lg flex items-center gap-3 transition-colors shadow-md text-lg font-medium"
          >
            <Truck className="h-6 w-6" />
            Livraison à domicile en 1 heure
            <ChevronRight size={20} />
          </button>
          
          <button 
            onClick={() => navigateToCommandeWithParams('pickup')}
            className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-4 rounded-lg flex items-center gap-3 transition-colors shadow-md text-lg font-medium"
          >
            <Store className="h-6 w-6" />
            Click & Collect en 1 heure
            <ChevronRight size={20} />
          </button>
        </div>
        
        <div ref={categoriesRef}>
          <Categories onAddToCart={addToCart} stockItems={stockItems} />
        </div>
        
        <div id="livraison" ref={deliveryRef}>
          <HomeDelivery onAddToCart={addToCart} stockItems={stockItems} />
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
