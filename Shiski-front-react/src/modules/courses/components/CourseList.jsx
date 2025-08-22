import { useState } from 'react';
import { useCart } from '../../cart/context/CartContext';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaEye } from 'react-icons/fa';
import AuthModal from '../../layouts/components/AuthModal';

// Recibir cursos como props en lugar de usar dummyData
export default function CourseList({ cursos = [] }) {
  const { addToCart, isAuthenticated } = useCart();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedCourseName, setSelectedCourseName] = useState('');
  
  const handleAddToCart = (course) => {
    const result = addToCart(course);
    
    if (result.requiresAuth) {
      setSelectedCourseName(result.courseName);
      setShowAuthModal(true);
    } else {
      // Mostrar toast o alert para otros casos
      alert(result.message);
    }
  };

  return (
    <div>
      <div className="row g-4">
        {cursos.map(curso => (
          <div className="col-md-6 col-lg-4" key={curso.id}>
            <div className="course-card">
              <div className="course-image">
                <img src={curso.imagenMiniatura || curso.img} alt={curso.titulo || curso.name} />
              </div>
              <div className="course-content">
                <h5 className="course-title">{curso.titulo || curso.name}</h5>
                <p className="course-price">${curso.precio?.toLocaleString('es-CL') || curso.price?.toLocaleString('es-CL')}</p>
                <p className="course-description">
                  {curso.descripcion && curso.descripcion.length > 100 
                    ? `${curso.descripcion.substring(0, 100)}...` 
                    : curso.descripcion || curso.description}
                </p>
              </div>
              <div className="course-footer">
                <Link to={`/courses/${curso.id}`} className="btn btn-view-details">
                  <FaEye className="me-2" /> Ver detalles
                </Link>
                <button 
                  className="btn btn-add-cart"
                  onClick={() => handleAddToCart({
                    id: curso.id,
                    titulo: curso.titulo || curso.name,
                    name: curso.titulo || curso.name,
                    price: curso.precio || curso.price,
                    img: curso.imagenMiniatura || curso.img
                  })}>
                  <FaShoppingCart className="me-2" /> 
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Modal de autenticación */}
      <AuthModal 
        show={showAuthModal}
        onHide={() => setShowAuthModal(false)}
      />
    </div>
  );
}