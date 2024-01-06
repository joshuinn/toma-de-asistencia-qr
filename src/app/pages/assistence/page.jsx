import React, { Suspense } from "react";
import ListGroup from "@/app/components/assistance/ListGroup";
import Header from "@/app/components/Header";
import AutoCompliteProvider from "@/app/components/ContextDataAutoCompliteInput";

function page() {
  return (
    <div className="h-screen p-3 rounded-lg">
      <Header title="Toma de asistencia" />
      <AutoCompliteProvider>
        <ListGroup />
      </AutoCompliteProvider>
    </div>
  );
}

export default page;
