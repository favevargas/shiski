package com.bootcamp.feature.pedido.dto;

import com.bootcamp.feature.pedido.detallePedido.dto.DetallePedidoResponse;

import java.util.Date;
import java.math.BigDecimal;
import java.util.List;

public record PedidoResponse(
        Long id,
        Long usuarioId,
        Date fechaPedido,
        String estado,
        BigDecimal total,
        String metodoPago,
        List<DetallePedidoResponse> detalles
) {}