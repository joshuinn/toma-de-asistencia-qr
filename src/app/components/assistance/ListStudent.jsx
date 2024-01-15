"use client";
import axios from "axios";
import React, {
  useState,
  useEffect,
  Suspense,
  useContext,
  useRef,
  useCallback,
  useMemo,
  memo,
} from "react";
import { AiFillCloseCircle, AiOutlineQrcode } from "react-icons/ai";
import { RiInboxUnarchiveFill } from "react-icons/ri";
import Loading from "../Loading";
import { toast } from "sonner";
import loaderIndividual from "./LoadingIndividual.module.css";
import { useRouter } from "next/navigation";
import { SessionContext } from "../context/SessionContext";
import { formatText } from "../helpers/formatTextList.helper";
import { CiCircleRemove, CiWarning } from "react-icons/ci";
import { FaCheckCircle } from "react-icons/fa";

function ListStudent({ id_lista_asistencia }) {
  const router = useRouter();
  const formRef = useRef(null);
  const inputURL = useRef(null);
  const focusedInputRef = useRef(null);
  const [students, setStudents] = useState([]);
  const [studentQueue, setStudentQueue] = useState([]);
  const [isNewStudent, setIsNewStudent] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isBlurInput, setIsBlurInput] = useState(false);
  const { dataUser } = useContext(SessionContext);
  const [currentInputId, setCurrentInputId] = useState(null);
  const [isProcessingStudent, setIsProcessingStudent] = useState(false);
  const [dataForm, setDataForm] = useState({
    url: "",
    id_lista_asistencia: id_lista_asistencia,
  });
  const getDataStudent = async (student) => {
    try {
      const isRegister = students.filter((_student) => {
        if (_student.url == student.url) {
          return _student;
        }
      });
      if (isRegister.length > 0) {
        return { isRegister: true };
      }
      const response = await axios.post("/api/webScrapping", {
        student,
        id_lista_asistencia,
      });
      if (response.data) {
        if (response.data.nombre) {
          return {
            nombre: response.data.nombre.nombre,
            apellido: response.data.nombre.apellido,
            boleta: response.data.boleta,
            numero_maquina: response.data.numero_maquina,
            url: student.url,
          };
        }
      }
    } catch (e) {
      console.error(e);
    }
    return { error: "some error" };
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
        localStorage.removeItem("listStudents"+id_lista_asistencia);
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
          if (data.isRegister) {
            toast.warning("Alumno ya registrado");
            let newStudents = students.filter((student) => {
              if (student.id !== studentQueue[0].id) {
                return student;
              }
            });
            setStudents(newStudents);
          } else {
            if (!data.boleta) {
              toast.error("Ha ocurrudo un error con uno de los estudiantes");
              let newStudents = students.filter((student) => {
                if (student.id !== studentQueue[0].id) {
                  return student;
                }
              });
              setStudents(newStudents);
            } else {
              setStudents((prevStudents) => {
                return prevStudents.map((student) => {
                  if (student.id == id_queue) {
                    return {
                      ...student,
                      boleta: data.boleta,
                      apellido_alumno: data.apellido,
                      nombre_alumno: data.nombre,
                      numero_maquina: data.numero_maquina,
                      url: data.url,
                    };
                  }
                  return student;
                });
              });
            }
          }
          /*const NewQue = studentQueue.filter((student) => {
            if (student.id !== id_queue) {
              return student;
            }
          });*/
          const NewQue = studentQueue.filter((student) => {
            if (student.id !== id_queue) {
              return student;
            }
          });
          setIsNewStudent(!isNewStudent);
          setStudentQueue(NewQue);
        } catch (e) {
          console.error(e);
        }
      } else {
      }
    };
    try {
      updateStudent();
    } catch (error) {
      console.log(error);
    } finally {
      setIsProcessingStudent(false);
    }
  }, [studentQueue]);

  useEffect(() => {
    if (students.length > 0) {
      let newList = students.filter((student) =>
        student.boleta !== "error" ? student : null
      );
      if (newList.length !== students.length) {
        setStudents(newList);
      }
      localStorage.setItem(
        "listStudents"+id_lista_asistencia,
        JSON.stringify({ students, id_lista_asistencia })
      );
    }
  }, [students]);

  useEffect(() => {
    const storageList = JSON.parse(localStorage.getItem("listStudents"+id_lista_asistencia));
    if (storageList) {
      if (storageList.id_lista_asistencia == id_lista_asistencia) {
        let newList = storageList.students.filter((student) => {
          if (student.boleta !== "waiting") {
            return student;
          }
        });
        setStudents(newList);
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
  const isValidURL = (urlString) => {
    const patroURL = new RegExp(
      "^(https?:\\/\\/)?" +
        // valida nombre de dominio
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
        // valida OR direccion ip (v4)
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        // valida puerto y path
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
        // valida queries
        "(\\?[;&a-z\\d%_.~+=-]*)?" +
        // valida fragment locator
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );
    return !!patroURL.test(urlString);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (dataForm.url.length == 0) {
      toast.warning("Ningun alumno escaneado");
      return;
    }
    if (!isValidURL(dataForm.url)) {
      toast.error("Es posible que el scanner tenga otro idioma");
      return;
    }
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
    setTimeout(() => {
      inputURL.current.focus();
    }, 500);
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
      localStorage.removeItem("listStudents"+id_lista_asistencia);
    }
  };
  const focusInputURL = () => {
    inputURL.current.focus();
  };

  const handleInput = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value,
    });
    //formRef.current.submit()
  };

  const handleFocusInput = (e) => {
    setIsBlurInput(false);
    setTimeout(() => {
      inputURL.current.focus();
    }, 500);
  };
  const handleBlurInput = (e) => {
    setIsBlurInput(true);
  };
  const handleForm = () => {
    setShowForm(!showForm);
  };
  const handleIncident = (student) => {
    if(isProcessingStudent){
      toast.warning("Recomendamos esperar que se termine de obtener los datos de los alumnos")
    }else{
      router.push(`/pages/incident/${student.apellido_alumno+" "+student.nombre_alumno}/${student.boleta}/${id_lista_asistencia}`);
      router.refresh();
      toast.info("La lista se guardo temporalmete! 🔒")
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
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 relative"
            ref={formRef}
          >
            <input
              //onFocus={handleFocusInput}
              autoFocus
              type="text"
              name="url"
              placeholder="URL"
              ref={inputURL}
              //onBlur={handleBlurInput}
              onChange={handleInput}
              className="bg-blue-800 p-2 rounded-full outline-none "
              value={dataForm.url}
            />
            <button className="bg-green p-2 rounded-lg" type="submit">
              Agregar
            </button>
          </form>
          {isBlurInput ? (
            <button
              onClick={focusInputURL}
              className="absolute bg-blue-800 text-yellow shadow-2xl p-5 rounded-lg translate-y-[-150px] "
            >
              <span title="Enfocar">
                <div className="flex flex-col items-center text-center">
                  <CiWarning size={40} />
                  Pestaña desenfocada
                </div>
              </span>
            </button>
          ) : (
            <div className="absolute bg-blue-800 shadow-2xl p-4 rounded-lg translate-y-[-150px] flex flex-col items-center gap-2 text-green">
              <FaCheckCircle size={35} />
              Todo listo para escanear
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <Suspense fallback={<Loading />}>
      <FormRegister />
      <div className="bg-blue-800 rounded-lg p-3 shadow-lg z-10 text-white">
        <div className="flex justify-start">
          <button
            className="transition-all bg-purple border border-purple hover:bg-blue-800 hover:text-purple p-3 rounded-lg flex items-center"
            onClick={async () => {
              setTimeout(() => {
                inputURL.current.focus();
              }, 1000);
              handleForm();
            }}
          >
            <AiOutlineQrcode size={25} />
            <p>Iniciar registro con QR</p>
          </button>
        </div>
        <ul className="grid grid-cols-6 text-center text-pink font-bold text-xl">
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
                        className="bg-yellow p-1 rounded-lg hover:bg-opacity-0 border border-yellow transition-all hover:text-yellow"
                        onClick={() => handleIncident(student)}
                      >
                        <span title="Registrar incidente">
                          <CiWarning size={25} />
                        </span>
                      </button>
                      <button
                        onClick={() => handleDeleteStudent(student.id)}
                        className="hover:text-pink transition-all"
                      >
                        <CiCircleRemove size={25} />
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
    </Suspense>
  );
}

export default ListStudent;
