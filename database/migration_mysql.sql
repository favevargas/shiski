-- Migración para MySQL
-- Eliminar tablas de roles
DROP TABLE IF EXISTS usuario_roles;
DROP TABLE IF EXISTS roles;

-- Modificar tabla usuarios
ALTER TABLE usuarios 
DROP COLUMN IF EXISTS apellido,
DROP COLUMN IF EXISTS telefono,
DROP COLUMN IF EXISTS tipo_usuario;

-- Agregar columna rol como ENUM
ALTER TABLE usuarios 
ADD COLUMN rol ENUM('ROLE_USER', 'ROLE_ADMIN') DEFAULT 'ROLE_USER' NOT NULL,
ADD COLUMN activo BOOLEAN DEFAULT true NOT NULL;

-- Asegurar que email sea único
ALTER TABLE usuarios ADD CONSTRAINT usuarios_email_unique UNIQUE (email);

-- Actualizar registros existentes
UPDATE usuarios SET rol = 'ROLE_USER' WHERE rol IS NULL;
UPDATE usuarios SET activo = true WHERE activo IS NULL;