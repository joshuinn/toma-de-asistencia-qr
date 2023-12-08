"use client";
import Link from "next/link";
import React, {
  Suspense,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  BiSolidDashboard,
  BiLogOut,
  BiListUl,
  BiListPlus,
} from "react-icons/bi";
import { IoMdClose, IoMdPersonAdd } from "react-icons/io";
import { AiFillWarning } from "react-icons/ai";
import { BsFileEarmarkBarGraph, BsFillGearFill } from "react-icons/bs";
import { SessionContext } from "./SessionContext";
import { Toaster } from "sonner";
import Loading from "./Loading";
import { usePathname } from "next/navigation";
import { SidebarContext } from "./SideBarResponsiveContext";

function Sidebar({ children }) {
  const [page, setPage] = useState("dashboard");
  const { isLogged, handleLogout } = useContext(SessionContext);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const indicatorRef = useRef();
  const topPagesRef = useRef();
  const { isShow, handleShow } = useContext(SidebarContext);
  const pages = [
    "dashboard",
    "assistence",
    "reports",
    "incident",
    "graphs",
    "invite",
    "config",
  ];
  const handleIndicator = async () => {
    const indicator = indicatorRef.current;
    const topIndicatorY = await topPagesRef.current.getBoundingClientRect().y;
    const ipage = pages.findIndex((item) => item == page);
    indicator.style.transform = `translateY(${topIndicatorY + ipage * 47}px)`;
  };
  useEffect(() => {
    if (isLogged) {
      handleIndicator();
    }
  }, [page, isLogged]);
  useEffect(() => {
    setIsLoading(true);
    if (isLogged) {
      const actualPage = pathname.split("/");
      setPage(actualPage[2]);
    }
    setIsLoading(false);
  }, [pathname]);

  return (
    <>
      <Suspense fallback={<Loading />}>
        {!isLogged ? (
          <div>{children}</div>
        ) : (
          <div className="flex bg-blue-700">
            <div
              className={`flex bg-blue-800 z-10 h-screen w-full p-3 flex-col  
              transition-opacity delay-75 fixed
              ${
                isShow
                  ? "absolute translate-x-0 bg-opacity-90 opacity-100"
                  : "translate-x-[-100%] opacity-0"
              } sm:flex sm:bg-opacity-100 sm:opacity-100 sm:translate-x-0 sm:w-[12rem] justify-evenly`}
            >
              <div className="absolute sm:hidden top-0 right-0 text-white p-2">
                <button onClick={handleShow}>
                  <IoMdClose size={35} />
                </button>
              </div>
              <Link href="/">
                <div className="flex justify-center items-center text-white rounded-lg">
                  <BiSolidDashboard size={80} />
                </div>
              </Link>
              <div className="flex flex-col gap-2 bg-" ref={topPagesRef}>
                <Link href="/">
                  <div
                    className={`flex items-center p-2 gap-2
                ${
                  page == "dashboard"
                    ? "text-pink "
                    : " text-gray-500 hover:text-gray-300"
                }`}
                  >
                    <BiSolidDashboard />
                    <p>Dashboard</p>
                  </div>
                </Link>
                <Link href="/pages/assistence">
                  <div
                    className={`flex items-center p-2 gap-2
                ${
                  page == "assistence"
                    ? " text-purple "
                    : "text-gray-500 hover:text-gray-300"
                }`}
                  >
                    <BiListPlus />
                    <p>Asistencia</p>
                  </div>
                </Link>
                <Link href="/pages/reports">
                  <div
                    className={`flex items-center p-2 gap-2
                ${
                  page == "reports"
                    ? " text-blue "
                    : "text-gray-500 hover:text-gray-300"
                }`}
                  >
                    <BiListUl />
                    Reportes
                  </div>
                </Link>
                <Link href="/pages/incident" prefetch={false}>
                  <div
                    className={`flex items-center  p-2 gap-2
                ${
                  page == "incident"
                    ? " text-yellow "
                    : "text-gray-500 hover:text-gray-300"
                }`}
                  >
                    <AiFillWarning />
                    <p>Incidencia</p>
                  </div>
                </Link>
                <Link href="/pages/graphs" prefetch={false}>
                  <div
                    className={`flex items-center  p-2 gap-2
                ${
                  page == "graphs"
                    ? " text-green "
                    : "text-gray-500 hover:text-gray-300"
                }`}
                  >
                    <BsFileEarmarkBarGraph />
                    <p>Gráficas</p>
                  </div>
                </Link>
                <Link href="/pages/invite">
                  <div
                    className={`flex items-center p-2 gap-2
                ${
                  page == "invite"
                    ? " text-purple "
                    : "text-gray-500 hover:text-gray-300"
                }`}
                  >
                    <IoMdPersonAdd />

                    <p>Invitar</p>
                  </div>
                </Link>
                <Link href="/pages/config"  prefetch={false}>
                  <div
                    className={`flex items-center p-2 gap-2
                ${
                  page == "config"
                    ? " text-white "
                    : "text-gray-500 hover:text-gray-300"
                }`}
                  >
                    <BsFillGearFill />
                    <p>Cuenta</p>
                  </div>
                </Link>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 p-2 text-gray-500 hover:text-gray-300"
              >
                <BiLogOut size={20} />
                Cerrar Sesión
              </button>
              <div className="hidden sm:flex justify-end bg-gray-300 absolute top-0 w-full">
                <div
                  ref={indicatorRef}
                  className="bg-blue-700 rounded-tl-full rounded-bl-full w-6 h-10 transition-all flex justify-center items-center indicator-shadow absolute mr-3 "
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      page == "dashboard"
                        ? "bg-pink"
                        : page == "assistence"
                        ? "bg-purple"
                        : page == "reports"
                        ? "bg-blue"
                        : page == "incident"
                        ? "bg-yellow"
                        : page == "graphs"
                        ? "bg-green"
                        : page == "invite"
                        ? "bg-purple"
                        : "bg-white"
                    }`}
                  ></div>
                </div>
              </div>
            </div>
            <div className="w-full h-screen sm:ml-[13rem] p-3 overflow-hidden">
              <div className="absolute top-0 right-0">
                <Toaster richColors />
              </div>
                <div className="h-screen overflow-y-scroll sm:overflow-hidden">{children}</div>
            </div>
          </div>
        )}
      </Suspense>
    </>
  );
}

export default Sidebar;
