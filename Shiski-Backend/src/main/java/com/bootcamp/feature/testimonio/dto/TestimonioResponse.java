package com.bootcamp.feature.testimonio.dto;

import java.util.Date;

public record TestimonioResponse(
        Long id,
        String comentario,
        Integer calificacion,
        Date fechaCreacion,
        Long cursoId,
        String tituloCurso,
        Long usuarioId,
        String nombreUsuario
) {}