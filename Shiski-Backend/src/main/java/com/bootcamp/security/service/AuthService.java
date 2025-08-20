package com.bootcamp.security.service;

import com.bootcamp.feature.usuario.model.RolUsuario;
import com.bootcamp.security.dto.LoginResponse;
import com.bootcamp.security.model.UsuarioSecurity;
import com.bootcamp.security.repository.UsuarioSecurityRepository;
import com.bootcamp.security.jwt.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UsuarioSecurityRepository usuarioSecurityRepo;
    private final PasswordEncoder encoder;
    private final JwtUtils jwtUtils;

    @Transactional
    public void registrar(String nombre, String email, String password) {
        if (usuarioSecurityRepo.existsByEmail(email)) {
            throw new RuntimeException("El email ya está registrado");
        }

        String encodedPassword = encoder.encode(password);

        // Crear solo UsuarioSecurity (modelo único)
        UsuarioSecurity nuevoUsuario = new UsuarioSecurity();
        nuevoUsuario.setNombre(nombre);
        nuevoUsuario.setEmail(email);
        nuevoUsuario.setPassword(encodedPassword);
        nuevoUsuario.setRol(RolUsuario.ROLE_USER);
        nuevoUsuario.setActivo(true);
        usuarioSecurityRepo.save(nuevoUsuario);
    }

    public LoginResponse login(String email, String password) {
        UsuarioSecurity usuarioSecurity = usuarioSecurityRepo.findByEmail(email)
                .orElseThrow(() -> new BadCredentialsException("Credenciales inválidas"));

        if (!encoder.matches(password, usuarioSecurity.getPassword())) {
            throw new BadCredentialsException("Credenciales inválidas");
        }

        String token = jwtUtils.generateToken(email);

        return new LoginResponse(
                usuarioSecurity.getNombre(),
                usuarioSecurity.getEmail(),
                token,
                usuarioSecurity.getRol().name()
        );
    }
}