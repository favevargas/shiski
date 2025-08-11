package com.bootcamp.feature.carrito.mapper;

import com.bootcamp.feature.carrito.dto.CarritoRequest;
import com.bootcamp.feature.carrito.dto.CarritoResponse;
import com.bootcamp.feature.carrito.model.Carrito;
import com.bootcamp.feature.curso.model.Curso;
import com.bootcamp.feature.usuario.model.Usuario;

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