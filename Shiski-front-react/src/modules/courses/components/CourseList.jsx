import { useCart } from '../../cart/context/CartContext';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaEye } from 'react-icons/fa';

// Recibir cursos como props en lugar de usar dummyData
export default function CourseList({ cursos = [] }) {
  const { addToCart } = useCart();
  
  const handleAddToCart = (course) => {
    const result = addToCart(course);
    alert(result.message);
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
                    name: curso.titulo || curso.name,
                    price: curso.precio || curso.price,
                    img: curso.imagenMiniatura || curso.img
                  })}>
                  <FaShoppingCart className="me-2" /> Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="pagination-container">
        <ul className="pagination">
          <li className="pagination-item">
            <a href="#" className="pagination-link">1</a>
          </li>
          <li className="pagination-item">
            <a href="#" className="pagination-link">2</a>
          </li>
          <li className="pagination-item">
            <a href="#" className="pagination-link active">3</a>
          </li>
          <li className="pagination-item">
            <a href="#" className="pagination-link">4</a>
          </li>
          <li className="pagination-item">
            <a href="#" className="pagination-link">5</a>
          </li>
        </ul>
      </div>
    </div>
  );
}