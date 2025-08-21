import { createContext, useState, useEffect, useContext } from 'react';

// Creamos el contexto
const CartContext = createContext();

// Hook personalizado para usar el contexto
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};

// Proveedor del contexto
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      setCartItems(parsedCart);
      calculateTotal(parsedCart);
    }
  }, []);

  // Actualizar localStorage cuando cambia el carrito
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    calculateTotal(cartItems);
  }, [cartItems]);

  // Calcular el total del carrito
  const calculateTotal = (items) => {
    const sum = items.reduce((acc, item) => acc + item.price, 0);
    setTotal(sum);
  };

  // Agregar un curso al carrito
  const addToCart = (course) => {
    // Verificar si el curso ya está en el carrito
    const isCourseInCart = cartItems.some(item => item.id === course.id);
    
    if (!isCourseInCart) {
      setCartItems([...cartItems, course]);
      return { success: true, message: `${course.titulo || course.name || 'Curso'} ha sido agregado al carrito!` };
    } else {
      return { success: false, message: `${course.titulo || course.name || 'Curso'} ya está en el carrito.` };
    }
  };

  // Eliminar un curso del carrito
  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
  };

  // Vaciar el carrito
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  // Nueva función para sincronizar con backend
  const syncWithBackend = (backendCartItems) => {
    setCartItems(backendCartItems.map(item => ({
      id: item.cursoId,
      carritoId: item.id, // ID del carrito en backend
      name: item.cursoNombre,
      price: item.precioMomento,
      // ... otros campos necesarios
    })));
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    total,
    itemCount: cartItems.length, 
    syncWithBackend
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;