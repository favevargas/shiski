-- =====================================================
-- BASE DE DATOS SHISKI - PLATAFORMA E-LEARNING LOGÍSTICA
-- Versión: 2.0
-- Fecha: Agosto 2025
-- Autor: Tamara
-- =====================================================

-- CREAR BASE DE DATOS
CREATE DATABASE IF NOT EXISTS shiski_db;
USE shiski_db;

-- =====================================================
-- ESTRUCTURA DE TABLAS
-- =====================================================

-- 1. TABLA USUARIOS
-- Almacena información de todas las personas que usan la plataforma
-- Incluye estudiantes que toman cursos, instructores que los crean, y administradores
CREATE TABLE usuarios (
    usuario_id INT PRIMARY KEY AUTO_INCREMENT,  -- Identificador único de cada usuario
    nombre VARCHAR(100) NOT NULL,               -- Nombre de la persona
    apellido VARCHAR(100) NOT NULL,             -- Apellido de la persona  
    email VARCHAR(150) UNIQUE NOT NULL,         -- Email único para login (no puede repetirse)
    password VARCHAR(255) NOT NULL,             -- Contraseña encriptada para seguridad
    telefono VARCHAR(20),                       -- Número de contacto opcional
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP, -- Cuándo se registró en la plataforma
    tipo_usuario ENUM('estudiante', 'instructor', 'admin') DEFAULT 'estudiante', -- Rol en el sistema
    activo BOOLEAN DEFAULT TRUE                 -- Si el usuario puede acceder (habilitado/deshabilitado)
);

-- 2. TABLA CATEGORÍAS  
-- Define las diferentes áreas temáticas de los cursos de logística
-- Ayuda a organizar y filtrar cursos por especialidad
CREATE TABLE categorias (
    categoria_id INT PRIMARY KEY AUTO_INCREMENT, -- Identificador único de cada categoría
    nombre VARCHAR(100) NOT NULL,                -- Nombre de la categoría (ej: "Gestión de Inventarios")
    descripcion TEXT,                            -- Explicación detallada de qué incluye esta categoría
    activa BOOLEAN DEFAULT TRUE                  -- Si la categoría está disponible para nuevos cursos
);

-- 3. TABLA INSTRUCTORES
-- Perfiles detallados de las personas que dictan cursos
-- Se conecta con la tabla usuarios para obtener datos personales básicos  
CREATE TABLE instructores (
    instructor_id INT PRIMARY KEY AUTO_INCREMENT,   -- Identificador único del instructor
    usuario_id INT,                                 -- Conexión con la tabla usuarios (quién es esta persona)
    biografia TEXT,                                 -- Historia profesional y experiencia del instructor
    experiencia TEXT,                               -- Años y tipo de experiencia laboral
    especialidad VARCHAR(200),                      -- Área de expertise principal (ej: "Transporte Internacional")
    certificaciones TEXT,                           -- Títulos, certificados y credenciales profesionales
    calificacion_promedio DECIMAL(2,1) DEFAULT 0.0, -- Puntuación promedio dada por estudiantes (1.0 a 5.0)
    foto_perfil VARCHAR(255),                       -- URL de la imagen del perfil del instructor
    FOREIGN KEY (usuario_id) REFERENCES usuarios(usuario_id) -- Un instructor debe ser primero un usuario
);

-- 4. TABLA CURSOS
-- Catálogo de todos los cursos disponibles en la plataforma
-- Cada curso pertenece a un instructor y una categoría específica
CREATE TABLE cursos (
    curso_id INT PRIMARY KEY AUTO_INCREMENT,        -- Identificador único de cada curso
    titulo VARCHAR(200) NOT NULL,                   -- Nombre del curso visible para estudiantes
    descripcion TEXT,                               -- Explicación detallada de qué aprenderá el estudiante
    objetivos TEXT,                                 -- Metas específicas y resultados esperados del curso
    precio DECIMAL(10,2) NOT NULL,                  -- Costo en pesos chilenos (formato: 99999.99)
    duracion_horas INT,                             -- Tiempo total estimado para completar el curso
    nivel ENUM('basico', 'intermedio', 'avanzado') DEFAULT 'basico', -- Dificultad requerida
    instructor_id INT,                              -- Quién dicta este curso (conexión con instructores)
    categoria_id INT,                               -- A qué área temática pertenece (conexión con categorías)
    imagen_miniatura VARCHAR(255),                  -- URL de imagen representativa del curso
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP, -- Cuándo fue publicado el curso
    activo BOOLEAN DEFAULT TRUE,                    -- Si el curso está disponible para inscripción
    certificado_incluido BOOLEAN DEFAULT FALSE,     -- Si al completarlo se otorga un certificado oficial
    FOREIGN KEY (instructor_id) REFERENCES instructores(instructor_id), -- Debe tener un instructor válido
    FOREIGN KEY (categoria_id) REFERENCES categorias(categoria_id)      -- Debe pertenecer a una categoría existente
);

-- 5. TABLA CARRITO DE COMPRAS
-- Almacena cursos que los usuarios han seleccionado pero aún no han comprado
-- Simula un carrito de e-commerce tradicional para cursos online
CREATE TABLE carrito (
    carrito_id INT PRIMARY KEY AUTO_INCREMENT,      -- Identificador único de cada item del carrito
    usuario_id INT,                                 -- Quién agregó este curso a su carrito
    curso_id INT,                                   -- Qué curso específico está en el carrito
    fecha_agregado DATETIME DEFAULT CURRENT_TIMESTAMP, -- Cuándo se agregó al carrito
    precio_momento DECIMAL(10,2),                   -- Precio del curso cuando se agregó (puede cambiar después)
    FOREIGN KEY (usuario_id) REFERENCES usuarios(usuario_id), -- El usuario debe existir
    FOREIGN KEY (curso_id) REFERENCES cursos(curso_id)        -- El curso debe existir y estar activo
);

-- 6. TABLA INSCRIPCIONES
-- Registra qué estudiantes están tomando qué cursos y su progreso
-- Se crea automáticamente cuando un estudiante compra un curso
CREATE TABLE inscripciones (
    inscripcion_id INT PRIMARY KEY AUTO_INCREMENT,  -- Identificador único de cada inscripción
    usuario_id INT,                                 -- Qué estudiante está inscrito
    curso_id INT,                                   -- En qué curso está inscrito
    fecha_inscripcion DATETIME DEFAULT CURRENT_TIMESTAMP, -- Cuándo comenzó a estudiar
    progreso_porcentaje DECIMAL(5,2) DEFAULT 0.00,  -- Avance del curso (0.00% a 100.00%)
    estado ENUM('activo', 'completado', 'suspendido') DEFAULT 'activo', -- Situación actual del estudiante
    certificado_emitido BOOLEAN DEFAULT FALSE,      -- Si ya se generó el certificado de finalización
    FOREIGN KEY (usuario_id) REFERENCES usuarios(usuario_id), -- Estudiante debe existir
    FOREIGN KEY (curso_id) REFERENCES cursos(curso_id)        -- Curso debe existir
);

-- 7. TABLA PEDIDOS
-- Registra las órdenes de compra realizadas por los usuarios
-- Cada pedido puede incluir uno o varios cursos (ver detalle_pedidos)
CREATE TABLE pedidos (
    pedido_id INT PRIMARY KEY AUTO_INCREMENT,       -- Identificador único de cada orden de compra
    usuario_id INT,                                 -- Quién realizó la compra
    fecha_pedido DATETIME DEFAULT CURRENT_TIMESTAMP, -- Cuándo se generó la orden
    total DECIMAL(10,2),                            -- Monto total pagado en pesos chilenos
    estado_pago ENUM('pendiente', 'pagado', 'fallido') DEFAULT 'pendiente', -- Situación del pago
    metodo_pago VARCHAR(50),                        -- Cómo pagó (webpay, transferencia, tarjeta, etc.)
    FOREIGN KEY (usuario_id) REFERENCES usuarios(usuario_id) -- El comprador debe existir
);

-- 8. TABLA DETALLE DE PEDIDOS
-- Especifica qué cursos exactos se compraron en cada pedido
-- Permite que un pedido contenga múltiples cursos diferentes
CREATE TABLE detalle_pedidos (
    detalle_id INT PRIMARY KEY AUTO_INCREMENT,      -- Identificador único de cada línea de detalle
    pedido_id INT,                                  -- A qué pedido pertenece este curso
    curso_id INT,                                   -- Qué curso específico se compró
    precio_unitario DECIMAL(10,2),                  -- Precio del curso al momento de la compra
    FOREIGN KEY (pedido_id) REFERENCES pedidos(pedido_id), -- El pedido debe existir
    FOREIGN KEY (curso_id) REFERENCES cursos(curso_id)     -- El curso debe existir
);

-- =====================================================
-- DATOS DE MUESTRA
-- =====================================================

-- USUARIOS: Creamos diferentes tipos de usuarios para simular un entorno real
-- Incluye estudiantes, instructores y administrador del sistema
INSERT INTO usuarios (nombre, apellido, email, password, telefono, tipo_usuario) VALUES
('Juan', 'Pérez', 'juan.perez@email.com', 'hash123', '+56912345678', 'estudiante'),    -- Estudiante que tomará varios cursos
('María', 'González', 'maria.gonzalez@email.com', 'hash456', '+56923456789', 'instructor'), -- Instructora especialista en inventarios
('Carlos', 'López', 'carlos.lopez@email.com', 'hash789', '+56934567890', 'estudiante'),     -- Otro estudiante activo
('Ana', 'Martínez', 'ana.martinez@email.com', 'hash101', '+56945678901', 'instructor'),     -- Instructora de transporte internacional
('Admin', 'Sistema', 'admin@shiski.com', 'hashadmin', '+56956789012', 'admin');              -- Administrador del sistema

-- CATEGORÍAS: Principales áreas de especialización en logística
-- Estas categorías agrupan los cursos por temática específica
INSERT INTO categorias (nombre, descripcion) VALUES
('Gestión de Inventarios', 'Cursos sobre control y optimización de inventarios'),          -- Cat. ID 1: Manejo de stock y almacén
('Transporte y Distribución', 'Capacitación en rutas, flotas y logística de transporte'), -- Cat. ID 2: Optimización de envíos
('Almacenamiento', 'Gestión de almacenes y centros de distribución'),                      -- Cat. ID 3: Administración de bodegas
('Cadena de Suministro', 'Estrategias y gestión integral de supply chain');                -- Cat. ID 4: Visión estratégica integral

-- INSTRUCTORES: Perfiles de los educadores que crearán y dictarán los cursos
-- Se relacionan con usuarios que tienen tipo 'instructor'
INSERT INTO instructores (usuario_id, biografia, especialidad, calificacion_promedio) VALUES
(2, 'Especialista en logística con 15 años de experiencia', 'Gestión de Inventarios', 4.8),  -- María González: Experta en inventarios
(4, 'Experta en transporte internacional', 'Transporte Internacional', 4.9);                   -- Ana Martínez: Especialista en transporte

-- CURSOS: Catálogo de cursos disponibles en la plataforma
-- Cada curso tiene un instructor, categoría, precio y características específicas
INSERT INTO cursos (titulo, descripcion, precio, duracion_horas, nivel, instructor_id, categoria_id, certificado_incluido) VALUES
('Optimización de Rutas de Entrega', 'Aprende técnicas avanzadas para optimizar rutas y reducir costos', 49990, 20, 'intermedio', 1, 2, TRUE),  -- Curso ID 1: Dictado por María (instructor_id 1) en categoría Transporte (2)
('Gestión Avanzada de Inventarios', 'Sistema integral para el control eficiente de inventarios', 69990, 30, 'avanzado', 2, 1, TRUE),            -- Curso ID 2: Dictado por Ana (instructor_id 2) en categoría Inventarios (1)  
('Introducción a la Logística', 'Fundamentos básicos del sector logístico chileno', 29990, 15, 'basico', 1, 4, FALSE);                         -- Curso ID 3: Curso básico dictado por María en categoría Supply Chain (4)

-- CARRITO: Simula estudiantes que han agregado cursos a su carrito pero aún no compran
-- Representa la intención de compra antes del pago
INSERT INTO carrito (usuario_id, curso_id, precio_momento) VALUES
(1, 2, 69990),  -- Juan tiene en su carrito el curso de "Gestión Avanzada de Inventarios" por $69.990
(3, 1, 49990),  -- Carlos quiere comprar "Optimización de Rutas de Entrega" por $49.990
(1, 3, 29990);  -- Juan también está interesado en "Introducción a la Logística" por $29.990

-- INSCRIPCIONES: Estudiantes que ya compraron y están tomando cursos
-- Muestra el progreso actual de cada estudiante en sus cursos
INSERT INTO inscripciones (usuario_id, curso_id, progreso_porcentaje, estado) VALUES
(1, 1, 75.5, 'activo'),     -- Juan está tomando "Optimización de Rutas" y lleva 75.5% de avance
(3, 2, 100.0, 'completado'), -- Carlos terminó completamente el curso de "Gestión de Inventarios"
(1, 3, 45.0, 'activo');     -- Juan también estudia "Introducción a la Logística" con 45% de progreso

-- PEDIDOS: Órdenes de compra realizadas por los estudiantes
-- Representa las transacciones comerciales de la plataforma
INSERT INTO pedidos (usuario_id, total, estado_pago, metodo_pago) VALUES
(1, 49990, 'pagado', 'webpay'),           -- Juan pagó $49.990 por un curso usando WebPay
(3, 69990, 'pagado', 'transferencia'),    -- Carlos pagó $69.990 mediante transferencia bancaria
(1, 29990, 'pendiente', 'tarjeta_credito'); -- Juan tiene un pago pendiente de $29.990 con tarjeta

-- DETALLE DE PEDIDOS: Especifica qué curso se compró en cada pedido
-- Conecta los pedidos con los cursos específicos adquiridos
INSERT INTO detalle_pedidos (pedido_id, curso_id, precio_unitario) VALUES
(1, 1, 49990),  -- El pedido #1 de Juan incluye "Optimización de Rutas" por $49.990
(2, 2, 69990),  -- El pedido #2 de Carlos incluye "Gestión de Inventarios" por $69.990
(3, 3, 29990);  -- El pedido #3 de Juan incluye "Introducción a la Logística" por $29.990