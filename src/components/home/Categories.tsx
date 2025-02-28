
import React from 'react';
import { IceCream, Refrigerator, Package, Coffee } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';

interface CategoryCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, description, icon, delay }) => {
  return (
    <ScrollReveal delay={delay} direction="up" className="w-full">
      <div className="h-full bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all hover:translate-y-[-5px] group">
        <div className="w-14 h-14 rounded-lg bg-brand-orange/10 flex items-center justify-center mb-6 text-brand-orange transition-colors group-hover:bg-brand-orange group-hover:text-white">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </ScrollReveal>
  );
};

const Categories: React.FC = () => {
  const categories = [
    {
      title: "Produits Surgelés",
      description: "Une large gamme de produits surgelés Halal de qualité premium pour tous les goûts.",
      icon: <IceCream size={28} />,
      delay: 100
    },
    {
      title: "Produits Frais",
      description: "Des produits frais sélectionnés avec soin pour garantir fraîcheur et qualité.",
      icon: <Refrigerator size={28} />,
      delay: 200
    },
    {
      title: "Épicerie Sèche",
      description: "Découvrez notre sélection d'épicerie sèche Halal pour compléter vos repas.",
      icon: <Package size={28} />,
      delay: 300
    },
    {
      title: "Boissons",
      description: "Un choix varié de boissons pour accompagner vos repas et moments de détente.",
      icon: <Coffee size={28} />,
      delay: 400
    }
  ];

  return (
    <section id="produits" className="py-20 md:py-32 bg-brand-gray">
      <div className="container px-4 mx-auto">
        <ScrollReveal delay={50} direction="up">
          <span className="inline-block py-1 px-3 mb-6 rounded-full bg-brand-orange/10 text-brand-orange font-medium text-sm">
            Nos Catégories
          </span>
        </ScrollReveal>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <ScrollReveal delay={100} direction="up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-0 text-gray-900">
              Découvrez Notre <span className="text-brand-orange">Sélection</span>
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={200} direction="up">
            <p className="text-gray-600 max-w-md">
              Tous nos produits sont soigneusement sélectionnés et certifiés Halal pour vous offrir une expérience culinaire exceptionnelle.
            </p>
          </ScrollReveal>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              title={category.title}
              description={category.description}
              icon={category.icon}
              delay={category.delay}
            />
          ))}
        </div>
        
        <ScrollReveal delay={500} direction="up" className="mt-16 text-center">
          <a 
            href="#"
            className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-brand-orange text-white font-medium transition-all hover:bg-brand-orange/90 hover:scale-105"
          >
            Voir tous nos produits
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Categories;
