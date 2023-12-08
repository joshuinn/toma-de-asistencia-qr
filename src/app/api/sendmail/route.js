import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import jwt, { verify } from "jsonwebtoken";
import crypto from "crypto-js";

export async function POST(req) {
  const data = await req.json();
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "delmonteo.joshua@gmail.com",
        pass: "syof rgzg yoym rprz",
      },
    });
    /*
    transporter.verify().then(()=>{
        console.log("Ready");
    })*/
    const key = process.env.SECRET_KEY;

    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
        correo: data[0],
      },
      key
    );
    const info = await transporter.sendMail({
      from: '"Encargado" <dev@dev.com>',
      to: data[0],
      subject: "Invitación",
      text: "Un encargado te invitado a unirte: ",
      html: `<a href='http://localhost:3000/pages/signUp/${token}'>Irme a registrar</a>`,
    });
    if (info.messageId) {
      return NextResponse.json("ok");
    }
    
    return NextResponse.json(
      { message: "No se ha podido enviar" },
      { status: 400 }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "Some error" }, { status: 500 });
  }
}


