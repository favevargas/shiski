import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../cart/context/CartContext';
import { FaShoppingCart } from 'react-icons/fa';

export default function NavbarCart() {
  const { itemCount } = useCart();

  return (
    <Link to="/cart" className="position-relative d-inline-flex align-items-center text-decoration-none">
      <FaShoppingCart className="fs-5 text-white" />
      {itemCount > 0 && (
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {itemCount}
          <span className="visually-hidden">items en el carrito</span>
        </span>
      )}
    </Link>
  );
}