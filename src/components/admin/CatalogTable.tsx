
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
import { ChevronUp, ChevronDown, PlusCircle } from "lucide-react";

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
  );
};

export default CatalogTable;
