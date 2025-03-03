import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { toast } from 'sonner';
import { ShoppingBag, CreditCard, Banknote, Clock, CalendarClock, AlertCircle, CreditCard as CreditCardIcon } from 'lucide-react';
import FloatingCart from '@/components/cart/FloatingCart';
import { sendWhatsAppNotification } from '@/utils/whatsappNotification';
import { WHATSAPP_NUMBER } from '@/pages/Index';
import { useLocation, useNavigate } from 'react-router-dom';
import StripePaymentForm from '@/components/payment/StripePaymentForm';
import { StockItem } from '@/components/admin/types';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  inStock?: boolean;
}

const Commande: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [stockItems, setStockItems] = useState<StockItem[]>([]);
  const [deliveryTime, setDeliveryTime] = useState<string>("asap");
  const [deliveryAddress, setDeliveryAddress] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("card");
  const [step, setStep] = useState<number>(1);
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);
  const [isRedirectedFromAuth, setIsRedirectedFromAuth] = useState<boolean>(false);

  // Vérifier si l'utilisateur est connecté
  useEffect(() => {
    if (!user && !isRedirectedFromAuth) {
      // Rediriger vers la page de connexion avec un paramètre de redirection
      navigate('/auth?redirect=commande', { state: { from: 'commande' } });
    }
  }, [user, navigate, isRedirectedFromAuth]);

  // Vérifier si l'utilisateur revient de la page d'authentification
  useEffect(() => {
    const fromAuth = location.state?.from === 'auth';
    if (fromAuth) {
      setIsRedirectedFromAuth(true);
    }
  }, [location]);

  // Préremplir les informations de l'utilisateur depuis son profil
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

          if (error) throw error;
          
          if (data) {
            setEmail(data.email || '');
            // Si vous ajoutez plus de champs à la table profiles, vous pourriez les utiliser ici
            // Par exemple: setDeliveryAddress(data.address || '');
          }
        } catch (error) {
          console.error('Erreur lors du chargement du profil:', error);
        }
      }
    };

    fetchUserProfile();
  }, [user]);

  useEffect(() => {
    // Load stock items from localStorage
    const savedStock = localStorage.getItem("stockItems");
    if (savedStock) {
      setStockItems(JSON.parse(savedStock));
    }
    
    // Load cart items from localStorage
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Update cart items with current stock status
  useEffect(() => {
    if (stockItems.length > 0 && cartItems.length > 0) {
      setCartItems(prevItems => 
        prevItems.map(item => {
          const stockItem = stockItems.find(stock => stock.id === item.id);
          return {
            ...item,
            inStock: stockItem ? stockItem.inStock : true
          };
        })
      );
    }
  }, [stockItems]);

  const updateQuantity = (id: number, newQuantity: number) => {
    // Check if new quantity is within stock limits
    const stockItem = stockItems.find(item => item.id === id);
    if (stockItem && stockItem.quantity < newQuantity) {
      toast.error(`Désolé, seulement ${stockItem.quantity} ${stockItem.title} disponible(s) en stock`);
      return;
    }
    
    const updatedItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
  };

  const removeCartItem = (id: number) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
  };

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const deliveryFee = subtotal >= 50 ? 0 : 15;
  const total = subtotal + deliveryFee;

  const generateOrderId = () => {
    return Math.floor(10000 + Math.random() * 90000).toString(); // 5-digit number
  };
  
  const handleNextStep = () => {
    if (step === 1) {
      if (cartItems.length === 0) {
        toast.error("Votre panier est vide");
        return;
      }

      // Check if any items are out of stock
      const outOfStockItems = cartItems.filter(item => item.inStock === false);
      if (outOfStockItems.length > 0) {
        toast.error(
          <div>
            Certains produits dans votre panier sont en rupture de stock. 
            Veuillez les retirer avant de continuer.
          </div>,
          { duration: 5000 }
        );
        return;
      }

      setStep(2);
      window.scrollTo(0, 0);
      return;
    }

    if (step === 2) {
      if (!deliveryAddress) {
        toast.error("Veuillez entrer une adresse de livraison");
        return;
      }
      if (!phoneNumber) {
        toast.error("Veuillez entrer un numéro de téléphone");
        return;
      }
      if (!email) {
        toast.error("Veuillez entrer une adresse email");
        return;
      }
      setStep(3);
      window.scrollTo(0, 0);
      return;
    }
    
    if (step === 3) {
      // If payment method is stripe, the payment process will be handled by the Stripe component
      if (paymentMethod === 'stripe') {
        return;
      }
      
      // For other payment methods, proceed with order confirmation
      processOrderConfirmation();
    }
  };
  
  const processOrderConfirmation = () => {
    console.log('🔔 Processing order confirmation...');
    setIsProcessingPayment(true);
    
    // Simulate payment processing
    setTimeout(() => {
      const orderId = generateOrderId();
      
      const orderDetails = {
        orderId,
        items: cartItems.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        customerInfo: {
          email,
          phone: phoneNumber,
          address: deliveryAddress
        },
        paymentMethod,
        deliveryTime: deliveryTime === 'asap' ? 'asap' : 'scheduled',
        total
      };
      
      console.log('🔔 Sending order notifications...');
      const notificationSent = sendWhatsAppNotification(orderDetails);
      console.log('🔔 Notification sent result:', notificationSent);
      
      toast.success("Commande confirmée ! Votre livraison est en route.", {
        duration: 5000,
      });
      
      // Clear cart after successful order
      localStorage.setItem("cartItems", JSON.stringify([]));
      setIsProcessingPayment(false);
      
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    }, 1500);
  };
  
  // Handle successful Stripe payment
  const handleStripePaymentSuccess = () => {
    processOrderConfirmation();
  };

  // Si l'utilisateur n'est pas connecté et qu'il n'a pas été redirigé depuis la page d'authentification,
  // on ne rend pas le contenu de la page pour éviter un flash
  if (!user && !isRedirectedFromAuth) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Votre Commande</h1>
          
          <div className="w-full max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-12 relative">
              <div className="absolute left-0 right-0 top-1/2 h-1 bg-gray-200 -z-10"></div>
              
              <div className={`flex flex-col items-center ${step >= 1 ? 'text-brand-orange' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mb-2 ${step >= 1 ? 'bg-brand-orange' : 'bg-gray-300'}`}>1</div>
                <span className="text-xs font-medium">Panier</span>
              </div>
              
              <div className={`flex flex-col items-center ${step >= 2 ? 'text-brand-orange' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mb-2 ${step >= 2 ? 'bg-brand-orange' : 'bg-gray-300'}`}>2</div>
                <span className="text-xs font-medium">Livraison</span>
              </div>
              
              <div className={`flex flex-col items-center ${step >= 3 ? 'text-brand-orange' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mb-2 ${step >= 3 ? 'bg-brand-orange' : 'bg-gray-300'}`}>3</div>
                <span className="text-xs font-medium">Paiement</span>
              </div>
            </div>
            
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm mb-8">
              {step === 1 && (
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
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 border-b border-gray-100 pb-4 group hover:bg-gray-50 p-2 rounded-lg transition-colors duration-300">
                          <div className="relative">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className={`w-20 h-20 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 ${item.inStock === false ? 'opacity-60' : ''}`}
                            />
                            {item.inStock === false && (
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
                              {item.inStock === false && (
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
                              className={`px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors duration-300 ${item.inStock === false ? 'opacity-50 cursor-not-allowed' : ''}`}
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              disabled={item.inStock === false}
                            >
                              -
                            </button>
                            <span className="px-3 py-1">{item.quantity}</span>
                            <button 
                              className={`px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors duration-300 ${item.inStock === false ? 'opacity-50 cursor-not-allowed' : ''}`}
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              disabled={item.inStock === false}
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
                      ))}

                      {cartItems.some(item => item.inStock === false) && (
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
              )}
              
              {step === 2 && (
                <div>
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Clock className="text-brand-orange" size={20} />
                    Informations de Livraison
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <p className="font-medium mb-4">Quand souhaitez-vous être livré?</p>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <label className={`flex-1 border rounded-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-md ${deliveryTime === 'asap' ? 'border-brand-orange bg-brand-orange/5' : 'border-gray-200 hover:border-gray-300'}`}>
                          <input 
                            type="radio" 
                            name="deliveryTime" 
                            value="asap" 
                            checked={deliveryTime === 'asap'} 
                            onChange={() => setDeliveryTime('asap')} 
                            className="sr-only"
                          />
                          <div className="flex items-start gap-3">
                            <Clock size={22} className={deliveryTime === 'asap' ? 'text-brand-orange' : 'text-gray-400'} />
                            <div>
                              <span className="font-medium block">Dès que possible</span>
                              <span className="text-sm text-gray-500">Livraison environ 1 heure après votre commande</span>
                            </div>
                          </div>
                        </label>
                        
                        <label className={`flex-1 border rounded-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-md ${deliveryTime === 'scheduled' ? 'border-brand-orange bg-brand-orange/5' : 'border-gray-200 hover:border-gray-300'}`}>
                          <input 
                            type="radio" 
                            name="deliveryTime" 
                            value="scheduled" 
                            checked={deliveryTime === 'scheduled'} 
                            onChange={() => setDeliveryTime('scheduled')} 
                            className="sr-only"
                          />
                          <div className="flex items-start gap-3">
                            <CalendarClock size={22} className={deliveryTime === 'scheduled' ? 'text-brand-orange' : 'text-gray-400'} />
                            <div>
                              <span className="font-medium block">Programmer</span>
                              <span className="text-sm text-gray-500">Choisir une heure spécifique</span>
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="address" className="block mb-2 font-medium">Adresse de livraison</label>
                      <input 
                        type="text" 
                        id="address" 
                        placeholder="Entrez votre adresse complète" 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-brand-orange outline-none transition-all duration-300"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block mb-2 font-medium">Numéro de téléphone</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        placeholder="Entrez votre numéro de téléphone" 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-brand-orange outline-none transition-all duration-300"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block mb-2 font-medium">Adresse email</label>
                      <input 
                        type="email" 
                        id="email" 
                        placeholder="Entrez votre adresse email" 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-brand-orange outline-none transition-all duration-300"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {step === 3 && (
                <div>
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <CreditCard className="text-brand-orange" size={20} />
                    Paiement
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <p className="font-medium mb-4">Méthode de paiement</p>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <label className={`flex-1 border rounded-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-md ${paymentMethod === 'card' ? 'border-brand-orange bg-brand-orange/5' : 'border-gray-200 hover:border-gray-300'}`}>
                          <input 
                            type="radio" 
                            name="paymentMethod" 
                            value="card" 
                            checked={paymentMethod === 'card'} 
                            onChange={() => setPaymentMethod('card')} 
                            className="sr-only"
                          />
                          <div className="flex items-center gap-3">
                            <CreditCard size={22} className={paymentMethod === 'card' ? 'text-brand-orange' : 'text-gray-400'} />
                            <span className="font-medium">Carte bancaire (à la livraison)</span>
                          </div>
                        </label>
                        
                        <label className={`flex-1 border rounded-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-md ${paymentMethod === 'cash' ? 'border-brand-orange bg-brand-orange/5' : 'border-gray-200 hover:border-gray-300'}`}>
                          <input 
                            type="radio" 
                            name="paymentMethod" 
                            value="cash" 
                            checked={paymentMethod === 'cash'} 
                            onChange={() => setPaymentMethod('cash')} 
                            className="sr-only"
                          />
                          <div className="flex items-center gap-3">
                            <Banknote size={22} className={paymentMethod === 'cash' ? 'text-brand-orange' : 'text-gray-400'} />
                            <span className="font-medium">Espèces à la livraison</span>
                          </div>
                        </label>
                      </div>
                      
                      <label className={`mt-4 flex-1 border rounded-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-md ${paymentMethod === 'stripe' ? 'border-brand-orange bg-brand-orange/5' : 'border-gray-200 hover:border-gray-300'}`}>
                        <input 
                          type="radio" 
                          name="paymentMethod" 
                          value="stripe" 
                          checked={paymentMethod === 'stripe'} 
                          onChange={() => setPaymentMethod('stripe')} 
                          className="sr-only"
                        />
                        <div className="flex items-center gap-3">
                          <CreditCardIcon size={22} className={paymentMethod === 'stripe' ? 'text-brand-orange' : 'text-gray-400'} />
                          <span className="font-medium">Payer maintenant avec Stripe</span>
                        </div>
                      </label>
                    </div>
                    
                    {paymentMethod === 'card' && (
                      <div className="p-4 border border-gray-200 rounded-lg transition-all duration-300 hover:border-gray-300 hover:shadow-sm">
                        <p className="text-center text-gray-500">
                          Vous paierez par carte bancaire à la livraison
                        </p>
                      </div>
                    )}
                    
                    {paymentMethod === 'stripe' && (
                      <div className="p-4 border border-gray-200 rounded-lg transition-all duration-300 hover:border-gray-300 hover:shadow-sm">
                        <StripePaymentForm 
                          amount={total} 
                          email={email}
                          onPaymentSuccess={handleStripePaymentSuccess}
                        />
                      </div>
                    )}
                    
                    <div className="p-4 border border-gray-200 bg-gray-50 rounded-lg transition-all duration-300 hover:bg-gray-100">
                      <p className="mb-2 font-medium text-gray-700">Notification au commerçant :</p>
                      <p className="text-sm text-gray-600">
                        En confirmant cette commande, une notification sera envoyée automatiquement au commerçant par WhatsApp ({WHATSAPP_NUMBER}) et par email (contact@zmarket.fr) avec les détails de votre commande pour accélérer le traitement.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm mb-8">
              <h2 className="text-xl font-bold mb-4">Récapitulatif</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Sous-total</span>
                  <span>{subtotal.toFixed(2)} €</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Frais de livraison</span>
                  <span>
                    {deliveryFee === 0 ? (
                      <span className="text-green-600">Gratuit</span>
                    ) : (
                      `${deliveryFee.toFixed(2)} €`
                    )}
                  </span>
                </div>
                
                <div className="flex justify-between text-lg font-bold pt-2 border-t">
                  <span>Total</span>
                  <span>{total.toFixed(2)} €</span>
                </div>

                {deliveryFee > 0 && (
                  <div className="text-sm text-gray-500">
                    Ajoutez {(50 - subtotal).toFixed(2)} € supplémentaires pour bénéficier de la livraison gratuite
                  </div>
                )}
              </div>
              
              <button 
                className={`w-full bg-brand-orange hover:bg-brand-orange/90 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 hover:shadow-md transform hover:translate-y-[-2px] ${
                  (cartItems.some(item => item.inStock === false) || isProcessingPayment) 
                    ? 'opacity-70 cursor-not-allowed' 
                    : ''
                }`}
                onClick={handleNextStep}
                disabled={cartItems.some(item => item.inStock === false) || isProcessingPayment || (step === 3 && paymentMethod === 'stripe')}
              >
                {isProcessingPayment ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Traitement en cours...
                  </span>
                ) : (
                  <>
                    {step === 1 && "Continuer vers la livraison"}
                    {step === 2 && "Continuer vers le paiement"}
                    {step === 3 && (paymentMethod === 'stripe' ? "Payez avec Stripe ci-dessus" : "Confirmer la commande")}
                  </>
                )}
              </button>
              
              {cartItems.some(item => item.inStock === false) && step === 1 && (
                <p className="text-center text-red-500 text-sm mt-2">
                  Veuillez retirer les produits en rupture de stock avant de continuer
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />

      <FloatingCart 
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeCartItem}
        stockItems={stockItems}
      />
    </div>
  );
};

export default Commande;
