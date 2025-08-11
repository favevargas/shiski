package com.bootcamp.feature.inscripcion.mapper;

import com.bootcamp.feature.inscripcion.dto.InscripcionRequest;
import com.bootcamp.feature.inscripcion.dto.InscripcionResponse;
import com.bootcamp.feature.curso.model.Curso;
import com.bootcamp.feature.inscripcion.model.Inscripcion;
import com.bootcamp.feature.usuario.model.Usuario;

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