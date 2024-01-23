"use client"
import axios from "axios";
import { createContext, useEffect, useState } from "react";

// Crear un contexto para compartir el estado entre componentes
export const ReportListContext = createContext(null);

function ReportListProvider({ children }) {
  // Estados iniciales
  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState([]);
  const [data, setData] = useState([]);
  const [refreshGroups, setRefreshGroups] = useState(false);
  const [listToExport, setListToExport] = useState([]);
  const [dataSearch, setDataSearch] = useState({
    ciclo: "",
    grupo: "",
    fecha_min: "",
    fecha_max: "",
  });

  // Efecto para obtener grupos cuando se refresca la lista
  useEffect(() => {
    const getGroup = async () => {
      setIsLoading(true);
      try {
        // Llamar a la API para obtener grupos
        const response = await axios.get("/api/groups");
        setGroups(response.data);
        setData(response.data);
      } catch (e) {
        console.log(e);
      }
      
      // Establecer un temporizador para simular una carga y actualizar el estado de carga
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    };
    
    // Llamar a la función para obtener grupos al montar el componente o cuando se actualiza refreshGroups
    getGroup();
  }, [refreshGroups]);

  // Manejar el evento de actualizar grupos
  const handleRefreshGroups = () => {
    setRefreshGroups(!refreshGroups);
    setDataSearch({
      ciclo: "",
      grupo: "",
      fecha_min: "",
      fecha_max: "",
    });
  };

  // Manejar la búsqueda de grupos
  const handleSearch = (e) => {
    e.preventDefault();
    if (dataSearch.grupo.length === 0 && dataSearch.ciclo.length === 0) {
      setGroups(data);
      return;
    }
    let newList = data.filter((item) => {
      if (
        item.ciclo.includes(dataSearch.ciclo) &&
        item.grupo.includes(dataSearch.grupo)
      )
        return item;
    });
    setGroups(newList);
  };

  // Manejar la selección de elementos en la lista
  const handleCheked = (id_lista_asistencia) => {
    setGroups((prev) =>
      prev.map((report) =>
        report.id_lista_asistencia === id_lista_asistencia
          ? { ...report, checked: !report.checked }
          : report
      )
    );
  };

  // Efecto para actualizar la lista de exportación cuando cambia el estado de los grupos
  useEffect(() => {
    setListToExport(
      groups.filter((report) => (report.checked ? report : null))
    );
  }, [groups]);

  // Proporcionar el estado y funciones a los componentes hijos a través del contexto
  return (
    <ReportListContext.Provider
      value={{
        isLoading,
        groups,
        handleRefreshGroups,
        handleSearch,
        data,
        setGroups,
        dataSearch,
        setDataSearch,
        listToExport,
        handleCheked,
        setIsLoading,
      }}
    >
      {children}
    </ReportListContext.Provider>
  );
}

export default ReportListProvider;
