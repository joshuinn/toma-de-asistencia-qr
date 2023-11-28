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
import { AiFillWarning } from "react-icons/ai";
import { BsFileEarmarkBarGraph, BsFillGearFill } from "react-icons/bs";
import { SessionContext } from "./SessionContext";
import { Toaster } from "sonner";
import Loading from "./Loading";
import { useRouter, usePathname } from "next/navigation";

function Sidebar({ children }) {
  const [page, setPage] = useState("dashboard");
  const { isLogged, handleLogout } = useContext(SessionContext);
  const router = useRouter();
  const indicatorRef = useRef();
  const topPagesRef = useRef();
  const pages = [
    "dashboard",
    "assistence",
    "reports",
    "incident",
    "graphs",
    "config",
  ];
  const handleIndicator = async () => {
    const indicator = indicatorRef.current;
    const topI = (await topPagesRef.current.getBoundingClientRect().y) ?? 200;
    const ipage = pages.findIndex((item) => item == page);
    console.log(pathname);
    indicator.style.transform = `translateY(${topI + ipage * 47}px)`;
  };
  useEffect(() => {
    if (isLogged) {
      handleIndicator();
    }
  }, [page, isLogged]);
  useEffect(() => {
    //pathname
  }, []);
  return (
    <>
      <Suspense fallback={<Loading />}>
        {!isLogged ? (
          <div>{children}</div>
        ) : (
          <div className="flex bg-blue-700">
            <div className="fixed bg-blue-800 w-[12rem] h-screen p-3 flex flex-col justify-evenly">
              <Link href="/">
                <div
                  className="flex justify-center items-center text-white rounded-lg"
                  onClick={() => {
                    setPage("dashboard");
                  }}>
                  <BiSolidDashboard size={80} />
                </div>
              </Link>
              <div className="flex flex-col gap-2 bg-" ref={topPagesRef}>
                <Link href="/">
                  <div
                    className={`flex items-center p-2 gap-2
                ${page == "dashboard" ? "text-white " : " text-gray-500"}`}
                    onClick={() => {
                      setPage("dashboard");
                    }}>
                    <BiSolidDashboard />
                    <p>Dashboard</p>
                  </div>
                </Link>
                <Link href="/pages/assistence">
                  <div
                    className={`flex items-center p-2 gap-2
                ${
                  page == "assistence"
                    ? "bg-indigo-950 text-white "
                    : "text-gray-500"
                }`}
                    onClick={() => {
                      setPage("assistence");
                    }}>
                    <BiListPlus />
                    <p>Assistence</p>
                  </div>
                </Link>
                <Link href="/pages/reports">
                  <div
                    className={`flex items-center p-2 gap-2
                ${
                  page == "reports"
                    ? "bg-indigo-950 text-white "
                    : "text-gray-500"
                }`}
                    onClick={() => setPage("reports")}>
                    <BiListUl />
                    Reports
                  </div>
                </Link>
                <Link href="/pages/incident">
                  <div
                    className={`flex items-center  p-2 gap-2
                ${
                  page == "incident"
                    ? "bg-indigo-950 text-white "
                    : "text-gray-500"
                }`}
                    onClick={() => setPage("incident")}>
                    <AiFillWarning />
                    <p>Incident</p>
                  </div>
                </Link>
                <Link href="/pages/graphs">
                  <div
                    className={`flex items-center  p-2 gap-2
                ${
                  page == "graphs"
                    ? "bg-indigo-950 text-white "
                    : "text-gray-500"
                }`}
                    onClick={() => setPage("graphs")}>
                    <BsFileEarmarkBarGraph />
                    <p>Graphs</p>
                  </div>
                </Link>
                <Link href="/pages/config">
                  <div
                    className={`flex items-center p-2 gap-2
                ${
                  page == "config"
                    ? "bg-indigo-950 text-white "
                    : "text-gray-500"
                }`}
                    onClick={() => setPage("config")}>
                    <BsFillGearFill />
                    <p>Account</p>
                  </div>
                </Link>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 p-2 text-gray-500">
                <BiLogOut size={20} />
                Logout
              </button>
              <div className="flex justify-end bg-gray-300 absolute top-0 w-full">
                <div
                  ref={indicatorRef}
                  className="bg-blue-700 rounded-tl-full rounded-bl-full w-6 h-10 transition-all flex justify-center items-center indicator-shadow absolute mr-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      page == "dashboard"
                        ? "bg-white"
                        : page == "assistence"
                        ? "bg-purple"
                        : page == "reports"
                        ? "bg-blue"
                        : page == "incident"
                        ? "bg-green"
                        : page == "graphs"
                        ? "bg-pink"
                        : "bg-yellow"
                    }`}></div>
                </div>
              </div>
            </div>
            <div className="w-full h-screen ml-[13rem] p-3 overflow-hidden">
              <Toaster />
              {children}
            </div>
          </div>
        )}
      </Suspense>
    </>
  );
}

export default Sidebar;
