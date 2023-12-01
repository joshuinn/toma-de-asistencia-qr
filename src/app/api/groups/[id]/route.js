import { NextResponse } from "next/server";
import { conn } from "@/lib/mysql";

export async function GET(request, { params }) {
  try {
    const joinGrupo =
      " JOIN ctb_grupo ON ctb_lista_asistencia.id_grupo = ctb_grupo.id_grupo ";
    const joinCiclo =
      " JOIN ctb_ciclo ON ctb_lista_asistencia.id_ciclo = ctb_ciclo.id_ciclo ";
    const joinMestro =
      " JOIN ctb_maestro ON ctb_lista_asistencia.id_maestro = ctb_maestro.id_maestro ";
    const joinLab =
      " JOIN ctb_laboratorio ON ctb_lista_asistencia.id_laboratorio = ctb_laboratorio.id_laboratorio ";
      const joinMateria =
      " JOIN ctb_materia ON ctb_lista_asistencia.id_materia = ctb_materia.id_materia ";
    
    const result = await conn.query(
      "SELECT * FROM ctb_lista_asistencia" +
        joinGrupo +
        joinCiclo +
        joinMestro +
        joinLab+
        joinMateria+
        "WHERE id_lista_asistencia = " +
        params.id
    );
    //console.log(result);
    if (result.length === 0) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }
    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
