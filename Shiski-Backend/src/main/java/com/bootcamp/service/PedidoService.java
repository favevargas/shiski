package com.bootcamp.service;

import com.bootcamp.dto.PedidoRequest;
import com.bootcamp.dto.PedidoResponse;
import java.util.List;

public interface PedidoService {
    PedidoResponse crearPedido(PedidoRequest request); //
    PedidoResponse obtenerPedido(Long id);
    List<PedidoResponse> listarPedidos();
    PedidoResponse actualizarEstadoPedido(Long id, String estado);
    void eliminarPedido(Long id);
}