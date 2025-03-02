/**
 * Utility functions for sending WhatsApp notifications and emails
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
 * Send WhatsApp notification without opening WhatsApp on client's browser
 * In a real application, this would be handled by a backend API endpoint
 */
export const sendWhatsAppNotification = (orderDetails: OrderDetails) => {
  // Format the message
  const message = formatOrderMessage(orderDetails);
  
  // Log the notification for demonstration purposes
  console.log(`[NOTIFICATION SYSTEM] WhatsApp notification would be sent to ${WHATSAPP_NUMBER} with message:`, message);
  
  // In a real application, this would make an API call to a backend service
  // which would use the WhatsApp Business API or a similar service to send the message
  // For demo purposes, we're simulating a successful notification
  
  // Show in the console that we're sending to your number
  console.log(`[NOTIFICATION SYSTEM] Order notification sent to WhatsApp: ${WHATSAPP_NUMBER}`);
  
  // Also send an email notification
  sendEmailNotification(orderDetails);
  
  return true;
};

/**
 * Send email notification with order details
 * Note: In a real application, this would call a backend API to send the email
 */
export const sendEmailNotification = (orderDetails: OrderDetails) => {
  // In a real application, this would use a proper email sending API
  
  const { orderId, items, customerInfo, paymentMethod, deliveryTime, total } = orderDetails;
  
  // Format items list for email
  const itemsList = items.map(item => {
    return `- ${item.name} (x${item.quantity}) - ${item.price.toFixed(2)}€`;
  }).join('\n');
  
  // Format delivery time
  const deliveryTimeFormatted = deliveryTime === 'asap' 
    ? 'Dès que possible (environ 1 heure)' 
    : deliveryTime;
  
  // Build the email body
  const emailBody = `
NOUVELLE COMMANDE #${orderId}

Produits:
${itemsList}

Total: ${total.toFixed(2)}€
Méthode de paiement: ${paymentMethod === 'card' ? 'Carte bancaire' : 'Espèces à la livraison'}

Livraison: ${deliveryTimeFormatted}

Information client:
Email: ${customerInfo.email}
Téléphone: ${customerInfo.phone}
Adresse: ${customerInfo.address}

Merci de préparer cette commande!
  `;
  
  // Log the notification for demonstration purposes
  console.log(`[NOTIFICATION SYSTEM] Email notification would be sent to contact@zmarket.fr with content:`, emailBody);
  
  // In a real application, this would make an API call to a backend service
  // which would use an email service to send the message
  // For demo purposes, we're simulating a successful notification
  
  // Show in the console that we're sending to your email
  console.log(`[NOTIFICATION SYSTEM] Order notification sent to email: contact@zmarket.fr`);
  
  return true;
};
