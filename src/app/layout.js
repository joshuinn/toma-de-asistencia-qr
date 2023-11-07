import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import SessionProvider from "./components/SessionContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <SessionProvider>
          <Sidebar>{children}</Sidebar>
        </SessionProvider>
      </body>
    </html>
  );
}
