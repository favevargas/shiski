import { useState, useEffect } from 'react';
import CourseList from '../components/CourseList.jsx';
import ApiError from '../../common/ApiError';
import cursoService from '../../api/services/cursoService';
import LoadingSpinner from '../../layouts/components/LoadingSpinner';
import Toast from '../../layouts/components/Toast';
import useLoadingWithTimeout from '../../layouts/hook/useLoadingWithTimeout';
import '../styles/Course.css';
import { FaSearch, FaFilter } from 'react-icons/fa';

export default function CoursePage() {
    const [cursos, setCursos] = useState([]);
    const [filteredCursos, setFilteredCursos] = useState([]);
    const [error, setError] = useState(null);
    const [toast, setToast] = useState({ show: false, variant: 'info', title: '', message: '' });
    
    const { loading, progress, showTimeout, startLoading, stopLoading } = useLoadingWithTimeout();

    //Estados para filtros
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('');  
    const [selectedPriceRange, setSelectedPriceRange] = useState('');

    //Estados para paginación
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    
    const fetchCursos = async () => {
        startLoading();
        setError(null);
        
        // Mostrar toast informativo
        setToast({
            show: true,
            variant: 'loading',
            title: 'Cargando cursos',
            message: 'Obteniendo la lista de cursos disponibles...'
        });
        
        try {
            const data = await cursoService.getAllCursos();
            setCursos(data);
            setFilteredCursos(data);
            
            setToast({
                show: true,
                variant: 'success',
                title: 'Cursos cargados',
                message: `Se cargaron ${data.length} cursos exitosamente`
            });
        } catch (err) {
            setError(err);
            setToast({
                show: true,
                variant: 'error',
                title: 'Error al cargar',
                message: 'No se pudieron cargar los cursos. Intenta nuevamente.',
                autoClose: false
            });
        } finally {
            stopLoading();
        }
    };

    //Función para aplicar filtros
    const applyFilters = () => {   
        let filtered = [...cursos];

        //filtro por búsqueda
        if (searchTerm) {
            filtered = filtered.filter(curso =>
                curso.titulo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                curso.name?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

    //filtro por categoría
        if (selectedCategory) {
            filtered = filtered.filter(curso => 
                curso.categoria?.toLowerCase() === selectedCategory.toLowerCase()
            );
        }

        setFilteredCursos(filtered);
        setCurrentPage(1); // Reiniciar a la primera página al aplicar filtros
    };

    //Lógica de paginación
    const indexOfLastCurso = currentPage * cursosPerPage;
    const indexOfFirstCurso = indexOfLastCurso - cursosPerPage; 
    const currentCursos = filteredCursos.slice(indexOfFirstCurso, indexOfLastCurso);
    const totalPages = Math.ceil(filteredCursos.length / cursosPerPage);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => {
        fetchCursos();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [searchTerm, selectedCategory, selectedPriceRange, cursos]);
    
    return (
        <div className="courses-page">
            <Toast 
                show={toast.show}
                variant={toast.variant}
                title={toast.title}
                message={toast.message}
                onClose={() => setToast(prev => ({ ...prev, show: false }))}
                autoClose={toast.variant !== 'error'}
            />
            
            <div className="container">
                <div className="courses-header">
                    <h1>Explora Nuestros Cursos</h1>
                    <p className="courses-subtitle">Descubre nuestra selección de cursos diseñados para mejorar tus habilidades y conocimientos en logística y gestión de inventarios.</p>
                </div>
                
                {loading ? (
                    <LoadingSpinner 
                        message={showTimeout ? "El servidor está iniciando, esto puede tomar más tiempo..." : "Cargando cursos disponibles..."}
                        showProgress={true}
                        progress={progress}
                        size="large"
                    />
                ) : (
                    <>
                        <ApiError error={error} />
                        
                        {/* Filtros */}
                        <div className="row">
                            <div className="col-md-12">
                                <div className="filters-container">
                                    <h4 className="filter-title">Filtros</h4>
                                    
                                    <div className="filter-group">
                                        <label className="filter-label">Buscar</label>
                                        <div className="input-group">
                                            <input type="text" 
                                            className="form-control" 
                                            placeholder="Nombre del curso..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            />
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

                                    <div className='mt-3 text-center'>
                                        <small className='text-muted'>Mostrando {currentCursos.length} de 
                                            {filteredCursos.length} cursos
                                        </small>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="col-lg-9">
                                <CourseList 
                                    cursos={currentCursos}/>
                                {/* Paginación dinámica */}
                                {totalPages > 1 && (
                                    <div className="pagination-container">
                                        <ul className="pagination">
                                            {/* Botón anterior */}
                                            <li className="pagination-item">
                                                <button 
                                                    className={`pagination-link ${currentPage === 1 ? 'disabled' : ''}`}
                                                    onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                                                    disabled={currentPage === 1}
                                                >
                                                    ‹
                                                </button>
                                            </li>
                                            
                                            {/* Números de página */}
                                            {[...Array(totalPages)].map((_, index) => {
                                                const pageNumber = index + 1;
                                                return (
                                                    <li key={pageNumber} className="pagination-item">
                                                        <button 
                                                            className={`pagination-link ${currentPage === pageNumber ? 'active' : ''}`}
                                                            onClick={() => paginate(pageNumber)}
                                                        >
                                                            {pageNumber}
                                                        </button>
                                                    </li>
                                                );
                                            })}
                                            
                                            {/* Botón siguiente */}
                                            <li className="pagination-item">
                                                <button 
                                                    className={`pagination-link ${currentPage === totalPages ? 'disabled' : ''}`}
                                                    onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                                                    disabled={currentPage === totalPages}
                                                >
                                                    ›
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}