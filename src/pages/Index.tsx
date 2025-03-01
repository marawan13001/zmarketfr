import React, { useEffect, useRef } from 'react';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/home/Hero';
import Categories from '@/components/home/Categories';
import HomeDelivery from '@/components/home/HomeDelivery';
import About from '@/components/home/About';
import Contact from '@/components/home/Contact';
import Footer from '@/components/layout/Footer';
import { toast } from 'sonner';
import { Snowflake, Clock, MapPin, Truck, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const deliveryRef = useRef<HTMLDivElement>(null);

  // Notification pour informer de la mise à jour du design
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
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <Navbar />
      
      {/* Mini Page Banner for Frozen Delivery */}
      <div className="bg-brand-orange/10 py-3">
        <div className="container mx-auto px-4 flex items-center justify-center cursor-pointer" onClick={scrollToDelivery}>
          <div className="flex items-center gap-3 group">
            <div className="flex items-center justify-center bg-white p-2 rounded-full shadow-sm">
              {/* Option 1: Using custom SVG that exactly matches the provided image */}
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
      
      <main>
        <Hero />
        
        {/* Simple Delivery CTA Button right after Hero section */}
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
        
        <Categories />
        <div ref={deliveryRef}>
          <HomeDelivery />
        </div>
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
