import "./globals.css";
import SessionProvider from "./components/context/SessionContext";
import SidebarProvider from "./components/context/SideBarResponsiveContext";
import Sidebar from "./components/Sidebar";


export const metadata = {
  title: "Sistema QR",
  description: "Sistema para tomar asistencia con QR",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={"bg-blue-700"}>
        <SessionProvider>
          <SidebarProvider>
            <Sidebar>
              {children}</Sidebar>
          </SidebarProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
