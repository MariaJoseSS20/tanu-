import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FORMSPREE_ID,
  GOOGLE_REVIEW_URL,
  testimonials,
} from '../data/testimonials.js';

const SERVICE_KEYS = ['transport', 'pinguineras', 'porvenir', 'outOfCity', 'other'];
const FORMSPREE_ENDPOINT = `https://formspree.io/f/${FORMSPREE_ID}`;

function Stars({ value }) {
  return (
    <span className="reviews-stars" aria-hidden="true">
      {'★'.repeat(value)}
      <span className="reviews-stars__empty">{'★'.repeat(Math.max(0, 5 - value))}</span>
    </span>
  );
}

const emptyForm = {
  name: '',
  email: '',
  service: '',
  message: '',
};

const emptyErrors = {
  name: '',
  service: '',
  rating: '',
};

export default function ReviewsSection() {
  const { t } = useTranslation();
  const [showForm, setShowForm] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [rating, setRating] = useState(0);
  const [fields, setFields] = useState(emptyForm);
  const [errors, setErrors] = useState(emptyErrors);
  const [triedSubmit, setTriedSubmit] = useState(false);

  const validate = (nextFields = fields, nextRating = rating) => {
    const nextErrors = {
      name: nextFields.name.trim() ? '' : t('reviews.errorName'),
      service: nextFields.service.trim() ? '' : t('reviews.errorService'),
      rating: nextRating >= 1 ? '' : t('reviews.errorRating'),
    };
    setErrors(nextErrors);
    return !nextErrors.name && !nextErrors.service && !nextErrors.rating;
  };

  const updateField = (key) => (event) => {
    const value = event.target.value;
    const nextFields = { ...fields, [key]: value };
    setFields(nextFields);
    if (status === 'success' || status === 'error') setStatus('idle');
    if (triedSubmit) validate(nextFields, rating);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setTriedSubmit(true);

    if (!validate()) return;

    const data = new FormData();
    data.set('name', fields.name.trim());
    data.set('email', fields.email.trim());
    data.set('service', fields.service.trim());
    data.set('message', fields.message.trim());
    data.set('rating', String(rating));
    data.set('_subject', t('reviews.emailSubject'));

    setStatus('sending');

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error('formspree_error');

      setStatus('success');
      setFields(emptyForm);
      setRating(0);
      setErrors(emptyErrors);
      setTriedSubmit(false);
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="opiniones" className="section reviews-section">
      <h2 className="section-title">{t('reviews.title')}</h2>
      <p className="reviews-lead">{t('reviews.lead')}</p>

      {testimonials.length > 0 && (
        <ul className="reviews-list">
          {testimonials.map((item) => (
            <li key={item.id} className="reviews-item">
              <Stars value={item.rating} />
              <blockquote className="reviews-quote">
                <p>“{item.text}”</p>
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
        <button
          type="button"
          className="reviews-btn reviews-btn--form"
          onClick={() => setShowForm((open) => !open)}
          aria-expanded={showForm}
        >
          {showForm ? t('reviews.hideForm') : t('reviews.formCta')}
        </button>
      </div>

      {showForm && (
        <form className="reviews-form" onSubmit={handleSubmit} noValidate>
          <p className="reviews-form-note">{t('reviews.formNote')}</p>

          <label className={`reviews-field${errors.name ? ' reviews-field--invalid' : ''}`}>
            <span>{t('reviews.name')} *</span>
            <input
              name="name"
              type="text"
              autoComplete="name"
              maxLength={80}
              value={fields.name}
              onChange={updateField('name')}
              aria-invalid={Boolean(errors.name)}
            />
            {errors.name ? <span className="reviews-field-error">{errors.name}</span> : null}
          </label>

          <label className="reviews-field">
            <span>{t('reviews.email')}</span>
            <input
              name="email"
              type="email"
              autoComplete="email"
              maxLength={120}
              value={fields.email}
              onChange={updateField('email')}
            />
          </label>

          <label className={`reviews-field${errors.service ? ' reviews-field--invalid' : ''}`}>
            <span>{t('reviews.service')} *</span>
            <select name="service" value={fields.service} onChange={updateField('service')} aria-invalid={Boolean(errors.service)}>
              <option value="" disabled>
                {t('reviews.servicePlaceholder')}
              </option>
              {SERVICE_KEYS.map((key) => (
                <option key={key} value={t(`reviews.services.${key}`)}>
                  {t(`reviews.services.${key}`)}
                </option>
              ))}
            </select>
            {errors.service ? <span className="reviews-field-error">{errors.service}</span> : null}
          </label>

          <fieldset className={`reviews-field reviews-rating${errors.rating ? ' reviews-field--invalid' : ''}`}>
            <legend>{t('reviews.rating')} *</legend>
            <div className="reviews-rating__options" role="group" aria-label={t('reviews.rating')}>
              {[5, 4, 3, 2, 1].map((value) => (
                <button
                  key={value}
                  type="button"
                  className={`reviews-rating__btn${rating === value ? ' active' : ''}`}
                  onClick={() => {
                    setRating(value);
                    if (status === 'success' || status === 'error') setStatus('idle');
                    if (triedSubmit) validate(fields, value);
                  }}
                  aria-pressed={rating === value}
                  aria-label={t('reviews.ratingValue', { count: value })}
                >
                  {'★'.repeat(value)}
                </button>
              ))}
            </div>
            {errors.rating ? <span className="reviews-field-error">{errors.rating}</span> : null}
          </fieldset>

          <label className="reviews-field">
            <span>{t('reviews.message')}</span>
            <textarea
              name="message"
              rows={4}
              maxLength={800}
              value={fields.message}
              onChange={updateField('message')}
            />
          </label>

          <button type="submit" className="reviews-btn reviews-btn--submit" disabled={status === 'sending'}>
            {status === 'sending' ? t('reviews.sending') : t('reviews.submit')}
          </button>

          {status === 'success' && <p className="reviews-feedback reviews-feedback--ok">{t('reviews.success')}</p>}
          {status === 'error' && <p className="reviews-feedback reviews-feedback--err">{t('reviews.error')}</p>}
        </form>
      )}
    </section>
  );
}
