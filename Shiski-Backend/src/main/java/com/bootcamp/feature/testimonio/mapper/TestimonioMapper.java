package com.bootcamp.feature.testimonio.mapper;

import com.bootcamp.feature.testimonio.dto.TestimonioRequest;
import com.bootcamp.feature.testimonio.dto.TestimonioResponse;
import com.bootcamp.feature.testimonio.model.Testimonio;
import com.bootcamp.feature.curso.model.Curso;
import com.bootcamp.feature.usuario.model.Usuario;

public class TestimonioMapper {

    public static Testimonio toEntity(TestimonioRequest request, Usuario usuario, Curso curso) {
        Testimonio testimonio = new Testimonio();
        testimonio.setComentario(request.comentario());
        testimonio.setCalificacion(request.calificacion());
        testimonio.setUsuario(usuario);
        testimonio.setCurso(curso);
        return testimonio;
    }

    public static TestimonioResponse toResponse(Testimonio testimonio) {
        return new TestimonioResponse(
            testimonio.getId(),
            testimonio.getComentario(),
            testimonio.getCalificacion(),
            testimonio.getFechaCreacion(),
            testimonio.getCurso() != null ? testimonio.getCurso().getId() : null,
            testimonio.getCurso() != null ? testimonio.getCurso().getTitulo() : "Curso desconocido",
            testimonio.getUsuario() != null ? testimonio.getUsuario().getId() : null,
            testimonio.getUsuario() != null ? testimonio.getUsuario().getNombre() : "Usuario desconocido",
            testimonio.getUsuario() != null ? testimonio.getUsuario().getAvatar() : null
        );
    }
}