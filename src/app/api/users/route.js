import { conn } from "@/lib/mysql";
import { NextResponse } from "next/server";
import crypto from "crypto-js";

export async function POST(req) {
  try {
    const data = await req.json();
    const key = process.env.SECRET_KEY;
    const hashed = crypto.AES.encrypt(data[0].contrasenia, key).toString();
    const result = await conn.query("INSERT INTO `ctb_usuario` SET ?", {
      nombre_usuario: data[0].nombre,
      correo: data[0].correo,
      boleta: data[0].boleta,
      contrasenia: hashed,
    });

    return NextResponse.json("ok");
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "Nop" }, { status: 500 });
  }
}
export async function PUT(req) {
  try {
    const data = await req.json();
    console.log("data: ",data);
    if (data.dataPass.contrasenia == data.dataPass.confirmarContrasenia) {
      const key = process.env.SECRET_KEY;
      const hashed = crypto.AES.encrypt(
        data.dataPass.contrasenia,
        key
      ).toString();
      const result = await conn.query(
        'UPDATE `ctb_usuario` SET `contrasenia`= "' +
          hashed +
          '" WHERE `id_usuario` = ' +
          data.id_usuario
      );
      if (result[0].affectedRows > 0) {
        return NextResponse.json({ isValid: true });
      }
    }
    return NextResponse.json({ isValid: false });
  } catch (error) {
    console.error(error);
  }
  return NextResponse.json({ status: 500 });
}
