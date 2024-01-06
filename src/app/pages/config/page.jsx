"use client";
import Header from "@/app/components/Header";
import ChangePass from "@/app/components/ChangePass";
import { Suspense, useContext, useEffect, useState } from "react";
import axios from "axios";
import { SessionContext } from "@/app/components/SessionContext";
import Loading from "@/app/components/Loading";
import InputStyled from "@/app/components/styled/InputStyled";

function page() {
  const [dataUser, setDataUser] = useState({
    nombre: "",
    boleta: "",
    correo: "",
  });
  const userctx = useContext(SessionContext);
  useEffect(() => {
    const getDatauser = async () => {
      try {
        const response = await axios.get(
          "/api/users/" + userctx.dataUser.id_usuario
        );
        setDataUser({
          nombre: response.data.nombre_usuario,
          correo: response.data.correo,
          boleta: response.data.boleta,
        });
      } catch (error) {
        console.log(error);
      }
    };

    getDatauser();
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <Header title="Mi cuenta" />
      <div className="text-white flex flex-col justify-center items-center gap-4">
        <div className="flex gap-3 bg-blue-600 rounded-lg p-3 items-center w-1/2 justify-center shadow-lg">
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
        <div className="flex gap-3 bg-blue-600 rounded-lg p-3 items-center w-1/2 justify-center shadow-lg">
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
        <div className="flex gap-3 bg-blue-600 rounded-lg p-3 items-center w-1/2 justify-center shadow-lg">
          <label htmlFor="correo">Correo</label>
          <InputStyled
            type="text"
            placeholder="Correo"
            id="correo"
            value={dataUser.correo}
            disabled
            className= "text-gray-300 bg-opacity-50"
          />
        </div>
        <ChangePass />
      </div>
    </Suspense>
  );
}

export default page;
