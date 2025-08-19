import { courses } from '../utils/dummyData';
import { useCart } from '../../cart/context/CartContext';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaEye } from 'react-icons/fa';

export default function CourseList() {
  const { addToCart } = useCart();
  
  const handleAddToCart = (course) => {
    const result = addToCart(course);
    alert(result.message);
  };

  return (
    <div>
      <div className="row g-4">
        {courses.map(course => (
          <div className="col-md-6 col-lg-4" key={course.id}>
            <div className="course-card">
              <div className="course-image">
                <img src={course.img} alt={course.name} />
              </div>
              <div className="course-content">
                <h5 className="course-title">{course.name}</h5>
                <p className="course-price">${course.price.toLocaleString('es-CL')}</p>
                <p className="course-description">
                  {course.description.length > 100 
                    ? `${course.description.substring(0, 100)}...` 
                    : course.description}
                </p>
              </div>
              <div className="course-footer">
                <Link to={`/courses/${course.id}`} className="btn btn-view-details">
                  <FaEye className="me-2" /> Ver detalles
                </Link>
                <button 
                  className="btn btn-add-cart"
                  onClick={() => handleAddToCart(course)}>
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