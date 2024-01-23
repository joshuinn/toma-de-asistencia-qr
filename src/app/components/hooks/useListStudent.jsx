// Importa las dependencias necesarias.
"use client";
import axios from "axios";
import { useEffect, useState } from "react";

// Hook personalizado para obtener la lista de estudiantes desde la API.
async function useListStudent() {
  // Estado para indicar si los datos están cargando.
  const [isLoading, setIsloading] = useState(true);

  // Estado para almacenar los datos de la lista de estudiantes.
  const [data, setData] = useState([]);

  // Efecto secundario que se ejecuta una vez al montar el componente.
  useEffect(() => {
    // Función asincrónica para obtener los datos de la API.
    const getDataStudent = async () => {
      try {
        // Realiza una solicitud POST a la API para obtener la lista de estudiantes.
        const { data } = await axios.post("/api/getStudents", list);

        // Actualiza el estado con los datos obtenidos.
        setData(data);
      } catch (error) {
        // Manejo de errores en caso de que la solicitud falle.
        // Puedes agregar lógica adicional para manejar errores aquí.
      } finally {
        // Indica que la carga ha finalizado, independientemente del resultado de la solicitud.
        setIsloading(false);
      }
    };

    // Llama a la función para obtener los datos al montar el componente.
    getDataStudent();
  }, []); // El array de dependencias está vacío, por lo que el efecto se ejecuta solo una vez al montar.

  // Si aún se están cargando los datos, retorna true.
  if (isLoading) {
    return isLoading;
  }

  // Retorna los datos de la lista de estudiantes una vez que la carga ha finalizado.
  return data;
}

// Exporta el hook personalizado para su uso en otros componentes.
export default useListStudent;
