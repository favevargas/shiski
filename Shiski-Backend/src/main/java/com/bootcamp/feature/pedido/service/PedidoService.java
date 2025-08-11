package com.bootcamp.feature.pedido.service;

import com.bootcamp.feature.pedido.dto.PedidoRequest;
import com.bootcamp.feature.pedido.dto.PedidoResponse;

import java.util.List;

public interface PedidoService {

    PedidoResponse crearPedido(PedidoRequest request);
    PedidoResponse obtenerPedido(Long id);
    List<PedidoResponse> listarPedidos();
    PedidoResponse actualizarEstadoPedido(Long id, String estado);
    void eliminarPedido(Long id);
}