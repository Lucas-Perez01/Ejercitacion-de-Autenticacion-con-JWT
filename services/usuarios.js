const fs = require("fs");
const path = require("path");

const rutaUsuarios = path.join(__dirname, "../data/usuarios.json");

// Leer usuarios desde JSON
function leerUsuarios() {
  const data = fs.readFileSync(rutaUsuarios, "utf-8");
  return JSON.parse(data);
}

// Guardar usuarios en JSON
function guardarUsuarios(usuarios) {
  fs.writeFileSync(rutaUsuarios, JSON.stringify(usuarios, null, 2));
}

// Registrar usuario
function register(username, password) {
  const usuarios = leerUsuarios();

  // Si el username ya existe, cancelar registro
  if (usuarios.some((u) => u.username === username)) return null;

  // Generar ID único
  const nuevoId =
    usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1;
  const nuevo = { id: nuevoId, username, password };

  usuarios.push(nuevo);
  guardarUsuarios(usuarios);

  return { id: nuevoId, username };
}

// Login básico
function login(username, password) {
  const usuarios = leerUsuarios();
  const user = usuarios.find(
    (u) => u.username === username && u.password === password
  );
  return user || null;
}

module.exports = {
  register,
  login,
};
