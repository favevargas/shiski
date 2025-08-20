import { useState } from 'react';
import styles from './RegisterForm.module.css';

export default function RegisterForm({ onSubmit, submitText = 'Registrarse' }) {
  const [form, setForm] = useState({ nombre: '', email: '', password: '', confirm: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      // Manejar error de confirmación
      return;
    }
    // Enviar solo los campos que espera el backend
    onSubmit?.({
      nombre: form.nombre.trim(),
      email: form.email.trim(),
      password: form.password
    });
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="needs-validation">
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="reg_username"
          placeholder="Usuario"
          required
          value={form.username}
          onChange={(e) => setForm(f => ({ ...f, username: e.target.value }))}
        />
        <label htmlFor="reg_username">Usuario</label>
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

      <button type="submit" className={`btn w-100 py-2 ${styles.customRegisterBtn}`}>{submitText}</button>
    </form>
  );
}
