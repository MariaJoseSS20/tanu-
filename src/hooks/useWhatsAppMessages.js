import { useTranslation } from 'react-i18next';
import { whatsAppUrl as buildWhatsAppUrl } from '../utils/whatsapp.js';

export default function useWhatsAppMessages() {
  const { t } = useTranslation();

  return {
    whatsAppUrl: (message) => buildWhatsAppUrl(message),
    consultMessage: (service, destination) =>
      destination
        ? t('whatsapp.consultWithDestination', { service, destination })
        : t('whatsapp.consult', { service }),
    reserveMessage: (service) => t('whatsapp.reserve', { service }),
    contactMessage: () => t('whatsapp.contact'),
  };
}
