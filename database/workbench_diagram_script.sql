-- SCRIPT PARA GENERAR DIAGRAMA ER EN MYSQL WORKBENCH - VERSIÓN SIMPLIFICADA

-- Paso 1: Ejecutar la base de datos simplificada shiski_db
-- Paso 2: En MySQL Workbench: Database > Reverse Engineer
-- Paso 3: Seleccionar conexión y esquema shiski_db
-- Paso 4: El diagrama se generará automáticamente

-- COMANDOS PARA VERIFICAR RELACIONES:

-- Ver todas las tablas
SHOW TABLES;

-- Ver llaves foráneas actualizadas
SELECT 
    TABLE_NAME,
    COLUMN_NAME,
    CONSTRAINT_NAME,
    REFERENCED_TABLE_NAME,
    REFERENCED_COLUMN_NAME
FROM information_schema.KEY_COLUMN_USAGE
WHERE REFERENCED_TABLE_SCHEMA = 'shiski_db';

-- Ver estructura de relaciones principales simplificadas
SELECT 
    'usuarios' as tabla_padre,
    'instructores' as tabla_hija,
    '1:1' as relacion,
    'Un usuario puede ser instructor' as descripcion
UNION ALL
SELECT 
    'instructores',
    'cursos', 
    '1:N',
    'Un instructor puede crear múltiples cursos'
UNION ALL
SELECT 
    'categorias',
    'cursos',
    '1:N', 
    'Una categoría puede tener múltiples cursos'
UNION ALL
SELECT 
    'usuarios',
    'carrito',
    '1:N',
    'Un usuario puede tener múltiples items en carrito'
UNION ALL
SELECT 
    'cursos',
    'carrito',
    '1:N',
    'Un curso puede estar en múltiples carritos'
UNION ALL
SELECT 
    'usuarios',
    'inscripciones',
    '1:N',
    'Un usuario puede tener múltiples inscripciones'
UNION ALL
SELECT 
    'cursos',
    'inscripciones',
    '1:N',
    'Un curso puede tener múltiples estudiantes inscritos'
UNION ALL
SELECT 
    'usuarios',
    'pedidos',
    '1:N',
    'Un usuario puede hacer múltiples pedidos'
UNION ALL
SELECT 
    'pedidos',
    'detalle_pedidos',
    '1:N',
    'Un pedido puede tener múltiples items'
UNION ALL
SELECT 
    'cursos',
    'detalle_pedidos',
    '1:N',
    'Un curso puede estar en múltiples detalles de pedidos';

-- CONSULTAS PARA VALIDAR INTEGRIDAD REFERENCIAL

-- Verificar que todos los instructores son usuarios
SELECT i.instructor_id, u.nombre, u.apellido 
FROM instructores i 
JOIN usuarios u ON i.usuario_id = u.usuario_id;

-- Verificar que todos los cursos tienen instructor y categoría
SELECT c.titulo, 
       CONCAT(u.nombre, ' ', u.apellido) as instructor,
       cat.nombre as categoria
FROM cursos c
LEFT JOIN instructores i ON c.instructor_id = i.instructor_id
LEFT JOIN usuarios u ON i.usuario_id = u.usuario_id  
LEFT JOIN categorias cat ON c.categoria_id = cat.categoria_id;

-- Verificar inscripciones válidas
SELECT COUNT(*) as inscripciones_validas
FROM inscripciones ins
JOIN usuarios u ON ins.usuario_id = u.usuario_id
JOIN cursos c ON ins.curso_id = c.curso_id;

-- Verificar pedidos con detalles
SELECT p.pedido_id, p.total, COUNT(dp.detalle_id) as items
FROM pedidos p
LEFT JOIN detalle_pedidos dp ON p.pedido_id = dp.pedido_id
GROUP BY p.pedido_id;

-- Verificar items en carrito
SELECT u.nombre, u.apellido, c.titulo, ca.precio_momento
FROM carrito ca
JOIN usuarios u ON ca.usuario_id = u.usuario_id
JOIN cursos c ON ca.curso_id = c.curso_id;

-- Estadísticas generales de la base simplificada
SELECT 
    'Usuarios totales' as metrica, 
    COUNT(*) as valor 
FROM usuarios
UNION ALL
SELECT 
    'Instructores activos', 
    COUNT(*) 
FROM instructores
UNION ALL
SELECT 
    'Cursos disponibles', 
    COUNT(*) 
FROM cursos WHERE activo = TRUE
UNION ALL
SELECT 
    'Inscripciones activas', 
    COUNT(*) 
FROM inscripciones WHERE estado = 'activo'
UNION ALL
SELECT 
    'Items en carritos', 
    COUNT(*) 
FROM carrito
UNION ALL
SELECT 
    'Pedidos pagados', 
    COUNT(*) 
FROM pedidos WHERE estado_pago = 'pagado';

-- Consulta para verificar flujo completo: Usuario -> Carrito -> Pedido -> Inscripción
SELECT 
    u.nombre,
    u.apellido,
    'Tiene items en carrito' as estado,
    COUNT(ca.carrito_id) as cantidad
FROM usuarios u
LEFT JOIN carrito ca ON u.usuario_id = ca.usuario_id
WHERE ca.carrito_id IS NOT NULL
GROUP BY u.usuario_id
UNION ALL
SELECT 
    u.nombre,
    u.apellido,
    'Tiene pedidos',
    COUNT(p.pedido_id)
FROM usuarios u
LEFT JOIN pedidos p ON u.usuario_id = p.usuario_id
WHERE p.pedido_id IS NOT NULL
GROUP BY u.usuario_id
UNION ALL
SELECT 
    u.nombre,
    u.apellido,
    'Tiene inscripciones',
    COUNT(i.inscripcion_id)
FROM usuarios u
LEFT JOIN inscripciones i ON u.usuario_id = i.usuario_id
WHERE i.inscripcion_id IS NOT NULL
GROUP BY u.usuario_id;