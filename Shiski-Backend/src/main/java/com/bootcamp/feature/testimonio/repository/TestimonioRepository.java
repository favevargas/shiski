package com.bootcamp.feature.testimonio.repository;

import com.bootcamp.feature.testimonio.model.Testimonio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TestimonioRepository extends JpaRepository<Testimonio, Long> {
    
    // PROBLEMÁTICO - No carga relaciones
    List<Testimonio> findByCursoIdOrderByFechaCreacionDesc(Long cursoId);
    List<Testimonio> findByUsuarioIdOrderByFechaCreacionDesc(Long usuarioId);
    
    // NECESARIO - Agregar JOIN FETCH
    @Query("SELECT t FROM Testimonio t " +
           "JOIN FETCH t.usuario u " +
           "JOIN FETCH t.curso c " +
           "WHERE t.curso.id = :cursoId " +
           "ORDER BY t.fechaCreacion DESC")
    List<Testimonio> findByCursoIdWithUsuarioAndCursoOrderByFechaCreacionDesc(@Param("cursoId") Long cursoId);
    
    @Query("SELECT AVG(t.calificacion) FROM Testimonio t WHERE t.curso.id = :cursoId")
    Double findAverageCalificacionByCursoId(@Param("cursoId") Long cursoId);
    
    @Query("SELECT COUNT(t) FROM Testimonio t WHERE t.curso.id = :cursoId")
    Long countTestimoniosByCursoId(@Param("cursoId") Long cursoId);
}