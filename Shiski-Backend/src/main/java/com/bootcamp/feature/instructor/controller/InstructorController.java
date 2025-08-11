package com.bootcamp.feature.instructor.controller;

import com.bootcamp.feature.instructor.dto.InstructorRequest;
import com.bootcamp.feature.instructor.dto.InstructorResponse;
import com.bootcamp.feature.instructor.service.InstructorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/instructores")
@RequiredArgsConstructor
public class InstructorController {

    private final InstructorService instructorService;

    @PostMapping
    public ResponseEntity<InstructorResponse> crearInstructor(@RequestBody InstructorRequest request) {
        return new ResponseEntity<>(instructorService.crearInstructor(request), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<InstructorResponse>> listarInstructores() {
        return ResponseEntity.ok(instructorService.listarInstructores());
    }

    @GetMapping("/{id}")
    public ResponseEntity<InstructorResponse> obtenerInstructor(@PathVariable Long id) {
        return ResponseEntity.ok(instructorService.obtenerInstructor(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<InstructorResponse> actualizarInstructor(@PathVariable Long id, @RequestBody InstructorRequest request) {
        return ResponseEntity.ok(instructorService.actualizarInstructor(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarInstructor(@PathVariable Long id) {
        instructorService.eliminarInstructor(id);
        return ResponseEntity.noContent().build();
    }
}