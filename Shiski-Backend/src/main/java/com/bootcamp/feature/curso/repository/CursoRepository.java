package com.bootcamp.feature.curso.repository;

import com.bootcamp.feature.curso.model.Curso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CursoRepository extends JpaRepository<Curso, Long> {
    
    // Método para obtener curso con instructor y usuario cargados
    @Query("SELECT c FROM Curso c " +
           "JOIN FETCH c.instructor i " +
           "JOIN FETCH i.usuario u " +
           "JOIN FETCH c.categoria cat " +
           "WHERE c.id = :id")
    Optional<Curso> findByIdWithInstructorAndUsuario(@Param("id") Long id);
    
    // Método para obtener todos los cursos con relaciones cargadas
    @Query("SELECT c FROM Curso c " +
           "JOIN FETCH c.instructor i " +
           "JOIN FETCH i.usuario u " +
           "JOIN FETCH c.categoria cat")
    List<Curso> findAllWithInstructorAndUsuario();
}
