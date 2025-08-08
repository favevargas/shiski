package com.bootcamp.mapper;

import com.bootcamp.dto.DetallePedidoResponse;
import com.bootcamp.dto.PedidoRequest;
import com.bootcamp.dto.PedidoResponse;
import com.bootcamp.model.Pedido;
import com.bootcamp.model.Usuario;
import com.bootcamp.model.enums.EstadoPedido;

import java.util.List;
import java.util.stream.Collectors;

public class PedidoMapper {

    public static Pedido toEntity(PedidoRequest request, Usuario usuario) {
        Pedido pedido = new Pedido();
        pedido.setUsuario(usuario);
        pedido.setFechaPedido(request.fechaPedido());
        pedido.setEstado(EstadoPedido.valueOf(request.estado().toUpperCase()));
        pedido.setTotal(request.total());
        pedido.setMetodoPago(request.metodoPago());
        // Do not set detalles here. It will be handled in the service layer.
        return pedido;
    }

    public static PedidoResponse toResponse(Pedido pedido) {
        List<DetallePedidoResponse> detalles = pedido.getDetalles().stream()
                .map(DetallePedidoMapper::toResponse)
                .collect(Collectors.toList());

        return new PedidoResponse(
                pedido.getId(),
                pedido.getUsuario().getId(),
                pedido.getFechaPedido(),
                pedido.getEstado().name(),
                pedido.getTotal(),
                pedido.getMetodoPago(),
                detalles
        );
    }
}