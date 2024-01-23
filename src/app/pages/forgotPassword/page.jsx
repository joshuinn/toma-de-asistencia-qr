// Importar la palabra clave "use client" (puede depender de un framework o herramienta específica).
"use client";

// Importar el componente ButtonStyled desde la ruta "@/app/components/styled/ButtonStyled".
import ButtonStyled from "@/app/components/styled/ButtonStyled";

// Importar la biblioteca axios para realizar solicitudes HTTP.
import axios from "axios";

// Importar el componente Link de Next.js para la navegación entre páginas.
import Link from "next/link";

// Importar el hook useState de React para gestionar el estado local del componente.
import { useState } from "react";

// Importar el icono RiArrowGoBackFill de React-icons para la flecha de retroceso.
import { RiArrowGoBackFill } from "react-icons/ri";

// Definir el componente funcional ForgotPassword.
function ForgotPassword() {
  // Estado local para almacenar el valor de la boleta.
  const [boleta, setBoleta] = useState("");

  // Estado local para determinar si se envió el correo electrónico.
  const [wasEmailSent, setWasEmailSent] = useState(false);

  // Función que maneja el envío del formulario.
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Realizar una solicitud POST a la API para enviar el correo electrónico.
      const response = await axios.post("/api/sendmail", {
        boleta,
        type: "forgotPassword",
      });

      // Si la respuesta es exitosa (código 200), establecer que el correo electrónico se envió.
      if (response.status === 200) {
        setWasEmailSent(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Función que maneja el cambio en la entrada de la boleta.
  const handleInput = (e) => {
    setBoleta(e.target.value);
  };

  // Renderizar el componente ForgotPassword.
  return (
    <>
      {/* Sección para regresar al inicio usando un enlace de Next.js. */}
      <div className="flex justify-center sm:justify-start">
        <Link href="/pages/login">
          <ButtonStyled className="border-blue-600 bg-blue-600 m-3 hover:text-pink hover:border-pink">
            <RiArrowGoBackFill />
            <p>Regresar al inicio</p>
          </ButtonStyled>
        </Link>
      </div>

      {/* Sección principal del componente para mostrar el formulario o el mensaje de confirmación. */}
      <div className="flex justify-center items-center text-white p-4 h-screen w-full">
        <div className="bg-blue-600 w-11/12 sm:w-fit h-fit p-10 flex justify-center items-center rounded-lg shadow-xl">
          {wasEmailSent ? (
            // Sección para mostrar el mensaje de confirmación después de enviar el correo electrónico.
            <div className="flex flex-col gap-4 items-center justify-center">
              <h1 className="text-2xl font-bold">
                Se enviará un correo asociado a la boleta ingresada en caso de existir
              </h1>
              <Link href="/">
                {/* Botón para regresar al inicio después de enviar el correo. */}
                <button className="p-3 border border-pink bg-pink hover:bg-blue-600 hover:text-pink transition-all rounded-lg">
                  Regresar al inicio
                </button>
              </Link>
            </div>
          ) : (
            // Sección para mostrar el formulario de recuperación de contraseña.
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 justify-center items-center relative w-full"
            >
              <h1 className="font-bold text-xl sm:text-2x text-center">
                Ingrese su boleta y se le enviará un correo en caso de existir
              </h1>
              <div className="flex flex-wrap justify-center gap-4 items-center">
                {/* Etiqueta y campo de entrada para la boleta. */}
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
              {/* Botón para enviar el correo electrónico. */}
              <button className="p-3 bg-purple rounded-lg border border-purple hover:bg-blue-600 hover:text-purple transition-all">
                Enviar correo
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

// Exportar el componente ForgotPassword como componente predeterminado para esta ruta.
export default ForgotPassword;
