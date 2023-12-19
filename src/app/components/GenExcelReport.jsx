"use client";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { CSVLink } from "react-csv";
import { SiMicrosoftexcel } from "react-icons/si";
import { countStudents } from "./countStudents.helper";
import ButtonStyled from "./styled/ButtonStyled";
import { toast } from "sonner";

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
          let fecha = data[i][0].fecha_asistencia.split("T");
          dataFormated[i] = {
            id: data[i][0].id_lista_asistencia,
            grupo: data[i][0].grupo,
            materia: data[i][0].materia,
            laboratorio: data[i][0].laboratorio,
            maestro: data[i][0].maestro,
            ciclo: data[i][0].ciclo,
            alumnos: countStudents(data[i]),
            fecha: fecha[0],
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
    if(listToExport.length == 0){
      return toast.error("No se ha escogido una lista")
    }
    console.log(e);
    refExport.current.click();
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
      <ButtonStyled color="green" onClick={handleExport}>
        Excel
        <SiMicrosoftexcel size={20} />
      </ButtonStyled>
      <CSVLink data={listToExport} headers={headers} className="hidden">
        <input type="button" ref={refExport} />
      </CSVLink>
    </>
  );
}

export default GenExcelReport;
