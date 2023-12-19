import axios from "axios";
import { countStudents } from "./countStudents.helper";

//grupos
export async function calculateAssistance(list) {
  try {
    const { data } = await axios.post("/api/getStudents", list);
    if (!data) {
      return false;
    }
    return calculateGroups(data)
  } catch (error) {
    console.error(error);
  }
  return false;
}

function calculateMeteria(data){
  
}

function calculateGroups(data) {
  let listStudents = [];
  for (let i = 0; i < data.length; i++) {
    listStudents[i] = countStudents(data[i]);
  }

  const arrDataChart = [];
  let mostAssistance = 0;
  data;
  for (let i = 0; i < listStudents.length; i++) {
    let count = 0;
    mostAssistance = 0;
    data;
    for (let j = 0; j < listStudents[i].length; j++) {
      count += listStudents[i][j].count;
      if (listStudents[i][j].count > mostAssistance) {
        mostAssistance = listStudents[i][j].count;
      }
    }
    let percentageAssistance = (
      ((count / listStudents[i].length) * 100) /
      mostAssistance
    ).toFixed(2);
    arrDataChart[i] = [
      percentageAssistance,
      (100 - percentageAssistance).toFixed(2),
    ];
  }
  return arrDataChart;
}
