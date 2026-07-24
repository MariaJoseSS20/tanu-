import { useTranslation } from 'react-i18next';

function ChileFlagIcon() {
  return (
    <svg viewBox="0 0 24 16" aria-hidden="true" focusable="false" className="language-switcher__flag">
      <rect width="24" height="8" fill="#D52B1E" />
      <rect y="8" width="24" height="8" fill="#FFFFFF" />
      <rect width="8" height="8" fill="#0039A6" />
      <polygon
        fill="#FFFFFF"
        points="4,1.8 4.55,3.45 6.35,3.45 4.9,4.5 5.45,6.15 4,5.1 2.55,6.15 3.1,4.5 1.65,3.45 3.45,3.45"
      />
    </svg>
  );
}

function UsFlagIcon() {
  return (
    <svg viewBox="0 0 24 16" aria-hidden="true" focusable="false" className="language-switcher__flag">
      <rect width="24" height="16" fill="#B22234" />
      <rect y="1.23" width="24" height="1.23" fill="#FFFFFF" />
      <rect y="3.69" width="24" height="1.23" fill="#FFFFFF" />
      <rect y="6.15" width="24" height="1.23" fill="#FFFFFF" />
      <rect y="8.62" width="24" height="1.23" fill="#FFFFFF" />
      <rect y="11.08" width="24" height="1.23" fill="#FFFFFF" />
      <rect y="13.54" width="24" height="1.23" fill="#FFFFFF" />
      <rect width="10" height="8.62" fill="#3C3B6E" />
      <circle cx="1.6" cy="1.4" r="0.45" fill="#FFFFFF" />
      <circle cx="3.4" cy="1.4" r="0.45" fill="#FFFFFF" />
      <circle cx="5.2" cy="1.4" r="0.45" fill="#FFFFFF" />
      <circle cx="7" cy="1.4" r="0.45" fill="#FFFFFF" />
      <circle cx="8.8" cy="1.4" r="0.45" fill="#FFFFFF" />
      <circle cx="2.5" cy="2.8" r="0.45" fill="#FFFFFF" />
      <circle cx="4.3" cy="2.8" r="0.45" fill="#FFFFFF" />
      <circle cx="6.1" cy="2.8" r="0.45" fill="#FFFFFF" />
      <circle cx="7.9" cy="2.8" r="0.45" fill="#FFFFFF" />
      <circle cx="1.6" cy="4.2" r="0.45" fill="#FFFFFF" />
      <circle cx="3.4" cy="4.2" r="0.45" fill="#FFFFFF" />
      <circle cx="5.2" cy="4.2" r="0.45" fill="#FFFFFF" />
      <circle cx="7" cy="4.2" r="0.45" fill="#FFFFFF" />
      <circle cx="8.8" cy="4.2" r="0.45" fill="#FFFFFF" />
      <circle cx="2.5" cy="5.6" r="0.45" fill="#FFFFFF" />
      <circle cx="4.3" cy="5.6" r="0.45" fill="#FFFFFF" />
      <circle cx="6.1" cy="5.6" r="0.45" fill="#FFFFFF" />
      <circle cx="7.9" cy="5.6" r="0.45" fill="#FFFFFF" />
      <circle cx="1.6" cy="7" r="0.45" fill="#FFFFFF" />
      <circle cx="3.4" cy="7" r="0.45" fill="#FFFFFF" />
      <circle cx="5.2" cy="7" r="0.45" fill="#FFFFFF" />
      <circle cx="7" cy="7" r="0.45" fill="#FFFFFF" />
      <circle cx="8.8" cy="7" r="0.45" fill="#FFFFFF" />
    </svg>
  );
}

export default function LanguageSwitcher({ scrolled = false, showLabels = false }) {
  const { i18n, t } = useTranslation();
  const current = i18n.language?.startsWith('en') ? 'en' : 'es';

  const setLanguage = (language) => {
    if (language !== current) i18n.changeLanguage(language);
  };

  return (
    <div
      className={`language-switcher${scrolled ? ' language-switcher--light' : ''}${showLabels ? ' language-switcher--labels' : ''}`}
      role="group"
      aria-label={t('language.label')}
    >
      <button
        type="button"
        className={`language-switcher__btn${current === 'es' ? ' active' : ''}`}
        onClick={() => setLanguage('es')}
        aria-pressed={current === 'es'}
        aria-label={t('language.es')}
        title={t('language.es')}
      >
        <ChileFlagIcon />
        {showLabels && <span className="language-switcher__code">ES</span>}
      </button>
      <button
        type="button"
        className={`language-switcher__btn${current === 'en' ? ' active' : ''}`}
        onClick={() => setLanguage('en')}
        aria-pressed={current === 'en'}
        aria-label={t('language.en')}
        title={t('language.en')}
      >
        <UsFlagIcon />
        {showLabels && <span className="language-switcher__code">EN</span>}
      </button>
    </div>
  );
}
