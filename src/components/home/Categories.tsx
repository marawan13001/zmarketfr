import React, { useState, useEffect } from 'react';
import { IceCream, Refrigerator, Package, Coffee, ShoppingCart, Beef, Salad, UtensilsCrossed, AlertCircle } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';
import { toast } from 'sonner';

// Export the products data so it can be used by other components like Admin
export const products = [
  {
    id: 1,
    image: "/images/products/ice-cream-1.png",
    title: "Glace au chocolat noir",
    brand: "Fjord",
    weight: "500g",
    category: "frozen",
    subcategory: "ice-cream",
    price: 6.50,
  },
  {
    id: 2,
    image: "/images/products/ice-cream-2.png",
    title: "Crème glacée à la vanille",
    brand: "Fjord",
    weight: "500g",
    category: "frozen",
    subcategory: "ice-cream",
    price: 5.90,
  },
  {
    id: 3,
    image: "/images/products/ice-cream-3.png",
    title: "Sorbets aux fruits",
    brand: "Fjord",
    weight: "500g",
    category: "frozen",
    subcategory: "ice-cream",
    price: 7.20,
  },
  {
    id: 4,
    image: "/images/products/pizza-1.png",
    title: "Pizza Margherita",
    brand: "ItalPizza",
    weight: "350g",
    category: "frozen",
    price: 8.90,
  },
  {
    id: 5,
    image: "/images/products/pizza-2.png",
    title: "Pizza Regina",
    brand: "ItalPizza",
    weight: "410g",
    category: "frozen",
    price: 9.50,
  },
  {
    id: 6,
    image: "/images/products/pizza-3.png",
    title: "Pizza 4 Fromages",
    brand: "ItalPizza",
    weight: "380g",
    category: "frozen",
    price: 10.20,
  },
  {
    id: 7,
    image: "/images/products/viande-1.png",
    title: "Steak haché pur boeuf",
    brand: "Charal",
    weight: "200g",
    category: "frozen",
    price: 4.80,
  },
  {
    id: 8,
    image: "/images/products/viande-2.png",
    title: "Filet de poulet",
    brand: "Le Gaulois",
    weight: "300g",
    category: "frozen",
    price: 6.20,
  },
  {
    id: 9,
    image: "/images/products/viande-3.png",
    title: "Saucisses de volaille",
    brand: "Herta",
    weight: "250g",
    category: "frozen",
    price: 5.50,
  },
  {
    id: 10,
    image: "/images/products/legume-1.png",
    title: "Haricots verts",
    brand: "Bonduelle",
    weight: "450g",
    category: "frozen",
    price: 3.90,
  },
  {
    id: 11,
    image: "/images/products/legume-2.png",
    title: "Epinards hachés",
    brand: "Findus",
    weight: "500g",
    category: "frozen",
    price: 4.20,
  },
  {
    id: 12,
    image: "/images/products/legume-3.png",
    title: "Mélange de légumes",
    brand: "Picard",
    weight: "400g",
    category: "frozen",
    price: 4.50,
  },
  {
    id: 13,
    image: "/images/products/boisson-1.png",
    title: "Jus d'orange",
    brand: "Innocent",
    weight: "900ml",
    category: "drinks",
    price: 3.50,
  },
  {
    id: 14,
    image: "/images/products/boisson-2.png",
    title: "Lait d'amande",
    brand: "Bjorg",
    weight: "1L",
    category: "drinks",
    price: 4.20,
  },
  {
    id: 15,
    image: "/images/products/boisson-3.png",
    title: "Coca-Cola",
    brand: "Coca-Cola",
    weight: "1.5L",
    category: "drinks",
    price: 2.80,
  },
  {
    id: 16,
    image: "/images/products/cafe-1.png",
    title: "Café moulu",
    brand: "Carte Noire",
    weight: "250g",
    category: "coffee",
    price: 5.20,
  },
  {
    id: 17,
    image: "/images/products/cafe-2.png",
    title: "Dosettes expresso",
    brand: "Nespresso",
    weight: "50g",
    category: "coffee",
    price: 6.80,
  },
  {
    id: 18,
    image: "/images/products/cafe-3.png",
    title: "Café soluble",
    brand: "Nescafé",
    weight: "100g",
    category: "coffee",
    price: 4.50,
  },
];

// Export category and subcategory data
export const categories = [
  {
    id: "frozen",
    title: "Surgelés",
    description: "Une large sélection de produits surgelés pour tous les goûts.",
    icon: <Refrigerator size={24} />,
    delay: 0,
  },
  {
    id: "drinks",
    title: "Boissons",
    description: "Rafraîchissez-vous avec notre gamme de boissons.",
    icon: <Package size={24} />,
    delay: 200,
  },
  {
    id: "coffee",
    title: "Café",
    description: "Commencez votre journée avec nos cafés de qualité.",
    icon: <Coffee size={24} />,
    delay: 400,
  },
];

export const subcategories = [
  {
    id: "ice-cream",
    title: "Crèmes glacées",
    icon: <IceCream size={16} />,
    color: "bg-blue-500",
    bgColor: "bg-blue-50",
    textColor: "text-blue-500",
    hoverBgColor: "hover:bg-blue-100",
  },
  {
    id: "meat",
    title: "Viandes",
    icon: <Beef size={16} />,
    color: "bg-red-500",
    bgColor: "bg-red-50",
    textColor: "text-red-500",
    hoverBgColor: "hover:bg-red-100",
  },
  {
    id: "vegetables",
    title: "Légumes",
    icon: <Salad size={16} />,
    color: "bg-green-500",
    bgColor: "bg-green-50",
    textColor: "text-green-500",
    hoverBgColor: "hover:bg-green-100",
  },
  {
    id: "meals",
    title: "Plats préparés",
    icon: <UtensilsCrossed size={16} />,
    color: "bg-orange-500",
    bgColor: "bg-orange-50",
    textColor: "text-orange-500",
    hoverBgColor: "hover:bg-orange-100",
  },
];

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
  inStock?: boolean;
  onAddToCart: (product: { id: number; title: string; image: string; price: number }) => void;
}

const ProductCard: React.FC<ProductProps> = ({ 
  id, 
  image, 
  title, 
  brand, 
  weight, 
  category, 
  price, 
  inStock = true, 
  onAddToCart 
}) => {
  const handleAddToCart = () => {
    onAddToCart({ id, title, image, price });
  };

  return (
    <div className={`bg-white rounded-xl overflow-hidden shadow-md transition-all group ${inStock ? 'hover:shadow-lg hover:translate-y-[-5px]' : 'opacity-75'}`}>
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className={`w-full h-full object-cover transition-transform duration-500 ${inStock ? 'group-hover:scale-105' : 'grayscale'}`}
        />
        <div className="absolute top-3 right-3 bg-brand-orange text-white text-xs font-medium py-1 px-2 rounded-full">
          {category}
        </div>
        
        {!inStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-red-500 text-white font-bold py-2 px-4 rounded-full flex items-center">
              <AlertCircle size={18} className="mr-1" />
              Rupture de stock
            </div>
          </div>
        )}
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
              className={`flex items-center gap-1 py-1.5 px-3 rounded-lg transition-colors ${
                inStock 
                  ? 'bg-brand-orange hover:bg-brand-orange/90 text-white' 
                  : 'bg-gray-300 cursor-not-allowed text-gray-700'
              }`}
              disabled={!inStock}
            >
              <ShoppingCart size={14} />
              <span className="text-sm">{inStock ? 'Ajouter' : 'Épuisé'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface CategoriesProps {
  onAddToCart?: (product: { id: number; title: string; image: string; price: number }) => void;
  stockItems?: Array<{ id: number; title: string; inStock: boolean }>;
}

const Categories: React.FC<CategoriesProps> = ({ 
  onAddToCart = () => {}, 
  stockItems = [] 
}) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSubcategory, setActiveSubcategory] = useState("all");
  
  // Reset subcategory when category changes
  useEffect(() => {
    setActiveSubcategory("all");
  }, [activeCategory]);

  // Filter products by category and subcategory
  const filteredProducts = (() => {
    // First filter by main category
    let filtered = activeCategory === "all" 
      ? products 
      : products.filter(product => product.category === activeCategory);
    
    // Then filter by subcategory if in frozen category and subcategory is not "all"
    if (activeCategory === "frozen" && activeSubcategory !== "all") {
      filtered = filtered.filter(product => product.subcategory === activeSubcategory);
    }
    
    return filtered;
  })();

  // Add stock status to products
  const productsWithStockStatus = filteredProducts.map(product => {
    const stockItem = stockItems.find(item => item.id === product.id);
    return {
      ...product,
      inStock: stockItem ? stockItem.inStock : true
    };
  });

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h2 className="text-3xl font-bold text-center mb-12">Nos Catégories de Produits</h2>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {categories.map((category, index) => (
            <div key={category.id} onClick={() => setActiveCategory(category.id)}>
              <CategoryCard
                title={category.title}
                description={category.description}
                icon={category.icon}
                delay={category.delay}
              />
            </div>
          ))}
        </div>
        
        <ScrollReveal>
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">
              {activeCategory === "all"
                ? "Tous Nos Produits"
                : categories.find(cat => cat.id === activeCategory)?.title}
            </h2>
            
            {activeCategory === "frozen" && (
              <div className="flex flex-wrap gap-3 mb-8">
                <button
                  data-subcategory="all"
                  onClick={() => setActiveSubcategory("all")}
                  className={`py-2 px-4 rounded-full text-sm font-medium transition-colors ${
                    activeSubcategory === "all"
                      ? "bg-brand-orange text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Tous
                </button>
                
                {subcategories.map(subcategory => (
                  <button
                    key={subcategory.id}
                    data-subcategory={subcategory.id}
                    onClick={() => setActiveSubcategory(subcategory.id)}
                    className={`py-2 px-4 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
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
            )}
          </div>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productsWithStockStatus.map((product) => (
            <ScrollReveal key={product.id} delay={100 * (product.id % 8)}>
              <ProductCard
                id={product.id}
                image={product.image}
                title={product.title}
                brand={product.brand}
                weight={product.weight}
                category={product.category}
                subcategory={product.subcategory}
                price={product.price}
                inStock={product.inStock}
                onAddToCart={onAddToCart}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
