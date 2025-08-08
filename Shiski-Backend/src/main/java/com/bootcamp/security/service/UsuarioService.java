package com.bootcamp.security.service;

import com.bootcamp.security.model.UsuarioSecurity;

import java.util.Optional;

public interface UsuarioService {
    Optional<UsuarioSecurity> findByEmail(String email);
}
