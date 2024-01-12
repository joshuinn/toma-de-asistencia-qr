import Header from "@/app/components/Header";
import Loading from "@/app/components/Loading";
import HeadersList from "@/app/components/assistance/HeadersList";
//import ListStudent from "@/app/components/assistance/ListStudent";
import axios from "axios";
import dynamic from "next/dynamic";
import React, { Suspense } from "react";


const ListStudent = dynamic(
  () => import("@/app/components/assistance/ListStudent"),
  { loading: () => <Loading /> }
);

async function ListAssistance({ params }) {

  return (
    <>
      <Header title="Lista de asistencia" />
      <Suspense
        fallback={
          <div className="h-[80vh]">
            <Loading />
          </div>
        }
      >
        <div className="flex flex-col gap-3">
          <HeadersList id={params.id} />
          <div>
            <ListStudent id_lista_asistencia={params.id} />
          </div>
        </div>
      </Suspense>
    </>
  );
}

export default ListAssistance;
