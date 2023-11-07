import Header from "@/app/components/Header";
import Loading from "@/app/components/Loading";
import ListStudent from "@/app/components/assistance/ListStudent";
import axios from "axios";
import React, { Suspense } from "react";

const loadGroup = async (groupId) => {
  try {
    const response = await axios.get("http://localhost:3000/api/groups/" + groupId);
    if (response.status == 404) {
      return { status: 404 };
    }
    return response.data;
  } catch (e) {
    return { status: 404 };
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
          <div className="flex gap-4 bg-white p-3 rounded-lg flex-wrap justify-between shadow-md">
            <div className="bg-gray-200 p-2 rounded-lg">
              <p className="">Ciclo:{data.ciclo} </p>
            </div>
            <div className="bg-gray-200 p-2 rounded-lg">
              <p className="">Grupo: {data.grupo} </p>
            </div>
            <div className="bg-gray-200 p-2 rounded-lg">
              <p className="">Profesor: {data.profesor} </p>
            </div>
            <div className="bg-gray-200 p-2 rounded-lg">
              <p className="">Numero de Laboratorio: {data.numero_lab} </p>
            </div>
            <div className="bg-gray-200 p-2 rounded-lg">
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
