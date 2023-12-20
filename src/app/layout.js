import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import SessionProvider from "./components/SessionContext";
import SidebarProvider from "./components/SideBarResponsiveContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sistema QR",
  description: "Sistema para tomar asistencia con QR",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className + " bg-blue-700"}>
        <SessionProvider>
          <SidebarProvider>
            <Sidebar>{children}</Sidebar>
          </SidebarProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
