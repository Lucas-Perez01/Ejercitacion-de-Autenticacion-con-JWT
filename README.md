# Ejercitación: Creación de un Servidor con Node.js y Express

## Objetivo:

El objetivo de esta ejercitación es que te familiarices con Node.js y Express, y practiques la creación de un servidor backend que implemente un sistema de gestión de tareas con autenticación y autorización utilizando JSON Web Tokens (JWT).

## Descripción:

Deberás crear un servidor backend que permita a los usuarios registrarse, iniciar sesión y gestionar sus tareas (crear, listar y eliminar tareas). El acceso a la gestión de tareas deberá estar protegido mediante JWT.

## Instrucciones:

1. **Fork y Clonar el Repositorio**:

   - Realiza un fork de este repositorio en tu cuenta de GitHub.
   - Clona el repositorio forkeado en tu máquina local utilizando el siguiente comando:
     ```bash
     git clone https://github.com/FabioDrizZt/Ejercitacion-de-Autenticacion-con-JWT.git
     ```
   - Navega al directorio del proyecto:
     ```bash
     cd Ejercitacion-de-Autenticacion-con-JWT
     ```

2. **Configuración del Entorno**:

   - Asegúrate de tener Node.js instalado en tu máquina. Puedes descargarlo desde [Node.js](https://nodejs.org/).
   - Instala las dependencias necesarias:
     ```bash
     npm install express jsonwebtoken
     ```

3. **Implementación del Servidor**:

   - Crea un archivo `index.js` que será el punto de entrada del servidor.
   - Configura Express para manejar peticiones.
   - Implementa un middleware para parsear datos en formato JSON.
   - Utiliza los archivos `data/usuarios.js` y `data/tareas.js` para simular una base de datos.

4. **Endpoints del Servidor**:

   - **`POST /register`**:

     - Permite a los usuarios registrarse enviando un nombre de usuario y una contraseña.
     - Almacena el nuevo usuario en la lista de usuarios.
     - Responde con un mensaje de éxito o un error si el usuario ya existe.

   - **`POST /login`**:

     - Permite a los usuarios autenticarse enviando un nombre de usuario y una contraseña.
     - Verifica las credenciales contra la lista de usuarios almacenada.
     - Si las credenciales son válidas, genera un JWT con el nombre de usuario y envíalo como respuesta.
     - Si las credenciales no son válidas, responde con un código de estado HTTP adecuado y un mensaje de error.

   - **`POST /tareas`** (ruta protegida):

     - Permite a los usuarios crear nuevas tareas.
     - Protege esta ruta utilizando JWT. Solo permite el acceso si el cliente envía un token válido en el encabezado de autorización.

   - **`GET /tareas`** (ruta protegida):

     - Permite a los usuarios listar todas sus tareas.
     - Protege esta ruta utilizando JWT. Solo permite el acceso si el cliente envía un token válido en el encabezado de autorización.

   - **`DELETE /tareas/:id`** (ruta protegida):
     - Permite a los usuarios eliminar una tarea por su ID.
     - Protege esta ruta utilizando JWT. Solo permite el acceso si el cliente envía un token válido en el encabezado de autorización.

5. **Comentarios y Documentación**:

   - Incluye comentarios en el archivo `index.js` explicando cada sección del código y su funcionalidad, pero sin proporcionar el código completo. Los comentarios deben ser lo suficientemente descriptivos para guiarte en la implementación.

6. **Guía de Implementación**:
   - Completa el archivo `README.md` con:
     - Descripción del proyecto y su propósito.
     - Instrucciones detalladas para configurar el entorno de desarrollo.
     - Descripción de cada endpoint y su función.
     - Detalles sobre cómo estructurar y documentar el código en `index.js`.

## Recursos:

- Node.js: [Node.js](https://nodejs.org/)
- Express: [Express](https://expressjs.com/)
- jsonwebtoken: [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)

## Notas Adicionales:

- Esta ejercitación está diseñada para que aprendas haciendo, explorando conceptos como manejo de rutas, autenticación basada en tokens y uso de middleware en Express.
- Investiga y consulta la documentación de Node.js y Express para resolver dudas y ampliar tu comprensión.

¡Buena suerte y disfruta el proceso de aprendizaje!
