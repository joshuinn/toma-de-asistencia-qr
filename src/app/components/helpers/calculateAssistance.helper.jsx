import axios from "axios";
import { countStudents } from "./countStudents.helper";
import { v4 as uuidv4 } from "uuid";

// ...

export async function calculateAssistance(list) {
  try {
    const { data } = await axios.post("/api/getStudents", list);
    const dataCalculated = calculateGroups(data);
    const materiaCalculated = calculateMateria(dataCalculated);
    const total = calculateTotal(dataCalculated);
    return { groups: dataCalculated, materia: materiaCalculated, total };
  } catch (error) {
    console.error(error);
    throw new Error("Error al calcular la asistencia.");
  }
}

// ...

function calculateTotal(dataCalculated) {
  const totalSum = dataCalculated.reduce((sum, item) => {
    if (item && item.data[0] !== "NaN") {
      sum += parseFloat(item.data[0]);
    }
    return sum;
  }, 0);

  const totalPercentage = totalSum / Math.max(dataCalculated.length, 1);
  const data = [totalPercentage.toFixed(2), (100 - totalPercentage).toFixed(2)];
  return [{ data, id: uuidv4() }];
}

// ...
