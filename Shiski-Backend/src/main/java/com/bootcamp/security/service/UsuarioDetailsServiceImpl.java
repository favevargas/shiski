package com.bootcamp.security.service;

import com.bootcamp.security.model.UsuarioSecurity;
import com.bootcamp.security.repository.UsuarioSecurityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UsuarioDetailsServiceImpl implements UserDetailsService, UsuarioService {

    private final UsuarioSecurityRepository usuarioRepo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return usuarioRepo.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));
    }

    @Override
    public Optional<UsuarioSecurity> findByEmail(String email) {
        return usuarioRepo.findByEmail(email);
    }
}
