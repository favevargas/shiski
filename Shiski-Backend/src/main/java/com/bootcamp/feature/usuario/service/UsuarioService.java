package com.bootcamp.feature.usuario.service;


import com.bootcamp.feature.usuario.dto.UsuarioRequest;
import com.bootcamp.feature.usuario.dto.UsuarioResponse;

import java.util.List;


public interface UsuarioService {

    List<UsuarioResponse> listarUsuarios();
    UsuarioResponse obtenerUsuario(Long id);
    UsuarioResponse crearUsuario(UsuarioRequest cliente);
    UsuarioResponse actualizarUsuario(Long id, UsuarioRequest cliente);
    void eliminarUsuario(Long id);

}
