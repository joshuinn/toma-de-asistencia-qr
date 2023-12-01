"use client";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import { AiOutlineReload } from "react-icons/ai";
import axios from "axios";

const DATA = [
  {
    id_lista: crypto.randomUUID(),
    grupo: "6CV22",
  },
  {
    id_lista: crypto.randomUUID(),
    grupo: "8CV22",
  },
  {
    id_lista: crypto.randomUUID(),
    grupo: "1CV22",
  },
  {
    id_lista: crypto.randomUUID(),
    grupo: "2CV22",
  },
];

function ReportsList() {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefresing] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    const getReport = async () => {
      try {
        const response = await axios.get("/api/groups");
        if (response.status == 200) {
          setReports(response.data);
        }
        console.log(response);
      } catch (error) {}
      setIsLoading(false);
      setIsRefresing(false);
    };
    getReport();
    console.log(reports);
  }, [isRefreshing]);
  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleRefresh = () => {
    setIsRefresing(true);
  };
  return (
    <div>
      <div className="flex justify-between items-center flex-wrap">
        <form onSubmit={handleSearch}>
          <div className="flex gap-2 flex-wrap items-center bg-blue-600 p-4 rounded-lg shadow-lg">
            <label> Ciclo</label>
            <input
              type="text"
              placeholder="Ciclo"
              className="rounded-full p-2 bg-blue-800 outline-none"
            />
            <p>y</p>
            <label>Grupo o fecha</label>
            <input
              type="text"
              placeholder="Grupo o fecha"
              className="rounded-full p-2 bg-blue-800 outline-none"
            />
            <button className="p-3 border hover:border-blue hover:text-blue rounded-lg transition-all">
              Buscar
            </button>
          </div>
        </form>
        <div>
          <button
            className="p-4 bg-blue-600 flex items-center gap-2 rounded-lg shadow-lg hover:text-blue"
            onClick={handleRefresh}>
            <span>Refrescar</span>
            <AiOutlineReload
              size={20}
              className="hover:rotate-45 transition-all"
            />
          </button>
        </div>
        <div className="flex gap-10 mt-2 bg-blue-600 p-4 rounded-lg shadow-lg">
          <button className="p-3 bg-purple rounded-lg hover:bg-blue-600 hover:text-purple border border-purple transition-all">
            Seleccionar Todo
          </button>
          <button className="p-3 bg-pink rounded-lg border border-pink hover:text-pink hover:bg-blue-600 transition-all">
            PDF
          </button>
          <button className="p-3 bg-green rounded-lg border border-green hover:text-green hover:bg-blue-600 transition-all">
            Excel
          </button>
        </div>
      </div>
      <div className="w-full">
        <div className="bg-blue-800 mt-5 p-4 rounded-lg shadow-xl">
          {isLoading ? (
            <div className="h-[50vh]">
              <Loading />
            </div>
          ) : (
            <div className="xl:h-[calc(100vh-15rem)]">
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
                        className="border border-x-0 grid grid-cols-2 p-3">
                        <div className="">
                          <span>{report.grupo}</span>
                        </div>

                        <div className="ml-4">
                          <input type="checkbox" name="" id="" />
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
