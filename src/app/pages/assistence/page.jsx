import React, { Suspense } from "react";
import ListGroup from "@/app/components/assistance/ListGroup";
import Header from "@/app/components/Header";
import Loading from "@/app/components/Loading";

function page() {
  return (
    <Suspense fallback={<Loading />}>
      <div className="h-screen p-3 rounded-lg">
        <Header title="Toma de asistencia" />
        <ListGroup />
      </div>
    </Suspense>
  );
}

export default page;
