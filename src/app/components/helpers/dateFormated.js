export function getDateFormated() {
  const fecha = new Date();

  // Ajusta la zona horaria a UTC-6
  fecha.setUTCHours(fecha.getUTCHours() - 6);

  const año = fecha.getFullYear();
  const mes = agregarCeroAlInicio(fecha.getMonth() + 1);
  const dia = agregarCeroAlInicio(fecha.getDate());
  
  const formatoFecha = `${año}-${mes}-${dia}`;
  return formatoFecha;
}

function agregarCeroAlInicio(numero) {
  return numero < 10 ? `0${numero}` : numero;
}
