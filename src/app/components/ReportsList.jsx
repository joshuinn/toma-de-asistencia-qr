"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import Loading from "./Loading";
import { AiOutlineReload } from "react-icons/ai";
import axios from "axios";
import style from "./ReportsList.module.css";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import { CiSearch } from "react-icons/ci";
import { formatText } from "./formatTextList.helper";
import { FaFilePdf } from "react-icons/fa";
import { SiMicrosoftexcel } from "react-icons/si";
import { FaListCheck } from "react-icons/fa6";
import { toast } from "sonner";
import GenPDFReport from "./GenPDFReport";
import { AutoCompliteContext } from "./ContextDataAutoCompliteInput";
import GenExcelReport from "./GenExcelReport";
import ButtonStyled from "./styled/ButtonStyled";
import InputStyled from "./styled/InputStyled";
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
          dataSearch={dataSearch}
          data={reports.data}
          setReports={reports.setGroups}
          isChangeInput
        />
        <div className="flex gap-10 mt-2 bg-blue-600 p-3 rounded-lg shadow-lg">
          <ButtonStyled
            color="purple"
            onClick={selectAll}
            disabled={!reports.groups.length > 0}>
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
                    className="border border-x-0 grid grid-cols-4 p-3">
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
        </div>
      </div>
    </div>
  );
}

/*
function ReportsList() {
  const [reports, setReports] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefresing] = useState(false);
  const [changeTypeSearch, setChangeTypeSearch] = useState(false);
  const [listToExport, setListToExport] = useState([]);
  const [dataSearch, setDataSearch] = useState({
    ciclo: "",
    grupo: "",
    fecha: "",
  });
  const { dataAutoComplite } = useContext(AutoCompliteContext);
  useEffect(() => {
    const getReport = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/api/groups");
        if (response.status == 200) {
          setReports(response.data);
          setData(response.data);
        }
      } catch (error) {}
      setIsLoading(false);
    };
    getReport();
  }, [isRefreshing]);

  const handleSearch = (e) => {
    e.preventDefault();

    let newList = data.filter((item) => {
      if (
        item.ciclo.includes(dataSearch.ciclo) &&
        item.grupo.includes(dataSearch.grupo)
      )
        return item;
    });
    setReports(newList);
  };

  const handleRefresh = () => {
    setIsRefresing(!isRefreshing);
  };
  const handleChangeTypeSearch = () => {
    setChangeTypeSearch(!changeTypeSearch);
  };
  const handleInput = (e) => {
    const textFormated = formatText(e.target.name, e.target.value);
    setDataSearch({
      ...dataSearch,
      [e.target.name]: textFormated,
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

  useEffect(() => {
    setListToExport(
      reports.filter((report) => (report.checked ? report : null))
    );
  }, [reports]);
  return (
    <div className="h-[90vh] p-4 m-[-4px]">
      <div className="flex justify-between items-center flex-wrap">
        <div className="flex items-center flex-wrap gap-5">
          <form onSubmit={handleSearch}>
            <div className="flex gap-2 flex-wrap items-center p-3 bg-blue-600 rounded-lg shadow-lg">
              <label> Ciclo</label>
              <InputStyled
                type="search"
                placeholder="Ciclo"
                name="ciclo"
                onChange={handleInput}
                value={dataSearch.ciclo}
                list="options_ciclo"
              />
              <datalist id="options_ciclo">
                {dataAutoComplite.ciclo
                  ? dataAutoComplite.ciclo.map((item) => (
                      <option value={item.ciclo} key={item.id_ciclo}></option>
                    ))
                  : null}
              </datalist>
              <p>y</p>
              <label>Grupo o fecha</label>
              <div className="flex items-center gap-3">
                <input
                  type={changeTypeSearch ? "text" : "date"}
                  placeholder="Grupo"
                  className="rounded-full p-2 bg-blue-800 outline-none w-40"
                  name={changeTypeSearch ? "grupo" : "fecha"}
                  onChange={handleInput}
                  value={changeTypeSearch ? dataSearch.grupo : dataSearch.fecha}
                  list="options_grupo"
                />
                <datalist id="options_grupo">
                  {dataAutoComplite.grupo
                    ? dataAutoComplite.grupo.map((item) => (
                        <option value={item.grupo} key={item.id_grupo}></option>
                      ))
                    : null}
                </datalist>
                <div className="mr-4 hover:text-blue cursor-pointer">
                  <HiOutlineSwitchHorizontal
                    size={20}
                    onClick={handleChangeTypeSearch}
                  />
                </div>
              </div>
              <button
                className="p-3 group border hover:border-blue hover:text-blue rounded-lg transition-all flex gap-2 items-center"
                type="submit">
                Buscar
                <CiSearch size={20} />
              </button>
            </div>
          </form>
          <div>
            <button
              className="p-4 group bg-blue-600 flex items-center gap-2 rounded-lg shadow-lg hover:text-blue"
              onClick={handleRefresh}>
              <span>Refrescar</span>
              <AiOutlineReload
                size={20}
                className="group-hover:rotate-45 transition-transform"
              />
            </button>
          </div>
        </div>
        <div className="flex gap-10 mt-2 bg-blue-600 p-3 rounded-lg shadow-lg">
          <ButtonStyled
            color="purple"
            onClick={selectAll}
            disabled={!reports.length > 0}>
            <span>Seleccionar Todo</span>
            <FaListCheck size={20} />
          </ButtonStyled>

          <GenPDFReport list={listToExport} />
          <GenExcelReport list={listToExport} />
        </div>
      </div>
      <div className="h-full">
        <div className="bg-blue-800 h-[70%] mt-5 p-4 rounded-lg shadow-xl overflow-y-scroll">
          {isLoading ? (
            <div className="h-[50vh]">
              <Loading />
            </div>
          ) : (
            <div className=" ">
              <ul className="grid grid-cols-3">
                <li>
                  <h3>Ciclo</h3>
                </li>
                <li className="">
                  <h3>Grupo</h3>
                </li>
                <li className="">
                  <h3>Seleccionar</h3>
                </li>
              </ul>
              <ul className="">
                {reports.length > 0 ? (
                  reports.map((report) => {
                    return (
                      <li
                        key={report.id_lista_asistencia}
                        className="border border-x-0 grid grid-cols-3 p-3">
                        <div>
                          <span>{report.ciclo}</span>
                        </div>
                        <div className="">
                          <span>{report.grupo}</span>
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
*/

export default ReportsList;
