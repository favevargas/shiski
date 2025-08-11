package com.bootcamp.feature.categoria.service;

import com.bootcamp.feature.categoria.dto.CategoriaRequest;
import com.bootcamp.feature.categoria.dto.CategoriaResponse;
import com.bootcamp.feature.categoria.mapper.CategoriaMapper;
import com.bootcamp.feature.categoria.model.Categoria;
import com.bootcamp.feature.categoria.repostory.CategoriaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoriaServiceImpl implements CategoriaService {

    private final CategoriaRepository categoriaRepository;

    @Override
    public CategoriaResponse crearCategoria(CategoriaRequest request) {
        Categoria categoria = CategoriaMapper.toEntity(request);
        return CategoriaMapper.toResponse(categoriaRepository.save(categoria));
    }

    @Override
    public CategoriaResponse obtenerCategoria(Long id) {
        Categoria categoria = categoriaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));
        return CategoriaMapper.toResponse(categoria);
    }

    @Override
    public List<CategoriaResponse> listarCategorias() {
        return categoriaRepository.findAll().stream()
                .map(CategoriaMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public CategoriaResponse actualizarCategoria(Long id, CategoriaRequest request) {
        Categoria categoria = categoriaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));

        categoria.setNombre(request.nombre());
        categoria.setDescripcion(request.descripcion());
        categoria.setActivo(request.activo());

        return CategoriaMapper.toResponse(categoriaRepository.save(categoria));
    }

    @Override
    public void eliminarCategoria(Long id) {
        categoriaRepository.deleteById(id);
    }
}