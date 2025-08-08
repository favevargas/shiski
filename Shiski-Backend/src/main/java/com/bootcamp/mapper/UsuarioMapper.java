package com.bootcamp.mapper;

import com.bootcamp.dto.UsuarioRequest;
import com.bootcamp.dto.UsuarioResponse;
import com.bootcamp.model.Usuario;
import com.bootcamp.model.enums.TipoUsuario;

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