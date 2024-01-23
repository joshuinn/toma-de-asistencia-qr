// Importar la palabra clave "use client" (tal vez específica de un framework o herramienta particular).
"use client";

// Importar la biblioteca React para la creación de componentes.
import React from "react";

// Importar el componente ListGroup desde la ruta "@/app/components/assistance/ListGroup".
import ListGroup from "@/app/components/assistance/ListGroup";

// Importar el componente Header desde la ruta "@/app/components/Header".
import Header from "@/app/components/Header";

// Definir el componente funcional Assistance.
function Assistance() {
  return (
    // Contenedor principal con altura completa, relleno y bordes redondeados.
    <div className="h-screen p-3 rounded-lg">
      
      {/* Componente Header con el título "Toma de asistencia". */}
      <Header title="Toma de asistencia" />
      
      {/* Componente ListGroup para mostrar la lista de asistencias. */}
      <ListGroup />
    </div>
  );
}

// Exportar el componente Assistance como componente predeterminado para esta ruta.
export default Assistance;
