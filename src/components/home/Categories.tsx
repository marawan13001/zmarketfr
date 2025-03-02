import React, { useState, useEffect } from 'react';
import { IceCream, Refrigerator, Package, Coffee, ShoppingCart, Beef, Salad, UtensilsCrossed } from 'lucide-react';
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
  subcategory?: string;
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
  const [activeSubcategory, setActiveSubcategory] = useState("all");
  
  useEffect(() => {
    setActiveSubcategory("all");
  }, [activeCategory]);

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

  const subcategories = [
    {
      id: "viande",
      title: "Viandes",
      icon: <Beef size={20} />,
      color: "bg-red-500",
      textColor: "text-red-500",
      bgColor: "bg-red-50",
      hoverBgColor: "hover:bg-red-100",
      activeBgColor: "bg-red-100"
    },
    {
      id: "plats",
      title: "Plats Cuisinés",
      icon: <UtensilsCrossed size={20} />,
      color: "bg-amber-500",
      textColor: "text-amber-500",
      bgColor: "bg-amber-50",
      hoverBgColor: "hover:bg-amber-100",
      activeBgColor: "bg-amber-100"
    },
    {
      id: "legumes",
      title: "Légumes",
      icon: <Salad size={20} />,
      color: "bg-green-500",
      textColor: "text-green-500",
      bgColor: "bg-green-50",
      hoverBgColor: "hover:bg-green-100",
      activeBgColor: "bg-green-100"
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
      subcategory: "plats",
      price: 6.99
    },
    {
      id: 2,
      image: "/lovable-uploads/d2681e21-da6a-4833-a3ab-0401774b86b8.png",
      title: "Lasagnes Bolognaise",
      brand: "Isla Délice",
      weight: "1kg",
      category: "frozen",
      subcategory: "plats",
      price: 7.49
    },
    {
      id: 3,
      image: "/lovable-uploads/433dd9e5-e599-46c3-8392-fc448937ffc8.png",
      title: "M'Semen",
      brand: "Isla Délice",
      weight: "300g",
      category: "frozen",
      subcategory: "plats",
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
      subcategory: "viande",
      price: 6.99
    },
    {
      id: 8,
      image: "/lovable-uploads/f8882b9d-14ea-4d99-80c5-9e95889b9a08.png",
      title: "Pizza Kebab",
      brand: "Isla Délice",
      weight: "420g",
      category: "frozen",
      subcategory: "plats",
      price: 5.99
    },
    {
      id: 9,
      image: "/lovable-uploads/b198d5d0-a298-4da5-8981-3d139ea2060f.png",
      title: "Pizza Royale",
      brand: "Isla Délice",
      weight: "430g",
      category: "frozen",
      subcategory: "plats",
      price: 5.99
    },
    {
      id: 10,
      image: "/lovable-uploads/f2711295-a3ab-4f6d-8f4d-c654ff21b6b9.png",
      title: "Corn Dog",
      brand: "Isla Délice",
      weight: "300g",
      category: "frozen",
      subcategory: "plats",
      price: 4.49
    },
    {
      id: 11,
      image: "/lovable-uploads/c244efe0-0408-4159-8ca0-b3ffbcedd505.png",
      title: "Nems de Dinde",
      brand: "Isla Délice",
      weight: "280g",
      category: "frozen",
      subcategory: "plats",
      price: 4.99
    },
    {
      id: 12,
      image: "/lovable-uploads/7e562f60-6ce9-4803-a8b1-2c661c5e1394.png",
      title: "Samoussas de Dinde",
      brand: "Isla Délice",
      weight: "200g",
      category: "frozen",
      subcategory: "plats",
      price: 4.49
    },
    {
      id: 13,
      image: "/lovable-uploads/b0105d8f-dcf3-4781-9be3-b4a3597dfc6e.png",
      title: "Empanadas de Dinde",
      brand: "Isla Délice",
      weight: "160g",
      category: "frozen",
      subcategory: "plats",
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
    },
    {
      id: 24,
      image: "/lovable-uploads/3108354e-d4b5-49dd-b5f6-d6745fe8fa76.png",
      title: "Viande Hachée de Boeuf",
      brand: "HALBEEF",
      weight: "800g",
      category: "frozen",
      subcategory: "viande",
      price: 9.99
    },
    {
      id: 25,
      image: "/lovable-uploads/a7dfcddb-d653-45aa-9896-dbe029789e8e.png",
      title: "Merguez de Boeuf",
      brand: "HALBEEF",
      weight: "800g",
      category: "frozen",
      subcategory: "viande",
      price: 8.99
    },
    {
      id: 26,
      image: "/lovable-uploads/8929a570-5ea5-49d4-b84a-09dc31b85f00.png",
      title: "Morceaux de Poulet",
      brand: "Vedina",
      weight: "2kg",
      category: "frozen",
      subcategory: "viande",
      price: 14.99
    },
    {
      id: 27,
      image: "/lovable-uploads/03f661b0-ba72-449a-839b-79af3f29308c.png",
      title: "Poulet Pané",
      brand: "Vedina",
      weight: "800g",
      category: "frozen",
      subcategory: "viande",
      price: 8.99
    },
    {
      id: 28,
      image: "/lovable-uploads/a2815b0f-1152-4cfa-83f1-c52eaec0aad7.png",
      title: "Cordons Bleus",
      brand: "Vedina",
      weight: "875g",
      category: "frozen",
      subcategory: "viande",
      price: 10.49
    },
    {
      id: 29,
      image: "/lovable-uploads/c9b1324f-dc47-42a1-8439-5cae1c724eaf.png",
      title: "Crème Veggie Bites",
      brand: "Greens",
      weight: "1000g",
      category: "frozen",
      subcategory: "legumes",
      price: 7.99
    },
    {
      id: 30,
      image: "/lovable-uploads/9dfc2bb1-289f-4b76-8c26-38608c0eca31.png",
      title: "Blanc de Poulet Tranché",
      brand: "Vedina",
      weight: "2kg",
      category: "frozen",
      subcategory: "viande",
      price: 16.99
    },
    {
      id: 31,
      image: "/lovable-uploads/e64e59fb-99d9-4a4e-801d-bda76c096b34.png",
      title: "Émincé de Poulet Mariné",
      brand: "Vedina",
      weight: "800g",
      category: "frozen",
      subcategory: "viande",
      price: 9.99
    },
    {
      id: 32,
      image: "/lovable-uploads/b3460e2c-5fd3-4012-9d7d-9e5916f10e98.png",
      title: "Sultan of Swing Couscous",
      brand: "Greens Cuisin'easy",
      weight: "1250g",
      category: "frozen",
      subcategory: "plats",
      price: 6.99
    },
    {
      id: 33,
      image: "/lovable-uploads/182c5bcb-9965-48ae-9812-5c4338cc2532.png",
      title: "Bella Ciao Pasta Salad",
      brand: "Greens Cuisin'easy",
      weight: "1250g",
      category: "frozen",
      subcategory: "plats",
      price: 6.99
    },
    {
      id: 34,
      image: "/lovable-uploads/250f3181-7ee7-41d6-9c3b-460da5cbbbbb.png",
      title: "Chicken Wings Épicés",
      brand: "Vedina",
      weight: "1kg",
      category: "frozen",
      subcategory: "viande",
      price: 11.99
    },
    {
      id: 35,
      image: "/lovable-uploads/a4404067-b58d-41e2-814d-5664bef1aab1.png",
      title: "Mix Poivrons Rouge et Vert",
      brand: "Greens",
      weight: "2500g",
      category: "frozen",
      subcategory: "legumes",
      price: 8.99
    },
    {
      id: 36,
      image: "/lovable-uploads/35df7411-7962-41b9-ad20-d58575d3a39d.png",
      title: "Petits Pois",
      brand: "Greens",
      weight: "1000g",
      category: "frozen",
      subcategory: "legumes",
      price: 4.49
    },
    {
      id: 37,
      image: "/lovable-uploads/48ced986-2992-4f52-85a7-d1e90149e7f0.png",
      title: "Poivrons en Lanières",
      brand: "Greens",
      weight: "1000g",
      category: "frozen",
      subcategory: "legumes",
      price: 4.99
    },
    {
      id: 38,
      image: "/lovable-uploads/33a4c5fb-aa6a-4c75-aec4-c1fb0568124c.png",
      title: "Oignons Émincés",
      brand: "Greens",
      weight: "2500g",
      category: "frozen",
      subcategory: "legumes",
      price: 7.99
    },
    {
      id: 39,
      image: "/lovable-uploads/725ee896-e876-466d-a134-967ae91bd73b.png",
      title: "Haricots Verts Fins",
      brand: "Greens",
      weight: "1000g",
      category: "frozen",
      subcategory: "legumes",
      price: 4.49
    },
    {
      id: 40,
      image: "/lovable-uploads/222e4d15-be1a-4723-9868-6b55b6e70f35.png",
      title: "Ail Haché",
      brand: "Greens Herbs",
      weight: "250g",
      category: "frozen",
      subcategory: "legumes",
      price: 3.99
    },
    {
      id: 41,
      image: "/lovable-uploads/4ed38308-6a5e-402a-b02f-da6c97bfcd1b.png",
      title: "Oignons Émincés",
      brand: "Greens",
      weight: "1000g",
      category: "frozen",
      subcategory: "legumes",
      price: 4.49
    },
    {
      id: 42,
      image: "/lovable-uploads/bb9ac058-cd77-419e-81dd-7434b01a9f1f.png",
      title: "Fèves",
      brand: "Greens",
      weight: "1000g",
      category: "frozen",
      subcategory: "legumes",
      price: 4.99
    },
    {
      id: 43,
      image: "/lovable-uploads/e7a5f587-b696-4a22-80fe-e31b8e5511a4.png",
      title: "Champignons Émincés",
      brand: "Greens",
      weight: "1000g",
      category: "frozen",
      subcategory: "legumes",
      price: 5.99
    },
    {
      id: 44,
      image: "/lovable-uploads/98155827-3a99-48ea-83b2-ed01525f9902.png",
      title: "Macédoine de Légumes",
      brand: "Greens",
      weight: "1000g",
      category: "frozen",
      subcategory: "legumes",
      price: 4.49
    },
    {
      id: 45,
      image: "/lovable-uploads/e85998c4-07e1-4a42-8692-2e7ea0292f84.png",
      title: "Maïs Doux",
      brand: "Greens",
      weight: "1000g",
      category: "frozen",
      subcategory: "legumes",
      price: 4.29
    },
    {
      id: 46,
      image: "/lovable-uploads/a38643a0-56b9-4270-ad94-538056d65958.png",
      title: "Poivrons Rouges en Lanières",
      brand: "Greens",
      weight: "2500g",
      category: "frozen",
      subcategory: "legumes",
      price: 8.99
    },
    {
      id: 47,
      image: "/lovable-uploads/e4332095-f2d0-45c9-bd6e-52e2d730279f.png",
      title: "Fonds d'Artichauts",
      brand: "Greens",
      weight: "1000g",
      category: "frozen",
      subcategory: "legumes",
      price: 6.99
    },
    {
      id: 48,
      image: "/lovable-uploads/1c5badeb-e238-481f-be23-1a23b85f4e43.png",
      title: "Carottes en Rondelles",
      brand: "Greens",
      weight: "1000g",
      category: "frozen",
      subcategory: "legumes",
      price: 3.99
    },
    {
      id: 49,
      image: "/lovable-uploads/1fa9d97e-d6c5-4e71-94d7-b3f7d3d3364f.png",
      title: "Épinards en Portions",
      brand: "Greens",
      weight: "1000g",
      category: "frozen",
      subcategory: "legumes",
      price: 4.99
    },
    {
      id: 50,
      image: "/lovable-uploads/25e9b217-b040-49b3-ba9e-cb512a15e540.png",
      title: "Choux-Fleurs en Fleurettes",
      brand: "Greens",
      weight: "1000g",
      category: "frozen",
      subcategory: "legumes",
      price: 4.49
    },
    {
      id: 51,
      image: "/lovable-uploads/d2da4325-771a-487a-b3f0-60f0f1f6555e.png",
      title: "Aubergines Grillées",
      brand: "Greens",
      weight: "1000g",
      category: "frozen",
      subcategory: "legumes",
      price: 6.99
    },
    {
      id: 52,
      image: "/lovable-uploads/c1cc5a91-5f97-4e1e-a59e-592f235c95b5.png",
      title: "Brocolis",
      brand: "Greens",
      weight: "1000g",
      category: "frozen",
      subcategory: "legumes",
      price: 4.99
    },
    {
      id: 53,
      image: "/lovable-uploads/b644a9a9-2d5a-4cb6-97cf-1c810a617672.png",
      title: "Persil Haché",
      brand: "Greens Herbs",
      weight: "250g",
      category: "frozen",
      subcategory: "legumes",
      price: 3.49
    },
    {
      id: 54,
      image: "/lovable-uploads/354d2e94-2199-425e-ac88-ccd4fce595bd.png",
      title: "Choux de Bruxelles",
      brand: "Greens",
      weight: "1000g",
      category: "frozen",
      subcategory: "legumes",
      price: 4.99
    },
    {
      id: 55,
      image: "/lovable-uploads/d1b3508e-4004-49e5-89db-09b25eaf96bc.png",
      title: "Basilic Haché",
      brand: "Greens Herbs",
      weight: "250g",
      category: "frozen",
      subcategory: "legumes",
      price: 3.49
    },
    {
      id: 56,
      image: "/lovable-uploads/feeddc07-602e-4f41-a634-68099502a616.png",
      title: "Courgettes en Rondelles",
      brand: "Greens",
      weight: "1000g",
      category: "frozen",
      subcategory: "legumes",
      price: 4.49
    },
    {
      id: 57,
      image: "/lovable-uploads/ecb7cb2d-f92d-4b8b-86d2-f03dbcdb4787.png",
      title: "Ciboulette Hachée",
      brand: "Greens Herbs",
      weight: "250g",
      category: "frozen",
      subcategory: "legumes",
      price: 3.49
    }
  ];

  const filteredProducts = (() => {
    let filtered = activeCategory === "all" 
      ? products 
      : products.filter(product => product.category === activeCategory);
    
    if (activeCategory === "frozen" && activeSubcategory !== "all") {
      filtered = filtered.filter(product => product.subcategory === activeSubcategory);
    }
    
    return filtered;
  })();

  const isEmpty = filteredProducts.length === 0;

  return (
    <section id="categories" className="py-16 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Nos catégories de produits</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez notre large gamme de produits Halal de qualité premium. De la viande fraîche aux plats préparés, nous avons tout ce dont vous avez besoin.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`w-full text-left focus:outline-none ${
                activeCategory === category.id ? "ring-2 ring-brand-orange" : ""
              }`}
            >
              <CategoryCard
                title={category.title}
                description={category.description}
                icon={category.icon}
                delay={category.delay}
              />
            </button>
          ))}
        </div>

        {activeCategory === "frozen" && (
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
              <button
                onClick={() => setActiveSubcategory("all")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeSubcategory === "all"
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Tous
              </button>
              {subcategories.map((subcategory) => (
                <button
                  key={subcategory.id}
                  onClick={() => setActiveSubcategory(subcategory.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeSubcategory === subcategory.id
                      ? subcategory.color + " text-white"
                      : subcategory.bgColor + " " + subcategory.textColor + " " + subcategory.hoverBgColor
                  }`}
                >
                  {subcategory.icon}
                  {subcategory.title}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {isEmpty ? (
            <div className="col-span-full text-center py-16">
              <div className="text-gray-400 mb-4">
                <Package size={48} className="mx-auto" />
              </div>
              <h3 className="text-xl font-bold mb-2">Aucun produit trouvé</h3>
              <p className="text-gray-600">
                Aucun produit ne correspond à vos critères de recherche.
              </p>
              <button 
                onClick={() => {
                  setActiveCategory("all");
                  setActiveSubcategory("all");
                }}
                className="mt-4 px-4 py-2 bg-brand-orange text-white rounded-lg hover:bg-brand-orange/90 transition-colors"
              >
                Afficher tous les produits
              </button>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <ProductCard 
                key={product.id}
                id={product.id}
                image={product.image}
                title={product.title}
                brand={product.brand}
                weight={product.weight}
                category={
                  product.category === "frozen" ? "Surgelé" : 
                  product.category === "fresh" ? "Frais" : 
                  product.category === "drinks" ? "Boisson" : product.category
                }
                price={product.price}
                onAddToCart={onAddToCart}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Categories;
