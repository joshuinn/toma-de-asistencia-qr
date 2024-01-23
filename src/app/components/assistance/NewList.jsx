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
  // Contexto para manejar la lista de informes
  const { handleRefreshGroups } = useContext(ReportListContext);

  // Estado para almacenar los datos del formulario
  const [data, setData] = useState({
    grupo: "",
    maestro: "",
    laboratorio: "",
    materia: "",
    ciclo: "",
  });

  // Estado para controlar la visibilidad del formulario y modal de confirmación
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Contexto para obtener datos de autocompletado y función de actualización
  const { dataAutoComplite, handleUpdate } = useContext(AutoCompliteContext);

  // Manejar la visibilidad del formulario
  const handleShow = () => {
    setShow(!show);
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    handleShowConfirm();
  };

  // Manejar la visibilidad del modal de confirmación
  const handleShowConfirm = () => {
    setShowConfirm(!showConfirm);
  };

  // Notificar éxito al usuario
  const notifySuccess = () => {
    toast.success("Se ha guardado correctamente", {
      icon: <AiFillCheckCircle size={25} className="text-green-700" />,
      duration: 5000,
    });
  };

  // Notificar error al usuario
  const notifyError = () => {
    toast.error("Ha ocurrido un error, vuelva a intentar", {
      icon: <BiErrorCircle size={25} className="text-red-700" />,
    });
  };

  // Enviar la solicitud para crear un nuevo grupo
  const submitGroup = async () => {
    try {
      const response = await axios.post("/api/groups", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Limpiar los datos del formulario y ocultar el formulario y modal de confirmación
      setData({
        grupo: "",
        maestro: "",
        laboratorio: "",
        materia: "",
        ciclo: "",
      });
      setShow(false);
      setShowConfirm(false);

      // Manejar la respuesta del servidor
      if (response.status === 200) {
        notifySuccess();
        handleRefreshGroups(); // Actualizar la lista de grupos
      } else {
        notifyError();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Manejar cambios en los campos de entrada del formulario
  const handleInput = (e) => {
    const textFormated = formatText(e.target.name, e.target.value);
    setData({
      ...data,
      [e.target.name]: textFormated,
    });
  };

  return (
    <>
      {/* Contenedor del formulario */}
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
          ${show ? "bg-opacity-50 left-0 sm:left-[12.5rem]" : "right-full opacity-0 "}
        `}
      >
        {/* Contenido del formulario */}
        <div className="bg-blue-700 p-4 flex flex-col justify-center rounded-lg shadow-2xl">
          {/* Botón para cerrar el formulario */}
          <div className="w-full flex justify-end">
            <AiFillCloseCircle
              size={30}
              className="cursor-pointer text-indigo-950"
              onClick={handleShow}
            />
          </div>
          {/* Título del formulario */}
          <h2 className="text-center mb-2 bold text-2xl">Ingrese</h2>
          {/* Formulario */}
          <form
            className="flex flex-col items-center gap-2 text-gray-500"
            onSubmit={handleSubmit}
          >
            {/* Campos del formulario */}
            <div className="flex gap-1 items-center justify-between w-full">
              {/* Campo Grupo */}
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
            {/* Otros campos similares para maestro, laboratorio, materia y ciclo */}
            {/* ... */}
            {/* Botón para enviar el formulario */}
            <ButtonStyled color="pink">
              Terminar registro
            </ButtonStyled>
          </form>
          {/* Modal de Confirmación */}
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
            {/* Contenido del Modal de Confirmación */}
            <div className="bg-blue-700 h-1/3 flex flex-col p-3 rounded-xl items-center justify-center gap-5 shadow-2xl">
              <AiOutlineWarning size={60} className="text-yellow" />
              <p>La lista se guardará y no podrá ser modificada</p>
              <p className="font-bold text-xl">¿Está seguro?</p>
              {/* Botones de confirmación y regreso */}
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
          {/* Fin del Modal de Confirmación */}
        </div>
      </div>
      {/* Botón para abrir el formulario */}
      <ButtonStyled onClick={handleShow} color="purple">
        Registrar nueva lista
        <BiListPlus size={25} />
      </ButtonStyled>
    </>
  );
}

export default NewList;
