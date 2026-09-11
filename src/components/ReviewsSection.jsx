import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  GOOGLE_REVIEW_URL,
  GOOGLE_REVIEWS_LIST_URL,
  TRUSTINDEX_WIDGET_ID,
} from '../data/testimonials.js';

const TRUSTINDEX_SCRIPT_SRC = `https://cdn.trustindex.io/loader.js?${TRUSTINDEX_WIDGET_ID}`;

export default function ReviewsSection() {
  const { t } = useTranslation();
  const widgetRef = useRef(null);

  useEffect(() => {
    const container = widgetRef.current;
    if (!container) return undefined;

    // Quitar scripts viejos pegados al body (quedaban junto al footer)
    document.querySelectorAll(`script[src*="cdn.trustindex.io/loader.js"]`).forEach((node) => {
      if (!container.contains(node)) node.remove();
    });

    if (container.querySelector('script[data-tanu-trustindex]')) return undefined;

    const script = document.createElement('script');
    script.src = TRUSTINDEX_SCRIPT_SRC;
    script.dataset.tanuTrustindex = '1';
    // Sin async: Trustindex usa document.currentScript para insertar el widget al lado del script
    container.appendChild(script);

    return undefined;
  }, []);

  return (
    <section id="opiniones" className="section reviews-section">
      <h2 className="section-title">{t('reviews.title')}</h2>
      <p className="reviews-lead">{t('reviews.lead')}</p>

      <div className="reviews-widget" ref={widgetRef} aria-live="polite" />

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
