// DTO para respuestas (consultar productos)
package com.bootcamp.dto;

import java.math.BigDecimal;

public record CursoResponse(
        Long id,
        String nombre,
        BigDecimal precio
) {}