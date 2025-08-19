import React from 'react';
import '../../business/styles/Business.css';

const BusinessPage = () => {
  const pricingPlans = [
    {
      id: 1,
      title: 'Básico',
      price: '$299',
      period: 'Por usuario mensual',
      features: [
        'Acceso a todos los cursos básicos',
        'Soporte por correo electrónico',
        'Certificados digitales',
        'Acceso a foros de discusión',
        'Evaluaciones y seguimiento'
      ],
      recommended: false
    },
    {
      id: 2,
      title: 'Premium',
      price: '$499',
      period: 'Por usuario mensual',
      features: [
        'Acceso a todos los cursos',
        'Soporte prioritario 24/7',
        'Certificados digitales',
        'Acceso a foros de discusión',
        'Evaluaciones y seguimiento',
        'Sesiones de mentoría grupal',
        'Contenido exclusivo'
      ],
      recommended: true
    },
    {
      id: 3,
      title: 'Enterprise',
      price: 'Personalizado',
      period: 'Plan a medida',
      features: [
        'Acceso a todos los cursos',
        'Soporte dedicado 24/7',
        'Certificados digitales',
        'Acceso a foros privados',
        'Evaluaciones y seguimiento avanzado',
        'Sesiones de mentoría individual',
        'Contenido personalizado',
        'Integración con LMS corporativo',
        'Reportes analíticos detallados'
      ],
      recommended: false
    }
  ];

  return (
    <div className="business-container">
      <div className="business-header">
        <h1>Soluciones para Empresas</h1>
        <p>Capacitación especializada para equipos de logística y transporte</p>
      </div>

      <div className="pricing-section">
        <h2>Nuestros Planes</h2>
        <div className="pricing-plans">
          {pricingPlans.map((plan) => (
            <div key={plan.id} className={`pricing-card ${plan.recommended ? 'recommended' : ''}`}>
              {plan.recommended && <div className="recommended-badge">Recomendado</div>}
              <h3>{plan.title}</h3>
              <div className="price">{plan.price}</div>
              <div className="period">{plan.period}</div>
              <ul className="features">
                {plan.features.map((feature, index) => (
                  <li key={index}>
                    <i className="bi bi-check-circle-fill"></i> {feature}
                  </li>
                ))}
              </ul>
              <button className="btn btn-primary w-100">Contratar</button>
            </div>
          ))}
        </div>
      </div>

      <div className="business-benefits">
        <h2>Beneficios para su Empresa</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <i className="bi bi-graph-up"></i>
            <h3>Aumento de Productividad</h3>
            <p>Mejore la eficiencia operativa de su equipo con capacitación especializada.</p>
          </div>
          <div className="benefit-card">
            <i className="bi bi-shield-check"></i>
            <h3>Reducción de Errores</h3>
            <p>Minimice errores operativos con formación práctica y actualizada.</p>
          </div>
          <div className="benefit-card">
            <i className="bi bi-people"></i>
            <h3>Retención de Talento</h3>
            <p>Ofrezca desarrollo profesional continuo para retener a sus mejores colaboradores.</p>
          </div>
          <div className="benefit-card">
            <i className="bi bi-award"></i>
            <h3>Certificaciones Reconocidas</h3>
            <p>Certifique las competencias de su equipo con credenciales de valor en la industria.</p>
          </div>
        </div>
      </div>

      <div className="contact-cta">
        <h2>¿Necesita una solución personalizada?</h2>
        <p>Contáctenos para diseñar un plan de capacitación a la medida de sus necesidades.</p>
        <button className="btn btn-lg btn-primary">Solicitar información</button>
      </div>
    </div>
  );
};

export default BusinessPage;