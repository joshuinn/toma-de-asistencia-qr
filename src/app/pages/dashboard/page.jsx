import Header from "@/app/components/Header";
import Link from "next/link";
import styles from "@/app/components/dashboard.module.css";
function Dashboard() {
  return (
    <div className="h-screen ]">
      <Header title="Welcome back! 👋" extra="Pero que día!" />
      <div className="flex justify-center m-4">
        <h1 className="font-bold text-2xl text-white ">
          ¿A dónde iras hoy? 🤔
        </h1>
      </div>
      <div className="flex flex-col md:grid md:grid-cols-2 items-center justify-center p-10 gap-4 h-[90vh]">
        <Link href="/pages/assistence" className={"group "+styles.card}>
          <div className={styles.background1}></div>
          <div className="w-full h-full bg-blue-600 flex justify-center items-center text-white group-hover:text-purple transition-all sm:text-xl font-extrabold">
            <h2 className="z-10">Tomar asistencia</h2>
          </div>
        </Link>
        <Link href="/pages/reports" className={"group "+styles.card}>
        <div className={styles.background2}></div>
          <div className="w-full h-full bg-blue-600 flex justify-center items-center text-white group-hover:text-blue transition-all sm:text-xl font-extrabold">
            <h2>Reportes</h2>
          </div>
        </Link>
        <Link href="/pages/incident" className={"group "+styles.card}>
        <div className={styles.background3}></div>

          <div className="w-full h-full bg-blue-600 flex justify-center items-center text-white group-hover:text-yellow transition-all sm:text-xl font-extrabold">
            <h2>Incidencia</h2>
          </div>
        </Link>
        <Link href="/pages/graphs" className={"group "+styles.card}>
        <div className={styles.background5}></div>
          <div className="w-full h-full bg-blue-600 flex justify-center items-center text-white group-hover:text-green transition-all sm:text-xl font-extrabold">
            <h2>Gráficas</h2>
          </div>
        </Link>
        <Link href="/pages/invite" className={"group "+styles.card}>
        <div className={styles.background4}></div>
          <div className="w-full h-full bg-blue-600 flex justify-center items-center text-white group-hover:text-purple transition-all sm:text-xl font-extrabold">
            <h2>Invitar</h2>
          </div>
        </Link>
        <Link href="/pages/config" className={"group "+styles.card}>
        <div className={styles.background6}></div>
          <div className="w-full h-full bg-blue-600 flex justify-center items-center text-white group-hover:text-pink transition-all sm:text-xl font-extrabold">
            <h2>Cuenta</h2>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
