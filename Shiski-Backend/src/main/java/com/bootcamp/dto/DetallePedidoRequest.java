package com.bootcamp.dto;

import java.math.BigDecimal;

public record DetallePedidoRequest(
        Long cursoId,
        BigDecimal precioUnitario
) {}