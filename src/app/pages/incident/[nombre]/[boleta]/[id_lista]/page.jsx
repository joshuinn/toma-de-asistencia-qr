import Header from "@/app/components/Header";
import Loading from "@/app/components/Loading";
import AutoCompliteProvider from "@/app/components/context/ContextDataAutoCompliteInput";
import IncidentForm from "@/app/components/incident/IncidentForm";
import { Suspense } from "react";

function Incident() {
  return (
    <Suspense fallback={<Loading />}>
      <AutoCompliteProvider>
        <div className="text-white">
          <Header title={"Reportar incidencia"} />
          <IncidentForm />
        </div>
      </AutoCompliteProvider>
    </Suspense>
  );
}

export default Incident;
