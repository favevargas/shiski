import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../../cart/context/CartContext';
import cursoService from '../../api/services/cursoService';
import LoadingSpinner from '../../layouts/components/LoadingSpinner';
import Toast from '../../layouts/components/Toast';
import AuthModal from '../../layouts/components/AuthModal';
import useLoadingWithTimeout from '../../layouts/hook/useLoadingWithTimeout';
import '../styles/CourseDetail.css';

export default function CourseDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState('descripcion');
  const [curso, setCurso] = useState(null);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', variant: 'success' });
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { loading, progress, showTimeout, startLoading, stopLoading } = useLoadingWithTimeout();

  useEffect(() => {
    const fetchCurso = async () => {
      if (!id) return;
      
      startLoading();
      try {
        const data = await cursoService.getCursoById(id);
        setCurso(data);
        setError(null);
      } catch (error) {
        console.error('Error al cargar curso:', error);
        setError('No se pudo cargar el curso');
      } finally {
        stopLoading();
      }
    };

    fetchCurso();
  }, [id]);

  const handleAddToCart = () => {
    if (!curso) return;
    
    try {
      const result = addToCart({
        id: curso.id,
        titulo: curso.titulo,
        name: curso.titulo,
        price: curso.precio,
        img: curso.imagenMiniatura
      });
      
      if (result.requiresAuth) {
        setShowAuthModal(true);
      } else {
        setToast({
          show: true,
          message: result.message,
          variant: result.success ? 'success' : 'warning'
        });
      }
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

  if (loading) {
    return <LoadingSpinner progress={progress} showTimeout={showTimeout} />;
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
        <Link to="/courses" className="btn btn-primary">
          <FaArrowLeft className="me-2" />
          Volver a Cursos
        </Link>
      </div>
    );
  }

  if (!curso) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning" role="alert">
          Curso no encontrado
        </div>
        <Link to="/courses" className="btn btn-primary">
          <FaArrowLeft className="me-2" />
          Volver a Cursos
        </Link>
      </div>
    );
  }

  return (
    <div className="course-detail-page">
      <div className="container py-5">
        {/* Botón de regreso */}
        <div className="mb-4">
          <Link to="/courses" className="btn btn-outline-secondary">
            <FaArrowLeft className="me-2" />
            Volver a Cursos
          </Link>
        </div>

        <div className="row">
          <div className="col-lg-8">
            {/* Imagen del curso */}
            <div className="course-image-container mb-4">
              <img 
                src={curso.imagenMiniatura || '/default-course.jpg'} 
                alt={curso.titulo}
                className="img-fluid rounded"
              />
            </div>

            {/* Tabs de contenido */}
            <div className="course-tabs">
              <ul className="nav nav-tabs mb-4">
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'descripcion' ? 'active' : ''}`}
                    onClick={() => setActiveTab('descripcion')}
                  >
                    Descripción
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'contenido' ? 'active' : ''}`}
                    onClick={() => setActiveTab('contenido')}
                  >
                    Contenido
                  </button>
                </li>
              </ul>

              <div className="tab-content">
                {activeTab === 'descripcion' && (
                  <div className="tab-pane active">
                    <p>{curso.descripcion || 'Sin descripción disponible'}</p>
                  </div>
                )}
                {activeTab === 'contenido' && (
                  <div className="tab-pane active">
                    <p>Contenido del curso próximamente...</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            {/* Card de información del curso */}
            <div className="course-info-card">
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title">{curso.titulo}</h3>
                  <div className="course-price mb-3">
                    <span className="h4 text-primary">
                      ${curso.precio?.toLocaleString('es-CL')}
                    </span>
                  </div>
                  
                  <div className="d-grid gap-2">
                    <button 
                      className="btn btn-primary btn-lg"
                      onClick={handleAddToCart}
                    >
                      <FaShoppingCart className="me-2" />
                      Agregar al Carrito
                    </button>
                    <button 
                      className="btn btn-success btn-lg"
                      onClick={handleEnrollNow}
                    >
                      Inscribirse Ahora
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de autenticación */}
      <AuthModal 
        show={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        courseName={curso?.titulo || 'este curso'}
      />
      
      {/* Toast component */}
      <Toast 
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
        message={toast.message}
        variant={toast.variant}
      />
    </div>
  );
}