"use client";
import axios from "axios";
import React, {
  useState,
  useEffect,
  Suspense,
  useContext,
  useRef,
  useMemo,
  useCallback,
} from "react";
import Loading from "../Loading";
import { toast } from "sonner";
import loaderIndividual from "./LoadingIndividual.module.css";
import ButtonStyled from "../styled/ButtonStyled";
import FormRegister from "./FormRegister";
import FormManualInput from "./FormManualInput";
import { AiOutlineQrcode } from "react-icons/ai";
import { RiInboxUnarchiveFill } from "react-icons/ri";
import { GoPencil } from "react-icons/go";
import { useRouter } from "next/navigation";
import { SessionContext } from "../context/SessionContext";
import { formatText } from "../helpers/formatTextList.helper";
import { CiCircleRemove, CiWarning } from "react-icons/ci";
import { FaCheckCircle } from "react-icons/fa";

function ListStudent({ id_lista_asistencia }) {
  const router = useRouter();

  const focusedInputRef = useRef(null);
  const [students, setStudents] = useState([]);
  const [studentQueue, setStudentQueue] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const { dataUser } = useContext(SessionContext);
  const [currentInputId, setCurrentInputId] = useState(null);
  const [isProcessingStudent, setIsProcessingStudent] = useState(false);
  const [isShowInputsManuals, setIsShowInputsManuals] = useState(false);
  const [dataForm, setDataForm] = useState({
    url: "",
    id_lista_asistencia: id_lista_asistencia,
  });
  const [manualData, setManualData] = useState({
    apellido_alumno: "",
    nombre_alumno: "",
    boleta: "",
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
        localStorage.removeItem("listStudents" + id_lista_asistencia);
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
            setStudents((prev) => {
              let newStudents = prev.filter((student) => {
                if (student.id !== studentQueue[0].id) {
                  return student;
                }
              });
              return newStudents;
            });
          } else {
            if (!data.boleta) {
              toast.error("Ha ocurrudo un error con uno de los estudiantes");
              setStudents(() => {
                let newStudents = prev.filter((student) => {
                  if (student.id !== studentQueue[0].id) {
                    return student;
                  }
                });
                return newStudents;
              });
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
            //sort and save
            sortStudent();
          }
          /*const NewQue = studentQueue.filter((student) => {
            if (student.id !== id_queue) {
              return student;
            }
          });*/

          setStudentQueue((prev) => {
            let NewQueue = prev.filter((student) => {
              if (student.id !== id_queue) {
                return student;
              }
            });
            return NewQueue;
          });
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
    const storageList = JSON.parse(
      localStorage.getItem("listStudents" + id_lista_asistencia)
    );
    if (storageList) {
      let newList = storageList.students.filter((student) => {
        if (student.boleta !== "waiting") {
          return student;
        }
      });
      setStudents(newList);
    }
  }, []);

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
  const sortStudent = useCallback(() => {
    setStudents((prev) => {
      if (prev.length > 1) {
        let newList = [...prev];
        return newList.sort((a, b) => {
          let mergeNameA = a.apellido_alumno + " " + a.nombre_alumno;
          let mergeNameB = b.apellido_alumno + " " + b.nombre_alumno;
          return mergeNameA.localeCompare(mergeNameB);
        });
      }
      return prev;
    });
    setStudents((prev) => {
      if (prev.length > 0) {
        localStorage.setItem(
          "listStudents" + id_lista_asistencia,
          JSON.stringify({ students: prev, id_lista_asistencia })
        );
      }
      return prev;
    });
  }, [students]);

  const handleSubmitManual = (e) => {
    e.preventDefault();
    const id = crypto.randomUUID();
    setStudents((prev) => {
      return [
        ...prev,
        {
          boleta: manualData.boleta,
          apellido_alumno: manualData.apellido_alumno,
          nombre_alumno: manualData.nombre_alumno,
          id: id,
        },
      ];
    });
    setManualData({
      apellido_alumno: "",
      nombre_alumno: "",
      boleta: "",
    });
    sortStudent();
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
    setStudents((prev) => {
      return [
        ...prev,
        {
          boleta: "waiting",
          apellido_alumno: "waiting",
          nombre_alumno: "waiting",
          id: id_queue,
        },
      ];
    });
    setStudentQueue((prev) => {
      return [
        ...prev,
        {
          id: id_queue,
          data: dataForm,
        },
      ];
    });
    setDataForm({
      id_lista_asistencia: "",
      url: "",
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
  const handleDeleteStudent = (id) => {
    setStudents((prev) => {
      let newList = prev.filter((student) =>
        student.id !== id ? student : null
      );
      if (newList.length == 0) {
        localStorage.removeItem("listStudents" + id_lista_asistencia);
      }
      return newList;
    });
  };

  const handleForm = () => {
    setShowForm(!showForm);
  };

  const handleShowInputsManuals = () => {
    setIsShowInputsManuals(!isShowInputsManuals);
  };
  const handleIncident = (student) => {
    if (isProcessingStudent) {
      toast.warning(
        "Recomendamos esperar que se termine de obtener los datos de los alumnos"
      );
    } else {
      router.push(
        `/pages/incident/${
          student.apellido_alumno + " " + student.nombre_alumno
        }/${student.boleta}/${id_lista_asistencia}`
      );
      router.refresh();
      toast.info("La lista se guardo temporalmete! 🔒");
    }
  };

  return (
    <Suspense fallback={<Loading />}>
      <FormRegister
        handleForm={handleForm}
        setDataForm={setDataForm}
        showForm={showForm}
        handleSubmit={handleSubmit}
        dataForm={dataForm}
      />
      <FormManualInput
        handleSubmitManual={handleSubmitManual}
        handleShowInputsManuals={handleShowInputsManuals}
        isShowInputsManuals={isShowInputsManuals}
        manualData={manualData}
        setManualData={setManualData}
      />
      <div className="bg-blue-800 rounded-lg p-3 shadow-lg z-10 text-white">
        <div className="flex justify-start gap-3">
          <ButtonStyled color="pink" onClick={handleForm}>
            <AiOutlineQrcode size={25} />
            <p>Iniciar registro con QR</p>
          </ButtonStyled>
          <ButtonStyled color="purple" onClick={handleShowInputsManuals}>
            <GoPencil />
            <p>Registro manual</p>
          </ButtonStyled>
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
            disabled={studentQueue.length > 0 || students.length == 0}
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
