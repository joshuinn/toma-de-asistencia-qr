"use client";
import Link from "next/link";
import React, { useContext, useEffect, useRef, useState } from "react";
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
    "assistence",
    "reports",
    "incident",
    "graphs",
    "invite",
    "config",
  ];
  const handleIndicator = async () => {
    const indicator = indicatorRef.current;
    const topIndicatorY =
      (await topPagesRef.current.getBoundingClientRect().y) ?? 0;
    const ipage = pages.findIndex((item) => item == page);
    indicator.style.transform = `translateY(${topIndicatorY + ipage * 47}px)`;
  };

  useEffect(() => {
    setIsLoading(true);
    if (isLogged) {
      const actualPage = pathname.split("/");
      if (actualPage[2]) {
        if (isShow) {
          handleShow();
        }
        setPage(actualPage[2]);
      }
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (isLogged) {
      handleIndicator();
    }
  }, [page, isLogged]);

  if (!isLogged) {
    return (
      <div>
        {children}
        <Toaster richColors />
      </div>
    );
  }

  return (
    <>
      <div className="flex bg-blue-700">
        <div
          className={`flex bg-blue-800 z-10 h-screen w-full p-3 flex-col  
              transition-opacity delay-75 fixed
              ${
                isShow
                  ? "absolute translate-x-0 bg-opacity-90 opacity-100"
                  : "translate-x-[-100%] opacity-0"
              } sm:flex sm:bg-opacity-100 sm:opacity-100 sm:translate-x-0 sm:w-[12rem] justify-evenly items-center sm:items-start text-xl sm:text-base`}
        >
          <div className="absolute sm:hidden top-0 right-0 text-white p-4">
            <button onClick={handleShow}>
              <IoMdClose size={35} />
            </button>
          </div>
          <div className="w-full flex justify-center items-center">
            <Link href="/">
              <div className="text-white ">
                <BiSolidDashboard size={80} />
              </div>
            </Link>
          </div>
          <div className="flex flex-col gap-4 sm:gap-2 bg-" ref={topPagesRef}>
            {/*
              <button>
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
              </button>
              */}
            <Link href="/pages/assistence">
              <button
                className={`flex items-center p-2 gap-2
                ${
                  page == "assistence"
                    ? " text-purple "
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                <BiListPlus />
                <p>Tomar Asistencia</p>
              </button>
            </Link>
            <Link href="/pages/reports">
              <button
                className={`flex items-center p-2 gap-2
                ${
                  page == "reports"
                    ? " text-blue "
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                <BiListUl />
                Reportes
              </button>
            </Link>
            <Link href="/pages/incident" prefetch={false}>
              <button
                className={`flex items-center  p-2 gap-2
                ${
                  page == "incident"
                    ? " text-yellow "
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                <AiFillWarning />
                <p>Incidencia</p>
              </button>
            </Link>
            <Link href="/pages/graphs" prefetch={false}>
              <button
                className={`flex items-center  p-2 gap-2
                ${
                  page == "graphs"
                    ? " text-green "
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                <BsFileEarmarkBarGraph />
                <p>Gráficas</p>
              </button>
            </Link>

            <Link href="/pages/invite">
              <button
                className={`flex items-center p-2 gap-2
                ${
                  page == "invite"
                    ? " text-purple "
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                <IoMdPersonAdd />

                <p>Invitar</p>
              </button>
            </Link>
            <Link href="/pages/config" prefetch={false}>
              <button
                className={`flex items-center p-2 gap-2
                ${
                  page == "config"
                    ? " text-white "
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                <BsFillGearFill />
                <p>Mi Cuenta</p>
              </button>
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
          {isLoading ? (
            <div className="flex w-full h-screen items-center justify-center">
              <Loading />
            </div>
          ) : (
            <div className="h-screen overflow-y-scroll sm:overflow-hidden">
              {children}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Sidebar;
