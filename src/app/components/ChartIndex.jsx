"use client";
import { useState, useContext } from "react";
import Chart from "@/app/components/Chart";
import { IoMdCloseCircle } from "react-icons/io";
import { toast } from "sonner";
import { FaListCheck } from "react-icons/fa6";
import { BiMath } from "react-icons/bi";
import ButtonStyled from "./styled/ButtonStyled";
import Search from "./Search";
import AutoCompliteProvider from "./ContextDataAutoCompliteInput";
import TableGroups from "./TableGroups";
import {ReportListContext} from "./assistance/ListReportsContext";

function ChartIndex() {
  const [isShowGraph, setIsShowGraph] = useState(false);
  const reports = useContext(ReportListContext);
  const selectAll = () => {
    reports.setGroups((prev) =>
      prev.map((report) => ({ ...report, checked: true }))
    );
  };
  const handleShowGraph = () => {
    setIsShowGraph(!isShowGraph);
  };

  const calculate = () => {
    if (reports.listToExport.length == 0) {
      toast.error("No se ha seleccionado ninguna lista");
      return;
    }
    handleShowGraph();
  };
  return (
    <>
      <div className="p-3 w-full h-[92vh] flex flex-col gap-3">
        <div className="w-full flex flex-wrap justify-between items-center gap-2">
          <div className="flex gap-4 items-center flex-grow">
            <AutoCompliteProvider>
              <Search
                searchByOtherType="Grupo o materia"
              />
            </AutoCompliteProvider>
          </div>
          <div className="flex gap-5 bg-blue-600 p-4 rounded-lg shadow-lg flex-grow justify-center">
            <ButtonStyled color="purple" onClick={selectAll}>
              Seleccionar Todo
              <FaListCheck size={20} />
            </ButtonStyled>
            <ButtonStyled color="pink" onClick={calculate}>
              Calcular
              <BiMath size={20} />
            </ButtonStyled>
          </div>
        </div>
        <div className="w-full h-5/6 sm:h-[80vh] 2xl:h-[90vh] shadow-lg">
          <TableGroups colorHeaders="green" />
        </div>
      </div>
      {isShowGraph ? (
        <div className="sm:w-[calc(100%-13rem)] h-screen bg-[rgb(0,0,0,0.5)] absolute z-10 top-0 right-0">
          <div className="w-full flex justify-end p-5">
            <button onClick={handleShowGraph} className="transition-all text-pink hover:text-pink/75">
              <IoMdCloseCircle size={35} />
            </button>
          </div>
          <Chart list={reports.listToExport} />
        </div>
      ) : null}
    </>
  );
}

export default ChartIndex;
