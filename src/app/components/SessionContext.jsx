"use client";
import { createContext, useState, useEffect, Suspense } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loading from "./Loading";

export const SessionContext = createContext(null);

const SessionProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [dataUser, setDataUser] = useState({
    id_usuario: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    setIsLoading(true);
    const checkLogged = async () => {
      try {
        const response = await axios.get("/api/auth");
        if (response.status === 200) {
          console.log(response);
          setIsLogged(true);
          setDataUser({
            id_usuario: response.data.id_usuario,
          });
        } else {
          setIsLogged(false);
        }
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    checkLogged();
  }, []);
  const handleLogin = async () => {
    setIsLogged(true);
    router.push("/");
    router.refresh();
    const response = await axios.get("/api/auth");
    setDataUser({
      id_usuario: await response.data.id_usuario,
    });
  };
  const handleLogout = async () => {
    try {
      const response = await axios.delete("/api/auth");
      setIsLogged(false);
      setDataUser({
        id_usuario: "",
      });
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SessionContext.Provider
      value={{ isLogged, dataUser, handleLogout, handleLogin }}>
      {isLoading ? (
        <div className="h-[100vh]">
          <Loading />
        </div>
      ) : (
        <div>{children}</div>
      )}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
