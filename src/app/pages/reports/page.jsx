import Header from "@/app/components/Header";
import ReportsList from "@/app/components/ReportsList";

function ReportsPage() {
  return (
    <div className="text-white">
      <Header title={"Reportes de asistencia"} />
          <ReportsList />
    </div>
  );
}

export default ReportsPage;
