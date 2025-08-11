package com.bootcamp.feature.usuario.repository;

import com.bootcamp.feature.usuario.model.Usuario;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    // Búsqueda por nombre (contiene, case-insensitive)
    Page<Usuario> findByNombreContainingIgnoreCase(String nombre, Pageable pageable);

    // También podemos usar una consulta @Query para más control
    @Query("SELECT c FROM UsuarioSecurity c WHERE LOWER(c.nombre) LIKE LOWER(CONCAT('%', :nombre, '%'))")
    Page<Usuario> buscarPorNombre(String nombre, Pageable pageable);

    // Obtener todos ordenados por email
    Page<Usuario> findAllByOrderByEmailAsc(Pageable pageable);
}