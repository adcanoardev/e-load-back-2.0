# E-Load Backend 2.0

API REST para gestión de puntos de recarga de vehículos eléctricos.

## Stack

- **Node.js** + **Express**
- **MongoDB** + **Mongoose**
- **JWT** para autenticación
- **Zod** para validación de entradas
- **Cloudinary** para subida de imágenes
- **Jest** + **Supertest** para tests

## Estructura

```
src/
├── __tests__/          Tests de integración y unitarios
├── config/             Conexión a MongoDB
├── controllers/        Reciben request, llaman al service, responden
├── middlewares/        auth, validate (Zod), upload, errorHandler
├── models/             Schemas de Mongoose
├── routes/             Definición de endpoints
├── services/           Lógica de negocio
└── utils/              JWT helper
```

## Arranque rápido

```bash
# 1. Instalar dependencias
npm install

# 2. Copiar variables de entorno
cp .env.example .env
# Editar .env con tus valores reales

# 3. Arrancar en desarrollo
npm run dev

# 4. Ejecutar tests
npm test
```

## Endpoints

### Usuarios `/api/users`
| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| POST | `/` | — | Registro |
| POST | `/login` | — | Login → devuelve JWT |
| GET | `/check` | user | Verificar sesión |
| GET | `/` | admin | Listar todos |
| GET | `/:id` | user | Ver perfil |
| PUT | `/:id` | user | Actualizar con imagen |
| PATCH | `/:id` | user | Actualizar sin imagen |
| DELETE | `/:id` | admin | Eliminar |

### Estaciones `/api/stations`
| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| GET | `/` | — | Listar (coords + dirección) |
| GET | `/admin` | admin | Listar con spots |
| GET | `/:id` | — | Detalle |
| POST | `/` | admin | Crear |
| PUT | `/:id` | admin | Actualizar |
| DELETE | `/:id` | admin | Eliminar |

### Spots `/api/spots`
| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| GET | `/` | — | Listar todos |
| GET | `/station/:id` | — | Por estación |
| GET | `/user/:id` | user | Por usuario |
| GET | `/:id` | — | Detalle |
| POST | `/` | admin | Crear |
| PATCH | `/:id` | user | Cambiar estado |
| PUT | `/:id` | admin | Actualizar completo |
| DELETE | `/:id` | admin | Eliminar |

### Comentarios `/api/comments`
| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| GET | `/` | — | Listar todos |
| GET | `/station/:id` | — | Por estación |
| GET | `/:id` | — | Detalle |
| POST | `/` | user | Crear |
| DELETE | `/:id` | admin | Eliminar |

### Pagos `/api/payments`
| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| GET | `/user/:id` | user | Por usuario |
| POST | `/` | user | Añadir tarjeta |
| DELETE | `/:id` | user | Eliminar tarjeta |

## Respuestas de error

Todos los errores siguen el mismo formato:

```json
{ "error": "Mensaje descriptivo" }
```

Errores de validación incluyen detalles:

```json
{
  "error": "Validation Error",
  "details": {
    "address": ["String must contain at least 5 character(s)"]
  }
}
```
