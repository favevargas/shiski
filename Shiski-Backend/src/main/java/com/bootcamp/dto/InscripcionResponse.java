package com.bootcamp.dto;

import java.math.BigDecimal;
import java.util.Date;

public record InscripcionResponse(
        Long id,
        Long usuarioId,
        Long cursoId,
        Date fechaInscripcion,
        BigDecimal progresoPorcentaje,
        boolean certificadoEmitido
) {}