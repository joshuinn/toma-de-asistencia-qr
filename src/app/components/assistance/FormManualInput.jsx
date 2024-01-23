// Importar React y componentes relacionados.
import React from "react";
import ButtonStyled from "../styled/ButtonStyled";
import InputStyled from "../styled/InputStyled";
import { AiFillCloseCircle } from "react-icons/ai";
import { studentNameFormated } from "../helpers/studentNameFormated";
import { formatText } from "../helpers/formatTextList.helper";

// Definir el componente funcional FormManualInput.
function FormManualInput({
  isShowInputsManuals,
  handleShowInputsManuals,
  handleSubmitManual,
  manualData,
  setManualData,
}) {
  // Definir la función handleManualInput para manejar los cambios en los campos del formulario.
  const handleManualInput = (e) => {
    let text = "";
    if (e.target.name !== "boleta") {
      text = studentNameFormated(e.target.value);
    } else {
      text = formatText(e.target.name, e.target.value);
    }
    setManualData({
      ...manualData,
      [e.target.name]: text,
    });
  };

  // Renderizar el componente FormManualInput.
  return (
    <div
      className={`w-[calc(100%-13rem)] h-screen top-0 absolute flex justify-center items-center
          transition-all
          ease-in-out
          z-30
          ${
            isShowInputsManuals
              ? " bg-[rgb(0,0,0,0.5)] left-[13rem]"
              : "right-full opacity-0 "
          }`}
    >
      <div onClick={handleShowInputsManuals} className="h-screen w-full absolute z-0"></div>
      <div className="mt-2 text-center z-10 absolute bg-blue-600 text-white p-4 rounded-lg">
        <div className="flex justify-end hover:text-white/60">
          <button onClick={handleShowInputsManuals}>
            <AiFillCloseCircle size={30} />
          </button>
        </div>
        <div className="flex justify-center flex-col items-center">
          <p>Registrar manualmente al alumno</p>
        </div>
        <div className="flex justify-center"></div>
        {!isShowInputsManuals ? null : (
          <form onSubmit={handleSubmitManual}>
            <div className="flex flex-col gap-3 p-2">
              {/* Input para el apellido del alumno */}
              <InputStyled
                placeholder="Apellido"
                type="text"
                name="apellido_alumno"
                onChange={handleManualInput}
                value={manualData.apellido_alumno ?? ""}
              />
              {/* Input para el nombre del alumno */}
              <InputStyled
                placeholder="Nombre"
                type="text"
                name="nombre_alumno"
                onChange={handleManualInput}
                value={manualData.nombre_alumno ?? ""}
              />
              {/* Input para la boleta del alumno */}
              <InputStyled
                placeholder="Boleta"
                type="numeric"
                name="boleta"
                onChange={handleManualInput}
                value={manualData.boleta ?? ""}
                required
              />
              {/* Botón para registrar */}
              <ButtonStyled color="purple">
                <p>Registrar</p>
              </ButtonStyled>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

// Exportar el componente FormManualInput como componente predeterminado.
export default FormManualInput;
