-- Migración para PostgreSQL
-- Eliminar tablas de roles
DROP TABLE IF EXISTS usuario_roles CASCADE;
DROP TABLE IF EXISTS roles CASCADE;

-- Modificar tabla usuarios
ALTER TABLE usuarios 
DROP COLUMN IF EXISTS apellido,
DROP COLUMN IF EXISTS telefono,
DROP COLUMN IF EXISTS tipo_usuario;

-- Agregar columna rol como ENUM
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'rol_usuario') THEN
        CREATE TYPE rol_usuario AS ENUM ('ROLE_USER', 'ROLE_ADMIN');
    END IF;
END $$;

ALTER TABLE usuarios 
ADD COLUMN IF NOT EXISTS rol rol_usuario DEFAULT 'ROLE_USER' NOT NULL,
ADD COLUMN IF NOT EXISTS activo BOOLEAN DEFAULT true NOT NULL;

-- Asegurar que email sea único
ALTER TABLE usuarios ADD CONSTRAINT usuarios_email_unique UNIQUE (email);

-- Actualizar registros existentes
UPDATE usuarios SET rol = 'ROLE_USER' WHERE rol IS NULL;
UPDATE usuarios SET activo = true WHERE activo IS NULL;