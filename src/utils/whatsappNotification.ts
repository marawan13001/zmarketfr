
/**
 * Utility functions for sending WhatsApp notifications
 */

import { WHATSAPP_NUMBER } from '@/pages/Index';

interface OrderDetails {
  orderId: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  customerInfo: {
    name?: string;
    email: string;
    phone: string;
    address: string;
  };
  paymentMethod: string;
  deliveryTime: string;
  total: number;
}

/**
 * Format a message for WhatsApp with order details
 */
export const formatOrderMessage = (orderDetails: OrderDetails): string => {
  const { orderId, items, customerInfo, paymentMethod, deliveryTime, total } = orderDetails;
  
  // Format items list
  const itemsList = items.map(item => {
    return `  - ${item.name} (x${item.quantity}) - ${item.price.toFixed(2)}€`;
  }).join('\n');
  
  // Format delivery time
  const deliveryTimeFormatted = deliveryTime === 'asap' 
    ? 'Dès que possible (environ 1 heure)' 
    : deliveryTime;
  
  // Build the complete message
  return `🛒 *NOUVELLE COMMANDE* #${orderId}\n\n` +
    `📋 *Produits:*\n${itemsList}\n\n` +
    `💰 *Total:* ${total.toFixed(2)}€\n` +
    `💳 *Méthode de paiement:* ${paymentMethod === 'card' ? 'Carte bancaire' : 'Espèces à la livraison'}\n\n` +
    `🕒 *Livraison:* ${deliveryTimeFormatted}\n\n` +
    `👤 *Information client:*\n` +
    `  Email: ${customerInfo.email}\n` +
    `  Téléphone: ${customerInfo.phone}\n` +
    `  Adresse: ${customerInfo.address}\n\n` +
    `Merci de préparer cette commande!`;
};

/**
 * Open WhatsApp with pre-filled message about a new order
 */
export const sendWhatsAppNotification = (orderDetails: OrderDetails) => {
  // Format the message
  const message = formatOrderMessage(orderDetails);
  
  // Encode the message for URL
  const encodedMessage = encodeURIComponent(message);
  
  // Create the WhatsApp URL
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  
  // Open WhatsApp in a new tab
  window.open(whatsappUrl, '_blank');
  
  return true;
};
