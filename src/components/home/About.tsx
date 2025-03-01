
import React from 'react';
import { Check } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';

const About: React.FC = () => {
  const features = [
    "100% Certifié Halal",
    "Ingrédients de haute qualité",
    "Préparation selon les traditions",
    "Saveurs authentiques",
    "Options pour toute la famille"
  ];

  return (
    <section id="a-propos" className="py-20 md:py-32 overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="order-2 md:order-1">
            <div className="relative">
              <ScrollReveal direction="right">
                <div 
                  className="rounded-2xl overflow-hidden h-[450px] w-full md:w-[90%] relative z-10 shadow-xl"
                  style={{ 
                    backgroundImage: "url('/lovable-uploads/e08d9a35-f285-434b-8e11-c6a4adab48cb.png')", 
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                  }}
                ></div>
              </ScrollReveal>
              
              <div className="absolute top-[20%] -right-10 w-[150px] h-[150px] bg-brand-orange rounded-2xl blur-3xl opacity-20 z-0"></div>
              <div className="absolute -bottom-10 -left-10 w-[180px] h-[180px] bg-brand-orange rounded-full blur-3xl opacity-20 z-0"></div>
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            <ScrollReveal direction="up" delay={100}>
              <span className="inline-block py-1 px-3 mb-6 rounded-full bg-brand-orange/10 text-brand-orange font-medium text-sm">
                Notre Histoire
              </span>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={200}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Une <span className="text-brand-orange">Passion</span> pour les Produits Halal de Qualité
              </h2>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={300}>
              <p className="text-gray-600 mb-8">
                Chez ZMarket, nous nous engageons à offrir des produits surgelés, frais, secs et des boissons 
                qui respectent les traditions halal tout en proposant une expérience gustative exceptionnelle. 
                Notre mission est de rendre accessible à tous une alimentation halal de qualité.
              </p>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={400}>
              <div className="space-y-3 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <div className="mr-3 mt-1 w-5 h-5 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange">
                      <Check size={14} />
                    </div>
                    <p className="text-gray-700">{feature}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={500}>
              <a 
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-brand-orange text-white font-medium transition-all hover:bg-brand-orange/90 hover:scale-105"
              >
                Nous Contacter
              </a>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
