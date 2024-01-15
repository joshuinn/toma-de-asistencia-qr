"use client";
import Header from "@/app/components/Header";
import Loading from "@/app/components/Loading";
import { isEmailValid } from "@/app/components/helpers/formatTextList.helper";
import ButtonStyled from "@/app/components/styled/ButtonStyled";
import axios from "axios";
import React, { Suspense, useEffect, useState } from "react";
import { toast } from "sonner";

function Invite() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const handlesubmit = async (e) => {
    e.preventDefault();
    if (isEmailValid(email)) {
      try {
        const response = await axios.post("/api/sendmail", {
          email,
          type: "invite",
        });
        if (response.status == 200) {
          setEmail("");
          toast.success("Se ha mandado correctamente la invitación🎉");
          return;
        }
        toast.error("Se ha producido un error al mandar el email");
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log(email);
      setError("El correo no es válido");
    }
    setEmail("");
  };
  const handleInput = (e) => {
    setEmail(e.target.value);
  };
  useEffect(() => {
    if (email.length > 0 && error.length > 0) {
      setError("");
    }
  }, [email]);
  return (
    <Suspense fallback={<Loading />}>
      <Header title="Inviar a encargado" />
      <div className="flex h-full justify-center pt-20 text-white ">
        <div className="flex justify-center items-center p-4 bg-blue-600 rounded-lg w-10/12 h-[50vh] flex-col gap-4 shadow-lg text-center">
          <h2 className="text-2xl font-bold text-purple">Ingrese un correo </h2>
          <form
            className="flex flex-col gap-3 justify-center items-center"
            onSubmit={handlesubmit}
          >
            <div className="flex flex-wrap gap-3 items-center justify-center">
              <label htmlFor="correo">Correo </label>
              <input
                type="email"
                placeholder="Correo"
                id="correo"
                className="rounded-full outline-none p-3 bg-blue-800"
                onChange={handleInput}
                value={email}
                required
              />
            </div>
            <div>
              <p className="text-pink">{error}</p>
            </div>
            <ButtonStyled color="purple">Enviar invitación</ButtonStyled>
          </form>
        </div>
      </div>
    </Suspense>
  );
}

export default Invite;
