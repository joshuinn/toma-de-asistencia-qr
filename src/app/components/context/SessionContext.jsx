"use client";
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loading from "../Loading";

// Crear un contexto para gestionar la información de la sesión
export const SessionContext = createContext(null);

// Proveedor de contexto para gestionar la información de la sesión
const SessionProvider = ({ children }) => {
  // Estados para controlar la autenticación y los datos del usuario
  const [isLogged, setIsLogged] = useState(false);
  const [dataUser, setDataUser] = useState({
    id_usuario: "",
  });

  // Estado para controlar el estado de carga al verificar la sesión
  const [isLoading, setIsLoading] = useState(true);

  // Hook de Next.js para manejar la navegación
  const router = useRouter();

  // Efecto que se ejecuta al montar el componente para verificar el estado de la sesión
  useEffect(() => {
    // Función asincrónica para verificar el estado de la sesión
    const checkLogged = async () => {
      try {
        // Realizar una solicitud HTTP para verificar el estado de la sesión en el servidor
        const response = await axios.get("/api/auth");

        // Si la respuesta es exitosa, el usuario está autenticado
        if (response.status === 200) {
          setIsLogged(true);
          setDataUser({
            id_usuario: response.data.id_usuario,
          });
        } else {
          setIsLogged(false);
        }
      } catch (error) {
        // Si hay un error al verificar la sesión, el usuario no está autenticado
        setIsLogged(false);
      } finally {
        // Marcar que la verificación de la sesión ha terminado
        setIsLoading(false);
      }
    };

    // Llamar a la función para verificar la sesión al montar el componente
    checkLogged();
  }, []);

  // Función para manejar el inicio de sesión
  const handleLogin = async () => {
    setIsLoading(true);
    // Redirigir al usuario a la página principal y recargar la página
    router.push("/");
    router.refresh();

    // Verificar el estado de la sesión después de redirigir al usuario
    const response = await axios.get("/api/auth");
    setDataUser({
      id_usuario: await response.data.id_usuario,
    });
    setIsLogged(true);
    setIsLoading(false);
  };

  // Función para manejar el cierre de sesión
  const handleLogout = async () => {
    try {
      // Realizar una solicitud HTTP para cerrar la sesión en el servidor
      const response = await axios.delete("/api/auth");

      // Si la respuesta es exitosa, el usuario se ha desconectado
      setIsLogged(false);
      setDataUser({
        id_usuario: "",
      });

      // Recargar la página
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  // Renderizar el componente de carga mientras se verifica la sesión
  if (isLoading) {
    return (
      <div className="h-[100vh]">
        <Loading />
      </div>
    );
  }

  // Proporcionar el contexto y las funciones de la sesión a los componentes hijos
  return (
    <SessionContext.Provider
      value={{ isLogged, dataUser, handleLogout, handleLogin }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
