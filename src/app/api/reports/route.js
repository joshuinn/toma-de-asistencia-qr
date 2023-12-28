import { conn } from "@/lib/mysql";
import { NextResponse } from "next/server";


export async function POST(req) {
  try {
    const data = await req.json();
    let newData = [];
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
    const joinAlumno =
      " JOIN ctb_alumno ON ttb_asistencia.id_alumno = ctb_alumno.id_alumno ";
    const joinLista =
      " JOIN ctb_lista_asistencia ON ttb_asistencia.id_lista_asistencia = ctb_lista_asistencia.id_lista_asistencia ";
      const joinFecha = " JOIN ttb_asistencia "
      for (let i = 0; i < data.length; i++) {
      newData[i] = await conn.query(
        "SELECT * FROM ttb_asistencia " +
          joinLista +
          joinAlumno +
          joinGrupo +
          joinMateria +
          joinLab +
          joinMestro +
          joinCiclo +
          " WHERE ttb_asistencia.id_lista_asistencia = " +
          data[i].id_lista_asistencia
      );
    }
    return NextResponse.json(newData);
  } catch (error) {
    console.log(error);
  }
  return NextResponse.json({ message: "Error" }, { status: 500 });
}
