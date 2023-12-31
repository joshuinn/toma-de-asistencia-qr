"use client";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { SessionContext } from "@/app/components/SessionContext";
import { FaEye, FaRegEyeSlash, FaUserCircle } from "react-icons/fa";
import ButtonStyled from "@/app/components/styled/ButtonStyled";
import InputStyled from "@/app/components/styled/InputStyled";
import React from "react";
import { useRouter } from "next/navigation";

function LoginForm() {
  const [credentials, setCredentials] = useState({
    boleta: "",
    contrasenia: "",
  });
  const [isError, setIsError] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const { handleLogin,  isLogged } = useContext(SessionContext);
  const router = useRouter()
  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth", credentials);
      if (response.status == 200) {
        handleLogin();
      }
    } catch (e) {
      setIsError(true);
    }
  };
  const handleShowPass = () => {
    setShowPass(!showPass);
  };
  useEffect(()=>{
    if(isLogged){
      router.push("/")
      router.refresh()
    }
  },[])


  return (
    <form onSubmit={handelSubmit} className="flex flex-col gap-5 ">
      <div className="flex w-fit justify-center items-center text-white">
        <InputStyled
          type="text"
          placeholder="Boleta"
          name="boleta"
          onChange={handleChange}
          required
        />
        <div className="w-full flex justify-end items-center ">
          <FaUserCircle className="absolute mr-4 " size={20} />
        </div>
      </div>
      <div className="flex w-fit justify-center items-center text-white">
        <InputStyled
          type={showPass ? "text" : "password"}
          name="contrasenia"
          placeholder="contraseña"
          onChange={handleChange}
          required
        />
        <div className="w-full flex justify-end items-center">
          {showPass ? (
            <FaRegEyeSlash
              className="absolute mr-4 cursor-pointer"
              size={20}
              onClick={handleShowPass}
            />
          ) : (
            <FaEye
              className="absolute mr-4 cursor-pointer"
              size={20}
              onClick={handleShowPass}
            />
          )}
        </div>
      </div>

      {isError && <p className="text-pink">Boleta o contraseña incorrectos</p>}
      <ButtonStyled color="pink">Iniciar sesión</ButtonStyled>
      <Link href="/pages/forgotPassword">
        <p className="text-sm text-right text-white hover:text-gray-300 transition-all">
          Olvidé mi contraseña
        </p>
      </Link>
    </form>
  );
}

export default LoginForm;
