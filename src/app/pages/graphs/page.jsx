//import ChartIndex from "@/app/components/ChartIndex";
import AutoCompliteProvider from "@/app/components/ContextDataAutoCompliteInput";
import Header from "@/app/components/Header";
import Loading from "@/app/components/Loading";
import dynamic from "next/dynamic";
import React, { Suspense } from "react";

const ChartIndex = dynamic(() => import("@/app/components/ChartIndex"));

function Graph() {
  //<Chart />
  return (
    <div className="text-white">
      <Header title="Gráficas de asistencia" />
        <AutoCompliteProvider>
          <ChartIndex />
        </AutoCompliteProvider>
    </div>
  );
}

export default Graph;
