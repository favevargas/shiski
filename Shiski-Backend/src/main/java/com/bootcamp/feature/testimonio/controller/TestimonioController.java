package com.bootcamp.feature.testimonio.controller;

import com.bootcamp.feature.testimonio.dto.TestimonioRequest;
import com.bootcamp.feature.testimonio.dto.TestimonioResponse;
import com.bootcamp.feature.testimonio.service.TestimonioService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/testimonios")
@RequiredArgsConstructor
public class TestimonioController {

    private final TestimonioService testimonioService;

    @PostMapping
    public ResponseEntity<TestimonioResponse> crearTestimonio(@Valid @RequestBody TestimonioRequest request) {
        TestimonioResponse response = testimonioService.crearTestimonio(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/curso/{cursoId}")
    public ResponseEntity<List<TestimonioResponse>> obtenerTestimoniosPorCurso(@PathVariable Long cursoId) {
        List<TestimonioResponse> testimonios = testimonioService.obtenerTestimoniosPorCurso(cursoId);
        return ResponseEntity.ok(testimonios);
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<TestimonioResponse>> obtenerTestimoniosPorUsuario(@PathVariable Long usuarioId) {
        List<TestimonioResponse> testimonios = testimonioService.obtenerTestimoniosPorUsuario(usuarioId);
        return ResponseEntity.ok(testimonios);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TestimonioResponse> obtenerTestimonioPorId(@PathVariable Long id) {
        TestimonioResponse testimonio = testimonioService.obtenerTestimonioPorId(id);
        return ResponseEntity.ok(testimonio);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TestimonioResponse> actualizarTestimonio(
            @PathVariable Long id, 
            @Valid @RequestBody TestimonioRequest request) {
        TestimonioResponse response = testimonioService.actualizarTestimonio(id, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarTestimonio(@PathVariable Long id) {
        testimonioService.eliminarTestimonio(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/curso/{cursoId}/promedio")
    public ResponseEntity<Double> obtenerCalificacionPromedio(@PathVariable Long cursoId) {
        Double promedio = testimonioService.obtenerCalificacionPromedioPorCurso(cursoId);
        return ResponseEntity.ok(promedio);
    }

    @GetMapping("/curso/{cursoId}/count")
    public ResponseEntity<Long> contarTestimonios(@PathVariable Long cursoId) {
        Long count = testimonioService.contarTestimoniosPorCurso(cursoId);
        return ResponseEntity.ok(count);
    }
}