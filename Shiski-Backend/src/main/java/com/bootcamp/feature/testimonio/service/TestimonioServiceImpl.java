package com.bootcamp.feature.testimonio.service;

import com.bootcamp.feature.testimonio.dto.TestimonioRequest;
import com.bootcamp.feature.testimonio.dto.TestimonioResponse;
import com.bootcamp.feature.testimonio.mapper.TestimonioMapper;
import com.bootcamp.feature.testimonio.model.Testimonio;
import com.bootcamp.feature.testimonio.repository.TestimonioRepository;
import com.bootcamp.feature.curso.model.Curso;
import com.bootcamp.feature.curso.repository.CursoRepository;
import com.bootcamp.feature.usuario.model.Usuario;
import com.bootcamp.feature.usuario.repository.UsuarioRepository;
import com.bootcamp.exception.NotFounfException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class TestimonioServiceImpl implements TestimonioService {

    private final TestimonioRepository testimonioRepository;
    private final CursoRepository cursoRepository;
    private final UsuarioRepository usuarioRepository;

    @Override
    public TestimonioResponse crearTestimonio(TestimonioRequest request) {
        Usuario usuario = usuarioRepository.findById(request.usuarioId())
                .orElseThrow(() -> new NotFounfException("Usuario no encontrado con ID: " + request.usuarioId()));
        
        Curso curso = cursoRepository.findById(request.cursoId())
                .orElseThrow(() -> new NotFounfException("Curso no encontrado con ID: " + request.cursoId()));
        
        Testimonio testimonio = TestimonioMapper.toEntity(request, usuario, curso);
        Testimonio testimonioGuardado = testimonioRepository.save(testimonio);
        
        return TestimonioMapper.toResponse(testimonioGuardado);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TestimonioResponse> obtenerTestimoniosPorCurso(Long cursoId) {
        List<Testimonio> testimonios = testimonioRepository.findByCursoIdOrderByFechaCreacionDesc(cursoId);
        return testimonios.stream()
                .map(TestimonioMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<TestimonioResponse> obtenerTestimoniosPorUsuario(Long usuarioId) {
        List<Testimonio> testimonios = testimonioRepository.findByUsuarioIdOrderByFechaCreacionDesc(usuarioId);
        return testimonios.stream()
                .map(TestimonioMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public TestimonioResponse obtenerTestimonioPorId(Long id) {
        Testimonio testimonio = testimonioRepository.findById(id)
                .orElseThrow(() -> new NotFounfException("Testimonio no encontrado con ID: " + id));
        return TestimonioMapper.toResponse(testimonio);
    }

    @Override
    public TestimonioResponse actualizarTestimonio(Long id, TestimonioRequest request) {
        Testimonio testimonio = testimonioRepository.findById(id)
                .orElseThrow(() -> new NotFounfException("Testimonio no encontrado con ID: " + id));
        
        testimonio.setComentario(request.comentario());
        testimonio.setCalificacion(request.calificacion());
        
        Testimonio testimonioActualizado = testimonioRepository.save(testimonio);
        return TestimonioMapper.toResponse(testimonioActualizado);
    }

    @Override
    public void eliminarTestimonio(Long id) {
        if (!testimonioRepository.existsById(id)) {
            throw new NotFounfException("Testimonio no encontrado con ID: " + id);
        }
        testimonioRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Double obtenerCalificacionPromedioPorCurso(Long cursoId) {
        Double promedio = testimonioRepository.findAverageCalificacionByCursoId(cursoId);
        return promedio != null ? promedio : 0.0;
    }

    @Override
    @Transactional(readOnly = true)
    public Long contarTestimoniosPorCurso(Long cursoId) {
        return testimonioRepository.countTestimoniosByCursoId(cursoId);
    }
}