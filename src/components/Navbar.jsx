import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import LanguageSwitcher from './LanguageSwitcher.jsx';

export default function SiteNavbar({ activePage = 'home' }) {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const navClassName = [
    'navbar',
    'navbar-expand-lg',
    'fixed-top',
    scrolled ? 'scrolled navbar-light' : 'navbar-dark bg-transparent',
  ].join(' ');

  const sectionLink = (hash, label, active = false) => {
    const className = `nav-link${active ? ' active' : ''}`;

    if (isHome) {
      return (
        <Nav.Link as="a" href={hash} className={className}>
          {label}
        </Nav.Link>
      );
    }

    return (
      <Nav.Link as={Link} to={`/${hash}`} className={className}>
        {label}
      </Nav.Link>
    );
  };

  return (
    <Navbar expand="lg" className={navClassName} data-bs-theme={scrolled ? 'light' : 'dark'}>
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <img src="/images/logo/tanu.png" alt="Tänu" height="60" width="90" decoding="async" />
        </Navbar.Brand>

        <div className="navbar-mobile-tools d-flex d-lg-none align-items-center ms-auto gap-2">
          <LanguageSwitcher scrolled={scrolled} showLabels />
          <Navbar.Toggle aria-controls="navbarNav" className="border-0" />
        </div>

        <Navbar.Collapse id="navbarNav" className="justify-content-end">
          <Nav className="gap-3 align-items-lg-center">
            <Nav.Item>{sectionLink('#servicios', t('nav.services'))}</Nav.Item>
            <Nav.Item>{sectionLink('#tours', t('nav.tours'))}</Nav.Item>
            <Nav.Item>{sectionLink('#transporte', t('nav.transport'))}</Nav.Item>
            <Nav.Item>{sectionLink('#galeria', t('nav.gallery'))}</Nav.Item>
            <Nav.Item>{sectionLink('#quienes-somos', t('nav.about'))}</Nav.Item>
            <Nav.Item>{sectionLink('#contacto', t('nav.contact'))}</Nav.Item>
            <Nav.Item className="d-none d-lg-block">
              <LanguageSwitcher scrolled={scrolled} showLabels />
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
