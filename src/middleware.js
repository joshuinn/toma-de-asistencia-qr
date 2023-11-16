import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
export default async function middleware(req) {
  /*if (
    (req.nextUrl.pathname.includes("/page") || req.nextUrl.pathname.includes("/layout.js") ) &&
    !req.nextUrl.pathname.includes("login")
  ) {*/
  const userToken = req.cookies.get("userToken");
  if (userToken == undefined) {
    return NextResponse.redirect(new URL("/pages/login", req.url));
  }
  //}
  return NextResponse.next();
}

export const config = {
  matcher:['/pages/dashboard', '/pages/assistence','/pages/reports']
};
