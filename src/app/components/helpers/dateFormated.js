// Esta función devuelve la fecha formateada en el formato 'YYYY-MM-DD' ajustada a UTC-6.
export function getDateFormated() {
  // Obtiene la fecha actual.
  const fecha = new Date();

  // Ajusta la zona horaria a UTC-6 para reflejar la hora local.
  fecha.setUTCHours(fecha.getUTCHours() - 6);

  // Extrae el año, mes y día de la fecha actual.
  const año = fecha.getFullYear();
  const mes = agregarCeroAlInicio(fecha.getMonth() + 1); // Se agrega 1 al mes porque los meses se indexan desde 0.
  const dia = agregarCeroAlInicio(fecha.getDate());

  // Crea y devuelve la cadena de fecha formateada.
  const formatoFecha = `${año}-${mes}-${dia}`;
  return formatoFecha;
}

// Esta función agrega un cero al inicio del número si es menor que 10.
function agregarCeroAlInicio(numero) {
  return numero < 10 ? `0${numero}` : numero;
}
