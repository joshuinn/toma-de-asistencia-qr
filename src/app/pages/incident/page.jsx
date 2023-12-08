import Header from "@/app/components/Header";
import IncidentForm from "@/app/components/IncidentForm";
import Loading from "@/app/components/Loading";
import { Suspense } from "react";

function Incident() {
  return (
    <Suspense fallback={<Loading />}>
      <div className="text-white">
        <Header title={"Reportar incidencia"} />
        <IncidentForm />
      </div>
    </Suspense>
  );
}

export default Incident;
