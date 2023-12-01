import Header from "@/app/components/Header";
import IncidentForm from "@/app/components/IncidentForm";

function Incident() {
  return (
    <div className="text-white">
      <Header title={"Reportar incidencia"} />
      <IncidentForm />
    </div>
  );
}

export default Incident;
