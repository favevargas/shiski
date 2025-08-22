import { Link } from "react-router-dom";
import { FaTruck, FaWarehouse, FaChartLine, FaUserTie, FaArrowRight, FaStar } from "react-icons/fa";
import { useState, useEffect } from 'react';
import cursoService from '../../api/services/cursoService';

const BLOG_POSTS = [
  {
    id: 1,
    title: "Las 5 Tendencias Clave que Están Revolucionando la Logística en 2023",
    excerpt: "Descubre las innovaciones tecnológicas y estratégicas que están transformando el sector logístico este año.",
    category: "Tendencias",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: 2,
    title: "Cómo Optimizar la Última Milla en Entornos Urbanos",
    excerpt: "Estrategias efectivas para mejorar la eficiencia en la entrega de última milla en ciudades congestionadas.",
    category: "Operaciones",
    image: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1175&q=80"
  },
  {
    id: 3,
    title: "Logística Verde: El Futuro del Transporte Sostenible",
    excerpt: "Cómo implementar prácticas sostenibles en tu cadena de suministro sin sacrificar la eficiencia.",
    category: "Sostenibilidad",
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  }
];

const TESTIMONIALS = [
  {
    id: 1,
    content: "La capacitación de Shiski ha transformado por completo nuestras operaciones logísticas. El equipo ahora maneja los procesos con mayor eficiencia y precisión.",
    name: "Carlos Méndez",
    position: "Director de Operaciones - Logística Express",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5
  },
  {
    id: 2,
    content: "Los cursos especializados nos permitieron reducir costos operativos en un 23% y mejorar nuestros tiempos de entrega. Totalmente recomendado.",
    name: "María Gómez",
    position: "Gerente de Logística - TransCargo",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5
  },
  {
    id: 3,
    content: "La metodología práctica y los instructores con experiencia real en el sector hacen que estos cursos sean extremadamente valiosos para cualquier empresa de transporte.",
    name: "Javier Torres",
    position: "CEO - Distribuidora Nacional",
    avatar: "https://randomuser.me/api/portraits/men/62.jpg",
    rating: 5
  }
];

export default function Main() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await cursoService.getAllCursos();
        setCourses(data);
        setError(null);
      } catch (error) {
        console.error('Error al obtener cursos:', error);
        setError('Error al cargar los cursos');
        // Usar datos de respaldo en caso de error
        setCourses([
          {id:1, titulo: "Gestión de Cadena de Suministro", precio: 79990, imagenMiniatura: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'},
          {id:2, titulo: "Logística Internacional", precio: 89990, imagenMiniatura: 'https://mecaluxmx.cdnwm.com/img/blog/logistica-internacional.1.12.jpg'},
          {id:3, titulo: "Optimización de Rutas", precio: 69990, imagenMiniatura: 'https://duyou.com.mx/wp-content/uploads/2023/07/logistica-transporte-buques-carga-contenedores-aviones-carga-puente-grua-funcionamiento-astillero-al-amanecer-antecedentes-logisticos-industria-importacion-exportacion-transporte-ai-generativo-1-scaled.jpg'}
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return(
    <>
      {/* Servicios */}
      <section className="services-section">
        <div className="container">
          <h2 className="section-title">Áreas de Especialización</h2>
          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="service-card">
                <div className="service-icon">
                  <FaTruck />
                </div>
                <h3 className="service-title">Flota de Autotransporte</h3>
                <p className="service-description">Optimiza la gestión de tu flota con nuestros cursos especializados en transporte terrestre.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="service-card">
                <div className="service-icon">
                  <FaWarehouse />
                </div>
                <h3 className="service-title">Logística de Almacén</h3>
                <p className="service-description">Mejora la eficiencia de tus almacenes con técnicas avanzadas de gestión y organización.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="service-card">
                <div className="service-icon">
                  <FaChartLine />
                </div>
                <h3 className="service-title">Análisis de Operaciones</h3>
                <p className="service-description">Toma decisiones basadas en datos con nuestros cursos de análisis operativo y KPIs.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="service-card">
                <div className="service-icon">
                  <FaUserTie />
                </div>
                <h3 className="service-title">Gestión de Personal</h3>
                <p className="service-description">Desarrolla las habilidades de liderazgo necesarias para gestionar equipos logísticos.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cursos */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="section-title">Cursos destacados</h2>
          {loading && <div className="text-center">Cargando cursos...</div>}
          {error && <div className="alert alert-warning text-center">{error}</div>}
          <div className="row g-4">
            {courses.map(course => (
              <div className="col-md-6 col-lg-4" key={course.id}>
                <div className="card h-100 shadow-sm blog-card">
                  <div className="blog-image">
                    <img src={course.imagenMiniatura || course.img} alt={course.titulo || course.name} />
                  </div>
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{course.titulo || course.name}</h5>
                    <p className="card-text text-success fw-bold mb-4">${(course.precio || course.price).toLocaleString('es-CL')}</p>
                    <Link to={`/courses/${course.id}`} className="btn btn-view-details mt-auto">Ver detalles</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link to="/courses" className="btn btn-add-cart">Ver todos los cursos</Link>
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="blog-section">
        <div className="container">
          <h2 className="section-title">Blog</h2>
          <div className="row g-4">
            {BLOG_POSTS.map(post => (
              <div className="col-md-6 col-lg-4" key={post.id}>
                <div className="blog-card">
                  <div className="blog-image">
                    <img src={post.image} alt={post.title} />
                  </div>
                  <div className="blog-content">
                    <span className="blog-category">{post.category}</span>
                    <h3 className="blog-title">{post.title}</h3>
                    <p className="blog-excerpt">{post.excerpt}</p>
                    <Link to={`/blog/${post.id}`} className="blog-link">
                      Leer más <FaArrowRight />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title">Lo que dicen nuestros clientes</h2>
          <div className="row g-4">
            {TESTIMONIALS.map(testimonial => (
              <div className="col-md-6 col-lg-4" key={testimonial.id}>
                <div className="testimonial-card">
                  <div className="testimonial-rating">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="star-filled" />
                    ))}
                  </div>
                  <p className="testimonial-content">"{testimonial.content}"</p>
                  <div className="testimonial-author">
                    <img src={testimonial.avatar} alt={testimonial.name} className="author-avatar" />
                    <div className="author-info">
                      <h4 className="author-name">{testimonial.name}</h4>
                      <p className="author-position">{testimonial.position}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">Impulsa el éxito de tu Negocio con Programas de Formación Exclusivos</h2>
          <p className="cta-description">
            Accede a los contenidos de la mejor formación en logística y transporte diseñados específicamente para empresas como la tuya. Optimiza procesos, reduce costos y mejora la eficiencia operativa.
          </p>
          <Link to="/business" className="btn btn-cta-home">Solicitar información</Link>
        </div>
      </section>
    </>
  )
}
