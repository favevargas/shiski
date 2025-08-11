package com.bootcamp.feature.categoria.dto;

public record CategoriaRequest(
        String nombre,
        String descripcion,
        boolean activo
) {}