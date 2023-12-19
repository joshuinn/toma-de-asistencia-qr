"use client";
import { formatText } from "@/app/components/formatTextList.helper";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useReducer, useState } from "react";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "sonner";

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

function ForgotPassword({ params }) {
  const [showPass, setShowPass] = useReducer(showPassreducer, {
    pass1: false,
    pass2: false,
  });
  const [data, setData] = useState({
    id_usuario: "",
    contrasenia: "",
    confirmarContrasenia: "",
  });
  const [isChanged, setIsChanged] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const verifyToken = async (token) => {
      try {
        const response = await axios
          .post("/api/verifyToken", { token })
          .then((res) => res)
          .catch((e) => e);

        if (response.status == 200) {
          setData({ ...data, id_usuario: response.data.dataToken.id_usuario });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!(data.contrasenia === data.confirmarContrasenia)) {
      return toast.error("Las contraseñas no son iguales");
    }
    try {
      const response = await axios.put("/api/users", [data]);
      console.log(response);
      if (response.status == 200) {
        setIsChanged(true);
      }
    } catch (error) {}
  };
  const handleInput = (e) => {
    const textFormated = formatText(e.target.name, e.target.value);
    setData({
      ...data,
      [e.target.name]: textFormated,
    });
  };
  const handleBack = () => {
    router.push("/");
    router.refresh();
  };
  if (isChanged) {
    return (
      <div className="text-white flex justify-center items-center w-full h-screen">
        <div className="bg-blue-600 p-4 rounded-lg shadow-lg w-1/2 h-1/2 flex flex-col justify-center items-center">
          <h2 className="text-2xl text-purple">
            Se ha cambiado correctamente 🎉
          </h2>
          <p>Ahora puedes Regresar al inicio!</p>
          <button
            onClick={handleBack}
            className="bg-purple border border-purple rounded-lg p-3 hover:bg-blue-600
           hover:text-purple m-4"
          >
            Regresar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="text-white flex justify-center items-center w-full h-screen">
      <div className="bg-blue-600 p-4 w-1/2 h-1/2 flex flex-col justify-evenly sm:justify-center items-center rounded-lg">
        <h2 className="text-2xl text-pink my-4">Recuperar cuenta</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-1/2 justify-between"
        >
          <div className="flex gap-3 items-center justify-between w-80">
            <label htmlFor="contrasenia">Contraseña</label>
            <div className="flex w-fit justify-center items-center">
              <input
                type={showPass.pass1 ? "text" : "password"}
                name="contrasenia"
                id="contrasenia"
                placeholder="Contraseña"
                className="rounded-full placeholder:text-sm bg-blue-800 p-3 outline-none shadow-lg"
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
                className="rounded-full placeholder:text-sm w-70 bg-blue-800 p-3 outline-none shadow-lg"
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
          <div className="flex justify-center m-4">
            <button className="p-3 rounded-lg shadow-md border border-pink bg-pink hover:bg-blue-600 hover:text-pink">
              Cambiar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
