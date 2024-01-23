// Importar funciones útiles de formato y validación desde "@/app/components/helpers/formatTextList.helper".
import {
  formatText,
  isEmailValid,
  isPasswordValid,
} from "@/app/components/helpers/formatTextList.helper";

// Importar axios para realizar solicitudes HTTP.
import axios from "axios";

// Importar el componente Link de Next.js para la navegación.
import Link from "next/link";

// Importar ganchos y componentes de React.
import React, { useEffect, useReducer, useState } from "react";

// Importar iconos de React para la interfaz de usuario.
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import { TbLogin2 } from "react-icons/tb";

// Definir el reductor showPassreducer.
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

// Definir el componente funcional Page.
function Page({ params }) {
  // Estado para verificar si el registro fue exitoso.
  const [isRegistered, setIsRegistered] = useState("");

  // Estado para manejar errores.
  const [error, setError] = useState(false);

  // Acceder al objeto router de Next.js.
  const router = useRouter();

  // Estado y reductor para manejar la visibilidad de las contraseñas.
  const [showPass, setShowPass] = useReducer(showPassreducer, {
    pass1: false,
    pass2: false,
  });

  // Estado para almacenar los datos del formulario.
  const [data, setData] = useState({
    nombre: "",
    boleta: "",
    correo: "",
    contrasenia: "",
    confirmarContrasenia: "",
  });

  // Función para manejar cambios en los campos del formulario.
  const handleInput = (e) => {
    const textFormated = formatText(e.target.name, e.target.value);
    setData({
      ...data,
      [e.target.name]: textFormated,
    });
  };

  // Función para manejar el envío del formulario.
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones del formulario.
    if (!isEmailValid(data.correo)) {
      return setError("El correo no es válido");
    }
    if (!isPasswordValid(data.contrasenia)) {
      return setError("La contraseña debe ser mayor a 6 caracteres");
    }
    if (data.contrasenia !== data.confirmarContrasenia) {
      return setError("Las contraseñas no son iguales");
    }

    try {
      // Enviar solicitud de registro al servidor.
      const response = await axios
        .post("/api/users", [data])
        .then((res) => res)
        .catch((e) => e);

      // Verificar el estado de la respuesta.
      if (response.status == 200) {
        // Registro exitoso.
      } else {
        return setError("Boleta ya registrada");
      }
      setIsRegistered(true);
    } catch (error) {}
  };

  // Efecto para manejar el cambio de error en el campo de correo.
  useEffect(() => {
    if (error.length > 0) {
      if (error.includes("correo")) {
        setError("");
      }
    }
  }, [data.correo]);

  // Efecto para manejar el cambio de error en el campo de contraseña.
  useEffect(() => {
    if (error.length > 0) {
      if (error.includes("contraseña")) {
        setError("");
      }
    }
  }, [data.contrasenia]);

  // Efecto para verificar el token y obtener el correo asociado.
  useEffect(() => {
    const verifyToken = async (token) => {
      try {
        const response = await axios
          .post("/api/verifyToken", { token })
          .then((res) => res)
          .catch((e) => e);

        // Verificar el estado de la respuesta.
        if (response.status == 200) {
          setData({ ...data, correo: response.data.dataToken.correo });
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

  // Renderizar la interfaz de usuario.
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="text-white bg-blue-600 p-4 shadow-lg rounded-lg w-9/12 h-5/6 flex justify-center items-center">
        {isRegistered ? (
          <div className="flex flex-col justify-center items-center gap-4">
            <h1 className="text-pink font-bold text-4xl">
              ¡Ahora estás registrado! 🎉
            </h1>
            <Link href="/">
              <button className="rounded-lg border border-purple bg-purple p-3 hover:bg-blue-600 hover:text-purple transition-all flex items-center justify-center gap-2">
                Ir a iniciar sesión
                <TbLogin2 size={25} />
              </button>
            </Link>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center gap-4"
          >
            <h1 className="text-purple text-4xl font-bold">Registro</h1>
            <h3>Por favor ingrese los siguientes datos</h3>
            {/* Campos del formulario */}
            {/* ... */}

            <p className="text-pink">{error}</p>

            {/* Botón de registro */}
            <button className="p-3 rounded-lg shadow-md bg-yellow border border-yellow hover:text-yellow hover:bg-blue-600 transition-all">
              Registrarse
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// Exportar el componente Page como componente predeterminado.
export default Page;
