"use client";
import Link from "next/link";
import React, { Suspense, useContext, useState } from "react";
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

function Sidebar({ children }) {
  const [page, setPage] = useState("dashboard");
  const { isLogged, handleLogout } = useContext(SessionContext);
  return (
    <>
      <Suspense fallback={<Loading />}>
        {!isLogged ? (
          <div>{children}</div>
        ) : (
          <div className="flex bg-gradient-to-r from-slate-100 to-indigo-50">
            <div className="fixed bg-white m-2 w-[12rem] h-[95vh] p-3 flex flex-col justify-evenly rounded-2xl shadow-lg">
              <Link href="/">
                <div
                  className="flex justify-center items-center bg-indigo-950 text-white rounded-lg hover:bg-indigo-900"
                  onClick={() => setPage("dashboard")}>
                  <BiSolidDashboard size={80} />
                </div>
              </Link>
              <div className="flex flex-col gap-2">
                <Link href="/">
                  <div
                    className={`flex items-center border rounded-lg p-2 gap-2
                ${
                  page == "dashboard"
                    ? "bg-indigo-950 text-white text-2xl"
                    : "hover:bg-gray-200"
                }`}
                    onClick={() => setPage("dashboard")}>
                    <BiSolidDashboard />
                    <p>Dashboard</p>
                  </div>
                </Link>
                <Link href="/pages/assistence">
                  <div
                    className={`flex items-center border rounded-lg p-2 gap-2
                ${
                  page == "assistence"
                    ? "bg-indigo-950 text-white text-2xl"
                    : "hover:bg-gray-200"
                }`}
                    onClick={() => setPage("assistence")}>
                    <BiListPlus />
                    <p>Assistence</p>
                  </div>
                </Link>
                <Link href="/pages/reports">
                  <div
                    className={`flex items-center border rounded-lg p-2 gap-2
                ${
                  page == "reports"
                    ? "bg-indigo-950 text-white text-2xl"
                    : "hover:bg-gray-300"
                }`}
                    onClick={() => setPage("reports")}>
                    <BiListUl />
                    Reports
                  </div>
                </Link>
                <Link href="/pages/incident">
                  <div
                    className={`flex items-center border rounded-lg p-2 gap-2
                ${
                  page == "incident"
                    ? "bg-indigo-950 text-white text-2xl"
                    : "hover:bg-gray-200"
                }`}
                    onClick={() => setPage("incident")}>
                    <AiFillWarning />
                    <p>Incident</p>
                  </div>
                </Link>
                <Link href="/pages/graphs">
                  <div
                    className={`flex items-center border rounded-lg p-2 gap-2
                ${
                  page == "graphs"
                    ? "bg-indigo-950 text-white text-2xl"
                    : "hover:bg-gray-200"
                }`}
                    onClick={() => setPage("graphs")}>
                    <BsFileEarmarkBarGraph />
                    <p>Graphs</p>
                  </div>
                </Link>
                <Link href="/pages/config">
                  <div
                    className={`flex items-center border rounded-lg p-2 gap-2
                ${
                  page == "config"
                    ? "bg-indigo-950 text-white text-2xl"
                    : "hover:bg-gray-200"
                }`}
                    onClick={() => setPage("config")}>
                    <BsFillGearFill />
                    <p>Account</p>
                  </div>
                </Link>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 hover:bg-gray-300 rounded-lg border p-2">
                <BiLogOut size={20} />
                Logout
              </button>
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
