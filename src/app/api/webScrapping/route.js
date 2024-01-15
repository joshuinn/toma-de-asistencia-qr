import { NextResponse } from "next/server";
//import puppeteer from "puppeteer";
import { conn } from "@/lib/mysql";
import { JSDOM } from "jsdom";
export async function POST(request) {
  try {
    const data = await request.json();
    let result = {};
    result = await getStudent(data.student.url, data.id_lista_asistencia);
    if (!result) {
      result = await serchData(data.student.url)
        .then((data) => data)
        .catch((e) => {
          console.error(e);
          return e;
        });
    }
    if (result.name && result.boleta) {
      let nombre;
      let numero_maquina = "00";
      if (!result.numero_maquina) {
        nombre = getFormatedName(result.name);
        numero_maquina = await getLastNumberStudent(
          result.boleta,
          data.id_lista_asistencia
        );
      } else {
        nombre = result.name;
        numero_maquina = result.numero_maquina;
      }
      return NextResponse.json({
        nombre: nombre,
        boleta: result.boleta,
        numero_maquina: numero_maquina,
      });
    } else {
      return NextResponse.json(
        { message: "No found information" },
        { status: 404 }
      );
    }
  } catch (e) {
    console.error(e);
  }
  return NextResponse.json({ message: "error", status: 500 });
}
async function getStudent(url_student, id_lista_asistencia) {
  try {
    const response = await conn.query(
      "SELECT * FROM ttb_asistencia JOIN ctb_alumno ON ctb_alumno.url_alumno = '" +
        url_student +
        "' WHERE id_lista_asistencia = " +
        id_lista_asistencia +
        " AND ttb_asistencia.id_alumno = ctb_alumno.id_alumno ORDER BY id_asistencia DESC LIMIT 1"
    );
    if (response[0].length > 0) {
      return {
        name: {
          nombre: response[0][0].nombre_alumno,
          apellido: response[0][0].apellido_alumno,
        },
        boleta: response[0][0].boleta,
        numero_maquina: response[0][0].numero_maquina,
      };
    }
  } catch (error) {
    console.error(error);
  }
  return false;
}
function getFormatedName(name) {
  let splitName = name.split(" ");
  let imax = splitName.length - 1;
  let lastName = [];
  lastName[1] = splitName[imax - 1];
  lastName[2] = splitName[imax];
  let nombre = "";
  if (splitName[imax - 2].length < 4) {
    lastName[0] = splitName[imax - 2];
    for (let i = 0; i <= imax - 3; i++) {
      nombre += splitName[i] + " ";
    }
    return {
      apellido: lastName[0] + " " + lastName[1] + " " + lastName[2],
      nombre: nombre,
    };
  }
  for (let i = 0; i <= imax - 2; i++) {
    nombre += splitName[i] + " ";
  }
  return { apellido: lastName[1] + " " + lastName[2], nombre: nombre };
}
async function getLastNumberStudent(boleta, id_lista_asistencia) {
  try {
    const response = await conn.query(
      "SELECT * FROM ttb_asistencia JOIN ctb_alumno ON ctb_alumno.boleta = " +
        boleta +
        " WHERE id_lista_asistencia = " +
        id_lista_asistencia +
        " AND ttb_asistencia.id_alumno = ctb_alumno.id_alumno ORDER BY id_asistencia DESC LIMIT 1"
    );
    if (response[0].length > 0) {
      return response[0][0].numero_maquina;
    }
  } catch (error) {
    console.error(error);
  }
  return "0";
}

async function serchData(url) {
  try {
    let response = {};
    try {
      response = await fetch(url)
        .then((data) => data)
        .catch((e) => {
          console.log(e);
          return { status: 404 };
        });
    } catch (error) {
      console.error(error);
    }
    if (response.status == 404) {
      return {};
    }
    const html = await response.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;

    const name =
      document.querySelector('div[class="nombre"]')?.textContent ?? "";
    const boleta =
      document.querySelector('div[class="boleta"]')?.textContent ?? "";
    return { name, boleta };
  } catch (error) {
    console.error("searchData", error);
  }
}

/*
async function serchData(url) {
  let options = {};
  //headless = "new"
  try {
    const browser = await puppeteer.launch({ headless: "new"});
    const page = await browser.newPage();
    await page.goto(url);
    const result = await page.evaluate(() => {
        const nameInput = document.querySelector('div[class="nombre"]');
        const boletaInput = document.querySelector('div[class="boleta"]');
        let name = false;
        let boleta = false;
        if (nameInput) {
          name = nameInput.innerText;
        }
        if (boletaInput) {
          boleta = boletaInput.innerText;
        }
        console.log(nameInput, boletaInput);
        return { name, boleta };
      })/*
      .then((e) => e)
      .catch((e) => {
        console.error(e);
        return { status: 500 };
      });
    console.log(result);
    await browser.close();
    if (!result.status == 500) {
      return result;
    }
    return result.status;
  } catch (e) {
    console.log(e);
    return { error: "error" };
  }
}
*/
