"use client";
import React, { Suspense } from "react";
import NewList from "./NewList";
import { BiListCheck } from "react-icons/bi";
import Loading from "../Loading";
import Link from "next/link";
import useReports from "../hooks/useReports";
import Search from "../Search";
import ButtonStyled from "../styled/ButtonStyled";

export default function ListGroup() {
  const reports = useReports();
  if (reports.isLoading) {
    return <Loading />;
  }
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
      <Suspense fallback={<Loading />}>
        <section className="bg-blue-800 rounded-lg overflow-y-scroll h-1/2 xl:h-[81vh] text-white shadow-lg">
          <ul className="p-2 grid grid-cols-3 md:grid-cols-4 justify-evenly items-center ">
            <li className="">Ciclo</li>
            <li className="">Grupo</li>
            <li className=" md:block hidden">Maestro</li>
            <li className=" flex justify-end  w-full">Tomar lista</li>
          </ul>

          <ul className="w-full p-2">
            {reports.groups.length > 0 ? (
              reports.groups.map((item, i) => (
                <li
                  key={item.id_grupo}
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
                      <ButtonStyled color={i % 2 == 0 ? "purple" : "blue"}>
                        <span>Tomar lista</span>
                        <BiListCheck size={25} />
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
          </ul>
        </section>
      </Suspense>
    </div>
  );
}
