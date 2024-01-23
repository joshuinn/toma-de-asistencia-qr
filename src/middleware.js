import { NextResponse } from "next/server";

// Función de middleware asincrónica que se ejecutará antes de manejar la solicitud.
export default async function middleware(req) {
  try {
    // Obtener el token del usuario de las cookies.
    const userToken = req.cookies.get("userToken");

    // Verificar si el token del usuario está indefinido (no existe).
    if (userToken == undefined) {
      // Redirigir a la página de inicio de sesión si no hay token de usuario.
      return NextResponse.redirect(new URL("/pages/login", req.url));
    }

    // Si hay un token de usuario, permitir que la solicitud continúe.
    return NextResponse.next();
  } catch (error) {
    // Capturar cualquier error y registrarlo en la consola.
    console.log(error);
  }

  // En caso de error, redirigir a la página de inicio de sesión.
  console.log("some Error middle");
  return NextResponse.redirect(new URL("/pages/login", req.url));
}

// Configuración del middleware con rutas que deben ser protegidas.
export const config = {
  matcher: [
    "/pages/dashboard",
    "/pages/assistence",
    "/pages/reports",
    "/pages/config",
    "/pages/graphs",
    "/pages/invite",
  ],
};
