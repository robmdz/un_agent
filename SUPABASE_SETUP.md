# Configuración de Supabase para UNparcero

Este documento contiene las instrucciones para configurar Supabase en el proyecto.

## 1. Instalar Dependencias

Ejecuta el siguiente comando en el directorio `frontend/`:

```bash
npm install @supabase/supabase-js
```

## 2. Configurar Variables de Entorno

Crea un archivo `.env` en el directorio `frontend/` con las siguientes variables:

```env
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_clave_anon_de_supabase
```

### Cómo obtener las credenciales:

1. Ve a [https://supabase.com](https://supabase.com) e inicia sesión
2. Crea un nuevo proyecto o selecciona uno existente
3. En el panel de tu proyecto, ve a **Settings** > **API**
4. Copia:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon/public** key → `VITE_SUPABASE_ANON_KEY`

## 3. Crear las Tablas en Supabase

1. En tu proyecto de Supabase, ve a **SQL Editor**
2. Crea una nueva query
3. Copia y pega todo el contenido del archivo `supabase_tables.sql`
4. Ejecuta la query haciendo clic en **Run**

Esto creará:
- ✅ Tabla `feedback` para almacenar las respuestas del formulario de retroalimentación
- ✅ Tabla `registrations` para almacenar los registros de usuarios
- ✅ Índices para optimizar las consultas
- ✅ Políticas de seguridad (Row Level Security) para proteger los datos

## 4. Verificar la Configuración

### Verificar que las tablas se crearon correctamente:

1. Ve a **Table Editor** en Supabase
2. Deberías ver las tablas `feedback` y `registrations`

### Verificar las políticas de seguridad:

1. Ve a **Authentication** > **Policies**
2. Deberías ver las políticas para INSERT público en ambas tablas

## 5. Estructura de las Tablas

### Tabla `feedback`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID | ID único (generado automáticamente) |
| use_chatbot | VARCHAR(10) | 'yes' o 'no' |
| ease_of_use | VARCHAR(10) | 'easy' o 'hard' |
| understanding | VARCHAR(10) | 'yes' o 'no' |
| guidance | VARCHAR(10) | 'yes' o 'no' |
| clarity | VARCHAR(10) | 'yes' o 'no' |
| satisfaction | INTEGER | Número del 1 al 5 |
| improvements | TEXT | Sugerencias de mejora (opcional) |
| other_info | TEXT | Otra información solicitada (opcional) |
| created_at | TIMESTAMP | Fecha y hora de creación |

### Tabla `registrations`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID | ID único (generado automáticamente) |
| name | VARCHAR(255) | Nombre completo |
| email | VARCHAR(255) | Correo electrónico |
| role | VARCHAR(50) | 'student', 'teacher', 'admin', o 'visitor' |
| interests | TEXT | Intereses del usuario (opcional) |
| created_at | TIMESTAMP | Fecha y hora de registro |

## 6. Probar la Integración

1. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

2. Navega a las páginas de formularios:
   - `/form` - Formulario de retroalimentación
   - `/register` - Formulario de registro

3. Completa y envía los formularios

4. Verifica en Supabase **Table Editor** que los datos se guardaron correctamente

## 7. Consultas Útiles

### Ver todos los registros de feedback:

```sql
SELECT * FROM feedback ORDER BY created_at DESC;
```

### Ver todos los registros de usuarios:

```sql
SELECT * FROM registrations ORDER BY created_at DESC;
```

### Estadísticas de satisfacción:

```sql
SELECT 
  satisfaction, 
  COUNT(*) as count 
FROM feedback 
GROUP BY satisfaction 
ORDER BY satisfaction;
```

### Ver registros por rol:

```sql
SELECT 
  role, 
  COUNT(*) as count 
FROM registrations 
GROUP BY role 
ORDER BY count DESC;
```

## 8. Seguridad

Las tablas están configuradas con Row Level Security (RLS):
- ✅ Cualquiera puede **insertar** datos (INSERT público)
- ❌ Por defecto, nadie puede **leer** los datos sin autenticación

Si necesitas permitir la lectura pública de los datos, puedes descomentar las políticas de SELECT en el archivo SQL.

## Solución de Problemas

### Error: "Missing Supabase environment variables"
- Verifica que el archivo `.env` esté en el directorio `frontend/`
- Asegúrate de que las variables comiencen con `VITE_`
- Reinicia el servidor de desarrollo después de crear el `.env`

### Error al insertar datos:
- Verifica que las políticas de RLS estén habilitadas
- Revisa la consola del navegador para más detalles del error
- Verifica que los campos requeridos estén presentes

### Los datos no aparecen en Supabase:
- Verifica que la conexión esté configurada correctamente
- Revisa la pestaña **Logs** en Supabase para ver errores
- Asegúrate de que las credenciales sean correctas



