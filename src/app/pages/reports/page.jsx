// Importar el componente Header desde la ruta "@/app/components/Header".
import Header from "@/app/components/Header";

// Importar el componente ReportsList desde la ruta "@/app/components/reports/ReportsList".
import ReportsList from "@/app/components/reports/ReportsList";

// Importar el componente ReportListProvider desde la ruta "@/app/components/assistance/ListReportsContext".
import ReportListProvider from "@/app/components/assistance/ListReportsContext";

// Definir el componente funcional ReportsPage.
function ReportsPage() {
  return (
    // Utilizar el componente ReportListProvider como proveedor de contexto.
    <ReportListProvider>

      {/* Contenedor principal de la página de informes. */}
      <div className="text-white">

        {/* Utilizar el componente Header con el título "Reportes de asistencia". */}
        <Header title={"Reportes de asistencia"} />

        {/* Utilizar nuevamente el componente ReportListProvider. */}
        <ReportListProvider>

          {/* Utilizar el componente ReportsList para mostrar la lista de informes. */}
          <ReportsList />

        </ReportListProvider>

      </div>
    </ReportListProvider>
  );
}

// Exportar el componente ReportsPage como componente predeterminado.
export default ReportsPage;
