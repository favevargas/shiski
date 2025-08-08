package com.bootcamp.service;

import com.bootcamp.dto.PedidoRequest;
import com.bootcamp.model.enums.EstadoPedido;
import com.bootcamp.dto.PedidoResponse;
import com.bootcamp.mapper.PedidoMapper;
import com.bootcamp.model.Curso;
import com.bootcamp.model.DetallePedido;
import com.bootcamp.model.Pedido;
import com.bootcamp.model.Usuario;
import com.bootcamp.repository.CursoRepository;
import com.bootcamp.repository.DetallePedidoRepository;
import com.bootcamp.repository.PedidoRepository;
import com.bootcamp.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PedidoServiceImpl implements PedidoService {

    private final PedidoRepository pedidoRepository;
    private final UsuarioRepository usuarioRepository;
    private final CursoRepository cursoRepository;
    private final DetallePedidoRepository detallePedidoRepository;

    @Override
    @Transactional
    public PedidoResponse crearPedido(PedidoRequest request) {
        Usuario usuario = usuarioRepository.findById(request.usuarioId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // Map the main pedido entity without the details list
        Pedido pedido = PedidoMapper.toEntity(request, usuario);
        Pedido savedPedido = pedidoRepository.save(pedido);

        // Process each detalle from the request
        List<DetallePedido> detalles = request.detalles().stream()
                .map(detalleDto -> {
                    Curso curso = cursoRepository.findById(detalleDto.cursoId())
                            .orElseThrow(() -> new RuntimeException("Curso no encontrado"));

                    // Create and set the DetallePedido entity
                    DetallePedido detalle = new DetallePedido();
                    detalle.setPedido(savedPedido);
                    detalle.setCurso(curso);
                    detalle.setPrecioUnitario(detalleDto.precioUnitario());
                    return detalle;
                })
                .collect(Collectors.toList());

        // Save the details and link them to the pedido
        savedPedido.setDetalles(detalles);
        detallePedidoRepository.saveAll(detalles);

        return PedidoMapper.toResponse(savedPedido);
    }

    // Other service methods...
    // The rest of the methods can remain as they were.

    @Override
    public PedidoResponse obtenerPedido(Long id) {
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido no encontrado"));
        return PedidoMapper.toResponse(pedido);
    }

    @Override
    public List<PedidoResponse> listarPedidos() {
        return pedidoRepository.findAll().stream()
                .map(PedidoMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public PedidoResponse actualizarEstadoPedido(Long id, String estado) {
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido no encontrado"));

        pedido.setEstado(EstadoPedido.valueOf(estado.toUpperCase()));

        return PedidoMapper.toResponse(pedidoRepository.save(pedido));
    }

    @Override
    public void eliminarPedido(Long id) {
        pedidoRepository.deleteById(id);
    }
}