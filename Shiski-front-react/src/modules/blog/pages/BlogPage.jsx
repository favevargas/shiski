import React from 'react';
import '../../blog/styles/Blog.css';

const BlogPage = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'Las 5 Tendencias Clave que Están Revolucionando la Logística en 2023',
      excerpt: 'Descubre las innovaciones tecnológicas y estratégicas que están transformando el sector logístico este año y cómo prepararte para aprovecharlas.',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      date: '15 de agosto, 2023',
      author: 'Carlos Méndez',
      category: 'Tendencias',
      content: `
        <p>La logística y el transporte están experimentando una transformación sin precedentes impulsada por avances tecnológicos y nuevos modelos operativos. En 2023, cinco tendencias principales están redefiniendo el panorama del sector:</p>
        
        <h3>1. Automatización y Robótica Avanzada</h3>
        <p>Los almacenes inteligentes están adoptando robots autónomos para tareas de picking, empaquetado y clasificación. Empresas como Amazon y DHL han reportado aumentos de eficiencia de hasta un 30% tras implementar estas tecnologías. La automatización ya no es exclusiva de grandes corporaciones; soluciones escalables están llegando a empresas medianas.</p>
        
        <h3>2. Logística Verde y Sostenible</h3>
        <p>La presión regulatoria y la conciencia ambiental están impulsando prácticas sostenibles. Flotas eléctricas, embalajes biodegradables y optimización de rutas para reducir emisiones son ahora prioridades estratégicas. Las empresas que adoptan estas prácticas no solo cumplen normativas, sino que también reducen costos operativos a largo plazo.</p>
        
        <h3>3. Inteligencia Artificial en la Cadena de Suministro</h3>
        <p>Los algoritmos predictivos están revolucionando la planificación logística. Desde la previsión de demanda hasta la gestión de inventario y mantenimiento predictivo, la IA está permitiendo decisiones más precisas y ágiles. Los sistemas de IA pueden anticipar disrupciones y recomendar ajustes en tiempo real.</p>
        
        <h3>4. Logística de Última Milla Reinventada</h3>
        <p>El comercio electrónico sigue transformando las expectativas de entrega. Drones, vehículos autónomos y puntos de recogida inteligentes están redefiniendo la última milla. Las empresas están adoptando modelos híbridos que combinan eficiencia con personalización para satisfacer las demandas de los consumidores.</p>
        
        <h3>5. Blockchain para Trazabilidad Total</h3>
        <p>La tecnología blockchain está proporcionando transparencia sin precedentes en la cadena de suministro. Desde la autenticación de productos hasta la verificación de condiciones de transporte, esta tecnología está creando cadenas de suministro a prueba de manipulaciones y más eficientes.</p>
        
        <p>Las empresas que adopten estas tendencias no solo sobrevivirán sino que prosperarán en el nuevo panorama logístico. La clave está en la implementación estratégica y la capacitación continua del personal para maximizar el retorno de estas inversiones tecnológicas.</p>
      `
    },
    {
      id: 2,
      title: 'Optimización de Rutas: Cómo Reducir Costos y Emisiones en tu Flota',
      excerpt: 'Estrategias prácticas y herramientas tecnológicas para optimizar las rutas de transporte, reduciendo costos operativos y el impacto ambiental.',
      image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1175&q=80',
      date: '28 de julio, 2023',
      author: 'Laura Sánchez',
      category: 'Operaciones',
      content: ''
    },
    {
      id: 3,
      title: 'El Impacto de la Inteligencia Artificial en la Gestión de Almacenes',
      excerpt: 'Análisis detallado de cómo la IA está transformando la gestión de inventarios, predicción de demanda y operaciones de almacenamiento.',
      image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      date: '10 de julio, 2023',
      author: 'Miguel Torres',
      category: 'Tecnología',
      content: ''
    }
  ];

  return (
    <div className="blog-container">
      <div className="blog-header">
        <h1>Blog</h1>
        <p>Conocimientos, tendencias y noticias sobre logística y transporte</p>
      </div>

      <div className="featured-post">
        <div className="featured-image">
          <img src={blogPosts[0].image} alt={blogPosts[0].title} />
        </div>
        <div className="featured-content">
          <div className="post-meta">
            <span className="post-category">{blogPosts[0].category}</span>
            <span className="post-date">{blogPosts[0].date}</span>
          </div>
          <h2>{blogPosts[0].title}</h2>
          <p className="post-excerpt">{blogPosts[0].excerpt}</p>
          <div className="post-author">
            <span>Por {blogPosts[0].author}</span>
          </div>
          <button className="btn btn-primary">Leer más</button>
        </div>
      </div>

      <div className="blog-posts">
        <h2>Artículos Recientes</h2>
        <div className="posts-grid">
          {blogPosts.slice(1).map(post => (
            <div key={post.id} className="post-card">
              <div className="post-image">
                <img src={post.image} alt={post.title} />
              </div>
              <div className="post-content">
                <div className="post-meta">
                  <span className="post-category">{post.category}</span>
                  <span className="post-date">{post.date}</span>
                </div>
                <h3>{post.title}</h3>
                <p className="post-excerpt">{post.excerpt}</p>
                <div className="post-footer">
                  <span className="post-author">Por {post.author}</span>
                  <button className="btn btn-sm btn-outline-primary">Leer más</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="blog-categories">
        <h2>Categorías</h2>
        <div className="categories-grid">
          <div className="category-card">
            <i className="bi bi-graph-up-arrow"></i>
            <h3>Tendencias</h3>
            <p>Últimas tendencias en el sector logístico y de transporte</p>
          </div>
          <div className="category-card">
            <i className="bi bi-gear"></i>
            <h3>Operaciones</h3>
            <p>Mejores prácticas para optimizar operaciones logísticas</p>
          </div>
          <div className="category-card">
            <i className="bi bi-cpu"></i>
            <h3>Tecnología</h3>
            <p>Innovaciones tecnológicas que transforman la industria</p>
          </div>
          <div className="category-card">
            <i className="bi bi-people"></i>
            <h3>Recursos Humanos</h3>
            <p>Gestión de talento en el sector logístico</p>
          </div>
        </div>
      </div>

      <div className="newsletter-section">
        <h2>Suscríbete a nuestro newsletter</h2>
        <p>Recibe los últimos artículos y noticias directamente en tu bandeja de entrada</p>
        <form className="newsletter-form">
          <div className="input-group mb-3">
            <input type="email" className="form-control" placeholder="Tu correo electrónico" aria-label="Email" />
            <button className="btn btn-primary" type="submit">Suscribirse</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogPage;