"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import GenPieChart from "./GenPieChart";
import Loading from "../Loading";
import { calculateAssistance } from "../helpers/calculateAssistance.helper";
function Chart({ list }) {
  const [isLoading, setIsloading] = useState(true);
  const [dataChart, setDataChart] = useState([]);

  const memoAsistance = useMemo(async () => {
    const calculated = async () => {
      setIsloading(true)
      if (list.length > 0) {
        try {
          const dataCalculated = await calculateAssistance(list);

          if (dataCalculated) {
            setDataChart(dataCalculated);
            setIsloading(false)
          }
          return dataCalculated;
        } catch (error) {
          console.error(error);
        }
      }
      setIsloading(false)
      return [];
    };
    return calculated();
  }, [list]);
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
  const CustomeChart = ({ item, title = "Porcentaje" }) => {
    if (!item) {
      return null;
    }
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
        title={title}
      />
    );
  };
  if (dataChart.length == 0) {
    return (
      <div className="h-5/6 overflow-y-scroll shadow-lg p-4 flex items-center justify-center">
        <section>
          <div className="w-full bg-blue-600 p-3 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-bold text-pink">
              No hay asistencias registradas para lo seleccionado
            </h3>
          </div>
        </section>
      </div>
    );
  }
  return (
    <div className="h-5/6 overflow-y-scroll shadow-lg p-4">
      <div>
        <section className="mb-3">
          {!dataChart.total ? null : dataChart.total.length == 0 ||
            dataChart.groups.length == 1 ? null : (
            <div>
              <div className="w-full bg-blue-600 p-3 rounded-lg shadow-lg text-center">
                <h2 className="text-xl font-bold text-pink">
                  Porcentaje total de lo seleccionado
                </h2>
              </div>
              {dataChart.total.map((item) => {
                return <CustomeChart key={item.id} item={item} title="Total" />;
              })}
            </div>
          )}
        </section>
        <section className="my-3">
          <div className="w-full bg-blue-600 p-3 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold text-purple">
              Porcentaje de asitencia por grupos
            </h2>
          </div>
          {!dataChart.groups
            ? null
            : dataChart.groups.length == 0
            ? null
            : dataChart.groups.map((item) => {
                return (
                  <CustomeChart item={item} key={item.id} title={item.grupo} />
                );
              })}
        </section>
        <section className="my-3">
          {!dataChart.materia ? null : dataChart.materia.length == 0 ? null : (
            <div>
              <div className="w-full bg-blue-600 p-3 rounded-lg shadow-lg text-center">
                <h2 className="text-xl font-bold text-yellow">
                  Porcentaje de asistencia por materia
                </h2>
              </div>
              {dataChart.materia.map((item) => {
                return (
                  <CustomeChart
                    item={item}
                    key={item.id}
                    title={item.materia}
                  />
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Chart;
