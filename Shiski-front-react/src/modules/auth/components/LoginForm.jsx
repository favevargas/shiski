import { useState } from 'react';
import styles from './LoginForm.module.css';

export default function LoginForm({ onSubmit, submitText = 'Entrar' }) {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.({ email: form.email.trim(), password: form.password });
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="needs-validation">
      <div className="form-floating mb-3">
        <input
          type="email"
          className="form-control"
          id="login_email"
          placeholder="Email"
          required
          value={form.email}
          onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
        />
        <label htmlFor="login_email">Email</label>
      </div>

      <div className="form-floating mb-4">
        <input
          type="password"
          className="form-control"
          id="login_password"
          placeholder="Contraseña"
          required
          value={form.password}
          onChange={(e) => setForm(f => ({ ...f, password: e.target.value }))}
        />
        <label htmlFor="login_password">Contraseña</label>
      </div>

  <button type="submit" className={`btn w-100 py-2 ${styles.customLoginBtn}`}>{submitText}</button>
    </form>
  );
}
