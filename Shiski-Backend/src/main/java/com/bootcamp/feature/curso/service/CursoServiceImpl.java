package com.bootcamp.feature.curso.service;

import com.bootcamp.feature.categoria.repostory.CategoriaRepository;
import com.bootcamp.feature.curso.dto.CursoRequest;
import com.bootcamp.feature.curso.dto.CursoResponse;
import com.bootcamp.feature.curso.model.Curso;
import com.bootcamp.feature.curso.repository.CursoRepository;
import com.bootcamp.feature.instructor.repository.InstructorRepository;
import com.bootcamp.feature.testimonio.dto.TestimonioResponse;
import com.bootcamp.feature.testimonio.service.TestimonioService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class CursoServiceImpl implements CursoService {

    private final CursoRepository cursoRepository;
    private final InstructorRepository instructorRepository;
    private final CategoriaRepository categoriaRepository;
    private final TestimonioService testimonioService; // Nueva dependencia

    @Override
    public CursoResponse crearCurso(CursoRequest request) {
        Curso curso = new Curso();
        curso.setTitulo(request.titulo());
        curso.setPrecio(request.precio());
        return toResponse(cursoRepository.save(curso));
    }

    @Override
    public CursoResponse obtenerCurso(Long id) {
        Curso curso = cursoRepository.findByIdWithInstructorAndUsuario(id)
                .orElseThrow(() -> new RuntimeException("Curso no encontrado"));
        return toResponse(curso);
    }

    @Override
    public List<CursoResponse> listarCursos() {
        return cursoRepository.findAllWithInstructorAndUsuario().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public CursoResponse actualizarCurso(Long id, CursoRequest request) {
        Curso curso = cursoRepository.findByIdWithInstructorAndUsuario(id)
                .orElseThrow(() -> new RuntimeException("Curso no encontrado"));
    
        // Actualizar campos
        curso.setTitulo(request.titulo());
        curso.setPrecio(request.precio());
    
        return toResponse(cursoRepository.save(curso));
    }

    @Override
    public void eliminarCurso(Long id) {
        cursoRepository.deleteById(id);
    }

    private CursoResponse toResponse(Curso curso) {
        // Obtener testimonios del curso
        List<TestimonioResponse> testimonios = testimonioService.obtenerTestimoniosPorCurso(curso.getId());
        Double calificacionPromedio = testimonioService.obtenerCalificacionPromedioPorCurso(curso.getId());
        Long numeroTestimonios = testimonioService.contarTestimoniosPorCurso(curso.getId());
        
        return new CursoResponse(
                curso.getId(),
                curso.getTitulo(),
                curso.getDescripcion(),
                curso.getObjetivos(),
                curso.getRequisitos(),
                curso.getTemario(),
                curso.getPrecio(),
                curso.getDuracionHoras(),
                curso.getNivel().name(),
                curso.getTipoCurso().name(),
                curso.getFormato(),
                curso.getIdioma(),
                curso.getUrlVideoPromocional(),
                curso.getImagenMiniatura(),
                curso.getFechaCreacion(),
                curso.isCertificadoIncluido(),
                curso.getInstructor().getUsuario().getNombre(), // ✅ CORRECCIÓN APLICADA
                curso.getCategoria().getNombre(),
                // Nuevos campos
                testimonios,
                calificacionPromedio,
                numeroTestimonios
        );
    }
}