"use client";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

// Crear un contexto para compartir datos de autocompletado
export const AutoCompliteContext = createContext(null);

// Proveedor de contexto para gestionar los datos de autocompletado
const AutoCompliteProvider = ({ children }) => {
  // Estado para almacenar los datos de autocompletado
  const [dataAutoComplite, setDataAutoComplite] = useState({
    ciclo: [],
    grupo: [],
    laboratorio: [],
    maestro: [],
    materia: [],
  });

  // Estado para forzar la actualización de datos
  const [isUpdate, setIsUpdate] = useState(false);

  // Función para forzar la actualización de datos
  const handleUpdate = () => {
    setIsUpdate(!isUpdate);
  };

  // Efecto que se ejecuta al montar el componente o cuando isUpdate cambia
  useEffect(() => {
    // Función asincrónica para obtener datos de autocompletado
    const getdataAutoComplite = async () => {
      try {
        // Realizar una solicitud HTTP para obtener datos del servidor
        const { data } = await axios.get("/api/cataloguesList");

        // Actualizar el estado con los nuevos datos
        setDataAutoComplite(data);
      } catch (error) {
        console.log(error);
      }
    };

    // Llamar a la función para obtener datos al montar el componente o cuando isUpdate cambia
    getdataAutoComplite();
  }, [isUpdate]);

  // Proporcionar el contexto y la función de actualización a los componentes hijos
  return (
    <AutoCompliteContext.Provider value={{ dataAutoComplite, handleUpdate }}>
      {children}
    </AutoCompliteContext.Provider>
  );
};

export default AutoCompliteProvider;
