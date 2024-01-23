// Esta función toma un array de datos y devuelve un array de informes formateados, agrupados por la identificación de la lista de asistencia.
export default async function reportsFormatedWithDate(dataArr) {
  // Verifica si el array de datos está vacío, en cuyo caso devuelve un array vacío.
  if (dataArr.length === 0) {
    return [];
  }

  // Inicialización de variables.
  let data = dataArr;
  let dataFormated = [];
  let index = 0;

  // Itera mientras haya datos en el array principal.
  while (data.length > 0) {
    // Obtiene la identificación de la lista de asistencia del primer elemento del array actual.
    let id_lista_asistencia = data[0].id_lista_asistencia;

    // Filtra los datos para obtener solo los elementos con la misma identificación de lista de asistencia.
    let filterData = data.filter((report) =>
      report.id_lista_asistencia == id_lista_asistencia ? report : null
    );

    // Crea un objeto formateado con la información del primer elemento del conjunto filtrado.
    dataFormated[index] = {
      grupo: filterData[0].grupo,
      ciclo: filterData[0].ciclo,
      maestro: filterData[0].maestro,
      id_lista_asistencia: filterData[0].id_lista_asistencia,
      materia: filterData[0].materia
    };

    // Filtra los datos para excluir los elementos con la misma identificación de lista de asistencia.
    data = data.filter((report) =>
      report.id_lista_asistencia !== id_lista_asistencia ? report : null
    );

    // Incrementa el índice para el siguiente conjunto de datos formateados.
    index++;
  }

  // Devuelve el array de datos formateados.
  return dataFormated;
}
