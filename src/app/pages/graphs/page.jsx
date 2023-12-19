import Chart from "@/app/components/Chart";
import ChartIndex from "@/app/components/ChartIndex";
import AutoCompliteProvider from "@/app/components/ContextDataAutoCompliteInput";
import Header from "@/app/components/Header";
import Loading from "@/app/components/Loading";
import React, { Suspense } from "react";

function Graph() {
  //<Chart />
  return (
    <AutoCompliteProvider>
      <Suspense fallback={<Loading />}>
        <div className="text-white">
          <Header title="Gráficas de asistencia" />
          <ChartIndex />
        </div>
      </Suspense>
    </AutoCompliteProvider>
  );
}

export default Graph;
