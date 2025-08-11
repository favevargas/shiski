package com.bootcamp.feature.instructor.service;

import com.bootcamp.feature.instructor.dto.InstructorRequest;
import com.bootcamp.feature.instructor.dto.InstructorResponse;
import java.util.List;

public interface InstructorService {
    InstructorResponse crearInstructor(InstructorRequest request);
    InstructorResponse obtenerInstructor(Long id);
    List<InstructorResponse> listarInstructores();
    InstructorResponse actualizarInstructor(Long id, InstructorRequest request);
    void eliminarInstructor(Long id);
}