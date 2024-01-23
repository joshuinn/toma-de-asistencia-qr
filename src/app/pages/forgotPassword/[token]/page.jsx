// Importar la palabra clave "use client" (puede depender de un framework o herramienta específica).
"use client";

// Importar la función formatText desde la ruta "@/app/components/helpers/formatTextList.helper".
import { formatText } from "@/app/components/helpers/formatTextList.helper";

// Importar la biblioteca axios para realizar solicitudes HTTP.
import axios from "axios";

// Importar el hook useRouter de Next.js para obtener la información de la ruta.
import { useRouter } from "next/navigation";

// Importar elementos de React.
import React, { useEffect, useReducer, useState } from "react";

// Importar iconos de React para mostrar/ocultar contraseñas.
import { FaEye, FaRegEyeSlash } from "react-icons/fa";

// Importar el componente toast de la biblioteca sonner para mostrar notificaciones.
import { toast } from "sonner";

// Definir el reducer para gestionar el estado de mostrar/ocultar contraseñas.
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

// Definir el componente funcional ForgotPassword.
function ForgotPassword({ params }) {
  // Estado local para gestionar la visibilidad de las contraseñas.
  const [showPass, setShowPass] = useReducer(showPassreducer, {
    pass1: false,
    pass2: false,
  });

  // Estado local para almacenar los datos del formulario.
  const [data, setData] = useState({
    id_usuario: "",
    contrasenia: "",
    confirmarContrasenia: "",
  });

  // Estado local para determinar si la contraseña ha sido cambiada correctamente.
  const [isChanged, setIsChanged] = useState(false);

  // Hook useRouter para acceder a la información de la ruta.
  const router = useRouter();

  // Efecto que verifica el token y actualiza los datos del usuario.
  useEffect(() => {
    const verifyToken = async (token) => {
      try {
        const response = await axios
          .post("/api/verifyToken", { token })
          .then((res) => res)
          .catch((e) => e);

        if (response.status === 200) {
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

  // Función que maneja el envío del formulario.
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!(data.contrasenia === data.confirmarContrasenia)) {
      return toast.error("Las contraseñas no son iguales");
    }
    try {
      const response = await axios.put("/api/users", {
        dataPass: {
          contrasenia: data.contrasenia,
          confirmarContrasenia: data.confirmarContrasenia,
        },
        id_usuario: data.id_usuario,
      });
      if (response.status === 200) {
        setIsChanged(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Función que maneja los cambios en los campos del formulario.
  const handleInput = (e) => {
    const textFormated = formatText(e.target.name, e.target.value);
    setData({
      ...data,
      [e.target.name]: textFormated,
    });
  };

  // Función para regresar a la página de inicio.
  const handleBack = () => {
    router.push("/");
    router.refresh();
  };

  // Renderizar el componente ForgotPassword.
  if (isChanged) {
    return (
      // Sección para mostrar el mensaje de éxito después de cambiar la contraseña.
      <div className="text-white flex justify-center items-center w-full h-screen">
        <div className="bg-blue-600 p-4 rounded-lg shadow-lg w-1/2 h-1/2 flex flex-col justify-center items-center">
          <h2 className="text-2xl text-purple">
            Se ha cambiado correctamente 🎉
          </h2>
          <p>Ahora puedes regresar al inicio!</p>
          <button
            onClick={handleBack}
            className="bg-purple border border-purple rounded-lg p-3 hover:bg-blue-600 hover:text-purple transition-all m-4"
          >
            Regresar
          </button>
        </div>
      </div>
    );
  }

  return (
    // Sección principal del componente para mostrar el formulario de recuperación de contraseña.
    <div className="text-white flex justify-center items-center w-full h-screen">
      <div className="bg-blue-600 p-4 w-1/2 h-1/2 flex flex-col justify-evenly sm:justify-center items-center rounded-lg">
        <h2 className="text-2xl text-pink my-4">Recuperar cuenta</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-1/2 justify-between"
        >
          {/* Sección para la nueva contraseña */}
          <div className="flex gap-3 items-center justify-between w-80">
            <label htmlFor="contrasenia">Nueva contraseña</label>
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

          {/* Sección para confirmar la contraseña */}
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

          {/* Botón para confirmar el cambio de contraseña */}
          <div className="flex justify-center m-4">
            <button className="p-3 rounded-lg shadow-md border border-pink bg-pink hover:bg-blue-600 hover:text-pink">
              Confirmar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Exportar el componente ForgotPassword como componente predeterminado.
export default ForgotPassword;
