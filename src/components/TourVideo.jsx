import { useRef, useState } from 'react';

function PlayIcon() {
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="30" cy="30" r="30" fill="rgba(220, 38, 38, 0.8)" />
      <path d="M24 20L24 40L38 30L24 20Z" fill="white" />
    </svg>
  );
}

export default function TourVideo({ poster, src }) {
  const videoRef = useRef(null);
  const [showOverlay, setShowOverlay] = useState(true);
  const [activated, setActivated] = useState(false);

  const handlePlay = () => setShowOverlay(false);
  const handlePause = () => setShowOverlay(true);
  const handleEnded = () => setShowOverlay(true);

  const handleOverlayClick = (event) => {
    event.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (!activated) {
      setActivated(true);
      // Attach source on demand so the home page does not download every video.
      video.src = src;
      video.addEventListener(
        'loadeddata',
        () => {
          video.play().catch(() => {});
        },
        { once: true },
      );
      video.load();
      return;
    }

    video.play().catch(() => {});
  };

  return (
    <div className="video-container">
      <video
        ref={videoRef}
        className="tour-video"
        poster={poster}
        controls
        preload="none"
        muted
        playsInline
        onPlay={handlePlay}
        onPause={handlePause}
        onEnded={handleEnded}
      >
        Tu navegador no soporta el elemento de video.
      </video>
      {showOverlay && (
        <div
          className="play-overlay"
          onClick={handleOverlayClick}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              handleOverlayClick(event);
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="Reproducir video"
        >
          <PlayIcon />
        </div>
      )}
    </div>
  );
}
