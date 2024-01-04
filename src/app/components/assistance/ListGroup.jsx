"use client";
import React, { Suspense, useEffect, useState } from "react";
import NewList from "./NewList";
import { BiListCheck } from "react-icons/bi";
import Loading from "../Loading";
import Link from "next/link";
import useReports from "../hooks/useReports";
import Search from "../Search";
import ButtonStyled from "../styled/ButtonStyled";
import loadingIndividual from "./LoadingIndividual.module.css";

export default function ListGroup() {
  const reports = useReports();
  const [isLoading, setIsLoading] = useState(false);
  const handleLoad = (id_lista_asistencia) => {
    reports.setGroups((prev) =>
      prev.map((report) =>
        report.id_lista_asistencia === id_lista_asistencia
          ? { ...report, loading: !report.loading }
          : report
      )
    );
  };
  useEffect(() => {
    console.log(reports.groups);
  }, [reports.groups]);
  return (
    <div className="flex flex-col gap-3 h-[calc(100vh-5rem)] ">
      <div className="flex justify-between text-white items-center flex-wrap gap-2">
        <Search
          dataSearch={reports.dataSearch}
          setDataSearch={reports.setDataSearch}
          data={reports.data}
          setReports={reports.setGroups}
          handleRefresh={reports.handleRefreshGroups}
        />
        <div className="flex items-center">
          <NewList handleRefreshGroups={reports.handleRefreshGroups} />
        </div>
      </div>
      <div className="h-full overflow-y-scroll">
        <table className="table-fixed table h-full  bg-blue-800 rounded-lg p-2 shadow-xl text-white w-full border-collapse text-center">
          <thead className="">
            <tr>
              <th className="p-3">
                <h3 className="text-xl font-bold text-purple">Ciclo</h3>
              </th>
              <th className="p-3">
                <h3 className="text-xl font-bold text-purple">Grupo</h3>
              </th>
              <th className="p-3">
                <h3 className="text-xl font-bold text-purple">Maestro</h3>
              </th>
              <th className="p-3">
                <h3 className="text-xl font-bold text-purple">Tomar lista</h3>
              </th>
            </tr>
          </thead>
          <tbody className="w-full p-2 relative">
            {reports.isLoading ? (
              <tr>
                <td className="absolute h-full w-full">

                  <Loading />
                </td>
              </tr>
            ) : (
              <Suspense fallback={<Loading />}>
                {!reports.groups ? (
                  <tr></tr>
                ) : reports.groups.length > 0 ? (
                  reports.groups.map((item, i) => (
                    <tr
                      key={item.id_lista_asistencia}
                      className={` p-2 ${i % 2 == 0 ? "bg-blue-700" : ""}`}
                    >
                      <td className="">{item.ciclo}</td>
                      <td className="">{item.grupo}</td>
                      <td className="">{item.maestro}</td>
                      <td className=" p-3 flex justify-center ">
                        <ButtonStyled
                          onClick={() => handleLoad(item.id_lista_asistencia)}
                          className={`p-[3px] flex-wrap ${
                            item.loading ? "bg-opacity-0" : ""
                          }`}
                          color={i % 2 == 0 ? "purple" : "blue"}
                        >
                          <Link
                            href={`/pages/assistence/${item.id_lista_asistencia}`}
                            shallow
                          >
                            {item.loading ? (
                              <div className="w-32">
                                <div className={loadingIndividual.loader}></div>
                              </div>
                            ) : (
                              <div className="flex justify-center items-center w-32 gap-2">
                                <span>Tomar lista</span>
                                <BiListCheck size={25} />
                              </div>
                            )}
                          </Link>
                        </ButtonStyled>
                      </td>
                    </tr>
                  ))
                ) : (
                  <div className="p-3 w-full bg-blue-600 absolute">
                    <h2 className="font-bold text-2xl text-white ">
                      No hay elementos
                    </h2>
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
