package com.bootcamp.service;

import com.bootcamp.dto.CursoRequest;
import com.bootcamp.dto.CursoResponse;
import com.bootcamp.model.Curso;
import com.bootcamp.repository.CursoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CursoServiceImpl implements CursoService {

    private final CursoRepository cursoRepository;

    @Override
    public CursoResponse crearCurso(CursoRequest request) {
        Curso curso = new Curso();
        curso.setTitulo(request.titulo());
        curso.setPrecio(request.precio());
        return toResponse(cursoRepository.save(curso));
    }

    @Override
    public CursoResponse obtenerCurso(Long id) {
        return cursoRepository.findById(id)
                .map(this::toResponse)
                .orElseThrow(() -> new RuntimeException("Curso no encontrado"));
    }

    @Override
    public List<CursoResponse> listarCursos() {
        return cursoRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public CursoResponse actualizarCurso(Long id, CursoRequest request) {
        Curso curso = cursoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Curso no encontrado"));

        curso.setTitulo(request.titulo());
        curso.setPrecio(request.precio());

        return toResponse(cursoRepository.save(curso));
    }

    @Override
    public void eliminarCurso(Long id) {
        cursoRepository.deleteById(id);
    }

    private CursoResponse toResponse(Curso curso) {
        return new CursoResponse(
                curso.getId(),
                curso.getTitulo(),
                curso.getPrecio()
        );
    }
}