import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export default function useLocalizedGallery(images) {
  const { t, i18n } = useTranslation();

  return useMemo(() => {
    if (i18n.language === 'es') return images;

    return images.map((image) => ({
      ...image,
      alt: t(`gallery.${image.id}`, { defaultValue: image.alt }),
    }));
  }, [images, t, i18n.language]);
}
