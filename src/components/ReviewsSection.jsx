import { useTranslation } from 'react-i18next';
import { GOOGLE_REVIEW_URL, testimonials } from '../data/testimonials.js';

function Stars({ value }) {
  return (
    <span className="reviews-stars" aria-hidden="true">
      {'★'.repeat(value)}
      <span className="reviews-stars__empty">{'★'.repeat(Math.max(0, 5 - value))}</span>
    </span>
  );
}

export default function ReviewsSection() {
  const { t } = useTranslation();

  return (
    <section id="opiniones" className="section reviews-section">
      <h2 className="section-title">{t('reviews.title')}</h2>
      <p className="reviews-lead">{t('reviews.lead')}</p>

      {testimonials.length > 0 ? (
        <ul className="reviews-list">
          {testimonials.map((item) => (
            <li key={item.id} className="reviews-item">
              <Stars value={item.rating} />
              <blockquote className="reviews-quote">
                {item.text ? <p>“{item.text}”</p> : null}
                <footer>
                  — {item.name}
                  {item.serviceKey ? (
                    <span className="reviews-service">
                      {' '}
                      · {t(`services.${item.serviceKey}`, { defaultValue: item.serviceKey })}
                    </span>
                  ) : null}
                </footer>
              </blockquote>
            </li>
          ))}
        </ul>
      ) : (
        <p className="reviews-empty">{t('reviews.empty')}</p>
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
        <a
          href={GOOGLE_REVIEW_URL}
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
