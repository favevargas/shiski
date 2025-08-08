# 🚀 Base de Datos Shiski - Plataforma E-Learning de Logística

Una base de datos completa para una plataforma de cursos online especializada en logística y supply chain.

## 📋 Descripción

Shiski es un sistema de gestión de cursos online enfocado en el sector logístico. La base de datos soporta:

- ✅ Gestión de usuarios (estudiantes, instructores, administradores)
- ✅ Catálogo de cursos por categorías
- ✅ Sistema de carrito de compras y pedidos
- ✅ Seguimiento de inscripciones y progreso
- ✅ Perfiles de instructores con calificaciones

## 🗄️ Estructura de la Base de Datos

### Tablas Principales

| Tabla | Descripción | Registros |
|-------|-------------|-----------|
| `usuarios` | Gestión de usuarios del sistema | 5 |
| `categorias` | Categorías de cursos de logística | 4 |
| `instructores` | Perfiles de instructores | 2 |
| `cursos` | Catálogo de cursos disponibles | 3 |
| `carrito` | Items en carrito de compras | 3 |
| `inscripciones` | Estudiantes inscritos en cursos | 3 |
| `pedidos` | Órdenes de compra | 3 |
| `detalle_pedidos` | Detalles de cada pedido | 3 |

### Diagrama ER

![Diagrama ER de Shiski](shiski_er_diagram.png)

*Diagrama de relaciones entre entidades generado con IntelliJ IDEA*

## 🚀 Instalación

### Requisitos
- MySQL 8.0+ o MariaDB 10.3+
- Cliente MySQL (phpMyAdmin, MySQL Workbench, o línea de comandos)

### Pasos de Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/shiski-database.git
   cd shiski-database
   ```

2. **Crear la base de datos:**
   ```sql
   mysql -u root -p < shiski_database.sql
   ```

3. **Verificar instalación:**
   ```sql
   USE shiski_db;
   SHOW TABLES;
   ```

## 📊 Consultas de Ejemplo

### Ver cursos con instructores:
```sql
SELECT 
    c.titulo,
    CONCAT(u.nombre, ' ', u.apellido) as instructor,
    cat.nombre as categoria,
    c.precio
FROM cursos c
JOIN instructores i ON c.instructor_id = i.instructor_id
JOIN usuarios u ON i.usuario_id = u.usuario_id
JOIN categorias cat ON c.categoria_id = cat.categoria_id;
```

### Ver carritos de compra:
```sql
SELECT 
    CONCAT(u.nombre, ' ', u.apellido) as cliente,
    c.titulo as curso,
    ca.precio_momento
FROM carrito ca
JOIN usuarios u ON ca.usuario_id = u.usuario_id
JOIN cursos c ON ca.curso_id = c.curso_id;
```

### Estadísticas del sistema:
```sql
SELECT 
    'Usuarios totales' as metrica, 
    COUNT(*) as valor 
FROM usuarios
UNION ALL
SELECT 'Cursos activos', COUNT(*) FROM cursos WHERE activo = TRUE
UNION ALL
SELECT 'Inscripciones', COUNT(*) FROM inscripciones;
```

## 📁 Archivos del Proyecto

```
shiski-database/
├── shiski_database.sql         # Script completo (estructura + datos)
├── shiski_sample_data.sql      # Solo datos de muestra
├── workbench_diagram_script.sql # Script para generar diagrama
├── shiski_er_diagram.png       # Diagrama ER visual
└── README.md                   # Este archivo
```

## 🔗 Relaciones Principales

- **usuarios** → **instructores** (1:1)
- **instructores** → **cursos** (1:N)  
- **categorias** → **cursos** (1:N)
- **usuarios** → **carrito** (1:N)
- **cursos** → **carrito** (1:N)
- **usuarios** → **pedidos** (1:N)
- **pedidos** → **detalle_pedidos** (1:N)

## 🏗️ Características Técnicas

- **Motor**: MySQL/MariaDB
- **Codificación**: UTF-8
- **Claves foráneas**: Habilitadas con integridad referencial
- **Nomenclatura**: snake_case (usuario_id, curso_id, etc.)
- **Datos de muestra**: Incluidos para testing

## 📈 Datos de Muestra Incluidos

- **5 usuarios** (estudiantes, instructores, admin)
- **4 categorías** de logística
- **3 cursos** con diferentes niveles
- **Transacciones completas** de compra e inscripción

## 🛠️ Herramientas Utilizadas

- **Diseño**: IntelliJ IDEA Database Tools
- **Desarrollo**: MySQL/XAMPP
- **Documentación**: Markdown
- **Control de versiones**: Git

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 📞 Contacto

Proyecto Link: [https://github.com/favevargas/shiski](https://github.com/favevargas/shiski)

---

⭐ Si este proyecto te resulta útil, ¡dale una estrella en GitHub!