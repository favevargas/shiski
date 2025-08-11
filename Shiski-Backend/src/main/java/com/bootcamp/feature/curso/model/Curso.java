package com.bootcamp.feature.curso.model;

import com.bootcamp.feature.categoria.model.Categoria;
import com.bootcamp.feature.instructor.model.Instructor;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Getter
@Setter
@Table(name = "cursos")
public class Curso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El título del curso es obligatorio")
    private String titulo;

    @NotBlank(message = "La descripción del curso es obligatoria")
    private String descripcion;

    @NotBlank(message = "Los objetivos del curso son obligatorios")
    private String objetivos;

    @NotBlank(message = "Los requisitos previos del curso son obligatorios")
    private String requisitos;

    @NotBlank(message = "El temario del curso es obligatorio")
    private String temario;

    @NotNull(message = "El precio del curso es obligatorio")
    @Column(precision = 10, scale = 2)
    private BigDecimal precio;

    @NotNull(message = "La duración en horas del curso es obligatoria")
    private Integer duracionHoras;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "El nivel del curso es obligatorio")
    private NivelCurso nivel;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "El tipo de curso es obligatorio")
    private TipoCurso tipoCurso;

    @NotBlank(message = "El formato del curso es obligatorio")
    private String formato;

    @NotBlank(message = "El idioma del curso es obligatorio")
    private String idioma;

    private String urlVideoPromocional;
    private String imagenMiniatura;
    private Date fechaCreacion;
    private boolean certificadoIncluido;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "instructor_id")
    private Instructor instructor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "categoria_id")
    private Categoria categoria;
}