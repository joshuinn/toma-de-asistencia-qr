import Header from "@/app/components/Header";
import ReportsList from "@/app/components/reports/ReportsList";
import ReportListProvider from "@/app/components/assistance/ListReportsContext";

function ReportsPage() {
  return (
    <ReportListProvider>
      <div className="text-white">
        <Header title={"Reportes de asistencia"} />
        <ReportListProvider>
          <ReportsList />
        </ReportListProvider>
      </div>
    </ReportListProvider>
  );
}

export default ReportsPage;
