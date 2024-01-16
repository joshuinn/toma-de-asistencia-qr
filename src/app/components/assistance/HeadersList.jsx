"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
const CardInfo = ({ children }) => {
  return <div className="bg-blue-600 p-3 shadow-lg rounded-lg">{children}</div>;
};
function HeadersList({ id }) {
  const [data, setData] = useState({
    ciclo: "",
    grupo: "",
    laboratorio: "",
    materia: "",
  });
  useEffect(() => {
    const loadGroup = async () => {
      try {
        const response = await axios.get("/api/groups/" + id);
        if (response.status == 200) {
          setData(response.data);
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
        <CardInfo>
          <p>
            Ciclo:
            <span className="text-bold text-yellow">{" " + data.ciclo}</span>
          </p>
        </CardInfo>
        <CardInfo>
          <p >
            Grupo:
            <span className="text-bold text-yellow">{" "+data.grupo}</span>
          </p>
        </CardInfo>
        <CardInfo>
          <p>
            Profesor:
            <span className="text-bold text-yellow">{" "+data.maestro}</span>{" "}
          </p>
        </CardInfo>
        <CardInfo>
          <p>
            Numero de Laboratorio:{" "}
            <span className="text-bold text-yellow">{" "+data.laboratorio}</span>{" "}
          </p>
        </CardInfo>
        <CardInfo>
          <p>
            Materia:{" "}
            <span className="text-bold text-yellow">{" "+data.materia}</span>{" "}
          </p>
        </CardInfo>
      </div>
    </div>
  );
}

export default HeadersList;
