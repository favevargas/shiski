package com.bootcamp.security.service;

import com.bootcamp.feature.usuario.model.Usuario;
import com.bootcamp.feature.usuario.model.TipoUsuario;
import com.bootcamp.feature.usuario.repository.UsuarioRepository;
import com.bootcamp.security.dto.LoginResponse;
import com.bootcamp.security.model.Rol;
import com.bootcamp.security.model.UsuarioSecurity;
import com.bootcamp.security.repository.RolRepository;
import com.bootcamp.security.repository.UsuarioSecurityRepository;
import com.bootcamp.security.jwt.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.stream.Collectors;

import static com.bootcamp.security.model.NombreRol.ROLE_USER;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UsuarioSecurityRepository usuarioRepo;
    private final UsuarioRepository usuarioRepository;
    private final RolRepository rolRepo;
    private final PasswordEncoder encoder;
    private final JwtUtils jwtUtils;

    // crea usuario con rol USER
    // En AuthService.java - método registrar
    public void registrar(String nombre, String email, String password) {
        if (usuarioRepo.existsByEmail(email)) {
            throw new RuntimeException("El email ya está registrado");
        }
    
        Rol rolUsuario = rolRepo.findByNombre(ROLE_USER)
                .orElseThrow(() -> new RuntimeException("Rol ROLE_USER no encontrado"));
    
        // Crear UsuarioSecurity (para autenticación)
        UsuarioSecurity nuevoUsuarioSecurity = new UsuarioSecurity();
        nuevoUsuarioSecurity.setNombre(nombre);
        nuevoUsuarioSecurity.setEmail(email);
        nuevoUsuarioSecurity.setPassword(encoder.encode(password));
        nuevoUsuarioSecurity.setRoles(Collections.singleton(rolUsuario));
        usuarioRepo.save(nuevoUsuarioSecurity);
    
        //  Crear Usuario (para datos completos)
        Usuario nuevoUsuario = new Usuario();
        nuevoUsuario.setNombre(nombre);
        nuevoUsuario.setEmail(email);
        nuevoUsuario.setPassword(encoder.encode(password));
        nuevoUsuario.setActivo(true);  // ✅ Asignar valor por defecto
        nuevoUsuario.setTipoUsuario(TipoUsuario.ESTUDIANTE);
        nuevoUsuario.setRol("ROLE_USER");
        usuarioRepository.save(nuevoUsuario);
    }

    //  Login: valida credenciales y genera LoginResponse con token
    public LoginResponse login(String email, String password) {
        UsuarioSecurity usuarioSecurity = usuarioRepo.findByEmail(email)
                .orElseThrow(() -> new BadCredentialsException("Credenciales inválidas"));

        if (!encoder.matches(password, usuarioSecurity.getPassword())) {
            throw new BadCredentialsException("Credenciales inválidas");
        }

        String token = jwtUtils.generateToken(email);
        String roles = usuarioSecurity.getRoles().stream()
                .map(r -> r.getNombre().name()) // Convierte a texto (USER, ADMIN)
                .collect(Collectors.joining(","));

        return new LoginResponse(usuarioSecurity.getNombre(), usuarioSecurity.getEmail(), token, roles);
    }
}
