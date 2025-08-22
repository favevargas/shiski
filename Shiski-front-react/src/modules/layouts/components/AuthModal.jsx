import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';

const AuthModal = ({ show, onHide, onLogin, onRegister }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>¡Inicia sesión para continuar!</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <FaUser 
          size={60} 
          style={{ color: '#255625', marginBottom: '20px' }} 
        />
        <p>Para agregar "Fundamentos de Logística" al carrito</p>
        <p>Necesitas tener una cuenta para poder agregar cursos al carrito y realizar compras.</p>
        
        <div className="d-grid gap-2">
          <Button 
            variant="primary" 
            onClick={onLogin}
            style={{
              backgroundColor: '#255625',
              borderColor: '#255625',
              fontWeight: '500'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#214A21';
              e.target.style.borderColor = '#214A21';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#255625';
              e.target.style.borderColor = '#255625';
            }}
          >
            👤 Iniciar Sesión
          </Button>
          
          <Button 
            variant="outline-primary" 
            onClick={onRegister}
            style={{
              color: '#255625',
              borderColor: '#255625',
              backgroundColor: 'transparent'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#255625';
              e.target.style.color = 'white';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#255625';
            }}
          >
            👥 Crear Cuenta
          </Button>
        </div>
        
        <div className="mt-3">
          <small>¿Ya tienes cuenta? <a href="#" onClick={onLogin} style={{ color: '#255625' }}>Inicia sesión aquí</a></small>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AuthModal;