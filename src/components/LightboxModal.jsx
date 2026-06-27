import { useTranslation } from 'react-i18next';
import Modal from 'react-bootstrap/Modal';

export default function LightboxModal({ show, onHide, image }) {
  const { t } = useTranslation();

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="lg"
      className="lightbox-modal"
      contentClassName="bg-transparent border-0"
    >
      <Modal.Body className="p-0 position-relative">
        <button
          type="button"
          className="btn-close btn-close-white position-absolute top-0 end-0 m-3"
          aria-label={t('lightbox.close')}
          onClick={onHide}
          style={{ zIndex: 1051 }}
        />
        {image && (
          <img src={image.full} alt={image.alt} className="img-fluid rounded" />
        )}
      </Modal.Body>
    </Modal>
  );
}
