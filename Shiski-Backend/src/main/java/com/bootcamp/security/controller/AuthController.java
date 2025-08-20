package com.bootcamp.security.controller;

import com.bootcamp.security.dto.LoginRequest;
import com.bootcamp.security.dto.LoginResponse;
import com.bootcamp.security.dto.RegisterRequest;
import com.bootcamp.security.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    //Solo el endpoint específico
    @PostMapping("/register")  // Resultado: /api/v1/auth/register
    public ResponseEntity<Void> register(@RequestBody RegisterRequest request) {
        authService.registrar(request.nombre(), request.email(), request.password());
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    // Solo el endpoint específico
    @PostMapping("/login")     // Resultado: /api/v1/auth/login
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        LoginResponse response = authService.login(request.email(), request.password());
        return ResponseEntity.ok(response);
    }
}
