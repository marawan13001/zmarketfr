import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { toast } from 'sonner';
import { ShoppingBag, CreditCard, Banknote, Clock, CalendarClock } from 'lucide-react';
import FloatingCart from '@/components/cart/FloatingCart';

interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

const Commande: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Pizza 4 Fromages Surgelée",
      image: "/lovable-uploads/3230e5df-068b-4a55-89ea-10484b277a5a.png",
      price: 12.99,
      quantity: 2
    },
    {
      id: 2,
      name: "Glace Vanille Premium",
      image: "/lovable-uploads/f96329d1-539b-41bc-8c63-c12b7a050ae6.png",
      price: 8.50,
      quantity: 1
    }
  ]);

  const [deliveryTime, setDeliveryTime] = useState<string>("asap");
  const [deliveryAddress, setDeliveryAddress] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("card");
  const [step, setStep] = useState<number>(1);

  const updateQuantity = (id: number, newQuantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const deliveryFee = subtotal >= 50 ? 0 : 15;
  const total = subtotal + deliveryFee;

  const handleNextStep = () => {
    if (step === 1) {
      if (cartItems.length === 0) {
        toast.error("Votre panier est vide");
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
      toast.success("Commande confirmée ! Votre livraison est en route.", {
        duration: 5000,
      });
      
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    }
  };

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
                        <div key={item.id} className="flex items-center gap-4 border-b border-gray-100 pb-4">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          
                          <div className="flex-1">
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-brand-orange font-bold">{item.price.toFixed(2)} €</p>
                          </div>
                          
                          <div className="flex items-center border rounded-lg overflow-hidden">
                            <button 
                              className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            >
                              -
                            </button>
                            <span className="px-3 py-1">{item.quantity}</span>
                            <button 
                              className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                          
                          <button 
                            className="text-gray-400 hover:text-red-500 transition-colors"
                            onClick={() => setCartItems(items => items.filter(i => i.id !== item.id))}
                          >
                            &times;
                          </button>
                        </div>
                      ))}
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
                        <label className={`flex-1 border rounded-lg p-4 cursor-pointer transition-colors ${deliveryTime === 'asap' ? 'border-brand-orange bg-brand-orange/5' : 'border-gray-200 hover:border-gray-300'}`}>
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
                        
                        <label className={`flex-1 border rounded-lg p-4 cursor-pointer transition-colors ${deliveryTime === 'scheduled' ? 'border-brand-orange bg-brand-orange/5' : 'border-gray-200 hover:border-gray-300'}`}>
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
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-brand-orange outline-none"
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
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-brand-orange outline-none"
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
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-brand-orange outline-none"
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
                        <label className={`flex-1 border rounded-lg p-4 cursor-pointer transition-colors ${paymentMethod === 'card' ? 'border-brand-orange bg-brand-orange/5' : 'border-gray-200 hover:border-gray-300'}`}>
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
                            <span className="font-medium">Carte bancaire</span>
                          </div>
                        </label>
                        
                        <label className={`flex-1 border rounded-lg p-4 cursor-pointer transition-colors ${paymentMethod === 'cash' ? 'border-brand-orange bg-brand-orange/5' : 'border-gray-200 hover:border-gray-300'}`}>
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
                    </div>
                    
                    {paymentMethod === 'card' && (
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <p className="text-center text-gray-500">
                          Dans une vraie application, un formulaire de carte de paiement serait intégré ici
                        </p>
                      </div>
                    )}
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
                className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                onClick={handleNextStep}
              >
                {step === 1 && "Continuer vers la livraison"}
                {step === 2 && "Continuer vers le paiement"}
                {step === 3 && "Confirmer la commande"}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />

      <FloatingCart 
        items={cartItems}
        onUpdateQuantity={updateQuantity}
      />
    </div>
  );
};

export default Commande;
