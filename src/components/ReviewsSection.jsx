import { useTranslation } from 'react-i18next';
import {
  GOOGLE_REVIEW_URL,
  GOOGLE_REVIEWS_LIST_URL,
  testimonials,
} from '../data/testimonials.js';

function Stars({ value, size = 'md' }) {
  return (
    <span className={`reviews-stars reviews-stars--${size}`} aria-hidden="true">
      {'★'.repeat(value)}
      <span className="reviews-stars__empty">{'★'.repeat(Math.max(0, 5 - value))}</span>
    </span>
  );
}

export default function ReviewsSection() {
  const { t } = useTranslation();
  const hasReviews = testimonials.length > 0;

  return (
    <section id="opiniones" className="section reviews-section">
      <h2 className="section-title">{t('reviews.title')}</h2>
      <p className="reviews-lead">{t('reviews.lead')}</p>

      {hasReviews ? (
        <>
          <ul className="reviews-list">
            {testimonials.map((item) => (
              <li key={item.id} className="reviews-card">
                <div className="reviews-card__top">
                  <Stars value={item.rating} />
                  <span className="reviews-card__source">{t('reviews.fromGoogle')}</span>
                </div>
                {item.text ? <p className="reviews-card__text">“{item.text}”</p> : null}
                <p className="reviews-card__author">— {item.name}</p>
              </li>
            ))}
          </ul>
          <p className="reviews-more">
            <a href={GOOGLE_REVIEWS_LIST_URL} target="_blank" rel="noopener noreferrer">
              {t('reviews.seeOnGoogle')}
            </a>
          </p>
        </>
      ) : (
        <div className="reviews-placeholder">
          <Stars value={5} size="lg" />
          <p className="reviews-placeholder__text">{t('reviews.empty')}</p>
        </div>
      )}

      <div className="reviews-actions">
        <a
          href={GOOGLE_REVIEW_URL}
          className="reviews-btn reviews-btn--google"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('reviews.googleCta')}
        </a>
      </div>
    </section>
  );
}
