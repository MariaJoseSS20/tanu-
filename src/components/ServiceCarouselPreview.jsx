import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

const DEFAULT_MAX_SLIDES = 5;

export default function ServiceCarouselPreview({
  destinations,
  hideCaptions = false,
  showControls = false,
  maxSlides = DEFAULT_MAX_SLIDES,
}) {
  const slides = destinations.slice(0, maxSlides);
  const [activeIndex, setActiveIndex] = useState(0);

  const shouldLoad = (index) => {
    if (index === activeIndex) return true;
    if (index === activeIndex + 1) return true;
    if (activeIndex === slides.length - 1 && index === 0) return true;
    return false;
  };

  return (
    <Carousel
      activeIndex={activeIndex}
      onSelect={setActiveIndex}
      interval={4000}
      controls={showControls}
      indicators
      pause="hover"
      className="service-preview-carousel"
      touch
    >
      {slides.map((destination, index) => (
        <Carousel.Item key={destination.id}>
          {shouldLoad(index) ? (
            <img
              src={destination.image}
              alt={destination.name}
              loading="lazy"
              decoding="async"
              fetchPriority="low"
            />
          ) : (
            <div className="service-preview-placeholder" aria-hidden="true" />
          )}
          {!hideCaptions && (
            <div className="service-preview-caption">
              <span>{destination.name}</span>
            </div>
          )}
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
