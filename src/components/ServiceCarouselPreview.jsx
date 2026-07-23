import Carousel from 'react-bootstrap/Carousel';

const DEFAULT_MAX_SLIDES = 8;

export default function ServiceCarouselPreview({
  destinations,
  hideCaptions = false,
  showControls = false,
  maxSlides = DEFAULT_MAX_SLIDES,
}) {
  const slides = destinations.slice(0, maxSlides);

  return (
    <Carousel
      interval={4000}
      controls={showControls}
      indicators
      pause="hover"
      className="service-preview-carousel"
    >
      {slides.map((destination, index) => (
        <Carousel.Item key={destination.id}>
          <img
            src={destination.image}
            alt={destination.name}
            loading={index === 0 ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={index === 0 ? 'low' : undefined}
          />
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
