
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { ArrowLeft, Save, Lock, ShoppingBag, Settings, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

// Sample product data structure
interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  category: string;
  inStock: boolean;
}

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load products from localStorage on mount
  useEffect(() => {
    const loadProducts = () => {
      setIsLoading(true);
      try {
        // Try to load products from localStorage
        const savedProducts = localStorage.getItem('admin_products');
        
        if (savedProducts) {
          setProducts(JSON.parse(savedProducts));
        } else {
          // If no products exist yet, initialize with some sample data
          const initialProducts: Product[] = [
            {
              id: 1,
              title: "Pizza 4 Fromages Surgelée",
              image: "/lovable-uploads/3230e5df-068b-4a55-89ea-10484b277a5a.png",
              price: 12.99,
              category: "Plats préparés",
              inStock: true
            },
            {
              id: 2,
              title: "Glace Vanille Premium",
              image: "/lovable-uploads/f96329d1-539b-41bc-8c63-c12b7a050ae6.png",
              price: 8.50,
              category: "Desserts",
              inStock: true
            },
            {
              id: 3,
              title: "Légumes Mélangés Surgelés",
              image: "/lovable-uploads/6789b32c-f705-4682-a1d6-04711575997c.png",
              price: 4.99,
              category: "Légumes",
              inStock: true
            }
          ];
          setProducts(initialProducts);
          localStorage.setItem('admin_products', JSON.stringify(initialProducts));
        }
      } catch (error) {
        console.error("Error loading products:", error);
        toast.error("Erreur lors du chargement des produits");
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Save products to localStorage whenever they change
  useEffect(() => {
    if (!isLoading && products.length > 0) {
      localStorage.setItem('admin_products', JSON.stringify(products));
    }
  }, [products, isLoading]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password authentication (in real app, use proper authentication)
    if (password === 'fragment13') {
      setIsAuthenticated(true);
      toast.success('Connexion réussie');
    } else {
      toast.error('Mot de passe incorrect');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    toast.info('Vous êtes déconnecté');
  };

  const toggleProductStock = (productId: number) => {
    setProducts(prevProducts => 
      prevProducts.map(product => 
        product.id === productId 
          ? { ...product, inStock: !product.inStock } 
          : product
      )
    );
    
    toast.success('État du stock mis à jour');
  };

  const saveChanges = () => {
    localStorage.setItem('admin_products', JSON.stringify(products));
    toast.success('Modifications enregistrées');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="container mx-auto px-4 py-8">
          <Link to="/" className="inline-flex items-center text-brand-orange mb-8 hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à l'accueil
          </Link>
          
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden p-8">
            <div className="text-center mb-8">
              <div className="inline-flex p-3 rounded-full bg-brand-orange/10 mb-4">
                <Lock className="h-8 w-8 text-brand-orange" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Administration</h1>
              <p className="text-gray-600 mt-2">Connectez-vous pour gérer votre site</p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Mot de passe
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                  placeholder="Entrez le mot de passe"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2"
              >
                Se connecter
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="mr-6 text-gray-800 hover:text-brand-orange">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-xl font-bold text-gray-800">Administration</h1>
          </div>
          <button 
            onClick={handleLogout}
            className="text-gray-700 hover:text-red-500 flex items-center"
          >
            <LogOut className="h-4 w-4 mr-1" />
            <span>Déconnexion</span>
          </button>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 flex-1">
        {/* Sidebar */}
        <div className="md:w-64 shrink-0">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="font-medium text-gray-700">Menu d'administration</h2>
            </div>
            <nav className="p-2">
              <button
                onClick={() => setActiveTab('products')}
                className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                  activeTab === 'products' 
                    ? 'bg-brand-orange/10 text-brand-orange font-medium' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <ShoppingBag className="h-4 w-4 mr-3" />
                Gestion des produits
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                  activeTab === 'settings' 
                    ? 'bg-brand-orange/10 text-brand-orange font-medium' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Settings className="h-4 w-4 mr-3" />
                Paramètres du site
              </button>
            </nav>
          </div>
        </div>
        
        {/* Main content area */}
        <div className="flex-1 bg-white rounded-lg shadow-sm overflow-hidden">
          {activeTab === 'products' && (
            <div>
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="font-medium text-gray-800">Gestion des produits</h2>
                <button
                  onClick={saveChanges}
                  className="bg-brand-orange hover:bg-brand-orange/90 text-white px-4 py-2 rounded-md flex items-center text-sm transition-colors"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Enregistrer
                </button>
              </div>
              
              <div className="p-4">
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand-orange"></div>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Produit
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Catégorie
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Prix
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Stock
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {products.map((product) => (
                          <tr key={product.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  <img className="h-10 w-10 rounded-md object-cover" src={product.image} alt={product.title} />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{product.title}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">{product.category}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{product.price.toFixed(2)} €</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                product.inStock 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {product.inStock ? 'En stock' : 'Rupture'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                onClick={() => toggleProductStock(product.id)}
                                className={`${
                                  product.inStock 
                                    ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                                    : 'bg-green-50 text-green-600 hover:bg-green-100'
                                } px-3 py-1 rounded-md transition-colors`}
                              >
                                {product.inStock ? 'Marquer en rupture' : 'Remettre en stock'}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div>
              <div className="p-4 border-b">
                <h2 className="font-medium text-gray-800">Paramètres du site</h2>
              </div>
              <div className="p-6">
                <div className="mb-8 bg-blue-50 border border-blue-200 rounded-md p-4 text-blue-600">
                  <p>Plus de paramètres seront ajoutés prochainement.</p>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 mb-1">
                      Nom du site
                    </label>
                    <input
                      type="text"
                      id="siteName"
                      defaultValue="Surgelés Express"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="deliveryFee" className="block text-sm font-medium text-gray-700 mb-1">
                      Frais de livraison (€)
                    </label>
                    <input
                      type="number"
                      id="deliveryFee"
                      defaultValue="2.99"
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="minOrderAmount" className="block text-sm font-medium text-gray-700 mb-1">
                      Montant minimum de commande (€)
                    </label>
                    <input
                      type="number"
                      id="minOrderAmount"
                      defaultValue="15"
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                    />
                  </div>
                  
                  <div className="pt-4">
                    <button
                      onClick={() => toast.success('Paramètres enregistrés')}
                      className="bg-brand-orange hover:bg-brand-orange/90 text-white px-6 py-2 rounded-md flex items-center transition-colors"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Enregistrer les paramètres
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
