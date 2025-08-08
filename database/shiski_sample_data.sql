-- INSERTAR DATOS DE MUESTRA

-- 1. USUARIOS (5 registros)
INSERT INTO usuarios (nombre, apellido, email, password, telefono, tipo_usuario) VALUES
('Juan', 'Pérez', 'juan.perez@email.com', 'hash123', '+56912345678', 'estudiante'),
('María', 'González', 'maria.gonzalez@email.com', 'hash456', '+56923456789', 'instructor'),
('Carlos', 'López', 'carlos.lopez@email.com', 'hash789', '+56934567890', 'estudiante'),
('Ana', 'Martínez', 'ana.martinez@email.com', 'hash101', '+56945678901', 'instructor'),
('Admin', 'Sistema', 'admin@shiski.com', 'hashadmin', '+56956789012', 'admin');

-- 2. CATEGORÍAS (5 registros)
INSERT INTO categorias (nombre, descripcion) VALUES
('Gestión de Inventarios', 'Cursos sobre control y optimización de inventarios'),
('Transporte y Distribución', 'Capacitación en rutas, flotas y logística de transporte'),
('Almacenamiento', 'Gestión de almacenes y centros de distribución'),
('Cadena de Suministro', 'Estrategias y gestión integral de supply chain'),
('Logística Internacional', 'Comercio exterior, aduanas y logística global');

-- 3. INSTRUCTORES (5 registros)
INSERT INTO instructores (id_usuario, biografia, experiencia, especialidad, certificaciones, calificacion_promedio) VALUES
(2, 'Especialista en logística con 15 años de experiencia', '15 años en empresas multinacionales', 'Gestión de Inventarios', 'Certificación APICS, Six Sigma Black Belt', 4.8),
(4, 'Experta en transporte internacional', '12 años en logística marítima y aérea', 'Transporte Internacional', 'IATA Cargo, Certified Supply Chain Professional', 4.9),
(1, 'Consultor en optimización logística', '10 años en consultoría empresarial', 'Cadena de Suministro', 'SCOR Framework, PMP', 4.7),
(3, 'Especialista en almacenes automatizados', '8 años en centros de distribución', 'Automatización de Almacenes', 'WMS Specialist, Lean Six Sigma', 4.6),
(5, 'Director de operaciones logísticas', '20 años liderando equipos', 'Gestión Operacional', 'MBA Logística, CSCMP', 4.9);

-- 4. CURSOS (5 registros)
INSERT INTO cursos (titulo, descripcion, objetivos, precio, duracion_horas, nivel, id_instructor, id_categoria, certificado_incluido, material_descargable) VALUES
('Optimización de Rutas de Entrega', 'Aprende técnicas avanzadas para optimizar rutas y reducir costos de transporte', 'Dominar algoritmos de ruteo, reducir costos operativos', 49990, 20, 'intermedio', 1, 2, TRUE, TRUE),
('Gestión Avanzada de Inventarios', 'Sistema integral para el control eficiente de inventarios', 'Implementar sistemas de control, optimizar rotación', 69990, 30, 'avanzado', 2, 1, TRUE, TRUE),
('Introducción a la Logística', 'Fundamentos básicos del sector logístico chileno', 'Comprender conceptos básicos, identificar oportunidades', 29990, 15, 'basico', 3, 4, FALSE, TRUE),
('Automatización de Almacenes', 'Tecnologías WMS y robótica en centros de distribución', 'Implementar sistemas automatizados, mejorar eficiencia', 89990, 40, 'avanzado', 4, 3, TRUE, TRUE),
('Logística Internacional y Aduanas', 'Procedimientos aduaneros y comercio exterior', 'Gestionar importaciones/exportaciones, cumplir normativas', 79990, 35, 'intermedio', 5, 5, TRUE, TRUE);

-- 5. MÓDULOS (5 registros para el primer curso)
INSERT INTO modulos (id_curso, titulo, descripcion, orden_modulo, duracion_minutos, tipo_contenido) VALUES
(1, 'Introducción al Ruteo Vehicular', 'Conceptos básicos de optimización de rutas', 1, 45, 'video'),
(1, 'Algoritmos de Optimización', 'Algoritmos Clarke-Wright y otros métodos', 2, 60, 'video'),
(1, 'Software de Ruteo', 'Herramientas digitales para planificación', 3, 50, 'video'),
(1, 'Casos Prácticos', 'Resolución de problemas reales', 4, 90, 'simulacion'),
(1, 'Evaluación Final', 'Prueba de conocimientos adquiridos', 5, 30, 'quiz');

-- 6. INSCRIPCIONES (5 registros)
INSERT INTO inscripciones (id_usuario, id_curso, fecha_inicio, progreso_porcentaje, estado) VALUES
(1, 1, '2024-07-01 09:00:00', 75.5, 'activo'),
(3, 2, '2024-07-15 10:30:00', 100.0, 'completado'),
(1, 3, '2024-07-20 14:00:00', 45.0, 'activo'),
(3, 4, '2024-06-01 08:00:00', 100.0, 'completado'),
(1, 5, '2024-07-25 16:00:00', 20.0, 'activo');

-- 7. CARRITO (5 registros)
INSERT INTO carrito (id_usuario, id_curso, precio_momento) VALUES
(1, 2, 69990),
(3, 1, 49990),
(1, 4, 89990),
(3, 5, 79990),
(1, 3, 29990);

-- 8. PEDIDOS (5 registros)
INSERT INTO pedidos (id_usuario, subtotal, descuento, total, estado_pago, metodo_pago, codigo_transaccion) VALUES
(1, 49990, 0, 49990, 'pagado', 'webpay', 'TXN001234567'),
(3, 69990, 6999, 62991, 'pagado', 'transferencia', 'TXN001234568'),
(1, 29990, 0, 29990, 'pagado', 'tarjeta_credito', 'TXN001234569'),
(3, 89990, 0, 89990, 'pendiente', 'paypal', 'TXN001234570'),
(1, 79990, 7999, 71991, 'pagado', 'webpay', 'TXN001234571');

-- 9. DETALLE_PEDIDOS (5 registros)
INSERT INTO detalle_pedidos (id_pedido, id_curso, precio_unitario, cantidad, subtotal) VALUES
(1, 1, 49990, 1, 49990),
(2, 2, 69990, 1, 69990),
(3, 3, 29990, 1, 29990),
(4, 4, 89990, 1, 89990),
(5, 5, 79990, 1, 79990);

-- 10. RESEÑAS (5 registros)
INSERT INTO resenas (id_usuario, id_curso, calificacion, comentario) VALUES
(1, 1, 5, 'Excelente curso, muy práctico y bien explicado'),
(3, 2, 4, 'Muy completo, aunque podría tener más ejemplos'),
(1, 3, 5, 'Perfecto para comenzar en logística'),
(3, 4, 5, 'La mejor inversión que he hecho en capacitación'),
(1, 5, 4, 'Muy técnico, recomendado para nivel intermedio');

-- 11. CUPONES (5 registros)
INSERT INTO cupones (codigo, descripcion, tipo_descuento, valor_descuento, fecha_inicio, fecha_vencimiento, usos_maximos) VALUES
('BIENVENIDO10', 'Descuento de bienvenida 10%', 'porcentaje', 10.00, '2024-07-01', '2024-12-31', 100),
('LOGISTICA20', 'Promoción especial logística', 'porcentaje', 20.00, '2024-07-01', '2024-08-31', 50),
('PRIMERAVEZ', 'Primera compra descuento fijo', 'monto_fijo', 15000.00, '2024-07-01', '2024-12-31', 200),
('ESTUDIANTE15', 'Descuento para estudiantes', 'porcentaje', 15.00, '2024-07-01', '2024-12-31', 500),
('VIP25', 'Descuento VIP clientes premium', 'porcentaje', 25.00, '2024-07-01', '2024-09-30', 25);

-- 12. PREGUNTAS_RESPUESTAS (5 registros)
INSERT INTO preguntas_respuestas (id_curso, id_usuario_pregunta, id_usuario_respuesta, pregunta, respuesta, fecha_respuesta) VALUES
(1, 1, 2, '¿Qué software recomiendan para ruteo?', 'Recomendamos Route4Me o Google Maps Platform para comenzar', '2024-07-29 10:30:00'),
(2, 3, 2, '¿Incluye plantillas de Excel?', 'Sí, incluimos 15 plantillas descargables', '2024-07-29 11:00:00'),
(1, 1, 2, '¿Hay certificado al completar?', 'Sí, certificado digital verificable', '2024-07-29 09:15:00'),
(3, 3, 3, '¿Cuánto tiempo tengo para completar?', 'Acceso ilimitado una vez inscrito', '2024-07-29 14:45:00'),
(4, 1, 4, '¿Se actualiza el contenido?', 'Actualizamos trimestralmente', '2024-07-29 16:20:00');

-- 13. GAMIFICACIÓN (5 registros)
INSERT INTO gamificacion (id_usuario, puntos_totales, nivel_actual, insignias_obtenidas) VALUES
(1, 1250, 3, '["Primera_Inscripcion", "Curso_Completado", "Evaluador_Activo"]'),
(3, 2100, 4, '["Primera_Inscripcion", "Curso_Completado", "Experto_Logistica", "Mentor"]'),
(2, 500, 1, '["Instructor_Nuevo"]'),
(4, 800, 2, '["Primera_Inscripcion", "Instructor_Activo"]'),
(5, 300, 1, '["Admin_Sistema"]');

-- 14. PROGRESO_MODULOS (5 registros)
INSERT INTO progreso_modulos (id_usuario, id_modulo, completado, fecha_completado, tiempo_dedicado_minutos) VALUES
(1, 1, TRUE, '2024-07-02 10:30:00', 45),
(1, 2, TRUE, '2024-07-03 11:15:00', 65),
(1, 3, TRUE, '2024-07-04 09:45:00', 55),
(1, 4, FALSE, NULL, 30),
(3, 1, TRUE, '2024-07-16 14:20:00', 42);

-- 15. MENSAJES_CONTACTO (5 registros)
INSERT INTO mensajes_contacto (nombre, email, asunto, mensaje) VALUES
('Pedro Ramírez', 'pedro.ramirez@email.com', 'Consulta sobre certificaciones', 'Hola, quisiera saber si los certificados son reconocidos por empresas'),
('Sofía Castro', 'sofia.castro@email.com', 'Problema con pago', 'No pude completar mi pago con tarjeta de crédito'),
('Miguel Torres', 'miguel.torres@email.com', 'Sugerencia de curso', 'Podrían agregar un curso sobre logística inversa?'),
('Carmen Ruiz', 'carmen.ruiz@email.com', 'Descuento empresarial', 'Somos una empresa de 50 empleados, tienen descuentos?'),
('Roberto Silva', 'roberto.silva@email.com', 'Acceso a contenido', 'No puedo acceder al módulo 3 del curso de inventarios');