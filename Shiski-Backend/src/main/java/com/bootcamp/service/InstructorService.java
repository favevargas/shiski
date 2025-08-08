package com.bootcamp.service;

import com.bootcamp.dto.InstructorRequest;
import com.bootcamp.dto.InstructorResponse;
import java.util.List;

public interface InstructorService {
    InstructorResponse crearInstructor(InstructorRequest request);
    InstructorResponse obtenerInstructor(Long id);
    List<InstructorResponse> listarInstructores();
    InstructorResponse actualizarInstructor(Long id, InstructorRequest request);
    void eliminarInstructor(Long id);
}