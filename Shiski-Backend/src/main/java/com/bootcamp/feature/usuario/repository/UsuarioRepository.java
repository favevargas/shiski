package com.bootcamp.feature.usuario.repository;

import com.bootcamp.feature.usuario.model.Usuario;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Optional<Usuario> findByEmail(String email);
    
    boolean existsByEmail(String email);
    
    // Búsqueda por nombre (contiene, case-insensitive) - Método automático de Spring
    Page<Usuario> findByNombreContainingIgnoreCase(String nombre, Pageable pageable);

    // También podemos usar una consulta @Query para más control
    @Query("SELECT u FROM Usuario u WHERE LOWER(u.nombre) LIKE LOWER(CONCAT('%', :nombre, '%'))")
    Page<Usuario> buscarPorNombre(String nombre, Pageable pageable);

    // Obtener todos ordenados por email
    Page<Usuario> findAllByOrderByEmailAsc(Pageable pageable);
}