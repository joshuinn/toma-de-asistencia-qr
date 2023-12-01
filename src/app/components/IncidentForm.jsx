"use client";
import React from "react";

function IncidentForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
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
          />
        </div>
        <div className="flex gap-3 items-center">
          <label>Maestro</label>
          <input
            type="text"
            placeholder="Maestro"
            className="bg-blue-800 p-2 rounded-full outline-none"
          />
        </div>

        <div className="flex gap-3 items-center">
          <label>Ciclo</label>
          <input
            type="text"
            placeholder="Ciclo"
            className="bg-blue-800 p-2 rounded-full outline-none"
          />
        </div>
        <div className="flex gap-3 items-center">
          <label>Nombre</label>
          <input
            type="text"
            placeholder="Nombre"
            className="bg-blue-800 p-2 rounded-full outline-none"
          />
        </div>
        <div className="flex gap-3 items-center">
          <label>Boleta</label>
          <input
            type="text"
            placeholder="Boleta"
            className="bg-blue-800 p-2 rounded-full outline-none"
          />
        </div>
        <div className="flex gap-3 items-center">
          <label>#laboratorio</label>
          <input
            type="text"
            placeholder="#Laboratorio"
            className="bg-blue-800 p-2 rounded-full outline-none"
          />
        </div>
      </div>
      <div className="bg-blue-600 mt-6 p-4 flex flex-col gap-2 shadow-lg rounded-lg">
        <label>Observaciones</label>
        <textarea
          type="text"
          placeholder="Observaciones"
          className="bg-blue-800 p-4 rounded-lg outline-none max-h-[calc(50vh)]"></textarea>
        <div className="flex justify-end">
          <button className="bg-pink border border-pink p-3 rounded-lg hover:text-pink hover:bg-blue-600 transition-all">Exportar a PDF</button>
        </div>
      </div>
    </form>
  );
}

export default IncidentForm;
