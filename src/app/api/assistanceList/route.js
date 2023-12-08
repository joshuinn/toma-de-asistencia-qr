import { conn } from "@/lib/mysql";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const data = await request.json();
    const id_usuario = data[1].id_usuario;
    const id_lista_asistencia = parseInt(data[2]);
    data[0].map(async (student) => {
      const id_alumno = await getIdStudent(student);
      await conn.query("INSERT INTO ttb_asistencia SET ?", {
        id_alumno: id_alumno,
        id_lista_asistencia: id_lista_asistencia,
        id_usuario: id_usuario,
        numero_maquina: student.numero_maquina ?? 0,
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
    "SELECT id_alumno FROM ctb_alumno WHERE boleta = " + student.boleta
  );
  if (res[0]) return res[0].id_alumno;

  const newStudent = await conn.query("INSERT INTO ctb_alumno SET ? ", {
    nombre_alumno: student.nombre_alumno,
    apellido_alumno: student.apellido_alumno,
    boleta: student.boleta,
  });
  getIdStudent(student);
  return undefined;
}
