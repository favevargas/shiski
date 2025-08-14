import { useEffect, useState } from 'react';

function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('cart');
    if (stored) setCartItems(JSON.parse(stored));
  }, []);

  return (
    <div>
      <h2>Tu carrito</h2>
      {cartItems.length === 0 ? (
        <p>No hay cursos en el carrito</p>
      ) : (
        cartItems.map(item => (
          <div key={item.id}>
            <span>{item.title} - ${item.price}</span>
          </div>
        ))
      )}
    </div>
  );
}