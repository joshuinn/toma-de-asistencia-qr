// Importar React y componentes relacionados.
import { useEffect, useRef, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { CiWarning } from "react-icons/ci";
import { FaCheckCircle } from "react-icons/fa";
import CardAlertScanner from "./CardAlertScanner";
import ButtonStyled from "../styled/ButtonStyled";

// Definir el componente funcional FormRegister.
const FormRegister = ({
  handleForm,
  setDataForm,
  showForm,
  handleSubmit,
  dataForm,
}) => {
  // Refs para el formulario y el input de la URL.
  const formRef = useRef(null);
  const inputURL = useRef(null);

  // Estado para manejar el enfoque/desenfoque del input.
  const [isBlurInput, setIsBlurInput] = useState(true);

  // Función para manejar el enfoque del input.
  const handleFocusInput = (e) => {
    setIsBlurInput(false);
    if (inputURL.current) {
      inputURL.current.focus();
    }
  };

  // Función para manejar el desenfoque del input.
  const handleBlurInput = (e) => {
    setIsBlurInput(true);
  };

  // Función para manejar los cambios en el input.
  const handleInput = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value,
    });
  };

  // Efecto para enfocar el input cuando se muestra el formulario.
  useEffect(() => {
    if (showForm) {
      handleFocusInput();
    }
  }, [showForm]);

  // Renderizar el componente FormRegister.
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
      {/* Div de fondo que cierra el formulario al hacer clic */}
      <div onClick={handleForm} className="h-screen w-full absolute z-0"></div>
      {/* Contenedor del formulario */}
      <div className="bg-blue-700 z-10 text-white p-5 flex flex-col items-center justify-center rounded-lg">
        {/* Botón para cerrar el formulario */}
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
        {/* Formulario de ingreso de URL */}
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
          {/* Botón para agregar */}
          <ButtonStyled type="submit" color="green">
            Agregar
          </ButtonStyled>
        </form>
        {/* Componente de alerta en forma de tarjeta */}
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

// Exportar el componente FormRegister como componente predeterminado.
export default FormRegister;
