package com.bootcamp.feature.pedido.detallePedido.mapper;

import com.bootcamp.feature.pedido.detallePedido.dto.DetallePedidoRequest;
import com.bootcamp.feature.pedido.detallePedido.dto.DetallePedidoResponse;
import com.bootcamp.feature.curso.model.Curso;
import com.bootcamp.feature.pedido.detallePedido.model.DetallePedido;
import com.bootcamp.feature.pedido.model.Pedido;

public class DetallePedidoMapper {


    public static DetallePedido toEntity(DetallePedidoRequest request, Pedido pedido, Curso curso) {
        DetallePedido detallePedido = new DetallePedido();
        detallePedido.setPedido(pedido);
        detallePedido.setCurso(curso);
        detallePedido.setCantidad(request.cantidad());
        detallePedido.setPrecioUnitario(request.precioUnitario());
        return detallePedido;
    }

    public static DetallePedidoResponse toResponse(DetallePedido detallePedido) {
        return new DetallePedidoResponse(
                detallePedido.getId(),
                detallePedido.getCurso().getId(),
                detallePedido.getCurso().getTitulo(), // Obtiene el nombre del curso
                detallePedido.getCantidad(), // Asumiendo que has añadido el campo cantidad a la entidad
                detallePedido.getPrecioUnitario()
        );
    }
}