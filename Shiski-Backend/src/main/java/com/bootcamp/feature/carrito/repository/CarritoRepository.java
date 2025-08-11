package com.bootcamp.feature.carrito.repository;

import com.bootcamp.feature.carrito.model.Carrito;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CarritoRepository extends JpaRepository<Carrito, Long> {
    List<Carrito> findByUsuarioId(Long usuarioId);
}