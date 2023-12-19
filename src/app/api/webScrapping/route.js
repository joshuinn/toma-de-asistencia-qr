import { NextResponse } from "next/server";
import puppeteer from "puppeteer";
import { conn } from "@/lib/mysql";

export async function POST(request) {
  const data = await request.json();
  const result = await serchData(data.url);
  if (result.name && result.boleta) {
    const nombre = getFormatedName(result.name);
    return NextResponse.json({ nombre: nombre, boleta: result.boleta });
  } else {
    return NextResponse.json(
      { message: "No found information" },
      { status: 404 }
    );
  }
}
function getFormatedName(name) {
  let splitName = name.split(" ");
  let imax = splitName.length - 1;
  let lastName = [];
  lastName[1] = splitName[imax - 1];
  lastName[2] = splitName[imax];
  let nombre = "";

  console.log(lastName);

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
  console.log("last: " + lastName);
  return { apellido: lastName[1] + " " + lastName[2], nombre: nombre };
}
async function serchData(url) {
  try {
    const browser = await puppeteer.launch({
      headless: "new",
    });
    const page = await browser.newPage();
    await page.goto(url);
    const result = await page.evaluate(() => {
      const name = document.querySelector('div[class="nombre"]').innerText;
      const boleta = document.querySelector('div[class="boleta"]').innerText;
      return { name, boleta };
    });
    await browser.close();
    if (result) {
      return result;
    }
  } catch (e) {
    console.log(e);
    return { error: "error" };
  }
}
