package com.bootcamp.mapper;

import com.bootcamp.dto.InscripcionRequest;
import com.bootcamp.dto.InscripcionResponse;
import com.bootcamp.model.Curso;
import com.bootcamp.model.Inscripcion;
import com.bootcamp.model.Usuario;

public class InscripcionMapper {

    public static Inscripcion toEntity(InscripcionRequest request, Usuario usuario, Curso curso) {
        Inscripcion inscripcion = new Inscripcion();
        inscripcion.setUsuario(usuario);
        inscripcion.setCurso(curso);
        inscripcion.setFechaInscripcion(request.fechaInscripcion());
        inscripcion.setProgresoPorcentaje(request.progresoPorcentaje());
        inscripcion.setCertificadoEmitido(request.certificadoEmitido());
        return inscripcion;
    }

    public static InscripcionResponse toResponse(Inscripcion inscripcion) {
        return new InscripcionResponse(
                inscripcion.getId(),
                inscripcion.getUsuario().getId(),
                inscripcion.getCurso().getId(),
                inscripcion.getFechaInscripcion(),
                inscripcion.getProgresoPorcentaje(),
                inscripcion.isCertificadoEmitido()
        );
    }
}