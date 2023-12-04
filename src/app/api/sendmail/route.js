import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

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

    const info = await transporter.sendMail({
      from: '"Encargado" <dev@dev.com>',
      to: data[0],
      subject: "Invitación",
      text: "Un encargado te invitado a unirte: ",
      html: "<a href='http://localhost:3000/pages/signUp'>Irme a registrar</a>",
    });
    console.log(info);
    if(info.messageId){
        return NextResponse.json("ok");
    }
    return NextResponse.json({message:"No se ha podido enviar"},{status:400})
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "Some error" }, { status: 500 });
  }
}
