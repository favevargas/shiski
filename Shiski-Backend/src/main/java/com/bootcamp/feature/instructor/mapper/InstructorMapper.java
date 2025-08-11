package com.bootcamp.feature.instructor.mapper;

import com.bootcamp.feature.instructor.dto.InstructorRequest;
import com.bootcamp.feature.instructor.dto.InstructorResponse;
import com.bootcamp.feature.instructor.model.Instructor;
import com.bootcamp.feature.usuario.model.Usuario;

public class InstructorMapper {

    public static Instructor toEntity(InstructorRequest request, Usuario usuario) {
        Instructor instructor = new Instructor();
        instructor.setBiografia(request.biografia());
        instructor.setEspecialidad(request.especialidad());
        instructor.setCertificaciones(request.certificaciones());

        // This line is correct as it sets the BigDecimal value directly.
        instructor.setCalificacionPromedio(request.calificacionPromedio());

        instructor.setFotoPerfil(request.fotoPerfil());
        instructor.setUsuario(usuario);
        return instructor;
    }

    public static InstructorResponse toResponse(Instructor instructor) {
        return new InstructorResponse(
                instructor.getId(),
                instructor.getBiografia(),
                instructor.getEspecialidad(),
                instructor.getCertificaciones(),
                // Corrected line: pass the BigDecimal value directly.
                instructor.getCalificacionPromedio(),
                instructor.getFotoPerfil(),
                instructor.getUsuario().getId()
        );
    }
}