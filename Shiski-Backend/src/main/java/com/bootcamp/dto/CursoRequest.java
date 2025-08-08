// DTO para peticiones (crear/actualizar productos)
package com.bootcamp.dto;

import java.math.BigDecimal;

public record CursoRequest(
        String titulo,
        BigDecimal precio
) {}