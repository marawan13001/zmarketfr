import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ShoppingCart, CreditCard, Clock, MapPin, X, Minus, Plus, Truck } from 'lucide-react';
import { toast } from 'sonner';

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

const Commande: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      title: "Hachis Parmentier",
      price: 6.99,
      quantity: 1,
      image: "/lovable-uploads/1e7548f5-8859-4e95-b8cb-40cab3d8dd35.png"
    },
    {
      id: 8,
      title: "Pizza Kebab",
      price: 5.99,
      quantity: 2,
      image: "/lovable-uploads/f8882b9d-14ea-4d99-80c5-9e95889b9a08.png"
    }
  ]);

  const [deliveryTime, setDeliveryTime] = useState<string>("asap");
  const [deliveryAddress, setDeliveryAddress] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("card");
  const [step, setStep] = useState<number>(1);

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    toast.success("Produit retiré du panier");
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const deliveryFee = subtotal >= 50 ? 0 : 15;
  const total = subtotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
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
    <div className="min-h-screen bg-brand-gray">
      <Navbar />
      
      <main className="pt-28 pb-20">
        <div className="container px-4 mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Votre Commande</h1>
          
          <div className="w-full max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-12 relative">
              <div className="absolute left-0 right-0 top-1/2 h-1 bg-gray-200 -z-10"></div>
              
              <div className={`flex flex-col items-center ${step >= 1 ? 'text-brand-orange' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-brand-orange text-white' : 'bg-gray-200 text-gray-500'} mb-2`}>
                  <ShoppingCart size={18} />
                </div>
                <span className="text-sm font-medium">Panier</span>
              </div>
              
              <div className={`flex flex-col items-center ${step >= 2 ? 'text-brand-orange' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-brand-orange text-white' : 'bg-gray-200 text-gray-500'} mb-2`}>
                  <Truck size={18} />
                </div>
                <span className="text-sm font-medium">Livraison</span>
              </div>
              
              <div className={`flex flex-col items-center ${step >= 3 ? 'text-brand-orange' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-brand-orange text-white' : 'bg-gray-200 text-gray-500'} mb-2`}>
                  <CreditCard size={18} />
                </div>
                <span className="text-sm font-medium">Paiement</span>
              </div>
            </div>
            
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                  <h2 className="text-xl font-bold mb-6 pb-4 border-b">Articles dans votre panier</h2>
                  
                  {cartItems.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="flex justify-center mb-4">
                        <ShoppingCart className="w-16 h-16 text-gray-300" />
                      </div>
                      <p className="text-gray-500 mb-4">Votre panier est vide</p>
                      <a 
                        href="/#produits" 
                        className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-brand-orange text-white font-medium transition-all hover:bg-brand-orange/90"
                      >
                        Voir nos produits
                      </a>
                    </div>
                  ) : (
                    <div>
                      <div className="space-y-4 mb-8">
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex items-center p-4 bg-gray-50 rounded-lg">
                            <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                              <img 
                                src={item.image} 
                                alt={item.title} 
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.src = '/placeholder.svg';
                                }}
                              />
                            </div>
                            
                            <div className="flex-1 ml-4">
                              <h3 className="font-medium">{item.title}</h3>
                              <p className="text-brand-orange font-semibold">{item.price.toFixed(2)}€</p>
                            </div>
                            
                            <div className="flex items-center mr-4">
                              <button 
                                type="button" 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1 rounded-full bg-gray-200 text-gray-700"
                              >
                                <Minus size={16} />
                              </button>
                              
                              <span className="w-10 text-center mx-1 font-medium">
                                {item.quantity}
                              </span>
                              
                              <button 
                                type="button" 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 rounded-full bg-gray-200 text-gray-700"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                            
                            <button 
                              type="button" 
                              onClick={() => removeItem(item.id)}
                              className="p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                            >
                              <X size={18} />
                            </button>
                          </div>
                        ))}
                      </div>
                      
                      <div className="border-t pt-4 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Sous-total</span>
                          <span className="font-medium">{subtotal.toFixed(2)}€</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Frais de livraison</span>
                          {deliveryFee === 0 ? (
                            <span className="font-medium text-green-600">Gratuit</span>
                          ) : (
                            <span className="font-medium">{deliveryFee.toFixed(2)}€</span>
                          )}
                        </div>
                        {subtotal > 0 && subtotal < 50 && (
                          <div className="flex justify-between bg-brand-orange/10 p-2 rounded text-sm">
                            <span className="text-brand-orange">Livraison offerte à partir de</span>
                            <span className="font-medium text-brand-orange">50.00€</span>
                          </div>
                        )}
                        <div className="flex justify-between pt-2 border-t">
                          <span className="font-bold">Total</span>
                          <span className="font-bold text-lg text-brand-orange">{total.toFixed(2)}€</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {step === 2 && (
                <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                  <h2 className="text-xl font-bold mb-6 pb-4 border-b">Informations de livraison</h2>
                  
                  <div className="space-y-6">
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
                    
                    <div>
                      <label className="block mb-2 font-medium">Heure de livraison</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div 
                          className={`cursor-pointer border rounded-lg p-4 ${deliveryTime === 'asap' ? 'border-brand-orange bg-brand-orange/5' : 'border-gray-300'}`}
                          onClick={() => setDeliveryTime('asap')}
                        >
                          <div className="flex items-start">
                            <div className={`w-5 h-5 mt-0.5 rounded-full border-2 mr-3 flex-shrink-0 ${deliveryTime === 'asap' ? 'border-brand-orange bg-white' : 'border-gray-400'}`}></div>
                            <div>
                              <h3 className="font-medium">Dès que possible</h3>
                              <p className="text-gray-500 text-sm">Livraison dans l'heure qui suit</p>
                            </div>
                          </div>
                        </div>
                        
                        <div 
                          className={`cursor-pointer border rounded-lg p-4 ${deliveryTime === 'scheduled' ? 'border-brand-orange bg-brand-orange/5' : 'border-gray-300'}`}
                          onClick={() => setDeliveryTime('scheduled')}
                        >
                          <div className="flex items-start">
                            <div className={`w-5 h-5 mt-0.5 rounded-full border-2 mr-3 flex-shrink-0 ${deliveryTime === 'scheduled' ? 'border-brand-orange bg-white' : 'border-gray-400'}`}></div>
                            <div>
                              <h3 className="font-medium">Programmer la livraison</h3>
                              <p className="text-gray-500 text-sm">Choisissez une heure (10h-19h)</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {deliveryTime === 'scheduled' && (
                      <div>
                        <label htmlFor="time" className="block mb-2 font-medium">Choisir une heure</label>
                        <select 
                          id="time" 
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-brand-orange outline-none"
                        >
                          <option value="">Sélectionnez une heure</option>
                          <option value="10:00">10:00</option>
                          <option value="11:00">11:00</option>
                          <option value="12:00">12:00</option>
                          <option value="13:00">13:00</option>
                          <option value="14:00">14:00</option>
                          <option value="15:00">15:00</option>
                          <option value="16:00">16:00</option>
                          <option value="17:00">17:00</option>
                          <option value="18:00">18:00</option>
                        </select>
                      </div>
                    )}
                    
                    <div className="bg-blue-50 p-4 rounded-lg flex items-start">
                      <Clock className="text-blue-500 mr-3 flex-shrink-0 mt-1" size={20} />
                      <div>
                        <h3 className="font-medium text-blue-700">Horaires de livraison</h3>
                        <p className="text-blue-600 text-sm">Nous livrons tous les jours de 10h à 19h. Votre commande sera livrée une heure après avoir été passée.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {step === 3 && (
                <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                  <h2 className="text-xl font-bold mb-6 pb-4 border-b">Mode de paiement</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block mb-4 font-medium">Choisissez votre mode de paiement</label>
                      <div className="grid grid-cols-1 gap-4">
                        <div 
                          className={`cursor-pointer border rounded-lg p-4 ${paymentMethod === 'card' ? 'border-brand-orange bg-brand-orange/5' : 'border-gray-300'}`}
                          onClick={() => setPaymentMethod('card')}
                        >
                          <div className="flex items-center">
                            <div className={`w-5 h-5 rounded-full border-2 mr-3 ${paymentMethod === 'card' ? 'border-brand-orange bg-white' : 'border-gray-400'}`}></div>
                            <div className="flex items-center">
                              <CreditCard className="mr-2 text-gray-700" size={20} />
                              <span className="font-medium">Carte bancaire</span>
                            </div>
                          </div>
                        </div>
                        
                        <div 
                          className={`cursor-pointer border rounded-lg p-4 ${paymentMethod === 'cash' ? 'border-brand-orange bg-brand-orange/5' : 'border-gray-300'}`}
                          onClick={() => setPaymentMethod('cash')}
                        >
                          <div className="flex items-center">
                            <div className={`w-5 h-5 rounded-full border-2 mr-3 ${paymentMethod === 'cash' ? 'border-brand-orange bg-white' : 'border-gray-400'}`}></div>
                            <span className="font-medium">Paiement à la livraison</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {paymentMethod === 'card' && (
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="cardNumber" className="block mb-2 font-medium">Numéro de carte</label>
                          <input 
                            type="text" 
                            id="cardNumber" 
                            placeholder="1234 5678 9012 3456" 
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-brand-orange outline-none"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="expiry" className="block mb-2 font-medium">Date d'expiration</label>
                            <input 
                              type="text" 
                              id="expiry" 
                              placeholder="MM/YY" 
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-brand-orange outline-none"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="cvv" className="block mb-2 font-medium">CVV</label>
                            <input 
                              type="text" 
                              id="cvv" 
                              placeholder="123" 
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-brand-orange outline-none"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="cardName" className="block mb-2 font-medium">Nom sur la carte</label>
                          <input 
                            type="text" 
                            id="cardName" 
                            placeholder="John Doe" 
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-brand-orange outline-none"
                          />
                        </div>
                      </div>
                    )}
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Résumé de la commande</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">{cartItems.length} article(s)</span>
                          <span>{subtotal.toFixed(2)}€</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Livraison</span>
                          {deliveryFee === 0 ? (
                            <span className="text-green-600">Gratuit</span>
                          ) : (
                            <span>{deliveryFee.toFixed(2)}€</span>
                          )}
                        </div>
                        <div className="flex justify-between pt-2 border-t font-medium">
                          <span>Total</span>
                          <span className="text-brand-orange">{total.toFixed(2)}€</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex justify-between">
                {step > 1 ? (
                  <button 
                    type="button" 
                    onClick={() => setStep(step - 1)}
                    className="px-6 py-3 rounded-lg bg-gray-200 text-gray-800 font-medium transition-all hover:bg-gray-300"
                  >
                    Retour
                  </button>
                ) : (
                  <a 
                    href="/"
                    className="px-6 py-3 rounded-lg bg-gray-200 text-gray-800 font-medium transition-all hover:bg-gray-300"
                  >
                    Continuer mes achats
                  </a>
                )}
                
                <button 
                  type="submit" 
                  className="px-6 py-3 rounded-lg bg-brand-orange text-white font-medium transition-all hover:bg-brand-orange/90"
                >
                  {step === 3 ? 'Confirmer la commande' : 'Continuer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Commande;
