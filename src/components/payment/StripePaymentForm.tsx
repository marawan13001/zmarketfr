
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { CreditCard, Calendar, Lock } from 'lucide-react';

interface StripePaymentFormProps {
  amount: number;
  email: string;
  onPaymentSuccess: () => void;
}

const StripePaymentForm: React.FC<StripePaymentFormProps> = ({ 
  amount, 
  email,
  onPaymentSuccess 
}) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const formatCardNumber = (value: string) => {
    // Remove non-digit characters
    const digits = value.replace(/\D/g, '');
    
    // Add space after every 4 digits
    const formatted = digits.replace(/(\d{4})(?=\d)/g, '$1 ');
    
    // Limit to 19 characters (16 digits + 3 spaces)
    return formatted.slice(0, 19);
  };

  const formatExpiryDate = (value: string) => {
    // Remove non-digit characters
    const digits = value.replace(/\D/g, '');
    
    // Format as MM/YY
    if (digits.length > 2) {
      return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
    }
    return digits;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(formatCardNumber(e.target.value));
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpiryDate(formatExpiryDate(e.target.value));
  };

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow up to 3-4 digits
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setCvc(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!cardNumber || cardNumber.replace(/\s/g, '').length < 16) {
      toast.error("Veuillez entrer un numéro de carte valide");
      return;
    }
    
    if (!expiryDate || expiryDate.length < 5) {
      toast.error("Veuillez entrer une date d'expiration valide");
      return;
    }
    
    if (!cvc || cvc.length < 3) {
      toast.error("Veuillez entrer un code CVC valide");
      return;
    }
    
    if (!cardholderName) {
      toast.error("Veuillez entrer le nom du titulaire de la carte");
      return;
    }
    
    // Simulate payment processing
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      toast.success("Paiement accepté !");
      
      // Call the success callback
      onPaymentSuccess();
    }, 2000);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-4 flex justify-between items-center">
        <div className="flex items-center">
          <CreditCard className="mr-2 text-brand-orange" size={24} />
          <h3 className="text-lg font-medium">Paiement Sécurisé</h3>
        </div>
        <div className="flex items-center space-x-2">
          <img src="https://cdn-icons-png.flaticon.com/512/6124/6124998.png" alt="Visa" className="h-6" />
          <img src="https://cdn-icons-png.flaticon.com/512/349/349228.png" alt="Mastercard" className="h-6" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Numéro de carte
          </label>
          <div className="relative">
            <Input
              id="cardNumber"
              type="text"
              value={cardNumber}
              onChange={handleCardNumberChange}
              placeholder="1234 5678 9012 3456"
              className="pl-10"
              disabled={isProcessing}
            />
            <CreditCard className="absolute left-3 top-3 text-gray-400" size={16} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
              Date d'expiration
            </label>
            <div className="relative">
              <Input
                id="expiryDate"
                type="text"
                value={expiryDate}
                onChange={handleExpiryDateChange}
                placeholder="MM/YY"
                className="pl-10"
                maxLength={5}
                disabled={isProcessing}
              />
              <Calendar className="absolute left-3 top-3 text-gray-400" size={16} />
            </div>
          </div>
          
          <div>
            <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 mb-1">
              CVC
            </label>
            <div className="relative">
              <Input
                id="cvc"
                type="text"
                value={cvc}
                onChange={handleCvcChange}
                placeholder="123"
                className="pl-10"
                maxLength={4}
                disabled={isProcessing}
              />
              <Lock className="absolute left-3 top-3 text-gray-400" size={16} />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="cardholderName" className="block text-sm font-medium text-gray-700 mb-1">
            Nom du titulaire
          </label>
          <Input
            id="cardholderName"
            type="text"
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)}
            placeholder="JEAN DUPONT"
            disabled={isProcessing}
          />
        </div>

        <div className="bg-gray-50 p-3 rounded-lg text-sm">
          <div className="flex justify-between">
            <span>Montant à payer:</span>
            <span className="font-bold">{amount.toFixed(2)} €</span>
          </div>
          <div className="flex justify-between mt-1">
            <span>Email:</span>
            <span>{email}</span>
          </div>
        </div>

        <button
          type="submit"
          className={`w-full bg-brand-orange hover:bg-brand-orange/90 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 hover:shadow-md ${
            isProcessing ? 'opacity-70 cursor-not-allowed' : ''
          }`}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Traitement...
            </span>
          ) : (
            `Payer ${amount.toFixed(2)} €`
          )}
        </button>

        <div className="flex items-center justify-center text-xs text-gray-500 mt-4">
          <Lock size={14} className="mr-1" />
          Paiement sécurisé par Stripe
        </div>
      </form>
    </div>
  );
};

export default StripePaymentForm;
