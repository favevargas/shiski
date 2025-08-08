package com.bootcamp.dto;

import java.math.BigDecimal;
import java.util.Date;

public record CarritoResponse(
        Long id,
        Long usuarioId,
        Long cursoId,
        Date fechaAgregado,
        BigDecimal precioMomento
) {}