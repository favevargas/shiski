package com.bootcamp.feature.curso.mapper;

import com.bootcamp.feature.curso.dto.CursoRequest;
import com.bootcamp.feature.curso.dto.CursoResponse;
import com.bootcamp.feature.curso.model.Curso;
import org.springframework.stereotype.Component;

@Component
public class CursoMapper {

    public Curso toEntity(CursoRequest cursoRequest) {
        // Lógica para convertir de DTO a entidad
        // Por ejemplo:
        // Curso curso = new Curso();
        // curso.setNombre(cursoRequest.getNombre());
        // ...
        // return curso;
        return null;
    }

    public CursoResponse toResponse(Curso curso) {
        // Lógica para convertir de entidad a DTO
        // Por ejemplo:
        // CursoResponse response = new CursoResponse();
        // response.setNombre(curso.getNombre());
        // ...
        // return response;
        return null;
    }
}