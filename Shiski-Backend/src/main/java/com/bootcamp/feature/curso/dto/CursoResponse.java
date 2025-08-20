// DTO para respuestas (consultar productos)
package com.bootcamp.feature.curso.dto;

import com.bootcamp.feature.testimonio.dto.TestimonioResponse;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

public record CursoResponse(
        Long id,
        String titulo,
        String descripcion,
        String objetivos,
        String requisitos,
        String temario,
        BigDecimal precio,
        Integer duracionHoras,
        String nivel,
        String tipoCurso,
        String formato,
        String idioma,
        String urlVideoPromocional,
        String imagenMiniatura,  // 📸 Campo de imagen que necesitas
        Date fechaCreacion,
        boolean certificadoIncluido,
        String nombreInstructor,
        String nombreCategoria,
        // Nuevos campos para testimonios
        List<TestimonioResponse> testimonios,
        Double calificacionPromedio,
        Long numeroTestimonios
) {}