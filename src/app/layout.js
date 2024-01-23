// Importar estilos globales.
import "./globals.css";

// Importar el componente SessionProvider para gestionar el contexto de la sesión.
import SessionProvider from "./components/context/SessionContext";

// Importar el componente SidebarProvider para gestionar el contexto de la barra lateral responsive.
import SidebarProvider from "./components/context/SideBarResponsiveContext";

// Importar el componente Sidebar que se utilizará para mostrar la barra lateral.
import Sidebar from "./components/Sidebar";

// Metadatos para la página.
export const metadata = {
  title: "Sistema QR",
  description: "Sistema para tomar asistencia con QR",
};

// Componente funcional RootLayout que sirve como diseño base para la aplicación.
export default function RootLayout({ children }) {
  return (
    // Estructura básica del HTML con el idioma establecido como español.
    <html lang="es">
      {/* Cuerpo de la aplicación con un fondo azul. */}
      <body className={"bg-blue-700"}>
        {/* Proveedor de contexto para la sesión del usuario. */}
        <SessionProvider>
          {/* Proveedor de contexto para la barra lateral responsive. */}
          <SidebarProvider>
            {/* Componente de la barra lateral que envuelve el contenido principal de la página. */}
            <Sidebar>{children}</Sidebar>
          </SidebarProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
