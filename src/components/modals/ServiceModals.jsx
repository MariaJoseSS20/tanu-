import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';

function ServiceCarousel({ id, images }) {
  return (
    <Carousel id={id} className="mb-3">
      {images.map((image) => (
        <Carousel.Item key={image.alt}>
          <img src={image.src} className="d-block w-100 rounded" alt={image.alt} />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export function ToursModal({ show, onHide }) {
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>🏔️ Tours del Día</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-6">
            <ServiceCarousel
              id="toursCarousel"
              images={[
                { src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80', alt: 'Tours en Tierra del Fuego' },
                { src: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=600&q=80', alt: 'Paisajes de Tierra del Fuego' },
                { src: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80', alt: 'Excursiones' },
              ]}
            />
          </div>
          <div className="col-md-6">
            <h6 style={{ color: 'var(--primary-color)' }}>Descripción:</h6>
            <p>
              Descubre los lugares más icónicos de Porvenir y Tierra del Fuego en un tour completo de día.
              Visita los sitios históricos, paisajes únicos y puntos de interés más importantes de la región.
            </p>
            <h6 style={{ color: 'var(--primary-color)' }} className="mt-3">
              Incluye:
            </h6>
            <ul className="list-unstyled">
              <li>✅ Transporte cómodo todo el día</li>
              <li>✅ Guía local especializado</li>
              <li>✅ Visita a sitios históricos</li>
              <li>✅ Almuerzo típico regional</li>
              <li>✅ Entradas a museos y sitios</li>
            </ul>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-4">
            <h6 style={{ color: 'var(--primary-color)' }}>Duración:</h6>
            <p><strong>8 horas completas</strong></p>
          </div>
          <div className="col-md-4">
            <h6 style={{ color: 'var(--primary-color)' }}>Horarios:</h6>
            <p><strong>9:00 AM - 5:00 PM</strong></p>
          </div>
          <div className="col-md-4">
            <h6 style={{ color: 'var(--primary-color)' }}>Precio:</h6>
            <p><strong>$65.000 CLP</strong><br /><small>por persona</small></p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cerrar</Button>
        <Button variant="primary">Reservar Ahora</Button>
      </Modal.Footer>
    </Modal>
  );
}

export function TransporteModal({ show, onHide }) {
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>🚗 Servicios de Transporte</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-6">
            <ServiceCarousel
              id="transporteCarousel"
              images={[
                { src: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80', alt: 'Transporte en Tierra del Fuego' },
                { src: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80', alt: 'Vehículos de transporte' },
                { src: 'https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?auto=format&fit=crop&w=600&q=80', alt: 'Servicio de taxi' },
              ]}
            />
          </div>
          <div className="col-md-6">
            <h6 style={{ color: 'var(--primary-color)' }}>Descripción:</h6>
            <p>
              Servicios de transporte seguros y cómodos para todos tus desplazamientos en Tierra del Fuego.
              Desde traslados al aeropuerto hasta excursiones personalizadas.
            </p>
            <h6 style={{ color: 'var(--primary-color)' }}>Servicios disponibles:</h6>
            <ul className="list-unstyled">
              <li>🚗 Traslados Aeropuerto - Porvenir</li>
              <li>🚗 Traslados Porvenir - Ushuaia</li>
              <li>🚗 Transporte para tours</li>
              <li>🚗 Servicio de taxi privado</li>
              <li>🚗 Alquiler de vehículos</li>
            </ul>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-4">
            <h6 style={{ color: 'var(--primary-color)' }}>Aeropuerto:</h6>
            <p><strong>$25.000 CLP</strong><br /><small>por trayecto</small></p>
          </div>
          <div className="col-md-4">
            <h6 style={{ color: 'var(--primary-color)' }}>Ushuaia:</h6>
            <p><strong>$40.000 CLP</strong><br /><small>por trayecto</small></p>
          </div>
          <div className="col-md-4">
            <h6 style={{ color: 'var(--primary-color)' }}>Taxi Local:</h6>
            <p><strong>$3.000 CLP</strong><br /><small>por km</small></p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cerrar</Button>
        <Button variant="primary">Reservar Ahora</Button>
      </Modal.Footer>
    </Modal>
  );
}

export function PinguinerasModal({ show, onHide }) {
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>🐧 Tours a Pingüineras</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-6">
            <ServiceCarousel
              id="pinguinerasCarousel"
              images={[
                { src: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=600&q=80', alt: 'Pingüinos en Tierra del Fuego' },
                { src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=600&q=80', alt: 'Colonia de pingüinos' },
                { src: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80', alt: 'Pingüinos caminando' },
              ]}
            />
          </div>
          <div className="col-md-6">
            <h6 style={{ color: 'var(--primary-color)' }}>Descripción:</h6>
            <p>
              Visita las colonias de pingüinos más importantes de Tierra del Fuego. Observa de cerca a estas
              fascinantes aves en su hábitat natural y aprende sobre su comportamiento y conservación.
            </p>
            <h6 style={{ color: 'var(--primary-color)' }} className="mt-3">
              Incluye:
            </h6>
            <ul className="list-unstyled">
              <li>✅ Transporte ida y vuelta desde Porvenir</li>
              <li>✅ Guía especializado en fauna local</li>
              <li>✅ Entrada a la reserva de pingüinos</li>
              <li>✅ Binoculares para observación</li>
              <li>✅ Snack y bebidas</li>
            </ul>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-4">
            <h6 style={{ color: 'var(--primary-color)' }}>Duración:</h6>
            <p><strong>4 horas aproximadamente</strong></p>
          </div>
          <div className="col-md-4">
            <h6 style={{ color: 'var(--primary-color)' }}>Horarios:</h6>
            <p>
              <strong>9:00 AM - 1:00 PM</strong><br />
              <strong>2:00 PM - 6:00 PM</strong>
            </p>
          </div>
          <div className="col-md-4">
            <h6 style={{ color: 'var(--primary-color)' }}>Precio:</h6>
            <p><strong>$45.000 CLP</strong><br /><small>por persona</small></p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cerrar</Button>
        <Button variant="primary">Reservar Ahora</Button>
      </Modal.Footer>
    </Modal>
  );
}
