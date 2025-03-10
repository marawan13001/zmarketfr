import React, { useState, useEffect } from 'react';
import { ShoppingCart, X, ChevronUp, ChevronDown, Trash2, AlertTriangle, Info } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { StockItem } from '@/components/admin/types';
import { useAuth } from '@/contexts/AuthContext';

export interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface FloatingCartProps {
  items: CartItem[];
  onUpdateQuantity?: (id: number, newQuantity: number) => void;
  onRemoveItem?: (id: number) => void;
  stockItems?: StockItem[];
}

const FloatingCart: React.FC<FloatingCartProps> = ({ 
  items = [],
  onUpdateQuantity,
  onRemoveItem,
  stockItems = []
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(items));
    }
  }, [items]);

  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const deliveryFee = subtotal >= 50 ? 0 : 15;
  const total = subtotal + deliveryFee;

  const getAvailableStock = (itemId: number) => {
    const stockItem = stockItems.find(s => s.id === itemId);
    return stockItem ? stockItem.quantity : Infinity;
  };

  const handleQuantityChange = (id: number, change: number) => {
    if (!onUpdateQuantity) return;
    
    const item = items.find(item => item.id === id);
    if (!item) return;
    
    const availableStock = getAvailableStock(id);
    const newQuantity = item.quantity + change;
    
    if (newQuantity <= 0) {
      if (onRemoveItem) {
        onRemoveItem(id);
        toast.success(`${item.name} retiré du panier`);
      }
      return;
    }
    
    if (newQuantity > availableStock) {
      toast.error(`Désolé, seulement ${availableStock} ${item.name} disponible(s) en stock`);
      return;
    }
    
    onUpdateQuantity(id, newQuantity);
    toast.success(`Quantité mise à jour: ${item.name}`);
  };

  const handleRemoveItem = (id: number) => {
    if (!onRemoveItem) return;
    
    const item = items.find(item => item.id === id);
    if (!item) return;
    
    onRemoveItem(id);
    
    toast.success(`${item.name} retiré du panier`);
  };

  const handleCheckout = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      navigate('/auth?redirect=commande');
    }
  };

  if (items.length === 0 && !isOpen) {
    return null;
  }

  return (
    <div className={cn(
      "fixed bottom-6 right-6 z-50 flex flex-col items-end",
      isOpen ? "w-80" : "w-auto"
    )}>
      <button
        onClick={toggleCart}
        className="flex items-center gap-2 bg-brand-orange text-white p-4 rounded-full shadow-lg hover:bg-brand-orange/90 transition-all"
        aria-label="Voir mon panier"
      >
        <ShoppingCart size={24} />
        {!isOpen && items.length > 0 && (
          <span className="bg-white text-brand-orange font-bold rounded-full w-6 h-6 flex items-center justify-center">
            {items.reduce((sum, item) => sum + item.quantity, 0)}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl w-full mt-4 overflow-hidden border border-gray-200 animate-in slide-in-from-bottom-10 duration-300">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-bold text-gray-800">Mon Panier</h3>
            <button 
              onClick={toggleCart}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Fermer le panier"
            >
              <X size={20} />
            </button>
          </div>

          <div className="max-h-80 overflow-y-auto p-4 space-y-4">
            {items.length === 0 ? (
              <p className="text-gray-500 text-center py-6">Votre panier est vide</p>
            ) : (
              items.map((item) => {
                const availableStock = getAvailableStock(item.id);
                const isAtMaxStock = item.quantity >= availableStock;
                
                return (
                  <div key={item.id} className="flex items-center gap-3 border-b border-gray-100 pb-3">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-14 h-14 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <p className="text-brand-orange font-bold">{item.price.toFixed(2)} €</p>
                      
                      {isAtMaxStock && (
                        <div className="flex items-center mt-1 text-xs text-amber-600">
                          <Info size={12} className="mr-1" />
                          <span>Stock max: {availableStock}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-center">
                      <button 
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className={`text-gray-500 ${isAtMaxStock ? 'opacity-50 cursor-not-allowed' : 'hover:text-brand-orange'}`}
                        disabled={isAtMaxStock}
                      >
                        <ChevronUp size={18} />
                      </button>
                      <span className="text-sm font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="text-gray-500 hover:text-brand-orange"
                      >
                        <ChevronDown size={18} />
                      </button>
                    </div>
                    <button 
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-gray-500 hover:text-red-500 ml-1"
                      aria-label="Supprimer du panier"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {items.length > 0 && (
            <>
              <div className="p-4 bg-gray-50 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Sous-total</span>
                  <span>{subtotal.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Frais de livraison</span>
                  <span>
                    {deliveryFee === 0 ? (
                      <span className="text-green-600">Gratuit</span>
                    ) : (
                      `${deliveryFee.toFixed(2)} €`
                    )}
                  </span>
                </div>
                <div className="flex justify-between font-bold pt-1">
                  <span>Total</span>
                  <span>{total.toFixed(2)} €</span>
                </div>
              </div>
              
              <div className="p-4">
                {user ? (
                  <Link 
                    to="/commande" 
                    className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <ShoppingCart size={18} />
                    Passer commande
                  </Link>
                ) : (
                  <Link 
                    to="/auth?redirect=commande" 
                    className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                    onClick={handleCheckout}
                  >
                    <ShoppingCart size={18} />
                    Se connecter pour commander
                  </Link>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default FloatingCart;
