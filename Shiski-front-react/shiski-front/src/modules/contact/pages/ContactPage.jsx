import React from 'react';
import '../../contact/styles/Contact.css';

const ContactPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    alert('Formulario enviado correctamente');
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>CONTÁCTANOS</h1>
        <p>Estamos aquí para responder tus preguntas y ayudarte con tus necesidades de capacitación</p>
      </div>

      <div className="contact-form-container">
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input type="text" id="name" className="form-control" placeholder="Tu nombre" required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" className="form-control" placeholder="tu.email@ejemplo.com" required />
          </div>

          <div className="form-group">
            <label htmlFor="subject">Tema específico</label>
            <input type="text" id="subject" className="form-control" placeholder="¿Sobre qué quieres hablar?" required />
          </div>

          <div className="form-group">
            <label htmlFor="message">Mensaje</label>
            <textarea id="message" className="form-control" rows="5" placeholder="Escribe tu mensaje aquí..." required></textarea>
          </div>

          <div className="form-check mb-3">
            <input type="checkbox" className="form-check-input" id="privacy" required />
            <label className="form-check-label" htmlFor="privacy">Acepto la política de privacidad</label>
          </div>

          <button type="submit" className="btn btn-primary w-100">Enviar mensaje</button>
        </form>
      </div>

      <div className="contact-info">
        <div className="info-item">
          <i className="bi bi-geo-alt"></i>
          <div>
            <h3>Dirección</h3>
            <p>Av. Providencia 1208, Providencia, Santiago</p>
          </div>
        </div>

        <div className="info-item">
          <i className="bi bi-telephone"></i>
          <div>
            <h3>Teléfono</h3>
            <p>+56 2 2345 6789</p>
          </div>
        </div>

        <div className="info-item">
          <i className="bi bi-envelope"></i>
          <div>
            <h3>Email</h3>
            <p>contacto@shiski.cl</p>
          </div>
        </div>

        <div className="info-item">
          <i className="bi bi-clock"></i>
          <div>
            <h3>Horario de atención</h3>
            <p>Lunes a Viernes: 9:00 - 18:00</p>
          </div>
        </div>
      </div>

      <div className="map-container">
        <h2>Nuestra ubicación</h2>
        <div className="map">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.997087554424!2d-70.62108492426508!3d-33.42599997356841!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662cf69995a2c0f%3A0x8ccc6a3f8826ed6!2sAv.%20Providencia%201208%2C%20Providencia%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses!2scl!4v1692654321098!5m2!1ses!2scl" 
            width="100%" 
            height="450" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación de Shiski"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;