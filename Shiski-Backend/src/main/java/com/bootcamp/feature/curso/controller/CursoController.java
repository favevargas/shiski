package com.bootcamp.feature.curso.controller;

import com.bootcamp.feature.curso.dto.CursoRequest;
import com.bootcamp.feature.curso.dto.CursoResponse;
import com.bootcamp.feature.curso.service.CursoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/cursos")
public class CursoController {

    @Autowired
    private CursoService service;

    @PostMapping
    public ResponseEntity<CursoResponse> crear(@RequestBody CursoRequest request) {
        return ResponseEntity.ok(service.crearCurso(request));
    }

    @GetMapping
    public ResponseEntity<List<CursoResponse>> listarCursos(){
        return ResponseEntity.ok(service.listarCursos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CursoResponse> obtenerCurso(@PathVariable Long id){
        return ResponseEntity.ok(service.obtenerCurso(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CursoResponse> actualizarCurso(@PathVariable Long id, @RequestBody CursoRequest request){
        return ResponseEntity.ok(service.actualizarCurso(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarCurso(@PathVariable Long id){
        service.eliminarCurso(id);
        return ResponseEntity.noContent().build();
    }
}
