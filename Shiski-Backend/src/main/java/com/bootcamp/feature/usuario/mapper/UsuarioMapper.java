package com.bootcamp.feature.usuario.mapper;

import com.bootcamp.feature.usuario.dto.UsuarioRequest;
import com.bootcamp.feature.usuario.dto.UsuarioResponse;
import com.bootcamp.feature.usuario.model.Usuario;
import com.bootcamp.feature.usuario.model.TipoUsuario;

public class UsuarioMapper {

    public static Usuario toEntity(UsuarioRequest request) {
        Usuario usuario = new Usuario();
        usuario.setNombre(request.nombre());
        usuario.setApellido(request.apellido());
        usuario.setEmail(request.email());
        usuario.setPassword(request.password());
        usuario.setTelefono(request.telefono());
        usuario.setRol(request.rol());
        usuario.setTipoUsuario(TipoUsuario.valueOf(request.tipoUsuario()));
        usuario.setActivo(request.activo());
        return usuario;
    }

    public static UsuarioResponse toResponse(Usuario usuario) {
        return new UsuarioResponse(
                usuario.getId(),
                usuario.getNombre(),
                usuario.getApellido(),
                usuario.getEmail(),
                usuario.getTelefono(),
                usuario.getRol(),
                usuario.getTipoUsuario().name(),
                usuario.isActivo()
        );
    }
}