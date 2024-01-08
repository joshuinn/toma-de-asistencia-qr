import { conn } from "@/lib/mysql";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();
    let list = [];
    const joinLista =
    " JOIN `ctb_lista_asistencia` ON ttb_asistencia.id_lista_asistencia = ctb_lista_asistencia.id_lista_asistencia ";
    const joinMateria =
      " JOIN `ctb_materia` ON ctb_lista_asistencia.id_materia = ctb_materia.id_materia ";
    for (let i = 0; i < data.length; i++) {
      let queryResponse = await conn.query(
        "SELECT * FROM `ttb_asistencia` " +
        joinLista+
          joinMateria +
          " WHERE ttb_asistencia.id_lista_asistencia = ?",
        [data[i].id_lista_asistencia]
      );
      list[i] = queryResponse[0];
    }
    return NextResponse.json(list);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
