
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { 
  Package, 
  CircleCheck, 
  CircleX, 
  Search, 
  PlusCircle, 
  Trash2, 
  ChevronUp, 
  ChevronDown, 
  Server,
  BookOpen,
  ListFilter
} from "lucide-react";
import { toast } from "sonner";
import { products as allCatalogProducts } from "../components/home/Categories";

// Type definitions
type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  subcategory?: string;
  brand: string;
  weight: string;
  inStock?: boolean;
};

type StockItem = {
  id: number;
  title: string;
  inStock: boolean;
};

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
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Administration</h1>
            <p className="mt-2 text-gray-600">Veuillez vous connecter pour accéder au panneau d'administration</p>
          </div>
          
          <div className="mt-8 space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <div className="mt-1">
                <Input
                  id="password"
                  type="password"
                  placeholder="Entrez le mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                />
              </div>
            </div>
            
            <div>
              <Button className="w-full" onClick={handleLogin}>
                Se connecter
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Admin dashboard
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Panneau d'Administration</h1>
        <Button variant="outline" onClick={handleLogout}>Se déconnecter</Button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Button onClick={handleAddProduct}>
            <PlusCircle size={18} className="mr-2" />
            Ajouter un produit
          </Button>
        </div>
        
        <Tabs defaultValue="products">
          <TabsList className="mb-6 w-full sm:w-auto flex flex-wrap justify-start">
            <TabsTrigger value="products" className="flex items-center">
              <Package size={16} className="mr-2" />
              Produits Sélectionnés
            </TabsTrigger>
            <TabsTrigger value="catalog" className="flex items-center">
              <BookOpen size={16} className="mr-2" />
              Catalogue Complet
            </TabsTrigger>
            <TabsTrigger value="stock" className="flex items-center">
              <Server size={16} className="mr-2" />
              Gestion des Stocks
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="products" className="space-y-4">
            <Table>
              <TableCaption>Liste des produits administrés</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-20 cursor-pointer" onClick={() => toggleSort("id")}>
                    <div className="flex items-center">
                      ID
                      {sortField === "id" && (
                        sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => toggleSort("title")}>
                    <div className="flex items-center">
                      Nom
                      {sortField === "title" && (
                        sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => toggleSort("price")}>
                    <div className="flex items-center">
                      Prix
                      {sortField === "price" && (
                        sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                      )}
                    </div>
                  </TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getFilteredProducts().length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                      Aucun produit trouvé. Ajoutez-en un nouveau ou modifiez votre recherche.
                    </TableCell>
                  </TableRow>
                ) : (
                  getFilteredProducts().map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.id}</TableCell>
                      <TableCell className="font-medium">{product.title}</TableCell>
                      <TableCell>{product.price.toFixed(2)} €</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleRemoveProduct(product.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="catalog" className="space-y-4">
            <Table>
              <TableCaption>Catalogue complet des produits</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-20 cursor-pointer" onClick={() => toggleSort("id")}>
                    <div className="flex items-center">
                      ID
                      {sortField === "id" && (
                        sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => toggleSort("title")}>
                    <div className="flex items-center">
                      Nom
                      {sortField === "title" && (
                        sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => toggleSort("price")}>
                    <div className="flex items-center">
                      Prix
                      {sortField === "price" && (
                        sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                      )}
                    </div>
                  </TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Brand</TableHead>
                  <TableHead>Sous-catégorie</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getFilteredCatalogProducts().length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      Aucun produit trouvé. Modifiez votre recherche.
                    </TableCell>
                  </TableRow>
                ) : (
                  getFilteredCatalogProducts().map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.id}</TableCell>
                      <TableCell className="font-medium">{product.title}</TableCell>
                      <TableCell>{product.price.toFixed(2)} €</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>{product.brand}</TableCell>
                      <TableCell>{product.subcategory || "-"}</TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => addToAdminProducts(product)}
                        >
                          <PlusCircle size={16} className="mr-1" />
                          Ajouter
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="stock" className="space-y-4">
            <Table>
              <TableCaption>Gestion des stocks</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-20 cursor-pointer" onClick={() => toggleSort("id")}>
                    <div className="flex items-center">
                      ID
                      {sortField === "id" && (
                        sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => toggleSort("title")}>
                    <div className="flex items-center">
                      Nom
                      {sortField === "title" && (
                        sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                      )}
                    </div>
                  </TableHead>
                  <TableHead>Disponibilité</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getFilteredStockItems().length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                      Aucun produit trouvé. Modifiez votre recherche.
                    </TableCell>
                  </TableRow>
                ) : (
                  getFilteredStockItems().map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell className="font-medium">{item.title}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {item.inStock ? (
                            <CircleCheck className="text-green-500 mr-2" size={18} />
                          ) : (
                            <CircleX className="text-red-500 mr-2" size={18} />
                          )}
                          {item.inStock ? "En stock" : "Épuisé"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Switch 
                          checked={item.inStock} 
                          onCheckedChange={() => toggleStock(item.id)}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
