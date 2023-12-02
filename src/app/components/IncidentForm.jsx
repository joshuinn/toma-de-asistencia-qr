"use client";
import React, { useState } from "react";
import GenPDFIncident from "./GenPDFIncident";

function IncidentForm() {
  const [data, setData] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    <GenPDFIncident data={data} />
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]:e.target.value
    });
    console.log(data);
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
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-3 items-center">
          <label>Maestro</label>
          <input
            type="text"
            placeholder="Maestro"
            className="bg-blue-800 p-2 rounded-full outline-none"
            name="maestro"
            onChange={handleChange}
          />
        </div>

        <div className="flex gap-3 items-center">
          <label>Ciclo</label>
          <input
            type="text"
            placeholder="Ciclo"
            className="bg-blue-800 p-2 rounded-full outline-none"
            name="ciclo"
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-3 items-center">
          <label>Nombre</label>
          <input
            type="text"
            placeholder="Nombre"
            className="bg-blue-800 p-2 rounded-full outline-none"
            name="nombre"
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-3 items-center">
          <label>Boleta</label>
          <input
            type="text"
            placeholder="Boleta"
            className="bg-blue-800 p-2 rounded-full outline-none"
            name="boleta"
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-3 items-center">
          <label>#laboratorio</label>
          <input
            type="text"
            placeholder="#Laboratorio"
            className="bg-blue-800 p-2 rounded-full outline-none"
            name="laboratorio"
            onChange={handleChange}
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
          onChange={handleChange}
        ></textarea>
        <div className="flex justify-end">
          <button className="bg-pink border border-pink p-3 rounded-lg hover:text-pink hover:bg-blue-600 transition-all">
            Exportar a PDF
          </button>
        </div>
      </div>
    </form>
  );
}

export default IncidentForm;
