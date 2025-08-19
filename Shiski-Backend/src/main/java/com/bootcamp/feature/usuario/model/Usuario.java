package com.bootcamp.feature.usuario.model;

import com.bootcamp.feature.inscripcion.model.Inscripcion;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Getter
@Setter
@Table(name = "usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "usuario_id")  // ✅ Mapear a la columna correcta
    private Long id;

    private String nombre;
    private String apellido;
    private String email;
    private String password;
    private String telefono;
    
    @Column(name = "fecha_registro")
    private LocalDateTime fechaRegistro;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_usuario")  // ✅ Mapear a la columna correcta
    private TipoUsuario tipoUsuario;

    private boolean activo;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Inscripcion> inscripciones;
    
    // Campo adicional para roles de Spring Security (si es necesario)
    private String rol;
}