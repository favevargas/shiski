package com.bootcamp.feature.pedido.detallePedido.repository;

import com.bootcamp.feature.pedido.detallePedido.model.DetallePedido;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DetallePedidoRepository extends JpaRepository<DetallePedido, Long> {
}