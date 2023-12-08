import Header from "@/app/components/Header";
import Link from "next/link";
import styles from "./dashboard.module.css";
import { Suspense } from "react";
import Loading from "@/app/components/Loading";
function page() {
  return (
    <Suspense fallback={<Loading />}>
      <div className="h-screen ]">
        <Header title="Welcome back! 👋" extra="Pero que día!" />
        <div className="flex justify-center m-4">
          <h1 className="font-bold text-2xl text-white ">
            ¿A dónde iras hoy? 🤔
          </h1>
        </div>
        <div className="flex flex-col md:grid md:grid-cols-2 items-center justify-center p-10 gap-4 h-[90vh]">
          <Link href="/pages/assistence" className={styles.card}>
            <div className="w-full h-full bg-blue-600 flex justify-center items-center text-white hover:text-purple transition-all">
              <h2>Tomar asistencia</h2>
            </div>
          </Link>
          <Link href="/pages/reports" className={styles.card}>
            <div className="w-full h-full bg-blue-600 flex justify-center items-center text-white hover:text-blue transition-all">
              <h2>Reportes</h2>
            </div>
          </Link>
          <Link href="/pages/incident" className={styles.card}>
            <div className="w-full h-full bg-blue-600 flex justify-center items-center text-white hover:text-yellow transition-all">
              <h2>Incidencia</h2>
            </div>
          </Link>
          <Link href="/pages/graphs" className={styles.card}>
            <div className="w-full h-full bg-blue-600 flex justify-center items-center text-white hover:text-green transition-all">
              <h2>Gráficas</h2>
            </div>
          </Link>
          <Link href="/pages/invite" className={styles.card}>
            <div className="w-full h-full bg-blue-600 flex justify-center items-center text-white hover:text-purple transition-all">
              <h2>Invitar</h2>
            </div>
          </Link>
          <Link href="/pages/config" className={styles.card}>
            <div className="w-full h-full bg-blue-600 flex justify-center items-center text-white hover:text-pink transition-all">
              <h2>Cuenta</h2>
            </div>
          </Link>
        </div>
      </div>
    </Suspense>
  );
}

export default page;
