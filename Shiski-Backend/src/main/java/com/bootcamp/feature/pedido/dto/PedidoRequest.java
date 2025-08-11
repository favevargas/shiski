package com.bootcamp.feature.pedido.dto;

import com.bootcamp.feature.pedido.detallePedido.dto.DetallePedidoRequest;

import java.util.Date;
import java.math.BigDecimal;
import java.util.List;

public record PedidoRequest(
        Long usuarioId,
        Date fechaPedido,
        String estado,
        BigDecimal total,
        String metodoPago,
        List<DetallePedidoRequest> detalles
) {}