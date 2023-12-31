import { NextResponse } from "next/server";
import { conn } from "@/lib/mysql";
export async function POST(request) {
  try {
    const data = await request.json();
    let id_lista = {
      grupo: "",
      ciclo: "",
      maestro: "",
      materia: "",
      lab: "",
    };

    let resultGrupo = await conn.query(
      "SELECT * FROM `ctb_grupo` WHERE grupo = ?",
      [data.grupo]
    );
    if (resultGrupo[0].length > 0) {
      id_lista = {
        ...id_lista,
        grupo: resultGrupo[0][0].id_grupo,
      };
    } else {
      resultGrupo = await conn.query("INSERT INTO `ctb_grupo` SET grupo = ?", [
        data.grupo,
      ]);
      id_lista = {
        ...id_lista,
        grupo: resultGrupo[0].insertId,
      };
    }

    let resultCiclo = await conn.query(
      "SELECT * FROM `ctb_ciclo` WHERE ciclo = ?",
      [data.ciclo]
    );
    if (resultCiclo[0].length > 0) {
      id_lista = {
        ...id_lista,
        ciclo: resultCiclo[0][0].id_ciclo,
      };
    } else {
      resultCiclo = await conn.query("INSERT INTO ctb_ciclo SET ciclo = ?", [
        data.ciclo,
      ]);
      id_lista = {
        ...id_lista,
        ciclo: resultCiclo[0].insertId,
      };
    }
    let resultMaestro = await conn.query(
      "SELECT * FROM `ctb_maestro` WHERE maestro = ?",
      [data.maestro]
    );
    if (resultMaestro[0].length > 0) {
      id_lista = {
        ...id_lista,
        maestro: resultMaestro[0][0].id_maestro,
      };
    } else {
      resultMaestro = await conn.query(
        "INSERT INTO `ctb_maestro` SET maestro =?",
        [data.maestro]
      );
      id_lista = {
        ...id_lista,
        maestro: resultMaestro[0].insertId,
      };
    }
    let resultMateria = await conn.query(
      "SELECT * FROM `ctb_materia` WHERE materia = ?",
      [data.materia]
    );
    if (resultMateria[0].length > 0) {
      id_lista = {
        ...id_lista,
        materia: resultMateria[0][0].id_materia,
      };
    } else {
      resultMateria = await conn.query(
        "INSERT INTO `ctb_materia` SET materia =?",
        [data.materia]
      );
      id_lista = {
        ...id_lista,
        materia: resultMateria[0].insertId,
      };
    }
    let resultLab = await conn.query(
      "SELECT * FROM `ctb_laboratorio` WHERE laboratorio = ?",
      [data.laboratorio]
    );
    if (resultLab[0].length > 0) {
      id_lista = {
        ...id_lista,
        lab: resultLab[0][0].id_laboratorio,
      };
    } else {
      resultLab = await conn.query(
        "INSERT INTO `ctb_laboratorio` SET laboratorio =?",
        [data.laboratorio]
      );
      id_lista = {
        ...id_lista,
        lab: resultLab[0].insertId,
      };
    }
    const resultLista = await conn.query(
      "INSERT INTO `ctb_lista_asistencia` SET ?",
      {
        id_grupo: id_lista.grupo,
        id_materia: id_lista.materia,
        id_maestro: id_lista.maestro,
        id_ciclo: id_lista.ciclo,
        id_laboratorio: id_lista.lab,
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
      " JOIN `ctb_grupo` ON ctb_lista_asistencia.id_grupo = ctb_grupo.id_grupo ";
    const joinCiclo =
      " JOIN `ctb_ciclo` ON ctb_lista_asistencia.id_ciclo = ctb_ciclo.id_ciclo ";
    const joinMestro =
      " JOIN `ctb_maestro` ON ctb_lista_asistencia.id_maestro = ctb_maestro.id_maestro ";
    const joinMateria =
      " JOIN `ctb_materia` ON ctb_lista_asistencia.id_materia = ctb_materia.id_materia ";

    const data = await conn.query(
      "SELECT * FROM `ctb_lista_asistencia`  " +
        joinGrupo +
        joinCiclo +
        joinMestro +
        joinMateria +
        " ORDER BY id_lista_asistencia DESC"
    );
    return NextResponse.json(data[0]);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
