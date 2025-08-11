package com.bootcamp.feature.categoria.repostory;

import com.bootcamp.feature.categoria.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
}