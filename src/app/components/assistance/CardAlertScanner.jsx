"use client";
import { FaCheckCircle } from "react-icons/fa";

function CardAlertScanner({ onClick, color, children }) {
  return (
    <button
      onClick={onClick}
      className={`absolute top-0 right-0 m-5 bg-blue-800 shadow-2xl p-4 rounded-lg flex flex-col items-center  justify-center gap-2 text-${color} w-60 h-28`}
    >
      {children}
    </button>
  );
}

export default CardAlertScanner;
