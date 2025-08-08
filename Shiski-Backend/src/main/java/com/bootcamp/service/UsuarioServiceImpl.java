package com.bootcamp.service;

import com.bootcamp.dto.UsuarioRequest;
import com.bootcamp.dto.UsuarioResponse;
import com.bootcamp.mapper.UsuarioMapper;
import com.bootcamp.model.Usuario;
import com.bootcamp.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UsuarioServiceImpl implements UsuarioService {

    private final UsuarioRepository clienteRepository;

    @Override
    public List<UsuarioResponse> listarUsuarios() {
        return clienteRepository.findAll().stream()
                .map(UsuarioMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public UsuarioResponse obtenerUsuario(Long id) {
        Usuario usuario = clienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));
        return UsuarioMapper.toResponse(usuario);
    }

    @Override
    public UsuarioResponse crearUsuario(UsuarioRequest request) {
        Usuario usuario = UsuarioMapper.toEntity(request);
        return UsuarioMapper.toResponse(clienteRepository.save(usuario));
    }

    @Override
    public UsuarioResponse actualizarUsuario(Long id, UsuarioRequest request) {
        Usuario usuario = clienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));
        usuario.setNombre(request.nombre());
        usuario.setEmail(request.email());
        return UsuarioMapper.toResponse(clienteRepository.save(usuario));
    }

    @Override
    public void eliminarUsuario(Long id) {
        clienteRepository.deleteById(id);
    }
}