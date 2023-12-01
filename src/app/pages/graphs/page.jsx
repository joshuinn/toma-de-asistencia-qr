import Chart from "@/app/components/Chart";
import Header from "@/app/components/Header";
import React from "react";

function Graph() {
  return (
    <div className="text-white">
      <Header title="Gráficas de asistencia" />
      <Chart />
    </div>
  );
}

export default Graph;
