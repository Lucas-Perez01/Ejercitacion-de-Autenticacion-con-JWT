const express = require("express");
const jwt = require("jsonwebtoken");
const tareas = require("../services/tareas.js");
const usuarios = require("../services/usuarios.js");

const router = express.Router();

// Middleware para autenticar el token JWT
function autenticarToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token requerido" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch {
    res.status(401).json({ error: "Token inválido" });
  }
}

// Ruta de prueba
router.get("/", async (req, res) => {
  try {
    res.status(200).send("Hola Mundo");
  } catch (error) {
    res.status(500).json({ error: "Error interno en el servidor" });
  }
});

// Ruta de registro de usuario
router.post("/register", async (req, res) => {
  try {
    const { usuario, contraseña } = req.body;
    if (!usuario || !contraseña) {
      return res.status(400).json({ error: "Usuario y contraseña requerido" });
    }

    const nuevoUsuario = usuarios.register(usuario, contraseña);
    if (!nuevoUsuario) {
      return res.status(400).json({ error: "Usuario ya existe" });
    }

    res.status(201).json({ message: "Usuario registrado", user: nuevoUsuario });
  } catch (error) {
    res.status(500).json({ error: "Error al registrar usuario" });
  }
});

// Ruta de login
router.post("/login", async (req, res) => {
  try {
    const { usuario, contraseña } = req.body;
    if (!usuario || !contraseña) {
      return res.status(400).json({ error: "Usuario y contraseña requerido" });
    }

    const user = usuarios.login(usuario, contraseña);
    if (!user) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login exitoso", token });
  } catch (error) {
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
});

// Ruta para agregar tareas
router.post("/tareas", autenticarToken, async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({ error: "Título de tarea requerido" });
    }

    const nuevaTarea = tareas.addTarea({ title, description }, req.usuario.id);

    res.status(201).json({ message: "Tarea agregada", tarea: nuevaTarea });
  } catch (error) {
    res.status(500).json({ error: "Error al agregar tarea" });
  }
});

// Ruta para obtener tareas del usuario autenticado
router.get("/tareas", autenticarToken, async (req, res) => {
  try {
    const userTareas = tareas.getTareasByUser(req.usuario.id);
    res.status(200).json(userTareas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener tareas" });
  }
});

// Ruta para eliminar una tarea por ID
router.delete("/tareas/:id", autenticarToken, async (req, res) => {
  try {
    const { id } = req.params;
    const tareaEliminada = tareas.deleteTarea(id, req.usuario.id);

    if (!tareaEliminada) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    res.status(200).json({ message: "Tarea eliminada", tarea: tareaEliminada });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar tarea" });
  }
});

module.exports = router;
