
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Clock } from 'lucide-react';

interface OrderSummaryProps {
  subtotal: number;
  deliveryFee: number;
  total: number;
  handleNextStep: () => void;
  step: number;
  isProcessingPayment: boolean;
  hasOutOfStockItems: boolean;
  paymentMethod: string;
  deliveryMethod: string;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  subtotal,
  deliveryFee,
  total,
  handleNextStep,
  step,
  isProcessingPayment,
  hasOutOfStockItems,
  paymentMethod,
  deliveryMethod
}) => {
  // Vérifier si l'heure actuelle est dans les heures d'ouverture (9h - 20h)
  const currentHour = new Date().getHours();
  const isWithinBusinessHours = currentHour >= 9 && currentHour < 20;
  const openingTime = currentHour < 9 ? "09h00" : "demain à 09h00";

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm mb-8">
      <h2 className="text-xl font-bold mb-4">Récapitulatif</h2>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span>Sous-total</span>
          <span>{subtotal.toFixed(2)} €</span>
        </div>
        
        <div className="flex justify-between">
          <span>{deliveryMethod === 'delivery' ? 'Frais de livraison' : 'Frais de préparation'}</span>
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

        {deliveryMethod === 'delivery' && deliveryFee > 0 && (
          <div className="text-sm text-gray-500">
            Ajoutez {(50 - subtotal).toFixed(2)} € supplémentaires pour bénéficier de la livraison gratuite
          </div>
        )}
      </div>
      
      {!isWithinBusinessHours && (
        <Alert className="mb-4 bg-amber-50 border-amber-200">
          <Clock className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            {deliveryMethod === 'delivery' 
              ? `Nous sommes actuellement fermés. Votre livraison sera traitée ${openingTime}.`
              : `Nous sommes actuellement fermés. Votre commande sera prête à être récupérée ${openingTime}.`}
          </AlertDescription>
        </Alert>
      )}
      
      <button 
        className={`w-full bg-brand-orange hover:bg-brand-orange/90 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 hover:shadow-md transform hover:translate-y-[-2px] ${
          (hasOutOfStockItems || isProcessingPayment) 
            ? 'opacity-70 cursor-not-allowed' 
            : ''
        }`}
        onClick={handleNextStep}
        disabled={hasOutOfStockItems || isProcessingPayment || (step === 3 && paymentMethod === 'stripe')}
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
      
      {hasOutOfStockItems && step === 1 && (
        <p className="text-center text-red-500 text-sm mt-2">
          Veuillez retirer les produits en rupture de stock avant de continuer
        </p>
      )}
    </div>
  );
};

export default OrderSummary;
