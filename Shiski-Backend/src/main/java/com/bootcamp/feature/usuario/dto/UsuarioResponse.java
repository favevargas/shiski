package com.bootcamp.feature.usuario.dto;

import com.bootcamp.feature.usuario.model.RolUsuario;
import java.time.LocalDateTime;

public record UsuarioResponse(
    Long id,
    String nombre,
    String email,
    RolUsuario rol,
    LocalDateTime fechaRegistro,
    Boolean activo // Cambio de boolean a Boolean
) {}