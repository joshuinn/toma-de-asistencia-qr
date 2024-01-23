// Esta función toma una cadena de texto y devuelve la misma cadena con cada palabra capitalizada.
export function studentNameFormated(str) {
  // Convierte toda la cadena a minúsculas.
  var textoMinuscules = str.toLowerCase();

  // Divide el texto en palabras.
  var palabras = textoMinuscules.split(" ");

  // Itera sobre cada palabra y capitaliza la primera letra.
  for (var i = 0; i < palabras.length; i++) {
    palabras[i] = palabras[i].charAt(0).toUpperCase() + palabras[i].slice(1);
  }

  // Une las palabras capitalizadas en un nuevo string.
  var resultado = palabras.join(" ");

  // Devuelve la cadena de texto con todas las palabras capitalizadas.
  return resultado;
}
