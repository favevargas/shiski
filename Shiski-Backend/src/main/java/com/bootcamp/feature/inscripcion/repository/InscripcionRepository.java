package com.bootcamp.feature.inscripcion.repository;

import com.bootcamp.feature.inscripcion.model.Inscripcion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InscripcionRepository extends JpaRepository<Inscripcion, Long> {
}