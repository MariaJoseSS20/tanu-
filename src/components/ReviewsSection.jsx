import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  GOOGLE_REVIEW_URL,
  GOOGLE_REVIEWS_LIST_URL,
  TRUSTINDEX_WIDGET_ID,
} from '../data/testimonials.js';

const TRUSTINDEX_SCRIPT_SRC = `https://cdn.trustindex.io/loader.js?${TRUSTINDEX_WIDGET_ID}`;

export default function ReviewsSection() {
  const { t } = useTranslation();

  useEffect(() => {
    const existing = document.querySelector(`script[src="${TRUSTINDEX_SCRIPT_SRC}"]`);
    if (existing) return undefined;

    const script = document.createElement('script');
    script.src = TRUSTINDEX_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return undefined;
  }, []);

  return (
    <section id="opiniones" className="section reviews-section">
      <h2 className="section-title">{t('reviews.title')}</h2>
      <p className="reviews-lead">{t('reviews.lead')}</p>

      <div className="reviews-widget" aria-live="polite">
        {/* Trustindex inyecta aquí el widget de reseñas de Google */}
      </div>

      <div className="reviews-actions">
        <a
          href={GOOGLE_REVIEW_URL}
          className="reviews-btn reviews-btn--google"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('reviews.googleCta')}
        </a>
        <a
          href={GOOGLE_REVIEWS_LIST_URL}
          className="reviews-btn reviews-btn--form"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('reviews.seeOnGoogle')}
        </a>
      </div>
    </section>
  );
}
