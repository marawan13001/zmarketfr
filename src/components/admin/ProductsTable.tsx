
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
import { Trash2, ChevronUp, ChevronDown, PlusCircle } from "lucide-react";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  subcategory?: string;
  brand: string;
  weight: string;
  inStock?: boolean;
}

interface ProductsTableProps {
  products: Product[];
  sortField: "id" | "title" | "price";
  sortDirection: "asc" | "desc";
  toggleSort: (field: "id" | "title" | "price") => void;
  handleRemoveProduct: (id: number) => void;
  caption?: string;
}

const ProductsTable: React.FC<ProductsTableProps> = ({ 
  products, 
  sortField, 
  sortDirection, 
  toggleSort, 
  handleRemoveProduct,
  caption = "Liste des produits administrés"
}) => {
  return (
    <Table>
      <TableCaption>{caption}</TableCaption>
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
        {products.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center py-8 text-gray-500">
              Aucun produit trouvé. Ajoutez-en un nouveau ou modifiez votre recherche.
            </TableCell>
          </TableRow>
        ) : (
          products.map((product) => (
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
  );
};

export default ProductsTable;
