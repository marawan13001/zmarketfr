
import React from 'react';

interface CheckoutStepsProps {
  currentStep: number;
}

const CheckoutSteps: React.FC<CheckoutStepsProps> = ({ currentStep }) => {
  return (
    <div className="flex items-center justify-between mb-12 relative">
      <div className="absolute left-0 right-0 top-1/2 h-1 bg-gray-200 -z-10"></div>
      
      <div className={`flex flex-col items-center ${currentStep >= 1 ? 'text-brand-orange' : 'text-gray-400'}`}>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mb-2 ${currentStep >= 1 ? 'bg-brand-orange' : 'bg-gray-300'}`}>1</div>
        <span className="text-xs font-medium">Panier</span>
      </div>
      
      <div className={`flex flex-col items-center ${currentStep >= 2 ? 'text-brand-orange' : 'text-gray-400'}`}>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mb-2 ${currentStep >= 2 ? 'bg-brand-orange' : 'bg-gray-300'}`}>2</div>
        <span className="text-xs font-medium">Livraison</span>
      </div>
      
      <div className={`flex flex-col items-center ${currentStep >= 3 ? 'text-brand-orange' : 'text-gray-400'}`}>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mb-2 ${currentStep >= 3 ? 'bg-brand-orange' : 'bg-gray-300'}`}>3</div>
        <span className="text-xs font-medium">Paiement</span>
      </div>
    </div>
  );
};

export default CheckoutSteps;
