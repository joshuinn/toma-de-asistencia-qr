import Header from "@/app/components/Header";
import ReportListProvider from "@/app/components/assistance/ListReportsContext";
import dynamic from "next/dynamic";
import React from "react";

const ChartIndex = dynamic(() => import("@/app/components/graphs/ChartIndex"));

function Graph() {
  return (
    <ReportListProvider>
      <div className="text-white">
        <Header title="Gráficas de asistencia" />
        <ChartIndex />
      </div>
    </ReportListProvider>
  );
}

export default Graph;
