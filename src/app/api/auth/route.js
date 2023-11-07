import { NextResponse } from "next/server";
import jwt, { verify } from "jsonwebtoken";

import crypto from "crypto-js";

/*
force insert
export async function POST(req){
  try{
    const key = process.env.SECRET_KEY
    const hashed =  crypto.AES.encrypt("123456789",key).toString()
    //const dec = crypto.AES.decrypt(hashed, key).toString(crypto.enc.Utf8)
    
    const result = await conn.query('INSERT INTO users SET ?',{
      name:"Jhon doe",
      email:"dev@dev.com",
      password: hashed,
      boleta: "123456789"
    })
    console.log(result);
   return NextResponse.json("ok")
  }catch(e){
    return NextResponse.json({message:"Nop"},{status:500})
  }
}

*/

export async function POST(req) {
  try {
    const data = await req.formData();
    const boleta = data.get("boleta");
    const password = data.get("password");
    if (req.cookies.get("userToken")) return NextResponse.json("ok");
    const result = await conn.query("SELECT * FROM users WHERE boleta= ?", [
      boleta,
    ]);
    if (result[0]) {
      const dbPass = crypto.AES.decrypt(
        result[0].password,
        process.env.SECRET_KEY
      ).toString(crypto.enc.Utf8);
      if (password === dbPass) {
        console.log("some");
        const token = jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60*60*24*30,
            boleta: boleta,
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
         const token = verify(userToken.value, process.env.SECRET_KEY)
         return NextResponse.json({ message: "Already logged", status: 200 });
      } catch (error) {
        return DELETE(req)
      }
    }
    return NextResponse.json({ message: "no logged" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Somthing goes bad" }, { status: 500 });
  }
}
