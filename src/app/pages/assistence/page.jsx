import React, { Suspense } from "react";
import ListGroup from "@/app/components/assistance/ListGroup";
import Header from "@/app/components/Header";
import Loading from "@/app/components/Loading";
import AutoCompliteProvider from "@/app/components/ContextDataAutoCompliteInput";

function page() {
  return (
    <Suspense fallback={<Loading />}>
      <AutoCompliteProvider>
        <div className="h-screen p-3 rounded-lg">
          <Header title="Toma de asistencia" />
          <ListGroup />
        </div>
      </AutoCompliteProvider>
    </Suspense>
  );
}

export default page;
