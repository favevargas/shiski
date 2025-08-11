package com.bootcamp.feature.pedido.detallePedido.model;

import com.bootcamp.feature.curso.model.Curso;
import com.bootcamp.feature.pedido.model.Pedido;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;

@Entity
@Getter
@Setter
@Table(name = "detalle_pedidos")
public class DetallePedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "pedido_id")
    private Pedido pedido;

    @ManyToOne
    @JoinColumn(name = "curso_id")
    private Curso curso;

    private int cantidad;

    private BigDecimal precioUnitario;
}