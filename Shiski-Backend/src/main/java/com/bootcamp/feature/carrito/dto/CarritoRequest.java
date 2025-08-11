package com.bootcamp.feature.carrito.dto;

import java.util.Date;

public record CarritoRequest(
        Long usuarioId,
        Date fechaAgregado,
        Long cursoId
) {}