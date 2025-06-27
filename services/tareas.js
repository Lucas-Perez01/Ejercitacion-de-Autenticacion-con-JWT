const fs = require("fs");
const path = require("path");

const rutaTareas = path.join(__dirname, "../data/tareas.json");

// Leer tareas
function leerTareas() {
  const data = fs.readFileSync(rutaTareas, "utf-8");
  return JSON.parse(data);
}

// Guardar tareas
function guardarTareas(tareas) {
  fs.writeFileSync(rutaTareas, JSON.stringify(tareas, null, 2));
}

// Agregar una tarea
function addTarea({ title, description }, userId) {
  const tareas = leerTareas();
  const nueva = {
    id: tareas.length > 0 ? tareas[tareas.length - 1].id + 1 : 1,
    userId,
    title,
    description,
  };
  tareas.push(nueva);
  guardarTareas(tareas);
  return nueva;
}

// Obtener tareas por usuario
function getTareasByUser(userId) {
  const tareas = leerTareas();
  return tareas.filter((t) => t.userId === userId);
}

// Eliminar tarea por ID y usuario
function deleteTarea(id, userId) {
  let tareas = leerTareas();
  const index = tareas.findIndex(
    (t) => t.id === Number(id) && t.userId === userId
  );
  if (index === -1) return null;

  const eliminada = tareas.splice(index, 1)[0];
  guardarTareas(tareas);
  return eliminada;
}

module.exports = {
  addTarea,
  getTareasByUser,
  deleteTarea,
};
