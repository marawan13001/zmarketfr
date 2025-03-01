
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';

const Hero: React.FC = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [imageErrors, setImageErrors] = useState<{[key: string]: boolean}>({});

  // Image paths - using correct paths without "/public" prefix
  const imagePaths = {
    background: '/lovable-uploads/b0be503c-11d2-44a7-8671-5efe375b1a53.png',
    logo: '/lovable-uploads/672b581f-d176-4a85-8f3b-810bafe22f5c.png',
    food1: '/lovable-uploads/7566ebde-6f4f-485f-b523-2037183b002d.png',
    food2: '/lovable-uploads/119b6b0a-b379-4049-aaaa-e05b38872e88.png'
  };

  // Fallback images for when the primary images fail to load
  const fallbackImages = {
    background: '/placeholder.svg',
    logo: '/placeholder.svg',
    food1: '/placeholder.svg',
    food2: '/placeholder.svg'
  };

  // Handle image loading success
  const handleImageLoad = (key: string) => {
    console.log(`Image loaded successfully: ${key}`);
    setImagesLoaded(true);
  };

  // Handle image error
  const handleImageError = (key: string) => {
    console.error(`Failed to load image: ${imagePaths[key as keyof typeof imagePaths]}`);
    setImageErrors(prev => ({...prev, [key]: true}));
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="md:pr-8">
            <ScrollReveal direction="up" delay={100}>
              <div className="mb-8">
                <img 
                  src={imageErrors.logo ? fallbackImages.logo : imagePaths.logo} 
                  alt="Z Market Logo" 
                  className="h-20 md:h-24"
                  onLoad={() => handleImageLoad('logo')}
                  onError={() => handleImageError('logo')}
                />
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={200}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-6">
                Découvrez l'Excellence de la Cuisine <span className="text-brand-orange">Halal Surgelée</span>
              </h1>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={300}>
              <p className="text-lg text-gray-200 mb-8 max-w-lg">
                Des produits haut de gamme, préparés avec soin et certifiés halal. Trouvez des surgelés, des produits frais, secs et des boissons dans notre magasin.
              </p>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={400}>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="#produits" 
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-brand-orange text-white font-medium transition-all hover:bg-brand-orange/90 hover:scale-105"
                >
                  Découvrir nos produits
                  <ArrowRight size={18} className="ml-2" />
                </a>
                <a 
                  href="#contact" 
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-transparent border border-white/20 text-white font-medium transition-all hover:bg-white/10"
                >
                  Nous trouver
                </a>
              </div>
            </ScrollReveal>
          </div>
          
          <div className="hidden md:block relative h-[500px]">
            <ScrollReveal direction="left" delay={500} className="absolute right-0 top-0 w-[300px] h-[300px]">
              <div className="w-full h-full rounded-xl overflow-hidden shadow-2xl animate-float" style={{ transform: "rotate(5deg)" }}>
                <div className="flex items-center justify-center w-full h-full bg-gray-100 text-gray-500 text-sm p-4">
                  {imageErrors.food1 ? 
                    <div className="flex flex-col items-center">
                      <span>Image non disponible</span>
                      <img src="/placeholder.svg" alt="Placeholder" className="w-16 h-16 mt-2" />
                    </div> : 
                    <img 
                      src={imagePaths.food1} 
                      alt="Produit halal" 
                      className="w-full h-full object-cover"
                      onLoad={() => handleImageLoad('food1')}
                      onError={() => handleImageError('food1')}
                    />
                  }
                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="left" delay={700} className="absolute right-20 bottom-20 w-[250px] h-[250px]">
              <div className="w-full h-full rounded-xl overflow-hidden shadow-2xl animate-float animation-delay-1000" style={{ transform: "rotate(-5deg)" }}>
                <div className="flex items-center justify-center w-full h-full bg-gray-100 text-gray-500 text-sm p-4">
                  {imageErrors.food2 ? 
                    <div className="flex flex-col items-center">
                      <span>Image non disponible</span>
                      <img src="/placeholder.svg" alt="Placeholder" className="w-16 h-16 mt-2" />
                    </div> : 
                    <img 
                      src={imagePaths.food2} 
                      alt="Produit halal" 
                      className="w-full h-full object-cover"
                      onLoad={() => handleImageLoad('food2')}
                      onError={() => handleImageError('food2')}
                    />
                  }
                </div>
              </div>
            </ScrollReveal>
          </div>
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
