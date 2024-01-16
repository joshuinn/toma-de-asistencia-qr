"use client";
import { useEffect, useRef, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { CiWarning } from "react-icons/ci";
import { FaCheckCircle } from "react-icons/fa";
import CardAlertScanner from "./CardAlertScanner";
import ButtonStyled from "../styled/ButtonStyled";

const FormRegister = ({
  handleForm,
  setDataForm,
  showForm,
  handleSubmit,
  dataForm,
}) => {
  const formRef = useRef(null);
  const inputURL = useRef(null);
  const [isBlurInput, setIsBlurInput] = useState(true);
  const handleFocusInput = (e) => {
    setIsBlurInput(false);
    if (inputURL.current) {
      inputURL.current.focus();
    }
  };
  const handleBlurInput = (e) => {
    setIsBlurInput(true);
  };
  const handleInput = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value,
    });
    //formRef.current.submit()
  };
  useEffect(() => {
    if (showForm) {
      handleFocusInput();
    }
  }, [showForm]);
  return (
    <div
      className={`
       w-[calc(100%-13rem)] h-screen top-0 absolute flex justify-center items-center
      transition-all
      ease-in-out
      z-30
      ${
        showForm ? " bg-[rgb(0,0,0,0.5)] left-[13rem]" : "right-full opacity-0 "
      }
      `}
    >
      <div onClick={handleForm} className="h-screen w-full absolute z-0"></div>
      <div className="bg-blue-700 z-10 text-white p-5 flex flex-col items-center justify-center rounded-lg">
        <div className="flex justify-end w-full relative">
          <button
            onClick={() => {
              handleForm();
            }}
            className="text-white hover:text-white/60 cursor-pointer z-10"
            role="dialog"
          >
            <AiFillCloseCircle size={30} />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            handleSubmit(e);
            handleFocusInput();
          }}
          className="flex flex-col gap-2"
          ref={formRef}
        >
          <input
            ref={inputURL}
            onFocus={handleFocusInput}
            autoFocus
            type="text"
            name="url"
            placeholder="URL"
            onBlur={handleBlurInput}
            onChange={handleInput}
            className="bg-blue-800 p-3 rounded-full outline-none "
            value={dataForm.url}
          />
          <ButtonStyled type="submit" color="green">
            Agregar
          </ButtonStyled>
        </form>
        {isBlurInput ? (
          <CardAlertScanner onClick={handleFocusInput} color="yellow">
            <CiWarning size={35} />
            Pestaña desenfocada
          </CardAlertScanner>
        ) : (
          <CardAlertScanner onClick={handleFocusInput} color="green">
            <FaCheckCircle size={35} />
            Todo listo para escanear
          </CardAlertScanner>
        )}
      </div>
    </div>
  );
};

export default FormRegister;
