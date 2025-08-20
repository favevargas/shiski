import { useState } from 'react';
import styles from './LoginForm.module.css';

export default function LoginForm({ onSubmit, submitText = 'Entrar', loading = false }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  
  const validateField = (name, value) => {
    const newErrors = { ...errors };
    
    switch (name) {
      case 'email':
        if (!value.trim()) {
          newErrors.email = 'El email es requerido';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          newErrors.email = 'Email inválido';
        } else {
          delete newErrors.email;
        }
        break;
      case 'password':
        if (!value) {
          newErrors.password = 'La contraseña es requerida';
        } else if (value.length < 4) {
          newErrors.password = 'Mínimo 4 caracteres';
        } else {
          delete newErrors.password;
        }
        break;
    }
    
    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validar todos los campos antes de enviar
    validateField('email', form.email);
    validateField('password', form.password);
    
    // Solo enviar si no hay errores
    if (Object.keys(errors).length === 0) {
      onSubmit?.({ email: form.email.trim(), password: form.password });
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="needs-validation">
      <div className="form-floating mb-3">
        <input
          type="email"
          className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`}
          id="login_email"
          placeholder="Email"
          required
          value={form.email}
          onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
          onBlur={() => {
            setTouched(t => ({ ...t, email: true }));
            validateField('email', form.email);
          }}
        />
        <label htmlFor="login_email">Email</label>
        {errors.email && touched.email && (
          <div className="invalid-feedback">{errors.email}</div>
        )}
      </div>

      <div className="form-floating mb-4">
        <input
          type="password"
          className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`}
          id="login_password"
          placeholder="Contraseña"
          required
          value={form.password}
          onChange={(e) => setForm(f => ({ ...f, password: e.target.value }))}
          onBlur={() => {
            setTouched(t => ({ ...t, password: true }));
            validateField('password', form.password);
          }}
        />
        <label htmlFor="login_password">Contraseña</label>
        {errors.password && touched.password && (
          <div className="invalid-feedback">{errors.password}</div>
        )}
      </div>

      <button 
        type="submit" 
        className={`btn w-100 py-2 ${styles.customLoginBtn}`}
        disabled={loading || Object.keys(errors).length > 0}
      >
        {submitText}
      </button>
    </form>
  );
}
