"use client";
import React, { useState } from "react";
import GenPDFIncident from "./GenPDFIncident";
import { formatText } from "./formatTextList.helper";
import { FaFilePdf, FaTrash } from "react-icons/fa";

function IncidentForm() {
  const [data, setData] = useState({
    grupo: "",
    maestro: "",
    ciclo: "",
    nombre: "",
    boleta: "",
    laboratorio: "",
    observaciones: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    <GenPDFIncident data={data} />;
  };

  const handleInput = (e) => {
    const textFomated = formatText(e.target.name, e.target.value);
    setData({
      ...data,
      [e.target.name]: textFomated,
    });
  };
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
  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-blue-600 rounded-lg p-4 shadow-lg flex flex-wrap gap-3">
        <div className="flex gap-3 items-center">
          <label>Grupo</label>
          <input
            type="text"
            placeholder="Grupo"
            className="bg-blue-800 p-2 rounded-full outline-none"
            name="grupo"
            onChange={handleInput}
            value={data.grupo}
          />
        </div>
        <div className="flex gap-3 items-center">
          <label>Maestro</label>
          <input
            type="text"
            placeholder="Maestro"
            className="bg-blue-800 p-2 rounded-full outline-none"
            name="maestro"
            onChange={handleInput}
            value={data.maestro}
          />
        </div>

        <div className="flex gap-3 items-center">
          <label>Ciclo</label>
          <input
            type="text"
            placeholder="Ciclo"
            className="bg-blue-800 p-2 rounded-full outline-none"
            name="ciclo"
            onChange={handleInput}
            value={data.ciclo}
          />
        </div>
        <div className="flex gap-3 items-center">
          <label>Nombre</label>
          <input
            type="text"
            placeholder="Nombre"
            className="bg-blue-800 p-2 rounded-full outline-none"
            name="nombre"
            onChange={handleInput}
            value={data.nombre}
          />
        </div>
        <div className="flex gap-3 items-center">
          <label>Boleta</label>
          <input
            type="text"
            placeholder="Boleta"
            className="bg-blue-800 p-2 rounded-full outline-none"
            name="boleta"
            onChange={handleInput}
            value={data.boleta}
          />
        </div>
        <div className="flex gap-3 items-center">
          <label>#laboratorio</label>
          <input
            type="text"
            placeholder="#Laboratorio"
            className="bg-blue-800 p-2 rounded-full outline-none"
            name="laboratorio"
            onChange={handleInput}
            value={data.laboratorio}
          />
        </div>
      </div>
      <div className="bg-blue-600 mt-6 p-4 flex flex-col gap-2 shadow-lg rounded-lg">
        <label>Observaciones</label>
        <textarea
          type="text"
          placeholder="Observaciones"
          className="bg-blue-800 p-4 rounded-lg outline-none max-h-[calc(50vh)]"
          name="observaciones"
          onChange={handleInput}
          value={data.observaciones}></textarea>
        <div className="flex justify-end gap-4">
          <button className="flex items-center gap-2 p-3 rounded-lg bg-purple border border-purple hover:bg-blue-600 hover:text-purple transition-all" onClick={handleClean}>
            Limpiar
            <FaTrash size={20} />
          </button>
          <button className="bg-pink border border-pink p-3 rounded-lg hover:text-pink hover:bg-blue-600 transition-all flex gap-2 items-center">
            Exportar a PDF
            <FaFilePdf size={20} />
          </button>
        </div>
      </div>
    </form>
  );
}

export default IncidentForm;
