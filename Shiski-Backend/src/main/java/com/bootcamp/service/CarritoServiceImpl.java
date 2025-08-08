package com.bootcamp.service;

import com.bootcamp.dto.CarritoRequest;
import com.bootcamp.dto.CarritoResponse;
import com.bootcamp.mapper.CarritoMapper;
import com.bootcamp.model.Carrito;
import com.bootcamp.model.Curso;
import com.bootcamp.model.Usuario;
import com.bootcamp.repository.CarritoRepository;
import com.bootcamp.repository.CursoRepository;
import com.bootcamp.repository.UsuarioRepository;
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
    public CarritoResponse agregarAlCarrito(CarritoRequest request) {
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
    public List<CarritoResponse> listarCarritoPorUsuario(Long usuarioId) {
        return carritoRepository.findByUsuarioId(usuarioId).stream()
                .map(CarritoMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void eliminarDelCarrito(Long id) {
        carritoRepository.deleteById(id);
    }
}