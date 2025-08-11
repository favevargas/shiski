package com.bootcamp.feature.usuario.dto;

public record UsuarioRequest(
        String nombre,
        String apellido,
        String email,
        String password,
        String telefono,
        String rol,
        String tipoUsuario,
        boolean activo
) {}