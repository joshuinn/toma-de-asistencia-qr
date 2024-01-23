// Importar la palabra clave "use client" (puede depender de un framework o herramienta específica).
"use client";

// Importar el componente Header desde la ruta "@/app/components/Header".
import Header from "@/app/components/Header";

// Importar el componente ChangePass desde la ruta "@/app/components/config/ChangePass".
import ChangePass from "@/app/components/config/ChangePass";

// Importar Suspense, useContext, useEffect y useState desde React.
import { Suspense, useContext, useEffect, useState } from "react";

// Importar la biblioteca axios para realizar solicitudes HTTP.
import axios from "axios";

// Importar el contexto SessionContext desde la ruta "@/app/components/context/SessionContext".
import { SessionContext } from "@/app/components/context/SessionContext";

// Importar el componente Loading desde la ruta "@/app/components/Loading".
import Loading from "@/app/components/Loading";

// Importar el componente InputStyled desde la ruta "@/app/components/styled/InputStyled".
import InputStyled from "@/app/components/styled/InputStyled";

// Definir el componente funcional Config.
function Config() {
  // Estado local para almacenar los datos del usuario.
  const [dataUser, setDataUser] = useState({
    nombre: "",
    boleta: "",
    correo: "",
  });

  // Obtener el contexto de sesión.
  const userctx = useContext(SessionContext);

  // Efecto que se ejecuta al montar el componente para obtener los datos del usuario.
  useEffect(() => {
    const getDatauser = async () => {
      try {
        // Realizar una solicitud GET para obtener los datos del usuario.
        const response = await axios.get(
          "/api/users/" + userctx.dataUser.id_usuario
        );
        // Actualizar el estado local con los datos del usuario.
        setDataUser({
          nombre: response.data.nombre_usuario,
          correo: response.data.correo,
          boleta: response.data.boleta,
        });
      } catch (error) {
        console.log(error);
      }
    };

    // Llamar a la función para obtener los datos del usuario.
    getDatauser();
  }, []); // El segundo argumento ([]) asegura que el efecto solo se ejecute una vez al montar el componente.

  // Renderizar el componente Config.
  return (
    // Suspense para manejar la carga de componentes de forma asíncrona.
    <Suspense fallback={<Loading />}>
      {/* Componente Header con el título "Mi cuenta". */}
      <Header title="Mi cuenta" />

      {/* Contenedor principal con disposición en fila y centrado vertical y horizontalmente. */}
      <div className="flex w-full h-full justify-center items-center">
        {/* Contenedor de información del usuario. */}
        <div className="w-full text-white flex flex-col justify-center items-center gap-4">
          {/* Sección para mostrar el nombre del usuario. */}
          <div className="flex flex-wrap gap-3 bg-blue-600 rounded-lg p-3 items-center w-11/12 sm:w-1/2 justify-center shadow-lg">
            <label htmlFor="nombre">Mi nombre</label>
            <InputStyled
              type="text"
              placeholder="nombre"
              id="nombre"
              className="text-gray-300 bg-opacity-50"
              value={dataUser.nombre}
              disabled
            />
          </div>

          {/* Sección para mostrar la boleta del usuario. */}
          <div className="flex flex-wrap gap-3 bg-blue-600 rounded-lg p-3 items-center w-11/12 sm:w-1/2 justify-center shadow-lg">
            <label htmlFor="boleta">Boleta</label>
            <InputStyled
              type="text"
              placeholder="Boleta"
              id="boleta"
              className="bg-opacity-50 text-gray-300"
              value={dataUser.boleta}
              disabled
            />
          </div>

          {/* Sección para mostrar el correo del usuario. */}
          <div className="flex flex-wrap gap-3 bg-blue-600 rounded-lg p-3 items-center w-11/12 sm:w-1/2 justify-center shadow-lg">
            <label htmlFor="correo">Correo</label>
            <InputStyled
              type="text"
              placeholder="Correo"
              id="correo"
              value={dataUser.correo}
              disabled
              className="text-gray-300 bg-opacity-50"
            />
          </div>

          {/* Componente ChangePass para permitir al usuario cambiar la contraseña. */}
          <ChangePass />
        </div>
      </div>
    </Suspense>
  );
}

// Exportar el componente Config como componente predeterminado para esta ruta.
export default Config;
