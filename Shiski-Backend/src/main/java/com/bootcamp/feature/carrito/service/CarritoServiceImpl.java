package com.bootcamp.feature.carrito.service;

import com.bootcamp.feature.carrito.dto.CarritoRequest;
import com.bootcamp.feature.carrito.dto.CarritoResponse;
import com.bootcamp.feature.carrito.mapper.CarritoMapper;
import com.bootcamp.feature.carrito.model.Carrito;
import com.bootcamp.feature.curso.model.Curso;
import com.bootcamp.feature.usuario.model.Usuario;
import com.bootcamp.feature.carrito.repository.CarritoRepository;
import com.bootcamp.feature.curso.repository.CursoRepository;
import com.bootcamp.feature.usuario.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CarritoServiceImpl implements CarritoService {

    private final CarritoRepository carritoRepository;
    private final UsuarioRepository usuarioRepository;
    private final CursoRepository cursoRepository;

    @Override
    public CarritoResponse agregarProducto(CarritoRequest request) {
        Usuario usuario = usuarioRepository.findById(request.usuarioId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        Curso curso = cursoRepository.findById(request.cursoId())
                .orElseThrow(() -> new RuntimeException("Curso no encontrado"));

        Carrito carrito = CarritoMapper.toEntity(request, usuario, curso);
        // Aquí podrías agregar la lógica para obtener el precio actual del curso
        carrito.setPrecioMomento(curso.getPrecio());

        return CarritoMapper.toResponse(carritoRepository.save(carrito));
    }

    @Override
    public CarritoResponse obtenerCarrito(Long id) {
        Carrito carrito = carritoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ítem del carrito no encontrado"));
        return CarritoMapper.toResponse(carrito);
    }


    @Override
    public void vaciarCarrito(Long usuarioId) {
        // Lógica para vaciar el carrito del usuario
        // 1. Obtener el carrito del usuario.
        // 2. Eliminar todos los ítems de ese carrito.
        // 3. Guardar los cambios.
    }

    @Override
    public void eliminarProducto(Long id) {
        carritoRepository.deleteById(id);
    }

    @Override
    public CarritoResponse actualizarCantidad(CarritoRequest carritoRequest) {
        // Lógica para actualizar la cantidad
        // 1. Busca el carrito del usuario.
        // 2. Encuentra el producto en el carrito.
        // 3. Actualiza la cantidad con el valor del DTO.
        // 4. Guarda los cambios en el repositorio.
        // 5. Mapea y devuelve el CarritoResponse.
        return null; // O la implementación real de tu lógica
    }
}