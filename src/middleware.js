import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
export default async function middleware(req) {
 try{

   const userToken = req.cookies.get("userToken");
   if (userToken == undefined) {
     return NextResponse.redirect(new URL("/pages/login", req.url));
    } 
    return NextResponse.next();
  }catch(error){
    return NextResponse.redirect(new URL("/pages/login", req.url));
  } 
}

export const config = {
  matcher:['/pages/dashboard', '/pages/assistence','/pages/reports']
};
