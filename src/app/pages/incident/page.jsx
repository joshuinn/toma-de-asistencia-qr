// Importar el componente AutoCompliteProvider desde la ruta "@/app/components/context/ContextDataAutoCompliteInput".
import AutoCompliteProvider from "@/app/components/context/ContextDataAutoCompliteInput";

// Importar el componente Header desde la ruta "@/app/components/Header".
import Header from "@/app/components/Header";

// Importar el componente IncidentForm desde la ruta "@/app/components/incident/IncidentForm".
import IncidentForm from "@/app/components/incident/IncidentForm";

// Importar el componente Loading desde la ruta "@/app/components/Loading".
import Loading from "@/app/components/Loading";

// Importar la función Suspense de React para manejar la carga de componentes de forma asincrónica.
import { Suspense } from "react";

// Definir el componente funcional Incident.
function Incident() {
  return (
    // Utilizar el componente Suspense para manejar la carga asincrónica del componente.
    <Suspense fallback={<Loading />}>
      {/* Utilizar el componente AutoCompliteProvider como proveedor de contexto. */}
      <AutoCompliteProvider>

        {/* Contenedor principal del componente Incident. */}
        <div className="text-white">
          {/* Utilizar el componente Header con el título "Reportar incidencia". */}
          <Header title={"Reportar incidencia"} />

          {/* Utilizar el componente IncidentForm para el formulario de incidencia. */}
          <IncidentForm />
        </div>

      </AutoCompliteProvider>
    </Suspense>
  );
}

// Exportar el componente Incident como componente predeterminado.
export default Incident;
