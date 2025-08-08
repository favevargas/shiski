package com.bootcamp.dto;

import java.math.BigDecimal;

public record InstructorRequest(
        String biografia,
        String especialidad,
        int certificaciones,
        BigDecimal calificacionPromedio,
        String fotoPerfil,
        Long usuarioId
) {}
