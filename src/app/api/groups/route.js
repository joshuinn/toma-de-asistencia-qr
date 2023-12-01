import { NextResponse } from "next/server";
import { conn } from "@/lib/mysql";
export async function POST(request) {
  try {
    const data = await request.json();

    const resultCiclo = await conn.query(
      "INSERT INTO ctb_ciclo SET ciclo = ?",
      [data.ciclo]
    );

    const resultGrupo = await conn.query(
      "INSERT INTO ctb_grupo SET grupo = ?",
      [data.grupo]
    );
    const resultMaestro = await conn.query(
      "INSERT INTO ctb_maestro SET maestro =?",
      [data.maestro]
    );
    const resultMateria = await conn.query(
      "INSERT INTO ctb_materia SET materia =?",
      [data.materia]
    );
    const resultLab = await conn.query(
      "INSERT INTO ctb_laboratorio SET laboratorio =?",
      [data.laboratorio]
    );
    const resultLista = await conn.query(
      "INSERT INTO ctb_lista_asistencia SET ?",
      {
        id_grupo: resultGrupo.insertId,
        id_materia: resultMateria.insertId,
        id_maestro: resultMaestro.insertId,
        id_ciclo: resultCiclo.insertId,
        id_laboratorio: resultLab.insertId,
      }
    );
    //console.log(resultLista);
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const joinGrupo =
      " JOIN ctb_grupo ON ctb_lista_asistencia.id_grupo = ctb_grupo.id_grupo ";
    const joinCiclo =
      " JOIN ctb_ciclo ON ctb_lista_asistencia.id_ciclo = ctb_ciclo.id_ciclo ";
    const joinMestro =
      " JOIN ctb_maestro ON ctb_lista_asistencia.id_maestro = ctb_maestro.id_maestro ";
    const data = await conn.query("SELECT * FROM ctb_lista_asistencia" +joinGrupo+joinCiclo+joinMestro);
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
