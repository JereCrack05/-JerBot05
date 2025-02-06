// handlers/configHandler.js
const fs = require('fs');
const path = require('path');

// Cargar configuración
let config = {};
try {
  config = require('../config.json');
} catch (error) {
  config.features = {}; // Inicializar si no existe
}

// Función para manejar enable/disable
async function handleConfigCommand(command, args, sock, id) {
  const feature = args[0];
  if (!feature) {
    await sock.sendMessage(id, { text: "⚠️ Especifica una función (ej: *audios*, *juegos*)." });
    return;
  }

  // Validar si la función existe
  if (!config.features[feature]) {
    config.features[feature] = false; // Crear si no existe
  }

  // Actualizar estado
  config.features[feature] = command === '.enable';
  
  // Guardar en archivo
  fs.writeFileSync(path.join(__dirname, '../config.json'), JSON.stringify(config, null, 2));
  
  // Respuesta
  await sock.sendMessage(id, {
    text: `✅ *${feature}* fue ${command === '.enable' ? 'activado' : 'desactivado'} en este chat.`
  });
}

module.exports = handleConfigCommand;
