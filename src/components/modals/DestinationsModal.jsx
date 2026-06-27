import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import useWhatsAppMessages from '../../hooks/useWhatsAppMessages.js';

export default function DestinationsModal({ show, onHide, title, destinations, hideTabs = false }) {
  const { t } = useTranslation();
  const whatsApp = useWhatsAppMessages();
  const [activeIndex, setActiveIndex] = useState(0);
  const destination = destinations[activeIndex];

  const handleHide = () => {
    setActiveIndex(0);
    onHide();
  };

  const goToPrevious = () => {
    setActiveIndex((index) => (index === 0 ? destinations.length - 1 : index - 1));
  };

  const goToNext = () => {
    setActiveIndex((index) => (index === destinations.length - 1 ? 0 : index + 1));
  };

  const hasGallery = destinations.length > 1;

  if (!destination) return null;

  const hasSideContent = destination.highlights?.length > 0;
  const isSoloWithDetails = destinations.length === 1 && hasSideContent;
  const consultTarget = hideTabs ? null : destination.name;

  return (
    <Modal show={show} onHide={handleHide} size="lg" centered className="out-of-city-modal">
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body className="pt-3">
        {destinations.length > 1 && !hideTabs && (
          <div className="out-of-city-tabs" role="tablist">
            {destinations.map((item, index) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={activeIndex === index}
                className={`out-of-city-tab${activeIndex === index ? ' active' : ''}`}
                onClick={() => setActiveIndex(index)}
              >
                {item.name}
              </button>
            ))}
          </div>
        )}

        <div
          className={`out-of-city-featured${
            isSoloWithDetails ? ' out-of-city-featured--split' : ' out-of-city-featured--solo'
          }`}
        >
          <div className="out-of-city-featured-image">
            <img src={destination.image} alt={destination.name} />
            {hasGallery && (
              <>
                <button
                  type="button"
                  className="out-of-city-featured-nav out-of-city-featured-nav--prev"
                  onClick={goToPrevious}
                  aria-label={t('modal.prevPhoto')}
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="out-of-city-featured-nav out-of-city-featured-nav--next"
                  onClick={goToNext}
                  aria-label={t('modal.nextPhoto')}
                >
                  ›
                </button>
                <span className="out-of-city-featured-counter">
                  {t('modal.photoCounter', {
                    current: activeIndex + 1,
                    total: destinations.length,
                  })}
                </span>
              </>
            )}
            {!hideTabs && (
              <div className="out-of-city-featured-overlay">
                <h4>{destination.name}</h4>
              </div>
            )}
          </div>
          {hasSideContent ? (
            <div className="out-of-city-featured-content">
              <ul className="out-of-city-highlights">
                {destination.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : (
            destination.description && (
              <p className="out-of-city-brief">{destination.description}</p>
            )
          )}
        </div>

        {destinations.length > 1 && (
          <div className="out-of-city-grid">
            {destinations.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={`out-of-city-mini-card${activeIndex === index ? ' active' : ''}`}
                onClick={() => setActiveIndex(index)}
              >
                <img src={item.image} alt={item.name} />
                {!hideTabs && <span>{item.name}</span>}
              </button>
            ))}
          </div>
        )}
      </Modal.Body>

      <Modal.Footer className="border-0 pt-0">
        <Button variant="secondary" onClick={handleHide}>
          {t('modal.close')}
        </Button>
        <Button
          variant="primary"
          className="out-of-city-cta"
          as="a"
          href={whatsApp.whatsAppUrl(
            consultTarget
              ? whatsApp.consultMessage(title, consultTarget)
              : whatsApp.consultMessage(title)
          )}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('modal.consult')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
