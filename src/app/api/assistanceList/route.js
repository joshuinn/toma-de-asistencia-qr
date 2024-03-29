import { getDateFormated } from "@/app/components/helpers/dateFormated";
import { conn } from "@/lib/mysql";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const data = await request.json();
    const id_usuario = data[1].id_usuario;
    const id_lista_asistencia = parseInt(data[2]);
    const lastList = await conn.query(
      "SELECT numero_lista FROM ttb_asistencia WHERE id_lista_asistencia =" +
        id_lista_asistencia +
        " ORDER BY numero_lista DESC LIMIT 1"
    );
    const date = getDateFormated();
    data[0].map(async (student) => {
      const id_alumno = await getIdStudent(student);
      await conn.query("INSERT INTO `ttb_asistencia` SET ?", {
        id_alumno: id_alumno,
        id_lista_asistencia: id_lista_asistencia,
        id_usuario: id_usuario,
        fecha_asistencia: date,
        numero_maquina: student.numero_maquina ?? 0,
        numero_lista: lastList[0][0] ? lastList[0][0].numero_lista + 1 : 1,
      });
    });
    //console.log(idStudent);
    return NextResponse.json("ok");
  } catch (error) {
    console.error(error);
  }
  return NextResponse.json({ status: 500 });
}

async function getIdStudent(student) {
  const res = await conn.query(
    "SELECT id_alumno, url_alumno FROM ctb_alumno WHERE boleta = " +
      student.boleta
  );
  if (student.url) {
    if (res[0][0]) {
      if (res[0][0].url_alumno == "pending...") {
        const update = await conn.query(
          "UPDATE ctb_alumno set url_alumno = '" +
            student.url +
            "', nombre_alumno = '" +
            student.nombre_alumno +
            "', apellido_alumno = '" +
            student.apellido_alumno +
            "' WHERE id_alumno = " +
            res[0][0].id_alumno
        );
      }
    }
  }
  if (res[0][0]) return res[0][0].id_alumno;

  const newStudent = await conn.query("INSERT INTO `ctb_alumno` SET ? ", {
    nombre_alumno: student.nombre_alumno,
    apellido_alumno: student.apellido_alumno,
    boleta: student.boleta,
    url_alumno: student.url ?? "pending...",
  });
  return getIdStudent(student);
}
