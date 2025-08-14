import { useEffect, useState } from 'react';

function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  // Carga los ítems del localStorage cuando el componente se monta
  useEffect(() => {
    const stored = localStorage.getItem('cart');
    if (stored) {
      setCartItems(JSON.parse(stored));
    }
  }, []);

  // Función para eliminar un curso
  const removeItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Función para vaciar todo el carrito
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  return (
    <div className="container py-5">
      <h2 className="h3 mb-4">Tu carrito</h2>
      {cartItems.length === 0 ? (
        <p>No hay cursos en el carrito</p>
      ) : (
        <>
          <button className="btn btn-danger mb-4" onClick={clearCart}>Vaciar Carrito</button>
          {cartItems.map(item => (
            <div className="card mb-3" key={item.id}>
              <div className="card-body d-flex justify-content-between align-items-center">
                <span>{item.name} - ${item.price.toLocaleString('es-CL')}</span>
                <button 
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => removeItem(item.id)}>
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default CartPage;