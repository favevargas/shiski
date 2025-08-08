package com.bootcamp.dto;

import lombok.Builder;

@Builder
public record UsuarioResponse(
        Long id,
        String nombre,
        String apellido,
        String email,
        String telefono,
        String rol,
        String tipoUsuario,
        boolean activo
) {}