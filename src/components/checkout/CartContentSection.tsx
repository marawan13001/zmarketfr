
import React from 'react';
import { toast } from 'sonner';
import { ShoppingBag, AlertCircle } from 'lucide-react';
import { CartItem } from '@/components/cart/FloatingCart';
import { StockItem } from '@/components/admin/types';

interface CartContentSectionProps {
  cartItems: CartItem[];
  updateQuantity: (id: number, newQuantity: number) => void;
  removeCartItem: (id: number) => void;
  stockItems: StockItem[];
}

const CartContentSection: React.FC<CartContentSectionProps> = ({
  cartItems,
  updateQuantity,
  removeCartItem,
  stockItems
}) => {
  const getAvailableStock = (itemId: number) => {
    const stockItem = stockItems.find(s => s.id === itemId);
    return stockItem ? stockItem.quantity : Infinity;
  };

  // Helper function to check if an item is in stock
  const isItemInStock = (itemId: number) => {
    const stockItem = stockItems.find(s => s.id === itemId);
    return stockItem ? stockItem.inStock : true;
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <ShoppingBag className="text-brand-orange" size={20} />
        Votre Panier
      </h2>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">Votre panier est vide</p>
          <a href="/" className="text-brand-orange hover:underline">Commencer vos achats</a>
        </div>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => {
            const itemInStock = isItemInStock(item.id);
            
            return (
              <div key={item.id} className="flex items-center gap-4 border-b border-gray-100 pb-4 group hover:bg-gray-50 p-2 rounded-lg transition-colors duration-300">
                <div className="relative">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className={`w-20 h-20 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 ${!itemInStock ? 'opacity-60' : ''}`}
                  />
                  {!itemInStock && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-red-500 text-white text-xs px-1 py-0.5 rounded">
                        Rupture
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center">
                    <h3 className="font-medium group-hover:text-brand-orange transition-colors duration-300">{item.name}</h3>
                    {!itemInStock && (
                      <span className="ml-2 bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full flex items-center">
                        <AlertCircle size={12} className="mr-1" />
                        Rupture de stock
                      </span>
                    )}
                  </div>
                  <p className="text-brand-orange font-bold">{item.price.toFixed(2)} €</p>
                </div>
                
                <div className="flex items-center border rounded-lg overflow-hidden">
                  <button 
                    className={`px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors duration-300 ${!itemInStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    disabled={!itemInStock}
                  >
                    -
                  </button>
                  <span className="px-3 py-1">{item.quantity}</span>
                  <button 
                    className={`px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors duration-300 ${!itemInStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    disabled={!itemInStock}
                  >
                    +
                  </button>
                </div>
                
                <button 
                  className="text-gray-400 hover:text-red-500 transition-colors duration-300 transform hover:scale-110"
                  onClick={() => removeCartItem(item.id)}
                >
                  &times;
                </button>
              </div>
            );
          })}

          {cartItems.some(item => !isItemInStock(item.id)) && (
            <div className="bg-red-50 border border-red-100 p-3 rounded-lg text-red-700 text-sm flex items-start gap-2">
              <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Attention:</p>
                <p>Certains produits de votre panier sont en rupture de stock. Veuillez les retirer avant de finaliser votre commande.</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CartContentSection;
