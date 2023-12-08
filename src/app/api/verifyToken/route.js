import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
export async function POST(req) {
  try {
    const data = await req.json();
    const key = process.env.SECRET_KEY;
    try {
      const dataToken = verify(data[0].token, key, (err, decode) => {
        if (err) {
          return false
        }else return decode
      });
      if (dataToken) {
        return NextResponse.json({ correo: dataToken.correo });
      }
    } catch (error) {
      console.log(error);
    }
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  } catch (error) {
    console.log("Some error: ", error); 
  }
  return NextResponse.json({ message: "Error" }, { status: 500 });
}
