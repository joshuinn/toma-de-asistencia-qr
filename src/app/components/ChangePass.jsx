"use client";
import { useContext, useEffect, useReducer, useState } from "react";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import { SessionContext } from "./SessionContext";
import axios from "axios";
import { toast } from "sonner";
import ButtonStyled from "./styled/ButtonStyled";
import InputStyled from "./styled/InputStyled";

const showPassreducer = (state, action) => {
  switch (action.type) {
    case "contrasenia":
      return { ...state, pass1: !state.pass1 };
    case "confirmarContrasenia":
      return { ...state, pass2: !state.pass2 };
    default:
      return state;
  }
};

function ChangePass() {
  const [showChangePass, setShowChangePass] = useState(false);
  const { dataUser } = useContext(SessionContext);
  const [isError, setIsError] = useState(false)
  const [showPass, setShowPass] = useReducer(showPassreducer, {
    pass1: false,
    pass2: false,
  });
  const [dataPass, setDataPass] = useState({
    contrasenia: "",
    confirmarContrasenia: "",
  });
  const handleShow = () => {
    setShowChangePass(!showChangePass);
  };
  const handleInput = (e) => {
    setDataPass({
      ...dataPass,
      [e.target.name]: e.target.value,
    });
  };
  const succesChangePass = () =>{
    toast.success("Se ha actualizado correctamente la contraseña")
  }
  const errorChangePass = () =>{
    toast.error("Ha ocurrido un error en el servidor, vuelva a intentar")
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        const response = await axios.put("/api/users",{dataPass, id_usuario: dataUser.id_usuario})
        if(response.data.isValid){
            succesChangePass()
            setIsError(false)
            setDataPass({
              contrasenia:"",
              confirmarContrasenia:""
            })
        }else{
            setIsError(true)
        }
    } catch (error) {
        errorChangePass()
        console.error(error);
    }
  };

  return (
    <div className="bg-blue-600 w-11/12 sm:w-1/2 h-[300px] flex flex-col justify-center items-center rounded-lg shadow-lg p-4 ">
      <ButtonStyled
       color="yellow"
        onClick={handleShow}>
        Cambiar contraseña
      </ButtonStyled>
      <form
        className={`mt-3 flex flex-col gap-3 transtion-all ${
          showChangePass ? "opacity-100 static" : "opacity-0 hidden"
        }`}
        onSubmit={handleSubmit}>
        <div className="flex w-fit justify-end items-center relative">
          <InputStyled
            type={showPass.pass1 ? "text" : "password"}
            placeholder="Contraseña"
            className="w-56"
            name="contrasenia"
            value={dataPass.contrasenia}
            onChange={handleInput}
            required
          />
          <div className="flex justify-end items-center absolute pr-3">
            {showPass.pass1 ? (
              <FaRegEyeSlash
                className="cursor-pointer"
                size={20}
                onClick={() => setShowPass({ type: "contrasenia" })}
              />
            ) : (
              <FaEye
                className="cursor-pointer"
                size={20}
                onClick={() => setShowPass({ type: "contrasenia" })}
              />
            )}
          </div>
        </div>
        <div className="flex w-fit justify-end items-center relative">
          <InputStyled
            type={showPass.pass2 ? "text" : "password"}
            placeholder="Confirmar contraseña"
            name="confirmarContrasenia"
            value={dataPass.confirmarContrasenia}
            onChange={handleInput}
            className="w-56"
            required
          />
          <div className="flex justify-end items-center absolute pr-3">
            {showPass.pass2 ? (
              <FaRegEyeSlash
                className=" cursor-pointer"
                size={20}
                onClick={() => setShowPass({ type: "confirmarContrasenia" })}
              />
            ) : (
              <FaEye
                className="cursor-pointer"
                size={20}
                onClick={() => setShowPass({ type: "confirmarContrasenia" })}
              />
            )}
          </div>
        </div>
        <h3 className={`text-pink ${isError?"block":"hidden"} `} >Las contraseñas no son iguales</h3>
        <ButtonStyled color="pink" >
          <span>Cambiar</span>
        </ButtonStyled>
      </form>
    </div>
  );
}

export default ChangePass;
