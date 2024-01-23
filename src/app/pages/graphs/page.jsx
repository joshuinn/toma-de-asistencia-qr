// Importar el componente Header desde la ruta "@/app/components/Header".
import Header from "@/app/components/Header";

// Importar el componente ReportListProvider desde la ruta "@/app/components/assistance/ListReportsContext".
import ReportListProvider from "@/app/components/assistance/ListReportsContext";

// Importar la función dynamic de Next.js para cargar componentes de forma dinámica.
import dynamic from "next/dynamic";

// Importar React desde la biblioteca de React.
import React from "react";

// Utilizar la función dynamic para importar el componente ChartIndex de forma dinámica.
const ChartIndex = dynamic(() => import("@/app/components/graphs/ChartIndex"));

// Definir el componente funcional Graph.
function Graph() {
  return (
    // Utilizar el componente ReportListProvider como proveedor de contexto.
    <ReportListProvider>
      <div className="text-white">
        {/* Utilizar el componente Header con el título "Gráficas de asistencia". */}
        <Header title="Gráficas de asistencia" />

        {/* Utilizar el componente ChartIndex para mostrar gráficas de asistencia. */}
        <ChartIndex />
      </div>
    </ReportListProvider>
  );
}

// Exportar el componente Graph como componente predeterminado.
export default Graph;
