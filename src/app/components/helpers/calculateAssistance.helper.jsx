import axios from "axios";
import { countStudents } from "./countStudents.helper";

//grupos
export async function calculateAssistance(list) {
  try {
    const { data } = await axios.post("/api/getStudents", list);
    
    const dataCalculated = calculateGroups(data);
    const MateriaCalculated = calculateMateria(dataCalculated);
    return dataCalculated.data;
  } catch (error) {
    console.error(error);
  }
  return false;
}

function calculateMateria(dataCalculated) {
  let materias = {};
  let materiaCalcular = []
  dataCalculated.forEach(grupoCalculado => {
      const nombreMateria = grupoCalculado.materia
      console.log("nombre: "+nombreMateria);
      console.log(grupoCalculado);
      if(materias[nombreMateria]){
        materias.porcentaje+= grupoCalculado.data[0]
      }else{
        materias[nombreMateria] = {
          porcentaje:grupoCalculado.data[0]
        }
      }
  });
  console.log(materias);
  /*
  if (materias.length > 1) {
    let suma = 0
    
    for (let i = 0; i < dataCalculated.length; i++) {
      suma += parseFloat(dataCalculated[0].data[0])
    }
    const materiaPorcentaje = (suma/dataCalculated.length)
    return materiaPorcentaje
  }
  */
}

function calculateGroups(data) {
  let listStudents = [];
  let grupos = []
  for (let i = 0; i < data.length; i++) {
    listStudents[i] ={countStudents:countStudents(data[i])}
    console.log("lista: ", data[i]);
    if(!grupos.includes(data[i][0].id_lista_asistencia)){

      listStudents[i] = {...listStudents[i], id_lista_asistencia:data[i][0].id_lista_asistencia, materia:data[i][0].materia}
    }
  }
  const arrDataChart = [];
  let mostAssistance = 0;
  for (let i = 0; i < listStudents.length; i++) {data
    let count = 0;
    mostAssistance = 0;
    data;
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
      id_lista_asistencia: listStudents[i].id_lista_asistencia,
      materia: listStudents[i].materia,
    };
  }
  return arrDataChart;
}
