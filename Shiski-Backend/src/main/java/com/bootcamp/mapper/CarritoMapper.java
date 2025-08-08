package com.bootcamp.mapper;

import com.bootcamp.dto.CarritoRequest;
import com.bootcamp.dto.CarritoResponse;
import com.bootcamp.model.Carrito;
import com.bootcamp.model.Curso;
import com.bootcamp.model.Usuario;

public class CarritoMapper {

    public static Carrito toEntity(CarritoRequest request, Usuario usuario, Curso curso) {
        Carrito carrito = new Carrito();
        carrito.setUsuario(usuario);
        carrito.setCurso(curso);
        carrito.setFechaAgregado(request.fechaAgregado());
        return carrito;
    }

    public static CarritoResponse toResponse(Carrito carrito) {
        return new CarritoResponse(
                carrito.getId(),
                carrito.getUsuario().getId(),
                carrito.getCurso().getId(),
                carrito.getFechaAgregado(),
                carrito.getPrecioMomento()
        );
    }
}