// Importar los hooks necesarios de React
"use client";
import { useState, useContext } from "react";

// Importar el componente de gráfico y los iconos necesarios
import Chart from "@/app/components/graphs/Chart";
import { IoMdCloseCircle } from "react-icons/io";
import { toast } from "sonner";
import { FaListCheck } from "react-icons/fa6";
import { BiMath } from "react-icons/bi";
import ButtonStyled from "../styled/ButtonStyled";
import Search from "../search/Search";
import AutoCompliteProvider from "../context/ContextDataAutoCompliteInput";
import TableGroups from "../TableGroups";
import { ReportListContext } from "../assistance/ListReportsContext";

// Componente principal que renderiza la página del gráfico
function ChartIndex() {
  // Estado para controlar la visibilidad del gráfico
  const [isShowGraph, setIsShowGraph] = useState(false);

  // Obtener el contexto de la lista de informes
  const reports = useContext(ReportListContext);

  // Función para seleccionar todos los elementos de la lista
  const selectAll = () => {
    reports.setGroups((prev) =>
      prev.map((report) => ({ ...report, checked: true }))
    );
  };

  // Función para mostrar/ocultar el gráfico
  const handleShowGraph = () => {
    setIsShowGraph(!isShowGraph);
  };

  // Función para calcular y mostrar el gráfico
  const calculate = () => {
    // Verificar si se han seleccionado listas para el cálculo
    if (reports.listToExport.length === 0) {
      toast.error("No se ha seleccionado ninguna lista");
      return;
    }
    handleShowGraph();
  };

  return (
    <>
      {/* Contenedor principal */}
      <div className="p-3 w-full h-[92vh] flex flex-col gap-3">
        {/* Encabezado y botones de la página */}
        <div className="w-full flex flex-wrap justify-between items-center gap-2">
          <div className="flex gap-4 items-center flex-grow">
            {/* Componente de búsqueda con autocompletado */}
            <AutoCompliteProvider>
              <Search searchByOtherType="Grupo o materia" />
            </AutoCompliteProvider>
          </div>
          <div className="flex gap-5 bg-blue-600 p-4 rounded-lg shadow-lg flex-grow justify-center">
            {/* Botón para seleccionar todos los elementos */}
            <ButtonStyled color="purple" onClick={selectAll}>
              Seleccionar Todo
              <FaListCheck size={20} />
            </ButtonStyled>
            {/* Botón para calcular y mostrar el gráfico */}
            <ButtonStyled color="pink" onClick={calculate}>
              Calcular
              <BiMath size={20} />
            </ButtonStyled>
          </div>
        </div>
        {/* Contenedor de la tabla de grupos */}
        <div className="w-full h-4/6 sm:h-[78vh] 2xl:h-[80vh] shadow-lg">
          <TableGroups colorHeaders="green" />
        </div>
      </div>

      {/* Contenedor del gráfico (mostrado u oculto) */}
      {isShowGraph ? (
        <div className="sm:w-[calc(100%-13rem)] h-screen bg-[rgb(0,0,0,0.5)] absolute z-10 top-0 right-0">
          {/* Botón para cerrar el gráfico */}
          <div className="w-full flex justify-end p-5">
            <button onClick={handleShowGraph} className="transition-all text-pink hover:text-pink/75">
              <IoMdCloseCircle size={35} />
            </button>
          </div>
          {/* Componente de gráfico */}
          <Chart list={reports.listToExport} />
        </div>
      ) : null}
    </>
  );
}

// Exportar el componente ChartIndex por defecto
export default ChartIndex;
