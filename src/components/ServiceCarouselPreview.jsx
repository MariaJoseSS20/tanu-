import { useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';

export default function ServiceCarouselPreview({ destinations, hideCaptions = false, showControls = false }) {
  useEffect(() => {
    destinations.forEach((destination) => {
      const img = new Image();
      img.src = destination.image;
    });
  }, [destinations]);

  return (
    <>
      <div className="service-carousel-preload" aria-hidden="true">
        {destinations.map((destination) => (
          <img key={`preload-${destination.id}`} src={destination.image} alt="" />
        ))}
      </div>

      <Carousel
        interval={4000}
        controls={showControls}
        indicators
        pause="hover"
        className="service-preview-carousel"
      >
        {destinations.map((destination) => (
          <Carousel.Item key={destination.id}>
            <img src={destination.image} alt={destination.name} loading="eager" decoding="async" />
            {!hideCaptions && (
              <div className="service-preview-caption">
                <span>{destination.name}</span>
              </div>
            )}
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
}
