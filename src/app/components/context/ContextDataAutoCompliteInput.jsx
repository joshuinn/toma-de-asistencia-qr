"use client";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AutoCompliteContext = createContext(null);

const AutoCompliteProvider = ({ children }) => {
  const [dataAutoComplite, setDataAutoComplite] = useState({
    ciclo: [],
    grupo: [],
    laboratorio: [],
    maestro: [],
    materia: [],
  });
  const [isUpdate, setIsUpdate] = useState(false);
  const handleUpdate = () => {
    setIsUpdate(!isUpdate);
  };
  useEffect(() => {
    const getdataAutoComplite = async () => {
      try {
        const { data } = await axios.get("/api/cataloguesList");
        setDataAutoComplite(data);
      } catch (error) {
        console.log(error);
      }
    };
    getdataAutoComplite();
  }, [isUpdate]);
  return (
    <AutoCompliteContext.Provider value={{ dataAutoComplite, handleUpdate }}>
      {children}
    </AutoCompliteContext.Provider>
  );
};

export default AutoCompliteProvider;
