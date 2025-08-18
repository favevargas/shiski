import { Link } from "react-router-dom";
import "../styles/Home.css";
import { FaMapMarkerAlt, FaRoute } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="hero-content">
              <h1 className="hero-title">UNA SOLUCIÓN PARA TU EMPRESA</h1>
              <p className="hero-description">
                Optimiza tus operaciones logísticas y capacita a tu equipo con nuestros cursos especializados en transporte y logística
              </p>
              <div className="hero-cta">
                <Link to="/business" className="btn btn-cta-home btn-lg">Cotizar ahora</Link>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="hero-visual">
              <div className="hero-image-container">
                <div className="hero-overlay">
                  <div className="route-marker start">
                    <FaMapMarkerAlt />
                  </div>
                  <div className="route-line"></div>
                  <div className="route-marker end">
                    <FaMapMarkerAlt />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
