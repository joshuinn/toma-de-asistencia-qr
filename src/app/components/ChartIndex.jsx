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

function ChartIndex() {
  const [isShowGraph, setIsShowGraph] = useState(false);
  const reports = useReports();
  const [dataSearch, setDataSearch] = useState({
    ciclo: "",
    grupo: "",
    fecha: "",
  });
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
      <div className="p-3 w-full h-full flex flex-col gap-3">
        <div className="w-full flex flex-wrap justify-between items-center gap-2">
          <div className="flex gap-4 items-center flex-grow">
            <Search
              dataSearch={reports.dataSearch}
              setDataSearch={reports.setDataSearch}
              data={reports.data}
              setReports={reports.setGroups}
              handleRefresh={reports.handleRefreshGroups}
            />
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
        <section className="bg-blue-800 rounded-lg overflow-y-scroll h-1/2 xl:h-[60vh] text-white shadow-lg p-4">
          <ul className="grid grid-cols-4">
            <li>Ciclo</li>
            <li>Grupo</li>
            <li>Maestro</li>
            <li>Seleccionar</li>
          </ul>
          {reports.isLoading ? (
            <div className="mt-7">
              <Loading />
            </div>
          ) : (
            <Suspense fallback={<Loading />}>
              <ul className="w-full mt-2">
                {reports.groups.length > 0 ? (
                  reports.groups.map((report) => {
                    return (
                      <li
                        key={report.id_lista_asistencia}
                        className="border border-x-0 grid grid-cols-4 p-3"
                      >
                        <div className="">
                          <span>{report.ciclo}</span>
                        </div>
                        <div className="">
                          <span>{report.grupo}</span>
                        </div>
                        <div className="">
                          <span>{report.maestro}</span>
                        </div>
                        <div className="ml-4">
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
                      </li>
                    );
                  })
                ) : (
                  <div className="text-center mt-6">
                    <h3 className="font-bold text-2xl">No hay elementos</h3>
                  </div>
                )}
              </ul>
            </Suspense>
          )}
        </section>
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
