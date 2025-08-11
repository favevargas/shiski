package com.bootcamp.feature.pedido.mapper;

import com.bootcamp.feature.pedido.detallePedido.dto.DetallePedidoResponse;
import com.bootcamp.feature.pedido.detallePedido.mapper.DetallePedidoMapper;
import com.bootcamp.feature.pedido.dto.PedidoRequest;
import com.bootcamp.feature.pedido.dto.PedidoResponse;
import com.bootcamp.feature.pedido.model.Pedido;
import com.bootcamp.feature.usuario.model.Usuario;
import com.bootcamp.feature.pedido.model.EstadoPedido;

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