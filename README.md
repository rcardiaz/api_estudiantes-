# API Estudiantes 🎓

Una API REST sencilla e intuitiva construida en Node.js y Express para gestionar la información de estudiantes. Este proyecto permite realizar todas las operaciones CRUD fundamentales (Crear, Leer, Actualizar y Eliminar).

---

## 🚀 Endpoints Disponibles
La API expone los siguientes endpoints para interactuar con el recurso de estudiantes:

| Operación | Método HTTP | Endpoint | Descripción |
| :--- | :---: | :--- | :--- |
| **Obtener estudiantes** | `GET` | `/estudiantes` | Devuelve la lista completa de todos los estudiantes registrados. |
| **Obtener un estudiante** | `GET` | `/estudiantes/:id` | Busca y devuelve la información de un estudiante específico mediante su ID numérico. |
| **Registrar un estudiante** | `POST` | `/estudiantes` | Crea un nuevo registro de estudiante en el sistema. El ID se autogenera automáticamente. |
| **Actualizar correo** | `PATCH` | `/estudiantes/:id` | Modifica de forma parcial únicamente el correo electrónico de un estudiante existente. |
| **Actualizar estudiante** | `PUT` | `/estudiantes/:id` | Reemplaza y actualiza toda la información de un estudiante (nombre, edad, correo). |
| **Eliminar un estudiante** | `DELETE` | `/estudiantes/:id` | Remueve de manera permanente a un estudiante del sistema usando su ID. |

---
## 🛠️ Estructura de Datos (Modelo)

Cada objeto de estudiante maneja la siguiente estructura JSON básica:

```json
{
  "id": 1,
  "nombre": "Mercedes Santos",
  "edad": 23,
  "correo": "mercedes.santos@gmail.com"
}

---
## ©️ Autor
| **Reina Díaz** --API Estudiantes
