"use client";
import React, { Suspense, useEffect, useState } from "react";
import NewList from "./NewList";
import { BiListCheck, BiMessageRoundedError } from "react-icons/bi";
import axios from "axios";
import { AiOutlineReload, AiFillCheckCircle } from "react-icons/ai";
import { toast } from "sonner";
import Loading from "../Loading";
import Link from "next/link";
export default function ListGroup() {
  const [groups, setGroups] = useState([]);
  const [data, setData] = useState([]);
  const [refreshGroups, setRefreshGroups] = useState(false);
  const [dataSearch, setDataSearch] = useState({
    ciclo: "",
    grupo: "",
  });
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
        <div className="flex justify-between flex-wrap gap-3 bg-white p-3 rounded-lg shadow-md">
          <form
            className="flex gap-3 items-center flex-wrap"
            onSubmit={handleSubmit}>
            <label>Ciclo</label>
            <input
              className="border-b-2 rounded-md p-1 bg-gray-50 outline-none focus:border-indigo-950"
              type="text"
              placeholder="Ciclo"
              name="ciclo"
              value={dataSearch.ciclo}
              onChange={handleInput}
              required
            />
            <p>y</p>
            <label>Grupo</label>
            <input
              className="border-b-2 rounded-md p-1 bg-gray-50 outline-none focus:border-indigo-950"
              type="text"
              placeholder="Grupo"
              name="grupo"
              value={dataSearch.grupo}
              onChange={handleInput}
              required
            />
            <button className="rounded border p-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
              Buscar
            </button>
            <AiOutlineReload
              className="cursor-pointer"
              size={20}
              onClick={handleRefreshGroups}
            />
          </form>
          <div>
            <NewList handleRefreshGroups={handleRefreshGroups} />
          </div>
        </div>
        <Suspense fallback={<Loading />}>
          <section className="bg-white rounded-lg overflow-y-scroll h-[83vh] shadow-md">
            <ul className="p-2 grid grid-cols-3 md:grid-cols-4 justify-evenly items-center ">
              <li className="">Ciclo</li>
              <li className="">Grupo</li>
              <li className=" md:block hidden">Profesor</li>
              <li className=" flex justify-end  w-full">Tomar lista</li>
            </ul>
            <ul className="w-full p-2">
              {groups.length > 0 ? (
                groups.map((item) => (
                  <li
                    key={item.id_grupo}
                    className="p-2 border border-x-0 grid grid-cols-3 md:grid-cols-4 justify-between items-center ">
                    <p className="">{item.ciclo}</p>
                    <p className="">{item.grupo}</p>
                    <p className="md:block hidden">{item.profesor}</p>
                    <div className="flex justify-end  w-full">
                      <Link href={`/pages/assistence/${item.id_grupo}`}>
                        <p className="flex items-center p-2 bg-indigo-950 hover:bg-indigo-800 text-white rounded-lg justify-between">
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
                    No hay elementos para la busqueda ingresada
                  </h2>
                </div>
              )}
            </ul>
          </section>
        </Suspense>
      </div>
    </>
  );
}
