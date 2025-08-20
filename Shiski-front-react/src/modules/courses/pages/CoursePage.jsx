import { useState, useEffect } from 'react';
import CourseList from '../components/CourseList.jsx';
import ApiError from '../../common/ApiError';
import cursoService from '../../api/services/cursoService';
import '../styles/Course.css';
import { FaSearch, FaFilter } from 'react-icons/fa';

export default function CoursePage() {
    const [cursos, setCursos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const fetchCursos = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await cursoService.getAllCursos();
            setCursos(data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCursos();
    }, []);
    
    return (
        <div className="courses-page">
            <div className="container">
                <div className="courses-header">
                    <h1>Explora Nuestros Cursos</h1>
                    <p className="courses-subtitle">Descubre nuestra selección de cursos diseñados para mejorar tus habilidades y conocimientos en logística y gestión de inventarios.</p>
                </div>
                
                {loading ? (
                    <div className="text-center my-5">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Cargando...</span>
                        </div>
                    </div>
                ) : (
                    <>
                        <ApiError error={error} />
                        
                        <div className="row">
                            <div className="col-lg-3 mb-4">
                                <div className="courses-filter">
                                    <h4 className="filter-title">Filtros</h4>
                                    
                                    <div className="filter-group">
                                        <label className="filter-label">Buscar</label>
                                        <div className="input-group">
                                            <input type="text" className="form-control" placeholder="Nombre del curso..." />
                                            <button className="btn btn-outline-secondary" type="button">
                                                <FaSearch />
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div className="filter-group">
                                        <label className="filter-label">Categoría</label>
                                        <select className="form-select">
                                            <option value="">Todas las categorías</option>
                                            <option value="logistica">Logística</option>
                                            <option value="inventarios">Inventarios</option>
                                            <option value="transporte">Transporte</option>
                                        </select>
                                    </div>
                                    
                                    <div className="filter-group">
                                        <label className="filter-label">Precio</label>
                                        <select className="form-select">
                                            <option value="">Todos los precios</option>
                                            <option value="0-10000">Hasta $10.000</option>
                                            <option value="10000-20000">$10.000 - $20.000</option>
                                            <option value="20000+">Más de $20.000</option>
                                        </select>
                                    </div>
                                    
                                    <button className="btn btn-apply-filters w-100 mt-3" onClick={fetchCursos}>
                                        <FaFilter className="me-2" /> Aplicar Filtros
                                    </button>
                                </div>
                            </div>
                            
                            <div className="col-lg-9">
                                {/* Pasar cursos como props a CourseList */}
                                <CourseList cursos={cursos} />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}