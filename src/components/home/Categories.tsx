
import React, { useState } from 'react';
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

interface ProductProps {
  image: string;
  title: string;
  brand: string;
  weight: string;
  category: string;
}

const ProductCard: React.FC<ProductProps> = ({ image, title, brand, weight, category }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all hover:translate-y-[-5px] group">
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 bg-brand-orange text-white text-xs font-medium py-1 px-2 rounded-full">
          {category}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-500 mb-2">{brand}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">{weight}</span>
          <span className="text-xs py-1 px-2 bg-gray-100 rounded-full font-medium text-gray-700">Halal</span>
        </div>
      </div>
    </div>
  );
};

const Categories: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  
  const categories = [
    {
      id: "all",
      title: "Tous les produits",
      description: "Notre sélection complète de produits Halal premium pour tous les goûts.",
      icon: <Package size={28} />,
      delay: 100
    },
    {
      id: "frozen",
      title: "Produits Surgelés",
      description: "Une large gamme de produits surgelés Halal de qualité premium pour tous les goûts.",
      icon: <IceCream size={28} />,
      delay: 200
    },
    {
      id: "fresh",
      title: "Produits Frais",
      description: "Des produits frais sélectionnés avec soin pour garantir fraîcheur et qualité.",
      icon: <Refrigerator size={28} />,
      delay: 300
    },
    {
      id: "drinks",
      title: "Boissons",
      description: "Un choix varié de boissons pour accompagner vos repas et moments de détente.",
      icon: <Coffee size={28} />,
      delay: 400
    }
  ];

  const products = [
    {
      id: 1,
      image: "/lovable-uploads/14d917c9-a8ac-4ffc-bae2-cd02b95fd486.png",
      title: "Bœuf Halal Tranché",
      brand: "HALBEEF",
      weight: "800g",
      category: "frozen"
    },
    {
      id: 2,
      image: "/lovable-uploads/3230e5df-068b-4a55-89ea-10484b277a5a.png",
      title: "Bœuf Halal Haché",
      brand: "HALBEEF",
      weight: "800g",
      category: "frozen"
    },
    {
      id: 3,
      image: "/lovable-uploads/e5cb8b7d-61b4-4258-beca-9d45d00f51f0.png",
      title: "Poulet Entier",
      brand: "Vedina",
      weight: "2kg",
      category: "frozen"
    },
    {
      id: 4,
      image: "/lovable-uploads/dec641d6-c084-497b-83dc-ddf8cb4c5c53.png",
      title: "Poulet Entier",
      brand: "Vedina",
      weight: "2kg",
      category: "frozen"
    },
    {
      id: 5,
      image: "/lovable-uploads/ade6d804-0040-4868-940d-50f471a0ebca.png",
      title: "Poulet Pané",
      brand: "Vedina",
      weight: "800g",
      category: "frozen"
    },
    {
      id: 6,
      image: "/lovable-uploads/d56c0d79-a101-4067-809c-49ae8bf2b5ea.png",
      title: "Cordons Bleus",
      brand: "Vedina",
      weight: "875g",
      category: "frozen"
    },
    {
      id: 7,
      image: "/lovable-uploads/c416881d-1296-4496-964d-ea866136d2fc.png",
      title: "Veggie Bites",
      brand: "Greens",
      weight: "1000g",
      category: "frozen"
    },
    {
      id: 8,
      image: "/lovable-uploads/9ca2f98b-369e-4205-ad84-00c5d774d128.png",
      title: "Poulet Rôti Tranché",
      brand: "Vedina",
      weight: "2kg",
      category: "frozen"
    },
    {
      id: 9,
      image: "/lovable-uploads/f96329d1-539b-41bc-8c63-c12b7a050ae6.png",
      title: "Poulet Mariné",
      brand: "Vedina",
      weight: "800g",
      category: "frozen"
    },
    {
      id: 10,
      image: "/lovable-uploads/6789b32c-f705-4682-a1d6-04711575997c.png",
      title: "Poulet Épicé",
      brand: "Vedina",
      weight: "800g",
      category: "frozen"
    },
    {
      id: 11,
      image: "/lovable-uploads/829ba4b3-184f-48f2-9b47-61ff5966a02e.png",
      title: "Salade Sultan",
      brand: "Greens Cuisin'easy",
      weight: "1250g",
      category: "fresh"
    },
    {
      id: 12,
      image: "/lovable-uploads/786f8b28-d009-4919-9f5c-35950e94f592.png",
      title: "Pâtes Mozzarella",
      brand: "Greens Cuisin'easy",
      weight: "1250g",
      category: "fresh"
    },
    {
      id: 13,
      image: "/lovable-uploads/06bfda08-4f12-4c74-b680-6b7a9ddcab29.png",
      title: "Boisson Halal",
      brand: "Z Market Selection",
      weight: "1L",
      category: "drinks"
    }
  ];

  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(product => product.category === activeCategory);

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
        
        {/* Catégories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {categories.map((category, index) => (
            <div 
              key={index} 
              className="cursor-pointer"
              onClick={() => setActiveCategory(category.id)}
            >
              <div 
                className={`h-full ${activeCategory === category.id ? 'bg-brand-orange text-white' : 'bg-white hover:bg-white/80'} rounded-xl p-6 shadow-sm border border-gray-100 transition-all hover:translate-y-[-5px] group`}
              >
                <div className={`w-14 h-14 rounded-lg ${activeCategory === category.id ? 'bg-white/20 text-white' : 'bg-brand-orange/10 text-brand-orange'} flex items-center justify-center mb-6 transition-colors`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{category.title}</h3>
                <p className={activeCategory === category.id ? 'text-white/80' : 'text-gray-600'}>{category.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Produits */}
        <ScrollReveal delay={300} direction="up">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id}
                image={product.image}
                title={product.title}
                brand={product.brand}
                weight={product.weight}
                category={product.category === "frozen" ? "Surgelé" : product.category === "fresh" ? "Frais" : "Boisson"}
              />
            ))}
          </div>
        </ScrollReveal>
        
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
