
import React, { useState, useEffect } from 'react';
import { toast } from "sonner";
import { products as allCatalogProducts } from "../components/home/Categories";
import AdminLogin from '../components/admin/AdminLogin';
import SearchBar from '../components/admin/SearchBar';
import AdminTabs from '../components/admin/AdminTabs';
import { Product, StockItem } from '../components/admin/types';

// Admin component
const Admin = () => {
  // State for admin password
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  
  // State for product management
  const [products, setProducts] = useState<Product[]>([]);
  const [stockItems, setStockItems] = useState<StockItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<"id" | "title" | "price">("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  
  // Load products and stock from localStorage on component mount
  useEffect(() => {
    const savedProducts = localStorage.getItem("adminProducts");
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
    
    const savedStock = localStorage.getItem("stockItems");
    if (savedStock) {
      setStockItems(JSON.parse(savedStock));
    } else {
      // Initialize stock items based on all catalog products
      const initialStock = allCatalogProducts.map(product => ({
        id: product.id,
        title: product.title,
        inStock: true
      }));
      setStockItems(initialStock);
      localStorage.setItem("stockItems", JSON.stringify(initialStock));
    }
    
    // Check if admin is already authenticated
    const adminAuth = localStorage.getItem("adminAuth");
    if (adminAuth === "true") {
      setIsAdmin(true);
    }
  }, []);
  
  // Save products to localStorage when they change
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem("adminProducts", JSON.stringify(products));
    }
  }, [products]);
  
  // Save stock items to localStorage when they change
  useEffect(() => {
    if (stockItems.length > 0) {
      localStorage.setItem("stockItems", JSON.stringify(stockItems));
    }
  }, [stockItems]);
  
  // Handle admin login
  const handleLogin = () => {
    if (password === "fragment13") {
      setIsAdmin(true);
      localStorage.setItem("adminAuth", "true");
      toast.success("Connexion réussie!");
    } else {
      toast.error("Mot de passe incorrect!");
    }
  };
  
  // Handle logout
  const handleLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem("adminAuth");
    toast.info("Vous êtes déconnecté");
  };
  
  // Add a new product
  const handleAddProduct = () => {
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const newProduct = {
      id: newId,
      title: "Nouveau Produit",
      price: 0,
      image: "/placeholder.svg",
      category: "frozen",
      brand: "Marque",
      weight: "0g",
      inStock: true
    };
    
    setProducts([...products, newProduct]);
    
    // Add to stock items as well
    setStockItems([...stockItems, {
      id: newId,
      title: "Nouveau Produit",
      inStock: true
    }]);
    
    toast.success("Nouveau produit ajouté");
  };
  
  // Remove a product
  const handleRemoveProduct = (id: number) => {
    setProducts(products.filter(product => product.id !== id));
    toast.success("Produit supprimé");
  };
  
  // Toggle stock status
  const toggleStock = (id: number) => {
    setStockItems(stockItems.map(item => 
      item.id === id ? { ...item, inStock: !item.inStock } : item
    ));
    toast.success("Statut de stock mis à jour");
  };
  
  // Toggle sort direction
  const toggleSort = (field: "id" | "title" | "price") => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };
  
  // Sort and filter products
  const getFilteredProducts = () => {
    let filtered = [...products];
    
    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    filtered.sort((a, b) => {
      if (sortField === "id") {
        return sortDirection === "asc" ? a.id - b.id : b.id - a.id;
      } else if (sortField === "title") {
        return sortDirection === "asc" 
          ? a.title.localeCompare(b.title) 
          : b.title.localeCompare(a.title);
      } else {
        return sortDirection === "asc" ? a.price - b.price : b.price - a.price;
      }
    });
    
    return filtered;
  };

  // Filter and sort catalog products
  const getFilteredCatalogProducts = () => {
    let filtered = [...allCatalogProducts];
    
    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    filtered.sort((a, b) => {
      if (sortField === "id") {
        return sortDirection === "asc" ? a.id - b.id : b.id - a.id;
      } else if (sortField === "title") {
        return sortDirection === "asc" 
          ? a.title.localeCompare(b.title) 
          : b.title.localeCompare(a.title);
      } else {
        return sortDirection === "asc" ? a.price - b.price : b.price - a.price;
      }
    });
    
    return filtered;
  };
  
  // Sort and filter stock items
  const getFilteredStockItems = () => {
    let filtered = [...stockItems];
    
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    filtered.sort((a, b) => {
      if (sortField === "id") {
        return sortDirection === "asc" ? a.id - b.id : b.id - a.id;
      } else if (sortField === "title") {
        return sortDirection === "asc" 
          ? a.title.localeCompare(b.title) 
          : b.title.localeCompare(a.title);
      } else {
        return 0; // Stock items don't have price
      }
    });
    
    return filtered;
  };
  
  // Add a product from catalog to admin products
  const addToAdminProducts = (product: Product) => {
    if (!products.some(p => p.id === product.id)) {
      setProducts([...products, product]);
      toast.success(`${product.title} ajouté à la liste d'administration`);
    } else {
      toast.info("Ce produit est déjà dans la liste d'administration");
    }
  };
  
  // If not admin, show login screen
  if (!isAdmin) {
    return (
      <AdminLogin 
        password={password} 
        setPassword={setPassword} 
        handleLogin={handleLogin} 
      />
    );
  }
  
  // Admin dashboard
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Panneau d'Administration</h1>
        <button 
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
          onClick={handleLogout}
        >
          Se déconnecter
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <SearchBar 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleAddProduct={handleAddProduct}
        />
        
        <AdminTabs 
          getFilteredProducts={getFilteredProducts}
          getFilteredCatalogProducts={getFilteredCatalogProducts}
          getFilteredStockItems={getFilteredStockItems}
          sortField={sortField}
          sortDirection={sortDirection}
          toggleSort={toggleSort}
          handleRemoveProduct={handleRemoveProduct}
          addToAdminProducts={addToAdminProducts}
          toggleStock={toggleStock}
        />
      </div>
    </div>
  );
};

export default Admin;
