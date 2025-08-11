package com.bootcamp.feature.inscripcion.service;

import com.bootcamp.feature.inscripcion.dto.InscripcionRequest;
import com.bootcamp.feature.inscripcion.dto.InscripcionResponse;
import java.util.List;

public interface InscripcionService {
    InscripcionResponse crearInscripcion(InscripcionRequest request);
    InscripcionResponse obtenerInscripcion(Long id);
    List<InscripcionResponse> listarInscripciones();
    InscripcionResponse actualizarInscripcion(Long id, InscripcionRequest request);
    void eliminarInscripcion(Long id);
}