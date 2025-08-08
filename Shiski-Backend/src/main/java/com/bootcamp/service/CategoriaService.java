package com.bootcamp.service;

import com.bootcamp.dto.CategoriaRequest;
import com.bootcamp.dto.CategoriaResponse;
import java.util.List;

public interface CategoriaService {
    CategoriaResponse crearCategoria(CategoriaRequest request);
    CategoriaResponse obtenerCategoria(Long id);
    List<CategoriaResponse> listarCategorias();
    CategoriaResponse actualizarCategoria(Long id, CategoriaRequest request);
    void eliminarCategoria(Long id);
}