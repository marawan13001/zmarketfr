
import React from 'react';
import { CreditCard, Banknote, CreditCard as CreditCardIcon } from 'lucide-react';
import StripePaymentForm from '@/components/payment/StripePaymentForm';
import { WHATSAPP_NUMBER } from '@/pages/Index';

interface PaymentSectionProps {
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
  total: number;
  email: string;
  onStripePaymentSuccess: () => void;
}

const PaymentSection: React.FC<PaymentSectionProps> = ({
  paymentMethod,
  setPaymentMethod,
  total,
  email,
  onStripePaymentSuccess
}) => {
  return (
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
              onPaymentSuccess={onStripePaymentSuccess}
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
  );
};

export default PaymentSection;
