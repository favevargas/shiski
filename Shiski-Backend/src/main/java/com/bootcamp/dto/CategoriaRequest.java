package com.bootcamp.dto;

public record CategoriaRequest(
        String nombre,
        String descripcion,
        boolean activo
) {}