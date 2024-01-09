import axios from "axios";
import { countStudents } from "./countStudents.helper";

//grupos
export async function calculateAssistance(list) {
  try {
    const { data } = await axios.post("/api/getStudents", list);

    const dataCalculated = calculateGroups(data);
    const materiaCalculated = calculateMateria(dataCalculated);
    const total = calculateTotal(dataCalculated);
    return { groups: dataCalculated, materia: materiaCalculated, total };
  } catch (error) {
    console.error(error);
  }
  return [];
}

function calculateTotal(dataCalculated) {
  let suma = 0;
  for (let i = 0; i < dataCalculated.length; i++) {
    if(!dataCalculated[i]){continue}
    if (dataCalculated[i].data[0] == "NaN") {
      continue;
    }
    suma += parseFloat(dataCalculated[i].data[0]);
  }
  const total = (suma / dataCalculated.length).toFixed(2);
  const data = [total, (100 - total).toFixed(2)];
  return [{ data, id: crypto.randomUUID() }];
}

function calculateMateria(dataCalculated) {
  const materias = {};
  let materiaCalcular = [];
  dataCalculated.forEach((grupoCalculado) => {
    const nombreMateria = grupoCalculado.materia;
    if (materias[nombreMateria]) {
      materias[nombreMateria].porcentaje += parseFloat(grupoCalculado.data[0]);
      materias[nombreMateria].cantidad += 1;
    } else {
      materias[nombreMateria] = {
        porcentaje: parseFloat(grupoCalculado.data[0]),
        cantidad: 1,
        id: crypto.randomUUID(),
      };
    }
  });
  let keys = Object.keys(materias);
  if (keys.length > 1) {
    for (let i = 0; i < keys.length; i++) {
      let asistencia = (
        materias[keys[i]].porcentaje / materias[keys[i]].cantidad
      ).toFixed(2);
      let inasistencia = (100 - asistencia).toFixed(2);
      materiaCalcular[i] = {
        data: [asistencia, inasistencia],
        materia: keys[i],
        id: materias[keys[i]].id,
      };
    }
  }
  return materiaCalcular;
}

function calculateGroups(data) {
  let listStudents = [];
  let grupos = [];
  for (let i = 0; i < data.length; i++) {
    listStudents[i] = { countStudents: countStudents(data[i]) };
    if (!data[i][0]) {
      continue;
    }
    if (!grupos.includes(data[i][0].id_lista_asistencia)) {
      listStudents[i] = {
        ...listStudents[i],
        id: data[i][0].id_lista_asistencia,
        materia: data[i][0].materia,
        grupo: data[i][0].grupo,
      };
    }
  }
  const arrDataChart = [];
  let mostAssistance = 0;
  //console.log(listStudents);
  for (let i = 0; i < listStudents.length; i++) {
    let count = 0;
    mostAssistance = 0;
    if (listStudents[i].countStudents.length == 0) {
      continue;
    }
    for (let j = 0; j < listStudents[i].countStudents.length; j++) {
      count += listStudents[i].countStudents[j].count;
      if (listStudents[i].countStudents[j].count > mostAssistance) {
        mostAssistance = listStudents[i].countStudents[j].count;
      }
    }
    let percentageAssistance = (
      ((count / listStudents[i].countStudents.length) * 100) /
      mostAssistance
    ).toFixed(2);
    arrDataChart[i] = {
      data: [percentageAssistance, (100 - percentageAssistance).toFixed(2)],
      id: listStudents[i].id,
      materia: listStudents[i].materia,
      grupo: listStudents[i].grupo,
    };
  }
  return arrDataChart;
}
