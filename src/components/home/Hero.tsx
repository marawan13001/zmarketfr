
import React from 'react';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black/90 to-black/80 z-0"></div>
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-[-1] opacity-40"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?q=80&w=2000')",
          backgroundPositionY: "30%"
        }}
      ></div>
      
      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90 z-0"></div>
      
      {/* Content */}
      <div className="container px-4 mx-auto relative z-10 pt-20 pb-16 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="md:pr-8">
            <ScrollReveal direction="up" delay={100}>
              <span className="inline-block py-1 px-3 mb-6 rounded-full bg-brand-orange/10 text-brand-orange font-medium text-sm">
                Qualité Premium Halal
              </span>
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
              <div 
                className="w-full h-full rounded-xl overflow-hidden shadow-2xl animate-float"
                style={{ 
                  backgroundImage: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=600')", 
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  transform: "rotate(5deg)"
                }}
              ></div>
            </ScrollReveal>
            
            <ScrollReveal direction="left" delay={700} className="absolute right-20 bottom-20 w-[250px] h-[250px]">
              <div 
                className="w-full h-full rounded-xl overflow-hidden shadow-2xl animate-float animation-delay-1000"
                style={{ 
                  backgroundImage: "url('https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?q=80&w=600')", 
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  transform: "rotate(-5deg)"
                }}
              ></div>
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
