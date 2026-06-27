import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import LightboxModal from './LightboxModal.jsx';

function getRotation(index) {
  const seed = (index * 9301 + 49297) % 233280;
  return ((seed / 233280) * 6 - 3).toFixed(1);
}

export default function GalleryAlbum({ images, photosPerPage = null }) {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const paginated = photosPerPage !== null;
  const totalPages = paginated ? Math.ceil(images.length / photosPerPage) : 1;

  const visibleImages = useMemo(() => {
    if (!paginated) return images;

    const startIndex = (currentPage - 1) * photosPerPage;
    return images.slice(startIndex, startIndex + photosPerPage);
  }, [images, currentPage, paginated, photosPerPage]);

  const changePage = (direction) => {
    const newPage = currentPage + direction;
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getGlobalIndex = (localIndex) => {
    if (!paginated) return localIndex;
    return (currentPage - 1) * photosPerPage + localIndex;
  };

  return (
    <>
      <div className="gallery-album-grid">
        {visibleImages.map((photo, index) => {
          const globalIndex = getGlobalIndex(index);

          return (
            <div
              key={`${photo.id}-${globalIndex}`}
              className="photo-frame"
              style={{ '--rotation': `${getRotation(globalIndex)}deg` }}
              onClick={() => setLightboxIndex(globalIndex)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  setLightboxIndex(globalIndex);
                }
              }}
              role="button"
              tabIndex={0}
            >
              <div className="photo-matte">
                <img src={photo.thumb} alt={photo.alt} loading="lazy" />
              </div>
            </div>
          );
        })}
      </div>

      {paginated && (
        <div className="gallery-pagination">
          <button
            type="button"
            className="pagination-btn"
            onClick={() => changePage(-1)}
            disabled={currentPage === 1}
          >
            {t('gallerySection.prev')}
          </button>
          <span className="page-info">
            {t('gallerySection.page', { current: currentPage, total: totalPages })}
          </span>
          <button
            type="button"
            className="pagination-btn"
            onClick={() => changePage(1)}
            disabled={currentPage === totalPages}
          >
            {t('gallerySection.next')}
          </button>
        </div>
      )}

      <LightboxModal
        show={lightboxIndex !== null}
        onHide={() => setLightboxIndex(null)}
        image={lightboxIndex !== null ? images[lightboxIndex] : null}
      />
    </>
  );
}
