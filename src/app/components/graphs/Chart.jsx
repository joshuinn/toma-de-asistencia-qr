// Importar los hooks necesarios de React
"use client";
import { useCallback, useEffect, useMemo, useState } from "react";

// Importar el componente GenPieChart y el componente de carga Loading
import GenPieChart from "./GenPieChart";
import Loading from "../Loading";

// Importar la función de cálculo de asistencia
import { calculateAssistance } from "../helpers/calculateAssistance.helper";

// Componente funcional para renderizar el gráfico
function Chart({ list }) {
  // Estado para controlar la carga del componente
  const [isLoading, setIsloading] = useState(true);

  // Estado para almacenar los datos del gráfico
  const [dataChart, setDataChart] = useState([]);

  // Memorizar el cálculo de asistencia utilizando useMemo
  const memoAsistance = useMemo(async () => {
    const calculated = async () => {
      setIsloading(true);

      // Verificar si hay datos en la lista antes de realizar el cálculo
      if (list.length > 0) {
        try {
          // Calcular la asistencia utilizando la función de ayuda
          const dataCalculated = await calculateAssistance(list);

          if (dataCalculated) {
            // Actualizar el estado con los datos calculados
            setDataChart(dataCalculated);
            setIsloading(false);
          }

          return dataCalculated;
        } catch (error) {
          console.error(error);
        }
      }

      // Si la lista está vacía, establecer el estado de carga en falso
      setIsloading(false);

      return [];
    };

    // Llamar a la función de cálculo asincrónico
    return calculated();
  }, [list]);

  // Renderizar el componente de carga mientras los datos se están cargando
  if (isLoading) {
    return (
      <div className="h-5/6 p-4">
        <Loading />
      </div>
    );
  }

  // Función para generar un color aleatorio
  function randomColor() {
    const colors = ["pink", "blue", "yellow", "green", "purple"];
    let colorRand = Math.floor(Math.random() * 4);
    return colors[colorRand];
  }

  // Componente personalizado para renderizar un gráfico específico
  const CustomeChart = ({ item, title = "Porcentaje" }) => {
    if (!item || item.data[0] === "NaN") {
      return null;
    }

    let color1 = randomColor();
    let color2 = randomColor();

    // Asegurarse de que los colores no sean iguales
    while (color1 === color2) {
      color1 = randomColor();
      color2 = randomColor();
    }

    // Renderizar el componente GenPieChart con los datos y colores proporcionados
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

  // Renderizar un mensaje si no hay datos en el gráfico
  if (dataChart.length === 0) {
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

  // Renderizar el gráfico con secciones para el total, grupos y materia
  return (
    <div className="h-5/6 overflow-y-scroll shadow-lg p-4">
      <div>
        <section className="mb-3">
          {!dataChart.total || dataChart.total.length === 0 || dataChart.groups.length === 1 ? null : (
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
              Porcentaje de asistencia por grupos
            </h2>
          </div>
          {!dataChart.groups ? null : dataChart.groups.length === 0 ? null : dataChart.groups.map((item) => {
              return (
                <CustomeChart item={item} key={item.id} title={item.grupo} />
              );
            })}
        </section>
        <section className="my-3">
          {!dataChart.materia || dataChart.materia.length === 0 ? null : (
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

// Exportar el componente Chart por defecto
export default Chart;
