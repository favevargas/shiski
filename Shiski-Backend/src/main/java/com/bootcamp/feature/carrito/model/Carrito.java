package com.bootcamp.feature.carrito.model;

import com.bootcamp.feature.curso.model.Curso;
import com.bootcamp.feature.usuario.model.Usuario;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Getter
@Setter
@Table(name = "carrito")
public class Carrito {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "curso_id")
    private Curso curso;

    private Date fechaAgregado;
    private BigDecimal precioMomento;
}