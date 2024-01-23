// Importar el componente Header desde la ruta "@/app/components/Header".
import Header from "@/app/components/Header";

// Importar el componente Loading desde la ruta "@/app/components/Loading".
import Loading from "@/app/components/Loading";

// Importar el componente HeadersList desde la ruta "@/app/components/assistance/HeadersList".
import HeadersList from "@/app/components/assistance/HeadersList";

// Importar la biblioteca axios para realizar solicitudes HTTP.
import axios from "axios";

// Importar la función "dynamic" de Next.js para cargar componentes de forma dinámica.
import dynamic from "next/dynamic";

// Importar la biblioteca React y Suspense para manejar la carga de componentes de forma asíncrona.
import React, { Suspense } from "react";

// Cargar el componente ListStudent de forma dinámica con un indicador de carga.
const ListStudent = dynamic(
  () => import("@/app/components/assistance/ListStudent"),
  { loading: () => <Loading /> }
);

// Función asincrónica ListAssistance que recibe parámetros.
async function ListAssistance({ params }) {
  return (
    <>
      {/* Componente Header con el título "Lista de asistencia". */}
      <Header title="Lista de asistencia" />

      {/* Suspense para manejar la carga de componentes de forma asíncrona. */}
      <Suspense
        fallback={
          <div className="h-[80vh]">
            {/* Componente Loading para mostrar un indicador de carga. */}
            <Loading />
          </div>
        }
      >
        {/* Contenedor principal con disposición en columna y espacio entre elementos. */}
        <div className="flex flex-col gap-3">
          
          {/* Componente HeadersList con un ID proporcionado como parámetro. */}
          <HeadersList id={params.id} />
          
          {/* Contenedor para el componente ListStudent con un ID de lista de asistencia proporcionado como parámetro. */}
          <div>
            <ListStudent id_lista_asistencia={params.id} />
          </div>
        </div>
      </Suspense>
    </>
  );
}

// Exportar el componente ListAssistance como componente predeterminado para esta ruta.
export default ListAssistance;
