package com.bootcamp.tiendita.controller;


import com.bootcamp.feature.carrito.dto.CarritoRequest;
import com.bootcamp.feature.carrito.dto.CarritoResponse;
import com.bootcamp.feature.carrito.service.CarritoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/carrito")
public class CarritoController {

    @Autowired
    private CarritoService carritoService;

    @PostMapping
    public ResponseEntity<CarritoResponse> agregarProductoAlCarrito(@RequestBody CarritoRequest carritoRequest) {
        CarritoResponse response = carritoService.agregarProducto(carritoRequest);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarProductoDelCarrito(@PathVariable("id") Long id) {
        carritoService.eliminarProducto(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/{usuarioId}")
    public ResponseEntity<CarritoResponse> obtenerCarritoPorUsuario(@PathVariable("usuarioId") Long usuarioId) {
        CarritoResponse response = carritoService.obtenerCarrito(usuarioId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<CarritoResponse> actualizarCantidadProducto(@RequestBody CarritoRequest carritoRequest) {
        CarritoResponse response = carritoService.actualizarCantidad(carritoRequest);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/vaciar/{usuarioId}")
    public ResponseEntity<Void> vaciarCarrito(@PathVariable("usuarioId") Long usuarioId) {
        carritoService.vaciarCarrito(usuarioId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}