import { conn } from "@/lib/mysql";
import { NextResponse } from "next/server";
import crypto from "crypto-js";

export async function POST(req) {
  try {
    const key = process.env.SECRET_KEY;
    const hashed = crypto.AES.encrypt("123456789", key).toString();
    //const dec = crypto.AES.decrypt(hashed, key).toString(crypto.enc.Utf8)

    const result = await conn.query("INSERT INTO users SET ?", {
      name: "Jhon doe",
      email: "dev@dev.com",
      password: hashed,
      boleta: "123456789",
    });
    console.log(result);
    return NextResponse.json("ok");
  } catch (e) {
    return NextResponse.json({ message: "Nop" }, { status: 500 });
  }
}
export async function PUT(req) {
  try {
    const data = await req.json();
    if (data[0].dataPass.contrasenia == data[0].dataPass.confirmarContrasenia) {
      const key = process.env.SECRET_KEY;
      const hashed = crypto.AES.encrypt(
        data[0].dataPass.contrasenia,
        key
      ).toString();
      const result = await conn.query(
        'UPDATE ctb_usuario SET contrasenia= "' +
          hashed +
          '" WHERE id_usuario = ' +
          1
      );
      if (result.affectedRows > 0) {
        return NextResponse.json({ isValid: true });
      }
    }
    return NextResponse.json({ isValid: false });
  } catch (error) {
    console.log(error);
  }
  return NextResponse.json({ status: 500 });
}
