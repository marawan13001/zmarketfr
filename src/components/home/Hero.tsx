
import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';

const Hero: React.FC = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [imageErrors, setImageErrors] = useState<{[key: string]: boolean}>({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Image paths
  const imagePaths = {
    background: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901',
    logo: '/lovable-uploads/672b581f-d176-4a85-8f3b-810bafe22f5c.png',
  };

  // Fallback images
  const fallbackImages = {
    background: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901',
    logo: '/placeholder.svg',
  };

  // Handle image loading success
  const handleImageLoad = (key: string) => {
    console.log(`Image loaded successfully: ${key}`);
    setImagesLoaded(true);
  };

  // Handle image error
  const handleImageError = (key: string) => {
    console.error(`Failed to load image: ${key}`);
    setImageErrors(prev => ({...prev, [key]: true}));
  };

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Cursor follower */}
      <div 
        className="fixed w-6 h-6 rounded-full bg-brand-orange/60 blur-md pointer-events-none z-50 transition-transform duration-100 ease-out"
        style={{ 
          left: `${mousePosition.x}px`, 
          top: `${mousePosition.y}px`,
          transform: 'translate(-50%, -50%)'
        }}
      />

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black/90 to-black/80 z-0"></div>
      
      {/* Background Image */}
      <div className="absolute inset-0 z-[-1]">
        <img 
          src={imageErrors.background ? fallbackImages.background : imagePaths.background}
          alt="Background" 
          className="w-full h-full object-cover opacity-40"
          style={{ objectPosition: "center 30%" }}
          onLoad={() => handleImageLoad('background')}
          onError={() => handleImageError('background')}
        />
      </div>
      
      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90 z-0"></div>
      
      {/* Content */}
      <div className="container px-4 mx-auto relative z-10 pt-20 pb-16 md:py-32">
        <div className="flex flex-col items-center justify-center text-center">
          <ScrollReveal direction="up" delay={100}>
            <div className="mb-8">
              <img 
                src={imageErrors.logo ? fallbackImages.logo : imagePaths.logo} 
                alt="Z Market Logo" 
                className="h-20 md:h-24 mx-auto"
                onLoad={() => handleImageLoad('logo')}
                onError={() => handleImageError('logo')}
              />
            </div>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={150}>
            <div className="mb-4 flex flex-wrap gap-2 justify-center">
              <span className="px-4 py-1 rounded-full text-sm font-medium bg-brand-orange/20 text-brand-orange border border-brand-orange/30">ALIMENTAIRE</span>
              <span className="px-4 py-1 rounded-full text-sm font-medium bg-brand-orange/20 text-brand-orange border border-brand-orange/30">SURGELÉ HALAL</span>
              <span className="px-4 py-1 rounded-full text-sm font-medium bg-brand-orange/20 text-brand-orange border border-brand-orange/30">BOISSON</span>
              <span className="px-4 py-1 rounded-full text-sm font-medium bg-brand-orange/20 text-brand-orange border border-brand-orange/30">MATERIEL CHR</span>
            </div>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={200}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-4 max-w-4xl mx-auto">
              Découvrez les Produits Professionnels Dédiés aux <span className="text-brand-orange">Particuliers</span>
            </h1>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={300}>
            <p className="text-lg text-gray-200 mb-10 max-w-2xl mx-auto text-center">
              Des produits haut de gamme, préparés avec soin et certifiés halal. Trouvez des surgelés, des produits frais, secs et des boissons dans notre magasin.
            </p>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={400}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#produits" 
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-brand-orange text-white font-medium transition-all hover:bg-brand-orange/90 hover:scale-105"
              >
                Découvrir nos produits
                <ArrowRight size={18} className="ml-2" />
              </a>
              <a 
                href="#contact" 
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-transparent border border-white/20 text-white font-medium transition-all hover:bg-white/10"
              >
                Nous trouver
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <span className="text-white/70 text-sm mb-2">Découvrir</span>
        <div className="w-0.5 h-10 bg-gradient-to-b from-white/40 to-transparent rounded animate-pulse-slow"></div>
      </div>
    </section>
  );
};

export default Hero;
