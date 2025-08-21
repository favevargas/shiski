import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaShoppingCart, FaStar, FaStarHalfAlt, FaRegStar, FaCheck } from 'react-icons/fa';
import cursoService from '../../api/services/cursoService';
import '../styles/CourseDetail.css';

export default function CourseDetailPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('descripcion');
  const [curso, setCurso] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchCurso = async () => {
      try {
        setLoading(true);
        const data = await cursoService.getCursoById(id);
        setCurso(data);
      } catch (err) {
        setError(err);
        // Fallback para curso no encontrado
        setCurso({
          id: 0,
          titulo: 'Curso no encontrado',
          precio: 0,
          imagenMiniatura: '',
          descripcion: 'Lo sentimos, el curso que buscas no existe.',
          objetivos: [],
          requisitos: [],
          testimonios: []
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCurso();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  if (!curso) return null;

  return (
    <div className="course-detail-container">
      <div className="container">
        <Link to="/courses" className="back-link">
          <FaArrowLeft className="me-2" /> Volver a cursos
        </Link>
        
        <div className="course-header">
          <h1>{curso.titulo}</h1>
          <div className="course-price">${curso.precio?.toLocaleString('es-CL')}</div>
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
              <p>{curso.descripcion || 'Sistema de gestión de inventarios avanzado que monitorea en tiempo real el estado de materiales, reduce costos y mejora la eficiencia de los procesos de la empresa.'}</p>
            </div>
          )}

          {activeTab === 'contenido' && (
            <div className="content-tab">
              <ul className="content-list">
                {curso.temario ? (
                  // Si temario es un string, lo dividimos por líneas o puntos
                  curso.temario.split('\n').filter(item => item.trim()).map((item, index) => (
                    <li key={index} className="content-item">
                      <span className="content-icon">✓</span>
                      {item.trim()}
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
                {curso.requisitos ? (
                  // Si requisitos es un string, lo dividimos por líneas o puntos
                  curso.requisitos.split('\n').filter(req => req.trim()).map((req, index) => (
                    <li key={index} className="requirement-item">{req.trim()}</li>
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
              {curso.testimonios && curso.testimonios.length > 0 ? (
                curso.testimonios.map((testimonio, index) => (
                  <div key={index} className="testimonial-card">
                    <div className="testimonial-header">
                      <img src={testimonio.fotoPerfil || 'https://via.placeholder.com/50'} alt={testimonio.nombreUsuario} className="testimonial-avatar" />
                      <div>
                        <h4>{testimonio.nombreUsuario}</h4>
                        <div className="testimonial-rating">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < testimonio.calificacion ? 'star filled' : 'star'}>
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="testimonial-text">{testimonio.comentario}</p>
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