package com.bootcamp.feature.pedido.controller;

import com.bootcamp.feature.pedido.dto.PedidoRequest;
import com.bootcamp.feature.pedido.dto.PedidoResponse;
import com.bootcamp.feature.pedido.service.PedidoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/pedidos")
public class PedidoController {

    private final PedidoService pedidoService;

    public PedidoController(PedidoService pedidoService) {
        this.pedidoService = pedidoService;
    }

    @PostMapping
    public ResponseEntity<PedidoResponse> crearPedido(@RequestBody PedidoRequest pedidoRequest) {
        // El pedidoService recibe el PedidoRequest que ya trae los detalles
        PedidoResponse response = pedidoService.crearPedido(pedidoRequest);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PedidoResponse> obtenerPedidoPorId(@PathVariable("id") Long id) {
        PedidoResponse response = pedidoService.obtenerPedido(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<PedidoResponse>> listarPedidos() {
        List<PedidoResponse> pedidos = pedidoService.listarPedidos();
        return new ResponseEntity<>(pedidos, HttpStatus.OK);
    }
}