package com.bootcamp.service;

import com.bootcamp.dto.InscripcionRequest;
import com.bootcamp.dto.InscripcionResponse;
import com.bootcamp.mapper.InscripcionMapper;
import com.bootcamp.model.Curso;
import com.bootcamp.model.Inscripcion;
import com.bootcamp.model.Usuario;
import com.bootcamp.repository.CursoRepository;
import com.bootcamp.repository.InscripcionRepository;
import com.bootcamp.repository.UsuarioRepository;
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