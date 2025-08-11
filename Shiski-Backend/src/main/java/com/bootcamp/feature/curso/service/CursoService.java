package com.bootcamp.feature.curso.service;

import com.bootcamp.feature.curso.dto.CursoRequest;
import com.bootcamp.feature.curso.dto.CursoResponse;


import java.util.List;


public interface CursoService {
    CursoResponse crearCurso(CursoRequest request);
    CursoResponse obtenerCurso(Long id);
    List<CursoResponse> listarCursos();
    CursoResponse actualizarCurso(Long id, CursoRequest curso);
    void eliminarCurso(Long id);



}
