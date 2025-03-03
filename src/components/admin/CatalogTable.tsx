
import React from 'react';
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
import { ChevronUp, ChevronDown, PlusCircle, Tag } from "lucide-react";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  subcategory?: string;
  brand: string;
  weight: string;
}

interface CatalogTableProps {
  products: Product[];
  sortField: "id" | "title" | "price";
  sortDirection: "asc" | "desc";
  toggleSort: (field: "id" | "title" | "price") => void;
  addToAdminProducts: (product: Product) => void;
}

const CatalogTable: React.FC<CatalogTableProps> = ({ 
  products, 
  sortField, 
  sortDirection, 
  toggleSort, 
  addToAdminProducts 
}) => {
  // Function to handle button click with animation
  const handleAddClick = (product: Product) => {
    // Find the button element that was clicked
    const button = document.querySelector(`button[data-product-id="${product.id}"]`);
    
    // Add animation class
    if (button) {
      button.classList.add('animate-scale-bounce');
      
      // Remove animation class after animation completes
      setTimeout(() => {
        button.classList.remove('animate-scale-bounce');
      }, 500);
    }
    
    // Call the original function
    addToAdminProducts(product);
  };

  // Fonction pour obtenir la couleur de badge selon la catégorie
  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case 'frozen':
        return 'bg-blue-100 text-blue-800';
      case 'fresh':
        return 'bg-green-100 text-green-800';
      case 'drinks':
        return 'bg-amber-100 text-amber-800';
      case 'epices':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Fonction pour obtenir la couleur de badge selon la sous-catégorie
  const getSubcategoryBadgeColor = (subcategory: string | undefined) => {
    if (!subcategory) return '';
    
    switch (subcategory) {
      case 'viande':
        return 'bg-red-100 text-red-800';
      case 'plats':
        return 'bg-amber-100 text-amber-800';
      case 'legumes':
        return 'bg-green-100 text-green-800';
      case 'epices':
        return 'bg-purple-100 text-purple-800';
      case 'dessert':
        return 'bg-pink-100 text-pink-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
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
        {products.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className="text-center py-8 text-gray-500">
              Aucun produit trouvé. Modifiez votre recherche.
            </TableCell>
          </TableRow>
        ) : (
          products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell className="font-medium">{product.title}</TableCell>
              <TableCell>{product.price.toFixed(2)} €</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryBadgeColor(product.category)}`}>
                  {product.category}
                </span>
              </TableCell>
              <TableCell>{product.brand}</TableCell>
              <TableCell>
                {product.subcategory ? (
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getSubcategoryBadgeColor(product.subcategory)}`}>
                    {product.subcategory}
                  </span>
                ) : "-"}
              </TableCell>
              <TableCell>
                <Button 
                  data-product-id={product.id}
                  variant="outline" 
                  size="sm"
                  onClick={() => handleAddClick(product)}
                  className="transition-all duration-200"
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
  );
};

export default CatalogTable;
