import React from "react";

function ButtonStyled({ onClick, children, color, padding, ...props }) {
  const styled = [
    (color == "purple" && " bg-purple border-purple  hover:text-purple") ||
      (color == "pink" && " bg-pink border-pink  hover:text-pink") ||
      (color == "green" && " bg-green border-green  hover:text-green") ||
      (color == "yellow" && " bg-yellow border-yellow  hover:text-yellow")|| 
      (color == "blue" && " bg-blue border-blue  hover:text-blue")
  ];
  return (
    <button
      onClick={onClick}
      className={
        "text-white p-3 rounded-lg border hover:bg-opacity-0 transition-all flex items-center justify-center gap-2 text-center " +
        styled
      }
      {...props}>
      {children}
    </button>
  );
}

export default ButtonStyled;
