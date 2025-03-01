
import React, { useEffect, useRef } from 'react';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/home/Hero';
import Categories from '@/components/home/Categories';
import HomeDelivery from '@/components/home/HomeDelivery';
import About from '@/components/home/About';
import Contact from '@/components/home/Contact';
import Footer from '@/components/layout/Footer';
import { toast } from 'sonner';
import { Snowflake } from 'lucide-react';

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
            <div className="bg-white p-2 rounded-full shadow-sm">
              <Snowflake className="text-brand-orange h-6 w-6" />
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
