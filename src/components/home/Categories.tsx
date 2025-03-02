import React, { useState } from 'react';
import { IceCream, Refrigerator, Package, Coffee, ShoppingCart } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';
import { toast } from 'sonner';

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
  id: number;
  image: string;
  title: string;
  brand: string;
  weight: string;
  category: string;
  price: number;
  onAddToCart: (product: { id: number; title: string; image: string; price: number }) => void;
}

const ProductCard: React.FC<ProductProps> = ({ id, image, title, brand, weight, category, price, onAddToCart }) => {
  const handleAddToCart = () => {
    onAddToCart({ id, title, image, price });
  };

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
        <div className="flex justify-between items-center mb-1">
          <h3 className="font-bold text-gray-900">{title}</h3>
          <span className="text-brand-orange font-bold">{price.toFixed(2)}€</span>
        </div>
        <p className="text-sm text-gray-500 mb-2">{brand}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">{weight}</span>
          <div className="flex gap-2 items-center">
            <span className="text-xs py-1 px-2 bg-gray-100 rounded-full font-medium text-gray-700">Halal</span>
            <button 
              onClick={handleAddToCart}
              className="flex items-center gap-1 bg-brand-orange hover:bg-brand-orange/90 text-white py-1.5 px-3 rounded-lg transition-colors"
            >
              <ShoppingCart size={14} />
              <span className="text-sm">Ajouter</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface CategoriesProps {
  onAddToCart?: (product: { id: number; title: string; image: string; price: number }) => void;
}

const Categories: React.FC<CategoriesProps> = ({ onAddToCart = () => {} }) => {
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
      image: "/lovable-uploads/1e7548f5-8859-4e95-b8cb-40cab3d8dd35.png",
      title: "Hachis Parmentier",
      brand: "Isla Délice",
      weight: "1kg",
      category: "frozen",
      price: 6.99
    },
    {
      id: 2,
      image: "/lovable-uploads/d2681e21-da6a-4833-a3ab-0401774b86b8.png",
      title: "Lasagnes Bolognaise",
      brand: "Isla Délice",
      weight: "1kg",
      category: "frozen",
      price: 7.49
    },
    {
      id: 3,
      image: "/lovable-uploads/433dd9e5-e599-46c3-8392-fc448937ffc8.png",
      title: "M'Semen",
      brand: "Isla Délice",
      weight: "300g",
      category: "frozen",
      price: 4.99
    },
    {
      id: 4,
      image: "/lovable-uploads/598f2802-d958-4c9f-a399-523b3093bc03.png",
      title: "Chili Con Carne",
      brand: "Isla Délice",
      weight: "350g",
      category: "fresh",
      price: 5.49
    },
    {
      id: 5,
      image: "/lovable-uploads/a93f4692-ec7d-4f4e-85a8-ab6d49983972.png",
      title: "Penne Carbonara",
      brand: "Isla Délice",
      weight: "350g",
      category: "fresh",
      price: 5.49
    },
    {
      id: 6,
      image: "/lovable-uploads/3dc16206-c347-4845-8b8c-a647f326e35a.png",
      title: "Fusilli Bolognaise",
      brand: "Isla Délice",
      weight: "350g",
      category: "fresh",
      price: 5.49
    },
    {
      id: 7,
      image: "/lovable-uploads/2f0beba4-380a-432d-a95c-d2adf30b0af5.png",
      title: "Poulet Mariné Harissa",
      brand: "Isla Délice",
      weight: "400g",
      category: "frozen",
      price: 6.99
    },
    {
      id: 8,
      image: "/lovable-uploads/f8882b9d-14ea-4d99-80c5-9e95889b9a08.png",
      title: "Pizza Kebab",
      brand: "Isla Délice",
      weight: "420g",
      category: "frozen",
      price: 5.99
    },
    {
      id: 9,
      image: "/lovable-uploads/b198d5d0-a298-4da5-8981-3d139ea2060f.png",
      title: "Pizza Royale",
      brand: "Isla Délice",
      weight: "430g",
      category: "frozen",
      price: 5.99
    },
    {
      id: 10,
      image: "/lovable-uploads/f2711295-a3ab-4f6d-8f4d-c654ff21b6b9.png",
      title: "Corn Dog",
      brand: "Isla Délice",
      weight: "300g",
      category: "frozen",
      price: 4.49
    },
    {
      id: 11,
      image: "/lovable-uploads/c244efe0-0408-4159-8ca0-b3ffbcedd505.png",
      title: "Nems de Dinde",
      brand: "Isla Délice",
      weight: "280g",
      category: "frozen",
      price: 4.99
    },
    {
      id: 12,
      image: "/lovable-uploads/7e562f60-6ce9-4803-a8b1-2c661c5e1394.png",
      title: "Samoussas de Dinde",
      brand: "Isla Délice",
      weight: "200g",
      category: "frozen",
      price: 4.49
    },
    {
      id: 13,
      image: "/lovable-uploads/b0105d8f-dcf3-4781-9be3-b4a3597dfc6e.png",
      title: "Empanadas de Dinde",
      brand: "Isla Délice",
      weight: "160g",
      category: "frozen",
      price: 3.99
    },
    {
      id: 14,
      image: "/lovable-uploads/d6f4f369-b5a9-424e-9666-32854a6a1a0f.png",
      title: "Mogu Mogu Pastèque",
      brand: "Mogu Mogu",
      weight: "320ml",
      category: "drinks",
      price: 2.49
    },
    {
      id: 15,
      image: "/lovable-uploads/2e6b10c0-52c0-4df5-8de4-ba644d2d1d5d.png",
      title: "Mogu Mogu Myrtille",
      brand: "Mogu Mogu",
      weight: "320ml",
      category: "drinks",
      price: 2.49
    },
    {
      id: 16,
      image: "/lovable-uploads/2a80a5bc-ed23-4f7b-878a-65b63d545001.png",
      title: "Mogu Mogu Litchi",
      brand: "Mogu Mogu",
      weight: "320ml",
      category: "drinks",
      price: 2.49
    },
    {
      id: 17,
      image: "/lovable-uploads/4c35a608-024c-404b-8289-b85a7d567f11.png",
      title: "Mogu Mogu Fruit de la Passion",
      brand: "Mogu Mogu",
      weight: "320ml",
      category: "drinks",
      price: 2.49
    },
    {
      id: 18,
      image: "/lovable-uploads/91da941d-c3fa-4c69-84fd-d97ff502ec3b.png",
      title: "Mogu Mogu Pêche",
      brand: "Mogu Mogu",
      weight: "320ml",
      category: "drinks",
      price: 2.49
    },
    {
      id: 19,
      image: "/lovable-uploads/ac338037-eedc-4e04-b524-a732c404939f.png",
      title: "Mogu Mogu Coco",
      brand: "Mogu Mogu",
      weight: "320ml",
      category: "drinks",
      price: 2.49
    },
    {
      id: 20,
      image: "/lovable-uploads/9575ecb2-4a7c-4f27-aa26-ad2daa24ba12.png",
      title: "Mogu Mogu Fraise",
      brand: "Mogu Mogu",
      weight: "320ml",
      category: "drinks",
      price: 2.49
    },
    {
      id: 21,
      image: "/lovable-uploads/b9b0e0b9-e39d-425d-944c-3ca9abbf8fed.png",
      title: "Mogu Mogu Melon",
      brand: "Mogu Mogu",
      weight: "320ml",
      category: "drinks",
      price: 2.49
    },
    {
      id: 22,
      image: "/lovable-uploads/23b8692e-080c-4ff2-b592-6b8177190c4a.png",
      title: "Mogu Mogu Mangue",
      brand: "Mogu Mogu",
      weight: "320ml",
      category: "drinks",
      price: 2.49
    },
    {
      id: 23,
      image: "/lovable-uploads/79cda79d-be87-476b-83ac-bd55e167e2a6.png",
      title: "Mogu Mogu Citron",
      brand: "Mogu Mogu",
      weight: "320ml",
      category: "drinks",
      price: 2.49
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
        
        <ScrollReveal delay={300} direction="up">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id}
                id={product.id}
                image={product.image}
                title={product.title}
                brand={product.brand}
                weight={product.weight}
                category={product.category === "frozen" ? "Surgelé" : product.category === "fresh" ? "Frais" : "Boisson"}
                price={product.price}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        </ScrollReveal>
        
        <ScrollReveal delay={500} direction="up" className="mt-16 text-center">
          <a 
            href="/commande"
            className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-brand-orange text-white font-medium transition-all hover:bg-brand-orange/90 hover:scale-105"
          >
            Commander maintenant
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Categories;
