package com.bootcamp.dto;

import java.math.BigDecimal;

public record DetallePedidoResponse(
        Long id,
        Long pedidoId,
        Long cursoId,
        BigDecimal precioUnitario
) {}