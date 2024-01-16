export function studentNameFormated(str) {
  var textoMinuscules = str.toLowerCase();

  // Dividir el texto en palabras
  var palabras = textoMinuscules.split(" ");

  // Iterar sobre cada palabra y capitalizar la primera letra
  for (var i = 0; i < palabras.length; i++) {
    palabras[i] = palabras[i].charAt(0).toUpperCase() + palabras[i].slice(1);
  }

  // Unir las palabras capitalizadas en un nuevo string
  var resultado = palabras.join(" ");

  return resultado;
}
