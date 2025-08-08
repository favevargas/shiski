package com.bootcamp.security.repository;

import com.bootcamp.security.model.UsuarioSecurity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioSecurityRepository extends JpaRepository<UsuarioSecurity, Long> {

    Optional<UsuarioSecurity> findByEmail(String email);

    boolean existsByEmail(String email);
}
