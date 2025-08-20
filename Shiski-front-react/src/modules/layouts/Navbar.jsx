import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/hook/useAuth'; 
import NavbarCart from './NavbarCart';
import "../../../src/index.css";

export default function Navbar() {

  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container">
        <Link className="navbar-brand fw-semibold" to="/">Shiski</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
          data-bs-target="#nav" aria-controls="nav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')} to="/">Inicio</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')} to="/courses">Cursos</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')} to="/about-us">Nosotros</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')} to="/business">Para Empresas</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')} to="/blog">Blog</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')} to="/contact">Contacto</NavLink>
            </li>
            <li className="nav-item">
              <div className="nav-link">
                <NavbarCart />
              </div>
            </li>

            {!isAuthenticated ? (
              <>
                <li className="nav-item">
                  <NavLink className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')} to="/login">Login</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')} to="/register">Registro</NavLink>
                </li>
              </>
            ) : (
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle d-flex align-items-center btn btn-link text-white border-0 bg-transparent"
                  id="userMenu"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  aria-haspopup="true"
                  aria-label={`Menú de usuario para ${user?.nombre}`}
                  style={{ textDecoration: 'none' }}
                >
                  <span className="me-2">Hola, {user?.nombre}</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userMenu" role="menu">
                  <li role="none"><span className="dropdown-item-text text-muted" role="menuitem">Mi cuenta</span></li>
                  <li role="none"><hr className="dropdown-divider" /></li>
                  <li role="none">
                    <button 
                      className="dropdown-item" 
                      onClick={() => navigate('/mi-perfil')}
                      role="menuitem"
                      tabIndex="0"
                    >
                      <i className="bi bi-person me-2" aria-hidden="true"></i>
                      Información
                    </button>
                  </li>
                  <li role="none">
                    <button 
                      className="dropdown-item text-danger" 
                      onClick={handleLogout}
                      role="menuitem"
                      tabIndex="0"
                    >
                      <i className="bi bi-box-arrow-right me-2" aria-hidden="true"></i>
                      Cerrar sesión
                    </button>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
