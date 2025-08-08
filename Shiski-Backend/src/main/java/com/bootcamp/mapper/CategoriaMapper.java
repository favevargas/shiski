package com.bootcamp.mapper;

import com.bootcamp.dto.CategoriaRequest;
import com.bootcamp.dto.CategoriaResponse;
import com.bootcamp.model.Categoria;

public class CategoriaMapper {

    public static Categoria toEntity(CategoriaRequest request) {
        Categoria categoria = new Categoria();
        categoria.setNombre(request.nombre());
        categoria.setDescripcion(request.descripcion());
        categoria.setActivo(request.activo());
        return categoria;
    }

    public static CategoriaResponse toResponse(Categoria categoria) {
        return new CategoriaResponse(
                categoria.getId(),
                categoria.getNombre(),
                categoria.getDescripcion(),
                categoria.isActivo()
        );
    }
}