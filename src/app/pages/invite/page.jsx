"use client";
import Header from "@/app/components/Header";
import { isEmailValid } from "@/app/components/formatTextList.helper";
import { toastError, toastSucces } from "@/app/components/toast.helper";
import axios from "axios";
import React, { useEffect, useState } from "react";

function page() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("")
  const handlesubmit = async(e) => {
    e.preventDefault();
    if(isEmailValid(email)){
      try {
        const response = await axios.post("/api/sendmail",[email])
        if(response.status == 200){
          toastSucces("Se ha mandado correctamente la invitación🎉")
          return
        }
        toastError("Se ha producido un error al mandar el email")
      } catch (error) {
          console.log(error);
      }
    }else{
      setError("El correo no es válido")
    }
  };
  const handleInput = (e) => {
    setEmail(e.target.value);
  };
  useEffect(()=>{
    if(email.length>0 && error.length>0){
      setError("")
    }
  },[email])
  return (
    <>
      <Header title="Inviar a encargado" />
      <div className="flex justify-center pt-20 text-white ">
        <div className="flex justify-center items-center p-4 bg-blue-600 rounded-lg w-10/12 h-[50vh] flex-col gap-4 shadow-lg">
          <h2 className="text-2xl font-bold text-purple">Ingrese un correo </h2>
          <form
            className="flex flex-col gap-3 justify-center items-center"
            onSubmit={handlesubmit}>
            <div className="flex gap-3 items-center">
              <label htmlFor="correo">Correo </label>
              <input
                type="email"
                placeholder="correo"
                id="correo"
                className="rounded-full outline-none p-3 bg-blue-800"
                onChange={handleInput}
                required
              />
            </div>
            <div>
              <p className="text-pink">{error}</p>
            </div>
            <button className="p-3 bg-purple border border-purple rounded-lg hover:text-purple hover:bg-blue-600 transition-all">
              Enviar invitación
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default page;
