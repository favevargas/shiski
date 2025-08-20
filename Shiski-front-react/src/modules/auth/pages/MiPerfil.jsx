import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';

export default function MiPerfil() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  
  const [form, setForm] = useState({
    nombre: user?.nombre || '',
    email: user?.email || '',
    telefono: user?.telefono || '',
  });

  // ✅ AGREGADO: Datos simulados para cursos y compras
  const [cursos] = useState([
    { nombre: 'Introducción al Esquí', progreso: 85, certificado: false },
    { nombre: 'Técnicas Avanzadas', progreso: 100, certificado: true },
    { nombre: 'Esquí de Montaña', progreso: 45, certificado: false }
  ]);

  const [compras] = useState([
    { nombre: 'Curso Básico de Esquí', tipo: 'Curso', fecha: '2024-01-15' },
    { nombre: 'Equipo Completo', tipo: 'Equipo', fecha: '2024-02-20' }
  ]);

  // ✅ AGREGADO: Funciones faltantes
  const handleEdit = () => {
    setEdit(true);
  };

  const handleSave = () => {
    // console.log('Guardando datos:', form); // ✅ Remover esta línea
    setForm({
      nombre: user?.nombre || '',
      email: user?.email || '',
      telefono: user?.telefono || '',
    });
    setEdit(false);
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
                  <p><b>Nombre:</b> {user?.nombre}</p>
                  <p><b>Email:</b> {user?.email}</p>
                  <p><b>Teléfono:</b> {user?.telefono || 'No especificado'}</p>
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
