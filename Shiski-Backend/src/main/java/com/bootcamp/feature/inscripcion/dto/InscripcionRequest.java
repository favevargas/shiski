package com.bootcamp.feature.inscripcion.dto;

import java.math.BigDecimal;
import java.util.Date;

public record InscripcionRequest(
        Long usuarioId,
        Long cursoId,
        Date fechaInscripcion,
        BigDecimal progresoPorcentaje,
        boolean certificadoEmitido
) {}