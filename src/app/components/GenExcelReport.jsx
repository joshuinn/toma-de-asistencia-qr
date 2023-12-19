"use client";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { CSVLink } from "react-csv";
import { SiMicrosoftexcel } from "react-icons/si";
import { countStudents } from "./countStudents.helper";

function GenExcelReport({ list }) {
  const [listToExport, setListToExport] = useState([]);
  const refExport = useRef(null);
  const extracData = async () => {
    try {
      const { data } = await axios.post("/api/reports", list);
      let dataFormated = [];
      for (let i = 0; i < data.length; i++) {
        console.log(data[i]);
        if (data[i].length > 0) {
          dataFormated[i] = {
            id: data[i][0].id_lista_asistencia,
            grupo: data[i][0].grupo,
            materia: data[i][0].materia,
            laboratorio: data[i][0].laboratorio,
            maestro: data[i][0].maestro,
            ciclo: data[i][0].ciclo,
            alumnos: countStudents(data[i]),
          };
        }
      }
      setListToExport(dataFormated);
    } catch (error) {
      console.error(error);
    }
  };

  const handleExport = async (e) => {
    e.preventDefault();
    await extracData();
    console.log(e);
  };
  useEffect(() => {
    console.log("data:", listToExport);
  }, [listToExport]);
  const headers = [
    { label: "Apellido", key: "alumnos.apellido_alumno" },
    { label: "Nombre", key: "alumnos.nombre_alumno" },
    { label: "boleta", key: "alumnos.boleta" },
    { label: "Conteo Asistencia", key: "alumnos.count" },
  ];

  return (
    <>
      <CSVLink
        data={listToExport}
        headers={headers}
        className="p-3 bg-green rounded-lg  border border-green hover:text-green hover:bg-blue-600 transition-all flex items-center gap-2"
        onClick={handleExport}
      >
        Excel
        <SiMicrosoftexcel size={20} />
      </CSVLink>
    </>
  );
}

export default GenExcelReport;
