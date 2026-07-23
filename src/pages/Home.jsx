import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import SiteNavbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import TourVideo from '../components/TourVideo.jsx';
import GalleryAlbum from '../components/GalleryAlbum.jsx';
import ServiceCarouselPreview from '../components/ServiceCarouselPreview.jsx';
import ContactSection from '../components/ContactSection.jsx';
import DestinationsModal from '../components/modals/DestinationsModal.jsx';
import { galleryImages } from '../data/galleryImages.js';
import { outOfCityDestinations } from '../data/outOfCityDestinations.js';
import { toursPorvenirDestinations } from '../data/toursPorvenirDestinations.js';
import { toursPinguinerasDestinations } from '../data/toursPinguinerasDestinations.js';
import { transporteDestinations } from '../data/transporteDestinations.js';
import useLocalizedDestinations from '../hooks/useLocalizedDestinations.js';
import useLocalizedGallery from '../hooks/useLocalizedGallery.js';
import useWhatsAppMessages from '../hooks/useWhatsAppMessages.js';

export default function Home() {
  const location = useLocation();
  const { t } = useTranslation();
  const whatsApp = useWhatsAppMessages();
  const [showOutOfCityModal, setShowOutOfCityModal] = useState(false);
  const [showToursPorvenirModal, setShowToursPorvenirModal] = useState(false);
  const [showToursPinguinerasModal, setShowToursPinguinerasModal] = useState(false);
  const [showTransporteModal, setShowTransporteModal] = useState(false);

  const transporte = useLocalizedDestinations(transporteDestinations, 'transporte');
  const pinguineras = useLocalizedDestinations(toursPinguinerasDestinations, 'pinguineras');
  const porvenir = useLocalizedDestinations(toursPorvenirDestinations, 'porvenir');
  const outOfCity = useLocalizedDestinations(outOfCityDestinations, 'outOfCity');
  const gallery = useLocalizedGallery(galleryImages);

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <>
      <header className="hero">
        <SiteNavbar activePage="home" />
        <div className="hero-content">
          <h1>
            <Trans i18nKey="hero.title" components={{ 1: <span className="highlight" /> }} />
          </h1>
          <p>{t('hero.subtitle')}</p>
          <a href="#tours" className="cta-button">
            {t('hero.cta')}
          </a>
        </div>
      </header>

      <section id="servicios" className="section">
        <h2 className="section-title">{t('services.title')}</h2>
        <div className="grid-container">
          <div className="service-card service-card--carousel">
            <ServiceCarouselPreview destinations={transporte} showControls />
            <h3>{t('services.transport')}</h3>
            <button
              type="button"
              className="tour-link border-0 bg-transparent"
              onClick={() => setShowTransporteModal(true)}
            >
              {t('services.viewDetails')}
            </button>
          </div>
          <div className="service-card service-card--carousel">
            <ServiceCarouselPreview destinations={pinguineras} hideCaptions showControls />
            <h3>{t('services.pinguineras')}</h3>
            <button
              type="button"
              className="tour-link border-0 bg-transparent"
              onClick={() => setShowToursPinguinerasModal(true)}
            >
              {t('services.viewDetails')}
            </button>
          </div>
          <div className="service-card service-card--carousel">
            <ServiceCarouselPreview destinations={porvenir} showControls />
            <h3>{t('services.porvenir')}</h3>
            <button
              type="button"
              className="tour-link border-0 bg-transparent"
              onClick={() => setShowToursPorvenirModal(true)}
            >
              {t('services.viewDetails')}
            </button>
          </div>
          <div className="service-card service-card--carousel">
            <ServiceCarouselPreview destinations={outOfCity} showControls />
            <h3>{t('services.outOfCity')}</h3>
            <button
              type="button"
              className="tour-link border-0 bg-transparent"
              onClick={() => setShowOutOfCityModal(true)}
            >
              {t('services.viewDetails')}
            </button>
          </div>
        </div>
      </section>

      <section id="tours" className="section">
        <h2 className="section-title">{t('toursSection.title')}</h2>
        <div className="tour-grid">
          <div className="tour-card">
            <TourVideo poster="/images/services/tours-porvenir/museo.jpg" src="/videos/museo.mp4" />
            <h3 className="tour-title-museum">
              <span className="tour-title-name">{t('toursSection.museumLine1')}</span>
              <span className="tour-title-name">{t('toursSection.museumLine2')}</span>
            </h3>
          </div>
          <div className="tour-card">
            <TourVideo
              poster="/images/services/tours-porvenir/mirador_hain.jpg"
              src="/videos/mirador_hain.mp4"
            />
            <h3 className="tour-title-museum">
              <span className="tour-title-name">{t('toursSection.hainLine1')}</span>
              <span className="tour-title-name">{t('toursSection.hainLine2')}</span>
            </h3>
          </div>
          <div className="tour-card">
            <TourVideo
              poster="/images/services/tours-pinguineras/fondo.jpeg"
              src="/videos/pinguinos.mp4"
            />
            <h3 className="tour-title-museum">
              <span className="tour-title-name">{t('toursSection.penguinPark')}</span>
            </h3>
          </div>
          <div className="tour-card">
            <TourVideo
              poster="/images/services/tours-porvenir/entrada_estromatolitos.jpg"
              src="/videos/estromatolitos.mp4"
            />
            <h3 className="tour-title-museum">
              <span className="tour-title-name">{t('toursSection.stromatolitesLine1')}</span>
              <span className="tour-title-name">{t('toursSection.stromatolitesLine2')}</span>
            </h3>
          </div>
          <div className="tour-card">
            <TourVideo
              poster="/images/services/tours-porvenir/barcaza.jpg"
              src="/videos/barcaza.mp4"
            />
            <h3 className="tour-title-museum">
              <span className="tour-title-name">{t('toursSection.ferryLine1')}</span>
              <span className="tour-title-name">{t('toursSection.ferryLine2')}</span>
            </h3>
          </div>
          <div className="tour-card">
            <TourVideo
              poster="/images/services/tours-porvenir/plaza_selknam.jpg"
              src="/videos/plaza_selknam.mp4"
            />
            <h3 className="tour-title-museum">
              <span className="tour-title-name">{t('toursSection.plazaLine1')}</span>
              <span className="tour-title-name">{t('toursSection.plazaLine2')}</span>
            </h3>
          </div>
        </div>
      </section>

      <section id="transporte" className="section">
        <h2 className="section-title">{t('transportSection.title')}</h2>
        <div className="transport-container">
          <div className="transport-option">
            <h3>{t('transportSection.privateTitle')}</h3>
            <p>{t('transportSection.privateDesc')}</p>
            <a
              href={whatsApp.whatsAppUrl(whatsApp.reserveMessage(t('transportSection.privateTitle')))}
              className="cta-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('transportSection.book')}
            </a>
          </div>
          <div className="transport-option">
            <h3>{t('transportSection.sharedTitle')}</h3>
            <p>{t('transportSection.sharedDesc')}</p>
            <a
              href={whatsApp.whatsAppUrl(whatsApp.reserveMessage(t('transportSection.sharedTitle')))}
              className="cta-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('transportSection.book')}
            </a>
          </div>
        </div>
      </section>

      <section id="galeria" className="section">
        <h2 className="section-title">{t('gallerySection.title')}</h2>
        <div className="gallery-album-container">
          <GalleryAlbum images={gallery} />
        </div>
      </section>

      <section id="quienes-somos" className="section about-section">
        <h2 className="section-title">{t('about.title')}</h2>
        <div className="about-layout">
          <div className="about-media">
            <img
              src="/images/logo/tanu-agencia.png"
              alt="Tänu Agencia de Viaje y Turismo"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="about-copy">
            <p className="about-lead">{t('about.lead')}</p>
            <p>{t('about.body')}</p>
          </div>
        </div>
      </section>

      <ContactSection />

      <Footer />

      <DestinationsModal
        show={showTransporteModal}
        onHide={() => setShowTransporteModal(false)}
        title={t('services.transport')}
        destinations={transporte}
      />
      <DestinationsModal
        show={showToursPinguinerasModal}
        onHide={() => setShowToursPinguinerasModal(false)}
        title={t('services.pinguineras')}
        destinations={pinguineras}
        hideTabs
      />
      <DestinationsModal
        show={showToursPorvenirModal}
        onHide={() => setShowToursPorvenirModal(false)}
        title={t('services.porvenir')}
        destinations={porvenir}
      />
      <DestinationsModal
        show={showOutOfCityModal}
        onHide={() => setShowOutOfCityModal(false)}
        title={t('services.outOfCity')}
        destinations={outOfCity}
      />
    </>
  );
}
