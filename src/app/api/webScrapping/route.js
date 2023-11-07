import { NextResponse } from "next/server";
import puppeteer from "puppeteer";
import { conn } from "@/lib/mysql";

export async function POST(request) {
  const data = await request.json();
  const result = serchData(data.url);
  if(result.name && result.boleta){
    const responsedb = await conn.query('SELECT * FROM students WHERE ? ',{
        id_grupo:data.id_grupo,
        boleta:result.boleta
    })
    if(responsedb.length ==0){
        const res = await conn.query('INSERT INTO students SET ?',{
            id_grupo: data.id_grupo,
            name:result.name,
            boleta:result.boleta,
            maquina:data.maquina
        })
    }
    return NextResponse.json("ok");
  }else{
    return NextResponse.json({message:"No found information"},{status:404})
  }
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
    if(result){
        return result;
    }
  } catch (e) {
    return {error:"Error"}
  }
}
