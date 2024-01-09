"use client";

import ButtonStyled from "@/app/components/styled/ButtonStyled";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { RiArrowGoBackFill } from "react-icons/ri";

function ForgotPassword() {
  const [boleta, setBoleta] = useState("");
  const [wasEmailSent, setWasEmailSent] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/sendmail", {
        boleta,
        type: "forgotPassword",
      });
      if (response.status == 200) {
        setWasEmailSent(true);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleInput = (e) => {
    setBoleta(e.target.value);
  };
  return (
    <>
      <div className="flex justify-center sm:justify-start">
        <Link href="/pages/login">
        <ButtonStyled className="border-blue-600 bg-blue-600 m-3 hover:text-pink hover:border-pink">

            <RiArrowGoBackFill />
            <p>Regresar al inicio</p>
          </ButtonStyled>
        </Link>
      </div>
      <div className="flex justify-center items-center text-white p-4 h-screen w-full">
        <div className="bg-blue-600 w-11/12 sm:w-fit h-fit p-10 flex justify-center items-center rounded-lg shadow-xl">
          {wasEmailSent ? (
            <div className="flex flex-col gap-4 items-center justify-center">
              <h1 className="text-2xl font-bold">
                Se enviará un correo asociado a la boleta ingresada en caso de
                existir
              </h1>
              <Link href="/">
                <button className="p-3 border border-pink bg-pink hover:bg-blue-600 hover:text-pink transition-all rounded-lg">
                  Regresar al inicio
                </button>
              </Link>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 justify-center items-center relative w-full"
            >
              <h1 className="font-bold text-xl sm:text-2x text-center">
                Ingrese su boleta y se le enviará un correo en caso de existir
              </h1>
              <div className="flex flex-wrap justify-center gap-4 items-center">
                <label htmlFor="boleta">Boleta</label>
                <input
                  type="text"
                  name="boleta"
                  placeholder="boleta"
                  id="boleta"
                  value={boleta}
                  onChange={handleInput}
                  className="rounded-full outline-none bg-blue-800 p-3"
                  required
                />
              </div>
              <button className="p-3 bg-purple rounded-lg border border-purple hover:bg-blue-600 hover:text-purple transition-all">
                Enviar correo
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
