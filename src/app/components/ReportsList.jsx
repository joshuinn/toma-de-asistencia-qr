"use client";
import React, { Suspense, useState } from "react";
import Loading from "./Loading";
import style from "./ReportsList.module.css";
import { FaListCheck } from "react-icons/fa6";
import GenPDFReport from "./GenPDFReport";
import GenExcelReport from "./GenExcelReport";
import ButtonStyled from "./styled/ButtonStyled";
import useReports from "./hooks/useReports";
import Search from "./Search";

function ReportsList() {
  const reports = useReports();
  const selectAll = () => {
    reports.setGroups((prev) =>
      prev.map((report) => ({ ...report, checked: true }))
    );
  };

  return (
    <div className="h-[85vh] p-4 m-[-4px] ">
      <div className="flex items-center gap-4 flex-wrap">
        <Search
          dataSearch={reports.dataSearch}
          setDataSearch={reports.setDataSearch}
          data={reports.data}
          setReports={reports.setGroups}
          handleRefresh={reports.handleRefreshGroups}
          setIsLoading={reports.setIsLoading}
          isChangeInput
        />
        <div className="flex flex-grow justify-center gap-10 mt-2 bg-blue-600 p-3 rounded-lg shadow-lg">
          <ButtonStyled
            color="purple"
            onClick={selectAll}
            disabled={!reports.groups.length > 0}
          >
            <span>Seleccionar Todo</span>
            <FaListCheck size={20} />
          </ButtonStyled>

          <GenPDFReport
            list={reports.listToExport}
            fecha_min={reports.dataSearch.fecha_min}
            fecha_max={reports.dataSearch.fecha_max}
          />
          <GenExcelReport
            list={reports.listToExport}
            fecha_min={reports.dataSearch.fecha_min}
            fecha_max={reports.dataSearch.fecha_max}
          />
        </div>
      </div>
      <div className="w-full h-[70%] overflow-y-scroll mt-5 shadow-lg">
        <table className="table-fixed text-center bg-blue-800 h-full p-4 rounded-lg w-full border-collapse">
          <thead>
            <th className="p-3">
              <h3 className="font-bold text-xl text-blue">Ciclo</h3>
            </th>
            <th className="p-3">
              <h3 className="font-bold text-xl text-blue">Grupo</h3>
            </th>
            <th className="p-3">
              <h3 className="font-bold text-xl text-blue">Maestro</h3>
            </th>
            <th className="p-3">
              <h3 className="font-bold text-xl text-blue">Seleccionar</h3>
            </th>
          </thead>

          <tbody className="relative">
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
                        <td>
                          <span>{report.ciclo}</span>
                        </td>
                        <td className="">
                          <span>{report.grupo}</span>
                        </td>
                        <td>
                          <span>{report.maestro}</span>
                        </td>

                        <td>
                          <div className={"p-2 " + style.checkboxWrapper}>
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
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <div className="text-center mt-6">
                    <h3 className="font-bold text-2xl">No hay elementos</h3>
                  </div>
                )}
              </Suspense>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReportsList;
