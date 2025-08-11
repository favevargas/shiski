package com.bootcamp.feature.carrito.service;

import com.bootcamp.feature.carrito.dto.CarritoRequest;
import com.bootcamp.feature.carrito.dto.CarritoResponse;

public interface CarritoService {
    CarritoResponse agregarProducto(CarritoRequest request);
    CarritoResponse obtenerCarrito(Long id);
    CarritoResponse actualizarCantidad(CarritoRequest carritoRequest);
        // 1. Lógica para buscar el producto en el carrito del usuario.
        // 2. Actualizar la cantidad del producto.
        // 3. Guardar el carrito actualizado en el repositorio.
        // 4. Mapear la entidad actualizada a CarritoResponse y devolverla.


    void vaciarCarrito(Long usuarioId);
        // 1. Lógica para buscar el carrito del usuario por su ID.
        // 2. Eliminar todos los productos del carrito.
        // 3. Guardar los cambios en el repositorio.

    void eliminarProducto(Long id);
}