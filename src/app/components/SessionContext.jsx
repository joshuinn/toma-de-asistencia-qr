'use client'
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export const SessionContext = createContext(null);

const SessionProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const router = useRouter()
  useEffect(()=>{
    const checkLogged = async()=>{
      try {
        const response =  await axios.get("/api/auth");
        if(response.status === 200){
          setIsLogged(true)
        }else{
          setIsLogged(false)
        }
      } catch (error) {
          console.log(error);
      }
    }
    checkLogged()
  },[])
  const handleLogin = () =>{
    setIsLogged(true)
    router.push("/")
    router.refresh()
  }
  const handleLogout = async() =>{
    try {
      const response = await axios.delete("/api/auth")
      setIsLogged(false)
      router.refresh()
    } catch (error) {
      console.log(error);      
    }
  }
  return (
    <SessionContext.Provider value={{isLogged,handleLogout, handleLogin}}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
