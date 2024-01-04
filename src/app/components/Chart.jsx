"use client";
import { useEffect, useState } from "react";
import GenPieChart from "./GenPieChart";
import Loading from "./Loading";
import { calculateAssistance } from "./helpers/calculateAssistance.helper";
function Chart({ list }) {
  const [isLoading, setIsloading] = useState(false);
  const [dataChart, setDataChart] = useState([]);
  useEffect(() => {
    const calculateData = async () => {
      setIsloading(true);
      if (list.length > 0) {
        try {
          const dataCalculated = await calculateAssistance(list);

          if (dataCalculated) {
            setDataChart(
              dataCalculated.map((data, index) => {
                return { data, id: list[index].id_lista_asistencia, grupo: list[index].grupo };
              })
            );
          }
        } catch (error) {}
      }
      setIsloading(false);
    };
    calculateData();
  }, []);
  if (isLoading) {
    return (
      <div className="h-5/6 p-4">
        <Loading />
      </div>
    );
  }
  function randomColor() {
    const colors = ["pink", "blue", "yellow", "green", "purple"];
    let colorRand = Math.floor(Math.random() * 4);
    return colors[colorRand];
  }
  return (
    <div className="h-5/6 overflow-y-scroll shadow-lg p-4">
      <div>
        {dataChart.length > 0
          ? dataChart.map((item) => {
              if (item.data[0] == "NaN") {
                return;
              }
              let color1 = randomColor();
              let color2 = randomColor();
              while (color1 == color2) {
                color1 = randomColor();
                color2 = randomColor();
              }
              return (
                <GenPieChart
                  data={item.data}
                  mainColor={color1}
                  secondColor={color2}
                  titleColor={randomColor()}
                  key={item.id}
                  title={"Asistencia de: " + item.grupo}
                />
              );
            })
          : null}
      </div>
    </div>
  );
}

export default Chart;
