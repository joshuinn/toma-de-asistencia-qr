"use client";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import { useState } from "react";
import { FaFilePdf } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import ButtonStyled from "../styled/ButtonStyled";

const styles = StyleSheet.create({
  page: {
    flex: "row",
    padding: "20px",
  },
  data: {
    flexDirection: "row",
    width: "100%",
  },
  text: {
    width: "16.6666%",
    fontWeight: "bold",
  },
  textName: {
    width: "16.6666%",
    fontWeight: "bold",
    textOverflow:"balance",
  },
  textData: {
    width: "16.6666%",
    fontSize: "15px",
  },
  dataTextArea: {
    width: "100%",
    border: "1px solid #000",
    padding: "8px",
    fontSize: "15px",
    borderRadius: "5px",
    minHeight:"200px",
    marginTop:"5px"
  },
  title: {
    fontWeight: "bold",
    fontSize: "30px",
  },
  titleContainer: {
    textAlign: "center",
  },
  lineContainer: {
    width: "100%",
    alignItems: "flex-end",
    marginTop: "60px",
  },
  line: {
    width: "200px",
    height: "1px",
    backgroundColor: "#000",
  },
  lineContent: {
    textAlign: "center",
    width: "200px",
    fontSize: "12px",
  },
  observaciones: {
    marginTop: "10px",
  },
});

// Componente funcional para generar el PDF de una incidencia.
function GenPDFIncident({ data }) {
  // Estado para controlar la visibilidad del visor de PDF.
  const [isShow, setIsShow] = useState(false);

  // Manejador para mostrar/ocultar el visor de PDF.
  const handleShow = () => {
    setIsShow(!isShow);
  };

  // Componente funcional para el contenido del documento PDF.
  const PDFIncident = ({ data }) => {
    return (
      <Document>
        <Page size="A4" orientation="landscape" style={styles.page}>
          {/* ... (contenido del documento PDF) */}
        </Page>
      </Document>
    );
  };

  // Renderiza el componente principal.
  return (
    <>
      {/* Botón para exportar a PDF */}
      <ButtonStyled color="pink" onClick={handleShow}>
        Exportar a PDF
        <FaFilePdf size={20} />
      </ButtonStyled>

      {/* Visor de PDF condicional */}
      {isShow ? (
        <div className="absolute h-screen top-0 w-[calc(100%-13rem)] right-0 z-10 p-4 bg-[rgb(0,0,0,0.4)]">
          <div className="my-3 flex justify-end">
            {/* Botón para cerrar el visor de PDF */}
            <button onClick={handleShow} type="submiting">
              <IoMdCloseCircle size={35} />
            </button>
          </div>

          {/* Visor de PDF */}
          <PDFViewer className="w-full h-[90%] z-10">
            <PDFIncident data={data} />
          </PDFViewer>
        </div>
      ) : null}
    </>
  );
}

// Exporta el componente principal.
export default GenPDFIncident;
