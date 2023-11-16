"use client";
import axios from "axios";
import React, { useState, useEffect, Suspense } from "react";
import { AiFillCloseCircle, AiOutlineQrcode } from "react-icons/ai";
import { RiInboxUnarchiveFill } from "react-icons/ri";
import Loading from "../Loading";
import { toast } from "sonner";
const DATA = [
  {
    id_grupo: 12,
    name: "juan",
    boleta: "202020",
    maquina: "22",
    date: "20-20-20",
  },
  {
    id_grupo: 15,
    name: "PEdro",
    boleta: "202020",
    maquina: "22",
    date: "20-20-20",
  },
  {
    id_grupo: 112,
    name: "Some",
    boleta: "202020",
    maquina: "22",
    date: "20-20-20",
  },
  {
    id_grupo: 18,
    name: "some",
    boleta: "202020",
    maquina: "22",
    date: "20-20-20",
  },
];

function ListStudent({ id_lista_asitencia }) {
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [dataForm, setDataForm] = useState({
    url: "",
    id_lista_asitencia: id_lista_asitencia,
    maquina: "",
  });
  /*
  useEffect(() => {
    //setStudents(DATA);
  }, []);
  */
  const handleSubmit = (e) => {
    e.preventDefault();
    getDataStudent();
    setDataForm({
      url: "",
      id_lista_asitencia: "",
      maquina: "",
    });
  };
  const handleForm = () => {
    setShowForm(!showForm);
  };
  const handleInput = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value,
    });
  };
  const getDataStudent = async () => {
    try {
      const { data } = await axios.post("/api/webScrapping", dataForm);
      if (data) {
        setStudents([
          ...students,
          {
            boleta: data.boleta,
            apellido_alumno: data.nombre.apellido,
            nombre_alumno: data.nombre.nombre,
            id: crypto.randomUUID(),
          },
        ]);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleEndList = () =>{
    toast.success("Se ha guardado correctamente la lista de asistencia")
  }
  const FormRegister = () => {
    return (
      <div
        className={`
       w-[calc(100%-13rem)] h-screen top-0 absolute flex justify-center items-center
      transition-all
      ease-in-out
      z-30
      ${
        showForm ? " bg-[rgb(0,0,0,0.5)] left-[13rem]" : "right-full opacity-0 "
      }
      `}>
        <div className="bg-white p-5 flex flex-col items-center justify-center rounded-lg">
          <div className="flex justify-end w-full">
            <AiFillCloseCircle
              size={30}
              className="text-indigo-950 cursor-pointer"
              onClick={handleForm}
            />
          </div>
          <h2>Ingrese manual de momento</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <input
              className="bg-gray-100 p-2 rounded-md outline-none border-b-2 focus:border-indigo-950"
              type="text"
              name="url"
              placeholder="URL"
              onChange={handleInput}
              value={dataForm.url}
            />
            <input
              type="text"
              value={dataForm.id_lista_asitencia}
              className="hidden"
              name="id_lista_asitencia"
              onChange={handleInput}
            />
            <button className="bg-green-700 hover:bg-green-600 text-white p-2 rounded-lg">
              Agregar
            </button>
          </form>
        </div>
      </div>
    );
  };
  return (
    <Suspense fallback={<Loading />}>
      <div className="bg-white h-[83vh] rounded-lg p-3 shadow-lg z-10">
        <div className="flex justify-end">
          <button
            className="bg-green-700 p-3 text-white rounded-lg hover:bg-green-600 flex items-center"
            onClick={handleForm}>
            <AiOutlineQrcode size={25} />
            <p>Iniciar registro con QR</p>
          </button>
        </div>
        <ul className="grid grid-cols-4">
          <li>Apellido</li>
          <li>Nombre</li>
          <li>Boleta</li>
          <li>No. maquina</li>
        </ul>
        <ul className="h-[63vh] overflow-y-scroll">
          {students.map((student) => (
            <li key={student.id} className="grid grid-cols-4">
              <p>{student.apellido_alumno}</p>
              <p>{student.nombre_alumno}</p>
              <p>{student.boleta}</p>
              <input
                type="text"
                placeholder="00"
                value={student.maquina ?? "00"}
              />
            </li>
          ))}
        </ul>
        <div className="flex justify-end">
          <button className="border border-red-500 text-red-500 hover:bg-red-500 p-3 mt-2 rounded-lg hover:text-white flex items-center gap-1" onClick={handleEndList}>
            <p>Terminar registro</p>
            <RiInboxUnarchiveFill size={25}/>
          </button>
        </div>
      </div>
      <FormRegister />
    </Suspense>
  );
}

export default ListStudent;
