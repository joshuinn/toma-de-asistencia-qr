"use client";
import { useState, Suspense } from "react";
import style from "./ReportsList.module.css";
import Chart from "@/app/components/Chart";
import { IoMdCloseCircle } from "react-icons/io";
import { toast } from "sonner";
import Loading from "./Loading";
import { FaListCheck } from "react-icons/fa6";
import { BiMath } from "react-icons/bi";
import ButtonStyled from "./styled/ButtonStyled";
import useReports from "./hooks/useReports";
import Search from "./Search";
import AutoCompliteProvider from "./ContextDataAutoCompliteInput";

function ChartIndex() {
  const [isShowGraph, setIsShowGraph] = useState(false);
  const reports = useReports();
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
                dataSearch={reports.dataSearch}
                setDataSearch={reports.setDataSearch}
                data={reports.data}
                setReports={reports.setGroups}
                handleRefresh={reports.handleRefreshGroups}
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
        <div className="w-full h-[70%] overflow-y-scroll shadow-lg">
          <table className="table-fixed text-center bg-blue-800 h-full p-4 rounded-lg w-full border-collapse">
            <thead>
              <tr>
                <th className="p-3">
                  <h3 className="text-xl font-bold text-green">Ciclo</h3>
                </th>
                <th className="p-3">
                  <h3 className="text-xl font-bold text-green">Grupo</h3>
                </th>
                <th className="p-3">
                  <h3 className="text-xl font-bold text-green">Maestro</h3>
                </th>
                <th className="p-3">
                  <h3 className="text-xl font-bold text-green">Materia</h3>
                </th>
                <th className="p-3">
                  <h3 className="text-xl font-bold text-green">Seleccionar</h3>
                </th>
              </tr>
            </thead>
            <tbody className="w-full h-full relative">
              {reports.isLoading ? (
                <tr>
                  <td className="absolute w-full h-full ">
                    <Loading />
                  </td>
                </tr>
              ) : (
                <Suspense fallback={<Loading />}>
                  {reports.groups.length > 0 ? (
                    reports.groups.map((report, i) => {
                      return (
                        <tr
                          key={report.id_lista_asistencia}
                          className={` ${i % 2 == 0 ? "bg-blue-700" : ""}`}
                        >
                          <td className="">{report.ciclo}</td>
                          <td className="">{report.grupo}</td>
                          <td className="">{report.maestro}</td>
                          <td className="">{report.materia}</td>
                          <td className="">
                            <div className="p-2">
                              <div className={style.checkboxWrapper}>
                                <input
                                  type="checkbox"
                                  id={report.id_lista_asistencia}
                                  checked={
                                    report.checked == undefined
                                      ? false
                                      : report.checked
                                  }
                                  onChange={() => {
                                    reports.handleCheked(
                                      report.id_lista_asistencia
                                    );
                                  }}
                                />
                                <label
                                  className={style.checkInput}
                                  htmlFor={report.id_lista_asistencia}
                                ></label>
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr className="absolute w-full flex justify-center items-center h-full">
                      <td>
                        <div>
                          <h3 className="font-bold text-2xl">
                            No hay elementos
                          </h3>
                        </div>
                      </td>
                    </tr>
                  )}
                </Suspense>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {isShowGraph ? (
        <div className="sm:w-[calc(100%-13rem)] h-screen bg-[rgb(0,0,0,0.5)] absolute z-10 top-0 right-0">
          <div className="w-full flex justify-end p-5">
            <button onClick={handleShowGraph}>
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
