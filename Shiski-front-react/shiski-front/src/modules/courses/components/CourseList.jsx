import { courses } from '../utils/dummyData';

export default function CourseList() {
  const addToCart = (course) => {
    // Obtenemos los ítems del carrito del localStorage
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Verificamos si el curso ya está en el carrito para evitar duplicados
    const isCourseInCart = storedCart.some(item => item.id === course.id);
    
    if (!isCourseInCart) {
      const updatedCart = [...storedCart, course];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      alert(`${course.name} ha sido agregado al carrito!`);
    } else {
      alert(`${course.name} ya está en el carrito.`);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="h3 mb-4">Cursos destacados</h2>
      <div className="row g-4">
        {courses.map(p => (
          <div className="col-12 col-sm-6 col-lg-4" key={p.id}>
            <div className="card h-100 shadow-sm">
              <img src={p.img} className="card-img-top" alt={p.name} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text text-body-secondary mb-4">${p.price.toLocaleString('es-CL')}</p>
                <button 
                  className="btn btn-outline-primary mt-auto"
                  onClick={() => addToCart(p)}>
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}