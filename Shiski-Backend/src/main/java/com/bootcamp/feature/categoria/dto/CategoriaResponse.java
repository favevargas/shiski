package com.bootcamp.feature.categoria.dto;

public record CategoriaResponse(
        Long id,
        String nombre,
        String descripcion,
        boolean activo
) {}