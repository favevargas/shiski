import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';
import usuarioService from '../../api/services/usuarioService';
import LoadingSpinner from '../../layouts/components/LoadingSpinner';
import Toast from '../../layouts/components/Toast';
import useLoadingWithTimeout from '../../layouts/hook/useLoadingWithTimeout';

export default function MiPerfil() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const [inscripciones, setInscripciones] = useState([]);
  const [toast, setToast] = useState({ show: false, variant: 'info', title: '', message: '' });
  
  const { loading, progress, showTimeout, startLoading, stopLoading } = useLoadingWithTimeout();
  
  const [form, setForm] = useState({
    nombre: user?.nombre || '',
    email: user?.email || '',
    telefono: user?.telefono || '',
  });

  // Datos simulados para cursos y compras
  const [cursos] = useState([
    { nombre: 'Introducción al Esquí', progreso: 85, certificado: false },
    { nombre: 'Técnicas Avanzadas', progreso: 100, certificado: true },
    { nombre: 'Esquí de Montaña', progreso: 45, certificado: false }
  ]);

  const [compras] = useState([
    { nombre: 'Curso Básico de Esquí', tipo: 'Curso', fecha: '2024-01-15' },
    { nombre: 'Equipo Completo', tipo: 'Equipo', fecha: '2024-02-20' }
  ]);

  // Cargar perfil del usuario
  useEffect(() => {
    const cargarPerfil = async () => {
      if (!user) return;
      
      startLoading();
      setToast({
        show: true,
        variant: 'loading',
        title: 'Cargando perfil',
        message: 'Obteniendo información del usuario...'
      });
      
      try {
        // Usar la función correcta del usuarioService
        const perfilData = await usuarioService.getUserProfile();
        
        // Actualizar el formulario con los datos del perfil
        setForm({
          nombre: perfilData.nombre || user.nombre || '',
          email: perfilData.email || user.email || '',
          telefono: perfilData.telefono || '',
        });
        
        setToast({
          show: true,
          variant: 'success',
          title: 'Perfil cargado',
          message: 'Información cargada correctamente'
        });
      } catch (error) {
        console.error('Error al cargar perfil:', error);
        setToast({
          show: true,
          variant: 'error',
          title: 'Error',
          message: 'No se pudo cargar la información del perfil'
        });
      } finally {
        stopLoading();
      }
    };

    cargarPerfil();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    
    startLoading();
    setToast({
      show: true,
      variant: 'loading',
      title: 'Guardando',
      message: 'Actualizando tu perfil...'
    });
    
    try {
      // Usar la función correcta del usuarioService
      await usuarioService.updateUserProfile(form);
      setEdit(false);
      
      setToast({
        show: true,
        variant: 'success',
        title: 'Perfil actualizado',
        message: 'Tus datos se guardaron correctamente'
      });
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      setToast({
        show: true,
        variant: 'error',
        title: 'Error',
        message: 'No se pudo actualizar tu perfil'
      });
    } finally {
      stopLoading();
    }
  };

  const handleEdit = () => {
    setEdit(true);
  };

  const handleCancel = () => {
    setForm({
      nombre: user?.nombre || '',
      email: user?.email || '',
      telefono: user?.telefono || '',
    });
    setEdit(false);
  };

  const handleLogout = () => {
    if (window.confirm('¿Estás seguro que deseas cerrar sesión?')) {
      logout();
      navigate('/');
    }
  };

  return (
    <div className="container py-5 position-relative">
      {/* Renderizar LoadingSpinner cuando esté cargando */}
      {loading && (
        <LoadingSpinner 
          progress={progress}
          message={showTimeout ? "La operación está tomando más tiempo del esperado..." : "Cargando información del perfil..."}
          overlay={true}
        />
      )}
      
      {/* Renderizar Toast para notificaciones */}
      {toast.show && (
        <Toast
          variant={toast.variant}
          title={toast.title}
          message={toast.message}
          onClose={() => setToast({ ...toast, show: false })}
          position="top-right"
          autoClose={toast.variant !== 'loading'}
        />
      )}
      
      <button
        className="btn btn-outline-danger position-absolute end-0 top-0 mt-3 me-3"
        style={{ minWidth: 120 }}
        onClick={handleLogout}
      >
        Cerrar sesión
      </button>
      <h1 className="mb-4">Mi Perfil</h1>
      <div className="accordion" id="perfilAccordion">
        {/* Información personal */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingInfo">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseInfo" aria-expanded="true" aria-controls="collapseInfo">
              Información Personal
            </button>
          </h2>
          <div id="collapseInfo" className="accordion-collapse collapse show" aria-labelledby="headingInfo" data-bs-parent="#perfilAccordion">
            <div className="accordion-body">
              {edit ? ( 
                <>
                  <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input className="form-control" value={form.nombre} onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input className="form-control" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Teléfono</label>
                    <input className="form-control" value={form.telefono} onChange={e => setForm(f => ({ ...f, telefono: e.target.value }))} />
                  </div>
                  <button className="btn btn-cta-home me-2" onClick={handleSave}>Guardar</button>
                  <button className="btn btn-secondary" onClick={handleCancel}>Cancelar</button>
                </>
              ) : (
                <>
                  <p><b>Nombre:</b> {form.nombre || user?.nombre}</p>
                  <p><b>Email:</b> {form.email || user?.email}</p>
                  <p><b>Teléfono:</b> {form.telefono || 'No especificado'}</p>
                  <button className="btn btn-cta-home" onClick={handleEdit}>Editar</button>
                </>
              )}
            </div>
          </div>
        </div>
        {/* Progreso en cursos */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingProgreso">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseProgreso" aria-expanded="false" aria-controls="collapseProgreso">
              Progreso en Cursos
            </button>
          </h2>
          <div id="collapseProgreso" className="accordion-collapse collapse" aria-labelledby="headingProgreso" data-bs-parent="#perfilAccordion">
            <div className="accordion-body">
              {cursos.map((c, i) => (
                <div key={i} className="mb-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <span><b>{c.nombre}</b></span>
                    <span>{c.progreso}%</span>
                  </div>
                  <div className="progress" style={{ height: 18 }}>
                    <div className="progress-bar bg-success" role="progressbar" style={{ width: `${c.progreso}%` }} aria-valuenow={c.progreso} aria-valuemin={0} aria-valuemax={100}></div>
                  </div>
                  {c.certificado && <span className="badge bg-success mt-2">Certificado obtenido</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Certificaciones */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingCert">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseCert" aria-expanded="false" aria-controls="collapseCert">
              Certificaciones
            </button>
          </h2>
          <div id="collapseCert" className="accordion-collapse collapse" aria-labelledby="headingCert" data-bs-parent="#perfilAccordion">
            <div className="accordion-body">
              {cursos.filter(c => c.certificado).length === 0 ? (
                <p>No tienes certificaciones aún.</p>
              ) : (
                <ul>
                  {cursos.filter(c => c.certificado).map((c, i) => (
                    <li key={i}>{c.nombre} - <span className="badge bg-success">Certificado</span></li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        {/* Historial de compras */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingHistorial">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseHistorial" aria-expanded="false" aria-controls="collapseHistorial">
              Historial de Compra
            </button>
          </h2>
          <div id="collapseHistorial" className="accordion-collapse collapse" aria-labelledby="headingHistorial" data-bs-parent="#perfilAccordion">
            <div className="accordion-body">
              {compras.length === 0 ? (
                <p>No tienes compras registradas.</p>
              ) : (
                <ul>
                  {compras.map((c, i) => (
                    <li key={i}>{c.nombre} <span className="badge bg-secondary ms-2">{c.tipo}</span> <span className="ms-2">{c.fecha}</span></li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
