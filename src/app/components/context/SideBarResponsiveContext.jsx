// Importar la librería React y el hook useState
"use client";
import { createContext, useState } from "react";

// Crear un contexto para gestionar el estado de la barra lateral
export const SidebarContext = createContext(null);

// Proveedor de contexto para gestionar el estado de la barra lateral
export const SidebarProvider = ({ children }) => {
  // Estado para controlar si la barra lateral está visible o no
  const [isShow, setIsShow] = useState(false);

  // Función para cambiar el estado de visibilidad de la barra lateral
  const handleShow = () => {
    setIsShow(!isShow);
  };

  // Proporcionar el contexto y la función para mostrar/ocultar la barra lateral a los componentes hijos
  return (
    <SidebarContext.Provider value={{ isShow, handleShow }}>
      {children}
    </SidebarContext.Provider>
  );
};

// Exportar el proveedor de contexto de la barra lateral por defecto
export default SidebarProvider;
