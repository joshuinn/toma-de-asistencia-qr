import AutoCompliteProvider from "@/app/components/ContextDataAutoCompliteInput";
import Header from "@/app/components/Header";
import Loading from "@/app/components/Loading";
import ReportsList from "@/app/components/ReportsList";
import { Suspense } from "react";

function page() {
  return (
    <div className="text-white">
      <Header title={"Reportes de asistencia"} />
        <AutoCompliteProvider>
          <ReportsList />
        </AutoCompliteProvider>
    </div>
  );
}

export default page;
