package com.bootcamp.feature.testimonio.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

public record TestimonioRequest(
        @NotBlank(message = "El comentario es obligatorio")
        String comentario,
        
        @NotNull(message = "La calificación es obligatoria")
        @Min(value = 1, message = "La calificación mínima es 1")
        @Max(value = 5, message = "La calificación máxima es 5")
        Integer calificacion,
        
        @NotNull(message = "El ID del curso es obligatorio")
        Long cursoId,
        
        @NotNull(message = "El ID del usuario es obligatorio")
        Long usuarioId
) {}