import { conn } from "@/lib/mysql";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const id_usuario = params.id;
    const result = await conn.query(
      "SELECT * FROM ctb_usuario WHERE id_usuario = " + id_usuario
    );
    if (result.length > 0) {
      return NextResponse.json(result[0]);
    }
    return NextResponse.json({ message: "No found" }, { status: 404 });
  } catch (error) {
    console.log(error);
  }
  return NextResponse.json({ message: "Error" }, { status: 500 });
}
