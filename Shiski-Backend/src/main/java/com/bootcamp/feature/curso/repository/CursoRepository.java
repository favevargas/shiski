package com.bootcamp.feature.curso.repository;

import com.bootcamp.feature.curso.model.Curso;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CursoRepository extends JpaRepository<Curso, Long> {
    List<Curso> id(Long id);
}
