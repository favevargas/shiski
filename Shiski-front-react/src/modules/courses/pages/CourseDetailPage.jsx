import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaShoppingCart, FaStar, FaStarHalfAlt, FaRegStar, FaCheck } from 'react-icons/fa';
import { courses } from '../utils/dummyData';
import '../styles/CourseDetail.css';

export default function CourseDetailPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('descripcion');
  
  // Encontrar el curso por ID
  const course = courses.find(course => course.id === parseInt(id)) || {
    id: 0,
    name: 'Curso no encontrado',
    price: 0,
    img: '',
    description: 'Lo sentimos, el curso que buscas no existe.',
    content: [],
    requirements: [],
    testimonials: []
  };

  return (
    <div className="course-detail-container">
      <div className="container">
        <Link to="/courses" className="back-link">
          <FaArrowLeft className="me-2" /> Volver a cursos
        </Link>
        
        <div className="course-header">
          <h1>{course.name}</h1>
          <div className="course-price">${course.price.toLocaleString('es-CL')}</div>
          <div className="course-actions">
            <button className="enroll-button me-3">
              <FaShoppingCart className="me-2" /> Agregar al carrito
            </button>
            <button className="enroll-button">
              Inscribirse ahora
            </button>
          </div>
        </div>

      <div className="course-content">
        <div className="course-tabs">
          <button 
            className={`tab-button ${activeTab === 'descripcion' ? 'active' : ''}`}
            onClick={() => setActiveTab('descripcion')}
          >
            Descripción
          </button>
          <button 
            className={`tab-button ${activeTab === 'contenido' ? 'active' : ''}`}
            onClick={() => setActiveTab('contenido')}
          >
            Contenido
          </button>
          <button 
            className={`tab-button ${activeTab === 'requisitos' ? 'active' : ''}`}
            onClick={() => setActiveTab('requisitos')}
          >
            Requisitos
          </button>
          <button 
            className={`tab-button ${activeTab === 'testimonios' ? 'active' : ''}`}
            onClick={() => setActiveTab('testimonios')}
          >
            Testimonios
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'descripcion' && (
            <div className="description-tab">
              <p>{course.description || 'Sistema de gestión de inventarios avanzado que monitorea en tiempo real el estado de materiales, reduce costos y mejora la eficiencia de los procesos de la empresa.'}</p>
            </div>
          )}

          {activeTab === 'contenido' && (
            <div className="content-tab">
              <ul className="content-list">
                {course.content && course.content.length > 0 ? (
                  course.content.map((item, index) => (
                    <li key={index} className="content-item">
                      <span className="content-icon">✓</span>
                      {item}
                    </li>
                  ))
                ) : (
                  <>
                    <li className="content-item"><span className="content-icon">✓</span> Introducción a la gestión de inventarios</li>
                    <li className="content-item"><span className="content-icon">✓</span> Técnicas de optimización de stock</li>
                    <li className="content-item"><span className="content-icon">✓</span> Análisis de datos para la toma de decisiones</li>
                    <li className="content-item"><span className="content-icon">✓</span> Implementación de sistemas automatizados</li>
                    <li className="content-item"><span className="content-icon">✓</span> Casos prácticos y ejercicios</li>
                  </>
                )}
              </ul>
            </div>
          )}

          {activeTab === 'requisitos' && (
            <div className="requirements-tab">
              <ul className="requirements-list">
                {course.requirements && course.requirements.length > 0 ? (
                  course.requirements.map((req, index) => (
                    <li key={index} className="requirement-item">{req}</li>
                  ))
                ) : (
                  <>
                    <li className="requirement-item">Conocimientos básicos de logística</li>
                    <li className="requirement-item">Experiencia en manejo de Excel</li>
                    <li className="requirement-item">Computador con acceso a internet</li>
                  </>
                )}
              </ul>
            </div>
          )}

          {activeTab === 'testimonios' && (
            <div className="testimonials-tab">
              {course.testimonials && course.testimonials.length > 0 ? (
                course.testimonials.map((testimonial, index) => (
                  <div key={index} className="testimonial-card">
                    <div className="testimonial-header">
                      <img src={testimonial.avatar || 'https://via.placeholder.com/50'} alt={testimonial.name} className="testimonial-avatar" />
                      <div>
                        <h4>{testimonial.name}</h4>
                        <div className="testimonial-rating">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < testimonial.rating ? 'star filled' : 'star'}>
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="testimonial-text">{testimonial.text}</p>
                  </div>
                ))
              ) : (
                <>
                  <div className="testimonial-card">
                    <div className="testimonial-header">
                      <img src="https://randomuser.me/api/portraits/women/43.jpg" alt="Sofia Ríos" className="testimonial-avatar" />
                      <div>
                        <h4>Sofia Ríos</h4>
                        <div className="testimonial-rating">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < 5 ? 'star filled' : 'star'}>★</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="testimonial-text">Excelente curso, muy completo y práctico. Aprendí mucho sobre gestión de inventarios y ahora puedo aplicarlo en mi empresa.</p>
                  </div>
                  
                  <div className="testimonial-card">
                    <div className="testimonial-header">
                      <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Carlos López" className="testimonial-avatar" />
                      <div>
                        <h4>Carlos López</h4>
                        <div className="testimonial-rating">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < 4 ? 'star filled' : 'star'}>★</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="testimonial-text">Muy buen contenido, me ha servido muchísimo en mi trabajo. Sin embargo, me gustaría que hubiera tenido más ejercicios prácticos.</p>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}