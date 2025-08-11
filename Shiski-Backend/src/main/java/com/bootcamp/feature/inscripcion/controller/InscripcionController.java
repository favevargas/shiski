package com.bootcamp.feature.inscripcion.controller;

import com.bootcamp.feature.inscripcion.dto.InscripcionRequest;
import com.bootcamp.feature.inscripcion.dto.InscripcionResponse;
import com.bootcamp.feature.inscripcion.service.InscripcionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/inscripciones")
@RequiredArgsConstructor
public class InscripcionController {

    private final InscripcionService inscripcionService;

    @PostMapping
    public ResponseEntity<InscripcionResponse> crearInscripcion(@RequestBody InscripcionRequest request) {
        return new ResponseEntity<>(inscripcionService.crearInscripcion(request), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<InscripcionResponse>> listarInscripciones() {
        return ResponseEntity.ok(inscripcionService.listarInscripciones());
    }

    @GetMapping("/{id}")
    public ResponseEntity<InscripcionResponse> obtenerInscripcion(@PathVariable Long id) {
        return ResponseEntity.ok(inscripcionService.obtenerInscripcion(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<InscripcionResponse> actualizarInscripcion(@PathVariable Long id, @RequestBody InscripcionRequest request) {
        return ResponseEntity.ok(inscripcionService.actualizarInscripcion(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarInscripcion(@PathVariable Long id) {
        inscripcionService.eliminarInscripcion(id);
        return ResponseEntity.noContent().build();
    }
}