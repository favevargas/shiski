package com.bootcamp.service;

import com.bootcamp.dto.CarritoRequest;
import com.bootcamp.dto.CarritoResponse;
import java.util.List;

public interface CarritoService {
    CarritoResponse agregarAlCarrito(CarritoRequest request);
    CarritoResponse obtenerCarrito(Long id);
    List<CarritoResponse> listarCarritoPorUsuario(Long usuarioId);
    void eliminarDelCarrito(Long id);
}