import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export default function useLocalizedDestinations(destinations, category) {
  const { t, i18n } = useTranslation();

  return useMemo(() => {
    if (i18n.language === 'es') return destinations;

    return destinations.map((destination) => {
      const baseKey = `destinations.${category}.${destination.id}`;
      const localized = {
        ...destination,
        name: t(`${baseKey}.name`),
        description: destination.description ? t(`${baseKey}.description`) : destination.description,
      };

      if (destination.highlights) {
        localized.highlights = destination.highlights.map((_, index) =>
          t(`${baseKey}.highlights.${index}`)
        );
      }

      return localized;
    });
  }, [destinations, category, t, i18n.language]);
}
