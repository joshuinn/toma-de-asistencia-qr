//import ChartIndex from "@/app/components/ChartIndex";
import Header from "@/app/components/Header";
import dynamic from "next/dynamic";
import React from "react";

const ChartIndex = dynamic(() => import("@/app/components/ChartIndex"));

function Graph() {
  //<Chart />
  return (
    <div className="text-white">
      <Header title="Gráficas de asistencia" />
          <ChartIndex />
    </div>
  );
}

export default Graph;
