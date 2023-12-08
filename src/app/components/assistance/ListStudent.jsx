"use client";
import axios from "axios";
import React, {
  useState,
  useEffect,
  Suspense,
  useContext,
  useRef,
} from "react";
import { AiFillCloseCircle, AiOutlineQrcode } from "react-icons/ai";
import { RiInboxUnarchiveFill } from "react-icons/ri";
import Loading from "../Loading";
import { toast } from "sonner";
import studenLoader from "./ListStudent.module.css";
import { useRouter } from "next/navigation";
import { SessionContext } from "../SessionContext";
import { formatText } from "../formatTextList.helper";

function ListStudent({ id_lista_asitencia }) {
  const [students, setStudents] = useState([]);
  const [studentQueue, setStudentQueue] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();
  const { dataUser } = useContext(SessionContext);
  const focusedInputRef = useRef(null);
  const [currentInputId, setCurrentInputId] = useState(null);
  const [dataForm, setDataForm] = useState({
    url: "",
    id_lista_asitencia: id_lista_asitencia,
  });
  const getDataStudent = async (student) => {
    try {
      const { data } = await axios.post("/api/webScrapping", student);
      if (data) {
        return {
          nombre: data.nombre.nombre,
          apellido: data.nombre.apellido,
          boleta: data.boleta,
        };
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleEndList = async () => {
    try {
      const response = await axios.post("/api/assistanceList", [
        students,
        dataUser,
        id_lista_asitencia,
      ]);
      //console.log(response);
      if (response.status == 200) {
        toast.success("Se ha guardado correctamente la lista de asistencia");
        router.push("/pages/assistence");
        router.refresh();
        return;
      }
    } catch (error) {
      console.error(error);
    }
    toast.error("Ha ocurrido un error");
  };
  useEffect(() => {
    const updateStudent = async () => {
      if (studentQueue.length > 0) {
        const id_queue = await studentQueue[0].id;
        try {
          const data = await getDataStudent(studentQueue[0].data);

          setStudents((prevStudents) => {
            return prevStudents.map((student) => {
              if (student.id == id_queue && data.boleta) {
                return {
                  ...student,
                  boleta: data.boleta,
                  apellido_alumno: data.apellido,
                  nombre_alumno: data.nombre,
                };
              }
              return student;
            });
          });
          const NewQue = studentQueue.filter((student) => {
            if (student.id !== id_queue) {
              return student;
            }
          });
          setStudentQueue(NewQue);
        } catch (e) {
          console.error(e);
        }
      }
    };
    updateStudent();
  }, [studentQueue]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id_queue = crypto.randomUUID();
    setStudents([
      ...students,
      {
        boleta: "waiting",
        apellido_alumno: "waiting",
        nombre_alumno: "waiting",
        id: id_queue,
      },
    ]);
    setStudentQueue([
      ...studentQueue,
      {
        id: id_queue,
        data: dataForm,
      },
    ]);
    setDataForm({
      id_lista_asitencia: "",
      url: "",
    });
  };
  const handleForm = () => {
    setShowForm(!showForm);
  };
  const handleInput = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value,
    });
  };
  const handleMaquina = (e) => {
    const val = formatText(e.target.name, e.target.value);
    setStudents((prevStudents) => {
      return prevStudents.map((student) =>
        student.id == e.target.id
          ? { ...student, numero_maquina: val }
          : student
      );
    });
    if (focusedInputRef.current) {
      setTimeout(() => {
        focusedInputRef.current.focus();
      }, 0);
    }
  };
  const setFocusedInput = (e) => {
    setCurrentInputId(e.target.id);
  };
  const FormRegister = () => {
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
        <div className="bg-blue-700 text-white p-5 flex flex-col items-center justify-center rounded-lg">
          <div className="flex justify-end w-full">
            <AiFillCloseCircle
              size={30}
              className="text-indigo-950 cursor-pointer"
              onClick={handleForm}
            />
          </div>
          <h2>Ingrese manual de momento</h2>
          <button
            onClick={() =>
              setDataForm({
                url: "https://servicios.dae.ipn.mx/vcred/?h=b65180be30f3f9dcf9713f09a04a799d88ceec72341b468c9336c38acf3dc2bf",
              })
            }
            className="m-2 bg-blue p-3 rounded"
          >
            Example
          </button>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <input
              className="bg-blue-800 p-2 rounded-full outline-none "
              type="text"
              name="url"
              placeholder="URL"
              onChange={handleInput}
              value={dataForm.url}
              autoFocus
            />
            <button className="bg-green p-2 rounded-lg">Agregar</button>
          </form>
        </div>
      </div>
    );
  };
  return (
    <Suspense fallback={<Loading />}>
      <div className="bg-blue-800 rounded-lg p-3 shadow-lg z-10 text-white">
        <div className="flex justify-end">
          <button
            className="transition-all bg-purple border border-purple hover:bg-blue-800 hover:text-purple p-3 rounded-lg flex items-center"
            onClick={handleForm}
          >
            <AiOutlineQrcode size={25} />
            <p>Iniciar registro con QR</p>
          </button>
        </div>
        <ul className="grid grid-cols-4 text-center">
          <li>Apellido</li>
          <li>Nombre</li>
          <li>Boleta</li>
          <li>No. maquina</li>
        </ul>
        <ul className=" h-full sm:h-[calc(100vh-25rem)] lg:h-[calc(100vh-20rem)]  overflow-y-scroll">
          {students.map((student) => (
            <li key={student.id}>
              {student.boleta == "waiting" ? (
                <div className="grid grid-cols-4 text-center justify-center items-center">
                  <div className={studenLoader.loader}></div>
                  <div className={studenLoader.loader}></div>
                  <div className={studenLoader.loader}></div>
                  <div className={studenLoader.loader}></div>
                </div>
              ) : (
                <div className="grid sm:grid-cols-4 grid-cols-2 text-center justify-center mb-2">
                  <p className="w-11/12">{student.apellido_alumno}</p>
                  <p className="w-11/12">{student.nombre_alumno}</p>
                  <p>{student.boleta}</p>
                  <div className="flex justify-evenly">
                    <input
                      key={student.id}
                      id={student.id}
                      ref={
                        student.id === currentInputId ? focusedInputRef : null
                      }
                      type="numeric"
                      placeholder="00"
                      value={student.numero_maquina ?? 0}
                      className="bg-blue-600 p-2 rounded-full outline-none w-20 text-center"
                      onChange={handleMaquina}
                      onFocus={setFocusedInput}
                      name="numero_maquina"
                    />
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
        <div className="flex justify-end">
          <button
            className={`border transition-all p-3 mt-2 rounded-lg  flex items-center gap-1 
                ${
                  studentQueue.length > 0 || students.length == 0
                    ? "text-gray-500 border-gray-500"
                    : "border-pink text-pink hover:text-green hover:border-green"
                }
            `}
            onClick={() => {
              handleEndList();
            }}
            disabled={students.length == 0 || studentQueue.length > 0}
          >
            <p>Terminar registro</p>
            <RiInboxUnarchiveFill size={25} />
          </button>
        </div>
      </div>
      <FormRegister />
    </Suspense>
  );
}

export default ListStudent;
