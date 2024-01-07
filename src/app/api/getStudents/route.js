import { conn } from "@/lib/mysql";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();
    let list = [];
    for (let i = 0; i < data.length; i++) {
      let queryResponse = await conn.query(
        "SELECT id_alumno,id_lista_asistencia, id_asistencia FROM `ttb_asistencia` WHERE `id_lista_asistencia` = ?",
        [data[i].id_lista_asistencia]
      );
      list[i] = queryResponse[0] 
    }
    return NextResponse.json(list);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
