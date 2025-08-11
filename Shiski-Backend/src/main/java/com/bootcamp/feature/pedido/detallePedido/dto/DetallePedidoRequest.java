package com.bootcamp.feature.pedido.detallePedido.dto;

import java.math.BigDecimal;

public record DetallePedidoRequest(
        Long cursoId,
        int cantidad,
        BigDecimal precioUnitario
) {}