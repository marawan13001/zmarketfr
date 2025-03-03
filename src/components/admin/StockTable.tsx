
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
import { Switch } from "@/components/ui/switch";
import { CircleCheck, CircleX, ChevronUp, ChevronDown, Package } from "lucide-react";
import { StockItem } from '../admin/types';
import { Input } from "../ui/input";

interface StockTableProps {
  stockItems: StockItem[];
  sortField: "id" | "title" | "price";
  sortDirection: "asc" | "desc";
  toggleSort: (field: "id" | "title" | "price") => void;
  toggleStock: (id: number) => void;
  updateQuantity?: (id: number, quantity: number) => void;
}

const StockTable: React.FC<StockTableProps> = ({ 
  stockItems, 
  sortField, 
  sortDirection, 
  toggleSort, 
  toggleStock,
  updateQuantity
}) => {
  console.log("StockItems in StockTable:", stockItems); // Debug log

  const handleQuantityChange = (id: number, value: string) => {
    if (!updateQuantity) return;
    
    const quantity = parseInt(value, 10);
    if (!isNaN(quantity) && quantity >= 0) {
      updateQuantity(id, quantity);
    }
  };

  return (
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
          <TableHead>Quantité</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {stockItems.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center py-8 text-gray-500">
              Aucun produit trouvé. Modifiez votre recherche.
            </TableCell>
          </TableRow>
        ) : (
          stockItems.map((item) => (
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
                <div className="flex items-center w-24">
                  <Package size={16} className="mr-2 text-gray-400" />
                  <Input
                    type="number"
                    value={item.quantity}
                    min={0}
                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                    className="h-8 w-full"
                  />
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
  );
};

export default StockTable;
