-- Crear tabla testimonios
CREATE TABLE testimonios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    comentario TEXT NOT NULL,
    calificacion INT NOT NULL CHECK (calificacion >= 1 AND calificacion <= 5),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    curso_id BIGINT NOT NULL,
    usuario_id BIGINT NOT NULL,
    
    FOREIGN KEY (curso_id) REFERENCES cursos(curso_id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(usuario_id) ON DELETE CASCADE,
    
    INDEX idx_testimonios_curso (curso_id),
    INDEX idx_testimonios_usuario (usuario_id),
    INDEX idx_testimonios_fecha (fecha_creacion)
);

-- Datos de ejemplo para testimonios
INSERT INTO testimonios (comentario, calificacion, curso_id, usuario_id) VALUES
('Excelente curso, muy bien explicado y con ejemplos prácticos.', 5, 1, 1),
('Me gustó mucho el contenido, aunque podría tener más ejercicios.', 4, 1, 2),
('Curso muy completo y actualizado. Lo recomiendo totalmente.', 5, 2, 1),
('Buen curso para principiantes, fácil de seguir.', 4, 2, 3),
('El instructor explica muy bien, contenido de calidad.', 5, 3, 2),
('Curso interesante pero un poco básico para mi nivel.', 3, 3, 1);