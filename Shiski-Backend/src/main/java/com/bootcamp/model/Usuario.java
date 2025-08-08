package com.bootcamp.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import com.bootcamp.model.enums.TipoUsuario;

import java.util.Set;

@Entity
@Getter
@Setter
@Table(name = "usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String apellido;
    private String email;
    private String password;
    private String telefono;
    private String rol;

    // Asumiendo que `tipo_usuario` es un ENUM en tu base de datos
    @Enumerated(EnumType.STRING)
    private TipoUsuario tipoUsuario;

    private boolean activo;
    private int usuarioId;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Inscripcion> inscripciones;
}