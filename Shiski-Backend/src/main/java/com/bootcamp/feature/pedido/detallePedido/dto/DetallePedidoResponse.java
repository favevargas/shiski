package com.bootcamp.feature.pedido.detallePedido.dto;

import java.math.BigDecimal;

public record DetallePedidoResponse(
        Long id,
        Long cursoId,
        String nombreCurso,
        int cantidad,
        BigDecimal precioUnitario
) {}