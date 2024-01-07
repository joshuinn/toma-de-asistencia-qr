import { conn } from "@/lib/mysql";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();
    let newData = [];
    const fecha_min = JSON.stringify(data.fecha_min);
    const fecha_max = JSON.stringify(data.fecha_max);

    const joinGrupo =
      " JOIN `ctb_grupo` ON ctb_lista_asistencia.id_grupo = ctb_grupo.id_grupo ";
    const joinCiclo =
      " JOIN `ctb_ciclo` ON ctb_lista_asistencia.id_ciclo = ctb_ciclo.id_ciclo ";
    const joinMestro =
      " JOIN `ctb_maestro` ON ctb_lista_asistencia.id_maestro = ctb_maestro.id_maestro ";
    const joinLista =
      " JOIN `ctb_lista_asistencia` ON ttb_asistencia.id_lista_asistencia = ctb_lista_asistencia.id_lista_asistencia ";
    const joinFecha = fecha_min + " AND " + fecha_max;
    newData = await conn.query(
      "SELECT * FROM `ttb_asistencia` " +
        joinLista +
        joinGrupo +
        joinMestro +
        joinCiclo +
        " WHERE `fecha_asistencia` BETWEEN" +
        joinFecha
    );
    return NextResponse.json(newData[0]);
  } catch (error) {
    console.log(error);
  }
  return NextResponse.json({ message: "Error" }, { status: 500 });
}
