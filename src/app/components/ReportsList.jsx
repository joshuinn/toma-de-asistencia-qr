"use client";
import React, { useCallback, useEffect, useState } from "react";
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

function ReportsList() {
  const [reports, setReports] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefresing] = useState(false);
  const [changeTypeSearch, setChangeTypeSearch] = useState(false);
  const [dataSearch, setDataSearch] = useState({
    ciclo: "",
    grupo: "",
    fecha: "",
  });
  const [listToExport, setListToExport] = useState([]);

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
    /*
    if(dataSearch.grupo.length==0 && )
    {
      setReports(data)
      return
    }
    */
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

  const handleExportToPDF = async() => {
    setListChecked();
    if (listToExport.length > 0) {
      if (listToExport[0].length) {
        //await GenPDFReport(listToExport[0]);
      }
    }
  };
  const handleExportToExcel = () => {
    setListChecked();
  };
  const setListChecked = () => {
    setListToExport([
      reports.filter((report) => (report.checked ? report : null)),
    ]);
  };
  useEffect(() => {
    if (listToExport.length > 0) {
      if (listToExport[0].length == 0) {
        toast.error("No se han escogido listas para exportar");
      }
    }
  }, [listToExport]);
  return (
    <div className="h-[90vh] p-4 m-[-4px]">
      <div className="flex justify-between items-center flex-wrap">
        <div className="flex items-center flex-wrap gap-5">
          <form onSubmit={handleSearch}>
            <div className="flex gap-2 flex-wrap items-center p-3 bg-blue-600 rounded-lg shadow-lg">
              <label> Ciclo</label>handleList
              <input
                type="search"
                placeholder="Ciclo"
                className="rounded-full p-2 bg-blue-800 outline-none"
                name="ciclo"
                onChange={handleInput}
                value={dataSearch.ciclo}
              />
              <p>y</p>
              <label>Grupo o fecha</label>
              <div className="flex items-center gap-3">
                <input
                  type={changeTypeSearch ? "text" : "date"}
                  placeholder="Grupo o fecha"
                  className="rounded-full p-2 bg-blue-800 outline-none w-40"
                  name={changeTypeSearch ? "grupo" : "fecha"}
                  onChange={handleInput}
                  value={changeTypeSearch ? dataSearch.grupo : dataSearch.fecha}
                />
                <div className="mr-4 hover:text-blue cursor-pointer">
                  <HiOutlineSwitchHorizontal
                    size={20}
                    onClick={handleChangeTypeSearch}
                  />
                </div>
              </div>
              <button
                className="p-3 border hover:border-blue hover:text-blue rounded-lg transition-all flex gap-2 items-center"
                type="submit"
              >
                Buscar
                <CiSearch size={20} />
              </button>
            </div>
          </form>
          <div>
            <button
              className="p-4 bg-blue-600 flex items-center gap-2 rounded-lg shadow-lg hover:text-blue"
              onClick={handleRefresh}
            >
              <span>Refrescar</span>
              <AiOutlineReload
                size={20}
                className="hover:rotate-45 transition-all"
              />
            </button>
          </div>
        </div>
        <div className="flex gap-10 mt-2 bg-blue-600 p-3 rounded-lg shadow-lg">
          <button
            className="p-3 bg-purple rounded-lg hover:bg-blue-600 hover:text-purple border border-purple transition-all flex items-center gap-2"
            onClick={selectAll}
          >
            Seleccionar Todo
            <FaListCheck size={20} />
          </button>
          <button
            className="p-3 bg-pink rounded-lg border border-pink hover:text-pink hover:bg-blue-600 transition-all flex items-center gap-2"
            onClick={handleExportToPDF}
          >
            PDF
            <FaFilePdf size={20} />
          </button>
          <button
            className="p-3 bg-green rounded-lg border border-green hover:text-green hover:bg-blue-600 transition-all flex items-center gap-2"
            onClick={handleExportToExcel}
          >
            Excel
            <SiMicrosoftexcel size={20} />
          </button>
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
              <ul className="grid grid-cols-2">
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
                        className="border border-x-0 grid grid-cols-2 p-3"
                      >
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
                              htmlFor={report.id_lista_asistencia}
                            ></label>
                          </div>
                        </div>
                      </li>
                    );
                  })
                ) : (
                  <div></div>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReportsList;
