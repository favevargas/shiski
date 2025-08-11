package com.bootcamp.feature.pedido.service;

import com.bootcamp.feature.pedido.dto.PedidoRequest;
import com.bootcamp.feature.pedido.model.EstadoPedido;
import com.bootcamp.feature.pedido.dto.PedidoResponse;
import com.bootcamp.feature.pedido.mapper.PedidoMapper;
import com.bootcamp.feature.curso.model.Curso;
import com.bootcamp.feature.pedido.detallePedido.model.DetallePedido;
import com.bootcamp.feature.pedido.model.Pedido;
import com.bootcamp.feature.usuario.model.Usuario;
import com.bootcamp.feature.curso.repository.CursoRepository;
import com.bootcamp.feature.pedido.detallePedido.repository.DetallePedidoRepository;
import com.bootcamp.feature.pedido.repository.PedidoRepository;
import com.bootcamp.feature.usuario.repository.UsuarioRepository;
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

        Pedido pedido = PedidoMapper.toEntity(request, usuario);

        List<DetallePedido> detalles = request.detalles().stream()
                .map(detalleDto -> {
                    Curso curso = cursoRepository.findById(detalleDto.cursoId())
                            .orElseThrow(() -> new RuntimeException("Curso no encontrado"));

                    DetallePedido detalle = new DetallePedido();
                    detalle.setPedido(pedido); // Asocia el detalle al pedido
                    detalle.setCurso(curso);
                    detalle.setPrecioUnitario(detalleDto.precioUnitario());
                    // Asegúrate de que el DTO de detalle tenga el precio unitario
                    return detalle;
                })
                .collect(Collectors.toList());

        pedido.setDetalles(detalles); // Asigna la lista de detalles al pedido

        Pedido savedPedido = pedidoRepository.save(pedido); // Guarda el pedido y los detalles en cascada

        return PedidoMapper.toResponse(savedPedido);
    }

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