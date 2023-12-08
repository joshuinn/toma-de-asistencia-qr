import React from "react";
import ReactPDF, {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  renderToFile,
  renderToStream,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flex: "row",
    backgroundColor: "#fff",
  },
  info: {
    flex: "row",
    justifyContent: "space-between",
  },
  section: {
    margin: 10,
    padding: 10,
  },
});

const MyDocument = () => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Datos: </Text>
          <View></View>
        </View>
        <View></View>
      </Page>
    </Document>
  );
};

async function GenPDFReport(list) {
  console.log("Start");
  if (!list.length > 0) {
    return;
  }
  console.log("Check");
  await renderToFile(<MyDocument />, `${__dirname}/reporte.pdf`, ()=>{
    console.log("Is finish");
  });
}
export default GenPDFReport;
