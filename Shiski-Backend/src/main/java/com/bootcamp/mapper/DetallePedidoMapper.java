package com.bootcamp.mapper;

import com.bootcamp.dto.DetallePedidoRequest;
import com.bootcamp.dto.DetallePedidoResponse;
import com.bootcamp.model.Curso;
import com.bootcamp.model.DetallePedido;
import com.bootcamp.model.Pedido;

public class DetallePedidoMapper {

    public static DetallePedido toEntity(DetallePedidoRequest request, Pedido pedido, Curso curso) {
        DetallePedido detallePedido = new DetallePedido();
        detallePedido.setPedido(pedido);
        detallePedido.setCurso(curso);
        detallePedido.setPrecioUnitario(request.precioUnitario());
        return detallePedido;
    }

    public static DetallePedidoResponse toResponse(DetallePedido detallePedido) {
        return new DetallePedidoResponse(
                detallePedido.getId(),
                detallePedido.getPedido().getId(),
                detallePedido.getCurso().getId(),
                detallePedido.getPrecioUnitario()
        );
    }
}