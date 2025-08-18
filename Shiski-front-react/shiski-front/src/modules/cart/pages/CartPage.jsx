import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { FaTrashAlt, FaArrowLeft, FaShoppingCart } from 'react-icons/fa';
import '../styles/Cart.css';

function CartPage() {
  const { cartItems, removeFromCart, clearCart, total } = useCart();

  return (
    <div className="cart-page">
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
                    <button className="btn-clear" onClick={clearCart}>
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
                          onClick={() => removeFromCart(item.id)}>
                          <FaTrashAlt />
                        </button>
                      </div>
                    </div>
                  ))}

                  <div className="cart-continue-shopping">
                    <Link to="/courses" className="btn-continue">
                      <FaArrowLeft /> Continuar comprando
                    </Link>
                  </div>
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
}

export default CartPage;