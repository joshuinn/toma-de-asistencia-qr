import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { conn } from "@/lib/mysql";

export async function POST(req) {
  const data = await req.json();
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "delmonteo.joshua@gmail.com",
        pass: process.env.EMAIL_PASSWORD,
      },  
    });
    /*
    transporter.verify().then(()=>{
        console.log("Ready");
    })*/
    const key = process.env.SECRET_KEY;

    if (data.type == "forgotPassword") {
      const res = await conn.query(
        "SELECT `id_usuario`, correo FROM `ctb_usuario` WHERE `boleta` = ?",
        [data.boleta]
      );
      if (res[0].length > 0) {
        const token = jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
            id_usuario: res[0][0].id_usuario,
          },
          key
        );
        const info = await transporter.sendMail({
          from: '"Sistema_qr" <dev@dev.com>',
          to: res[0][0].correo,
          subject: "Recuperar cuenta",
          text: "Recuperación de la cuenta.",
          html: `<a href='http://localhost:3000/pages/forgotPassword/${token}'>Cambiar contraseña</a>`,
        });
        if (info.messageId) {
          return NextResponse.json("ok");
        }
      } else {
        return NextResponse.json("ok");
      }
    }
    if (data.type == "invite") {
      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
          correo: data.email,
        },
        key
      );
      const info = await transporter.sendMail({
        from: '"Encargado" <dev@dev.com>',
        to: data.email,
        subject: "Invitación",
        text: "Un encargado te invitado a unirte: ",
        html: `<a href='http://localhost:3000/pages/signUp/${token}'>Irme a registrar</a>`,
      });
      if (info.messageId) {
        return NextResponse.json("ok");
      }
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
