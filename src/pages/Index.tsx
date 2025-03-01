
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
              {/* Option 2: Using Lucide icon with customized color (uncomment to use this instead)
              <Snowflake className="text-[#F97316] h-6 w-6" strokeWidth={2} />
              */}
            </div>
            <p className="font-medium text-gray-800">
              Livraison rapide de produits surgelés <span className="text-brand-orange">en 1 heure</span>
            </p>
            <span className="text-brand-orange group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>
      </div>
      
      {/* Home Delivery Highlight Section - Added directly to homepage */}
      <div className="bg-brand-cream py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">Livraison à domicile <span className="text-brand-orange">ultra-rapide</span></h2>
              <p className="text-gray-700 mb-6">
                Profitez de nos produits surgelés de qualité livrés directement chez vous en moins d'une heure. 
                Notre service de livraison fonctionne 7j/7 de 10h à 19h.
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="bg-brand-orange/10 p-2 rounded-full">
                    <Clock className="text-brand-orange h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Livraison en 1h maximum</h3>
                    <p className="text-sm text-gray-600">Recevez votre commande rapidement</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-brand-orange/10 p-2 rounded-full">
                    <MapPin className="text-brand-orange h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Paris et proche banlieue</h3>
                    <p className="text-sm text-gray-600">Zone de livraison en expansion</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-brand-orange/10 p-2 rounded-full">
                    <Truck className="text-brand-orange h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Livraison dans des conteneurs spéciaux</h3>
                    <p className="text-sm text-gray-600">Pour garantir la fraîcheur de vos produits</p>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={scrollToDelivery}
                className="bg-brand-orange hover:bg-brand-orange/90 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
              >
                Découvrir notre service
                <ChevronRight size={18} />
              </button>
            </div>
            
            <div className="md:w-1/2">
              <img 
                src="/lovable-uploads/eeb6edd3-b5a8-476d-99e1-4baecf67123e.png" 
                alt="Livraison ZMarket" 
                className="w-full h-auto rounded-xl shadow-lg"
                onError={(e) => {
                  console.error('Failed to load delivery image');
                  e.currentTarget.src = '/placeholder.svg';
                }}
              />
            </div>
          </div>
        </div>
      </div>
      
      <main>
        <Hero />
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
