"use client";
import { createContext, useState } from "react";

export const SidebarContext = createContext(null);

export const SidebarProvider = ({ children }) => {
  const [isShow, setIsShow] = useState(false);
  const handleShow = ()=>{
    setIsShow(!isShow)
  }
  return (
    <SidebarContext.Provider value={{ isShow, handleShow }}>
      {children}
    </SidebarContext.Provider>
  );
};
export default SidebarProvider;
