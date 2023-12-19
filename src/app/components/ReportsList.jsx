"use client";
import React, { useState } from "react";
import Loading from "./Loading";
import style from "./ReportsList.module.css";
import { FaListCheck } from "react-icons/fa6";
import GenPDFReport from "./GenPDFReport";
import GenExcelReport from "./GenExcelReport";
import ButtonStyled from "./styled/ButtonStyled";
import useReports from "./hooks/useReports";
import Search from "./Search";

function ReportsList() {
  const [changeTypeSearch, setChangeTypeSearch] = useState(false);
  const [listToExport, setListToExport] = useState([]);
  const [dataSearch, setDataSearch] = useState({
    ciclo: "",
    grupo: "",
    fecha: "",
  });
  const reports = useReports();
  if (reports.isLoading) {
    return (
      <div className="h-[50vh]">
        <Loading />
      </div>
    );
  }
  const selectAll = () => {
    reports.setGroups((prev) =>
      prev.map((report) => ({ ...report, checked: true }))
    );
  };

  return (
    <div className="h-[90vh] p-4 m-[-4px]">
      <div className="flex items-center gap-4 flex-wrap">
        <Search
          dataSearch={reports.dataSearch}
          setDataSearch={reports.setDataSearch}
          data={reports.data}
          setReports={reports.setGroups}
          handleRefresh={reports.handleRefreshGroups}
          isChangeInput
        />
        <div className="flex gap-10 mt-2 bg-blue-600 p-3 rounded-lg shadow-lg">
          <ButtonStyled
            color="purple"
            onClick={selectAll}
            disabled={!reports.groups.length > 0}
          >
            <span>Seleccionar Todo</span>
            <FaListCheck size={20} />
          </ButtonStyled>

          <GenPDFReport list={reports.listToExport} />
          <GenExcelReport list={reports.listToExport} />
        </div>
      </div>
      <div className="bg-blue-800 h-[70%] mt-5 p-4 rounded-lg shadow-xl overflow-y-scroll">
        <div className=" ">
          <ul className="grid grid-cols-4">
            <li>
              <h3>Ciclo</h3>
            </li>
            <li className="">
              <h3>Grupo</h3>
            </li>
            <li className="">
              <h3>Maestro</h3>
            </li>
            <li className="">
              <h3>Seleccionar</h3>
            </li>
          </ul>
          <ul className="">
            {reports.groups.length > 0 ? (
              reports.groups.map((report) => {
                return (
                  <li
                    key={report.id_lista_asistencia}
                    className="border border-x-0 grid grid-cols-4 p-3"
                  >
                    <div>
                      <span>{report.ciclo}</span>
                    </div>
                    <div className="">
                      <span>{report.grupo}</span>
                    </div>
                    <div>
                      <span>{report.maestro}</span>
                    </div>

                    <div className="ml-4">
                      <div className={style.checkboxWrapper}>
                        <input
                          type="checkbox"
                          id={report.id_lista_asistencia}
                          checked={
                            report.checked == undefined ? false : report.checked
                          }
                          onChange={() => {
                            reports.handleCheked(report.id_lista_asistencia);
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
        </div>
      </div>
    </div>
  );
}

export default ReportsList;
