"use client"
import axios from "axios";
import React, { useEffect, useState } from "react";

function HeadersList({id}) {
  const [data, setData] = useState({
    ciclo:"",
    grupo:"",
    laboratorio:"",
    materia:""
  });
  useEffect(() => {
    const loadGroup = async () => {
        console.log(id);
      try {
        const response = await axios.get("/api/groups/" + id);
        console.log(response);
        if(response.status == 200){
            setData(response.data)
        }
        if (response.status == 404) {
          //return { status: 404 };
        }
        //return response.data;
      } catch (e) {
        console.error(e);
        //return { status: 500 };
      }
    };
    loadGroup();
  }, []);
  return (
    <div>
      <div className="flex gap-4 p-2 rounded-lg flex-wrap justify-between text-white">
        <div className="bg-blue-600 p-3 shadow-lg rounded-lg">
          <p className="">Ciclo:{data.ciclo} </p>
        </div>
        <div className="bg-blue-600 p-3 shadow-lg rounded-lg">
          <p className="">Grupo: {data.grupo} </p>
        </div>
        <div className="bg-blue-600 p-3 shadow-lg rounded-lg">
          <p className="">Profesor: {data.maestro} </p>
        </div>
        <div className="bg-blue-600 p-3 shadow-lg rounded-lg">
          <p className="">Numero de Laboratorio: {data.laboratorio} </p>
        </div>
        <div className="bg-blue-600 p-3 shadow-lg rounded-lg">
          <p className="">Materia: {data.materia} </p>
        </div>
      </div>
    </div>
  );
}

export default HeadersList;
