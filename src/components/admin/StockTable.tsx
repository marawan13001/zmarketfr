
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
import { CircleCheck, CircleX, ChevronUp, ChevronDown } from "lucide-react";

interface StockItem {
  id: number;
  title: string;
  inStock: boolean;
}

interface StockTableProps {
  stockItems: StockItem[];
  sortField: "id" | "title" | "price";
  sortDirection: "asc" | "desc";
  toggleSort: (field: "id" | "title" | "price") => void;
  toggleStock: (id: number) => void;
}

const StockTable: React.FC<StockTableProps> = ({ 
  stockItems, 
  sortField, 
  sortDirection, 
  toggleSort, 
  toggleStock 
}) => {
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
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {stockItems.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4} className="text-center py-8 text-gray-500">
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
