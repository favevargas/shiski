import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaUserPlus, FaTimes } from 'react-icons/fa';

const AuthModal = ({ show, onClose, courseName }) => {
  if (!show) return null;

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header border-0">
            <h5 className="modal-title fw-bold">¡Inicia sesión para continuar!</h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body text-center py-4">
            <div className="mb-4">
              <FaUser className="text-primary" style={{ fontSize: '3rem' }} />
            </div>
            <h6 className="mb-3">Para agregar "{courseName}" al carrito</h6>
            <p className="text-muted mb-4">
              Necesitas tener una cuenta para poder agregar cursos al carrito y realizar compras.
            </p>
            <div className="d-grid gap-2">
              <Link 
                to="/login" 
                className="btn btn-primary btn-lg"
                onClick={onClose}
              >
                <FaUser className="me-2" />
                Iniciar Sesión
              </Link>
              <Link 
                to="/register" 
                className="btn btn-outline-primary btn-lg"
                onClick={onClose}
              >
                <FaUserPlus className="me-2" />
                Crear Cuenta
              </Link>
            </div>
          </div>
          <div className="modal-footer border-0 justify-content-center">
            <small className="text-muted">
              ¿Ya tienes cuenta? <Link to="/login" onClick={onClose}>Inicia sesión aquí</Link>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;