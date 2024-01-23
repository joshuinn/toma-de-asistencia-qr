// Importar el componente Header desde la ruta "@/app/components/Header".
import Header from "@/app/components/Header";

// Importar el componente Loading desde la ruta "@/app/components/Loading".
import Loading from "@/app/components/Loading";

// Importar la función isEmailValid desde la ruta "@/app/components/helpers/formatTextList.helper".
import { isEmailValid } from "@/app/components/helpers/formatTextList.helper";

// Importar el componente ButtonStyled desde la ruta "@/app/components/styled/ButtonStyled".
import ButtonStyled from "@/app/components/styled/ButtonStyled";

// Importar axios para realizar solicitudes HTTP.
import axios from "axios";

// Importar React y otras funciones de React.
import React, { Suspense, useEffect, useState } from "react";

// Importar toast desde "sonner" para mostrar mensajes de notificación.
import { toast } from "sonner";

// Definir el componente funcional Invite.
function Invite() {
  // Estado para almacenar el correo electrónico y manejar errores.
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  // Función para manejar el envío del formulario.
  const handlesubmit = async (e) => {
    e.preventDefault();

    // Verificar si el correo electrónico es válido.
    if (isEmailValid(email)) {
      try {
        // Realizar una solicitud para enviar el correo de invitación.
        const response = await axios.post("/api/sendmail", {
          email,
          type: "invite",
        });

        // Verificar el estado de la respuesta y mostrar mensajes de notificación.
        if (response.status === 200) {
          setEmail("");
          toast.success("Se ha mandado correctamente la invitación🎉");
          return;
        }
        toast.error("Se ha producido un error al mandar el email");
      } catch (error) {
        console.log(error);
      }
    } else {
      setError("El correo no es válido");
    }
    setEmail("");
  };

  // Función para manejar cambios en la entrada de correo electrónico.
  const handleInput = (e) => {
    setEmail(e.target.value);
  };

  // Efecto para limpiar el mensaje de error cuando se ingresa un nuevo correo electrónico.
  useEffect(() => {
    if (email.length > 0 && error.length > 0) {
      setError("");
    }
  }, [email]);

  return (
    // Utilizar el componente Suspense para manejar la carga asincrónica.
    <Suspense fallback={<Loading />}>
      {/* Utilizar el componente Header con el título "Inviar a encargado". */}
      <Header title="Inviar a encargado" />

      {/* Contenedor principal del componente Invite. */}
      <div className="flex h-full justify-center pt-20 text-white">
        <div className="flex justify-center items-center p-4 bg-blue-600 rounded-lg w-10/12 h-[50vh] flex-col gap-4 shadow-lg text-center">
          <h2 className="text-2xl font-bold text-purple">
            Ingrese un correo
          </h2>

          {/* Formulario para ingresar el correo electrónico y enviar la invitación. */}
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
              {/* Mostrar mensaje de error si el correo no es válido. */}
              <p className="text-pink">{error}</p>
            </div>

            {/* Utilizar el componente ButtonStyled para enviar la invitación. */}
            <ButtonStyled color="purple">Enviar invitación</ButtonStyled>
          </form>
        </div>
      </div>
    </Suspense>
  );
}

// Exportar el componente Invite como componente predeterminado.
export default Invite;
