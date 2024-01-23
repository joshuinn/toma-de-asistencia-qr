// Importa las dependencias necesarias.
"use client";
import React, { useContext, useEffect, useState } from "react";
import GenPDFIncident from "./GenPDFIncident";
import { formatText } from "../helpers/formatTextList.helper";
import { FaTrash } from "react-icons/fa";
import { AutoCompliteContext } from "../context/ContextDataAutoCompliteInput";
import ButtonStyled from "../styled/ButtonStyled";
import InputStyled from "../styled/InputStyled";
import { useParams } from "next/navigation";
import axios from "axios";

// Componente funcional para el formulario de incidencias.
function IncidentForm() {
  // Obtiene datos del contexto de autocompletado.
  const { dataAutoComplite } = useContext(AutoCompliteContext);

  // Estado para almacenar los datos del formulario.
  const [data, setData] = useState({
    grupo: "",
    maestro: "",
    ciclo: "",
    nombre: "",
    boleta: "",
    laboratorio: "",
    observaciones: "",
  });

  // Obtiene parámetros de la URL.
  const params = useParams();

  // Manejador para enviar el formulario.
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submiting");
  };

  // Efecto secundario para cargar datos si hay un nombre en los parámetros.
  useEffect(() => {
    if (params.nombre) {
      const getDataList = async () => {
        try {
          const response = await axios.get("/api/groups/" + params.id_lista);
          if (response.status === 200) {
            let formatedName = params.nombre.split("%20");
            formatedName = formatedName.join(" ");
            const data = response.data;
            setData({
              ...data,
              ciclo: (await data.ciclo) ?? "",
              grupo: (await data.grupo) ?? "",
              maestro: (await data.maestro) ?? "",
              laboratorio: (await data.laboratorio) ?? "",
              nombre: formatedName ?? "",
              boleta: params.boleta ?? "",
            });
          }
        } catch (error) {
          // Manejo de errores en caso de que la solicitud falle.
          // Puedes agregar lógica adicional para manejar errores aquí.
        }
      };
      getDataList();
    }
  }, []);

  // Manejador para cambios en los campos de entrada.
  const handleInput = (e) => {
    const textFomated = formatText(e.target.name, e.target.value);
    setData({
      ...data,
      [e.target.name]: textFomated,
    });
  };

  // Manejador para limpiar el formulario.
  const handleClean = () => {
    setData({
      grupo: "",
      maestro: "",
      ciclo: "",
      nombre: "",
      boleta: "",
      laboratorio: "",
      observaciones: "",
    });
  };

  // Renderiza el componente principal.
  return (
    <>
      {/* Formulario de incidencias */}
      <form onSubmit={handleSubmit}>
        {/* Sección de datos personales */}
        <div className="bg-blue-600 rounded-lg p-4 shadow-lg flex flex-wrap gap-3">
          {/* ... (campos de entrada y autocompletado) */}
        </div>

        {/* Sección de observaciones */}
        <div className="bg-blue-600 mt-6 p-4 flex flex-col gap-2 shadow-lg rounded-lg">
          <label>Observaciones</label>
          <textarea
            type="text"
            placeholder="Observaciones"
            className="bg-blue-800 p-4 rounded-lg outline-none h-[200px] max-h-[calc(50vh)]"
            name="observaciones"
            onChange={handleInput}
            value={data.observaciones}
          ></textarea>
          {/* Botones de limpiar y generar PDF */}
          <div className="flex flex-wrap justify-center sm:justify-end gap-4">
            <ButtonStyled onClick={handleClean} color="purple" type="reset">
              Limpiar
              <FaTrash size={20} />
            </ButtonStyled>
            <GenPDFIncident data={data} />
          </div>
        </div>
      </form>
    </>
  );
}

// Exporta el componente principal.
export default IncidentForm;
