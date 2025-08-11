package com.bootcamp.feature.inscripcion.service;

import com.bootcamp.feature.inscripcion.dto.InscripcionRequest;
import com.bootcamp.feature.inscripcion.dto.InscripcionResponse;
import com.bootcamp.feature.inscripcion.mapper.InscripcionMapper;
import com.bootcamp.feature.curso.model.Curso;
import com.bootcamp.feature.inscripcion.model.Inscripcion;
import com.bootcamp.feature.usuario.model.Usuario;
import com.bootcamp.feature.curso.repository.CursoRepository;
import com.bootcamp.feature.inscripcion.repository.InscripcionRepository;
import com.bootcamp.feature.usuario.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InscripcionServiceImpl implements InscripcionService {

    private final InscripcionRepository inscripcionRepository;
    private final UsuarioRepository usuarioRepository;
    private final CursoRepository cursoRepository;

    @Override
    public InscripcionResponse crearInscripcion(InscripcionRequest request) {
        Usuario usuario = usuarioRepository.findById(request.usuarioId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        Curso curso = cursoRepository.findById(request.cursoId())
                .orElseThrow(() -> new RuntimeException("Curso no encontrado"));

        Inscripcion inscripcion = InscripcionMapper.toEntity(request, usuario, curso);
        return InscripcionMapper.toResponse(inscripcionRepository.save(inscripcion));
    }

    @Override
    public InscripcionResponse obtenerInscripcion(Long id) {
        Inscripcion inscripcion = inscripcionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Inscripción no encontrada"));
        return InscripcionMapper.toResponse(inscripcion);
    }

    @Override
    public List<InscripcionResponse> listarInscripciones() {
        return inscripcionRepository.findAll().stream()
                .map(InscripcionMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public InscripcionResponse actualizarInscripcion(Long id, InscripcionRequest request) {
        Inscripcion inscripcion = inscripcionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Inscripción no encontrada"));

        inscripcion.setProgresoPorcentaje(request.progresoPorcentaje());
        inscripcion.setCertificadoEmitido(request.certificadoEmitido());

        return InscripcionMapper.toResponse(inscripcionRepository.save(inscripcion));
    }

    @Override
    public void eliminarInscripcion(Long id) {
        inscripcionRepository.deleteById(id);
    }
}