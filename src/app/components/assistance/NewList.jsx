"use client";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  AiFillCloseCircle,
  AiOutlineWarning,
  AiFillCheckCircle,
} from "react-icons/ai";
import { BiListPlus, BiErrorCircle } from "react-icons/bi";
import { toast } from "sonner";
import { formatText } from "../helpers/formatTextList.helper";
import { AutoCompliteContext } from "../context/ContextDataAutoCompliteInput";
import ButtonStyled from "../styled/ButtonStyled";
import { ReportListContext } from "./ListReportsContext";
function NewList() {
  const {handleRefreshGroups} = useContext(ReportListContext)
  const [data, setData] = useState({
    grupo: "",
    maestro: "",
    laboratorio: "",
    materia: "",
    ciclo: "",
  });
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { dataAutoComplite, handleUpdate } = useContext(AutoCompliteContext);
  const handleShow = () => {
    setShow(!show);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleShowConfirm();
  };
  const handleShowConfirm = () => {
    setShowConfirm(!showConfirm);
  };
  const notifySuccess = () => {
    toast.success("Se ha guardado correctamente", {
      icon: <AiFillCheckCircle size={25} className="text-green-700" />,
      duration: 5000,
    });
  };
  const notifyError = () => {
    toast.error("Ha ocurrido un error, vuelva a intentar", {
      icon: <BiErrorCircle size={25} className="text-red-700" />,
    });
  };
  const submitGroup = async () => {
    try {
      const response = await axios.post("/api/groups", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setData({
        grupo: "",
        maestro: "",
        laboratorio: "",
        materia: "",
        ciclo: "",
      });
      setShow(false);
      setShowConfirm(false);
      if (response.status == 200) {
        notifySuccess();
        handleRefreshGroups();
      } else {
        notifyError();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInput = (e) => {
    const textFormated = formatText(e.target.name, e.target.value);
    setData({
      ...data,
      [e.target.name]: textFormated,
    });
  };
  return (
    <>
      <div
        className={`
        mt-10 w-full sm:w-[calc(100%-13rem)] flex flex-col items-center justify-center overflow-hidden
        p-3 top-[-2.5rem] h-full
        transition-all
        delay-100
        duration-200
        ease-in-out
        absolute
        z-10
        bg-black
        ${
          
          show ? "bg-opacity-50 left-0 sm:left-[12.5rem]" : "right-full opacity-0 "
        } 
        `}
      >
        <div className="bg-blue-700 p-4 flex flex-col justify-center rounded-lg shadow-2xl">
          <div className="w-full flex justify-end">
            <AiFillCloseCircle
              size={30}
              className="cursor-pointer text-indigo-950"
              onClick={handleShow}
            />
          </div>
          <h2 className="text-center mb-2 bold text-2xl">Ingrese</h2>
          <form
            className="flex flex-col items-center gap-2 text-gray-500"
            onSubmit={handleSubmit}
          >
            <div className="flex gap-1 items-center justify-between w-full">
              <input
                type="text"
                placeholder="Grupo"
                name="grupo"
                className="rounded-full p-2 bg-blue-800 outline-none text-white"
                value={data.grupo}
                onChange={handleInput}
                list="options_grupo"
                required
              />
              <datalist id="options_grupo">
                {dataAutoComplite.grupo
                  ? dataAutoComplite.grupo.map((grupo) => (
                      <option value={grupo.grupo} key={grupo.id_grupo}></option>
                    ))
                  : null}
              </datalist>
            </div>
            <div className="flex gap-1 items-center justify-between w-full">
              <input
                type="text"
                placeholder="Nombre del profesor"
                name="maestro"
                className="rounded-full p-2 bg-blue-800 outline-none text-white"
                value={data.maestro}
                required
                onChange={handleInput}
                list="options_maestro"
              />
              <datalist id="options_maestro">
                {dataAutoComplite.maestro
                  ? dataAutoComplite.maestro.map((item) => (
                      <option
                        value={item.maestro}
                        key={item.id_maestro}
                      ></option>
                    ))
                  : null}
              </datalist>
            </div>
            <div className="flex gap-1 items-center justify-between w-full">
              <input
                type="text"
                placeholder="No. Laboratorio"
                name="laboratorio"
                className="rounded-full p-2 bg-blue-800 outline-none text-white"
                required
                value={data.laboratorio}
                onChange={handleInput}
                list="options_lab"
              />
              <datalist id="options_lab">
                {dataAutoComplite.laboratorio
                  ? dataAutoComplite.laboratorio.map((item) => (
                      <option
                        value={item.laboratorio}
                        key={item.id_laboratorio}
                      ></option>
                    ))
                  : null}
              </datalist>
            </div>
            <div className="flex gap-1 items-center justify-between w-full">
              <input
                type="text"
                placeholder="Materia"
                name="materia"
                className="rounded-full p-2 bg-blue-800 outline-none text-white"
                required
                value={data.materia}
                onChange={handleInput}
                list="options_materia"
              />
              <datalist id="options_materia">
                {dataAutoComplite.materia
                  ? dataAutoComplite.materia.map((item) => (
                      <option
                        value={item.materia}
                        key={item.id_materia}
                      ></option>
                    ))
                  : null}
              </datalist>
            </div>
            <div className="flex gap-1 items-center justify-between w-full">
              <input
                type="text"
                placeholder="Ciclo"
                name="ciclo"
                className="rounded-full p-2 bg-blue-800 outline-none text-white"
                required
                value={data.ciclo}
                onChange={handleInput}
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
            <ButtonStyled color="pink">
              Terminar registro
            </ButtonStyled>
          </form>
          {/*MODAL*/}
          <div
            className={`z-10 absolute 
            ${showConfirm ? "left-0" : "right-full opacity-0"}
            bg-[rgb(0,0,0,0.5)]
            w-full
            h-full
            flex
            items-center
            justify-center
            transition-all
            `}
          >
            <div className="bg-blue-700 h-1/3 flex flex-col p-3 rounded-xl items-center justify-center gap-5 shadow-2xl">
              <AiOutlineWarning size={60} className="text-yellow" />
              <p>La lista se guardara y no podra ser modificada</p>
              <p className="font-bold text-xl">¿Está seguro?</p>
              <div className="flex gap-3">
                <ButtonStyled
                  onClick={handleShowConfirm}
                  color="pink"
                >
                  Regresar
                </ButtonStyled>
                <ButtonStyled
                color="green"
                  onClick={submitGroup}
                >
                  Confirmar
                </ButtonStyled>
              </div>
            </div>
          </div>
          {/*END MODAL*/}
        </div>
      </div>
      <ButtonStyled onClick={handleShow} color="purple">
        Registrar nueva lista
        <BiListPlus size={25} />
      </ButtonStyled>
    </>
  );
}

export default NewList;
