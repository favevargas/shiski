package com.bootcamp.feature.instructor.dto;

import java.math.BigDecimal;

public record InstructorResponse(
        Long id,
        String biografia,
        String especialidad,
        int certificaciones,
        BigDecimal calificacionPromedio,
        String fotoPerfil,
        Long usuarioId
) {}