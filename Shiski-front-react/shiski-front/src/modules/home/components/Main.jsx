const MOCK = [
    {id:1, name: "Curso de logística 1", price: 15990, img: 'https://static.vecteezy.com/system/resources/thumbnails/020/173/246/small_2x/smart-logistics-global-business-and-warehouse-technology-management-system-concept-businessman-using-tablet-control-delivery-network-distribution-import-export-double-exposure-future-transportation-photo.jpg'},
    {id:2, name: "Curso de logística 2", price: 15990, img: 'https://mecaluxmx.cdnwm.com/img/blog/logistica-internacional.1.12.jpg'},
    {id:3, name: "Curso de logística 3", price: 15990, img: 'https://duyou.com.mx/wp-content/uploads/2023/07/logistica-transporte-buques-carga-contenedores-aviones-carga-puente-grua-funcionamiento-astillero-al-amanecer-antecedentes-logisticos-industria-importacion-exportacion-transporte-ai-generativo-1-scaled.jpg'},
]

export default function Main() {
    return(
    <section className="py-5">
      <div className="container">
        <h2 className="h3 mb-4">Cursos destacados</h2>
        <div className="row g-4">
          {MOCK.map(p => (
            <div className="col-12 col-sm-6 col-lg-4" key={p.id}>
              <div className="card h-100 shadow-sm">
                <img src={p.img} className="card-img-top" alt={p.name} />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text text-body-secondary mb-4">${p.price.toLocaleString('es-CL')}</p>
                  <button className="btn btn-outline-primary mt-auto">Detalle del curso</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    )
}
