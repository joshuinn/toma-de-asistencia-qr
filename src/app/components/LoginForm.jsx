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
import { toast } from "sonner";

function LoginForm() {
  const [credentials, setCredentials] = useState({
    boleta: "",
    contrasenia: "",
  });
  const [showPass, setShowPass] = useState(false);
  const { handleLogin, isLogged } = useContext(SessionContext);
  const router = useRouter();
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
      toast.error("Boleta o contraseña incorrectos");
    }
  };
  const handleShowPass = () => {
    setShowPass(!showPass);
  };
  useEffect(() => {
    if (isLogged) {
      router.push("/");
      router.refresh();
    }
  }, []);

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
      <ButtonStyled color="pink">Iniciar sesión</ButtonStyled>
      <div className="flex justify-center">
        <Link href="/pages/forgotPassword">
          <ButtonStyled color="purple">Olvidé mi contraseña</ButtonStyled>
        </Link>
      </div>
    </form>
  );
}

export default LoginForm;
