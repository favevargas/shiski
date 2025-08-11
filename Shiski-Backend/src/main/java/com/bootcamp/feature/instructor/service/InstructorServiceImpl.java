package com.bootcamp.feature.instructor.service;

import com.bootcamp.feature.instructor.dto.InstructorRequest;
import com.bootcamp.feature.instructor.dto.InstructorResponse;
import com.bootcamp.feature.instructor.mapper.InstructorMapper;
import com.bootcamp.feature.instructor.model.Instructor;
import com.bootcamp.feature.usuario.model.Usuario;
import com.bootcamp.feature.instructor.repository.InstructorRepository;
import com.bootcamp.feature.usuario.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InstructorServiceImpl implements InstructorService {

    private final InstructorRepository instructorRepository;
    private final UsuarioRepository usuarioRepository;

    @Override
    public InstructorResponse crearInstructor(InstructorRequest request) {
        Usuario usuario = usuarioRepository.findById(request.usuarioId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        Instructor instructor = InstructorMapper.toEntity(request, usuario);
        return InstructorMapper.toResponse(instructorRepository.save(instructor));
    }

    @Override
    public InstructorResponse obtenerInstructor(Long id) {
        Instructor instructor = instructorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Instructor no encontrado"));
        return InstructorMapper.toResponse(instructor);
    }

    @Override
    public List<InstructorResponse> listarInstructores() {
        return instructorRepository.findAll().stream()
                .map(InstructorMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public InstructorResponse actualizarInstructor(Long id, InstructorRequest request) {
        Instructor instructor = instructorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Instructor no encontrado"));

        instructor.setBiografia(request.biografia());
        instructor.setEspecialidad(request.especialidad());
        instructor.setCertificaciones(request.certificaciones());
        instructor.setFotoPerfil(request.fotoPerfil());

        return InstructorMapper.toResponse(instructorRepository.save(instructor));
    }

    @Override
    public void eliminarInstructor(Long id) {
        instructorRepository.deleteById(id);
    }
}