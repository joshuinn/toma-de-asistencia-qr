import { NextResponse } from "next/server";
export default async function middleware(req) {
  try {
    const userToken = req.cookies.get("userToken");

    if (userToken == undefined) {
      return NextResponse.redirect(new URL("/pages/login", req.url));
    }
    return NextResponse.next();
  } catch (error) {
    console.log(error);
  }
  console.log("some Error middle");
  return NextResponse.redirect(new URL("/pages/login", req.url));
}

export const config = {
  matcher: [
    "/pages/dashboard",
    "/pages/assistence",
    "/pages/reports",
    "/pages/config",
    "/pages/graphs",
    "/pages/invite",
    "/pages/incident",
  ],
};
