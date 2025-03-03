
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { toast } from 'sonner';
import FloatingCart from '@/components/cart/FloatingCart';
import { sendWhatsAppNotification } from '@/utils/whatsappNotification';
import { WHATSAPP_NUMBER } from '@/pages/Index';
import { useLocation, useNavigate } from 'react-router-dom';
import { StockItem } from '@/components/admin/types';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

// Import new components
import CartContentSection from '@/components/checkout/CartContentSection';
import DeliverySection from '@/components/checkout/DeliverySection';
import PaymentSection from '@/components/checkout/PaymentSection';
import OrderSummary from '@/components/checkout/OrderSummary';
import CheckoutSteps from '@/components/checkout/CheckoutSteps';

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
  const [deliveryMethod, setDeliveryMethod] = useState<string>("delivery");

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
  // Ajuster les frais de livraison en fonction du mode de livraison choisi
  const deliveryFee = deliveryMethod === 'pickup' ? 0 : (subtotal >= 50 ? 0 : 15);
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
      if (deliveryMethod === 'delivery' && !deliveryAddress) {
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
          address: deliveryMethod === 'delivery' ? deliveryAddress : 'Click & Collect en magasin'
        },
        paymentMethod,
        deliveryMethod,
        deliveryTime: deliveryTime === 'asap' ? 'asap' : 'scheduled',
        total
      };
      
      console.log('🔔 Sending order notifications...');
      const notificationSent = sendWhatsAppNotification(orderDetails);
      console.log('🔔 Notification sent result:', notificationSent);
      
      if (deliveryMethod === 'pickup') {
        toast.success("Commande confirmée ! Votre commande sera prête dans 1 heure environ pour être récupérée en magasin.", {
          duration: 5000,
        });
      } else {
        toast.success("Commande confirmée ! Votre livraison est en route.", {
          duration: 5000,
        });
      }
      
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

  // Check if there are out-of-stock items
  const hasOutOfStockItems = cartItems.some(item => item.inStock === false);

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
            <CheckoutSteps currentStep={step} />
            
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm mb-8">
              {step === 1 && (
                <CartContentSection 
                  cartItems={cartItems} 
                  updateQuantity={updateQuantity} 
                  removeCartItem={removeCartItem}
                  stockItems={stockItems}
                />
              )}
              
              {step === 2 && (
                <DeliverySection 
                  deliveryTime={deliveryTime}
                  setDeliveryTime={setDeliveryTime}
                  deliveryAddress={deliveryAddress}
                  setDeliveryAddress={setDeliveryAddress}
                  phoneNumber={phoneNumber}
                  setPhoneNumber={setPhoneNumber}
                  email={email}
                  setEmail={setEmail}
                  deliveryMethod={deliveryMethod}
                  setDeliveryMethod={setDeliveryMethod}
                />
              )}
              
              {step === 3 && (
                <PaymentSection 
                  paymentMethod={paymentMethod}
                  setPaymentMethod={setPaymentMethod}
                  total={total}
                  email={email}
                  onStripePaymentSuccess={handleStripePaymentSuccess}
                />
              )}
            </div>
            
            <OrderSummary 
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              total={total}
              handleNextStep={handleNextStep}
              step={step}
              isProcessingPayment={isProcessingPayment}
              hasOutOfStockItems={hasOutOfStockItems}
              paymentMethod={paymentMethod}
              deliveryMethod={deliveryMethod}
            />
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
