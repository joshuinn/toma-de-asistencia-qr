import Header from "@/app/components/Header";
import Loading from "@/app/components/Loading";
import ReportsList from "@/app/components/ReportsList";
import { Suspense } from "react";

function page() {
  return (
    <Suspense fallback={<Loading />}>
      <div className="text-white">
        <Header title={"Reportes de asistencia"} />
        <ReportsList />
      </div>
    </Suspense>
  );
}

export default page;
