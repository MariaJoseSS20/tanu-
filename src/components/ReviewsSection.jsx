import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  GOOGLE_REVIEW_URL,
  GOOGLE_REVIEWS_LIST_URL,
  TRUSTINDEX_WIDGET_ID,
} from '../data/testimonials.js';

const TRUSTINDEX_SCRIPT_SRC = `https://cdn.trustindex.io/loader.js?${TRUSTINDEX_WIDGET_ID}`;

function isTrustindexNode(node) {
  if (!(node instanceof Element)) return false;
  const className = typeof node.className === 'string' ? node.className : '';
  if (className.includes('ti-widget') || className.includes('ti-reviews')) return true;
  if (node.id?.includes('ti-')) return true;
  if (node.matches?.('iframe[src*="trustindex"]')) return true;
  return false;
}

export default function ReviewsSection() {
  const { t } = useTranslation();
  const widgetRef = useRef(null);

  useEffect(() => {
    const container = widgetRef.current;
    if (!container) return undefined;

    const relocateWidgets = () => {
      document.querySelectorAll('[class*="ti-widget"], [class*="ti-reviews"], iframe[src*="trustindex"]').forEach((node) => {
        if (isTrustindexNode(node) && !container.contains(node)) {
          container.appendChild(node);
        }
      });
    };

    document.querySelectorAll(`script[src*="cdn.trustindex.io/loader.js"]`).forEach((node) => {
      if (!container.contains(node)) node.remove();
    });

    if (!container.querySelector('script[data-tanu-trustindex]')) {
      const script = document.createElement('script');
      script.src = TRUSTINDEX_SCRIPT_SRC;
      script.dataset.tanuTrustindex = '1';
      script.async = false;
      script.onload = relocateWidgets;
      container.appendChild(script);
    }

    relocateWidgets();
    const observer = new MutationObserver(relocateWidgets);
    observer.observe(document.body, { childList: true, subtree: true });

    const timeoutId = window.setTimeout(relocateWidgets, 1500);

    return () => {
      observer.disconnect();
      window.clearTimeout(timeoutId);
    };
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
