// Importar componentes y contextos necesarios.
import React from "react";
import NewList from "./NewList";
import Search from "../search/Search";
import AutoCompliteProvider from "../context/ContextDataAutoCompliteInput";
import TableGroups from "../TableGroups";
import ReportListProvider from "./ListReportsContext";

// Componente funcional ListGroup que representa la vista principal de la lista de grupos.
export default function ListGroup() {
  // Renderizar la vista principal.
  return (
    // Utilizar el ReportListProvider para proporcionar el contexto de la lista de informes.
    <ReportListProvider>
      {/* Contenedor principal con flexbox y espaciado vertical. */}
      <div className="flex flex-col gap-3 h-[calc(100vh-5rem)]">
        {/* Proveedor de autocompletado para la barra de búsqueda. */}
        <AutoCompliteProvider>
          {/* Encabezado con barra de búsqueda y botón para crear un nuevo grupo. */}
          <div className="flex justify-between text-white items-center flex-wrap gap-2">
            {/* Componente de búsqueda. */}
            <Search />
            {/* Componente para crear un nuevo grupo. */}
            <div className="flex items-center">
              <NewList />
            </div>
          </div>
        </AutoCompliteProvider>
        {/* Área de la tabla que muestra la lista de grupos. */}
        <div className="w-full sm:h-[78vh] 2xl:h-[80vh]">
          {/* Componente de tabla de grupos con headers de color rosa y tipo de selección "takeList". */}
          <TableGroups colorHeaders="pink" typeSelect="takeList" />
        </div>
      </div>
    </ReportListProvider>
  );
}
