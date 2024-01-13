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
import loaderIndividual from "./LoadingIndividual.module.css";
import { useRouter } from "next/navigation";
import { SessionContext } from "../SessionContext";
import { formatText } from "../helpers/formatTextList.helper";
import { CiCircleRemove } from "react-icons/ci";
import { FaCheckCircle } from "react-icons/fa";

function ListStudent({ id_lista_asistencia }) {
  const [students, setStudents] = useState([]);
  const [studentQueue, setStudentQueue] = useState([]);
  const [isNewStudent, setIsNewStudent] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();
  const { dataUser } = useContext(SessionContext);
  const focusedInputRef = useRef(null);
  const [currentInputId, setCurrentInputId] = useState(null);
  const formRef = useRef(null);
  const [isProcessingStudent, setIsProcessingStudent] = useState(false);
  const [dataForm, setDataForm] = useState({
    url: "",
    id_lista_asistencia: id_lista_asistencia,
  });
  const getDataStudent = async (student) => {
    try {
      const { data } = await axios.post("/api/webScrapping", {
        student,
        id_lista_asistencia,
      });
      if (data.nombre) {
        return {
          nombre: data.nombre.nombre,
          apellido: data.nombre.apellido,
          boleta: data.boleta,
          numero_maquina: data.numero_maquina,
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
        id_lista_asistencia,
      ]);
      //console.log(response);
      if (response.status == 200) {
        localStorage.removeItem("listStudents");
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
        if (isProcessingStudent) {
          return;
        }
        const id_queue = await studentQueue[0].id;
        setIsProcessingStudent(true);
        try {
          const data = await getDataStudent(studentQueue[0].data)
            .then((res) => res)
            .catch((e) => e);
          setStudents((prevStudents) => {
            return prevStudents.map((student) => {
              if (student.id == id_queue && !data) {
                toast.error("ha ocurrudo un error con uno de los estudiantes");
                return {
                  ...student,
                  boleta: "error",
                };
              }
              if (student.id == id_queue && data.boleta) {
                return {
                  ...student,
                  boleta: data.boleta,
                  apellido_alumno: data.apellido,
                  nombre_alumno: data.nombre,
                  numero_maquina: data.numero_maquina,
                };
              }
              return student;
            });
          });
          console.log("students: ", studentQueue);
          console.log("id: ", id_queue);
          const NewQue = studentQueue.filter((student) => {
            if (student.id !== id_queue) {
              return student;
            }
          });
          console.log("new list",NewQue);
          setIsNewStudent(!isNewStudent);
          setStudentQueue(NewQue);
          setIsProcessingStudent(false);
        } catch (e) {
          console.error(e);
        }
      } else {
      }
    };
    updateStudent();
  }, [studentQueue]);

  useEffect(() => {
    if (students.length > 0) {
      let newList = students.filter((student) =>
        student.boleta !== "error" ? student : null
      );
      if (newList.length !== students.length) {
        setStudents(newList);
      } else {
        const newList = students.reduce((student, object) => {
          if (object.boleta == "waiting") {
            return [...student, object];
          }
          return student.some((datos) => datos.boleta === object.boleta)
            ? student
            : [...student, object];
        }, []);
        if (newList.length !== students.length) {
          setStudents(newList);
          toast.warning("Alumno ya registrado");
        }
      }
      localStorage.setItem(
        "listStudents",
        JSON.stringify({ students, id_lista_asistencia })
      );
    }
  }, [students]);

  useEffect(() => {
    const storageList = JSON.parse(localStorage.getItem("listStudents"));
    if (storageList) {
      if (storageList.id_lista_asistencia == id_lista_asistencia) {
        setStudents(storageList.students);
      }
    }
  }, []);
  useEffect(() => {
    if (students.length > 1) {
      let newList = [...students];
      newList.sort((a, b) => {
        let mergeNameA = a.apellido_alumno + " " + a.nombre_alumno;
        let mergeNameB = b.apellido_alumno + " " + b.nombre_alumno;
        return mergeNameA.localeCompare(mergeNameB);
      });
      setStudents(newList);
    }
  }, [isNewStudent]);
  useEffect(() => {
    console.log("lista:" ,studentQueue);
    if (!isProcessingStudent) {
      if (studentQueue.length == 0) {
        if (students.length > 0) {
          //console.log("students: ", students);
          const newList = students.filter((student) => {
            //console.log(student.boleta);

              return student.boleta == "waiting" ? null : student;
            });
            //console.log("newLisT: ", newList);

            if (students.length !== newList) {
              setStudents(newList);
            }
          }
      }
    }
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
      id_lista_asistencia: "",
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
    //formRef.current.submit()
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
  const handleDeleteStudent = (id) => {
    let newList = students.filter((student) =>
      student.id !== id ? student : null
    );
    setStudents(newList);
    if (newList.length == 0) {
      localStorage.removeItem("listStudents");
    }
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
          {/*
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
            */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2"
            ref={formRef}
          >
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
        <div className="flex justify-start">
          <button
            className="transition-all bg-purple border border-purple hover:bg-blue-800 hover:text-purple p-3 rounded-lg flex items-center"
            onClick={handleForm}
          >
            <AiOutlineQrcode size={25} />
            <p>Iniciar registro con QR</p>
          </button>
        </div>
        <ul className="grid grid-cols-6 text-center text-purple font-bold text-xl">
          <li>No. lista</li>
          <li>Apellido</li>
          <li>Nombre</li>
          <li>Boleta</li>
          <li>No. maquina</li>
          <li>Asistencia</li>
        </ul>
        <ul className=" h-full sm:h-[calc(100vh-25rem)] lg:h-[calc(100vh-20rem)]  overflow-y-scroll">
          {students.map((student, i) => (
            <li key={student.id}>
              {student.boleta == "waiting" ? (
                <div className="grid grid-cols-6 text-center justify-center items-center">
                  <div className={loaderIndividual.loader}></div>
                  <div className={loaderIndividual.loader}></div>
                  <div className={loaderIndividual.loader}></div>
                  <div className={loaderIndividual.loader}></div>
                  <div className={loaderIndividual.loader}></div>
                  <div className={loaderIndividual.loader}></div>
                </div>
              ) : (
                <div className="grid sm:grid-cols-6 grid-cols-2 text-center justify-center mb-2">
                  <div className="flex justify-center">
                    <div className="flex items-center justify-between w-2/3 ">
                      <button
                        onClick={() => handleDeleteStudent(student.id)}
                        className="hover:text-pink transition-all"
                      >
                        <CiCircleRemove size={20} />
                      </button>
                      <span title="Eliminar"></span>
                      <p>{i + 1}</p>
                    </div>
                  </div>
                  <div className="w-11/12 flex items-center gap-2 justify-start">
                    <p>{student.apellido_alumno}</p>
                  </div>
                  <div className="flex items-center justify-start text-start">
                    <p className="w-11/12">{student.nombre_alumno}</p>
                  </div>
                  <div className="flex items-center  justify-center">
                    <p>{student.boleta}</p>
                  </div>
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
                  <div className="flex justify-center items-center">
                    <span title="" className="text-green">
                      <FaCheckCircle size={25} />
                    </span>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
        <div className="flex justify-end">
          <button
            className={` p-3 flex rounded-lg border mt-2 gap-2 transition-all
                ${
                  studentQueue.length > 0 || students.length == 0
                    ? " text-gray-500 border-gray-500 cursor-not-allowed"
                    : "bg-pink text-white hover:text-pink border-pink  hover:bg-blue-800"
                }
            `}
            color="pink"
            onClick={() => {
              //console.log();
              handleEndList();
            }}
            disabled={studentQueue.length > 0}
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
