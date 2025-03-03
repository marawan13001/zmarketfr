
import React from 'react';
import { Clock, CalendarClock } from 'lucide-react';

interface DeliverySectionProps {
  deliveryTime: string;
  setDeliveryTime: (time: string) => void;
  deliveryAddress: string;
  setDeliveryAddress: (address: string) => void;
  phoneNumber: string;
  setPhoneNumber: (phone: string) => void;
  email: string;
  setEmail: (email: string) => void;
}

const DeliverySection: React.FC<DeliverySectionProps> = ({
  deliveryTime,
  setDeliveryTime,
  deliveryAddress,
  setDeliveryAddress,
  phoneNumber,
  setPhoneNumber,
  email,
  setEmail
}) => {
  return (
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
  );
};

export default DeliverySection;
