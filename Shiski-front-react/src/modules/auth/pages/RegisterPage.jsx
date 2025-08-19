import { useState } from "react";
import AlertBox from '../../layouts/AlertBox';
import { useAuth } from "../hook/useAuth";
import { useNavigate, Link } from "react-router-dom";
import styles from "../components/RegisterForm.module.css"
export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ nombre: '', email: '', password: '', confirm: '' });   
  const [alert, setAlert] = useState({ show: false, msg: '', variant: 'success' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password.length < 4) {
      setAlert({ show: true, msg: 'La contraseña debe tener al menos 4 caracteres.', variant: 'danger' });
      return;
    }
    if (form.password !== form.confirm) {
      setAlert({ show: true, msg: 'Las contraseñas no coinciden.', variant: 'danger' });
      return;
    }
    
    try{

     // Enviar los datos correctos al backend
    const userData = {
        nombre: form.nombre.trim(),
        email: form.email.trim(),
        password: form.password
      };

    await register(userData);
      setAlert({ show: true, msg: 'Registro exitoso 🎉', variant: 'success' });
      setTimeout(() => navigate('/'), 1000);
    } catch (error) {
      setAlert({ show: true, msg: error.message || 'No se pudo registrar', variant: 'danger' });
    }
  }; 

  return (
    <>
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
                <h1 className="h4 mb-4 text-center">Crear cuenta</h1>

                <form onSubmit={handleSubmit} noValidate className="needs-validation">
                  {/* ✅ CAMBIO 4: Campo para nombre */}
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="reg_nombre"
                      placeholder="Nombre completo"
                      required
                      value={form.nombre}
                      onChange={(e) => setForm(f => ({ ...f, nombre: e.target.value }))}
                    />
                    <label htmlFor="reg_nombre">Nombre completo</label>
                  </div>

                  {/* ✅ CAMBIO 5: Campo para email */}
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="reg_email"
                      placeholder="Correo electrónico"
                      required
                      value={form.email}
                      onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                    />
                    <label htmlFor="reg_email">Correo electrónico</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="reg_password"
                      placeholder="Contraseña"
                      required
                      value={form.password}
                      onChange={(e) => setForm(f => ({ ...f, password: e.target.value }))}
                    />
                    <label htmlFor="reg_password">Contraseña</label>
                  </div>

                  <div className="form-floating mb-4">
                    <input
                      type="password"
                      className="form-control"
                      id="reg_confirm"
                      placeholder="Confirmar contraseña"
                      required
                      value={form.confirm}
                      onChange={(e) => setForm(f => ({ ...f, confirm: e.target.value }))}
                    />
                    <label htmlFor="reg_confirm">Confirmar contraseña</label>
                  </div>

                  <button type="submit" className={`btn w-100 py-2 ${styles.customRegisterBtn}`}> Registrarse </button>
                </form>

                <p className="mt-3 mb-0 text-center text-body-secondary">
                  ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
