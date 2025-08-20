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
            .id(testimonio.getId())
            .comentario(testimonio.getComentario())
            .calificacion(testimonio.getCalificacion())
            .fechaCreacion(testimonio.getFechaCreacion())
            
            .usuarioId(testimonio.getUsuario() != null ? testimonio.getUsuario().getId() : null)
            .nombreUsuario(testimonio.getUsuario() != null ? testimonio.getUsuario().getNombre() : "Usuario desconocido")
            .build();
        }
    }