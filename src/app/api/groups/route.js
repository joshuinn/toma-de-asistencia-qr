import { NextResponse } from "next/server";
import { conn } from "@/lib/mysql";
export async function POST(request) {
  try {
    const data = await request.json();

    const result = await conn.query("INSERT INTO groups SET ?", {
      grupo: data.grupo,
      ciclo: data.ciclo,
      profesor: data.profesor,
      numero_lab: data.lab,
      materia: data.materia,
    });
    if (result.affectedRows > 0) {
      return NextResponse.json({ status: 200 });
    }
    return NextResponse.json({ message: "error" }, { status: 500 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}


export async function GET(request){
    try {
        const data = await conn.query('SELECT * FROM groups')
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({ message: "error" }, { status: 500 });
    }
}