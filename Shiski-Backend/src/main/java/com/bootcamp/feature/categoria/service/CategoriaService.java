package com.bootcamp.feature.categoria.service;

import com.bootcamp.feature.categoria.dto.CategoriaRequest;
import com.bootcamp.feature.categoria.dto.CategoriaResponse;
import java.util.List;

public interface CategoriaService {
    CategoriaResponse crearCategoria(CategoriaRequest request);
    CategoriaResponse obtenerCategoria(Long id);
    List<CategoriaResponse> listarCategorias();
    CategoriaResponse actualizarCategoria(Long id, CategoriaRequest request);
    void eliminarCategoria(Long id);
}