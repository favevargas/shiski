package com.bootcamp.service;

import com.bootcamp.dto.InscripcionRequest;
import com.bootcamp.dto.InscripcionResponse;
import java.util.List;

public interface InscripcionService {
    InscripcionResponse crearInscripcion(InscripcionRequest request);
    InscripcionResponse obtenerInscripcion(Long id);
    List<InscripcionResponse> listarInscripciones();
    InscripcionResponse actualizarInscripcion(Long id, InscripcionRequest request);
    void eliminarInscripcion(Long id);
}