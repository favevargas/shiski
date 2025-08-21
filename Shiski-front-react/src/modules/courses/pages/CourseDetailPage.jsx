import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../../cart/context/CartContext';
import cursoService from '../../api/services/cursoService';
import LoadingSpinner from '../../layouts/components/LoadingSpinner';
import Toast from '../../layouts/components/Toast';
import useLoadingWithTimeout from '../../layouts/hook/useLoadingWithTimeout';
import '../styles/CourseDetail.css';

export default function CourseDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState('descripcion');
  const [curso, setCurso] = useState(null);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', variant: 'success' });
  
  const { loading, showTimeout } = useLoadingWithTimeout({
    initialLoading: true,
    timeoutDuration: 50000
  });
  
  useEffect(() => {
    const fetchCurso = async () => {
      try {
        const data = await cursoService.getCursoById(id);
        setCurso(data);
        setError(null);
      } catch (err) {
        console.error('Error al cargar curso:', err);
        setError(err);
        setToast({
          show: true,
          message: 'Error al cargar el curso. Mostrando datos de ejemplo.',
          variant: 'warning'
        });
        // Fallback para curso no encontrado
        setCurso({
          id: parseInt(id) || 0,
          titulo: 'Curso no encontrado',
          precio: 0,
          imagenMiniatura: '',
          descripcion: 'Lo sentimos, el curso que buscas no existe.',
          objetivos: [],
          requisitos: [],
          testimonios: []
        });
      }
    };

    fetchCurso();
  }, [id]);

  const handleAddToCart = () => {
    if (!curso) return;
    
    try {
      const result = addToCart({
        id: curso.id,
        name: curso.titulo,
        price: curso.precio,
        img: curso.imagenMiniatura
      });
      
      setToast({
        show: true,
        message: result.message,
        variant: result.success ? 'success' : 'warning'
      });
    } catch (error) {
      setToast({
        show: true,
        message: 'Error al agregar al carrito',
        variant: 'error'
      });
    }
  };

  const handleEnrollNow = () => {
    // Agregar al carrito y redirigir
    handleAddToCart();
    // Aquí podrías redirigir a checkout o proceso de inscripción
    setToast({
      show: true,
      message: 'Redirigiendo al proceso de inscripción...',
      variant: 'info'
    });
  };

  if (loading || !curso) {
    return (
      <div className="course-detail-container">
        <div className="container">
          <LoadingSpinner 
            message={showTimeout ? "La carga está tomando más tiempo del esperado..." : "Cargando detalles del curso..."}
            showProgress={true}
            size="lg"
          />
        </div>
      </div>
    );
  }

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
            <button 
              className="enroll-button me-3"
              onClick={handleAddToCart}
              disabled={!curso.id}
            >
              <FaShoppingCart className="me-2" /> Agregar al carrito
            </button>
            <button 
              className="enroll-button"
              onClick={handleEnrollNow}
              disabled={!curso.id}
            >
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
                    curso.requisitos.map((req, index) => (
                      <li key={index} className="requirement-item">{req}</li>
                    ))
                  ) : (
                    <>
                      <li className="requirement-item">Conocimientos básicos de administración</li>
                      <li className="requirement-item">Experiencia previa en manejo de inventarios (deseable)</li>
                      <li className="requirement-item">Acceso a computadora con conexión a internet</li>
                      <li className="requirement-item">Disponibilidad de 4-6 horas semanales para el curso</li>
                    </>
                  )}
                </ul>
              </div>
            )}

            {activeTab === 'testimonios' && (
              <div className="testimonials-tab">
                {curso.testimonios && curso.testimonios.length > 0 ? (
                  curso.testimonios.map((testimonial, index) => (
                    <div key={index} className="testimonial-card">
                      <div className="testimonial-header">
                        <img 
                          src={testimonial.avatar || `https://randomuser.me/api/portraits/${index % 2 === 0 ? 'women' : 'men'}/${30 + index}.jpg`} 
                          alt={testimonial.nombre || `Usuario ${index + 1}`} 
                          className="testimonial-avatar" 
                        />
                        <div>
                          <h4>{testimonial.nombre || `Usuario ${index + 1}`}</h4>
                          <div className="testimonial-rating">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={i < (testimonial.rating || 5) ? 'star filled' : 'star'}>★</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="testimonial-text">{testimonial.comentario || testimonial.text}</p>
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
      
      {toast.show && (
        <Toast
          message={toast.message}
          variant={toast.variant}
          onClose={() => setToast({ ...toast, show: false })}
          position="top-right"
        />
      )}
    </div>
  );
}