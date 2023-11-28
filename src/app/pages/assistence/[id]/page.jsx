import Header from "@/app/components/Header";
import Loading from "@/app/components/Loading";
import ListStudent from "@/app/components/assistance/ListStudent";
import axios from "axios";
import React, { Suspense } from "react";

const loadGroup = async (listaId) => {
  try {
    const response = await axios.get("http://localhost:3000/api/groups/" + listaId);
    if (response.status == 404) {
      return { status: 404 };
    }
    return response.data;
  } catch (e) {
    console.log(e);
    return { status: 500 };
  }
};

async function ListAssistance({ params }) {
  const data = await loadGroup(params.id);
  if (data.status == 404) {
    return <div>404</div>;
  }
  return (
    <>
      <Header title="Lista de asistencia" />
      <Suspense fallback={<Loading />}>
        <div className="flex flex-col gap-3">
          <div className="flex gap-4 p-2 rounded-lg flex-wrap justify-between text-white">
            <div className="bg-blue-600 p-3 shadow-lg rounded-lg">
              <p className="">Ciclo:{data.ciclo} </p>
            </div>
            <div className="bg-blue-600 p-3 shadow-lg rounded-lg">
              <p className="">Grupo: {data.grupo} </p>
            </div>
            <div className="bg-blue-600 p-3 shadow-lg rounded-lg">
              <p className="">Profesor: {data.maestro} </p>
            </div>
            <div className="bg-blue-600 p-3 shadow-lg rounded-lg">
              <p className="">Numero de Laboratorio: {data.laboratorio} </p>
            </div>
            <div className="bg-blue-600 p-3 shadow-lg rounded-lg">
              <p className="">Materia: {data.materia} </p>
            </div>
          </div>
          <div>
            <ListStudent id_grupo={params.id} />
          </div>
        </div>
      </Suspense>
    </>
  );
}

export default ListAssistance;
