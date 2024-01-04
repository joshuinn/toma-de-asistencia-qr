"use client";
import React, { useCallback, useState } from "react";
import ReactPDF, {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  PDFViewer,
} from "@react-pdf/renderer";
import { FaDownload, FaFilePdf } from "react-icons/fa";
import { toast } from "sonner";
import { IoMdCloseCircle } from "react-icons/io";
import axios from "axios";
import { countStudents } from "./helpers/countStudents.helper";
import ButtonStyled from "./styled/ButtonStyled";

const styles = StyleSheet.create({
  page: {
    flex: "row",
    padding: "20px",
  },
  info: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  section: {
    width: "100%",
    height: "100%",
  },
  tableHeaders: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: "15px",
  },
  student: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  studentContainer: {
    marginBottom: "10px",
  },
  textStudent: {
    width: "25%",
    border: "1px",
    fontSize: "12px",
    padding: "3px",
  },
  textHeaders: {
    width: "25%",
  },
});

function GenPDFReport({ list, fecha_min,fecha_max }) {
  const [listToExport, setListToExport] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const downloadRef = null;

  /*const handlePDF = () => {
    if (!listToExport.length) {
      toast.error(");
      return;
    }
    downloadRef.current.click();
  };
*/
  const ReportPDF = ({ list }) => {
    return (
      <Document>
        <Page size="A4" style={styles.page} orientation="landscape">
          {list.map((reports) => {
            return (
              <View key={reports.id} style={styles.section}>
                <View style={styles.info}>
                  <Text>Ciclo:{reports.ciclo}</Text>
                  <Text>Grupo:{reports.grupo}</Text>
                  <Text>Maestro: {reports.maestro}</Text>
                  <Text>Laboratorio: {reports.laboratorio}</Text>
                </View>
                <View style={styles.tableHeaders}>
                  <Text style={styles.textHeaders}>Apellido</Text>
                  <Text style={styles.textHeaders}>Nombre</Text>
                  <Text style={styles.textHeaders}>Boleta</Text>
                  <Text style={styles.textHeaders}>Conteo de asistencia</Text>
                </View>
                <View style={styles.studentContainer}>
                  {reports.alumnos.map((alumno) => {
                    return (
                      <View key={alumno.id_alumno} style={styles.student}>
                        <Text style={styles.textStudent}>
                          {alumno.apellido_alumno}
                        </Text>
                        <Text style={styles.textStudent}>
                          {alumno.nombre_alumno}
                        </Text>
                        <Text style={styles.textStudent}>{alumno.boleta}</Text>
                        <Text style={styles.textStudent}>{alumno.count}</Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            );
          })}
        </Page>
      </Document>
    );
  };
  const extracData = async () => {
    try {
      const { data } = await axios.post("/api/listReports", {list, fecha_min,fecha_max});
      let dataFormated = [];
      for (let i = 0; i < data.length; i++) {
        console.log(data[i]);
        if (data[i].length > 0) {
          dataFormated[i] = {
            id: data[i][0].id_lista_asistencia,
            grupo: data[i][0].grupo,
            materia: data[i][0].materia,
            laboratorio: data[i][0].laboratorio,
            maestro: data[i][0].maestro,
            ciclo: data[i][0].ciclo,
            alumnos: countStudents(data[i]),
          };
        }
      }
      setListToExport(dataFormated);
    } catch (error) {
      console.error(error);
    }
  };

  const BtnDownload = useCallback(() => {
    return (
      <PDFDownloadLink
        document={<ReportPDF list={listToExport} />}
        fileName="reporte.pdf"
        className="hidden">
        <input type="button" ref={downloadRef}></input>
      </PDFDownloadLink>
    );
  }, []);
  const handleShow = async () => {
    console.log(list);
    if (list.length == 0) {
      toast.error("No se han escogido listas para exportar");
      return;
    }
    if (!isShow) {
      extracData();
    }
    setIsShow(!isShow);
  };

  return (
    <>
      <ButtonStyled color="pink" onClick={handleShow}>
        PDF
        <FaFilePdf size={20} />
      </ButtonStyled>
      {isShow ? (
        <div className="absolute h-screen top-0 w-[calc(100%-13rem)] right-0 z-10 p-4 bg-[rgb(0,0,0,0.4)]">
          <div className="my-3 flex justify-end">
            <button onClick={handleShow}>
              <IoMdCloseCircle size={35} />
            </button>
          </div>
          <PDFViewer className="w-full h-[90%] z-10">
            <ReportPDF list={listToExport} />
          </PDFViewer>
        </div>
      ) : null}
    </>
  );
}

export default GenPDFReport;
