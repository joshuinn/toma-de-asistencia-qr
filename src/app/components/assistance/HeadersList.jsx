// Importar React y componentes relacionados.
import axios from "axios";
import React, { useEffect, useState } from "react";

// Componente funcional CardInfo que simplemente envuelve su contenido con un estilo.
const CardInfo = ({ children }) => {
  return <div className="bg-blue-600 p-3 shadow-lg rounded-lg">{children}</div>;
};

// Componente funcional HeadersList que muestra información del grupo.
function HeadersList({ id }) {
  // Estado para almacenar los datos del grupo.
  const [data, setData] = useState({
    ciclo: "",
    grupo: "",
    laboratorio: "",
    materia: "",
  });

  // Efecto para cargar los datos del grupo cuando se monta el componente.
  useEffect(() => {
    const loadGroup = async () => {
      try {
        // Realizar la solicitud GET a la API para obtener los datos del grupo.
        const response = await axios.get("/api/groups/" + id);

        // Actualizar el estado con los datos recibidos de la API.
        if (response.status === 200) {
          setData(response.data);
        }

        // Manejar el caso en que la respuesta sea 404 (No encontrado).
        if (response.status === 404) {
          // Puedes manejar este caso según tus necesidades.
        }

        // Manejar cualquier otro error.
      } catch (e) {
        console.error(e);
        // Puedes manejar este caso según tus necesidades.
      }
    };

    // Llamar a la función para cargar el grupo.
    loadGroup();
  }, [id]); // El efecto se ejecuta cuando cambia el valor de "id".

  // Renderizar el componente HeadersList.
  return (
    <div>
      {/* Mostrar la información del grupo en tarjetas estilizadas. */}
      <div className="flex gap-4 p-2 rounded-lg flex-wrap justify-between text-white">
        <CardInfo>
          <p>
            Ciclo:
            <span className="text-bold text-yellow">{" " + data.ciclo}</span>
          </p>
        </CardInfo>
        <CardInfo>
          <p>
            Grupo:
            <span className="text-bold text-yellow">{" " + data.grupo}</span>
          </p>
        </CardInfo>
        <CardInfo>
          <p>
            Profesor:
            <span className="text-bold text-yellow">{" " + data.maestro}</span>{" "}
          </p>
        </CardInfo>
        <CardInfo>
          <p>
            Numero de Laboratorio:{" "}
            <span className="text-bold text-yellow">{" " + data.laboratorio}</span>{" "}
          </p>
        </CardInfo>
        <CardInfo>
          <p>
            Materia:{" "}
            <span className="text-bold text-yellow">{" " + data.materia}</span>{" "}
          </p>
        </CardInfo>
      </div>
    </div>
  );
}

// Exportar el componente HeadersList como componente predeterminado.
export default HeadersList;
