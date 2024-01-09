"use client"
import React from "react";
import ListGroup from "@/app/components/assistance/ListGroup";
import Header from "@/app/components/Header";
function Assistance() {
  return (
    <div className="h-screen p-3 rounded-lg">
      <Header title="Toma de asistencia" />
        <ListGroup />
    </div>
  );
}

export default Assistance;
