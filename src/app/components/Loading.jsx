import React from "react";
import style from "./Loading.module.css";
function Loading() {
  return (
    <div className="w-full h-3/4 flex items-center justify-center overflow-hidden">
      <div className={style.loader}></div>
    </div>
  );
}

export default Loading;
