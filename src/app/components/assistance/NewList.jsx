"use client";
import axios from "axios";
import React, { useState } from "react";
import { AiFillCloseCircle, AiOutlineWarning, AiFillCheckCircle } from "react-icons/ai";
import { BiListPlus, BiErrorCircle } from "react-icons/bi";
import { toast } from "sonner";
function NewList({handleRefreshGroups}) {
  const [data, setData] = useState({
    grupo: "",
    profesor: "",
    lab: "",
    materia: "",
    ciclo: "",
  });
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
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
    toast.success("Se ha guardado correctamente",{
      icon: <AiFillCheckCircle  size={25} className="text-green-700"/>,
      duration:5000
    })
  };
  const notifyError= () => {
    toast.error("Ha ocurrido un error, vuelva a intentar",{
      icon: <BiErrorCircle  size={25} className="text-red-700"/>,
    })
  };
  const submitGroup = async () => {
    try {
      const response = await axios.post("/api/groups", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setData({ grupo: "", profesor: "", lab: "", materia: "", ciclo: "" });
      setShow(false)
      setShowConfirm(false)
      if (response.status == 200) {
        notifySuccess()
        handleRefreshGroups()
      }else{
        notifyError()
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleInput = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <div
        className={`
        mt-10 w-[calc(100%-13rem)] flex flex-col items-center justify-center overflow-hidden
        p-3 top-[-3rem] h-full
        transition-all
        delay-100
        duration-200
        ease-in-out
        absolute
        ${show ? "bg-[rgb(0,0,0,0.5)] left-[13rem] " : "right-full opacity-0"} 
        `}>
        <div className="bg-white p-4 flex flex-col justify-center rounded-lg shadow-2xl">
          <div className="w-full flex justify-end">
            <AiFillCloseCircle
              size={30}
              className="cursor-pointer text-indigo-950"
              onClick={handleShow}
            />
          </div>
          <h2 className="text-center mb-2 bold text-2xl">Ingrese</h2>
          <form
            className="flex flex-col items-center gap-2"
            onSubmit={handleSubmit}>
            <div className="flex gap-1 items-center justify-between w-full">
              <label>Grupo</label>
              <input
                type="text"
                placeholder="grupo"
                name="grupo"
                className="border rounded-lg p-1 bg-gray-100"
                value={data.grupo}
                onChange={handleInput}
                required
              />
            </div>
            <div className="flex gap-1 items-center justify-between w-full">
              <label>Profesor</label>
              <input
                type="text"
                placeholder="Profesor"
                name="profesor"
                className="border rounded-lg p-1 bg-gray-100"
                value={data.profesor}
                required
                onChange={handleInput}
              />
            </div>
            <div className="flex gap-1 items-center justify-between w-full">
              <label>#Laboratorio</label>
              <input
                type="text"
                placeholder="Laboratorio"
                name="lab"
                className="border rounded-lg p-1 bg-gray-100"
                required
                value={data.lab}
                onChange={handleInput}
              />
            </div>
            <div className="flex gap-1 items-center justify-between w-full">
              <label>Materia</label>
              <input
                type="text"
                placeholder="Meteria"
                name="materia"
                className="border rounded-lg p-1 bg-gray-100"
                required
                value={data.materia}
                onChange={handleInput}
              />
            </div>
            <div className="flex gap-1 items-center justify-between w-full">
              <label>Ciclo</label>
              <input
                type="text"
                placeholder="Ciclo"
                name="ciclo"
                className="border rounded-lg p-1 bg-gray-100"
                required
                value={data.ciclo}
                onChange={handleInput}
              />
            </div>
            <button className="border p-2 rounded-lg border-green-600 text-green-600 hover:text-white hover:bg-green-600 transition">
              Terminar registro
            </button>
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
            `}>
            <div className="bg-white w-1/3 h-1/3 flex flex-col p-3 rounded-xl items-center justify-center gap-5 shadow-2xl">
              <AiOutlineWarning size={60} className="text-yellow-400" />
              <p>La lista se guardara y no podra ser modificada</p>
              <p className="font-bold text-xl">¿Está seguro?</p>
              <div className="flex gap-3">
                <button
                  onClick={handleShowConfirm}
                  className="bg-white border border-red-600 text-red-600 p-3 rounded-lg hover:bg-red-600 hover:text-white">
                  Regresar
                </button>
                <button
                  className="bg-green-700 text-white p-3 rounded-lg hover:bg-green-600"
                  onClick={submitGroup}>
                  Confirmar
                </button>
              </div>
            </div>
          </div>
          {/*END MODAL*/}
        </div>
      </div>
      <button
        className="p-2 bg-indigo-950 hover:bg-indigo-800 text-white rounded-lg flex gap-3 items-center"
        onClick={handleShow}>
        Registrar nueva lista
        <BiListPlus size={25} />
      </button>
    </>
  );
}

export default NewList;
