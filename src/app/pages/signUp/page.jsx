"use client";
import { formatText } from "@/app/components/formatTextList.helper";
import Link from "next/link";
import React, { useState } from "react";
import { TbLogin2 } from "react-icons/tb";
function page() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [data, setData] = useState({
    nombre: "",
    boleta: "",
    correo: "",
    contrasenia: "",
    confirmarContrasenia: "",
  });
  const handleInput = (e) => {
    const textFormated = formatText(e.target.name, e.target.value);
    setData({
      ...data,
      [e.target.name]: textFormated,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsRegistered(true);
  };
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="text-white bg-blue-600 p-4 shadow-lg rounded-lg w-9/12 h-5/6 flex justify-center items-center">
        {isRegistered ? (
          <div className="flex flex-col justify-center items-center gap-4">
            <h1 className="text-pink font-bold text-4xl">
              Ahora estas registrado! 🎉
            </h1>
            <Link href="/">
              <button className="rounded-lg border border-purple bg-purple p-3 hover:bg-blue-600 hover:text-purple transition-all flex items-center justify-center gap-2">
                Ir a inciar sesión
                <TbLogin2 size={25} />
              </button>
            </Link>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center gap-4">
            <h1 className="text-pink text-4xl font-bold">Registro</h1>
            <h3>Por favor ingrese los siguientes datos</h3>
            <div className="flex gap-3 items-center justify-between w-80">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                name="nombre"
                id="nombre"
                placeholder="Nombre"
                className="rounded-full bg-blue-800 p-3 outline-none shadow-lg"
                onChange={handleInput}
                value={data.nombre}
                required
              />
            </div>
            <div className="flex gap-3 items-center justify-between w-80">
              <label htmlFor="boleta">Boleta</label>
              <input
                type="text"
                name="boleta"
                id="boleta"
                placeholder="Boleta"
                className="rounded-full bg-blue-800 p-3 outline-none shadow-lg"
                onChange={handleInput}
                value={data.boleta}
                required
              />
            </div>
            <div className="flex gap-3 items-center justify-between w-80">
              <label htmlFor="correo">Correo</label>
              <input
                type="text"
                name="correo"
                id="correo"
                placeholder="Correo"
                className="rounded-full bg-blue-800 p-3 outline-none shadow-lg"
                onChange={handleInput}
                value={data.correo}
                required
              />
            </div>
            <div className="flex gap-3 items-center justify-between w-80">
              <label htmlFor="contrasenia">Contraseña</label>
              <input
                type="text"
                name="contrasenia"
                id="contrasenia"
                placeholder="Contraseña"
                className="rounded-full bg-blue-800 p-3 outline-none shadow-lg"
                onChange={handleInput}
                value={data.contrasenia}
                required
              />
            </div>
            <div className="flex gap-3 items-center justify-between w-80">
              <label htmlFor="confirmarContrasenia">Confirmar contraseña</label>
              <input
                type="text"
                name="confirmarContrasenia"
                id="confirmarContrasenia"
                placeholder="Confirmar contraseña"
                className="rounded-full bg-blue-800 p-3 outline-none shadow-lg"
                onChange={handleInput}
                value={data.confirmarContrasenia}
                required
              />
            </div>
            <button className="p-3 rounded-lg shadow-md bg-yellow border border-yellow hover:text-yellow hover:bg-blue-600 transition-all">
              Registrarme
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default page;
