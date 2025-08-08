package com.bootcamp.dto;

import java.util.Date;

public record CarritoRequest(
        Long usuarioId,
        Date fechaAgregado,
        Long cursoId
) {}