"use client"
import React, { useContext } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { SidebarContext } from "./SideBarResponsiveContext";

function Header({ title, extra }) {
  const {isShow, handleShow} = useContext(SidebarContext)
  return (
    <div className="flex w-full justify-between text-white">
      <div>
        <h2 className="font-bold text-xl">{title}</h2>
      </div>
      <div>
        <h3 className="">{extra}</h3>
      </div>
      <div className="sm:hidden">
        <CiMenuBurger size={30} className="cursor-pointer" onClick={handleShow} />
      </div>
    </div>
  );
}

export default Header;
