"use client";

import axios from "axios";
import Link from "next/link";
import { useState } from "react";

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
      console.log(error);
    }
  };
  const handleInput = (e) => {
    setBoleta(e.target.value);
  };
  return (
    <div className="flex justify-center items-center text-white p-4 h-screen w-full">
      <div className="bg-blue-600 p-10 flex justify-center items-center rounded-lg shadow-xl">
        {wasEmailSent ? (
          <div className="flex flex-col gap-4 items-center justify-center">
            <h1 className="text-2xl font-bold">
              Se enviara un correo asociado a la boleta ingresada en caso de
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
            className="flex flex-col gap-4 justify-center items-center"
          >
            <h1 className="font-bold text-2xl">
              Ingrese su boleta y se le enviará un correo en caso de existir
            </h1>
            <div className="flex gap-4 items-center">
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
  );
}

export default ForgotPassword;
