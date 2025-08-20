package com.bootcamp.feature.usuario.dto;

import com.bootcamp.feature.usuario.model.RolUsuario;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record UsuarioRequest(
    @NotBlank(message = "El nombre es obligatorio")
    String nombre,
    
    @NotBlank(message = "El email es obligatorio")
    @Email(message = "El email debe tener un formato válido")
    String email,
    
    String password,
    
    RolUsuario rol,
    
    Boolean activo
) {}