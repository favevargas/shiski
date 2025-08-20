package com.bootcamp.feature.usuario.mapper;

import com.bootcamp.feature.usuario.dto.UsuarioRequest;
import com.bootcamp.feature.usuario.dto.UsuarioResponse;
import com.bootcamp.feature.usuario.model.Usuario;
import com.bootcamp.feature.usuario.model.RolUsuario;

public class UsuarioMapper {

    public static UsuarioResponse toResponse(Usuario usuario) {
        return new UsuarioResponse(
            usuario.getId(),
            usuario.getNombre(),
            usuario.getEmail(),
            usuario.getRol(),
            usuario.getFechaRegistro(),
            usuario.isActivo() // Cambio de getActivo() a isActivo()
        );
    }

    public static Usuario toEntity(UsuarioRequest request) {
        Usuario usuario = new Usuario();
        usuario.setNombre(request.nombre());
        usuario.setEmail(request.email());
        if (request.password() != null) {
            usuario.setPassword(request.password());
        }
        usuario.setRol(request.rol() != null ? request.rol() : RolUsuario.ROLE_USER);
        usuario.setActivo(request.activo() != null ? request.activo() : true);
        return usuario;
    }

    public static void updateEntity(Usuario usuario, UsuarioRequest request) {
        usuario.setNombre(request.nombre());
        usuario.setEmail(request.email());
        if (request.password() != null && !request.password().isEmpty()) {
            usuario.setPassword(request.password());
        }
        if (request.rol() != null) {
            usuario.setRol(request.rol());
        }
        if (request.activo() != null) {
            usuario.setActivo(request.activo());
        }
    }
}