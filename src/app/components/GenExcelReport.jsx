"use client";
import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { CSVLink } from "react-csv";
import { SiMicrosoftexcel } from "react-icons/si";
import { countStudents } from "./helpers/countStudents.helper";
import ButtonStyled from "./styled/ButtonStyled";
import { toast } from "sonner";
import { ReportListContext } from "./assistance/ListReportsContext";

function GenExcelReport({ fecha_min, fecha_max }) {
  const [listToExport, setListToExport] = useState([]);
  const [allList, setAllList] = useState([]);
  const refExport = useRef(null);
  const reports = useContext(ReportListContext);
  const date = new Date();
const list = reports.listToExport
  const extracData = async () => {
    try {
      const { data } = await axios.post("/api/listReports", {
        list,
        fecha_min,
        fecha_max,
      });
      let dataFormated = [];
      for (let i = 0; i < data.length; i++) {
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
      setAllList(dataFormated);
    } catch (error) {
      console.error(error);
    }
  };

  const handleExport = async (e) => {
    e.preventDefault();
    if (list.length == 0) {
      return toast.error("No se ha escogido una lista");
    }
    await extracData();
  };
  useEffect(() => {
    if (allList) {
      if (allList.length > 0) {
        const newData = formatedDataExport(allList);
        setListToExport(newData);
      }
    }
  }, [allList]);
  useEffect(() => {
    if (listToExport) {
      if (listToExport.length > 0) {
        refExport.current.click();
      }
    }
  }, [listToExport]);
  const headers = [
    { label: "Apellido", key: "apellido_alumno" },
    { label: "Nombre", key: "nombre_alumno" },
    { label: "boleta", key: "boleta" },
    { label: "Conteo Asistencia", key: "count" },
    { label: "No. lista", key: "numero_maquina" },
  ];
  const dataExample = [
    {
      alumnos: {
        apellido_alumno: "some",
        nombre_alumno: "nombre",
        count: 20,
        boleta: "220202",
      },
    },
  ];
  function formatedDataExport(list) {
    let newData = [];
    let indexData = 0;
    for (let i = 0; i < list.length; i++) {
      if (!list[i]) {
        continue;
      }
      newData[indexData] = [
        "Ciclo: " + list[i].ciclo,
        "Grupo: " + list[i].grupo,
        "Nombre del profesor: " + list[i].maestro,
        "Fecha: "+date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate()
      ];
      let alumnos = list[i].alumnos;
      indexData++;
      newData[indexData] = [
        "Apellido",
        "Nombre",
        "Boleta",
        "conteo de asistencia",
        "Numero de maquina"
      ];
      for (let j = 0; j < alumnos.length; j++) {
        indexData++;
        newData[indexData] = [
          alumnos[j].apellido_alumno,
          alumnos[j].nombre_alumno,
          alumnos[j].boleta,
          alumnos[j].count,
          alumnos[j].numero_maquina,
        ];
      }
      indexData++;
      newData[indexData] = [];
      indexData++;
    }
    return newData;
  }
  return (
    <>
      <ButtonStyled color="green" onClick={handleExport}>
        Excel
        <SiMicrosoftexcel size={20} />
      </ButtonStyled>
      <CSVLink
        filename="lista_asistencia.csv"
        data={listToExport}
        className="hidden"
      >
        <input type="button" ref={refExport} />
      </CSVLink>
    </>
  );
}

export default GenExcelReport;
