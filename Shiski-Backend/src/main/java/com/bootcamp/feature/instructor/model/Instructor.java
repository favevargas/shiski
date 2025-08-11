package com.bootcamp.feature.instructor.model;

import com.bootcamp.feature.usuario.model.Usuario;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
@Table(name = "instructores")
public class Instructor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String biografia;
    private String especialidad;
    private int certificaciones;
    private BigDecimal calificacionPromedio;
    private String fotoPerfil;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;
}