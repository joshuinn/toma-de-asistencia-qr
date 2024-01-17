import { conn } from "@/lib/mysql";
import { NextResponse } from "next/server";

function cambiarFormatoFecha(fecha) {
  // Dividir la fecha en día, mes y año
  var partesFecha = fecha.split("/");

  // Obtener el día, mes y año
  var dia = partesFecha[0];
  var mes = partesFecha[1];
  var anio = partesFecha[2];

  // Reconstruir la fecha en el formato deseado
  var nuevaFecha = anio + "/" + mes + "/" + dia;

  return nuevaFecha;
}

export async function POST(req) {
  try {
    const data = await req.json();

    let newData = [];
    const joinGrupo =
      " JOIN `ctb_grupo` ON ctb_lista_asistencia.id_grupo = ctb_grupo.id_grupo ";
    const joinCiclo =
      " JOIN `ctb_ciclo` ON ctb_lista_asistencia.id_ciclo = ctb_ciclo.id_ciclo ";
    const joinMestro =
      " JOIN `ctb_maestro` ON ctb_lista_asistencia.id_maestro = ctb_maestro.id_maestro ";
    const joinLab =
      " JOIN `ctb_laboratorio` ON ctb_lista_asistencia.id_laboratorio = ctb_laboratorio.id_laboratorio ";
    const joinMateria =
      " JOIN `ctb_materia` ON ctb_lista_asistencia.id_materia = ctb_materia.id_materia ";
    const joinAlumno =
      " JOIN `ctb_alumno` ON ttb_asistencia.id_alumno = ctb_alumno.id_alumno ";
    const joinLista =
      " JOIN `ctb_lista_asistencia` ON ttb_asistencia.id_lista_asistencia = ctb_lista_asistencia.id_lista_asistencia ";
    let fecha_min = JSON.stringify(data.fecha_min);
    let fecha_max = JSON.stringify(data.fecha_max);
    fecha_min = cambiarFormatoFecha(fecha_min);
    fecha_max = cambiarFormatoFecha(fecha_max);
    if (fecha_min.length == 2 || fecha_max.length == 2) {
      fecha_min = fecha_min.length == 0 ? fecha_max : fecha_min;
      fecha_max = fecha_min;
    }
    const bodyQuery =
      "SELECT * FROM `ttb_asistencia` " +
      joinLista +
      joinAlumno +
      joinGrupo +
      joinMateria +
      joinLab +
      joinMestro +
      joinCiclo;
    const bodyWhere =
      fecha_min.length > 2 || fecha_max.length > 2
        ? " WHERE ttb_asistencia.fecha_asistencia BETWEEN " +
          fecha_min +
          " AND " +
          fecha_max +
          " AND ttb_asistencia.id_lista_asistencia = "
        : " WHERE ttb_asistencia.id_lista_asistencia =  ";
    for (let i = 0; i < data.list.length; i++) {
      let dataResponse = await conn.query(
        bodyQuery +
          bodyWhere +
          data.list[i].id_lista_asistencia +
          " ORDER BY 16 ASC"
      );
      newData[i] = dataResponse[0];
    }
    return NextResponse.json(newData);
  } catch (error) {
    console.error(error);
  }
  return NextResponse.json({ message: "Error" }, { status: 500 });
}
