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
    <div className="flex flex-col gap-3 h-[calc(100vh-5rem)]">
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
      <section className="bg-blue-800 rounded-lg overflow-y-scroll h-1/2 xl:h-[81vh] text-white shadow-lg">
        <ul className="p-2 grid grid-cols-3 md:grid-cols-4 justify-evenly items-center ">
          <li className="">Ciclo</li>
          <li className="">Grupo</li>
          <li className=" md:block hidden">Maestro</li>
          <li className=" flex justify-end  w-full">Tomar lista</li>
        </ul>
        <ul className="w-full p-2">
          {reports.isLoading ? (
            <div className="mt-5 h-full">
              <Loading />
            </div>
          ) : (
            <Suspense fallback={<Loading />}>
              {!reports.groups ? (
                <div></div>
              ) : reports.groups.length > 0 ? (
                reports.groups.map((item, i) => (
                  <li
                    key={item.id_lista_asistencia}
                    className="p-2 border border-x-0 grid grid-cols-3 md:grid-cols-4 justify-between items-center "
                  >
                    <p className="">{item.ciclo}</p>
                    <p className="">{item.grupo}</p>
                    <p className="md:block hidden">{item.maestro}</p>
                    <div className="flex justify-end  w-full">
                      <Link
                        href={`/pages/assistence/${item.id_lista_asistencia}`}
                        shallow
                      >
                        <ButtonStyled
                          onClick={() => handleLoad(item.id_lista_asistencia)}
                          className={item.loading ? "bg-opacity-0" : ""}
                          color={i % 2 == 0 ? "purple" : "blue"}
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
                        </ButtonStyled>
                      </Link>
                    </div>
                  </li>
                ))
              ) : (
                <div className="bg-indigo-950 p-3 text-center rounded-lg">
                  <h2 className="font-bold text-2xl text-white">
                    No hay elementos
                  </h2>
                </div>
              )}
            </Suspense>
          )}
        </ul>
      </section>
    </div>
  );
}
