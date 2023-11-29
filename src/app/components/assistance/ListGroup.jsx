"use client";
import React, { Suspense, useContext, useEffect, useState } from "react";
import NewList from "./NewList";
import { BiListCheck, BiMessageRoundedError } from "react-icons/bi";
import { AiOutlineReload, AiFillCheckCircle } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import axios from "axios";
import { toast } from "sonner";
import Loading from "../Loading";
import Link from "next/link";
import { SessionContext } from "../SessionContext";

export default function ListGroup() {
  const [groups, setGroups] = useState([]);
  const [data, setData] = useState([]);
  const [refreshGroups, setRefreshGroups] = useState(false);
  const [dataSearch, setDataSearch] = useState({
    ciclo: "",
    grupo: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const { dataUser } = useContext(SessionContext);
  const [isError, setIsError] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();

    let newList = data.filter((item) => {
      console.log(item.ciclo, dataSearch.ciclo);
      if (
        item.ciclo.includes(dataSearch.ciclo) &&
        item.grupo.includes(dataSearch.grupo)
      )
        return item;
    });
    setGroups(newList);
  };
  const handleInput = (e) => {
    setDataSearch({
      ...dataSearch,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    setIsLoading(true);
    const getGroup = async () => {
      try {
        const response = await axios.get("/api/groups");
        setGroups(response.data);
        setData(response.data);
        setIsError(false);
      } catch (e) {
        setIsError(true);
        console.log(e);
      }
      setIsLoading(false);
    };
    getGroup();
  }, [refreshGroups]);
  const handleRefreshGroups = () => {
    setRefreshGroups(!refreshGroups);
    setDataSearch({
      ciclo: "",
      grupo: "",
    });
    if (isError) {
      toast("Ha ocurrido un problema", {
        icon: <BiMessageRoundedError className="text-red-500" size={25} />,
      });
    } else {
      toast("Se ha recargado los datos de los grupos", {
        icon: <AiFillCheckCircle className="text-green-500" size={25} />,
      });
    }
  };
  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between flex-wrap gap-3  text-white">
          <form
            className="flex gap-3 items-center flex-wrap bg-blue-600 p-4 rounded-xl shadow-lg"
            onSubmit={handleSubmit}>
            <label className="t">Ciclo</label>
            <input
              className="rounded-full p-2 outline-none bg-blue-800"
              type="text"
              placeholder="Ciclo"
              name="ciclo"
              value={dataSearch.ciclo}
              onChange={handleInput}
            />
            <p>y</p>
            <label>Grupo</label>
            <input
              className="rounded-full p-2 outline-none bg-blue-800"
              type="text"
              placeholder="Grupo"
              name="grupo"
              value={dataSearch.grupo}
              onChange={handleInput}
            />
            <button className="rounded border p-3 flex gap-1 items-center hover:text-purple">
              Buscar
              <CiSearch size={20}/>
            </button>
          </form>
          <button
            onClick={handleRefreshGroups}
            className="p-3 bg-blue-600 flex gap-2 items-center rounded-xl shadow-lg hover:text-purple">
            <span>Refrescar</span>
            <AiOutlineReload className="cursor-pointer" size={20} />
          </button>
          <div className="flex items-center">
            <NewList handleRefreshGroups={handleRefreshGroups} />
          </div>
        </div>
        <Suspense fallback={<Loading />}>
          <section className="bg-blue-800 rounded-lg overflow-y-scroll h-full xl:h-[81vh] text-white shadow-lg">
            <ul className="p-2 grid grid-cols-3 md:grid-cols-4 justify-evenly items-center ">
              <li className="">Ciclo</li>
              <li className="">Grupo</li>
              <li className=" md:block hidden">Maestro</li>
              <li className=" flex justify-end  w-full">Tomar lista</li>
            </ul>
            {isLoading ? (
              <Loading />
            ) : (
              <ul className="w-full p-2">
                {groups.length > 0 ? (
                  groups.map((item,i) => (
                    <li
                      key={item.id_grupo}
                      className="p-2 border border-x-0 grid grid-cols-3 md:grid-cols-4 justify-between items-center ">
                      <p className="">{item.ciclo}</p>
                      <p className="">{item.grupo}</p>
                      <p className="md:block hidden">{item.maestro}</p>
                      <div className="flex justify-end  w-full">
                        <Link
                          href={`/pages/assistence/${item.id_lista_asistencia}`}>
                          <p className={`flex items-center p-2 text-white rounded-lg justify-between ${i % 2 ==0 ?"bg-yellow":"bg-blue"} hover:text-blue-800 transition-all`}>
                            Tomar lista
                            <BiListCheck size={25} />
                          </p>
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
            )}
          </section>
        </Suspense>
      </div>
    </>
  );
}
