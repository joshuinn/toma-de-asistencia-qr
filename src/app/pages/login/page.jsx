"use client";
import { useContext, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { SessionContext } from "@/app/components/SessionContext";
import { FaEye, FaRegEyeSlash, FaUserCircle } from "react-icons/fa";
function LoginPage() {
  const [credentials, setCredentials] = useState({
    boleta: "",
    contrasenia: "",
  });
  const [isError, setIsError] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const { handleLogin } = useContext(SessionContext);
  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth", credentials, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status == 200) {
        handleLogin();
      }
    } catch (e) {
      setIsError(true);
    }
  };
  const handleShowPass = () =>{
    setShowPass(!showPass);
  }
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen bg-blue-700">
      <h1 className="text-[60px] font-extrabold text-white">Hello!</h1>
      <form onSubmit={handelSubmit} className="flex flex-col gap-4 ">
        <div className="flex w-fit justify-center items-center text-white">
          <input
            type="text"
            placeholder="Boleta"
            className="bg-blue-800 p-3 rounded-3xl "
            name="boleta"
            onChange={handleChange}
          />
          <div className="w-full flex justify-end items-center ">
            <FaUserCircle className="absolute mr-4 " size={20} />
          </div>
        </div>
        <div className="flex w-fit justify-center items-center text-white">
          <input
            type={showPass?"text":"password"}
            name="contrasenia"
            placeholder="contraseña"
            className="bg-blue-800 p-3 rounded-3xl"
            onChange={handleChange}
          />
          <div className="w-full flex justify-end items-center">
            {showPass? 
            <FaRegEyeSlash className="absolute mr-4 cursor-pointer"size={20} onClick={handleShowPass}  />:
            <FaEye className="absolute mr-4 cursor-pointer" size={20} onClick={handleShowPass}/>
          }
          </div>
        </div>

        {isError && (
          <p className="text-pink-light">Boleta o contraseña incorrectos</p>
        )}
        <button className="p-3 px-4 text-white bg-blue-600 rounded-lg shadow-xl">
          Login
        </button>
        <Link href="/pages/forgotPassword">
          <p className="text-sm text-right text-white hover:text-gray-300">
            i forgot my pass
          </p>
        </Link>
      </form>
    </div>
  );
}

export default LoginPage;
