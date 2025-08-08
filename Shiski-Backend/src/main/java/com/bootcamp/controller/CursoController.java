package com.bootcamp.controller;

import com.bootcamp.dto.CursoRequest;
import com.bootcamp.dto.CursoResponse;
import com.bootcamp.service.CursoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cursos")
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
