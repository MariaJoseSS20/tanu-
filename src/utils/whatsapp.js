export const WHATSAPP_NUMBER = '56985382982';

export function whatsAppUrl(message) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function whatsAppConsultMessage(serviceTitle, destinationName) {
  if (destinationName) {
    return `Hola, me gustaría consultar disponibilidad para ${serviceTitle}: ${destinationName}.`;
  }
  return `Hola, me gustaría consultar disponibilidad para ${serviceTitle}.`;
}

export function whatsAppReserveMessage(serviceName) {
  return `Hola, me gustaría reservar ${serviceName}.`;
}

export function whatsAppContactMessage() {
  return 'Hola, me gustaría recibir información sobre tours y servicios en Porvenir.';
}
