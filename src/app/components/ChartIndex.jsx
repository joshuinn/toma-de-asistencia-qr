"use client";
import React, { useContext, useEffect, useState } from "react";
import { AutoCompliteContext } from "./ContextDataAutoCompliteInput";
import { formatText } from "./formatTextList.helper";
import axios from "axios";
import style from "./ReportsList.module.css";
import { AiOutlineReload } from "react-icons/ai";
import Chart from "@/app/components/Chart";
import { IoMdCloseCircle } from "react-icons/io";
import { toast } from "sonner";
import Loading from "./Loading";
import { CiSearch } from "react-icons/ci";
import { FaListCheck } from "react-icons/fa6";
import { BiMath } from "react-icons/bi";
import ButtonStyled from "./styled/ButtonStyled";
import InputStyled from "./styled/InputStyled";
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
  if (reports.isLoading) {
    return (
      <div className="w-full mt-7">
        <Loading />
      </div>
    );
  }
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
      <div className="p-3 w-full h-full">
        <div className="w-full flex flex-wrap justify-between items-center gap-2">
          <div className="flex gap-4 items-center">
            <Search
              dataSearch={reports.dataSearch}
              setDataSearch={reports.setDataSearch}
              data={reports.data}
              setReports={reports.setGroups}
              handleRefresh={reports.handleRefreshGroups}
            />
          </div>
          <div className="flex gap-5 bg-blue-600 p-4 rounded-lg shadow-lg">
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
        <section className="bg-blue-800 w-full h-full sm:h-[60vh] 2xl:h-[80vh] my-4 rounded-lg p-3 shadow-lg">
          <div>
            <ul className="grid grid-cols-4">
              <li>Ciclo</li>
              <li>Grupo</li>
              <li>Maestro</li>
              <li>Seleccionar</li>
            </ul>
          </div>
          <div>
            <ul>
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
/*
function ChartIndex() {
  const { dataAutoComplite } = useContext(AutoCompliteContext);
  const [reports, setReports] = useState([]);
  const [mainDataReports, setMainDataReports] = useState([]);
  const [isShowGraph, setIsShowGraph] = useState(false);
  const [listToCalculate, setListToCalculate] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [isRefresh, setIsRefresh] = useState(false);
  const [dataSearch, setDataSearch] = useState({
    ciclo: "",
    grupo_materia: "",
  });

  const handleSearch = (e) => {
    e.preventDefault();
  };
  const handleInput = (e) => {
    const text = formatText(e.target.name, e.target.value);
    setDataSearch({
      ...dataSearch,
      [e.target.name]: text,
    });
  };

  const handleCheked = (id_lista_asistencia) => {
    setReports((prev) =>
      prev.map((report) =>
        report.id_lista_asistencia == id_lista_asistencia
          ? { ...report, checked: !report.checked }
          : report
      )
    );
  };
  const selectAll = () => {
    setReports((prev) => prev.map((report) => ({ ...report, checked: true })));
  };
  const handleShowGraph = () => {
    setIsShowGraph(!isShowGraph);
  };

  const calculate = () => {
    if (listToCalculate.length == 0) {
      toast.error("No se ha seleccionado ninguna lista");
      return;
    }
    handleShowGraph();
  };
  useEffect(() => {
    setListToCalculate(
      reports.filter((report) => (report.checked ? report : null))
    );
  }, [reports]);
  useEffect(() => {
    const getReport = async () => {
      setIsloading(true);
      try {
        const response = await axios.get("/api/groups");
        if (response.status == 200) {
          setReports(response.data);
          setMainDataReports(response.data);
        }
      } catch (error) {
        console.log(error);
      }
      setIsloading(false);
    };
    getReport();
  }, [isRefresh]);

  const handleRefresh = () => {
    setIsRefresh(!isRefresh);
  };
  return (
    <>
      <div className="p-3 w-full h-full">
        <div className="w-full flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <form
              onSubmit={handleSearch}
              className="flex gap-3 justify-center items-center flex-wrap bg-blue-600 shadow-lg p-3 rounded-lg">
              <div className="flex gap-2 items-center">
                <label>Ciclo</label>
                <InputStyled
                  type="search"
                  name="ciclo"
                  placeholder="Ciclo"
                  onChange={handleInput}
                  list="options_ciclo"
                />
                <datalist id="options_ciclo">
                  {dataAutoComplite.ciclo
                    ? dataAutoComplite.ciclo.map((ciclo) => (
                        <option
                          value={ciclo.ciclo}
                          key={ciclo.id_ciclo}></option>
                      ))
                    : null}
                </datalist>
              </div>
              <div className="flex gap-2 items-center">
                <label>Grupo grupo o materia</label>
                <InputStyled
                  type="search"
                  name="grupo_materia"
                  placeholder="Grupo o materia"
                  onChange={handleInput}
                  list="options_grupo_materia"
                />
                <datalist id="options_grupo_materia">
                  {dataAutoComplite.grupo
                    ? dataAutoComplite.grupo.map((grupo) => (
                        <option
                          value={grupo.grupo}
                          key={grupo.id_grupo}></option>
                      ))
                    : null}
                  {dataAutoComplite.materia
                    ? dataAutoComplite.materia.map((materia) => (
                        <option
                          value={materia.materia}
                          key={materia.id_materia}></option>
                      ))
                    : null}
                </datalist>
              </div>
              <div>
                <button
                  type="submit"
                  className="p-3 rounded-lg border border-white transition-all hover:border-green hover:text-green flex items-center gap-2">
                  Buscar
                  <CiSearch size={20} />
                </button>
              </div>
            </form>
            <div>
              <button
                className="group p-4 rounded-lg shadow-lg bg-blue-600 hover:text-green flex items-center gap-3 transition-all "
                onClick={handleRefresh}>
                <span>Refrescar</span>
                <AiOutlineReload
                  size={20}
                  className="group-hover:rotate-45 transition-transform"
                />
              </button>
            </div>
          </div>
          <div className="flex gap-5 bg-blue-600 p-4 rounded-lg shadow-lg">
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
        <section className="bg-blue-800 w-full h-full sm:h-[60vh] 2xl:h-[80vh] my-4 rounded-lg p-3 shadow-lg">
          <div>
            <ul className="grid grid-cols-4">
              <li>Ciclo</li>
              <li>Grupo</li>
              <li>Maestro</li>
              <li>Seleccionar</li>
            </ul>
          </div>
          <div>
            {isLoading ? (
              <div className="w-full mt-7">
                <Loading />
              </div>
            ) : (
              <ul>
                {reports.length > 0 ? (
                  reports.map((report) => {
                    return (
                      <li
                        key={report.id_lista_asistencia}
                        className="border border-x-0 grid grid-cols-4 p-3">
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
                                handleCheked(report.id_lista_asistencia);
                              }}
                            />
                            <label
                              className={style.checkInput}
                              htmlFor={report.id_lista_asistencia}></label>
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
            )}
          </div>
        </section>
      </div>
      {isShowGraph ? (
        <div className="sm:w-[calc(100%-13rem)] h-screen bg-[rgb(0,0,0,0.5)] absolute z-10 top-0 right-0">
          <div className="w-full flex justify-end p-5">
            <button onClick={handleShowGraph}>
              <IoMdCloseCircle size={35} />
            </button>
          </div>
          <Chart list={listToCalculate} />
        </div>
      ) : null}
    </>
  );
}
*/

export default ChartIndex;
