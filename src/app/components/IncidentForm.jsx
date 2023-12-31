"use client";
import React, { useContext, useState } from "react";
import GenPDFIncident from "./GenPDFIncident";
import { formatText } from "./helpers/formatTextList.helper";
import { FaTrash } from "react-icons/fa";
import { AutoCompliteContext } from "./ContextDataAutoCompliteInput";
import ButtonStyled from "./styled/ButtonStyled";
import InputStyled from "./styled/InputStyled";

function IncidentForm() {
  const { dataAutoComplite } = useContext(AutoCompliteContext);
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
    console.log("Submiting");
  };
  /*
  const BtnDownload = useCallback(() => {
    return (
      <PDFDownloadLink
        document={<ReportPDF list={data} />}
        fileName="reporte.pdf"
        className="hidden"
      >
        <input type="button" ref={downloadRef}></input>
      </PDFDownloadLink>
    );
  }, []);
  
  */
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
    <>
      <form onSubmit={handleSubmit}>
        <div className="bg-blue-600 rounded-lg p-4 shadow-lg flex flex-wrap gap-3">
          <div className="flex gap-3 items-center">
            <label>Grupo</label>
            <InputStyled
              type="text"
              placeholder="Grupo"
              name="grupo"
              onChange={handleInput}
              value={data.grupo}
              list="options_grupo"
            />
            <datalist id="options_grupo">
              {dataAutoComplite.grupo
                ? dataAutoComplite.grupo.map((item) => (
                    <option value={item.grupo} key={item.id_grupo}></option>
                  ))
                : null}
            </datalist>
          </div>
          <div className="flex gap-3 items-center">
            <label>Maestro</label>
            <InputStyled
              type="text"
              placeholder="Maestro"
              className="bg-blue-800 p-2 rounded-full outline-none"
              name="maestro"
              onChange={handleInput}
              value={data.maestro}
              list="options_maestro"
            />
            <datalist id="options_maestro">
              {dataAutoComplite.maestro
                ? dataAutoComplite.maestro.map((item) => (
                    <option value={item.maestro} key={item.id_maestro}></option>
                  ))
                : null}
            </datalist>
          </div>

          <div className="flex gap-3 items-center">
            <label>Ciclo</label>
            <InputStyled
              type="text"
              placeholder="Ciclo"
              className="bg-blue-800 p-2 rounded-full outline-none"
              name="ciclo"
              onChange={handleInput}
              value={data.ciclo}
              list="options_ciclo"
            />
            <datalist id="options_ciclo">
              {dataAutoComplite.ciclo
                ? dataAutoComplite.ciclo.map((item) => (
                    <option value={item.ciclo} key={item.id_ciclo}></option>
                  ))
                : null}
            </datalist>
          </div>
          <div className="flex gap-3 items-center">
            <label>Nombre</label>
            <InputStyled
              type="text"
              placeholder="Nombre"
              name="nombre"
              onChange={handleInput}
              value={data.nombre}
            />
          </div>
          <div className="flex gap-3 items-center">
            <label>Boleta</label>
            <InputStyled
              type="text"
              placeholder="Boleta"
              name="boleta"
              onChange={handleInput}
              value={data.boleta}
            />
          </div>
          <div className="flex gap-3 items-center">
            <label>#laboratorio</label>
            <InputStyled
              type="text"
              placeholder="#Laboratorio"
              name="laboratorio"
              onChange={handleInput}
              value={data.laboratorio}
              list="options_lab"
            />
            <datalist id="options_lab">
              {dataAutoComplite.laboratorio
                ? dataAutoComplite.laboratorio.map((item) => (
                    <option
                      value={item.laboratorio}
                      key={item.id_laboratorio}></option>
                  ))
                : null}
            </datalist>
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

export default IncidentForm;
