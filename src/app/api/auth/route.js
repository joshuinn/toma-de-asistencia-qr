import { NextResponse } from "next/server";
import jwt, { verify } from "jsonwebtoken";

import crypto from "crypto-js";
import { conn } from "@/lib/mysql";


export async function POST(req) {
  try {
    if (req.cookies.get("userToken")) return NextResponse.json("ok");

    const { boleta, contrasenia } = await req.json();
    const result = await conn.query(
      "SELECT * FROM ctb_usuario WHERE boleta= ?",
      [boleta]
    );
    if (result[0]) {
      const dbPass = crypto.AES.decrypt(
        result[0].contrasenia,
        process.env.SECRET_KEY
      ).toString(crypto.enc.Utf8);
      if (contrasenia === dbPass) {
        const token = jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
            boleta: boleta,
            id_usuario: result[0].id_usuario,
          },
          process.env.SECRET_KEY
        );
        const response = NextResponse.redirect(req.url);
        response.cookies.set("userToken", token);
        return response;
      }
    }
    return NextResponse.json({ message: "unAuth" }, { status: 401 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(req) {
  try {
    if (req.cookies.get("userToken")) {
      const response = NextResponse.redirect(req.url);
      response.cookies.delete("userToken");
      return response;
    }
    return NextResponse.json("ok");
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Some goes wrong" }, { status: 500 });
  }
}
export async function GET(req) {
  try {
    const userToken = req.cookies.get("userToken");
    if (userToken) {
      try {
        const token = verify(userToken.value, process.env.SECRET_KEY);
        return NextResponse.json(token);
      } catch (error) {
        return DELETE(req);
      }
    }
    return NextResponse.json({ message: "no logged" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Somthing goes bad" }, { status: 500 });
  }
}

