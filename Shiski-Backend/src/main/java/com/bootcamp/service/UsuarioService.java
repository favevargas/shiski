package com.bootcamp.service;


import com.bootcamp.dto.UsuarioRequest;
import com.bootcamp.dto.UsuarioResponse;

import java.util.List;


public interface UsuarioService {

    List<UsuarioResponse> listarUsuarios();
    UsuarioResponse obtenerUsuario(Long id);
    UsuarioResponse crearUsuario(UsuarioRequest cliente);
    UsuarioResponse actualizarUsuario(Long id, UsuarioRequest cliente);
    void eliminarUsuario(Long id);

}
