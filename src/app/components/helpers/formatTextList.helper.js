// Esta función formatea el texto según el nombre proporcionado.
export const formatText = (name, text) => {
  if (!text.length) {
    // Si el texto está vacío, se devuelve sin cambios.
    return text;
  }

  let textFormated;

  // Realiza diferentes formatos según el nombre proporcionado.
  switch (name) {
    case "grupo":
      // Convierte el texto a mayúsculas y limita su longitud a 5 caracteres.
      textFormated = text.toUpperCase();
      if (textFormated.length > 5) {
        textFormated = textFormated.slice(0, -1);
      }
      break;
    case "nombre":
    case "materia":
    case "maestro":
      // Capitaliza la primera letra de cada palabra en el texto.
      textFormated = text.split(" ");
      textFormated = textFormated
        .map((word) => {
          if (word[0]) {
            return word[0].toUpperCase() + word.substring(1);
          }
        })
        .join(" ");
      break;
    case "laboratorio":
    case "numero_maquina":
      // Elimina caracteres no numéricos y limita la longitud a 2 caracteres.
      textFormated = "";
      for (let i = 0; i < text.length; i++) {
        if (parseInt(text[i]) >= 0) {
          textFormated += text[i];
        }
      }
      if (textFormated.length > 2) {
        textFormated = textFormated.slice(0, 2);
      }
      break;
    case "ciclo":
      // Convierte el texto a mayúsculas y limita su longitud a 6 caracteres.
      textFormated = text.toUpperCase();
      if (textFormated.length > 6) {
        textFormated = textFormated.slice(0, -1);
      }
      break;
    case "boleta":
      // Elimina caracteres no numéricos y limita la longitud a 10 caracteres.
      textFormated = "";
      for (let i = 0; i < text.length; i++) {
        if (parseInt(text[i]) >= 0) {
          textFormated += text[i];
        }
      }
      if (textFormated.length > 10) {
        textFormated = textFormated.slice(0, 10);
      }
      break;
    default:
      // Si no coincide con ningún caso, devuelve el texto sin cambios.
      textFormated = text;
      break;
  }

  // Devuelve el texto formateado.
  return textFormated;
};

// Esta función verifica si el formato del correo electrónico es válido.
export const isEmailValid = (email) => {
  const emailRegex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return emailRegex.test(email);
};

// Esta función verifica si la longitud de la contraseña es válida.
export const isPasswordValid = (password) => {
  return password.length > 5 ? true : false;
};
