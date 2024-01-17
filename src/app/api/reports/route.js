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
  var nuevaFecha = anio + "-" + mes + "-" + dia;

  return nuevaFecha;
}
export async function POST(req) {
  try {
    const data = await req.json();
    let newData = [];
    let fecha_min = data.fecha_min;
    let fecha_max = data.fecha_max;
    /*
    fecha_min = cambiarFormatoFecha(fecha_min);
    fecha_max = cambiarFormatoFecha(fecha_max);
    */
    /*if (fecha_min.length == 2 || fecha_max.length == 2) {
      fecha_min = fecha_min.length == 0 ? fecha_max : fecha_min;
      fecha_max = fecha_min;
    }
    */
    const joinGrupo =
      " JOIN `ctb_grupo` ON ctb_lista_asistencia.id_grupo = ctb_grupo.id_grupo ";
    const joinCiclo =
      " JOIN `ctb_ciclo` ON ctb_lista_asistencia.id_ciclo = ctb_ciclo.id_ciclo ";
    const joinMestro =
      " JOIN `ctb_maestro` ON ctb_lista_asistencia.id_maestro = ctb_maestro.id_maestro ";
    const joinMateria =
      " JOIN `ctb_materia` ON ctb_lista_asistencia.id_materia = ctb_materia.id_materia ";

    const joinLista =
      " JOIN `ctb_lista_asistencia` ON ttb_asistencia.id_lista_asistencia = ctb_lista_asistencia.id_lista_asistencia ";
    const joinFecha = fecha_min + " AND " + fecha_max;
    newData = await conn.query(
      "SELECT * FROM `ttb_asistencia` " +
        joinLista +
        joinGrupo +
        joinMestro +
        joinCiclo +
        joinMateria +
        " WHERE `fecha_asistencia` BETWEEN " +
        joinFecha
    );
    return NextResponse.json(newData[0]);
  } catch (error) {
    console.log(error);
  }
  return NextResponse.json({ message: "Error" }, { status: 500 });
}
