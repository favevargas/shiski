import { Link } from "react-router-dom";


export default function Hero() {
  return (
    <section className="bg-light py-5 border-bottom">
      <div className="container py-4">
        <div className="row align-items-center g-4">
          <div className="col-lg-7">
            <h1 className="display-5 fw-bold">Bienvenido a <span className="text-primary">Shiski</span></h1>
            <p className="lead mb-4">UNA SOLUCIÓN PARA TU EMPRESA</p>
            <Link to="/courses" className="btn btn-primary btn-lg">Conoce nuestros cursos</Link>
          </div>
          <div className="col-lg-5">
            <div className="rounded-3 border bg-white p-4 text-center">
              <p className="mb-0">Solicita una cotización</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
