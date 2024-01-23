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

  // Ref para enfocar el input
  const focusedInputRef = useRef(null);

  // Estados iniciales
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

  // Función para obtener datos de un estudiante
  const getDataStudent = async (student) => {
    try {
      // Verificar si el estudiante ya está registrado
      const isRegister = students.filter((_student) => {
        if (_student.url == student.url) {
          return _student;
        }
      });
      
      if (isRegister.length > 0) {
        return { isRegister: true };
      }

      // Llamar a la API para obtener datos del estudiante
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

  // Función para manejar el final de la lista
  const handleEndList = async () => {
    try {
      const response = await axios.post("/api/assistanceList", [
        students,
        dataUser,
        id_lista_asistencia,
      ]);

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

  // Efecto para procesar la cola de estudiantes
  useEffect(() => {
    const updateStudent = async () => {
      if (studentQueue.length > 0) {
        if (isProcessingStudent) {
          return;
        }
        const id_queue = await studentQueue[0].id;
        setIsProcessingStudent(true);

        try {
          // Obtener datos del estudiante y manejar la respuesta
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
              toast.error("Ha ocurrido un error con uno de los estudiantes");
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
            // Ordenar y guardar
            sortStudent();
          }

          // Eliminar estudiante procesado de la cola
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

  // Efecto para cargar la lista de estudiantes desde el almacenamiento local
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

  // Función para validar una URL
  const isValidURL = (urlString) => {
    // Expresión regular para validar URLs
    const patroURL = new RegExp(
      "^(https?:\\/\\/)?" +
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
        "(\\?[;&a-z\\d%_.~+=-]*)?" +
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );
    return !!patroURL.test(urlString);
  };

  // Función para ordenar la lista de estudiantes
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

  // Función para manejar el envío manual de datos
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

  // Función para manejar el envío de datos desde QR
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (dataForm.url.length == 0) {
      toast.warning("Ningún alumno escaneado");
      return;
    }
    if (!isValidURL(dataForm.url)) {
      toast.error("Es posible que el escáner tenga otro idioma");
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

  // Función para manejar el número de máquina
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

  // Función para establecer el input enfocado
  const setFocusedInput = (e) => {
    setCurrentInputId(e.target.id);
  };

  // Función para eliminar un estudiante de la lista
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

  // Función para mostrar u ocultar el formulario
  const handleForm = () => {
    setShowForm(!showForm);
  };

  // Función para mostrar u ocultar los inputs manuales
  const handleShowInputsManuals = () => {
    setIsShowInputsManuals(!isShowInputsManuals);
  };

  // Función para manejar incidentes
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
      toast.info("La lista se guardó temporalmente! 🔒");
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
        {/* ... (Otras secciones) ... */}
      </div>
    </Suspense>
  );
}

export default ListStudent;
