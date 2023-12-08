"use client";
import {
  formatText,
  isEmailValid,
  isPasswordValid,
} from "@/app/components/formatTextList.helper";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useReducer, useState } from "react";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import { TbLogin2 } from "react-icons/tb";
const showPassreducer = (state, action) => {
  switch (action.type) {
    case "contrasenia":
      return { ...state, pass1: !state.pass1 };
    case "confirmarContrasenia":
      return { ...state, pass2: !state.pass2 };
    default:
      return state;
  }
};

function page({ params }) {
  const [isRegistered, setIsRegistered] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();
  const [showPass, setShowPass] = useReducer(showPassreducer, {
    pass1: false,
    pass2: false,
  });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEmailValid(data.correo)) {
      return setError("El correo no es válido");
    }
    if (!isPasswordValid(data.contrasenia)) {
      return setError("La contraseña debe ser mayor a 6 caracteres");
    }
    if (data.contrasenia !== data.confirmarContrasenia) {
      return setError("La contraseñas no son iguales");
    }
    try {
      const response = await axios
        .post("/api/users", [data])
        .then((res) => res)
        .catch((e) => e);
      if (response.status == 200) {
        console.log(response);
      } else {
        return setError("Ha ocurrido un error vuelva intentar");
      }
      setIsRegistered(true);
    } catch (error) {}
  };

  useEffect(() => {
    if (error.length > 0) {
      if (error.includes("correo")) {
        setError("");
      }
    }
  }, [data.correo]);
  useEffect(() => {
    if (error.length > 0) {
      if (error.includes("contraseña")) {
        setError("");
      }
    }
  }, [data.contrasenia]);

  useEffect(() => {
    const verifyToken = async (token) => {
      try {
        const response = await axios
          .post("/api/verifyToken", [{ token }])
          .then((res) => res)
          .then((res) => res)
          .catch((e) => e);
        console.log(response.status);
        if (response.status == 200) {
          setData({ ...data, correo: response.data.correo });
          return;
        }
      } catch (error) {
        console.log("error catch:" + error);
      }
      router.push("/");
      router.refresh();
    };
    verifyToken(params.token);
  }, []);

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
            className="flex flex-col justify-center items-center gap-4"
          >
            <h1 className="text-purple text-4xl font-bold">Registro</h1>
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
                type="email"
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
              <div className="flex w-fit justify-center items-center">
                <input
                  type={showPass.pass1 ? "text" : "password"}
                  name="contrasenia"
                  id="contrasenia"
                  placeholder="Contraseña"
                  className="rounded-full bg-blue-800 p-3 outline-none shadow-lg"
                  onChange={handleInput}
                  value={data.contrasenia}
                  required
                />
                <div className="w-full flex justify-end items-center">
                  {showPass.pass1 ? (
                    <FaRegEyeSlash
                      className="absolute mr-4 cursor-pointer"
                      size={20}
                      onClick={() => setShowPass({ type: "contrasenia" })}
                    />
                  ) : (
                    <FaEye
                      className="absolute mr-4 cursor-pointer"
                      size={20}
                      onClick={() => setShowPass({ type: "contrasenia" })}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-3 items-center justify-between w-80">
              <label htmlFor="confirmarContrasenia">Confirmar contraseña</label>
              <div className="flex w-fit justify-center items-center">
                <input
                  type={showPass.pass2 ? "text" : "password"}
                  name="confirmarContrasenia"
                  id="confirmarContrasenia"
                  placeholder="Confirmar contraseña"
                  className="rounded-full bg-blue-800 p-3 outline-none shadow-lg"
                  onChange={handleInput}
                  value={data.confirmarContrasenia}
                  required
                />
                <div className="w-full flex justify-end items-center">
                  {showPass.pass2 ? (
                    <FaRegEyeSlash
                      className="absolute mr-4 cursor-pointer"
                      size={20}
                      onClick={() =>
                        setShowPass({ type: "confirmarContrasenia" })
                      }
                    />
                  ) : (
                    <FaEye
                      className="absolute mr-4 cursor-pointer"
                      size={20}
                      onClick={() =>
                        setShowPass({ type: "confirmarContrasenia" })
                      }
                    />
                  )}
                </div>
              </div>
            </div>
            <p className="text-pink">{error}</p>
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
