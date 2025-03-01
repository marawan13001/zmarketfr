
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/home/Hero';
import Categories from '@/components/home/Categories';
import About from '@/components/home/About';
import Contact from '@/components/home/Contact';
import Footer from '@/components/layout/Footer';
import { toast } from 'sonner';

const Index = () => {
  // Notification avec lien direct vers la page de test d'images
  React.useEffect(() => {
    setTimeout(() => {
      toast.info(
        <div>
          Nous avons ajouté de nouvelles images de produits Vedina! 
          <a href="/test-images" className="text-blue-500 underline ml-1">
            Voir les détails
          </a>
        </div>,
        {
          duration: 8000,
          position: "bottom-center"
        }
      );
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
