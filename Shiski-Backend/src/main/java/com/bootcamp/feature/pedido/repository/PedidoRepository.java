package com.bootcamp.feature.pedido.repository;

import com.bootcamp.feature.pedido.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
}