package com.bootcamp.dto;

public record CategoriaResponse(
        Long id,
        String nombre,
        String descripcion,
        boolean activo
) {}