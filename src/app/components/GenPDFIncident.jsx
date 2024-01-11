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
import ButtonStyled from "./styled/ButtonStyled";

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

function GenPDFIncident({ data }) {
  const [isShow, setIsShow] = useState(false);
  const handleShow = () => {
    setIsShow(!isShow);
  };

  const PDFIncident = ({ data }) => {
    return (
      <Document>
        <Page size="A4" orientation="landscape" style={styles.page}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Incidencia</Text>
          </View>
          <View style={styles.data}>
            <Text style={styles.text}>Grupo:</Text>
            <Text style={styles.textName}>Maestro:</Text>
            <Text style={styles.text}>Ciclo:</Text>
            <Text style={styles.textName}>Nombre:</Text>
            <Text style={styles.text}>Boleta:</Text>
            <Text style={styles.text}>Laboratorio:</Text>
          </View>
          <View style={styles.data}>
            <Text style={styles.textData}>{data.grupo}</Text>
            <Text style={styles.textData}>{data.maestro}</Text>
            <Text style={styles.textData}>{data.ciclo}</Text>
            <Text style={styles.textData}>{data.nombre}</Text>
            <Text style={styles.textData}> {data.boleta}</Text>
            <Text style={styles.text}>{data.laboratorio}</Text>
          </View>
          <View style={styles.observaciones}>
            <Text>Observaciones:</Text>
            <View style={styles.dataTextArea}>
              <Text>{data.observaciones}</Text>
            </View>
          </View>
          <View style={styles.lineContainer}>
            <View style={styles.lineContent}>
              <View style={styles.line}></View>
              <Text>Firma</Text>
            </View>
          </View>
        </Page>
      </Document>
    );
  };

  return (
    <>
      <ButtonStyled color="pink" onClick={handleShow}>
        Exportar a PDF
        <FaFilePdf size={20} />
      </ButtonStyled>
      {isShow ? (
        <div className="absolute h-screen top-0 w-[calc(100%-13rem)] right-0 z-10 p-4 bg-[rgb(0,0,0,0.4)]">
          <div className="my-3 flex justify-end">
            <button onClick={handleShow} type="submiting">
              <IoMdCloseCircle size={35} />
            </button>
          </div>
          <PDFViewer className="w-full h-[90%] z-10">
            <PDFIncident data={data} />
          </PDFViewer>
        </div>
      ) : null}
    </>
  );
}

export default GenPDFIncident;
