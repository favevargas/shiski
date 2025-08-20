import { useState } from 'react';
import AlertBox from '../../layouts/AlertBox';  
import LoginForm from '../components/LoginForm';
import { useAuth } from '../hook/useAuth';
import { useNavigate, Link } from 'react-router-dom';  

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [alert, setAlert] = useState({ show: false, msg: '', variant: 'success' });
  const [loading, setLoading] = useState(false);

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    try {
      const data = await login({ email, password });
      setAlert({ show: true, msg: 'Bienvenido/a 👋', variant: 'success' });
      setTimeout(() => {
        navigate('/mi-perfil');
      }, 1000);
    } catch (error) {
      setAlert({ 
        show: true, 
        msg: error.response?.data?.message || 'Email o contraseña inválidos.', 
        variant: 'danger' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">

          <AlertBox
            show={alert.show}
            variant={alert.variant}
            message={alert.msg}
            onClose={() => setAlert(a => ({ ...a, show: false }))}
          />

          <div className="card shadow-sm">
            <div className="card-body p-4 p-md-5">
              <h1 className="h4 mb-4 text-center">Iniciar Sesión</h1>

              <LoginForm 
                onSubmit={handleLogin} 
                submitText={loading ? 'Iniciando...' : 'Entrar'}
                loading={loading} // ✅ Cambiar de 'disabled' a 'loading'
              />

              <p className="mt-3 mb-0 text-center text-body-secondary">
                ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
              </p>

              <div className="mt-3 small text-body-secondary">
                <strong></strong> usuario: <code>demo</code> - pass: <code>1234</code>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
