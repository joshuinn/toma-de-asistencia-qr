export default async function reportsFormatedWithDate(dataArr) {
  if (dataArr.length == 0) {
    return [];
  }
  let data = dataArr;
  let dataFormated = [];
  let index = 0;

  while (data.length > 0) {
    let id_lista_asistencia = data[0].id_lista_asistencia;
    let filterData = data.filter((report) =>
      report.id_lista_asistencia == id_lista_asistencia ? report : null
    );

    dataFormated[index] = {
      grupo: filterData[0].grupo,
      ciclo: filterData[0].ciclo,
      maestro: filterData[0].maestro,
      id_lista_asistencia: filterData[0].id_lista_asistencia,
      materia:filterData[0].materia
    };
    data = data.filter((report) =>
      report.id_lista_asistencia !== id_lista_asistencia ? report : null
    );
    index++;
  }
  return dataFormated
}
