import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../../auth/hook/useAuth';
import { Link } from 'react-router-dom';
import { FaTrashAlt, FaArrowLeft, FaShoppingCart, FaUser, FaUserPlus } from 'react-icons/fa';
import carritoService from '../../api/services/carritoService';
import LoadingSpinner from '../../layouts/components/LoadingSpinner';
import Toast from '../../layouts/components/Toast';
import useLoadingWithTimeout from '../../layouts/hook/useLoadingWithTimeout';
import '../styles/Cart.css';

function CartPage() {
  const { cartItems, removeFromCart, clearCart, total, syncWithBackend, isAuthenticated } = useCart();
  const { user } = useAuth();
  const [toast, setToast] = useState({ show: false, variant: 'info', title: '', message: '' });
  const { loading, progress, showTimeout, startLoading, stopLoading } = useLoadingWithTimeout();

  // Sincronizar carrito con backend al cargar
  useEffect(() => {
    const sincronizarCarrito = async () => {
      if (!user?.id) return;
      
      startLoading();
      setToast({
        show: true,
        variant: 'loading',
        title: 'Cargando carrito',
        message: 'Sincronizando tu carrito...'
      });
      
      try {
        const carritoBackend = await carritoService.obtenerCarrito(user.id);
        // Sincronizar con el contexto local
        if (syncWithBackend) {
          syncWithBackend(carritoBackend);
        }
        
        setToast({
          show: true,
          variant: 'success',
          title: 'Carrito sincronizado',
          message: 'Tu carrito está actualizado'
        });
      } catch (error) {
        console.error('Error al sincronizar carrito:', error);
        setToast({
          show: true,
          variant: 'warning',
          title: 'Modo offline',
          message: 'Usando carrito local'
        });
      } finally {
        stopLoading();
      }
    };

    sincronizarCarrito();
  }, [user?.id]);

  const handleRemoveFromCart = async (item) => {
    try {
      if (user?.id && item.carritoId) {
        await carritoService.eliminarProducto(item.carritoId);
      }
      removeFromCart(item.id);
      
      setToast({
        show: true,
        variant: 'success',
        title: 'Producto eliminado',
        message: `${item.name} fue eliminado del carrito`
      });
    } catch (error) {
      console.error('Error al eliminar del carrito:', error);
      setToast({
        show: true,
        variant: 'error',
        title: 'Error',
        message: 'No se pudo eliminar el producto'
      });
    }
  };

  const handleClearCart = async () => {
    try {
      if (user?.id) {
        await carritoService.vaciarCarrito(user.id);
      }
      clearCart();
      
      setToast({
        show: true,
        variant: 'success',
        title: 'Carrito vaciado',
        message: 'Todos los productos fueron eliminados'
      });
    } catch (error) {
      console.error('Error al vaciar carrito:', error);
      setToast({
        show: true,
        variant: 'error',
        title: 'Error',
        message: 'No se pudo vaciar el carrito'
      });
    }
  };

  if (loading) {
    return (
      <LoadingSpinner 
        progress={progress}
        message={showTimeout ? "La conexión está tardando más de lo esperado..." : "Cargando carrito..."}
        overlay={true}
      />
    );
  }

  return (
    <div className="cart-page">
      <Toast 
        show={toast.show}
        variant={toast.variant}
        title={toast.title}
        message={toast.message}
        onClose={() => setToast({ ...toast, show: false })}
        position="top-right"
      />
      
      <div className="container">
        <div className="cart-header">
          <h1>Tu Carrito</h1>
          <p className="cart-subtitle">Revisa tus cursos seleccionados antes de continuar con el pago</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <FaShoppingCart />
            </div>
            <h2>Tu carrito está vacío</h2>
            <p>Parece que aún no has añadido ningún curso a tu carrito</p>
            <Link to="/courses" className="btn btn-success">Explorar cursos</Link>
          </div>
        ) : (
          <div className="cart-content">
            <div className="row">
              <div className="col-lg-8">
                <div className="cart-items">
                  <div className="cart-items-header">
                    <h3>Cursos seleccionados ({cartItems.length})</h3>
                    <button className="btn-clear" onClick={handleClearCart}>
                      <FaTrashAlt /> Vaciar carrito
                    </button>
                  </div>

                  {cartItems.map(item => (
                    <div className="cart-item" key={item.id}>
                      <div className="cart-item-image">
                        <img src={item.img} alt={item.name} />
                      </div>
                      <div className="cart-item-details">
                        <h4>{item.name}</h4>
                        <p className="cart-item-description">Curso completo con acceso ilimitado</p>
                        <div className="cart-item-price">
                          <span className="price-current">${item.price.toLocaleString('es-CL')}</span>
                        </div>
                      </div>
                      <div className="cart-item-actions">
                        <button 
                          className="btn-remove" 
                          onClick={() => handleRemoveFromCart(item)}
                        >
                          <FaTrashAlt /> Eliminar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-lg-4">
                <div className="cart-summary">
                  <h3>Resumen de compra</h3>
                  
                  <div className="summary-item">
                    <span>Subtotal</span>
                    <span>${total.toLocaleString('es-CL')}</span>
                  </div>
                  
                  <div className="summary-item">
                    <span>Descuento</span>
                    <span>$0</span>
                  </div>
                  
                  <div className="summary-total">
                    <span>Total</span>
                    <span>${total.toLocaleString('es-CL')}</span>
                  </div>
                  
                  <button className="btn-checkout">Proceder al pago</button>
                  
                  <div className="payment-methods">
                    <p>Métodos de pago aceptados:</p>
                    <div className="payment-icons">
                      <span className="payment-icon">💳</span>
                      <span className="payment-icon">🏦</span>
                      <span className="payment-icon">📱</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
  // Mostrar mensaje si no está autenticado
  if (!isAuthenticated) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="empty-cart">
                <FaShoppingCart className="empty-cart-icon" />
                <h2 className="mb-3">¡Inicia sesión para ver tu carrito!</h2>
                <p className="text-muted mb-4">
                  Para agregar cursos al carrito y realizar compras necesitas tener una cuenta.
                </p>
                <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                  <Link to="/login" className="btn btn-primary btn-lg me-md-2">
                    <FaUser className="me-2" />
                    Iniciar Sesión
                  </Link>
                  <Link to="/register" className="btn btn-outline-primary btn-lg">
                    <FaUserPlus className="me-2" />
                    Crear Cuenta
                  </Link>
                </div>
                <div className="mt-4">
                  <Link to="/courses" className="btn btn-continue">
                    <FaArrowLeft className="me-2" />
                    Ver Cursos
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CartPage;