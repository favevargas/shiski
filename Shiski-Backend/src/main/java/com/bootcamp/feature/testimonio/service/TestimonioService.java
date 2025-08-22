package com.bootcamp.feature.testimonio.service;

import com.bootcamp.feature.testimonio.dto.TestimonioRequest;
import com.bootcamp.feature.testimonio.dto.TestimonioResponse;

import java.util.List;

public interface TestimonioService {
    
    TestimonioResponse crearTestimonio(TestimonioRequest request);
    
    List<TestimonioResponse> obtenerTestimoniosPorCurso(Long cursoId);
    
    List<TestimonioResponse> obtenerTestimoniosPorUsuario(Long usuarioId);
    
    TestimonioResponse obtenerTestimonioPorId(Long id);
    
    TestimonioResponse actualizarTestimonio(Long id, TestimonioRequest request);
    
    void eliminarTestimonio(Long id);
    
    Double obtenerCalificacionPromedioPorCurso(Long cursoId);
    
    Long contarTestimoniosPorCurso(Long cursoId);
}