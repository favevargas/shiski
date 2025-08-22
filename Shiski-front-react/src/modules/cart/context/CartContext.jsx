import { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from '../../auth/hook/useAuth';

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
  const { user, isAuthenticated } = useAuth(); // Usar el estado del AuthContext

  // Función para obtener la clave del carrito por usuario
  const getCartKey = (userId) => {
    return userId ? `cart_user_${userId}` : 'cart_guest';
  };

  // Cargar carrito desde localStorage cuando cambia el usuario
  useEffect(() => {
    if (isAuthenticated && user?.email) {
      // Usuario autenticado: cargar su carrito específico
      const cartKey = getCartKey(user.email);
      const storedCart = localStorage.getItem(cartKey);
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        setCartItems(parsedCart);
        calculateTotal(parsedCart);
      } else {
        // Si no hay carrito guardado, inicializar vacío
        setCartItems([]);
        setTotal(0);
      }
    } else {
      // Usuario no autenticado: limpiar carrito
      setCartItems([]);
      setTotal(0);
    }
  }, [user, isAuthenticated]);

  // Actualizar localStorage cuando cambia el carrito (solo si está autenticado)
  useEffect(() => {
    if (isAuthenticated && user?.email) {
      const cartKey = getCartKey(user.email);
      if (cartItems.length > 0) {
        localStorage.setItem(cartKey, JSON.stringify(cartItems));
      } else {
        localStorage.removeItem(cartKey);
      }
    }
    calculateTotal(cartItems);
  }, [cartItems, user, isAuthenticated]);

  // Calcular el total del carrito
  const calculateTotal = (items) => {
    const sum = items.reduce((acc, item) => acc + item.price, 0);
    setTotal(sum);
  };

  // Agregar un curso al carrito (solo si está autenticado)
  const addToCart = (course) => {
    if (!isAuthenticated) {
      return { 
        success: false, 
        message: 'Debes iniciar sesión para agregar cursos al carrito.',
        requiresAuth: true,
        courseName: course.titulo || course.name || 'este curso'
      };
    }

    // Verificar si el curso ya está en el carrito
    const isCourseInCart = cartItems.some(item => item.id === course.id);
    
    if (!isCourseInCart) {
      setCartItems([...cartItems, course]);
      return { 
        success: true, 
        message: `${course.titulo || course.name || 'Curso'} ha sido agregado al carrito!`,
        requiresAuth: false
      };
    } else {
      return { 
        success: false, 
        message: `${course.titulo || course.name || 'Curso'} ya está en el carrito.`,
        requiresAuth: false
      };
    }
  };

  // Eliminar un curso del carrito
  const removeFromCart = (id) => {
    if (!isAuthenticated) return;
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
  };

  // Vaciar el carrito
  const clearCart = () => {
    if (!isAuthenticated) return;
    setCartItems([]);
    if (user?.email) {
      const cartKey = getCartKey(user.email);
      localStorage.removeItem(cartKey);
    }
  };

  // Nueva función para sincronizar con backend
  const syncWithBackend = (backendCartItems) => {
    if (!isAuthenticated) return;
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
    syncWithBackend,
    isAuthenticated // Ahora viene del AuthContext
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;