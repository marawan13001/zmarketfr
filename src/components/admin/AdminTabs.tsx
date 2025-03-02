
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, BookOpen, Server } from "lucide-react";
import ProductsTable from './ProductsTable';
import CatalogTable from './CatalogTable';
import StockTable from './StockTable';

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

interface StockItem {
  id: number;
  title: string;
  inStock: boolean;
}

interface AdminTabsProps {
  getFilteredProducts: () => Product[];
  getFilteredCatalogProducts: () => Product[];
  getFilteredStockItems: () => StockItem[];
  sortField: "id" | "title" | "price";
  sortDirection: "asc" | "desc";
  toggleSort: (field: "id" | "title" | "price") => void;
  handleRemoveProduct: (id: number) => void;
  addToAdminProducts: (product: Product) => void;
  toggleStock: (id: number) => void;
}

const AdminTabs: React.FC<AdminTabsProps> = ({
  getFilteredProducts,
  getFilteredCatalogProducts,
  getFilteredStockItems,
  sortField,
  sortDirection,
  toggleSort,
  handleRemoveProduct,
  addToAdminProducts,
  toggleStock
}) => {
  return (
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
        <ProductsTable
          products={getFilteredProducts()}
          sortField={sortField}
          sortDirection={sortDirection}
          toggleSort={toggleSort}
          handleRemoveProduct={handleRemoveProduct}
        />
      </TabsContent>
      
      <TabsContent value="catalog" className="space-y-4">
        <CatalogTable
          products={getFilteredCatalogProducts()}
          sortField={sortField}
          sortDirection={sortDirection}
          toggleSort={toggleSort}
          addToAdminProducts={addToAdminProducts}
        />
      </TabsContent>
      
      <TabsContent value="stock" className="space-y-4">
        <StockTable
          stockItems={getFilteredStockItems()}
          sortField={sortField}
          sortDirection={sortDirection}
          toggleSort={toggleSort}
          toggleStock={toggleStock}
        />
      </TabsContent>
    </Tabs>
  );
};

export default AdminTabs;
