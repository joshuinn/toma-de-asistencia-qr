import Chart from "@/app/components/Chart";
import Header from "@/app/components/Header";
import Loading from "@/app/components/Loading";
import React, { Suspense } from "react";

function Graph() {
  return (
    <Suspense fallback={<Loading />}>
      <div className="text-white">
        <Header title="Gráficas de asistencia" />
        <Chart />
      </div>
    </Suspense>
  );
}

export default Graph;
