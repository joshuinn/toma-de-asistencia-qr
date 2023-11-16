"use client";
import { useContext, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { SessionContext } from "@/app/components/SessionContext";
function LoginPage() {
  const [credentials, setCredentials] = useState({
    boleta: "",
    contrasenia: "",
  });
  const [isError, setIsError] = useState(false)
  const {handleLogin} = useContext(SessionContext)
  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post("/api/auth", credentials, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      if(response.status == 200){
        handleLogin()
      }
    }catch(e){
        setIsError(true)
    }
  };
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <h1 className="text-[60px] font-extrabold">Hello!</h1>
      <form onSubmit={handelSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Boleta"
          className="bg-gray-100 p-3 rounded-md outline-none border-b-2 focus:border-indigo-950 shadow-md"
          name="boleta"
          onChange={handleChange}
        />
        <input
          type="password"
          name="contrasenia"
          placeholder="contrasenia"
          className="bg-gray-100 p-3 rounded-md outline-none border-b-2 focus:border-indigo-950 shadow-md"
          onChange={handleChange}
        />
        
        {isError && <p className="text-red-600">Boleta o contraseña incorrectos</p>}
        <button className="p-3 px-4 rounded-lg bg-indigo-950 text-white hover:bg-indigo-900">Login</button>
        <Link href="/pages/forgotPassword"><p className="text-sm text-right text-gray-500 hover:text-indigo-800">i forgot my pass</p></Link>
      </form>
    </div>
  );
}

export default LoginPage;
